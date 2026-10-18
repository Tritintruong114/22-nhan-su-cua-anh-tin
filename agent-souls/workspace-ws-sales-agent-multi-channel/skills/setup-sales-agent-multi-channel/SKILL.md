---
name: setup-sales-agent-multi-channel
description: Set up or re-deploy the multi-channel sales agent (ws-sales-agent-multi-channel) on a cloud OpenClaw instance. Use when the user says "setup sales agent", "cài trợ lý bán hàng", "nối kênh bán hàng", "kết nối Facebook/Zalo/Web", or right after importing/redeploying the ws-sales-agent-multi-channel bundle. Walks completing install then opening the Agent Dashboard to connect channels. Idempotent and diff-aware — skips anything already configured.
---

Drive first-time setup and re-deploy for `ws-sales-agent-multi-channel`. The machine-readable source of truth is `references/manifest.yaml` — read it first and iterate over its `required_env`, `required_config`, `channels_to_pair`, and `verification` entries. Never hardcode those values here.

**S0 scope.** This bundle is at the app-shell slice (#81): the Agent Dashboard (6 tabs, 2 groups) is built, but channel/payment/catalog wiring lands in later slices (S2+). So at S0 there are no env vars or secrets to collect at install — `required_env` is intentionally empty. Setup = finish install, open the dashboard, confirm the shell renders.

## Order of operations

1. Reconnaissance / idempotency check (always first).
2. Confirm the Agent Dashboard renders the 6-tab shell.
3. Point the user at in-app, per-tab configuration (channels, payment, catalog) — those are wired by their own slices and have their own in-dashboard flows.

## Step 0 — Reconnaissance (idempotent)

- Read `references/manifest.yaml`. At S0 `required_env` is empty — nothing to collect.
- If `memory/last-applied-bundle.txt` records a version equal to the imported bundle version, report "already set up" and skip to Step 2.

## Step 1 — Finish install

The setup wizard ships a single **welcome** step. Tell the user to press **Done** to mark install verified and unlock the Agent Dashboard.

## Step 2 — Confirm the shell

Open the Agent Dashboard. Confirm the nav shows **6 tabs in 2 groups** — vận hành (Tổng quan · Hội thoại · Đơn hàng) and cấu hình (Sản phẩm · Cửa hàng · Nhân viên AI) — and that the **Run-switch** pill (🟢 Đang trực / ⏸ Đã tắt) opens the giờ-trực popover.

Tell the user, in Vietnamese:

> Mở Agent Dashboard. Bạn sẽ thấy thanh tab 6 mục chia 2 nhóm và nút trạng thái (🟢 Đang trực) ở trên — bấm vào để chỉnh giờ trực. Các tab nội dung (kênh, sản phẩm, đơn hàng…) sẽ được nối ở các bước sau.

## Gotchas

- The `ui:` dashboard is rendered by the FE UiRenderer (use-case-renderers), not by this bundle. A blank dashboard usually means the renderer node version is behind — not a setup error.
