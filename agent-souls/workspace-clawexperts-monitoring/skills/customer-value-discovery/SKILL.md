---
name: "customer-value-discovery"
description: "Discover and measure customer value."
---

# Customer Value Discovery

Use this skill when defining Customer Value for product roadmap items, agent capabilities, sales discovery, outreach, demos, adoption plans, or product measurement.

The job is to make the customer's pain, value, and proof of value legible before proposing features. Start from real behavior and a specific moment, not from a feature list, agent list, or solution idea.

## Core Rule

Customer Value is the customer outcome, not the feature or mechanism.

Good Customer Value describes a better state such as:

- more accurate
- faster
- less manual work
- fewer missed leads
- fewer errors
- lower risk
- higher conversion
- easier control
- shorter setup or training time

Avoid solution-shaped wording in Customer Value. Put implementation details in the feature or capability section.

```text
Weak: Agent reads chat history and tags customers.
Better: Sales team misses fewer qualified leads and follows up faster without manually scanning every conversation.
```

## Value Types

When useful, classify Customer Value into value types before choosing metrics:

- Functional value: the customer completes the job better.
- Economic value: the customer saves money, earns more, reduces waste, or controls cost.
- Emotional value: the customer feels safer, less anxious, more confident, or more in control.
- Social value: the customer looks better, coordinates better, or gains trust with others.
- Operational value: the customer runs the workflow with less manual effort, fewer errors, or better reliability.

Use value types to clarify what kind of progress the customer wants. Do not treat them as proof by themselves.

## Three Phases

### Phase 1: Need

Use Phase 1 to understand why the customer needs progress.

```text
context/status quo -> pain/cost -> desired progress -> Customer Value
```

Ask:

- Who is the persona and what workflow do they own?
- What are they doing today?
- When does the current way become insufficient?
- What cost, risk, delay, or friction appears?
- What better state do they want?
- What Customer Value follows from that desired progress?
- What observable signal would prove the value is real?

Do not validate adoption, trust, pricing, or feature preferences too early. Phase 1 is Need.

### Phase 2: Action

Use Phase 2 when the customer is considering a concrete change.

```text
research alternatives -> compare -> trust/anxiety and adoption conditions -> limited/safe trial
```

Ask:

- What alternatives would they naturally consider?
- How do they compare options?
- What must they trust before trying?
- What makes them anxious about switching?
- What adoption conditions must be true?
- What is the smallest safe trial?

Fear and anxiety arise after the customer wants improvement and considers a change. They do not directly follow from status quo.

### Phase 3: Result

Use Phase 3 after a trial, demo, pilot, production usage, paid usage, or clear effectiveness signal exists.

```text
observed outcome vs old way -> signals/evidence -> expand/adopt or stop
```

Ask:

- What happened compared with the old way?
- Which signals prove improvement?
- What evidence is missing?
- What broke trust or created friction?
- Should the customer expand, adopt, iterate, or stop?
- What is the next Customer Value loop after the solution becomes the new baseline?

Successful adoption changes the operating model. The solution becomes the customer's new baseline. A later context change, bottleneck, or growth opportunity can start a new Customer Value loop.

## Discovery Chain

When in doubt, use this chain:

```text
persona -> status quo/current workaround -> cost/pain -> trigger -> desired progress -> Customer Value -> observable signal/metric
```

Keep business outcome, customer value, capability, and mechanism separate:

- Business outcome: more revenue, more orders, better conversion.
- Customer Value: fewer missed leads, faster follow-up, less manual work, better control.
- Agent/product capability: classify leads, summarize conversations, trigger handoff.
- Mechanism: reads source data, applies rules, writes CRM row, sends notification.

Do not claim a business outcome unless the causal chain and evidence are clear.

## Customer Value Measurement Workflow

Use this workflow when the user wants to combine Customer Value Discovery with measurable proof of value. This borrows the Goal -> Signal -> Metric discipline from HEART-style product measurement.

### Step 1: Name the phase

Choose the current phase before choosing metrics:

- Phase 1 Need: measure problem existence and urgency.
- Phase 2 Action: measure willingness to try and trust conditions.
- Phase 3 Result: measure observed improvement, adoption, retention, and expansion readiness.

### Step 2: State the Customer Value

Use plain outcome language:

```text
Customer Value: [persona] can [better state] with [less cost/risk/friction] than the old way.
```

Example:

```text
Customer Value: Riders can move from A to B with less uncertainty about price, time, and safety than street-hailing.
```

### Step 3: Classify the value type

Pick the value type or types:

- Functional: the job gets done.
- Economic: cost or financial control improves.
- Emotional: confidence, safety, or peace of mind improves.
- Social: coordination or reputation improves.
- Operational: repeated work becomes easier, more reliable, or less manual.

### Step 4: Convert value into Goal -> Signal -> Metric

For each Customer Value, define:

- Goal: what better state the customer should experience.
- Signal: what behavior or feedback would show the better state is happening.
- Metric: how the signal can be counted, compared, or tracked.

