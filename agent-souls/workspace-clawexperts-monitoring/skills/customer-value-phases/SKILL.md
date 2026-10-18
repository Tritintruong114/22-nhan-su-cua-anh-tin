---
name: "customer-value-phases"
description: "Recall and apply Customer Value phase map."
---

# Customer Value Phases

## When To Use

Use this skill whenever the user mentions or asks about any of these themes:

- `phase`, `Phase 1`, `Phase 2`, `Phase 3`
- `customer value`, `Customer Value Discovery`, `JTBD`
- `status quo`, `pain`, `cost`, `trigger`, `desired progress`
- `adoption`, `safe trial`, `trust`, `anxiety`, `result`, `evidence`
- `sales loop`, `handoff`, `lead`, `phone number`, `Zalo`, `sales follow-up`
- `A Long`, `Anh Long`, `Mái Nhà Việt`, `Mai Nha Viet`, `Tổng Kho Gạch Khổ Lớn`, `AI-75`

If the user asks about prior definitions, roadmap thinking, customer value, or what phase a customer is in, load this skill before answering.

## Mandatory Recall Step

Before answering, search memory for the exact relevant terms. Prefer these queries:

1. `customer value phase status quo pain desired progress`
2. `Phase 1 Phase 2 Phase 3 customer value adoption result`
3. `A Long Mai Nha Viet Phase 3 sales loop`
4. `Tổng Kho Gạch Khổ Lớn phone number Zalo handoff`

If memory search is weak or inconsistent, directly inspect these known sources:

- `MEMORY.md`, around lines 12-18
- `memory/2026-08-27.md`, around lines 1-25
- `memory/2026-08-28.md`, around lines 30-68
- `memory/2026-08-29.md`, around lines 1-14

When useful, cite sources as `Source: path#line`.

## Core Framework

Use this discovery chain to define Customer Value:

`persona -> status quo/current workaround -> cost/pain -> trigger -> desired progress -> Customer Value -> observable signal/metric`

JTBD-style wording:

`Khi dùng [product], tôi muốn [desired outcome], để [measurable/qualitative benefit].`

Do not confuse Customer Value with feature/mechanism. Example: `Agent đọc lịch sử chat` is a product mechanism. Customer Value is closer to: `giảm missed leads`, `giảm thời gian training/setup`, or `giữ chất lượng tư vấn và kiểm soát bán hàng khi scale`.

## Three-Phase Model

### Phase 1: Need

Purpose: find the real need and customer value.

Map:

`context/status quo -> pain/cost -> desired progress -> Customer Value`

Ask:

- What are they doing today?
- When does the current way become insufficient?
- What do they lose: time, money, leads, quality, control, speed, opportunity?
- What progress do they actually want?

### Phase 2: Action

Purpose: understand conditions for trying a new way.

Map:

`research alternatives -> compare -> trust/anxiety and adoption conditions -> limited/safe trial`

Important rule: fear/anxiety does not directly follow status quo. It appears after the customer wants improvement and is considering a concrete change.

### Phase 3: Result

Purpose: prove the new way beats the old way.

Map:

`observed outcome vs old way -> signals/evidence -> expand/adopt or stop`

If adoption succeeds, the solution becomes the customer's new baseline/status quo. Later, a new bottleneck, context change, or growth opportunity can start a new Customer Value loop.

## A Long / Mái Nhà Việt Case Map

### Phase 1: Live Need / Proof On Real Page

Known signals:

- Agent was opened live on the real `Tổng Kho Gạch Khổ Lớn` page.
- Runtime: 2h30m.
- 20 customer conversations.
- 3 phone numbers collected and sent to sales.
- Agent consulted without wrong product/business advice.
- Zalo notification worked: phone number, need, area, and human-support cases.
- Training gaps discovered: Agent too verbose, wrong priority between category types, shipping/deposit/payment policy needed clearer training.

### Phase 2: Safe Production Trial

Known signals:

- Team called Anh Long for permission and opened Agent live for 4 hours.
- Positive signal: phone-number leads and at least one wholesale/bulk-buying lead.
- Sales adoption signal: sales team wanted simpler lead/order format and showed some resistance.
- Adoption insight: Zalo group reduces friction because sales receives lead context inside an existing daily channel instead of being forced into a new tool.

### Phase 3: Production With Sale Loop

Use this framing: Phase 3 is not just testing whether the Agent can chat or collect phone numbers. It must prove whether Agent-handoff leads can be followed up by sales and turn into real sales opportunities.

Measure:

- leads handed off
- sales followed up
- calls reached
- real needs confirmed
- quotes sent
- opportunities/orders
- lost reasons
- sales response time after handoff

ClawExperts must ensure:

- Agent does not invent or mislead on product, price, shipping, deposit, payment, or policy.
- Zalo handoff is clear enough for sales to act immediately.
- Monitoring happens by time block: morning / noon / afternoon / evening.
- Pause/intervention rules exist for serious wrong advice, looping replies, notification failure, missed hot leads, or many new unknown cases.
- End report is business-facing: traffic, low-quality leads filtered, real leads, phone numbers, support cases, hot/order-intent leads, phone capture rate, new training fixes, data gaps from Mái Nhà Việt, and recommendation on expansion.

Current memory update: A Long / Mái Nhà Việt has already moved beyond Phase 3 planning and is running Phase 3. Future reports should emphasize `Production with sale loop + deep business/sales training`, not just chat metrics.

Deep training areas:

- internal workflow and business process
- product/category logic and current business rules
- how Anh Long's team sells, qualifies, handles objections, and moves customers toward quote/order
- how the team asks for and captures customer information
- quote/order handoff format
- wholesale vs retail distinction
- area/shipping/deposit/payment policy
- support escalation rules

## Response Pattern

When the user asks about these phases, answer by:

1. Naming which phase/frame applies.
2. Mapping the situation into the framework.
3. Separating business outcome, customer value, agent capability, and product mechanism.
4. Naming evidence/signals already available.
5. Naming what evidence is still missing.
6. Giving the next action or decision gate.

Keep answers concise unless the user asks for a deeper map.
