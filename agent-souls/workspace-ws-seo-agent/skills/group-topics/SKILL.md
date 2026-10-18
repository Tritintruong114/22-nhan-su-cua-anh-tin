---
name: group-topics
description: >
  Use this skill to assign each keyword to exactly ONE confirmed cluster (topic), and to
  surface keywords that fit no cluster as named missing-pillar groups instead of
  force-fitting a neighbor. Trigger on Add-keywords and the map paths, after clusters are
  confirmed. This is cluster placement ONLY — it does NOT assign sub-intent / object /
  audience (that is group-blogs / P3), does NOT group into blogs (deterministic code), and
  never touches SERP. Maps to `llm-prompt-specs.md` §3 (P2).
---

# Skill: group-topics (Plan · P2)

## Goal

Assign each keyword to exactly one **confirmed cluster**. Where keywords fit no cluster but
clearly belong together, surface them as a **named missing-pillar group** rather than forcing
them into the nearest cluster.

## The boundary — code supplies → skill judges

- **Code supplies:** the `keywords` list and the confirmed `clusters` (name + description).
- **Skill judges:** which cluster each keyword belongs to, and — for keywords that fit none —
  how to group the leftovers into named proposed pillars.
- **Never in this skill:** sub-intent, object, sub_object, audience (all `group-blogs` / P3);
  blog grouping (deterministic code on the tuple); volume/CPC/difficulty; SERP.

## Input

```json
{ "keywords": ["string", "..."],
  "clusters": [ { "name": "string", "description": "string" } ] }
```

## Output (strict JSON, no markdown, no prose)

```json
{ "assigned": [ { "cluster": "string", "keywords": ["string", "..."] } ],
  "uncategorized": {
    "clusters":    [ { "suggested_cluster": "string", "keywords": ["string", "..."] } ],
    "unclustered": ["string", "..."] } }
```

## How to judge

**Fit means SAME SUBJECT, not adjacency.** A keyword fits a cluster only if it is *about*
that cluster's subject. Related / nearby / contained-within is **not** a fit — "apartment
50m2" is about apartments, not living rooms. **Never force a keyword into the closest
available cluster:** mis-assigning to a neighbor corrupts a real cluster *and* hides a
missing one.

- Subject matches a cluster → put the keyword under that cluster in `assigned`.
- Subject matches **no** cluster → send it to `uncategorized`. There, group keywords that
  share a subject into named `clusters` (each a proposed new pillar, in `suggested_cluster`).
  Keywords that share a subject with nothing go in `unclustered`.
- A missing-pillar group needs **multiple** keywords sharing one subject — never mint a
  proposed pillar for a single keyword.
- **Never drop a keyword.** Every input keyword appears **exactly once** across `assigned`,
  `uncategorized.clusters`, and `unclustered`.

## Companion action — orphan rescan (P4)

When the user later mass-selects the `uncategorized` pool and rescans, that runs the sibling
**rescan** contract (`llm-prompt-specs.md` §3c): match an existing cluster first, else propose
a new one. Same subject-not-adjacency rule; approved new clusters re-enter P3 + grouping.

## Hard rules

- **Cluster placement only.** No sub-intent / object / audience — that is `group-blogs` (P3).
- **Same subject, not adjacency.** Prefer a named missing-pillar group over a forced fit.
- **Never drop a keyword;** exactly-once coverage across all three buckets.
- **No SERP, no invented demand.**
- **Return only valid JSON** matching the schema — no fences, no commentary.
- Output is a **proposal** ratified on the Review-keywords screen; nothing auto-applies.
