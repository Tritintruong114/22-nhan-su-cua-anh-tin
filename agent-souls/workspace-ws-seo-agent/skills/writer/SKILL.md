---
name: writer
description: >
  Use this skill to write a complete, publish-ready SEO blog draft from an approved outline,
  in the site's brand voice, optimized for readers and for AI Overview / LLM extraction.
  Trigger after the outline skill has produced the section structure and the user starts
  drafting. This skill WRITES PROSE ONLY: it does not design the structure (that is the
  outline skill), does not do keyword fan-out or fetch SERP (outline + code do that upstream),
  does not weave internal-link anchors (that is the internal-link skill), does not bind image
  files, and does not publish to WordPress. Always read the brand voice profile before
  writing. English counterpart of `seo-blog-writing-SKILL.md`.
---

# Skill: writer

## Goal

Produce a complete, publish-ready blog draft — correct structure filled with real prose,
in the right brand voice, optimized for both human readers and AI Overview / LLM indexing.
The final output is a full article in the canonical block schema plus its metadata. This
skill does **not** publish.

## The boundary — code / outline supplies → skill judges

- **Outline supplies:** the section tree, H1–H6 headings, `covers` note per section, image
  slots, weave-points, the seeded FAQ questions, and `title_hint` / `slug_hint`.
- **Code supplies:** `primary_keyword`, `secondary_keywords`, `blog_type`, `brand_voice`
  (read from the per-site memory file), `locale`, `business_info` (for natural brand
  mentions), and any pre-fetched **fan-out signals** (PAA / related questions) for FAQ copy.
- **Skill judges / writes:** the metadata copy and all prose — intro, key takeaways, body
  sections, FAQ answers, conclusion — following the quality rules below.
- **Never in this skill:** designing structure or doing keyword fan-out (the outline skill);
  fetching SERP (code, upstream — the model never fetches); assigning internal-link anchors
  or hrefs (the `internal-link` skill); inventing volume, traffic, or authority numbers;
  publishing.

## Input

```json
{ "outline": { "meta": { "title_hint": "string", "slug_hint": "string" }, "blocks": [ ... ] },
  "primary_keyword": "string",
  "secondary_keywords": ["string", "..."],
  "blog_type": "how-to | listicle | comparison | definition | pillar",
  "brand_voice": "string",
  "locale": "string",
  "business_info": "string|null",
  "fanout": { "paa": ["string", "..."], "related": ["string", "..."] } }
```

## Output

1. **Metadata** — `meta_title`, `meta_description`, `url_slug`.
2. **The full article** as the canonical block schema (`blocks[]`; semantic HTML inside
   paragraph blocks — real `h1`–`h3`, `table`, `blockquote`, never `div`/`span` as headings).
3. **A ticked result checklist** (§ below).

## Write in this order — do not skip a step

### 1. Metadata

- **Meta title** — 50–60 characters, primary keyword at the front, no clickbait ("Discover…",
  "Everything about…").
- **Meta description** — 145–155 characters, written to the query type:
  - *informational* → state the exact keyword at the start, then list the main points.
  - *question* → answer directly; do not restate the question back to the reader.
- **URL slug** — lowercase, hyphen-separated, short.

### 2. H1 and intro (sapo)

- **H1** contains the primary keyword and expresses the whole article's scope (may run a
  little longer than the meta title; not identical to it).
- **Intro** — primary keyword within the first ~30 words; summarize the actual points the
  article will cover; go straight in. **Never** open with "In today's world…", "Have you ever
  wondered…", or "Welcome to this article…".
- **Answer-first** — the direct answer to the keyword appears **in bold** in the opening or
  immediately after the intro.

### 3. Key takeaways

- Right after the intro, before the body. A 3–5 bullet summary of the most important points.
- Each bullet stands on its own; call it "Key takeaways" (or the locale equivalent), **never
  "TL;DR"**. Purpose: AI-Overview extraction and fast human scanning.

### 4. Body

Follow the outline's headings and write the prose for each section.

**Heading discipline** (the outline set these; honor them): H2 clarifies the H1, H3 clarifies
its H2, no level-skips; a 1–2 sentence transition between consecutive headings; each section
at least ~100 words; do not repeat the intro's point in the first H2.

