---
name: body-audit
description: >
  Use this skill to audit a blog post's BODY (post_content) — what to scan for, the SEO best
  practice behind each check, the severity, and the fuzzy judgment calls. Trigger when a
  published or drafted page's body needs auditing (content audit, or the decline-diagnosis
  flow). Code computes EVERY metric; this skill only judges the fuzzy set (thin-vs-concise,
  relevance drift, soft-404 intent, genuine spelling/grammar) and documents the standard. It
  does NOT fix content (that is the content-fix skill) and does NOT handle head/schema (that
  is the head audit). Pairs with `body-solution.md`.
---

# Skill: body-audit

The reference the body audit follows when it scans a page's `post_content`: **what** to look
for, **why it matters**, **how severe** it is, and — for the handful of checks code can't
settle alone — **the judgment call**.

## The boundary — code supplies → skill judges

**Code owns every measurement:** regex/pattern matches, DOM structure, heading levels, image
attributes, file sizes, anchor stoplist, link status codes, word count, Flesch
score, embedding similarity, misspelling candidates. **This skill never recomputes a metric.**
It receives the code's numbers as fact and does two things only: (1) documents the standard
behind each check, and (2) **judges the fuzzy set** — thin-vs-concise, relevance, soft-404
intent, genuine spelling/grammar. **Judge, don't fix** — rewrites are the `content-fix` skill's
job; head/schema and theme-level (rendered-only) markup are out of scope.

---

## 1. What the audit scans for (scan surface)

Per-page on the raw stored body. **DET** = code settles it alone; **JUDGE** = this skill is
consulted.

- **Content** — Lorem Ipsum (DET) · Thin (JUDGE) · Readability (JUDGE on a score) · Low
  Relevance (JUDGE on a score) · Spelling (JUDGE on candidates) · Grammar (JUDGE on
  candidates) · Soft 404 (JUDGE intent).
- **Headings** — H1 Multiple · H1 Over 70 · H1 Alt-in-H1 · H1 Missing · H1/H2 Non-sequential ·
  H2 Missing · H2 Duplicate · H2 Over 70. (All DET; rewrites happen in the fix skill.)
- **Images** — Missing Alt Attribute · Missing Alt Text · Alt Over 100 · Missing/Incorrect
  Size Attrs · Over 100 kb. (All DET.)
- **Links** — Links to 404s (DET, proc L) · Unsafe Cross-Origin · Pages Without Internal
  Outlinks · No Anchor Text · Non-Descriptive Anchor. (All DET.)
- **Security** — Mixed Content · HTTP URLs. (All DET.)

> Only **five** checks are JUDGE calls: **thin, readability, relevance, spelling, grammar** —
> plus **soft-404** intent. Everything else is deterministic and never reaches this skill.

---

## 2. Best practice / SEO preference (the standard behind each check)

### Content
- **Thin content** — a page must satisfy the *intent* of its target keyword, not a word count.
  Answer-first opening, then the sections a searcher and the SERP expect. **Concise-but-complete
  beats padded:** a 250-word definitive answer is not thin; a 900-word page that never answers
  the query is.
- **Readability** — write to the audience's reading grade. Flesch `< 30` (or FK grade above the
  target) reads as difficult. Prefer shorter sentences, plainer words, active voice — without
  dumbing down substance or losing brand voice.
- **Relevance** — the body stays on the target keyword/cluster intent; drift dilutes focus.
  Refocus or cut drift rather than tolerate it.
- **Spelling / grammar** — clean copy is a baseline trust signal. Correctness *within the
  site's locale and voice*: deliberate fragments, informal phrasing, brand/product/proper
  nouns, and code are **not** errors.
- **Lorem Ipsum** — placeholder text on a live, indexable page is always wrong. Critical.
- **Soft 404** — a `200` page that reads as empty/not-found wastes crawl budget and can be
  dropped from the index. A **human decision**, never auto-fixed.

### Headings
- **Exactly one descriptive text H1** per page, reflecting the primary topic; multiple H1s
  dilute it, a missing H1 removes it.
- **Sequential outline** — step down by one level (no `H1→H3`).
- **H2 sections** on longer pages — distinct, descriptive, no duplicates within a page.
- **Length** — keep H1/H2 ≤70 chars so they stay scannable and don't truncate.

### Images
- **Every content image has descriptive alt text** (≤100 chars, no "image of…") — accessibility
  first, keyword only if genuinely depicted. Missing attribute, empty, and bloated alt are all
  gaps.
- **Explicit `width`/`height`** to reserve layout space and avoid CLS.
- **File weight** — keep content images under ~100 kb where possible; heavy images are a
  **manual re-upload**, not an auto-edit.

