---
name: "linkedin-carousel-slide-maker"
description: "Create LinkedIn carousels and publish preview via Sites."
---

# LinkedIn Carousel Slide Maker

## Purpose

Use this skill when the user asks to create, revise, style, export, preview, publish, or deploy LinkedIn carousel slides for Tín Trương / Tự học Product / ClawExperts-related thought leadership. The expected output is slide content, slide styling, exported assets, and a deployable preview when needed.

## Core Rule

Focus on the LinkedIn asset workflow unless the user explicitly asks otherwise:

1. Slide content: rewrite, split, tighten, order, and adapt the user's idea into a carousel flow.
2. Slide styling: apply a consistent visual system suitable for LinkedIn carousel preview/export.
3. Font consistency: use Be Vietnam Pro / Be Vietnam as the default and avoid mixing serif, monospace, Anton, or decorative fonts unless the user explicitly asks.
4. Publishing: when `.openai/hosting.json` exists, do not stop at localhost. Publish the preview/download page through Codex Sites and return production URLs.
5. Workflow economy: use the local prepare script when present so repeated export/copy/build/lint work is one command, not many manual tool calls.

Do not publish to LinkedIn unless the user explicitly approves posting, for example: `duyệt đăng bài này`.

## Default Brand Marks

Use these corner marks by default:

- Top-left: `Tín Trương`
- Top-right: `Tự học Product`, `Công ty số`, or the series label that best matches the content

Keep them visible but understated. They should feel like authorship/community marks, not the main title.

## Existing Workspace Template

If the workspace contains `linkedin-template/`, use it as the default working template.

Key files:

- `linkedin-template/linkedin-data.js`: primary content and slide data.
- `linkedin-template/styles.css`: visual styling.
- `linkedin-template/index.html`: preview shell.
- `linkedin-template/export-linkedin.sh`: export script.
- `linkedin-template/export/`: generated PNG/PDF output.
- `scripts/prepare-linkedin-assets.sh`: one-command local workflow when present.

Use the existing structure and styling patterns before introducing new layout concepts.

## Content Workflow

When the user provides long-form content:

1. Preserve the user's point of view and phrasing style.
2. Convert the idea into a clear carousel sequence.
3. Make slide 1 a real hook sentence for readers, not a label such as `Hook`.
4. Keep each slide focused on one thought.
5. Prefer concrete behavior change, baseline shift, before/after framing, or examples when the user is discussing product thinking.
6. Avoid generic motivational filler.
7. Avoid language that sounds too sales-led unless the user asks for a sales asset.
8. For founder/product-thinking posts, prefer an editorial observation tone over a pitch.

Good hook pattern:

- `Công ty 1 người không phải là một người ôm hết mọi việc.`
- `Nếu khách hàng vẫn làm y như cũ sau khi dùng app, value của bạn chưa đủ rõ.`

Good baseline pattern:

- Old baseline: manual, slow, reactive, unclear, intuition-based.
- New baseline: clearer, faster, proactive, measurable, outcome-oriented.

## Styling Workflow

When styling slides:

1. Pick one coherent style for the whole carousel unless the user asks for variants.
2. Use Be Vietnam Pro / Be Vietnam consistently for all text by default: brand marks, kicker, tabs, headings, body, emphasis, labels, counters, and buttons.
3. Do not mix in Playfair, Georgia, Courier, Anton, Impact, or other decorative fonts unless the user explicitly asks for that direction.
4. In local CSS font-face declarations, map real Be Vietnam Pro files to explicit weights instead of assigning one static font file to a wide weight range.
5. Keep the same typography rhythm, corner marks, spacing, borders, and background language across all slides.
6. Make the slide readable as a LinkedIn carousel image at small preview size.
7. Avoid decorative clutter that competes with the copy.
8. Use emphasis sparingly for the one phrase readers should remember.
9. Keep Vietnamese text clear and natural.
10. If the user says the content feels too salesy, remove pitch language before changing visuals.
11. Before export/deploy, scan CSS for font-family mismatches and remove unintended font imports.

## Export And Preview Workflow

After editing content or styling, prefer the one-command workflow if available:

```bash
npm run prepare:linkedin -- <slug>
```

This should export slides, copy PNG/PDF assets into `public/linkedin/<slug>/`, run build, and run lint.

If the script is missing, run the manual fallback:

1. Run the export command from `linkedin-template/`:

```bash
./export-linkedin.sh
```

2. Check that exported PNG files and `linkedin-carousel.pdf` exist.
3. Inspect representative slides with `view_image`, including slide 1 and the closing slide.
4. Copy final assets into a stable public path such as:

```text
public/linkedin/<slug>/linkedin-slide-01.png
public/linkedin/<slug>/linkedin-carousel.pdf
```

5. Update the app preview route so the visible page points to the new public assets and PDF.
6. Run validation:

```bash
npm run build
npm run lint
```

Report lint warnings separately from errors.

## Codex Sites Publishing Workflow

When `.openai/hosting.json` exists, publishing through Codex Sites is required unless the user explicitly asks for local-only output.

1. Read `.openai/hosting.json` and reuse the exact `project_id`.
2. Commit only the files needed for the preview/assets. Do not commit memory files or private workspace notes unless the user explicitly asks.
3. Push the exact source state to the Sites remote branch. If normal push fails due missing credentials, create a short-lived Sites source repository write credential and use per-command Git authentication. Never store the token in git config and never include it in the final answer.
4. Save a Sites version with the pushed commit SHA.
5. Deploy the saved version to production.
6. Poll deployment status until success or failure.
7. Verify the production preview page, PDF, and at least one slide image return `200 OK`.
8. Final response must include:
   - production preview URL
   - production PDF URL
   - local workspace path for exported assets
   - build/lint/export/deploy verification
   - any unresolved warning or blocker

## Reply Style

Reply to the user in Vietnamese when they are speaking Vietnamese. Keep the close-out short and direct:

- Say what changed.
- Provide the production preview link.
- Provide the PDF link.
- Mention export/deploy verification.
- Do not include long implementation details unless the user asks.
