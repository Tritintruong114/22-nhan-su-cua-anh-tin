# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## Sourcing Pipeline

- Canonical normalization script: `sourcing_pipeline/normalize_apify_shortlist.py`
- Role specs live in: `sourcing_pipeline/specs/`
- Do not push sourcing rows directly from raw Apify output to Google Sheets; normalize first.
- Standard sheet headers:
  - Rank
  - Candidate
  - LinkedIn
  - Current Title
  - Company
  - Location
  - Fit Score
  - Match Level
  - Years Signal
  - Key Signals
  - Why Fit
  - Confidence
  - Source
  - Notes

## HR Assistant onboarding

- Canonical user onboarding guide: `ONBOARDING_HR_ASSISTANT.md`
- When the user asks how to use HR Assistant / what this agent does / how to work with this agent, read this file first and guide from it.
- Prefer using the onboarding guide as the default explanation source before improvising a fresh explanation.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## Related

- [Agent workspace](/concepts/agent-workspace)
