# ws-zalo-assist-agent — Thư, thư ký Zalo cho việc BD

Thư ký riêng cho một người làm BD chạy khách trên **Zalo cá nhân**. Agent tên `thu` sống trong
**Telegram**, ghi lại các cuộc trò chuyện Zalo của chủ vào một kho riêng, rồi trả lời chủ những câu
Zalo không trả lời được: *ai đang chờ anh* · *chị Lan nói gì về giá* · *tuần này anh support ai*.

Tài liệu thiết kế: [doc/ws-zalo-assist-agent/](../../doc/ws-zalo-assist-agent/) —
[brief](../../doc/ws-zalo-assist-agent/brief.md) ·
[PRD](../../doc/ws-zalo-assist-agent/prd.md) ·
[decision-log](../../doc/ws-zalo-assist-agent/decision-log.md) (D-1 → D-23) ·
[agent-charter](../../doc/ws-zalo-assist-agent/agent-charter.md) ·
[issues](../../doc/ws-zalo-assist-agent/issues.md) (17 lát) ·
[ws-ADR 0001–0003](../../doc/ws-zalo-assist-agent/adr/)

---

## 🔴 Ràng buộc kiến trúc — đọc trước khi sửa bất cứ thứ gì

**Zalo là Bộ thu một chiều, ⛔ KHÔNG phải Channel** ([ws-ADR 0001](../../doc/ws-zalo-assist-agent/adr/0001-zalo-la-bo-thu-khong-phai-channel.md), D-1).

Cụ thể, trong workspace này:

- ⛔ **KHÔNG** khai `channels.openzalo`, ⛔ **KHÔNG** khai `channels.zalouser`.
- ⛔ **KHÔNG** cài plugin kênh `@tuyenhx/openzalo` (D-21). Chỉ cài **binary `openzca` (CLI)**.

Vì sao đây là ràng buộc chứ không phải lựa chọn: không khai kênh ⇒ một tin khách gửi trên Zalo
**không bao giờ trở thành lượt hội thoại của agent** ⇒ auto-reply là **bất khả thi về cơ chế**,
⛔ không phải nhờ agent ngoan. Cả sản phẩm được dựng quanh việc đó, vì nó chạy trên **tài khoản Zalo
chính** của chủ — nơi một tin sai gửi ra là không rút lại được.

Cổng canh bằng code: `bash install/config.sh check-redline` (chạy trong `post-install`, và có trong
`verification` của skill setup). Nó soi merged `openclaw.json` và hét nếu thấy kênh Zalo.

⚠ Hỏng này **⛔ không có triệu chứng**: agent vẫn chạy, vẫn trả lời chủ bình thường — chỉ khác ở chỗ
từ đó nó nhắn được cho khách. Nên cổng phải là code, ⛔ không phải một dòng dặn trong tài liệu.

---

## 🔴 Ws này nên ở **instance RIÊNG**

`channels.telegram` là khoá **dùng chung toàn instance**, và `bindings` khử trùng theo **tuyến**
`{channel: telegram}` chứ không theo agent. Nên cài chung với bất kỳ ws Telegram nào khác
(`ws-seafood-tracking-report`, `ws-money-tracker`, `ws-hr-screening`, `ws-bsv-onboarding`, `ws-fb-*`)
là hỏng theo **một trong hai kiểu**, tuỳ thứ tự cài — đo thật 20/09/2026:

| Thứ tự | `bindings` | `dmPolicy` | `allowFrom` | Hậu quả |
|---|---|---|---|---|
| ws khác cài trước | `telegram→thu` | `allowlist` | `["*", <owner>]` | 🔴 **RÒ RỈ** — `"*"` mở toang DM |
| ws khác cài sau | `telegram→<agent kia>` | `open` | `["*"]` | 🔴 **CÂM** — `thu` mất kênh, *và* vẫn rò rỉ |

Cả hai **không có triệu chứng**: hoặc agent im không một dòng lỗi, hoặc bot trả lời người lạ mà chủ
không bao giờ biết — trong khi agent đọc được toàn bộ hội thoại Zalo cá nhân của chủ.

Cổng canh bằng code: `bash install/config.sh check-telegram` (chạy trong `post-install`).

