# Scheduled Operations

> Schedule times below are presented as configured. IDs, private recipients, page IDs, spreadsheet IDs, prompt bodies and credentials are intentionally excluded.

| Job | Agent | Schedule | Purpose | Last observed state | Issue / decision |
|---|---|---|---|---|---|
| XinChao daily Facebook scheduling | `mobile-ua` | 11:00 daily, Asia/Ho_Chi_Minh | Take approved manifest, upload image, create scheduled Facebook post and verify | **Error, 10 consecutive** | Model override incompatible with current Codex/ChatGPT account. Replace with supported model and verify before re-enabling. |
| Daily B2B pipeline update questions | `clawexperts-monitoring` | 13:00 daily, Asia/Ho_Chi_Minh | Ask/update concise B2B pipeline status | OK | Delivery target must be explicit for Zalo OA. |
| Sales auto-judge | `sales-agent-multi-channel` | Every 6 hours | Judge idle conversations once | **Error, 4 consecutive** | Agent response generation failed; tool may have run. Verify idempotency and tool logs before retry. |
| Weekly Linear review | `clawexperts-monitoring` | Friday 17:00, Asia/Ho_Chi_Minh | Update weekly Sales Agent review | OK | `announce -> last` has no deterministic route in multi-channel setup; set explicit delivery. |
| Daily B2B next actions | `clawexperts-monitoring` | 09:00 daily, Asia/Ho_Chi_Minh | Summarise next actions from CRM/memory | OK | Delivery target must be explicit for Zalo OA. |
| Daily YouTube analytics report | `youtube-agent` | 09:00 daily, Asia/Ho_Chi_Minh | Refresh analytics and report to Telegram | Run OK / delivery not delivered | Validate Telegram recipient/account delivery. |
| XinChao daily content generation | `mobile-ua` | 10:15 daily, Asia/Ho_Chi_Minh | Generate content experiment image + handoff manifest | **Error, 3 consecutive** | Same unsupported model override. Delivery is unnecessary; set none without Web target ambiguity. |
| Weekday market scan | `youtube-agent` | 08:30 weekdays, Asia/Ho_Chi_Minh | Market scan and video/product implications | Run OK / delivery not delivered | Validate Telegram recipient/account delivery. |
| XinChao weekly Facebook metrics | `mobile-ua` | Monday 14:00, Asia/Ho_Chi_Minh | Update tracker and experiment readout | **Error, 2 consecutive** | Isolated run aborted; uses incompatible model override and ambiguous Web delivery. |

## Schedule design rules

1. Every schedule must have exactly one owner, purpose, idempotency strategy, output location and explicit delivery target — or `delivery: none`.
2. A job that mutates external systems must write an audit artifact and verify the postcondition before marking success.
3. `last` delivery target is invalid in a multi-channel operating model; specify channel + recipient/session explicitly.
4. Separate content generation from external publication, as the XinChao pipeline already intends; retain a machine-readable handoff manifest.
5. Treat recurring errors as incident tickets, not background noise. Disable or repair after a defined consecutive-error threshold.
