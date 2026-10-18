# zalo-oa — OpenClaw Channel Plugin

Plugin OpenClaw nối **Zalo Official Account (OA)** vào agent bán hàng. Đây là một
**thin client** tới `sales-agent-multi-channel` backend service (shared, team-hosted):
service giữ toàn bộ OAuth/QR + Zalo webhook + token, plugin nhận inbound (webhook-push từ
service) và gửi outbound (proxy). **Không lưu token Zalo cục bộ.** (SSE-pull đã BỎ HẲN
2026-09-22 — thiếu URL public thì FAIL-LOUD, không fallback SSE.)

Cùng cặp với `facebook-messenger` (arm Facebook) — hai plugin dùng chung agent,
chung sales-manager plugin, chung mô hình HITL + Telegram notify.

## Tính năng

- **Inbound qua webhook-push** — plugin đăng ký `POST {serviceUrl}/v1/delivery-webhook`
  (apiKey-scoped, base_url lấy từ `OPENCLAW_PUBLIC_BASE_URL` hoặc override `OC_ZALO_PUSH_PUBLIC_URL`)
  rồi **serve** route receiver `POST /zalo-inbound-push/<accountId ?? "default">`. Service PUSH
  mỗi inbound (ký HMAC `X-OC-Signature = sha256=hmac(rawBody, key=sha256(apiKey))`) → plugin verify
  → **AWAIT dispatch** → trả 2xx. Thiếu URL public → **FAIL-LOUD** (KHÔNG start inbound, KHÔNG
  fallback SSE). **KHÔNG có Zalo webhook trong plugin** — service sở hữu webhook Zalo và re-push xuống plugin.
- **Outbound qua proxy** — `POST {serviceUrl}/v1/oas/<oaId>/messages` (Bearer API key):
  text + ảnh-theo-URL. Service dịch sang CS Send API của Zalo OA.
- **Ảnh trong reply** — agent xuất `![<tên món>](<url>)` (markdown; legacy `[ẢNH: <url>]` vẫn parse) → plugin tách từng URL → gửi lần lượt
  (service không có endpoint carousel/template; multi-image = N tin ảnh rời).
- **OA discovery** — `GET {serviceUrl}/v1/oas` trả `{ oas: [{ oa_id, name, ... }] }`. Chủ
  shop **không phải nhập oaId** — plugin tự phát hiện + tự bám (reconcile) OA đang kết nối.
- **image-match (nghiệp vụ ở PLUGIN)** — nhận ra khách đang hỏi món nào: (1) reply-quote
  ảnh sản phẩm shop đã gửi, (2) dHash re-share qua matcher catalog-agnostic của service.
  URL ảnh gốc của khách **chỉ dùng để match**, không bao giờ vào prompt (PII).
- **Forward ảnh biên lai → Telegram** — ảnh khách gửi **không khớp** sản phẩm (nhiều khả
  năng là biên lai chuyển khoản) được forward tới Telegram chủ shop để kiểm tra + giao.