🟢 **Ở chung an toàn** với ws không dùng Telegram. Đã mô phỏng với
[`ws-bd-mentor`](../ws-bd-mentor/) (chạy Zalo Bot): merge sạch — `zalo`+`telegram` khác khoá,
`main`/`peter`/`thu` cùng sống, hai tuyến rời nhau, `OC_OPENZCA_BIN`+`TZ` trùng giá trị.
⚠ Nhưng post-install của bd-mentor **cài plugin kênh `@tuyenhx/openzalo`**, làm yếu lập luận của
D-21 ("không cài thì tình huống đó không tồn tại"). Chưa nổ vì `setup-openzalo` là lệnh tay — ai gõ
nó là `check-redline` sẽ hét.

## Nấc hiện tại: **C1 ĐÓNG** · 🎯 **C2 chạy thật, còn 5 việc bấm tay** (20/09/2026)

| | |
|---|---|
| Agent bundle `agent-thu/` + prompt ở `uc-data/` | ✅ S1 |
| Kênh Telegram, DM, khoá **đúng một người** | ✅ S1 |
| Ba cổng: red-line · Telegram · binary | ✅ S1 |
| `/zalo-login` — QR gửi thành **ảnh** vào Telegram | ✅ S2 (**D-22** đạt) |
| `/zalo-logout` — đăng xuất, có cổng xác nhận | ✅ S2 |
| `/zalo-test-send` — spike đường gửi bằng CLI | ✅ S2 (**D-23** đạt) |
| Bộ thu tự hồi sinh + `store_health` | ✅ S3 (**D-3** đạt) |
| **Cổng đọc kho** (sqlite, SQL read-only + canary) | ✅ S4 — đo trên kho thật |
| **Luật follow-up** (giờ làm việc / ngày thường) | ✅ S5 — hàm thuần, có test |
| **Danh sách + nút Soát** (`/viec`, tool `list_pending`) | ✅ S6 — nút **đã chạy thật** (C2-j) |
| **Loạt thẻ soát** — bắn hết một lượt, ⛔ không chờ từng nhịp | ✅ D-28 — ngoài lát gốc |
| **Sổ đánh dấu** (Loại trừ · Đánh dấu xong) | ✅ S7 — cả "Xong rồi" lẫn "Không phải khách" đã ghi thật vào `marks.json` |
| **Gọi về người đã bỏ** (`/dabo`, `list_excluded`, nút hoàn nguyên) | 🟡 D-26/D-27 — nửa "bỏ" đã chạy, nửa "gọi về" **chưa** |
| **Câu gọi về chạm-copy trong `/dabo`** | ✅ D-30 — nháy ngược ra `<code>`; đường nút trỏ `/dabo` |
| **Đổi nhịp bằng chat** (`get/set_follow_up_limits`) | ✅ D-24/D-29 — đã đổi thật: 7h–21h · 120 phút |
| **Skill `huong-dan-su-dung`** — chủ gõ "Hướng dẫn sử dụng" | 🟡 C2-m — có trong bundle, **chưa gọi thử** |
| Tra cứu nội dung · báo cáo kỳ · đọc ảnh | ⛔ S8–S10 |
| Phiên sắp xếp thẻ · gửi có chủ đích | ⛔ S11–S17 |

**Hành vi ĐÚNG ở nấc này**: hỏi *"khách nào đang chờ anh"* thì `thu` trả về danh sách thật, kèm
**mốc cập nhật** ở câu đầu. Hỏi sang thứ chưa có (tra nội dung cũ, báo cáo kỳ, thẻ, gửi tin) thì nó
**nói thẳng là chưa có** — xem [agent-thu/TOOLS.md](agent-thu/TOOLS.md). Trả lời trôi chảy về thứ
chưa làm được mới là ca hỏng.

⚠ **Nhịp làm việc là THAM SỐ, ⛔ không phải hằng số** (D-24). Mặc định lúc cài: **cả tuần ·
8h–18h · ngưỡng 8 giờ làm việc (a) · 3 ngày (b)**, lưu ở `uc-data/tham-so-follow-up.json`, chủ
đổi bằng chat (*"tính từ 6 tiếng thôi"*, *"anh nghỉ Chủ nhật"*). 🔴 ⛔ KHÔNG env var — D-20.
🔴 Bản đầu chốt cứng **24 giờ làm việc + T2–T7** và **cả hai đều sai**: khách nhắn chiều Chủ nhật
tới **trưa thứ Tư** mới hiện, còn Chủ nhật thì ⛔ không ai hiện bao giờ trong khi chủ vẫn làm.
Xem decision-log **C2-h**.

