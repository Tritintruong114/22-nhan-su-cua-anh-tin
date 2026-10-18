---
name: seo-blog-writing
description: >
  Use this skill to write a complete SEO blog post from a direction and outline the
  user has already approved. Trigger when a brief arrives containing direction +
  outline + metadata. This skill does NOT choose keywords, does NOT build the
  outline, does NOT generate metadata, and does NOT publish to WordPress — those are
  separate steps before and after.
---

# Skill: SEO Blog Writing

## Goal

Write a complete, publish-ready blog post from a direction and outline the shop owner
has already approved. It must read as though a person wrote it, not a machine.

Output is the article body in HTML. No metadata, no images.

---

## Input

| Field | Source | How to use it |
|---|---|---|
| `keyword` | measured | the primary keyword for this post |
| `direction.why_reading` | P9 | who is reading, why today, what they expect to find |
| `direction.wants_to_hear` | P9 | the article's answer. This is the main claim |
| `direction.also_wants_to_know` | P9 | the 3 questions this reader has next |
| `outline` | P4 | the approved list of headings |
| `meta_title` `meta_description` `slug` | meta step | **reference only.** Already decided and saved before you run. Do not rewrite them, do not output them |
| `business_memory` | P1 | industry · audience · products · differentiators · brand_voice |
| `language_code` | pipeline | write everything in this language. Never detect it |

**The labels you will actually see in the brief** (same fields, the names this pipeline
prints — bind to these, not to the names in the left column above):

| This document calls it | The brief prints it as |
|---|---|
| `direction.why_reading` | `WHO IS READING (who they are · why today · what they expect to find)` |
| `direction.wants_to_hear` | `ANGLE (the promise this article must deliver — the article must CONCLUDE this)` |
| `direction.also_wants_to_know` | `ALSO ANSWER (they ask these right after)` |
| — (no equivalent above) | `WHAT THIS ARTICLE DOES THAT THE RANKING PAGES DO NOT` — the approved angle vs the titles below |
| — (no equivalent above) | `CURRENTLY RANKING` — domain + title only, see the section right below |

---

## YOU HAVE THE TITLES OF THE RANKING PAGES — NOT THEIR CONTENT

The brief may list the pages currently ranking for this keyword: **domain + title only.**
Nobody fetched their text, and no step in this pipeline ever will. Use that list the way
it was meant: to see what angle is already taken, so this article does not repeat it. The
`edge` line in the brief is the angle the shop owner already approved for that purpose.

So: you may take a DIFFERENT angle from those titles. You may NOT describe, quote,
summarise, correct, or count anything inside those pages — you have not read them.

Banned everywhere in the article:

> other articles · most articles say · nobody covers · unlike the pages currently
> ranking · according to research · experts say · studies show · statistics show ·
> data suggests

Never NAME a competitor and never write a sentence that compares this article to them.
The reader came for an answer, not for a review of the search results.

No research, no sources, and no market figures were given to you. A cited number here
is a fabricated number, and it will sit on a real client's website.

---

## Step 1 — Build the writing profile from the direction (internal, never output)

Before writing a single word, derive four things. This step decides the voice of the
whole article; get it wrong and every rule below stops mattering.

**From `why_reading`:**

1. **What the reader already knows.** This line says who they are and what they expect
   to find, which tells you their level.
   - does not know the basic vocabulary of the field → define the subject before
     comparing anything, and gloss each industry term the first time it appears
   - knows what the thing is, is working out how to do it → skip the definition, go
     straight to the how
   - is choosing between options → skip the basics entirely, open with the criteria
     that separate them

   When unsure, **assume they know less.** Writing above the reader's level is the most
   common reason a technically correct article is useless to the person who searched.

2. **What they are worried about.** The "why today" half of `why_reading` tells you what
   just happened to them. The article has to touch that, not only answer the surface
   question.

3. **Terminology level.** Follows from (1). A reader without the vocabulary needs a
   short plain-language gloss the first time each term appears — not a separate
   definition section.

**From `business_memory.brand_voice`:**

4. **How this business talks.** The chips in `brand_voice` are real observations about
   the client's existing copy — things like "Calls the reader 'bạn'", "Short sentences,
   one idea each", "States prices directly, with numbers", "Avoids medical jargon".

   Apply those chips literally. **Address form especially**: use the exact pronoun in
   the chip and never switch mid-article. If `brand_voice` is empty or very thin, use a
   neutral voice and do not compensate by inventing a brand personality.

These four things are this article's writing profile. Never print them, never refer to
them in the article.

