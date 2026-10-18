---
name: outline
description: >
  Use this skill to produce the OUTLINE for a blog before it is written: section structure,
  H1–H6 headings, image slots (with slot_type, brief, and draft alt-text), placement points
  for internal links and secondary keywords, and placeholders for key-takeaways, table of
  contents, and FAQ. Trigger after a blog/topic is selected in the plan and before drafting.
  This skill produces STRUCTURE ONLY — it does NOT write prose (that is the writer /
  seo-blog-writing skill), does NOT bind image files (that happens at Write-Blog resolution),
  and never invents volume or stats. Pairs with `seo-blog-writing-SKILL.md` (the writer).
---

# Skill: outline

## Goal

Turn a planned blog into a **publish-ready outline** the writer fills in: the section tree,
the headings, where images and links go, and which questions the FAQ answers. The outline is
the stable contract between planning and drafting — the writer never re-decides structure.

## The boundary — code supplies → skill judges

- **Code supplies:** `primary_keyword`, `secondary_keywords` (from the cluster pool),
  `cluster`, `blog_type`, any `questions_paa` (PAA / related, when available), the
  `image_floor` (minimum image slots), and `brand_voice`.
- **Skill judges:** the section structure, the headings, what each section covers, where
  image slots sit and of what type, where internal-link and secondary-keyword weave-points
  go, and which FAQ questions to include.
- **Never in this skill:** writing the prose (that is the writer), binding an actual image
  file to a slot (Write-Blog resolution), computing which URLs are cluster siblings
  (`internal-link` receives those from code), inventing volume/CPC/stats.

## Input

```json
{ "primary_keyword": "string",
  "secondary_keywords": ["string", "..."],
  "cluster": "string",
  "blog_type": "how-to | listicle | comparison | definition | pillar",
  "questions_paa": ["string", "..."],     // optional — real PAA / related
  "image_floor": 3,
  "brand_voice": "string" }
```

## Output — the canonical block outline

Emit the block schema (H1–H6 / paragraph / image / table / FAQ), with sections as headings
and empty prose bodies for the writer to fill. Image slots and weave-points are structured,
not prose:

```json
{ "meta": { "title_hint": "string", "slug_hint": "string" },
  "blocks": [
    { "type": "h1", "text": "string" },
    { "type": "section_hint", "role": "intro|key_takeaways|body|faq|conclusion" },
    { "type": "h2", "text": "string", "covers": "one line: what this section answers" },
    { "type": "image_slot", "slot_type": "photo|illustration|diagram",
      "diagram_kind": "comparison_table|flowchart|process|comparison|timeline|graph|null",
      "brief": "what the image shows", "alt_text": "draft alt from the brief",
      "position": "after:<heading>" },
    { "type": "weave", "kind": "internal_link|secondary_keyword", "hint": "string" },
    { "type": "faq_question", "text": "string" }
  ] }
```

## How to judge the structure

Follow the same canonical article shape the writer expects (mirrors `seo-blog-writing`):

- **H1** contains the primary keyword and expresses the whole blog's scope.
- **Intro (sapo)** placeholder — mark an **answer-first** point (the core answer belongs in
  the opening) and that the primary keyword appears in the first ~30 words.
- **Key takeaways** placeholder — right after the intro, before the body (3–5 points).
- **Body headings** —
  - each **H2 clarifies the H1**; each **H3 clarifies its H2**; **never skip a level**;
  - prefer **question-form** headings *only when they have real search demand* ("What is X"
    with PAA), not invented phrasings ("Understanding X");
  - each section is meaty enough to stand (aim ≥100 words of body per section);
  - place a **transition weave-point** between consecutive headings.
- **Table of contents** — mark it; it is **built deterministically from the headings** (not
  written by the LLM), so it just needs a placeholder.
- **FAQ** placeholder — before the conclusion; seed **4–6 questions** drawn from
  `questions_paa` and the blog's real sub-questions.
- **Conclusion** placeholder — must later contain the primary keyword; no new information.

## Image slots — type at outline time

- Tag each slot's **`slot_type`** here, because the outline knows whether a section *is*
  structural: a comparison / process / steps / relationship → **`diagram`** (+ `diagram_kind`);
  a scene / object / concept illustration → **`photo`/`illustration`**. The medium is decided
  by the tag, not guessed later.
- Emit **at least `image_floor`** slots, placed where they genuinely aid the section — the
  floor shapes the slot count here; it is **never** post-hoc filler.
- Write **draft `alt_text`** from the brief for every slot (the writer/resolver finalizes it).

## Weave-points — not the links/keywords themselves

- Mark **where** an internal link would help (`weave: internal_link`) and **where** a
  secondary keyword naturally belongs (`weave: secondary_keyword`) — the `internal-link`
  skill and the writer place the actual anchors/mentions later.
- Secondary keywords are **body mentions, not targets** — one per natural spot, no stuffing.

## Hard rules

- **Structure only — no prose.** Section bodies stay empty for the writer.
- **No level-skips;** H2→H3→H4 step down by one.
- **Question headings only with real demand;** never invent "Understanding X" phrasings.
- **Tag every image slot's `slot_type`;** meet the `image_floor` without padding.
- **Never bind an image file** and **never invent volume/stats.**
- Output is a **proposal** the user can edit before drafting; nothing auto-applies.
