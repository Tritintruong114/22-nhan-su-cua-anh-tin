---
name: edit-agent-dashboard
description: Edit the agent dashboard (Operation phase surface at /use-cases/:id/operate) of an installed use-case. Use when the End-User asks to customize their dashboard — rename a phase/view label, change layout (tabs/accordion), update help text, add a new tab/view/section (reusing an existing route OR generating a new plugin route for a new data destination), remove a phase or view, or reorder phases/views. Triggers on Vietnamese phrases like "đổi tên tab", "thêm tab", "thêm bước", "thêm section", "thêm tính năng quản lý X", "thêm trang", "chỉnh sửa dashboard", "tinh chỉnh dashboard", "xoá phase", "đổi layout", "tạo trang mới", "lưu data vào file mới" and English equivalents like "rename tab", "add a dashboard tab", "add a section", "edit the dashboard", "store data in a new file", "remove view", "reorder phases". All edits are per-Instance and ephemeral — bundle re-install resets to the shipped version.
---

You modify the agent dashboard of the currently active use-case Instance. Files you touch live under `~/.openclaw/workspace-<ws>/`. Changes are picked up by the platform FE on next refetch (user may need to refresh the page).

This SKILL.md is a **thin router**. The detailed playbook for each case is fetched on-demand from the web — single source of truth, improved continuously without re-bundling.

## Information Sources (priority order)

1. **Local `manage.yaml`** — `$WS_DIR/install/manage.yaml`. Authoritative current state of the dashboard. Read FIRST, every time.
2. **Local plugin source** — `$WS_DIR/agent-*/plugins/*/`. Authoritative for what routes exist + their `${BASE}` const. Never invent a route URL; always grep this tree.
3. **Web playbook index** — `https://raw.githubusercontent.com/try-open-claw-io/skills.tryopenclaw.io/main/edit-agent-dashboard/llms.txt`. Lists every case + reference file with one-line descriptions. Fetch FIRST to confirm which leaf to pull.
4. **Web playbook leaves** — `https://raw.githubusercontent.com/try-open-claw-io/skills.tryopenclaw.io/main/edit-agent-dashboard/<file>`. Fetched on-demand per the classification below.
5. **Local fallback** — `references/` next to this `SKILL.md`. Offline snapshot of (3) + (4). Use ONLY if WebFetch fails twice. Cite that you used the snapshot in your reply so the user knows it may be stale.

Future host migration: when `https://skills.tryopenclaw.io/` DNS goes live, the same paths work — just swap the base URL.

## Identify the target workspace first

The dashboard belongs to one use-case. Find which:

1. If the user names the use-case → use it.
2. Else list `~/.openclaw/` for `workspace-ws-*` folders. If exactly one → use it. If multiple → ask the user which one.
3. Set `WS_DIR=~/.openclaw/workspace-<ws-name>` and use it throughout. The manage file is at `$WS_DIR/install/manage.yaml`.

## Determine the dashboard model first

A `manage.yaml` uses ONE of two models. Detect which by reading it:

- **Flat model** — has `operation_phases:`. Each phase has `views[*]` of a fixed view type. Grammar reference = `view-types.yaml`. Use the Case A/B/C table below.
- **App model** — has a `ui:` block (north-star §14): multi-screen tree of Kit components + JEXL, with `screens`/`nav`/`state`/`computed`/`components`/`actions`. Grammar reference = **`node-types.yaml`** (the 18-node palette + envelope + actions + expression rules + an `editable_scope` with the same case_a/b/c risk tiers). When editing a `ui:` dashboard, fetch `node-types.yaml` instead of `view-types.yaml`; the Hard Rules below still apply (diff + OK, backup, never invent routes, build-before-wire for new routes).

The two are mutually exclusive on a given screen. If the dashboard has `ui:`, work the App model; otherwise work the flat model.

## Classify the request

Read `$WS_DIR/install/manage.yaml` first. Then pick the smallest case that can satisfy the request:

| Request | Case | Fetch this playbook |
|---|---|---|
| Rename label/help/icon, change layout, reorder, remove a phase/view | **Case A** | `…/edit-agent-dashboard/case-rename.md` |
| Add a new tab/view that can REUSE a route already wired in current manage.yaml | **Case B** | `…/edit-agent-dashboard/case-reuse.md` |
| Add a tab/view that needs a NEW data destination (new file or new view type with new schema) | **Case C** | `…/edit-agent-dashboard/case-new-route.md` |

Always start with the lowest case that works. Do NOT jump to Case C if Case B can serve the request — it ships less risk.

Always also fetch the grammar reference before adding any new node/View: `…/edit-agent-dashboard/view-types.yaml` for the flat model, or `…/edit-agent-dashboard/node-types.yaml` for the App model (`ui:`). For the App model, the case mapping is: rename/restyle/reorder/remove = case_a, add node/screen/component reusing existing routes = case_b, needs a new plugin route = case_c (these are documented inline in `node-types.yaml` under `editable_scope`).

