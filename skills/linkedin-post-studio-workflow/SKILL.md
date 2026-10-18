---
name: "linkedin-post-studio-workflow"
description: "Turn a LinkedIn idea into approved branded copy, GPT-generated visuals, rendered templates, and publish-ready assets."
---

# LinkedIn Post Studio Workflow

## Purpose

Use this workflow when the user wants to create a LinkedIn post, visual, single-image card, diagram, or carousel. The workflow combines four roles:

1. `linkedin-content-strategist` — angle, hook, post copy, CTA, and content QA.
2. `linkedin-visual-designer` — format, art direction, slide structure, and render plan.
3. `linkedin-template-renderer` — exact layout, typography, SVG/HTML overlays, export, and visual QA.
4. `linkedin-publisher` — approval-gated publishing, permalink capture, and post record.

Do not publish automatically. Always stop at the approval gate unless the user explicitly authorizes publishing for this specific post.

## Trigger examples

- "Tạo bài LinkedIn về ..."
- "Làm carousel về ..."
- "Tạo hình template cho bài này"
- "Viết post và làm visual"
- "Chuẩn bị bài để đăng LinkedIn"

## Core workflow

### Phase 0 — Brief intake

Extract or ask for only the missing essentials:

- Topic or raw idea
- Audience
- Objective: thought leadership, education, build-in-public, product, hiring, or conversation
- Language
- Preferred format: single image, portrait card, carousel, diagram, or let the agent choose
- Personal experience/proof to include
- Whether a portrait, logo, screenshot, or reference image is available

If the user gives only a topic, infer a first draft and clearly label assumptions; do not block unnecessarily.

Output: `brief.json`.

### Phase 1 — Content strategy

`linkedin-content-strategist` produces three distinct angles before writing the final version:

- Contrarian insight
- Practical framework or lesson
- Personal/build-in-public story

For each angle provide:

- Hook
- One-sentence thesis
- Audience value
- Suggested format
- Visual direction
- Risk of sounding generic

Select the strongest angle based on clarity, personal credibility, and conversation potential. Then produce:

- Final post copy
- First comment
- CTA
- Hashtags, maximum 3–5 relevant tags
- Alt text draft
- Content QA notes

Output: `post.md`, `first-comment.md`, `content-brief.json`.

### Phase 2 — Visual direction

`linkedin-visual-designer` converts the approved content direction into a visual plan.

Default formats:

- Single insight: 1200x627
- Educational portrait card: 1080x1350
- Carousel: 1080x1350 per slide
- Diagram-heavy carousel: 1080x1350 per slide

Choose a template family:

- `editorial-hero`
- `bold-statement`
- `framework`
- `before-after`
- `diagram-carousel`
- `screenshot-story`
- `personal-brand-ai-visual`

Produce:

- Template family
- Slide count if carousel
- Headline and supporting text per slide
- Visual subject and composition
- Negative-space plan for text
- Brand palette and typography direction
- Asset requirements
- Accessibility/contrast notes
- Generation mode per element

Generation modes:

- `gpt-image-background`: scene, atmosphere, abstract visual, human/product composition
- `svg-overlay`: headline, body copy, numbers, arrows, diagrams, logo, page number
- `source-screenshot`: product/UI evidence
- `hybrid`: GPT Image background plus deterministic SVG/HTML overlay

Output: `visual-brief.json`, `art-direction.md`, `render-plan.json`.

### Phase 3 — Asset generation

Use `image_generate` for approved GPT Image elements.

Default model: `openai/gpt-image-2`.
Fallback: `openai/gpt-image-1.5`.

Prompt rules:

- Specify subject, composition, visual language, palette, mood, and constraints.
- Reserve clean negative space for overlay text.
- Ask for no readable text, random letters, watermark, fake logo, or unnecessary UI copy.
- Use reference images only when the user provides or explicitly authorizes them.
- Keep personal likeness edits faithful and avoid inventing identity details.

Do not use GPT Image for exact typography, dense diagrams, data, or final logo placement. Generate those deterministically in the renderer.

Output: generated background/hero assets and `generation-notes.json`.

### Phase 4 — Deterministic rendering

`linkedin-template-renderer` composes the final assets.

Render requirements:

- Exact LinkedIn canvas size
- Safe margins for mobile crop
- Deterministic text rendering
- Brand colors and typography
- Consistent header/footer system
- Correct logo placement
- No text overflow or clipping
- WebP/PNG preview and PDF for carousel when applicable

For diagrams, use SVG and never invent data. For screenshots, preserve the source evidence and annotate only what the brief specifies.

Output:

```text
post-package/
  post.md
  first-comment.md
  visual-brief.json
  render-plan.json
  preview.png or preview-grid.png
  slide-01.png ...
  linkedin-carousel.pdf (if carousel)
  alt-text.md
  qa-report.md
```

### Phase 5 — Quality gates

Run these checks before showing the final package:

Content gate:

- One clear thesis
- Hook is specific
- Personal/proof element is present when available
- No generic AI filler
- CTA matches the objective
- Hashtags are limited and relevant

Visual gate:

- Text is readable on mobile
- No typo or hallucinated text in generated image
- Contrast passes visual inspection
- All slides share the same system
- No clipping, overflow, broken logo, or accidental watermark
- Visual supports the post instead of repeating the entire post

Trust gate:

- No publishing has occurred
- External claims are marked as claims or sourced
- User-provided private images are not reused outside this post
- Any uncertain asset or wording is surfaced before approval

Output: `qa-report.md` with `pass`, `needs_revision`, or `blocked`.

### Phase 6 — User approval gate

Show the user a compact review:

- Final post copy
- First comment
- Template/format
- Preview asset
- What was generated versus rendered
- QA status
- Exact publish action that would happen next

Ask for one of:

- `Duyệt` — proceed to publish-ready state; publish only if explicit publishing authorization is included.
- `Sửa nội dung` — return to Phase 1.
- `Sửa visual` — return to Phase 2 or Phase 3.
- `Đổi format` — return to Phase 2.

Never interpret a general approval of the workflow as permission to publish a specific post.

### Phase 7 — Publishing and learning

Only after explicit post-specific publishing authorization:

1. Publish through the configured LinkedIn connector or approved browser workflow.
2. Capture permalink, platform post ID, timestamp, and final asset hash.
3. Store `publish-record.json`.
4. Do not claim success without a returned post ID or permalink.

After performance data is available, record:

- Impressions
- Reactions
- Comments
- Saves/shares if available
- Profile visits/clicks if available
- Which hook/template/topic was used
- What to test next

## Brand defaults for Trí

Unless overridden:

- Positioning: modern AI builder, systems thinker, practical founder
- Tone: sharp, useful, personal, non-hype
- Palette: deep navy, electric violet, cyan, warm yellow, white
- Visual style: vibrant modern editorial technology
- Default series labels: `AI AGENT 101`, `AGENT WORKFORCE OS`, or a context-specific label
- Avoid generic humanoid robots, excessive neon, fake dashboards, and unreadable text
- Prefer real workflow evidence, clear diagrams, screenshots, and specific founder lessons

## Failure handling

- If image generation is unavailable: produce a renderer-only SVG/HTML visual or a publish-ready text post and say exactly what is missing.
- If a reference image is missing: use a neutral composition and mark the portrait/logo slot as pending.
- If rendering fails: do not publish; return the error and preserve source files.
- If LinkedIn publishing is unavailable: export the package and say it is publish-ready but not posted.
- Never silently downgrade a carousel to a single image.

## Success criteria

A successful run produces a reviewable, branded post package with deterministic text, a clear visual system, a passed QA report, and no external publishing before user approval.