---

## Step 2 — Follow the approved outline

`outline` has already been shown to the shop owner and approved on the outline screen.

- **Keep every heading word for word.** Do not reword, do not improve, do not
  retranslate.
- **Keep the order.** Do not reorder, merge, or split.
- **Do not add a heading, do not drop one.**
- Keep the H2/H3 levels exactly as given.

If an item in `also_wants_to_know` has no heading that answers it, **put it in the
closest section or in the FAQ** — do not add a heading. The user approved both the
number of sections and their wording.

If the outline and the direction disagree, **the direction wins on content, the outline
wins on structure.**

---

## Step 3 — H1

Shape: **[keyword] + words that extend and define the scope.**

- Contains the keyword in full
- Longer than `meta_title`, and not identical to it
- Conveys the full scope the article covers
- No clickbait, no "Discover…" / "Everything about…"

Example for the keyword `app tích điểm shopify`:

- ✓ "App tích điểm Shopify: cách chọn và chi phí thực tế cho shop nhỏ"
- ✗ "App tích điểm Shopify" — same as meta_title, adds nothing
- ✗ "Top 10 app tích điểm Shopify tốt nhất 2026" — contains a year, and this is not a
  listicle

---

## Step 4 — Opening (sapo)

This is where the reader decides to keep reading or go back to Google. Three jobs, in
two or three sentences:

**a. Let them recognise themselves.** Use `why_reading` as raw material.

⚠ **`why_reading` is written FOR THE SHOP OWNER, in the third person. Never paste it
into the article.** It has to be turned into something said to the reader.

```
why_reading:  "Người sắp đón chó mèo về nhà, gõ tìm danh sách để khỏi mua thừa đồ"

✗ "Người sắp đón chó mèo về nhà thường tìm danh sách để khỏi mua thừa đồ."
     → describing the reader to the reader, in the third person. Very strange to read.
✓ "Sắp đón bé về mà chưa biết mua gì trước, mua gì để sau?"
     → same situation, spoken to them
```

**b. Answer immediately.** `wants_to_hear` is the article's answer. Put it in the
opening or right after it, **almost word for word** — it was already written as a
standalone claim, and the shop owner approved that exact sentence.

Unlike `why_reading`, this one **needs no change of person**.

```
wants_to_hear: "Chỉ cần vài món cơ bản, còn lại mua sau khi biết tính nết"
✓ use it near-verbatim in the opening
```

**Do NOT bold the answer.** Key Takeaways sits directly below; bolding here as well
makes the opening look like a technical document.

**c. Mention the keyword within the first 30 words.** Naturally, never forced. If the
keyword already sits in the situation sentence you are done; if not, work it into the
second sentence.

### Guard on the opening

Do not open with:

> In today's landscape · Nowadays · With the rise of · Have you ever wondered ·
> Welcome to · [Keyword] is one of the most… · [Keyword] is becoming…

**And a test stronger than the list above:** read your opening sentence and ask —
*could this sentence be copied into a different article in the same industry?*

- **Yes → rewrite it.** It is a generic lead-in, not the opening of this article.
- A good opening is true only for **this reader, in this situation.**

Also do not open by **defining the keyword.** Someone who typed that phrase into Google
mostly already knows what it is; a definition in the first sentence signals the article
has nothing to say.

---

## Step 5 — Key Takeaways

- Immediately after the opening, before the first H2
- Bulleted, **3–5 points**
- Each bullet stands alone and makes sense read on its own
- Name it in `language_code` — a Vietnamese article uses "Những điểm chính" or similar.
  **Never "TL;DR".**
- These are the article's conclusions, not a table of contents. Never write "Section 1
  will cover…"

Purpose: a skimming reader gets the substance, and AI Overview has something to extract.

---

## Step 6 — Body

### 6.1 Headings

- H2 clarifies H1. H3 clarifies the H2 above it.
- Never skip a level: H1 → H2 → H3.
- **A 1–2 sentence transition between consecutive headings** (H2→H3, H3→H4). The
  transition says **why the next part matters**, not what the next heading is called.
  - ✗ "Next, we will look at how to choose a food bowl."
  - ✓ "Buying the wrong bowl size is the most expensive mistake in that first order, so
    start here."

### 6.2 Length

**No minimum length for any section.**

A section worth three sentences gets three sentences. A section too thin to stand gets
its content folded into the neighbouring one — but keep the heading exactly as the
outline has it.

Total length follows from the outline, not from any target number. **Never pad.** The
way padding usually happens is extra qualifying clauses and sentences that restate what
was just said — that is precisely the texture that makes an article read as
machine-written.