For Case C, also fetch `…/edit-agent-dashboard/safety-rollback.md` + the relevant handler templates under `…/edit-agent-dashboard/handler-templates/` BEFORE starting.

(Base URL: `https://raw.githubusercontent.com/try-open-claw-io/skills.tryopenclaw.io/main`.)

## Hard rules across all cases

- ALWAYS show the user a diff of the proposed change and wait for explicit "OK" before writing anything.
- ALWAYS write a backup `manage.yaml.bak` next to `manage.yaml` immediately before overwriting it.
- ALWAYS derive new route URLs from the plugin's existing `${BASE}` const (search `operation-routes.ts` or equivalent for `const BASE =`). Copy that prefix verbatim into `manage.yaml`. Do not hand-construct route URLs.
- NEVER invent a `plugin_route / save_route / upload_route / submit_route / url_route` URL. Either reuse one already in manage.yaml (Case B) or generate the corresponding handler + register it (Case C). No middle ground.
- NEVER change `views[*].type` of an existing view. Adding a new view of any allowed type is fine.
- ENTRY_CONDITION for every new phase MUST be `install_status == 'verified'`. Do not invent new conditions.

## Concurrency

Use a lock to avoid two agents racing on the same workspace:

- Path: `$WS_DIR/.edit-agent-dashboard.lock`
- Acquire: write current PID + ISO timestamp to the lock. If the file already exists AND its mtime is newer than 5 minutes ago → another agent is editing, ask user to retry shortly. If older than 5 minutes → treat as stale, overwrite.
- Release: delete the lock when the workflow finishes OR rolls back.

## Build & install plugin (Case C only)

Case C generates TypeScript that must be compiled and registered with the running gateway. The build command is plugin-specific.

1. Read `<plugin>/package.json` and look at `scripts`. Identify the script that builds plugin output into `dist/`. Common names: `build:plugin`, `build:ship`, `build`. If multiple candidates exist or none look right → ask the user which to run.
2. Detect package manager: `bun` if `bun.lockb` exists, else `pnpm` for `pnpm-lock.yaml`, else `npm`. Use `<pm> run <script>`.
3. Run the build, capture exit code AND a fresh listing of `<plugin>/dist/`. Build is OK only when exit code is 0 AND `dist/` contents changed.
4. Reload the gateway: `openclaw gateway restart`. Wait at least 60 seconds before checking; on cloud, up to 120 seconds — plugins re-register lazily on first request.
5. Verify the new route is alive (e.g. `curl` the read route, expect non-404). If verification fails → ROLLBACK (fetch `safety-rollback.md`).

Only AFTER build + restart + verification succeeds do you update `manage.yaml`. If you update `manage.yaml` first and the route ends up dead, the FE renders a dangling view that errors on load.

## STOP criteria — early termination

Burning iterations on impossible work is worse than reporting failure. STOP IMMEDIATELY and report when ANY of:

- **Out of scope** — the request needs something this skill never touches (see list below). Tell the user what they're asking for + which other skill/manual step is the right escalation.
- **Cannot classify** — the request fits neither Case A, B, nor C cleanly. Ask the user to clarify; do not guess.
- **Build fails twice with the same error** — the third attempt is a loop. Rollback per `safety-rollback.md` + report root cause.
- **Same file modified > 3 times in one session** — you are likely thrashing. Stop, summarize state, ask the user to confirm direction.
- **Lock owned by a non-stale PID** — another agent is editing. Tell the user, do not steal the lock.
- **Web playbook fetch fails twice AND local fallback missing for that file** — you do not have the instructions. Tell the user; do not improvise the playbook from memory.

## After every successful edit

Tell the user in 1–3 sentences:

- What changed (e.g. "Đã thêm tab 'Cấu hình bot reply' vào dashboard.")
- What route/file backs it (only for Case B + C — Case A is just YAML)
- **Cite the playbook URL you followed** (e.g. "Theo `…/edit-agent-dashboard/case-reuse.md`"). If you used the local fallback snapshot, say so.
- Reminder: "Refresh trang `/use-cases/:id/operate` (hoặc đợi tối đa 5 phút) để thấy thay đổi."
- **Ephemeral warning**: "*Lưu ý:* tinh chỉnh này chỉ tồn tại trên Instance hiện tại. Khi cài lại bản mới của use-case (bundle re-install), customization sẽ bị reset về version Expert ship." — show on EVERY case (A/B/C), not just Case C.

## What this skill never touches

- `openclaw.json` (instance config)
- `agents.list[]` registration
- Files under `~/.openclaw/agents/<id>/`
- Bundle source files at `~/.openclaw/use-cases/<ws>/bundle.zip`
- Anything outside `$WS_DIR`
- Any code/file outside the workspace's own `agent-*/plugins/<plugin>/` tree

If the user asks for something requiring those — escalate per STOP criteria, do not attempt.
