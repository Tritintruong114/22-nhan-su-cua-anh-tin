---
name: use-case-factory
description: "Research AI Agent use-case ideas with OpenClaw/Codex workers and produce a dossier, four discovery docs, and a Proceed/Pivot/Narrow/Kill decision."
---

# Use-Case Factory

Use when Trí wants to evaluate an AI Agent product/use-case idea before designing screens or building.

This is the OpenClaw-native Use-Case Factory. It keeps the original evidence rules, worker roles, templates, and Decision Gate, and runs through OpenClaw/Codex orchestration.

## Workflow

1. Parse input as `<slug> <idea + target market>`.
2. Use `/home/node/use-case-factory/scripts/scaffold-workspace.sh <slug>` to create the output folder if needed.
3. Read `/home/node/use-case-factory/references/playbook.md` before researching.
4. If the idea is missing key context, ask at most five short questions, one at a time:
   what it is, for whom, pain, market, who pays.
5. Run four research lanes, preferably in parallel:
   market sizing, JTBD/pain, competitor/substitute, persona/WTP.
6. Use web search/fetch for market claims. Local notes and `brief.md` are seed context only.
7. Build `_research/dossier.md` first. It is the source of truth.
8. Synthesize the four output docs only from dossier evidence.
9. Render exactly one verdict: Proceed, Pivot, Narrow, or Kill.
10. Run validation scripts before finishing.

## Output

Default workspace:

```text
/home/node/.openclaw/workspace/content/usecases/ws-<slug>/
  brief.md
  _research/dossier.md
  Boi-Canh-Va-Van-De.md
  MR-<slug>-Problem-Solution.md
  Target-User-<slug>.md
  MVP-Coreloop.md
```

## Worker Specs

Worker prompt specs live in `/home/node/use-case-factory/references/agents/`:

- `market-sizing-researcher.md`
- `jtbd-pain-researcher.md`
- `competitor-substitute-researcher.md`
- `persona-wtp-researcher.md`
- `decision-gate-reviewer.md`

Use Codex subagents when available. If not, run the lanes sequentially in the current session and keep each worker report clearly separated in `_research/worker-*.md`.

## Validation

```bash
bash /home/node/use-case-factory/scripts/validate-dossier.sh /home/node/.openclaw/workspace/content/usecases/ws-<slug>/_research/dossier.md
bash /home/node/use-case-factory/scripts/coverage-check.sh /home/node/.openclaw/workspace/content/usecases/ws-<slug> <slug>
```

## Hard Rules

- The internet is the research engine for market size, competitors, pain, pricing, adoption, and regulation.
- `brief.md`, memory, and local notes are seed context only, never market evidence.
- Every claim is tagged: `must-cite`, `infer`, or `assumption`.
- Never fabricate numbers. Missing evidence becomes a gap or primary-research question.
- A substitute existing is not enough to pivot; it must clearly win.
- Unverified WTP is normal at this stage. It is a top risk, not an automatic reason to downgrade.
- Do not create screens, UI maps, HTML mockups, or screen briefs.