🔴 **Chữ ra Telegram là CHỮ TRƠN, và từ nội bộ ⛔ KHÔNG được lọt ra** — hai luật khác nhau, cùng
một nguyên nhân: đường nút của Telegram ⛔ không dựng markdown, và chủ ⛔ không biết "Kho"/"Bộ thu"
nghĩa là gì. Xem **C2-i** (D-25, có cổng test canh cả nhãn nút) và **C2-o** (Luật 0 ở đầu
[agent-thu/AGENTS.md](agent-thu/AGENTS.md) + bảng dịch trong
[../../doc/ws-zalo-assist-agent/CONTEXT.md](../../doc/ws-zalo-assist-agent/CONTEXT.md)).
⚠ Cổng test chỉ canh được chuỗi do **code** dựng; chữ agent **tự sinh** thì chỉ prompt ràng được.

## Plugin `zalo-assist`

Nguồn ở [agent-thu/plugins/zalo-assist/](agent-thu/plugins/zalo-assist/) — tracked trong git, nhưng
**⛔ không bao giờ vào bundle** (`make package` lọc mọi đoạn `plugins/` ra khỏi zip).
[scripts/pack.sh](scripts/pack.sh) dựng nó thành `dist/zalo-assist.zip`.

| Tệp | Vai trò |
|---|---|
| `src/listener.ts` | Phía plugin của Bộ thu — **lớp mỏng**: đọc pid + mốc, gọi lại `config.sh` |
| `src/login.ts` | `/zalo-login` · `/zalo-logout` · `/zalo-status` |
| `src/spike-send.ts` | `/zalo-test-send` — liệt kê thread cho chọn, ⛔ không nhận id bừa |
| `src/store-health.ts` | tool `store_health` — trả **câu công bố mốc cập nhật viết sẵn** |
| `src/freshness.ts` | **hàm thuần, có test** — quyết định Tươi / Nguội / Chết |
| `src/store.ts` | **Cổng đọc kho (S4)** — chỗ DUY NHẤT biết SQL; read-only + canary + bóc placeholder media |
| `src/follow-up.ts` | **Luật follow-up (S5)** — hàm thuần, đồng hồ tiêm vào, đếm giờ làm việc |
| `src/marks.ts` | **Sổ đánh dấu (S7)** — `uc-data/<ws>/marks.json`, ghi nguyên tử |
| `src/nhan-dien.ts` | **Luật 4** — tra tên (bỏ dấu), trùng tên thì trả câu hỏi lại |
| `src/trinh-bay.ts` | **Trình bày + nút (S6)** — hàm thuần; `callback_data` do CODE sinh; **chữ trơn** (D-25) |
| `src/thamso.ts` | **Nhịp làm việc là tham số (D-24/D-29)** — `uc-data/<ws>/tham-so-follow-up.json`, ghi nguyên tử, từ chối giá trị vô lý |
| `src/pending.ts` | nối dây C2: **6 tool** · `/viec` + `/dabo` · bộ xử nút · loạt thẻ soát (D-28) |
| `src/openzca.ts` | chỗ DUY NHẤT biết cách gọi binary + mọi cờ dòng lệnh |
| `src/http-routes.ts` | ⚠ route health — **hiện 404**, giữ làm bằng chứng phép thử (xem đầu tệp) |

🔴 **Nút đi qua slash command `/viec`, ⛔ KHÔNG qua tool.** Kết quả của một tool đi vào ngữ cảnh
LLM, ⛔ không vào `ReplyPayload` của kênh — chỉ `PluginCommandResult` mới mang được
`presentation.blocks` để Telegram dựng inline keyboard. Đường còn lại (tool `message` của core)
bắt **LLM tự gõ `callback_data`**, tức đúng thứ D-11 cấm. Chi tiết: decision-log **C2-c**.

