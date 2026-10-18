# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

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

## OpenClaw Instance

- Public instance URL: https://op6wc1y.instance.tryopenclaw.io
- If an agent needs to share or reference this OpenClaw instance, use the public URL above.
- Keep gateway tokens, API keys, and other secrets private; do not expose them in chat or docs.

## Content Production Setup

- Main camera option: DJI 3
- Phone camera option: iPhone 11 Pro Max
- Audio: DJI mic
- Lighting: 1 softbox (fill/bù sáng)
- Desk: 2 monitors, 1 Mac mini, 2 speakers
- Support: full tripod kit

### Shooting implications

- Best default format: talking head on DJI + desk/monitor B-roll on DJI + close-up hand macro/inserts on iPhone when needed + screen-record explainer.
- DJI is the main camera for A-roll and primary visual look.
- DJI can also be used for motion/establishing shots, room reveal, or cinematic transitions.
- iPhone is the support camera: quick inserts, macro details, backup angle, or vertical cutdowns.
- Softbox should be treated as fill light, not dramatic key light.

## Related

- [Agent workspace](/concepts/agent-workspace)
