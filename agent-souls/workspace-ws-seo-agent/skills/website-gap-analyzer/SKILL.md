---
name: website-gap-analyzer
description: >
  Use this skill to analyze a COMPETITOR (or reference) website and spawn NEW topics your plan
  doesn't cover — the outside-in discovery of net-new topics sourced from someone else's site.
  Trigger from the Competitive SEO surface (and it links into competitor analysis / AI-mention
  research later). This proposes DIFFERENTIATED new topics grounded in real competitor data:
  it does NOT clone their outlines, does NOT invent demand (DataForSEO does that downstream),
  and does NOT deepen an existing topic (that is topic-gap-analyzer). Belongs to the
  Competitive SEO module; consumes DataForSEO Labs / crawl data supplied by code.
---

# Skill: website-gap-analyzer (Competitive)

## Goal

Given a competitor's (or reference site's) content and the topics you already plan, surface
the **topics they cover that you don't** and propose them as **new, differentiated** topics for
your plan. This *widens* the plan (new topics), as opposed to `topic-gap-analyzer`, which
*deepens* an existing topic.

## The boundary — code supplies → skill judges

- **Code supplies:** the competitor `domain` and its real content signal — ranked keywords /
  pages from **DataForSEO Labs** (Ranked Keywords, Domain Intersection) or a crawl — plus
  `your_topics` (the existing plan) and `business_info`.
- **Skill judges:** which of the competitor's covered areas are (a) genuinely uncovered by
  your plan, (b) relevant to your business, and (c) worth a differentiated topic — then names
  those new topics with a rationale and a differentiation angle.
- **Never in this skill:** cloning the competitor's outline or copying their content;
  inventing demand/volume (DataForSEO attaches it downstream); doing the crawl / keyword pull
  (code); pillar/primary selection (deterministic). Output is a *candidate* set the plan
  ratifies.

## Input

```json
{ "competitor": { "domain": "string",
                  "ranked_keywords": ["string", "..."],
                  "top_pages": [ { "url": "string", "title": "string" } ] },
  "your_topics": ["string", "..."],
  "business_info": "string" }
```

## Output (strict JSON, no markdown, no prose)

```json
{ "new_topics": [
  { "topic": "string",
    "rationale": "string",            // what the competitor covers that you don't, and why it fits you
    "differentiation": "string" }     // how to cover it BETTER / differently — the information-gain angle
] }
```

## How to judge

- **Find the real gaps.** Cross the competitor's covered areas against `your_topics` — a topic
  you already plan is **not** a gap. Only surface areas genuinely absent from your plan.
- **Filter by fit.** Keep only topics relevant to *this* business and audience (per
  `business_info`); a competitor may rank for things that don't fit you — drop those.
- **Differentiate, never clone.** For each kept gap, the `differentiation` field must say how
  to cover it **better or differently** — the information-gain angle (a deeper answer, a
  missing perspective, a real example the competitor lacks). Do **not** reproduce their
  structure, headings, or wording. Cloning a competitor's outline is out of scope and against
  the product's honesty rule.
- **No demand claims.** Describe the opportunity; never assert volume, difficulty, or traffic —
  code attaches DataForSEO demand to each proposed topic afterward.

## Hard rules

- **Outside-in, new topics only** — never deepen an existing topic (that is
  `topic-gap-analyzer`).
- **Ground every gap in the real competitor signal** code supplied; no invented gaps.
- **Differentiate — never clone** a competitor's outline, structure, or wording.
- **Never invent demand/volume/traffic;** DataForSEO attaches it downstream.
- **Return only valid JSON** matching the schema — no fences, no commentary.
- Output is a **proposal**; new topics enter the plan as candidates, still subject to the
  deterministic pillar/primary logic.