### 6.3 Paragraphs

- Maximum 4 lines per paragraph, one main idea each.

- **The OPENING paragraph of each section must stand alone** — readable on its own,
  without the paragraph before it. This is the paragraph AI Overview and skimming
  readers will lift.
  - ✗ "This method is very effective…" (which method?)
  - ✓ "Choosing a bowl by muzzle size rather than by price keeps the dog from choking…"

- **Every other paragraph in the section may use pronouns and back-references freely.**
  This is what makes prose flow. Forcing every paragraph to restate the full subject
  noun is the fastest way to make an article read as machine-written.

- Only two phrases are banned, because they mean nothing to a skimming reader: **"as
  mentioned above"** and **"as above"**.

### 6.4 Content — information gain

The article needs specifics, not generalities. But **the only source of specifics is
`business_memory`**:

- the products and services actually sold (`products`)
- checkable differentiators (`differentiators`) — guarantees, warranties, years of
  operation, certifications, stated policies
- how the business works, the cases it sees often, what it does not take on
- any figure that appears in `business_memory`, used exactly as given

**Completely banned:** research figures, percentages, organisation names, surveys,
comparisons against named competitors, market data. No sources were given to you, so
every number of that kind would be invented.

  ✗ "Research shows 68% of new owners over-buy in the first month"
  ✓ "Most customers who come in during the first week have already bought a crate, and
     then the dog refuses to go in"

**Distinguish two kinds of statement:**
- what the business does and sees routinely → say it, framed as their experience
- what is true in general → only when you are certain, and stated at a general level

### 6.5 Content — consistency and honesty

- No internal contradictions: figures and positions stay consistent throughout.
- **Never contradict `wants_to_hear`.** That is the conclusion the shop owner approved.
  No section may argue against it.
- **Guard rails: 1–2 places in the whole article, no more.** Put them on the strongest
  claim.
  - ✓ "This holds for most cases, but a dog with an existing condition needs a vet's
    opinion."
  - ✗ Wrapping every claim in "results may vary depending on…" — that hedging voice
    costs the article its authority and is a clear machine-writing tell.
  - The third item in `also_wants_to_know` is usually the **boundary case**. That is the
    most natural place for a guard rail.

### 6.6 Show the reader what getting it wrong costs

Before the final section, there must be **at least one place** that names what breaks if
they get this wrong or do nothing. Concrete, imaginable, **never fear-mongering**.

- ✓ "Buying a crate before you know how the dog sleeps usually means buying a second one."
- ✗ "Without proper preparation, your pet could be in danger."

Without this, the final section's mention of the business reads as an advertisement,
because the reader has not yet seen that they have a problem worth solving.

### 6.7 Where the business appears

**Exactly ONCE, in the final section of the body.**

- Not zero: an article that never connects to the business earns traffic that converts
  nothing.
- Not twice or more: an article that sells in several places reads as an advertisement.
- Not in any earlier section. Every section before it answers the reader's question and
  nothing else.

That mention must **attach to a problem raised in an earlier section**, and may only
name something in `business_memory.products`.

- ✓ "If you would rather not guess the size, having the shop measure it is fastest."
- ✗ "Contact us today for a free consultation."
- ✗ Naming a service that is not in `products`.

A price may only appear if that exact figure is in `business_memory`.

### 6.8 Formatting

- **Bullets carry an explanation**, never a bare list of names.
  - ✗ "• Food bowl / • Crate / • Collar"
  - ✓ "• Food bowl — pick it by muzzle size; a deep bowl makes the dog reach"
  - **Bullets must not all be the same length, as if cut with a ruler.** They differ in
    length because they differ in content. A list where every line runs the same length
    is a machine-writing tell.

- **Tables** are for comparisons, price lists, feature matrices. Always a context
  sentence before the table.

- **No blockquotes and no bolded answers in the body.** Only the FAQ uses blockquotes.
  An article with four or five layers of bolded blocks looks like a technical document
  rather than a piece of writing, and readers register that before they read a word.

- **Em dash (—): at most 1–2 times in the entire article.** A sentence that needs an em
  dash to hold two ideas should become two sentences. Overusing it is one of the
  clearest machine-writing tells.

- Never mention images. No image tags, no captions, no placeholders for images. A
  separate step handles that.

### 6.9 Sentence rhythm

This is the most important rule about voice, and the one the old skill did not have.

**Sentence length must vary.** A five-word sentence next to a twenty-five-word one. A
paragraph where every sentence runs roughly the same length is the clearest tell of
machine writing — clearer than word choice.

