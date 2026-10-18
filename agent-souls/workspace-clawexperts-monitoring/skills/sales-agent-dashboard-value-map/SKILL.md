---
name: "sales-agent-dashboard-value-map"
description: "Map Sale Agent dashboard metrics to customer value."
---

# Sales Agent Dashboard Value Map

Use this skill when the user asks to pull, summarize, clean, map, or report Sale Agent metrics from the Sales Report Dashboard, especially for Mái Nhà Việt / MNV or another workspace code. The skill combines Sales Agent production metrics with Customer Value Discovery and HEART-style measurement.

## Data Source

- Dashboard: `https://main.sales-report-dashboard.pages.dev/`
- Production API base is stored locally in `.env.sales-report-dashboard`.
- API key is stored locally in `.env.sales-report-dashboard`.
- Human-readable note: `Sales_Report_Dashboard.env.md`.
- Do not paste or expose the API key in chat, logs, reports, or skill output.

The dashboard fetches:

```text
GET {API_BASE}/public/sales-report/stats?key={API_KEY}
```

The refresh/recollect action uses:

```text
POST {API_BASE}/public/sales-report/run?key={API_KEY}&workspace={workspaceIdOrCode}
```

Normalize `API_BASE` by removing trailing slashes before joining paths.

## When The User Provides A Workspace Code

If the user gives a workspace code such as `E-MNV-3`, use it to filter or locate the corresponding workspace metrics. If the API does not directly filter by that code, pull stats and locate the matching workspace by workspace code, workspace name, workspace id, or known customer context.

For Mái Nhà Việt, known context may include:

- A Long / Anh Long
- Mái Nhà Việt
- Tổng Kho Gạch Khổ Lớn
- MNV / MNV-3
- production page connected

## Safe Pull Workflow

1. Read `.env.sales-report-dashboard` locally.
2. Do not print the key.
3. Normalize `SALES_REPORT_API_BASE_URL` by trimming trailing `/`.
4. Pull `/public/sales-report/stats` with the key.
5. Inspect schema or aggregate data without dumping sensitive tokens.
6. Extract the workspace row and daily rows relevant to the requested period.
7. If asked to update from source, use `/public/sales-report/run` only when the user explicitly asks to refresh/recollect production data.
8. Report what data came from dashboard/API versus manual/user-provided notes.

## Known API Shape

Top-level response observed:

```text
generatedAt, filters, installSummary, shops, daily, cached
```

`installSummary` may include:

```text
totalInstalls, distinctUsers, distinctWorkspaces, installsByDay
```

Each `shop` may include:

```text
instanceId, workspaceId, workspaceName, userId, userEmail, installedAt, latestStatus, latestDate, range, asOfNow
```

Each shop `range` may include:

```text
conversationsStarted
messages.agent
messages.customer
messages.total
ordersCreated
paidOrders
ordersWithConversation
escalatedConversations
closeRate
handoffRate
responseTime
takeoverLatency
pause.count
available
```

Each `daily` row may include:

```text
date
conversationsStarted
ordersCreated
paidOrders
ordersWithConversation
escalatedConversations
messages
responseTime
pause
```

Only rely on fields present in the API response. When a metric route is unavailable, say so.

## Measurement Boundary

Default measurement boundary for current Sale Agent reporting:

```text
customer conversation -> agent consultation -> info collection -> lead/handoff decision -> handoff notification -> done
```

Do not claim downstream sales behavior unless the system has explicit data for it. Treat the following as outside the core measurable boundary unless CRM/POS/manual feedback data is provided:

- sales action taken
- customer contacted by human
- quote sent by sales
- order confirmed outside the system
- payment collected outside the system
- final revenue attribution

If the user provides a manual small win, such as a known order value, label it as manual/customer-provided evidence rather than dashboard-proven revenue.

## Customer Value Mapping Workflow

Use this sequence:

```text
1. Current phase
2. Customer Value statement
3. Value type
4. OLD behavior -> NEW behavior
5. HEART lens
6. Goal -> Signal -> Metric
7. Evidence strength
8. Missing measurement
9. Decision: expand / adopt / iterate / stop
10. Next Customer Value loop
```

### Phase

For Sale Agent production customers, usually choose Phase 3 Result when:

- the agent is installed on a real page/site,
- real customer conversations exist,
- handoff/lead signals exist,
- paid or production usage exists.

Choose Phase 2 Action if the customer has not yet adopted into their real workflow or the team is still validating channel/trust conditions.

### Customer Value Statement

Prefer this shape:

```text
[Team/persona] receives [usable lead/customer context] in [their existing working channel], so they can [prioritize next handling] without [manual scanning/context loss/workflow change].
```

Example:

```text
The sales team receives customer conversations with enough context in their existing Zalo/Telegram group, so they can prioritize follow-up without reading every chat from scratch or changing their daily workflow.
```

Do not over-claim close rate or revenue unless backed by observable data.

## Core Value Types For Sale Agent

Use these value types:

- Functional value: agent answers customer questions and completes the consultation flow.
- Operational value: team receives structured handoff in the channel they already use.
- Economic value: agent creates sales opportunities or reduces missed lead risk; only claim revenue when proven.
- Emotional value: owner/team feels less need to monitor every chat manually and trusts fewer hot leads will be missed.
- Quality/safety value: agent avoids wrong business information and escalates when needed.

## Recommended Metrics To Extract Or Compute

### Usage

- `conversationsStarted`
- `messages.total`
- `messages.agent`
- `messages.customer`
- active days in selected period
- peak day conversations
- conversations per active shop/page

### Speed

- median response time
- average response time
- P90 response time when available
- response-time reduction versus previous baseline when a baseline is provided

### Handoff