- **HITL tiếp quản (parity Facebook)** — pause/resume 1 khách từ dashboard ("Trả lời trực
  tiếp" / "Bật lại nhân viên AI"): lúc paused, tin khách được persist (hiện real-time trên
  dashboard) + buffer, KHÔNG auto-reply; resume = drain-không-replay (#172). Cầu nối qua
  globalThis registry dùng chung với arm Facebook (khoá = `oaId`).
- **Escalate "khách cần hỗ trợ"** — 2 loại, quyết định ở `src/handoff-policy.ts`:
  - `rule` (agent phát token `[HANDOFF:...]` / backstop regex): CHỈ chạy khi chủ shop còn
    mục trong "Quy tắc cần bạn giúp" (`agent-staff/knowledge/escalation.md`). Danh sách
    TRỐNG → token bị hạ thành no-op (không cờ, không pause, không báo chủ).
  - `failsafe`: agent lỗi / không nhả tin / exception → pause ca + báo chủ; còn lỗi TOÀN
    SHOP (chưa train, hết credit) → CHỈ báo chủ, **không** pause ca nào.
  Thẻ Telegram mang nút ▶️/⏸ (pause/resume ĐÚNG ca) + ✓ xác nhận thanh toán; chủ cũng
  tiếp-quản được từ dashboard.
- **Gate giờ-trực + run-switch (#102)** — trước khi auto-reply, plugin đọc gate của Saler
  (giờ trực + công tắc "tự-động-chăm-sóc") từ store dùng chung; off-window =
  ingest+persist+visible nhưng KHÔNG auto-reply (fail-open: lỗi đọc gate → coi như 24/7 +
  bật). Xem `src/runtime-config.ts`.
- **Báo đơn mới chốt / sửa đơn → Telegram** — do tool `capture_order` / `update_order` của
  sales-manager plugin lo (channel-agnostic), dùng chung cho cả Zalo lẫn Facebook.

## Kết nối (setup outline)

Chủ shop **không** đụng Zalo Developer Console — service đã đăng ký sẵn 1 Zalo app cho mọi
tenant. Luồng kết nối:

1. Cài bundle → plugin lấy `serviceUrl` + `apiKey` (per-tenant) từ env do install pipeline
   inject (`OC_SALE_AGENT_MULTI_URL`, `OC_SALE_AGENT_MULTI_CUSTOMER_API_KEY`).
2. Dashboard mở luồng OAuth/QR (service `oauthStart`) → chủ shop đăng nhập Zalo + cấp quyền OA.
3. Service lưu OA + token; plugin `GET /v1/oas` phát hiện OA vừa kết nối → đăng ký
   `/v1/delivery-webhook` + serve route receiver webhook-push.
4. (Tuỳ chọn) bật Telegram HITL: set `OC_WS_FBSALES_TG_BOT_TOKEN` + `OC_WS_FBSALES_TG_GROUP_ID`.

## Kiến trúc

```
                    Zalo Open Platform (OA)
                             │
                    sales-agent-multi-channel service
                    (OAuth/QR · Zalo webhook · token · Send API proxy)
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
  POST /zalo-inbound-push/… POST /v1/oas/…/msgs  GET /v1/oas
  (inbound PUSH,ký HMAC     (outbound text/ảnh)   (discovery)
   service→plugin)            │                  │
          └────────── zalo-oa plugin ────────────┘
                             │
                    OpenClaw gateway
              (agent reply · sales-manager tools ·
               HITL bridge · Telegram notify)
```

## Env vars

| Var | Bắt buộc | Ý nghĩa |
|---|---|---|
| `OC_SALE_AGENT_MULTI_URL` | ✓ | Base URL của backend service (không đuôi `/`). Inject lúc install. |
| `OC_SALE_AGENT_MULTI_CUSTOMER_API_KEY` | ✓ | Bearer key per-tenant (auto-mint lúc install) — cô lập OA của tenant. |
| `OC_WS_FBSALES_TG_BOT_TOKEN` | — | Bot Telegram (bật HITL notify). |
| `OC_WS_FBSALES_TG_GROUP_ID` | — | Chat/group Telegram nhận notify. |
| `OC_WS_FBSALES_TG_WEBHOOK_SECRET` | — | Secret cho callback Telegram (nếu dùng). |

## Files

| File | Purpose |
|---|---|
| `index.ts` | Bundled channel entry (`defineBundledChannelEntry`) |
| `api.ts` | Re-export `zaloOaPlugin` |
| `runtime-api.ts` | Re-export `setZaloOaRuntime` |
| `secret-contract-api.ts` | Re-export `channelSecrets` |
| `src/channel.ts` | `ChannelPlugin` — meta, dispatch, image-match, HITL, gate, Telegram wiring |
| `src/channel.runtime.ts` | `startAccount()` — OA reconcile + **webhook-push receiver route** (`/zalo-inbound-push/<accountId ?? "default">`) + verify HMAC `sha256(apiKey)` + register `/v1/delivery-webhook`. FAIL-LOUD nếu thiếu public URL (SSE-pull đã bỏ 2026-09-22) |
| `src/service-client.ts` | Service HTTP client (`/v1/oas`, `/v1/delivery-webhook`, send text/ảnh, image-match, oauth) |
| `src/config-schema.ts` | Đọc `channels.zalo-oa.*` + resolve Telegram HITL |
| `src/accounts.ts` | Multi-account resolver (thường chỉ `default`) + oaId discovery |
| `src/constants.ts` | Resolve `serviceUrl` / `apiKey` (env-first) |
| `src/types.ts` | Type defs (config, account, inbound event) |
| `src/runtime.ts` | `setZaloOaRuntime()` — runtime hooks |
| `src/secret-contract.ts` | Khai báo field nào là secret |
| `src/webhook-handler.ts` | Parse push payload → `ParsedInboundEvent` (name giữ từ thời pre-service) |
| `src/hitl-state.ts` | Per-OA pause/deny store + buffer tin lúc paused (JSON `hitl/<oaId>.json`) |
| `src/hitl-bridge.ts` | Publish pause/resume handle vào globalThis registry (dashboard tiếp quản) |
| `src/persist-inbound.ts` | Persist tin khách + `emitSessionTranscriptUpdate` (dashboard real-time) |
| `src/escalation-flag.ts` | Cờ "cần hỗ trợ" (chung store sales-manager) |
| `src/telegram-bridge.ts` | Telegram notify — thẻ "cần hỗ trợ" + forward ảnh biên lai |
| `src/runtime-config.ts` | Đọc gate giờ-trực/run-switch (mirror sales-manager, fail-open) |
| `src/catalog-reader.ts` | Map url ảnh sản phẩm ↔ catalog (image-match) |
| `src/quoted-media-store.ts` | Nhớ url ảnh shop đã gửi (reply-quote → sản phẩm) |
| `src/cursor-store.ts` | Cursor dedup inbound (mid/seq) per-OA |
| `src/send.ts` | Chunk text + gửi ảnh (qua service proxy) |
| `src/window-24h.ts` | Kiểm tra cửa sổ nhắn tin (parity với arm FB) |
| `src/probe.ts` | Probe OA (health) |

## Build

```bash
cd integrations/zalo-oa
bun install
bun run build:ship   # esbuild bundle:false → dist/ship (compile TS → JS cho plugin install)
```

> **Ràng buộc plugin OpenClaw**: dist KHÔNG được import bare-npm (chỉ `openclaw/plugin-sdk/*`
> + node builtins + global `fetch`). `node:sqlite` nạp qua `createRequire`. Build dùng
> `bundle:false` (mỗi file `src/**` compile riêng, import nội bộ giữ `./x.js`) → **không**
> import chéo package (vd sales-manager) vì đường dẫn sẽ không resolve lúc load.