Use this table:

```text
Customer Value -> Value Type -> Goal -> Signal -> Metric -> Decision Rule
```

### Step 5: Choose a HEART lens only when useful

Use HEART to organize signals, not to replace Customer Value:

- Happiness: satisfaction, trust, confidence, low frustration.
- Engagement: meaningful interaction with the product or workflow.
- Adoption: first successful use of the new behavior.
- Retention: repeated use after the first success.
- Task Success: completion, speed, accuracy, and failure rate.

For each Customer Value, choose one or two HEART lenses that best prove it. Do not force all five HEART categories onto every value.

### Step 6: Compare OLD behavior to NEW behavior

Map the behavior change:

```text
OLD LAND: what the customer did before.
NEW LAND: what the customer does after the product creates value.
BEHAVIOR SHIFT: the observable change between the two.
```

Use this row format:

```text
Old behavior -> New behavior -> Customer Value -> HEART lens -> Signal -> Metric -> Friction -> Next action
```

### Step 7: Decide what to do next

Use evidence to choose:

- Expand: value is proven and trust is high.
- Adopt: value is proven but the workflow needs onboarding, enablement, or habit formation.
- Iterate: value signal exists but friction, trust, or reliability blocks deeper use.
- Stop: the causal chain is weak or the value is not important enough.

### Step 8: Start the next Customer Value loop

After adoption, ask:

```text
Now that this is the customer's new baseline, what bottleneck, risk, or growth opportunity appears next?
```

This creates the next discovery loop without drifting into random feature ideation.

## Output Pattern

For most tasks, produce:

1. Current phase and why.
2. Discovery chain.
3. Customer Value statement.
4. Value type.
5. OLD behavior -> NEW behavior map.
6. Goal -> Signal -> Metric measurement map.
7. Unknowns and next discovery questions.
8. Feature/capability implications only after the value is clear.
9. Decision: expand, adopt, iterate, or stop.

Use this JTBD-style sentence when useful:

```text
When using [product/agent/workflow], I want [desired outcome], so that [measurable or qualitative benefit].
```

## Example: Ride-Hailing App

### Context

- Persona: rider moving inside a city.
- Job: move from A to B.
- Desired value: cheaper, safer, faster, and less uncertain travel.
- Current phase: Phase 3 Result if the app already has active or paid riders and usage signals.

### Customer Values

- Functional value: rider successfully gets from A to B.
- Economic value: rider knows and controls cost before booking.
- Emotional value: rider feels safer and less uncertain during the trip.

### Measurement Map

| Customer Value | Value Type | Goal | Signal | Metric | HEART Lens |
|---|---|---|---|---|---|
| Rider gets from A to B reliably | Functional | Complete the trip with minimal failure | Booking, pickup, and trip complete | Booking success rate, pickup success rate, completion rate | Task Success |
| Rider controls cost | Economic | Know the price before committing | Price shown before booking, fewer fare disputes | Price-view-to-book rate, fare dispute rate, cancel-after-price rate | Task Success, Happiness |
| Rider moves faster | Functional | Reduce waiting and uncertainty | Short time to match and pickup | Time-to-match, time-to-pickup, ETA accuracy | Task Success |
| Rider feels safe | Emotional | Trust the driver, vehicle, route, and support | Checks driver info, shares trip, rates driver, low safety complaints | Safety report rate, driver rating, share-trip usage | Happiness, Retention |
| Rider adopts app as default | Operational | Use the app instead of street-hailing | Repeat rides without heavy promotion | D7/D30 retention, non-promo repeat rate, trips per active rider | Adoption, Retention |

### OLD -> NEW Behavior Map

| Old Behavior | New Behavior | Customer Value | Measurement |
|---|---|---|---|
| Hail a vehicle on the street | Open app and request a ride | More reliable access | First booking conversion, booking success |
| Ask or negotiate price | See upfront price | Cost control | Price-view-to-book rate, fare disputes |
| Wait without knowing arrival | Track driver arrival | Less uncertainty | ETA accuracy, pickup time |
| Ride with unknown driver | See driver, plate, rating, route | Safety and trust | Rating, safety reports, cancel after match |
| Use app only with discounts | Use app as default travel habit | Sustainable value | Non-promo repeat rate, retention |

## Templates And Examples

Load only what you need:

- `templates/customer-value-discovery.md`: reusable worksheet for a customer, feature, roadmap item, or agent idea.
- `examples/b2b-sales-agent.md`: example for a B2B Sales Agent use case.
- `examples/agent-marketplace.md`: example for Agent OS / Agent Marketplace discovery.

## Quality Bar

- Separate verified facts, reasonable hypotheses, and unknowns.
- Phrase unverified relevance conditionally.
- Do not manufacture pain, ROI, authority, or personalization.
- Discovery should test the causal chain instead of pretending it is proven.
- If evidence is thin, say so and propose the next smallest discovery step.
