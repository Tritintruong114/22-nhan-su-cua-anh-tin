# Agent Souls Backup

This is a portable backup of the **durable brain of every current OpenClaw agent workspace**.

Each `workspace-*` directory preserves:

- canonical agent context documents: `AGENTS.md`, `SOUL.md`, `USER.md`, `TOOLS.md`, `MEMORY.md`, `HEARTBEAT.md`, `IDENTITY.md`, `TASKS.md`, `README.md`, and `BOOTSTRAP.md` when present;
- local `skills/` and `.agents/skills/` directories (instructions plus supporting code/reference files);
- `.clawhub/lock.json` when present, to identify installed skills.

It intentionally does **not** back up generated media, customer/project artifacts, runtime sessions, cache/build dependencies, credentials, authentication data, channel bindings, or gateway configuration. Re-enrol credentials and recreate routing separately when restoring.
