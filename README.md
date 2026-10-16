# 22 Nhân Sự Của Anh Tín — OpenClaw Architecture Registry

> **Generated from the live OpenClaw configuration on 2026-10-16 (UTC).**
> This repository documents architecture only. It intentionally excludes credentials, tokens, cookies, raw transcripts, customer data, private IDs, and executable runtime configuration.

## What is here

- [`docs/architecture.md`](docs/architecture.md): system topology, trust boundaries, routing, runtime components, current risks, and target architecture.
- [`docs/agents.md`](docs/agents.md): registry of the 23 configured agents, their workspaces, exposure state, and operating role.
- [`docs/schedules.md`](docs/schedules.md): 9 scheduled jobs, execution/delivery design, and known failures.
- [`docs/security-baseline.md`](docs/security-baseline.md): redacted audit findings and remediation sequence.

## Current truth in one sentence

The runtime has **23 configured agents**, but only **two inbound service surfaces are explicitly bound**: `youtube-agent` on a dedicated Telegram account and `staff` on Facebook Messenger, Zalo OA, and Web Widget. The rest are currently internal, dashboard/cron-driven, or unbound specialists until a routing decision is made.

## Documentation rules

1. `openclaw.json`, credential files, environment files, raw session stores, and private keys must never be committed here.
2. Runtime configuration is the operational source of truth; this repository is the reviewable architectural source of truth.
3. Any new agent must receive: a registry entry, trust tier, allowed tools/data, owning workspace, routing/cron declaration, human-approval rules, and a smoke-test record.
4. An agent with no binding and no active schedule is classified as **unbound** — not assumed live.

## Next operating gate

Before treating this as a public/multi-user Agent Workforce system: close public DM/group access or isolate public agents, sandbox exposed agents, enforce workspace-only filesystem access, and rotate the connector credential that was present in the live config during this audit.
