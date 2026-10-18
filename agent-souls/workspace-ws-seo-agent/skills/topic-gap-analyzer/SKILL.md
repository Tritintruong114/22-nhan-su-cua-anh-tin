---
name: topic-gap-analyzer
description: >
  Use this skill to judge the HOLISTIC coverage of one of YOUR topics (a cluster / pillar):
  which sub-topics, angles, and questions your existing content covers versus what's missing,
  and propose supporting-blog ideas that fill the real gaps. Trigger from the pillar node /
  "Cluster gap analysis" panel — PILLAR ONLY, not on supporting blogs. This is an inside-out
  completeness read on content you already have: it does NOT analyze competitors (that is
  website-gap-analyzer), does NOT invent demand/volume (DataForSEO does that downstream), and
  does NOT write the blogs. Maps to `llm-prompt-specs.md` §4 (Cluster Gap Analysis).
---

# Skill: topic-gap-analyzer (Plan · Cluster Gap)

## Goal

For one confirmed **cluster / pillar**, assess how *completely* it covers its subject and
propose **supporting-blog ideas** that fill the genuine coverage gaps — the brainstorm that
turns "this topic is under-covered" into concrete new blogs.

## The boundary — code supplies → skill judges

- **Code supplies:** the `cluster_name` + `cluster_description`, `business_info`, the
  `current_keywords` / `current_blogs` already under that cluster, and (measured tier) the
  `gsc_queries` the cluster's pages already rank for.
- **Skill judges:** which sub-topics / angles / questions the cluster *should* cover for its
  subject and audience, which are already covered, and which are missing — then names the
  gap-filling blog ideas with a rationale.
- **Never in this skill:** demand — each idea's volume/difficulty is fetched **downstream by
  code** (DataForSEO `related_keywords` / `search_volume`), never invented here; competitor
  analysis (that is `website-gap-analyzer`); writing the blogs; pillar/primary selection
  (deterministic code). **Pillar-only** — do not run on supporting blogs.

## Input

```json
{ "cluster_name": "string",
  "cluster_description": "string",
  "business_info": "string",
  "current_keywords": ["string", "..."],
  "current_blogs": [ { "title": "string", "url": "string" } ],   // optional
  "gsc_queries": ["string", "..."] }                              // optional (measured tier)
```

## Output (strict JSON, no markdown, no prose)

```json
{ "blog_ideas": [ { "title": "string", "gap_rationale": "string" } ] }
```

## How to judge

- **Map the topic's expected coverage first.** For this cluster's subject and audience, what
  are the sub-topics, use-cases, questions, and entities a *complete* pillar would address?
  Ground this in the actual cluster (its keywords, its description, the business), not in
  generic priors.
- **Compare against what's already covered.** Cross the expected map against
  `current_keywords` / `current_blogs` (and `gsc_queries` when present) — a sub-topic already
  owned by an existing blog is **not** a gap. Only surface genuine holes.
- **Propose gap-filling blogs.** Each idea is a *supporting* blog under this pillar: a clear
  `title` and a one-line `gap_rationale` saying which uncovered sub-topic / question /
  audience it fills and why it matters for this business.
- **Real gaps, not padding.** Do not invent thin "SEO-bait" angles no one needs; do not
  propose a blog the cluster already effectively covers. Quality of gap over quantity.
- **No demand claims.** Describe the gap; never assert volume, difficulty, or traffic — code
  attaches DataForSEO demand to each idea afterward, and the panel nominates ~3 keywords per
  idea.

## Hard rules

- **Pillar-only;** inside-out coverage of *your* topic — never a competitor's site.
- **Ground gaps in the real cluster;** no generic-industry idea dumps.
- **Never invent demand/volume/traffic** — DataForSEO attaches it downstream.
- **Propose ideas — never write the blogs;** never do pillar/primary selection.
- **Return only valid JSON** matching the schema — no fences, no commentary.
- Output is a **proposal**; the user picks which ideas become planned blogs.