**Paragraph rules:**
- Max ~4 lines per paragraph, one idea each.
- **Chunking / self-containment** — each paragraph must make sense read alone. Do not write
  "This method is very effective…" (which method?). Restate the subject: "The keyword
  clustering technique groups related terms into one article instead of many…".
- Never use "as mentioned", "the above", or a bare "it" without restating the subject.

**Content rules:**
- **Information gain** — include concrete figures, examples, or cases; no generic filler.
  - Bad: "Optimizing SEO makes your website better."
  - Good: "Per Backlinko (2023), pages with optimized meta descriptions saw 5.8% higher CTR."
- Support claims with evidence; cite the source when using a statistic or study.
- Distinguish "evidence-based" from "by convention / experience".
- No internal contradictions — figures and positions stay consistent throughout.
- No unsupported subjective claims; stay even-handed.
- **Guard rails** — acknowledge real limits: "Results vary by industry and competition," not
  "Apply this and traffic spikes immediately."
- **Brand mention (if a brand is provided)** — weave it naturally at the decision-relevant
  point, tied to the reader's problem, never a hard ad: "If you want to automate this step,
  [Brand] has a feature that…", not "Click here to buy [Brand], 50% off."

**Formatting rules:**
- Bullets / numbered lists only for genuine enumeration; each bullet has at least one
  explanatory sentence (never a bare list of names).
- Tables for comparison / pricing / feature matrices, always with a lead-in sentence.
- An important answer right after a heading uses **blockquote + bold**.
- No image immediately after a heading with no lead-in text; no image inside a bullet list.
- Use "—" (em dash), not "-" (hyphen), in prose.

**Language:** short, on-point sentences; no repeated words, sentence patterns, or ideas; no
misused terms; apply the tone, address form, and forbidden words from the brand voice profile.

### 5. FAQ

- End of the article, before the conclusion. Use the outline's seeded questions (from real
  PAA / fan-out); 4–6 questions minimum.
- Each answer in **AEO structure**: (1) **direct answer** — one bold sentence; (2)
  explanation / evidence — 2–3 sentences; (3) guard rail / condition.
- 50–60 words per answer; do not repeat body content. Question in blockquote + bold, answer
  in blockquote.

### 6. Conclusion

- Must contain the primary keyword; no new information — summarize and suggest the next
  action; a final natural brand mention if applicable.

## Deferred to other skills (do not do here)

- **Internal links** — leave the outline's `internal_link` weave-points as naturally phrased
  spots; the `internal-link` skill inserts the anchors. Do **not** write `<a>` tags yourself.
- **Image files** — write only the alt text for a slot if asked; file resolution is the
  image pipeline's job.

## Pre-output checklist (tick each before returning)

```
METADATA   [ ] title 50–60, keyword first  [ ] description 145–155, correct format  [ ] slug clean
STRUCTURE  [ ] H1 has keyword & scope  [ ] keyword in first 30 words  [ ] answer-first bolded
           [ ] key takeaways after intro  [ ] keyword in ≥1 H2  [ ] no level-skips
           [ ] transitions between headings  [ ] ≥100 words/section  [ ] conclusion has keyword
CONTENT    [ ] each paragraph self-contained  [ ] concrete figures/examples, not generic
           [ ] claims sourced  [ ] guard rails on key claims  [ ] no contradictions
           [ ] brand voice (tone, address, forbidden words) applied
FORMATTING [ ] ≤4 lines/paragraph  [ ] bullets explained  [ ] tables have lead-in
           [ ] blockquote+bold for FAQ & post-heading answers  [ ] "—" not "-"
           [ ] semantic HTML headings/tables (no div/span)
FAQ        [ ] 4–6 questions from real PAA  [ ] answer = direct → explain → guard rail  [ ] 50–60 words
```

## Hard rules

- **Prose only.** Structure is the outline's; SERP/fan-out is upstream; internal-link anchors
  are the `internal-link` skill's; publishing is separate.
- **Never fabricate** stats, sources, or projected traffic/authority.
- **Brand voice from the memory file** governs tone, address form, and forbidden words.
- **Semantic HTML**, canonical block schema; output is a **draft** the user reviews — nothing
  auto-publishes.
