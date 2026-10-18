---
name: identify-clusters
description: >
  Use this skill to turn a raw keyword list into a SUGGESTED set of content clusters
  (pillars) the user reviews and confirms. Trigger on "suggest clusters from my keywords",
  the Add-clusters seed, or to NAME the deterministically pre-formed groups in the
  auto-cluster pipeline. This skill proposes cluster NAMES + SCOPE only — it does NOT
  assign every keyword (that is group-topics / P2), and never invents intent, volume, or
  SERP data. Maps to `llm-prompt-specs.md` §1.
---

# Skill: identify-clusters (Plan · P1)

## Goal

Turn a raw keyword list into a clean, coherent set of **clusters** (content pillars) a
human reviews before anything downstream runs. Output is a *first-pass suggestion*, not a
committed structure.

## The boundary — code supplies → skill judges

- **Code supplies:** the cleaned `keywords` list, and optionally a `volumes` map from
  DataForSEO (naming/ordering tie-break only).
- **Skill judges:** the set of cluster **names**, their **scope**, and 2–4 illustrative
  example keywords per cluster — such that the set *covers* the list and each cluster is
  *coherent*.
- **Never in this skill:** assigning every keyword (that is `group-topics`), sub-intent,
  object, audience, volume, CPC, difficulty, or any SERP signal. There is **no SERP step**.

## Input

```json
{ "keywords": ["string", "..."],
  "volumes": { "keyword": 0 } }          // optional — DataForSEO, tie-break only
```

## Output (strict JSON, no markdown, no prose)

```json
{ "clusters": [
    { "name": "string", "description": "string", "example_keywords": ["string", "..."] }
] }
```

## How to judge

Two equal duties — failing either is a bad result:

1. **Cover the list** — every major keyword group gets a pillar. A diverse list needs many
   pillars; do not leave a large related group homeless.
2. **Keep pillars coherent** — no pillar mixes unrelated subjects.

**What a cluster is** — a pillar one hub page could own. Size is set by coherence and
separability, not by a target count:

- **Too broad** — if one hub page could not introduce everything under it, or it spans
  different subjects, split it. (Economics and statistics are different subjects even in
  one industry.)
- **Too narrow** — a 1–2 keyword cluster, or a facet of a larger subject, folds into the
  broader pillar.
- **Separability** — if a broad subject divides into sub-subjects that each warrant their
  own hub, output the **sub-clusters**, not the parent (liver / breast / blood cancer →
  three clusters, not "Cancer").

**Grounding** — every cluster must map to keywords actually present in the list. Do **not**
propose clusters from industry priors. Scan recurring *attributes* (type, style, size,
component, room, material, brand) — each tends to form a cluster and is easily left homeless.

**Coverage** — the clusters together home the large majority of keywords. Brand /
navigational terms (company / product / project names) get their own pillar.

**Avoid** — catch-all pillars; a hidden off-theme cluster riding along inside a pillar;
uneven granularity across the set.

**Self-check before returning** — walk the list top to bottom; if a group of many related
keywords has no home, ADD a cluster. Confirm every cluster is backed by multiple real
keywords; drop any that isn't.

## Output rules

- Name each cluster short, human, descriptive — 2–4 words, **same language as the keywords**.
- Per cluster: `name`, a one-line `description`, and 2–4 `example_keywords` **drawn from the
  input list** (illustrative only — this is not assignment).

## Hard rules

- **Names + scope only.** Never assign the full list; that is `group-topics` (P2).
- **Ground in real keywords.** No priors, no invented pillars.
- **No intent / object / volume / SERP.** Consume `volumes` only as a naming tie-break.
- **Return only valid JSON** matching the schema — no markdown fences, no commentary.
- Output is a **proposal** the user edits and confirms; nothing auto-applies.
