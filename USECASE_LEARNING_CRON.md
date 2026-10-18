# Daily Use Case Learning Pipeline

Purpose: help Trí build stronger agent use cases over time by turning each day of product/prototype work into reusable agent-building knowledge.

This is a daily internal learning job. It should be useful for a non-technical founder/operator, while still leveraging OpenClaw/Codex/Claude-terminal style workflows when relevant.

## Daily inputs

Read, when available:

1. `MEMORY.md` — durable strategy, preferences, frameworks, lessons.
2. `memory/YYYY-MM-DD.md` and recent daily notes — raw session logs and mistakes.
3. Recent product repos/docs when relevant, especially:
   - `/home/node/ws-agent-email`
   - `/home/node/usecase-factory`
4. Recent git changes only for context. Do not mutate product repos unless the prompt explicitly asks.

## Daily analysis loop

For each relevant product/use-case from recent work, extract:

1. **Core problem** — what painful job is the agent hired to solve?
2. **Target user / non-tech usability** — who uses it, what do they see, what language makes sense?
3. **Domain layers** — the business objects/processes the agent must understand.
4. **Meta layers** — trust, approval, evidence, memory, governance, training loop, metrics.
5. **Agent decision logic** — what the agent detects, decides, asks, drafts, ignores, escalates.
6. **Core loop** — repeated loop that creates value and improves over time.
7. **OpenClaw advantage** — what OpenClaw enables: local tools, browser, terminal/Codex/Claude workflows, memory, cron, HITL, audit, connected apps.
8. **Sell/build/different test**:
   - Can a buyer understand it quickly?
   - Can a non-tech user operate it safely?
   - Can it be built as a prototype with current OpenClaw/terminal tools?
   - What is different from a chatbot or generic automation?
9. **Lessons learned** — mistakes to avoid, patterns to reuse.
10. **Next experiment** — one concrete thing to test or build next.

## Output rules

Write a daily report to:

`memory/usecase-learning/YYYY-MM-DD.md`

Use this structure:

```markdown
# Use Case Learning — YYYY-MM-DD

## TL;DR

## Strongest pattern learned today

## Use-case improvement notes

## Non-tech usability notes

## OpenClaw / Claude terminal leverage

## Reusable agent design patterns

## Risks / weak spots

## Next experiment for Trí

## Memory candidates
```

If a lesson is durable and broadly useful, append a short distilled entry to `MEMORY.md`. Do not dump raw logs into `MEMORY.md`; only keep reusable principles.

## Safety / boundaries

- Do not send emails, publish posts, message other people, or mutate external services.
- Do not run destructive shell commands.
- Do not push repo changes unless explicitly asked.
- Prefer reading and summarizing over changing files outside `/home/node/.openclaw/workspace`.
- If unsure whether an action is external/destructive, skip it and note the blocker.

## Communication style

When announcing completion to Trí, keep it concise in Vietnamese:

- what was learned,
- where the report was saved,
- 1–3 next recommendations.
