---
name: group-blogs
description: >
  Use this skill to label the keywords of ONE confirmed cluster with sub-intent, object,
  sub-object, and audience — the labels that deterministic code then groups into blogs by
  the tuple (cluster, sub_intent, audience, object). Run once per cluster, whole cluster in
  one call, so objects/audiences canonicalize. This skill LABELS ONLY — it does NOT group
  blogs (deterministic code), never emits a blog id, and never outputs base intent or funnel
  (code derives those). Maps to `llm-prompt-specs.md` §3b (P3).
---

# Skill: group-blogs (Plan · P3)

## Goal

For every keyword in **one confirmed cluster**, assign `sub_intent` + `object` +
`sub_object` + `audience` + `confidence`. These labels define blog boundaries; downstream
**code** groups keywords into blogs deterministically on the tuple
`(cluster, sub_intent, audience, object)`.

## The boundary — code supplies → skill judges

- **Code supplies:** the `cluster_name`, `cluster_description`, and the cluster's `keywords`.
- **Skill judges:** the four labels + a confidence per keyword.
- **Code owns (never this skill):** the blog grouping itself (the tuple), the blog id,
  **primary-vs-secondary** keyword (highest DataForSEO volume = primary), **base intent +
  funnel** (deterministic lookup from `sub_intent`), demand, and the Review-keywords
  ratify/merge step. There is **no SERP confirmation** anywhere.

Run the **whole cluster in one call on purpose** — keywords about the same thing must get the
**exact same** `object` and `audience` strings so they group together. Scan the batch and
unify variants before finalizing.

## Input

```json
{ "cluster_name": "string", "cluster_description": "string",
  "keywords": ["string", "..."] }
```

## Output (strict JSON, no markdown, no prose)

```json
{ "results": [
  { "keyword": "string", "sub_intent": "string", "object": "string|null",
    "sub_object": "string|null", "audience": "string|null",
    "confidence": "high|medium|low" }
] }
```

## Sub-intent taxonomy — assign exactly one (use ONLY these 20 values)

```
[informational] definition · how-to · problem-solving · reasons-causes ·
                comparison-info · list-examples · best-practices · use-case
[commercial]    comparison-commercial · alternatives · reviews · best-of · buying-guide
[transactional] purchase · pricing · deals · booking-contact · trial-demo
[navigational]  brand · location
```

Do **not** invent sub-intents. Do **not** output base intent or funnel — code derives those.

**Key disambiguation:** `comparison-info` vs `comparison-commercial` — same "compare,"
different funnel: understand (not ready to buy) vs choose-what-to-buy. These become
different blogs. Decide by whether the searcher is ready to buy.

## How to judge each label

- **object** — the noun that distinguishes a keyword from others in the same cluster +
  sub_intent. **This is the blog boundary.** 1–3 words, lowercase. **Canonicalize synonyms to
  ONE identical string across the batch** ("retinol purging" / "retinol uglies" → `purging`).
  "A vs B" → `a vs b`; "B alternatives" → `b`.
  - **Required (non-null)** for: how-to, problem-solving, use-case, comparison-info,
    comparison-commercial, alternatives, reviews, best-of, list-examples, and definition
    (object = the concept defined; if the keyword *is* the cluster → null).
  - **May be null** for the rest; set it only if a distinct noun beyond the cluster/brand
    anchor is present.
- **sub_object** — an optional finer facet *within* an object (object `acne treatment` →
  sub_object `cystic acne`). **Does NOT affect grouping** (section hint only). Default null.
- **audience** — the specific group the keyword targets ("students", "beginners"), lowercase,
  or null. **Canonicalize across the batch.** A distinct audience splits into its own blog
  automatically (it's in the grouping tuple).
- **Neutral head terms** — a bare term with no intent signal ("living room paint") → literal
  `sub_intent`, `object` = the bare noun, `confidence: low` (the user review screen decides
  which blog it joins). Do not invent intent.
- **confidence** — `high` (unambiguous) · `medium` (variant object, or a sub-intent boundary
  — flag for review) · `low` (a required object came back null, or a neutral head term, or
  sub-intent uncertain).

## Hard rules

- **Label only — never group.** No blog id; grouping is deterministic code on the tuple.
- **One sub-intent from the fixed 20;** never invent one; never output base intent or funnel.
- **Canonicalize `object` and `audience` across the whole batch** so same-blog keywords match.
- **`sub_object` never affects grouping** — it's a section hint.
- **Return only valid JSON** matching the schema — no fences, no commentary.
- Output is a **proposal**; the Review-keywords screen ratifies/merges at medium/low confidence.
