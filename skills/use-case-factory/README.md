# OpenClaw Use-Case Factory

OpenClaw-native Use-Case Factory for researching AI Agent product ideas.

It turns one **AI Agent use-case idea** into:

- `_research/dossier.md`
- `Boi-Canh-Va-Van-De.md`
- `MR-<slug>-Problem-Solution.md`
- `Target-User-<slug>.md`
- `MVP-Coreloop.md`
- one verdict: **Proceed / Pivot / Narrow / Kill**

The factory is for market research and decision-making before screens, mockups, or implementation.

## Folder Shape

```text
/home/node/use-case-factory/
  SKILL.md
  README.md
  PRIVACY.md
  references/
    playbook.md
    agents/
      market-sizing-researcher.md
      jtbd-pain-researcher.md
      competitor-substitute-researcher.md
      persona-wtp-researcher.md
      decision-gate-reviewer.md
  assets/
    templates/
      00-research-dossier.template.md
      01-context-problem.template.md
      02-mr-problem-solution.template.md
      03-target-user.template.md
      04-mvp-coreloop.template.md
  scripts/
    scaffold-workspace.sh
    validate-dossier.sh
    coverage-check.sh
```

## Default Output

```text
/home/node/.openclaw/workspace/content/usecases/ws-<slug>/
```

## Create a Workspace

```bash
bash /home/node/use-case-factory/scripts/scaffold-workspace.sh sale-ai-agent
```

This creates:

```text
brief.md
_research/
_research/worker-A-market-sizing.md
_research/worker-B-jtbd-pain.md
_research/worker-C-competitor-substitute.md
_research/worker-D-persona-wtp.md
```

The final docs are created by the OpenClaw skill after research.

## Run in OpenClaw

Ask the agent:

```text
chạy use-case-factory sale-ai-agent cho ý tưởng AI sales agent follow up lead Zalo/Facebook cho SME Việt Nam
```

OpenClaw should load `SKILL.md`, read `references/playbook.md`, run/fill the research lanes, synthesize the dossier, then validate the final docs.

## Validation

```bash
bash /home/node/use-case-factory/scripts/validate-dossier.sh /home/node/.openclaw/workspace/content/usecases/ws-sale-ai-agent/_research/dossier.md
bash /home/node/use-case-factory/scripts/coverage-check.sh /home/node/.openclaw/workspace/content/usecases/ws-sale-ai-agent sale-ai-agent
```

## Compatibility Notes

- The command-style trigger is now an OpenClaw skill invocation through natural language.
- Worker agents are OpenClaw/Codex worker specs in `references/agents/`.
- Default output lives in OpenClaw workspace content: `content/usecases/ws-<slug>`.
- Web research uses whichever OpenClaw web tools are available in the active runtime.
- The evidence model and Decision Gate are preserved.
