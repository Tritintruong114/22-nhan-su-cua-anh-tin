---
name: internal-link
description: >
  Use this skill to weave internal links into a blog: choose which same-cluster pages are
  contextually relevant, write natural in-sentence anchor text, and place it as
  <a data-internal="true" href="">anchor</a> (href left EMPTY — a separate deterministic flow
  fills it from the keyword→URL database, without changing the anchor). Runs at blog creation
  and on re-audit when newly-published siblings appear. This skill judges relevance, anchor
  text, and placement ONLY — it does NOT decide which URLs are cluster siblings (code passes
  them) and never assigns the href. Maps to `seo-blog-writing-SKILL.md` Step 5.
---

# Skill: internal-link

## Goal

Insert **contextually relevant** internal links into a blog with **natural, in-sentence
anchor text**, so the link reads as if it were always part of the prose — never a bolted-on
"click here."

## The boundary — code supplies → skill judges

- **Code supplies:** the `post_content`, the `same_cluster_urls` candidate set (cluster
  membership is computed by code), the `primary_keyword`, `locale`, and `brand_voice`.
- **Skill judges:** which candidates are genuinely relevant *here*, the **anchor text**, and
  **where** in the body to place each link.
- **Never in this skill:** deciding which URLs are cluster siblings (code passes them);
  writing the `href` (a later deterministic flow reads the keyword→URL database and fills the
  empty `href`, leaving the anchor untouched); full-mesh linking.

## Input

```json
{ "post_content": "html string",
  "same_cluster_urls": [ { "url": "string", "title": "string", "primary_keyword": "string" } ],
  "primary_keyword": "string",
  "mode": "create | re_audit",
  "locale": "string",
  "brand_voice": "string" }
```

## Output

The body with links inserted, each as:

```html
<a data-internal="true" href="">anchor text</a>
```

`href` is deliberately **empty** — the fill-flow completes it. (If the host prefers a
non-destructive list, emit instead: `[{ "anchor", "sentence_context", "target_url", "position" }]`.)

## Anchor rules (mandatory — from the writer's Step 5)

- The anchor is a **descriptive phrase inside the sentence** — **never** the linked page's
  full title, and **never** "see more / here / click here / read more".
- The sentence must read **grammatically even with no link** — the link is a bonus, not a
  syntactic crutch.
  - Bad: "To learn more, <a data-internal="true" href="">click here</a>."
  - Bad: "<a data-internal="true" href="">Top 10 Best Keyword Research Tools 2024</a>" (exposes the title)
  - Good: "A good process usually starts with <a data-internal="true" href="">keyword research</a> before writing."
- **Diversify anchors** — do not repeat the same phrase; do **not** exact-match the primary
  keyword repeatedly.
- Place a link **only where the context is genuinely relevant** — no link-stuffing, **no
  full-mesh**. A page links to a handful of the *most* relevant siblings, not all of them.
- Anchor text matches the paragraph's **voice** (per `brand_voice` / `locale`) and reads
  seamlessly.

## Modes

- **create** — weave links among the relevant published same-cluster pages while the blog is
  being finished.
- **re_audit** — new same-cluster content has published since the last pass; those siblings
  are now candidates. Treat them as **opportunities** (not defects): add a link to the newly
  relevant sibling where it fits. Bidirectional pairing (the new blog links out at creation;
  existing blogs link *to* it here) is handled by running this skill on each side.

## Hard rules

- **Judge relevance, anchor, placement — nothing else.** Cluster membership is code's; the
  `href` is the fill-flow's.
- **Anchor is an in-sentence phrase**, never the title, never "click here"; the sentence
  stands grammatically without the link.
- **Diverse anchors, no exact-match spam, no full-mesh.**
- **Leave `href` empty**; never change an anchor the fill-flow will link.
- Output is a **proposal** applied through the normal draft → verify path; nothing
  auto-publishes.
