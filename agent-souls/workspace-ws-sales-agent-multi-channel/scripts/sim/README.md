# member-sim — giả lập "member" (khách) nhắn & phản hồi bot

Giả lập MỘT khách hàng trên platform: **chủ động nhắn tin** vào bot sales và **tự
phản hồi** lại reply của bot theo vòng lặp nhiều lượt. Dùng để test end-to-end
luồng `platform → BE Agent (UC-Service) → OpenClaw → phản hồi` mà không cần khách
thật / không cần token Facebook/Zalo.

## Vì sao đi qua kênh Web

Kênh **web arm** là điểm inject rẻ nhất: visitor KHÔNG có secret, chỉ cần
`shop_token` + `Origin` hợp lệ. Không ký HMAC (FB), không MAC (Zalo).

```
member-sim ──POST /v1/web/:shop/:visitor/messages──▶ UC-Service (:8081)
           ◀──GET  /v1/web/:shop/:visitor/subscribe (SSE) ── reply bot
                         │
                         └─ plugin in-instance (SSE) ─▶ agent sales (OpenClaw) ─▶ deliver()
```

`sessionKey` ở plugin = `web:<shopToken>:<visitor>`. OUTBOUND SSE là **live-only**
(không replay) ⇒ harness **subscribe TRƯỚC khi gửi**. Bot có thể trả nhiều bong
bóng (`chunkMode:newline`) → harness gộp bằng debounce trong 1 lượt.

## Chạy nhanh (không cần stack) — self-test

Bật mock-bot in-process, verify logic gửi/nhận/loop:

```bash
node scripts/sim/member-sim.mjs --selftest --scenario scripts/sim/scenarios/sales-basic.json
# → [test] PASS ✓
```

## Chạy thật — local dev stack

Cần: UC-Service (:8081) + OpenClaw gateway chạy agent sales + kênh Web đã bật cho
instance (plugin subscribe SSE). Xem `docs/SETUP.md` + `AI-Docs` local-dev.

```bash
export ADMIN_KEY=...            # ADMIN_KEY của UC-Service (mint apikey web)
node scripts/sim/member-sim.mjs \
  --service http://localhost:8081 \
  --brain scripted \
  --scenario scripts/sim/scenarios/sales-basic.json \
  --origin http://localhost:5173 \
  --turns 6
```

Harness tự: mint apikey web (`?type=web`) → mint `shop_token` (+ origin) → mở SSE →
gửi câu mở → nhận reply bot → brain sinh câu tiếp → lặp. In transcript ra stdout.

> Nếu đã có sẵn key/shop: truyền `--api-key ocww_...` hoặc `--shop-token shop_...`
> để bỏ qua bước mint. `--origin` PHẢI nằm trong allowlist của shop.

## Chạy end-to-end KHÔNG cần dựng gateway — `plugin-bridge.mjs`

Muốn thấy vòng lặp member ↔ bot **thật qua UC-Service** mà không phải dựng
gateway/container (non-destructive): dùng `plugin-bridge.mjs` — nó đóng vai plugin
in-instance ở hop1.

```
member-sim ─POST /v1/web/:shop/:visitor/messages─▶ UC-Service ─inbound SSE─▶ [bridge]
member-sim ◀─outbound SSE─ UC-Service ◀─POST /v1/plugin/:shop/:visitor/reply─ [bridge]
```

Bridge subscribe `GET /v1/plugin/:shopToken/subscribe` (Bearer apikey), nhận tin
khách, sinh reply rồi POST `/v1/plugin/:shopToken/:visitor/reply`. **Responder**:
`canned` (luật keyword tiếng Việt, mặc định) · `echo` · `openclaw` (route qua agent
OpenClaw thật, cần `--gateway-ws/-token/-agent`, chưa verify).

Chạy (2 terminal — bridge + member-sim CHIA SẺ cùng shop/apikey):

