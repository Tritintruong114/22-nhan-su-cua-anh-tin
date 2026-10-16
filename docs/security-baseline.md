# Security Baseline and Remediation

## Audit result

The live `openclaw security audit` reported **53 critical, 24 warnings and 1 informational finding** on 2026-10-16. The count includes repeated file-permission findings across agent stores. This document groups the root causes rather than copying sensitive paths or configuration values.

## P0 — stop unsafe public-to-privileged paths

### A. Control UI security bypasses enabled
Observed: device authentication disabled, insecure auth allowed, and host-header origin fallback enabled.

**Fix:** retain explicit allowed origins, disable all three bypass flags, then test local/dashboard access.

### B. Public/open messaging policies combined with privileged tools
Observed: public Telegram and Discord DM/group policies, wildcard allowlists, broad `full` tools, runtime execution/filesystem availability, and no full sandboxing across many agents.

**Fix:**
1. Change public DM/group policies to pairing or explicit allowlists wherever possible.
2. For an intentionally public bot, use a dedicated public agent with a minimal/explicit tool allowlist.
3. Deny runtime, broad filesystem, arbitrary web and agent-to-agent tools on public workers.
4. Enable sandboxing for exposed workers and set filesystem access to workspace-only.
5. Separate public ingress from manager/private agent identities and credentials.

### C. Secrets exposed in live config inspection
A connector credential existed inline in the runtime configuration accessed during this audit. It is not committed to this repository.

**Fix:** rotate that connector credential immediately, move it to an environment/secret provider reference, and restrict config file read access.

## P1 — permissions and configuration integrity

Observed: core config, credentials directory, multiple agent auth SQLite stores, session indexes, workspace environment files and at least one private key were group-readable/writable.

**Target permissions:**
- Gateway config, `.env`, private keys, auth DBs/session indexes: `0600`
- Credentials directory: `0700`
- Regular source/documentation: `0644`
- Directories containing normal workspace files: `0750` or tighter as appropriate

Apply after checking service user/group ownership; do not blindly recurse over runtime directories.

## P1 — capability and supply-chain boundaries

- Global tool profile is broad and agent-to-agent allowlist includes wildcard access.
- Plugin tools are reachable under permissive policies.
- At least one plugin install record is not version-pinned.
- Agent skill allowlists are not an OS/shell authorization boundary when host exec is available.

**Fix:** make tool permissions agent-specific; pin extensions; treat host execution and external MCP clients as privileged infrastructure; isolate by sandbox/container/OS-user when required.

## P2 — operational resilience

- Multiple cron jobs fail repeatedly.
- Some scheduled deliveries have ambiguous recipient/channel targets.
- OpenClaw update is available; current runtime should be upgraded only after config backup and smoke tests.
- Two workspaces still contain bootstrap files; a live channel-facing worker is among them.

## Verification checklist after remediation

```text
[ ] openclaw status --deep: gateway and required channels healthy
[ ] openclaw security audit: no critical public-to-privileged findings
[ ] public agent cannot run exec/read arbitrary files/inspect private sessions
[ ] each bound agent passes one inbound smoke test
[ ] each active cron has explicit target or delivery:none
[ ] erroring cron jobs are repaired, disabled, or ticketed with owner
[ ] secrets scan of this repository is clean
[ ] architecture registry is updated with decision date and owner
```