- `escalatedConversations`
- `handoffRate`
- handoff per day
- handoff growth versus previous period
- delivery channel if available or manually provided, e.g. Zalo/Telegram

### Reliability

- `latestStatus`
- `pause.count`
- message processing failures when available
- response generation failure when manually observed
- send failure when manually observed
- route availability from `range.available`

### Info Collection And Handoff Quality

Use dashboard fields if present. If not present, mark as missing or manual evidence:

- info collection count
- phone collected count/rate
- address/location collected count/rate
- product interest captured count/rate
- buying signal captured count/rate
- handoff completeness rate
- low-quality handoff rate
- duplicate/spam handoff rate

### Quality Scoring

If conversation review/scoring data is available, report:

- `conversation_quality_score`
- `need_identified_score`
- `product_suggestion_score`
- `policy_accuracy_score`
- `info_collection_score`
- `handoff_quality_score`
- `lead_quality`
- `wrong_answer`
- `missed_handoff`
- `next_step_created`

If scoring data is not available, recommend scoring workflow rather than inventing quality numbers.

### Downstream Sales

Only report these as dashboard-proven when the API or CRM actually records them:

- `ordersCreated`
- `paidOrders`
- `ordersWithConversation`
- close rate
- paid conversion

If these are zero in dashboard but the user provides a manual order, write:

```text
Dashboard revenue fields do not yet close the loop; manual evidence records one known order of [amount].
```

## HEART Mapping Defaults

Use HEART as a measurement lens:

| Customer Value | HEART Lens | Typical Signal | Typical Metric |
|---|---|---|---|
| Agent consults real customers | Engagement | real conversations and messages | conversationsStarted, messages.total |
| Customers get faster replies | Task Success | lower response time | median/avg/P90 response time |
| Team receives lead context | Task Success | handoff generated and delivered | escalatedConversations, handoffRate, delivery success |
| Team uses existing channel | Adoption | Zalo/Telegram group connected and receiving alerts | connected group count, handoffs by channel |
| Owner trusts production use | Happiness / Retention | low wrong-answer/pause/error cases | wrong_answer, pause.count, latestStatus |
| Agent avoids manual monitoring | Operational value lens | fewer conversations requiring human reading before handoff | handoff completeness, info collection, quality score |
| Sales opportunity is created | Economic value lens | usable lead or known order evidence | info collection count, hot lead count, manual order evidence |

Do not force all five HEART categories into every report. Select the lenses that match the Customer Value and available data.

## OLD -> NEW Behavior Map For Sale Agent

Default behavior map:

| OLD behavior | NEW behavior | Customer Value | Measurement |
|---|---|---|---|
| Owner/sales reads every chat manually | Agent handles first-line consultation | Less manual monitoring | conversationsStarted, messages.agent |
| Team waits for human availability | Customer receives fast agent response | Faster service | response time metrics |
| Sales has to infer lead quality from raw chat | Agent flags/hands off relevant cases | Better prioritization | escalatedConversations, handoffRate |
| Context is buried in conversation history | Agent summarizes need/product/info | Faster handoff comprehension | handoff completeness, info collection |
| Important cases may stay inside inbox | Agent notifies existing group | Less missed operational work | Zalo/Telegram handoff count |
| Team must adopt a new channel | Agent joins current group | Lower adoption friction | connected group usage, retained active group |

## Report Output Styles

### Numbers Only

Use when the user says “lấy số thôi”, “lọc số”, or wants dashboard rows:

```text
Period: [range]
Workspace: [workspace]
Conversations: [n]
Messages: [n]
Agent messages: [n]
Customer messages: [n]
Handoffs/escalations: [n]
Handoff rate: [x%]
Info collected: [n] (manual/API)
Qualified handoffs: [n] (manual/API)
Median response time: [x]
Avg response time: [x]
P90 response time: [x]
Pause count: [n]
Orders created: [n if dashboard-proven]
Paid orders: [n if dashboard-proven]
Manual order evidence: [amount] (if user-provided)
```

### Product Update

Use when the user wants a team update:

```text
Em update Sale Agent tuần này nha mọi người

[Tuần trước]
- What shipped/changed.
- Concrete customer evidence and metrics.
- Customer Value proven.
- What broke or needs improvement.

[Tuần này]
- P1 focus.
- Customer status quo/need.
- Customer Value.
- Behavior/system outcome.
- Timeline.
```

### Customer Value Dashboard Summary

Use when the user wants analysis:

```text
Current phase:
Customer Value:
Value type:
OLD -> NEW behavior:
Goal -> Signal -> Metric:
Evidence strong enough:
Missing measurement:
Next decision:
Next Customer Value loop:
```

## Calculation Rules

Use clear formulas:

```text
handoff rate = escalatedConversations / conversationsStarted
agent message share = messages.agent / messages.total
customer message share = messages.customer / messages.total
orders with conversation rate = ordersWithConversation / conversationsStarted
paid order rate = paidOrders / conversationsStarted
response-time reduction = (oldResponseTime - newResponseTime) / oldResponseTime
```

Only compute a rate when the denominator is non-zero. Round percentages to one decimal place for updates unless the user asks for precision.

## Quality Bar

- Separate dashboard/API numbers, manual evidence, and hypotheses.
- Never expose API keys.
- Do not claim “revenue generated” unless order/payment data is system-backed or clearly labeled as manual evidence.
- Stay inside measurement boundary: consultation, collection, handoff, done.
- Use OLD -> NEW behavior to explain value, not feature names alone.
- Use HEART to pick metrics, not as a substitute for Customer Value.
- When data is unavailable, say exactly which metric is missing and what instrumentation would be needed.
- Keep Vietnamese product updates concise, with numbers first when the user asks for numbers.