```bash
# Terminal 1 — bridge (tự mint apikey + shop, in ra export để tái dùng)
cd .../ws-sales-agent-multi-channel && set -a; source .env; set +a
node scripts/sim/plugin-bridge.mjs --responder canned --origin http://localhost:5173
#   → log in ra: apiKey=ocww_… · shopToken=ws_… · [bridge] subscribed ✓

# Terminal 2 — member-sim dùng ĐÚNG apikey+shop của bridge
node scripts/sim/member-sim.mjs --service http://localhost:8081 \
  --api-key ocww_… --shop-token ws_… --origin http://localhost:5173 \
  --brain scripted --scenario scripts/sim/scenarios/sales-basic.json \
  --turns 6 --transcript /tmp/sim-transcript.json
```

> ⚠ `--api-key` + `--shop-token` PHẢI khớp bridge, và `--origin` phải trùng origin
> bridge mint shop — nếu không member-sim mint shop MỚI mà bridge không subscribe.
> Bridge `canned` KHÔNG phải agent sales xịn; nó chỉ chứng minh luồng e2e THẬT. Muốn
> bot là agent sales thật thì dựng gateway + cài plugin (xem `docs/`), không dùng bridge.

## Các "brain" (ai sinh câu của member)

| `--brain` | Mô tả |
|---|---|
| `scripted` (mặc định) | Đọc kịch bản JSON (`--scenario`). Deterministic — hợp regression/demo. |
| `interactive` | Người gõ tay ở terminal; in reply bot, chờ bạn nhập lượt tiếp. |
| `openclaw` | 1 agent OpenClaw role-play khách hàng (LLM). Đúng nghĩa "dùng openclaw để giả lập". Cần gateway. |
| `echo` | Ack cố định — chỉ smoke transport. |

### Brain `openclaw` (LLM-driven customer)

Đăng ký persona khách rồi trỏ harness tới gateway:

```bash
openclaw agents add customer --workspace "$PWD/scripts/sim/agent-customer"

node scripts/sim/member-sim.mjs --brain openclaw \
  --service http://localhost:8081 \
  --gateway-ws ws://localhost:18789 --gateway-token <GATEWAY_TOKEN> \
  --customer-agent customer
```

Harness gọi `sessions.send` tới agent `customer` mỗi lượt, đưa reply bot làm input,
đọc `chat` event tới `state:"final"` rồi dùng làm câu khách kế tiếp.

> ⚠ Brain `openclaw` port wire-protocol từ FE `sessions-client` nhưng **chưa
> verify với gateway thật** (lúc viết không có stack chạy). `scripted`/`echo` đã
> verify qua self-test.

## Kịch bản (scenario JSON)

```json
{
  "origin": "http://localhost:5173",
  "opening": "Câu khách mở lời",
  "lines": ["lượt 2", "lượt 3", "..."]
}
```

`opening` gửi đầu; mỗi khi bot trả xong, gửi tiếp phần tử kế trong `lines`; hết
`lines` → dừng. `origin` (nếu có) override `--origin`. (`name`/`description` chỉ để
ghi chú, harness bỏ qua.)

Kịch bản có sẵn trong `scripts/sim/scenarios/`:

| File | Tình huống |
|---|---|
| `sales-basic.json` | Khách hỏi áo thun, hỏi giá/size, chốt đơn, cho địa chỉ ship. |
| `objection-haggle.json` | Khách chê giá, mặc cả, so sánh shop khác, rồi mới chốt. |
| `out-of-stock.json` | Khách hỏi size/màu đã hết → hỏi khi nào có lại, xin mẫu thay thế. |

## Cờ hữu ích

| Cờ | Mặc định | Ý nghĩa |
|---|---|---|
| `--turns N` | 6 | Số lượt tối đa |
| `--debounce-ms N` | 2500 | Im lặng bao lâu thì coi 1 lượt bot xong (gộp multi-bubble) |
| `--turn-timeout-ms N` | 45000 | Chờ reply bot tối đa mỗi lượt |
| `--visitor ID` | random | Cố định visitor để tái dùng session |
| `--transcript PATH` | off | Ghi mảng transcript ra file JSON (pretty) khi chạy xong; no-op nếu không truyền |
| `--verbose` | off | Log SSE ready/ping/debug |

Transcript là mảng `[{ from: "member"|"bot", text }]` theo thứ tự hội thoại — tiện
để lưu lại phiên regression / demo hoặc so khác giữa các lần chạy.