- After two long sentences, drop in a short one.
- Never open two consecutive sentences with the same construction.
- No repeated words, no repeated sentence structures, no repeated ideas.

**Test it by reading aloud.** Read the opening and one mid-article section out loud. If
it sounds stiff, breathless, or like a report being read, rewrite it.

---

## Step 7 — FAQ

Place it at the end of the article, before the conclusion.

**Where the questions come from:**
- 3 from `direction.also_wants_to_know` — the shop owner approved these exact three
- 1–3 more derived from the situation in `why_reading`: what someone in that position
  still wonders after finishing the article

Total **4–6 questions**.

**Every answer follows the same three tiers:**

1. **Direct answer** — one sentence, bolded
2. **Explanation or evidence** — 2–3 sentences
3. **Condition or exception** — when this does not apply

Each answer runs 50–60 words. **Never repeat body content** — if an answer only restates
a section above, drop that question.

**Format:** the question uses blockquote + bold, the answer uses blockquote.

The opening of each answer must stand alone, readable without the question.

---

## Step 8 — Conclusion

- **No keyword requirement.** The keyword is already in the H1, the first 30 words, and
  a heading. Repeating it again is stuffing.
- No new information. Restate what the article concluded.
- **The next step must be something the reader can do immediately.**
  - ✓ "Start with the three items you need on day one, and give the rest a week."
  - ✗ "Contact us now for a free consultation."

---

## Step 9 — Internal links

**Never insert a real internal link.** You do not know which URLs exist on that site.

Leave a placeholder wherever the context genuinely calls for one:

```
{{INTERNAL_LINK: [short description of the topic to link to]}}
```

Example: `{{INTERNAL_LINK: the post about puppy vaccination schedules}}`

A separate flow matches these against the posts synced from WordPress and inserts the
right link. Place them where a reader would actually want to read more, not scattered to
hit a count.

**No external links.** No sources were given to you, so do not link out.

---

## Step 10 — Check before returning

```
FOLLOWS THE BRIEF
[ ] Headings kept word for word and in order, exactly as the outline
[ ] No heading added, none dropped
[ ] wants_to_hear is established in the opening or immediately after
[ ] All 3 also_wants_to_know items are answered somewhere
[ ] No section contradicts wants_to_hear
[ ] why_reading was CONVERTED to second person, not pasted verbatim

STRUCTURE
[ ] H1 = keyword + defining extension, different from meta_title
[ ] Keyword appears within the first 30 words
[ ] Key Takeaways present, 3–5 bullets, after the opening
[ ] No skipped heading levels
[ ] Transitions between consecutive headings
[ ] No section padded to reach a length
[ ] FAQ 4–6 questions, before the conclusion
[ ] Conclusion adds no new information; next step is concrete

CONTENT
[ ] Every specific traces back to business_memory
[ ] NO research figures, percentages, organisation names, surveys
[ ] NO sentence implying you read anyone else's article (titles ≠ content)
[ ] No competitor named, no comparison against the ranking pages
[ ] Guard rails in 1–2 places only, on the strongest claim
[ ] At least one place naming what getting it wrong costs
[ ] Business appears EXACTLY ONCE, final section, tied to a problem raised earlier
[ ] No service outside products, no price outside business_memory
[ ] Address form and voice match brand_voice

VOICE AND RHYTHM
[ ] Sentence length varies; not uniform
[ ] Read the opening and one mid section aloud — nothing stiff
[ ] The opening sentence could not be copied into another article in the same industry
[ ] Article does not open by defining the keyword
[ ] Each section's opening paragraph stands alone; pronouns free inside the section
[ ] No "as mentioned above", no "as above"
[ ] No repeated words, sentence structures, or ideas
[ ] Em dash used at most 1–2 times in total

FORMATTING
[ ] Paragraphs at most 4 lines
[ ] Bullets carry explanations and vary in length
[ ] Tables have a context sentence before them
[ ] Blockquotes ONLY in the FAQ
[ ] No mention of images anywhere
[ ] Semantic HTML: proper h1/h2/h3/table/ul — never div or span in place of a heading

LINKS
[ ] Internal links use the {{INTERNAL_LINK: ...}} format
[ ] No external links
[ ] No real URLs inserted
```

---

## Output

Return **only the article body in HTML** with semantic tags, in this order: H1 →
opening → Key Takeaways → body following the outline → FAQ → conclusion.

No metadata (it came from an earlier step). No checklist. No commentary outside the
article.