### Links
- **No links to 404s** — dead links waste equity and hurt UX. Critical. Prefer replacing with
  the correct/closest live URL (an internal cluster page where possible) over removing.
- **Safe external links** — `target="_blank"` needs `rel="noopener noreferrer"`.
- **Internal linking** — every page should be linked into its cluster; zero internal outlinks
  is an orphan-in-waiting. Contextually relevant same-cluster links, not over-linking.
- **Descriptive anchors** — anchor text describes the destination; "click here"/"read more"
  carry no relevance signal and hurt accessibility.

### Security
- **HTTPS everywhere** — mixed content (`http://` assets on an `https` page) breaks the secure
  padlock and can be blocked (Critical). In-content `http://` internal links should be `https://`.

---

## 3. Severity guidance (how the audit weights findings)

| Severity | Meaning | Body examples |
|---|---|---|
| **Critical** | breaks indexing/security/trust or is unambiguously wrong | Lorem Ipsum · H1 Missing · Links to 404s · Mixed Content |
| **Medium** | real SEO/UX cost, should be fixed | Thin · Low Relevance · Spelling · Soft 404 · H1 Multiple · H1 Alt-in-H1 · Missing Alt (attr/text) · No Internal Outlinks · Unsafe Cross-Origin · HTTP URLs |
| **Low** | polish; fix opportunistically | Readability · Grammar · H1/H2 Over 70 · Non-sequential · H2 Missing/Duplicate · Alt Over 100 · Size Attrs · Over 100 kb · No/Non-descriptive Anchor |

Severity is assigned by code from the sheet; this table is the **rationale** the audit surfaces
(and the order the warning label headlines by: highest severity first).

---

## 4. Judgment tasks (the JUDGE / confirm set)

Code produces a **number or candidate list**; this skill returns a **verdict**. A candidate the
skill clears is **not** written as an issue — this is what keeps the audit honest and low-noise.

**Input**
```json
{ "check": "thin | readability | relevance | spelling | grammar | soft_404",
  "url": "string", "primary_keyword": "string|null", "cluster": "string|null",
  "body_excerpt": "string",
  "signals": { "word_count": 0, "flesch": 0.0, "similarity": 0.0,
               "misspelling_candidates": ["string"], "grammar_candidates": ["string"],
               "not_found_patterns": ["string"], "gsc_soft_404": false },
  "locale": "string" }
```

**Output** — a verdict object, no prose:
```json
{ "is_issue": true, "reason": "one short line", "kept": ["…"] }
```
`kept` lists the genuine items for spelling/grammar (the subset worth flagging).

- **thin** — code flags `word_count` below a candidate threshold. Judge: does the body
  genuinely fail to satisfy `{primary_keyword}` intent? If it answers completely and
  concisely, `is_issue:false` ("concise-but-complete"). Length alone never decides.
- **readability** — code passes a Flesch below target. Judge: does the copy actually read as
  difficult for the audience (not just necessary technical terms)? Rarely overrides code.
- **relevance** — code passes `similarity` below threshold. Judge: genuine off-topic drift, or
  just semantically distant wording that's still on-topic? `is_issue:true` only for real drift.
- **spelling** — `misspelling_candidates` over-counts. Judge: keep only genuine errors for
  `{locale}`; drop brand/product/proper nouns, code, deliberate stylistic spellings.
- **grammar** — `grammar_candidates` over-counts. Judge: keep genuine errors; drop intentional
  fragments and correct-but-informal phrasing.
- **soft_404** — code matched not-found patterns on a `200` page (optionally corroborated by
  GSC). Judge: does it read as empty/not-found *by intent*? If so `is_issue:true` — but the fix
  is **DIAG** (human decides rewrite vs 404/redirect); never auto-resolved.

---

## 5. How the audit output feeds the system

- Every confirmed finding (DET or JUDGE) becomes a **normalized issue record** (`workflow=WF1`)
  with `type`, `issue`, `severity`, `current_value`, `evidence`.
- Records roll up into the **Keyword Plan warning label** — grouped counts by type, headlined
  by highest severity.
- On **"Send to In-review,"** records become **fix tickets** in Content Backlog; the fix is
  handled by the separate `content-fix` skill (AGENT) or deterministic code (DET), per
  `body-solution.md`.

---

## 6. Hard rules

- **Never recompute a metric.** `signals` are fact; judge the fuzzy set and document the standard.
- **Honesty over noise.** Clear a candidate whenever it isn't a genuine issue — a cleared
  candidate is not flagged.
- **Locale-aware.** Spelling/grammar/readability respect `{locale}` and brand voice.
- **Stay in the body.** `post_content` only — head/schema and rendered-only markup are out of scope.
- **Judge, don't fix.** Output verdicts, not rewrites — rewrites are the `content-fix` skill's job.
