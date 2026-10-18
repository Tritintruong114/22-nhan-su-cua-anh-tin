# facebook-messenger — OpenClaw Channel Plugin

> ⚠ **SERVICE MODEL + WEBHOOK-PUSH** (SSE-pull đã BỎ HẲN 2026-09-22). Trước đây inbound
> tới bằng cách PULL một SSE stream (`src/sse-consumer.ts`, đã git rm). Nay service **PUSH**
> mỗi inbound (POST đã ký HMAC) tới một route receiver của plugin. Thiếu URL public để
> service push tới → **FAIL-LOUD** (log error + KHÔNG start inbound), KHÔNG âm thầm fallback
> SSE nữa. Luồng đầy đủ + số đo: `doc/ws-sales-agent-multi-channel/solution-architecture.md`.

Plugin OpenClaw nối Facebook Page Messenger vào agent bán hàng. Đây là một
**thin client** tới `sales-agent-multi-channel` backend service (shared, team-hosted):
service giữ toàn bộ OAuth + Meta webhook + Page Access Token, plugin nhận inbound
(webhook-push từ service) và gửi outbound (proxy). **Không lưu token Meta cục bộ, không gọi
`graph.facebook.com` trực tiếp.** (HMAC push verify bằng `sha256(apiKey)` — xem Tính năng.)

Cùng cặp với `zalo-oa` (arm Zalo) — hai plugin dùng chung agent, chung sales-manager
plugin, chung mô hình HITL + Telegram notify.

## Tính năng

- **Inbound qua webhook-push** — plugin đăng ký `POST {serviceUrl}/v1/delivery-webhook` (apiKey-scoped, base_url lấy từ `OPENCLAW_PUBLIC_BASE_URL` hoặc override `OC_FB_PUSH_PUBLIC_URL`) rồi **serve** route receiver `POST /fb-inbound-push/<accountId>`. Service PUSH mỗi inbound (ký HMAC `X-OC-Signature = sha256=hmac(rawBody, key=sha256(apiKey))`) → plugin verify → **AWAIT dispatch** → trả 2xx. Thiếu URL public → **FAIL-LOUD** (KHÔNG start inbound, KHÔNG fallback SSE). **KHÔNG có Meta webhook trong plugin** — service sở hữu webhook Meta (verify HMAC SHA1) và re-push xuống plugin.
- **Outbound qua proxy** — `POST {serviceUrl}/v1/pages/<pageId>/messages` (Bearer API key): text + ảnh-theo-URL. Service dịch sang Send API của Meta Graph.
- **Ảnh trong reply** — agent xuất `![<tên món>](<url>)` (markdown; legacy `[ẢNH: <url>]` vẫn parse) → plugin gửi attachment URL-based qua service (1 call/ảnh, không upload binary).
- **24h messaging window** — Messenger Platform giới hạn. Plugin reject outbound message nếu last user msg >24h.
- **Page discovery + sticky reconcile** — `GET {serviceUrl}/v1/pages` trả page(s) đã Connect. Chủ shop không nhập pageId — plugin tự phát hiện + bám page đang kết nối, rebind khi operator disconnect/connect page khác, KHÔNG cần gateway restart.
- **HITL tiếp quản (parity Zalo)** — pause/resume 1 khách từ dashboard; lúc paused, tin khách vẫn persist + buffer, KHÔNG auto-reply; resume = drain-không-replay.
- **Escalate "khách cần hỗ trợ"** — agent phát token `[HANDOFF:<lý do>]`, quyết định ở `src/handoff-policy.ts` (rule theo `agent-staff/knowledge/escalation.md`) + failsafe khi agent lỗi/không nhả tin.
- **Telegram HITL** — tuỳ chọn (`OC_WS_FBSALES_TG_BOT_TOKEN` + `OC_WS_FBSALES_TG_GROUP_ID`), báo chủ shop khi có ca cần hỗ trợ.

## Kết nối (setup outline)

Chủ shop **không** đụng Meta Developer Console — service đã đăng ký sẵn 1 Meta App cho
mọi tenant. Kết nối qua plugin `agent-staff/plugins/facebook-pages` (Operate page route
`/oauth/start` → consent Meta → service tự đăng ký + subscribe page) — xem README của
plugin đó cho chi tiết luồng OAuth.

## Architecture