**132 test / 8 tệp** — trong đó `tool-contract.test.ts` gọi `execute(toolCallId, params)` **đúng
như host gọi**. 🔴 Test đó sinh ra từ một lỗi thật: **C2-n** — `execute: async (args) =>` làm `args`
nhận *chuỗi toolCallId*, khiến `set_follow_up_limits` và `mark_thread` **im lặng ⛔ không làm gì**
trong khi câu trả về nghe hoàn toàn bình thường. ⛔ Đừng bỏ tệp test đó.

```bash
cd agent-thu/plugins/zalo-assist
npm install && npm test && npm run typecheck
```

🔴 **Thêm tool mới thì sửa BỐN chỗ**: `src/index.ts` → `openclaw.plugin.json` `contracts.tools` →
`alsoAllow` trong `openclaw.ws-zalo-assist-agent.json` → **test hợp đồng**. Quên chỗ thứ ba thì
agent nói *"chưa lắp"* dù code có đủ (**C2-e**) — [scripts/pack.sh](scripts/pack.sh) có cổng
`check_allowlist()` chặn việc đó ngay lúc đóng gói.

## 🔴 Bộ thu do `config.sh` nuôi, ⛔ KHÔNG qua `registerService`

Đây là quyết định kiến trúc quan trọng nhất của C1 (decision-log **C1-g**, chốt 20/09).

`api.registerService` **⛔ KHÔNG chạy** cho plugin của workspace: plugin được nạp ở pha
agent-runtime, còn `startPluginServices()` chạy trên registry của **gateway** ⇒ `start()` ⛔ không
bao giờ được gọi. Đã thử kéo plugin vào registry gateway bằng `registerHttpRoute` — **trượt**
(route 404).

⇒ `install/config.sh ensure-listener` dựng một vòng `while true` **TÁCH RỜI** (`nohup setsid`),
nhận init làm cha nên sống sót sau khi cái sinh ra nó chết. Cùng khuôn với chính gateway — lệnh
`docker run` tạo container cũng chỉ là một vòng `while true`.

**`config.sh` là NGUỒN DUY NHẤT** biết cách dựng; plugin gọi lại nó qua đường dẫn suy ra được.
**Ba chỗ châm ngòi**: `post-install` · quét QR xong · **mỗi lượt `store_health`**.

⚠ `docker restart` giết cả vòng tách rời và `post-install` ⛔ không tự chạy lại ⇒ Bộ thu nằm im tới
lần châm ngòi kế tiếp. Câu hỏi đầu tiên của chủ sau restart vừa hồi sinh nó vừa báo kho vừa chết
bao lâu.

## Lệnh hay dùng của `config.sh`

```bash
bash install/config.sh set-telegram <TOKEN> <OWNER_ID>  # khai kênh, có kiểm định dạng
bash install/config.sh diagnostic                        # kiểm read-only, ⛔ không in token
bash install/config.sh check-redline                     # 🔴 cổng kiến trúc (Zalo ⛔ không là channel)
bash install/config.sh check-telegram                    # 🔴 cổng danh sách trắng + tuyến kênh
bash install/config.sh ensure-listener                    # dựng Bộ thu (idempotent)
bash install/config.sh listener-status                    # Bộ thu có chạy không
bash install/config.sh sync-self                          # nạp self_profiles nếu thiếu
```

⚠ Sau `set-telegram` phải **restart CỨNG** (`docker restart <container>`) — khối `env` chỉ vào
`process.env` lúc tiến trình khởi động, `openclaw gateway restart` VÔ HIỆU trong docker.

### Ba cái bẫy đã tránh có chủ ý


- 🔴 **`.on("error")` là bắt buộc.** Thiếu nó, binary vắng mặt ⇒ ENOENT nâng thành
  uncaughtException ⇒ host `process.exit(1)` ⇒ **giết cả gateway**. Triệu chứng nhìn từ ngoài:
  "gõ lệnh thì instance khởi động lại" (bug thật ws-bd-mentor 13/09).
- 🔴 **OpenClaw ⛔ không supervise hộ.** `startPluginServices()` chạy đúng một lần; `start()` ném thì
  chỉ `log.error` rồi đi tiếp. Plugin phải tự dựng lại — nếu không kho đứng im vĩnh viễn mà
  ⛔ không có tín hiệu nào.
