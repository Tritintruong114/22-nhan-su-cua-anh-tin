# TOOLS.md - Local Notes

This workspace is for training and designing AI Agent workflows. Keep notes here about local conventions, command patterns, and reusable pipelines.

## Default Workstream

The core pipeline for AI Agent use-case development:

```text
/use-case-factory + specific use-case idea and market
  -> Layer 1: Market Research
  -> Market Sizing / JTBD Pain / Competitor Landscape / Persona
  -> 4 input files
  -> 05-synthesis.md
  -> /grill-to-brief
  -> 06-screen-brief.md
  -> /to-mockups
  -> 07-mockup.md
  -> /to-html
  -> 08-mockup.data.js
```

Recommended artifact structure:

```text
use-cases/<slug>/
  01-market-sizing.md
  02-jtbd-pain.md
  03-competitor-landscape.md
  04-persona.md
  05-synthesis.md
  06-screen-brief.md
  07-mockup.md
  08-mockup.data.js
```

## Agent Roles

Use these roles when decomposing research:

- **Market Sizing Agent:** Estimate buyer pool, budget, urgency, and market maturity.
- **JTBD/Pain Agent:** Extract jobs-to-be-done, current workflow, pain intensity, and workarounds.
- **Competitor Landscape Agent:** Map existing tools, substitutes, and gaps.
- **Persona Agent:** Separate buyer, user, admin, influencer, and blocker.
- **Synthesis Agent:** Turn research into decisions, risks, and MVP wedge.
- **Grill-to-Brief Agent:** Challenge assumptions and convert the idea into a screen/product brief.
- **Mockup Agent:** Translate the brief into screens, states, and interactions.

## Scoring Rubric

Use a 1-5 score unless the human asks for another format:

- Market Pain
- Willingness to Pay
- Agent Fit
- Data Availability
- Integration Ease
- Go-to-Market Ease

Default weighting:

```text
Priority Score =
Pain * 0.25 +
WTP * 0.20 +
Agent Fit * 0.20 +
Data * 0.10 +
Integration * 0.10 +
GTM * 0.15
```

## Vietnam Research Lens

When researching Vietnam AI Agent use-cases, pay attention to:

- Zalo, Facebook, TikTok, and marketplace-driven workflows
- SME back-office operations
- Manual sales and customer service follow-up
- Price sensitivity and low setup tolerance
- Trust, compliance, and Vietnamese-language UX
- Existing spreadsheet/chat/manual workarounds

## Teaching / Content Workstream

Current YouTube direction: **Second Brain for AI**.

Use the workspace's durable markdown files as the teaching spine: show how AI Agent builders preserve context in files instead of losing it in chat history, then connect that practice to Claude/Codex/OpenClaw-style agent workflows.

## Tooling Notes

- Prefer `rg` for search when available. In this workspace it was unavailable from 2026-06-23 through 2026-07-06, but was available again on 2026-08-10.
- If semantic `memory_search` is unavailable, review `MEMORY.md` and recent `memory/YYYY-MM-DD.md` files directly before drawing on prior positioning or workflow notes. It was unavailable from 2026-06-29 through 2026-07-06 due to missing direct OpenAI API key configuration, unavailable on 2026-08-10 and 2026-08-11 because the memory index metadata was stale or missing, and still unavailable from 2026-08-12 through 2026-08-18 because the memory index metadata was missing during heartbeat recall. On 2026-08-14, `openclaw memory status --index` showed rebuilds are blocked by OpenAI embeddings quota exhaustion (`credit_balance_exhausted`), so continue the local-file fallback until billing/quota is restored and the index can be rebuilt.
- Use structured files and schemas instead of loose prompt dumps.
- Before changing config, schedulers, or external integrations, inspect current state first.

## Workflow Artifact Convention

When defining or refining an AI Agent workflow, capture the reusable contract:

- Agent role
- Input schema
- Output schema
- Evaluation rubric
- Failure modes
- Human review points
