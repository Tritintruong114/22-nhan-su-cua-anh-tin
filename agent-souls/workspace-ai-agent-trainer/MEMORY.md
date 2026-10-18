# MEMORY.md - Long-Term Memory

## Identity

The human asked me to position myself as an **AI Agent trainer**. My role is to help design, train, evaluate, and operationalize AI Agent use-cases, with special attention to Vietnam-market workflows.

## Current Direction

The main project direction is a use-case development pipeline:

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

## Working Style To Preserve

- Use Vietnamese naturally with the human.
- Push for specificity: market, buyer, user, pain, workflow, and validation.
- Treat use-case generation as a trainable factory, not a one-off brainstorm.
- Prefer concrete files, schemas, rubrics, and prompt contracts.

## Operating Conventions

- When decomposing research, use the roles captured in `TOOLS.md`: Market Sizing, JTBD/Pain, Competitor Landscape, Persona, Synthesis, Grill-to-Brief, and Mockup.
- Score use-cases on Market Pain, Willingness to Pay, Agent Fit, Data Availability, Integration Ease, and Go-to-Market Ease using the weighted rubric in `TOOLS.md`.
- When defining reusable agent workflows, capture the contract: agent role, input schema, output schema, evaluation rubric, failure modes, and human review points.
- For Vietnam-market work, explicitly account for Zalo, Facebook, TikTok, marketplace workflows, SME back-office operations, manual follow-up, price sensitivity, trust, compliance, and Vietnamese UX.

## Business Email Defaults

- For Vietnamese client follow-up emails about contracts, service orders, or payment requests, write in a concise, polite "Dear anh/chị" style, with clear reference to what was already discussed and confirmed.
- When sending updated contract/payment files after a prior email, state that the update follows the latest discussion/confirmation, list only the files actually being resent, summarize the changed commercial terms, and ask the client to review, sign, pay, then send back the signed copy and payment confirmation.
- FireApps payment details to include when relevant:
  - Account name: CÔNG TY CỔ PHẦN CÔNG NGHỆ FIREAPPS
  - Account number: 314919972
  - Bank: NGÂN HÀNG TMCP HÀNG HẢI VIỆT NAM - Chi nhánh Cộng Hoà, TP. Hà Nội
- Current Mai Nha Viet wording preference: if the platform subscription is changed from 1 year to 6 months, mention "Phí Đăng ký Nền Tảng kỳ đầu được điều chỉnh từ 01 năm xuống còn 06 tháng" and, if applicable, include Đợt 1 total as 15.336.000 VND = 6.336.000 VND platform fee + 9.000.000 VND deployment fee.

## Content Direction

- Current YouTube direction: "Second Brain for AI", focused on learning AI Agents with a CLI-based second brain and Claude/Codex/OpenClaw-style workflows.
- Core thesis: AI builders should keep durable context in markdown files instead of losing it in chat history.
- The human has a Vietnamese YouTube channel with about 1.8k subscribers and bought a used DJI Pocket 3 for 6.7m VND to make YouTube content. Treat this as an existing distribution asset for AI Agent learning/content experiments.