- 🔴 **Ảnh QR ghi vào `<state>/media`, ⛔ không phải `uc-data/`.** Chỉ tệp nằm trong allowlist media
  root mới gửi được; `uc-data/` ⛔ không có trong danh sách mặc định. Ghi sai chỗ ⇒ người dùng nhận
  một tin **rỗng** (ws-bd-mentor đã cháy đúng vậy 13/09).

---

## Bố cục

```
use-case/ws-zalo-assist-agent/
├── agent-thu/                      # bộ não: 6 tệp prompt + memory/
│   ├── IDENTITY.md  SOUL.md  USER.md
│   ├── AGENTS.md                   # 7 luật vận hành + playbook việc chính
│   ├── TOOLS.md     HEARTBEAT.md
│   └── memory/                     # rỗng trong bundle, agent tự ghi vào uc-data/
├── install/
│   ├── config.sh                   # relocate_data + check_redline + diagnostic
│   └── install-wizard.yaml         # CỬA 1 — Wizard web
├── skills/setup-zalo-assist-agent/
│   ├── SKILL.md                    # CỬA 2 — skill chat
│   └── references/manifest.yaml    #   nguồn máy-đọc của cửa 2
├── openclaw.ws-zalo-assist-agent.json   # delta overlay vs openclaw-origin.json
└── .env.ws-zalo-assist-agent            # danh sách env + cách lấy (⛔ không phải .env thật)
```

⚠ `install/` ở đây **chỉ có `config.sh` + `install-wizard.yaml`**. Năm tệp generic
(`install.sh`, `uninstall.sh`, `verify.sh`, `apply-overrides.mjs`, `apply-overrides.test.mjs`) thuộc
[use-case/_platform/install/](../_platform/install/) và do `make package` bơm vào —
⛔ đừng chép bản riêng vào đây ([ADR 0002](../../docs/adr/0002-platform-install-scripts.md)).

## State sống ở `uc-data/`, ⛔ không ở trong bundle

`install/config.sh relocate-data` dời 6 tệp prompt + `memory/` sang
`~/.openclaw/uc-data/ws-zalo-assist-agent/agent-thu/`, và overlay trỏ
`agents.list[0].workspace` vào đó.

Vì sao: BE bundle-pusher chạy `rm -rf workspace-<ws>/ && unzip -o` **mỗi lần cài lại**. `uc-data/` là
thư mục **anh em** nó ⛔ không đụng tới — nên nó là chỗ duy nhất state sống sót. Từ lát S7 trở đi,
đó là nơi giữ danh sách **Loại trừ**, **Đánh dấu xong**, sao lưu bộ thẻ, và tham số nhịp gửi.

6 tệp `.md` do người viết ⇒ `cp -f` **làm mới mỗi lần cài** (sửa prompt phải tới được máy đã cài).
`memory/` do agent sinh ⇒ **seed-if-absent**.

🔴 Tham số nhịp gửi (giãn cách, trần tin/ngày) **sẽ không bao giờ là env var** (D-20): chủ phải đổi
được bằng chat *giữa chừng* một lượt gửi, mà `apply-overrides` ⛔ không bao giờ đè giá trị đã có
trong `runtime.env` ⇒ env var khoá cứng ở lần cài đầu và lệnh đổi sẽ **⛔ không ăn mà cũng ⛔ không
báo lỗi**.

## Hai cửa onboard

| Cửa | Tệp | Ai đọc |
|---|---|---|
| Wizard web | [install/install-wizard.yaml](install/install-wizard.yaml) | Marketplace Path 2 Wizard |
| Chat | [skills/setup-zalo-assist-agent/references/manifest.yaml](skills/setup-zalo-assist-agent/references/manifest.yaml) | skill setup, qua Telegram |

⚠ Thêm một env var nghĩa là **sửa cả hai**. Cổng canh: `make check-drift WS=ws-zalo-assist-agent`
mục 4b.

## Lệnh hay dùng

```bash
make package WS=ws-zalo-assist-agent        # dựng bundle zip
make check-drift WS=ws-zalo-assist-agent    # soi trôi cấu hình (read-only)
make install-local WS=ws-zalo-assist-agent  # cài thẳng vào gateway local

bash install/config.sh diagnostic     # kiểm read-only, ⛔ không in token
bash install/config.sh check-redline  # 🔴 cổng kiến trúc
bash install/config.sh relocate-data  # chạy lại riêng bước dời prompt
```