```
                    Meta Graph API
                             │
                    sales-agent-multi-channel service
                    (OAuth · Meta webhook (HMAC SHA1) · Page Access Token · Send API proxy)
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
   POST /fb-inbound-push/… POST /v1/pages/…/msgs  GET /v1/pages
   (inbound PUSH,ký HMAC   (outbound text/ảnh)   (discovery)
    service→plugin)           │                  │
          └────────── facebook-messenger plugin ──┘
                             │
                    OpenClaw gateway
              (agent reply · sales-manager tools ·
               HITL bridge · Telegram notify)
```

## Env vars

| Var | Bắt buộc | Ý nghĩa |
|---|---|---|
| `OC_SALE_AGENT_MULTI_URL` | ✓ | Base URL của backend service (không đuôi `/`). Inject lúc install. |
| `OC_SALE_AGENT_MULTI_CUSTOMER_API_KEY` | ✓ | Bearer key per-tenant (`ocfb_...`, auto-mint lúc install) — cô lập page của tenant. |
| `OC_WS_FBSALES_TG_BOT_TOKEN` | — | Bot Telegram (bật HITL notify). |
| `OC_WS_FBSALES_TG_GROUP_ID` | — | Chat/group Telegram nhận notify. |
| `OC_WS_FBSALES_TG_WEBHOOK_SECRET` | — | Secret cho callback Telegram (nếu dùng). |

## Files

| File | Purpose |
|---|---|
| `index.ts` | Plugin entry — registers channel + secrets + runtime |
| `api.ts` | Re-export `facebookMessengerPlugin` |
| `runtime-api.ts` | Re-export `setFacebookMessengerRuntime` |
| `secret-contract-api.ts` | Re-export `channelSecrets` declaration |
| `src/channel.ts` | `ChannelPlugin` — meta, dispatch, HITL, Telegram wiring |
| `src/channel.runtime.ts` | `startAccount()` — page reconcile + **webhook-push receiver route** (`/fb-inbound-push/<accountId>`) + verify HMAC `sha256(apiKey)` + register `/v1/delivery-webhook`. FAIL-LOUD nếu thiếu public URL (SSE-pull đã bỏ 2026-09-22) |
| `src/service-client.ts` | Service HTTP client (`/v1/pages`, `/v1/delivery-webhook`, send text/ảnh) |
| `src/config-schema.ts` | Reads `channels.facebook-messenger.*` from openclaw.json + resolve Telegram HITL |
| `src/accounts.ts` | Multi-account resolver (typically just `default`) + pageId discovery |
| `src/constants.ts` | Resolve `serviceUrl` / `apiKey` (env-first) |
| `src/types.ts` | Type defs (config, account, inbound event) — some legacy direct-Meta fields (`pageAccessToken`) kept for type compat but unused in SERVICE MODEL |
| `src/runtime.ts` | `setFacebookMessengerRuntime()` — runtime hooks |
| `src/secret-contract.ts` | Declares which fields are secrets |
| `src/webhook-handler.ts` | Parses push payload → `ParsedInboundEvent` (name kept from the pre-service era) |
| `src/hmac.ts` | SHA1/SHA256 HMAC helpers. Meta-webhook SHA1 verify là service-side; SHA256 dùng cho **webhook-push verify** (`sha256(apiKey)`) ở `channel.runtime.ts` |
| `src/send.ts` | Chunk text + gửi ảnh (qua service proxy) |
| `src/window-24h.ts` | 24h messaging window enforcement |

## Differences vs `zalo-oa` plugin

| | zalo-oa | facebook-messenger |
|---|---|---|
| Webhook signature (tại SERVICE) | SHA256 HMAC | SHA1 HMAC |
| Messaging window | 48h CS window | 24h messaging window |
| Send endpoint (service → Meta/Zalo) | `openapi.zalo.me/v3.0/oa/message/cs` | `graph.facebook.com/v23.0/me/messages` |
| Discovery endpoint | `GET /v1/oas` | `GET /v1/pages` |

> Cả hai plugin đều là **thin client**: KHÔNG giữ token kênh, KHÔNG gọi Graph/Zalo trực
> tiếp — toàn bộ OAuth/token/webhook-kênh nằm ở UC-Service (`sales-agent-multi-channel`).
> (Plugin CÓ verify HMAC của **webhook-push** service→plugin bằng `sha256(apiKey)`; đây là
> ranh giới push nội bộ, khác với HMAC webhook Meta/Zalo do service verify.)

## Build

```bash
cd integrations/facebook-messenger
bun install
bun run build:ship   # bundles src/* into dist/ for plugin install
```
