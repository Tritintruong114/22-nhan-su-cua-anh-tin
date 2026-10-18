---
name: first-things-first-planning
description: Lập kế hoạch tuần và ưu tiên công việc theo First Things First, liên kết tuần này với tuần sau mà không chuyển máy móc mọi việc dang dở.
user-invocable: true
---

# First Things First Planning

Use this skill when the user asks to plan a week, review the current week and prepare the next week, prioritize tasks, or decide what to do/delegate/delete/schedule.

## Core principle

Do not equate productivity with doing everything. Protect the most important outcomes first, then fit urgent and operational work around them. Use the current week as evidence for the next week, not as a dumping ground for unfinished tasks.

## Planning stance

- Be practical, candid, and concise.
- Start with the desired result and real constraints.
- Distinguish facts, assumptions, judgment, and uncertainty.
- Do not moralize productivity or blame the user for structural constraints.
- Protect health, energy, relationships, and recovery.
- Never fill 100% of available time; reserve roughly 20–30% for interruptions and reality.

## Workflow

### 1. Review the current week

Ask for or infer:

- What important outcomes were completed?
- What remains unfinished, and why?
- What created real progress versus the feeling of busyness?
- Which meetings, messages, or recurring tasks consumed disproportionate time?
- What commitments, deadlines, dependencies, or risks carry into next week?
- What happened to energy, health, and recovery?

If context is missing, ask only the minimum questions needed. Do not invent the user's calendar.

### 2. Triage unfinished work

Every unfinished item must be classified before it enters next week's plan:

- **Do:** the user must personally execute it.
- **Schedule:** assign a concrete date/time block.
- **Delegate:** another person can own it; define the handoff and expected result.
- **Delete:** no longer important, useful, or worth its cost.
- **Waiting:** blocked by someone/something else; schedule a follow-up date, not repeated checking.
- **Renegotiate:** deadline or scope must be changed explicitly.

Never automatically roll all unfinished work forward.

### 3. Select weekly outcomes

Choose no more than three primary outcomes for the week. Phrase each as a measurable result, not a vague activity.

Bad: "Work on proposal."
Good: "Send the reviewed proposal to the client by Wednesday 16:00."

For each outcome define:

- Why it matters now.
- Definition of done.
- Owner.
- Deadline.
- Dependencies.
- The first concrete action.
- At least one protected deep-work block.

### 4. Build the week around priorities

Place protected blocks for important work before meetings and low-value administration. A default structure may be:

- Morning: deep work and important goals.
- Midday/afternoon: meetings, collaboration, and operational work.
- End of day: email, chat, and administration in bounded windows.
- 20–30% buffer: interruptions, recovery, and unexpected work.

Do not assume every day has the same capacity. Account for energy, commute, family, health, and known events.

### 5. Apply the importance/urgency matrix

Classify work:

- **Important + urgent:** do or stabilize immediately.
- **Important + not urgent:** schedule and protect; this is the main focus.
- **Not important + urgent:** delegate, automate, batch, or negotiate.
- **Not important + not urgent:** eliminate or limit.

Explain trade-offs. If urgent work repeatedly crowds out important work, identify the system problem instead of merely telling the user to work harder.

### 6. Add risk controls

Identify the biggest risk to the plan and create a trigger/action pair:

- Risk: client data arrives late.
- Trigger: data is not received by Tuesday noon.
- Action: send a follow-up, reduce scope, or renegotiate Wednesday's deadline.

Also identify what will be deliberately deferred or refused.

### 7. Close with review

Create a short end-of-week review:

- Which outcomes were completed?
- What changed?
- What should stop, start, or continue?
- What gets carried forward, and under which triage category?
- What is the first priority for the following week?

## Response format

When enough context is available, respond using:

1. **Read of this week:** facts, patterns, and constraints.
2. **Top 1–3 outcomes for next week:** measurable definitions of done.
3. **Protected time blocks:** day, time, task, and expected result.
4. **Triage:** do / schedule / delegate / delete / waiting / renegotiate.
5. **Risks and buffers:** risk, trigger, response.
6. **Not doing:** explicit exclusions.
7. **End-of-week review:** three to five questions.
8. **Next action:** the smallest action the user can take today.

## Minimal prompt when the user wants to start

Ask them to provide:

- The week being planned and timezone.
- The three most important outcomes they want.
- Fixed commitments and deadlines.
- Unfinished items from this week.
- Available work hours and energy constraints.
- Anything they must not sacrifice.

Then produce the plan without requiring a perfect task list.

## Quality checks

Before finalizing a plan, verify:

- There are no more than three primary outcomes.
- Each outcome has a definition of done and a time block.
- Important non-urgent work has protected time.
- The plan has buffer capacity.
- Unfinished work was triaged rather than blindly copied.
- Delegated/waiting work has an owner or follow-up date.
- Health and recovery are represented where relevant.
- The plan is realistic for the user's actual capacity.
