# MEMORY.md

## Hiring / sourcing workflow
- For FireGroup sourcing runs, always use the stable pipeline under `sourcing_pipeline/` instead of manually shaping Google Sheets rows.
- Default contract: JD -> brainstorm/search pack -> Apify raw collection -> local Python normalization -> only push to Google Sheets after requested count is fully met (unless the user explicitly asks for a partial preview).
- Keep Google Sheets output standardized across roles with one fixed header set and one fixed styling contract.
- Never ship mixed sheet formats for different roles in the same project.
- User prefers exact requested counts (e.g. 50 means finalize at 50, not 20 preview rows).

## HR assistant usage guidance
- Keep `ONBOARDING_HR_ASSISTANT.md` as the default user-facing guide for explaining how to use this HR Assistant.
- When the user asks how to use the agent, what it can do, or asks for onboarding/help using it, read that onboarding file first and guide from it.
