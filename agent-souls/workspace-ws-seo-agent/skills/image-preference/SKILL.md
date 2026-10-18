---
name: image-preference
description: >
  Use this skill to derive a reusable STYLE DESCRIPTOR from the user's uploaded reference
  images and/or chosen preset, plus the crawled brand palette — so generated images match the
  brand's look and feel. Trigger during the one-time image setup (or when references/preset
  change in Settings), producing the descriptor that raster-generate later conditions on. This
  skill produces a style descriptor ONLY: it does not generate images (raster-generate /
  vector-image-generate do), does not source or match real assets (Drive/Shopify skills), and
  does not confirm the brand palette (that is a user confirm on the crawled value). From
  `content-backlog-images.md` §1 and §3.2.
---

# Skill: image-preference

## Goal

Read the user's reference images and preset and distill a compact, reusable **style
descriptor** — the look, mood, medium, and color direction — that steers image generation so
every generated image looks like it belongs to the brand.

## The boundary — code supplies → skill judges

- **Code supplies:** the uploaded `references` (images), any chosen `preset`, and the
  **confirmed** `brand_palette` (crawled → user-confirmed upstream).
- **Skill judges:** the style descriptor — medium, mood, composition tendencies, color
  direction, and what to avoid — inferred consistently across the references.
- **Never in this skill:** generating images (`raster-generate` / `vector-image-generate`);
  sourcing or matching real assets (`drive-image-match` / `shopify-product-match`); deciding
  or confirming the palette (that's a user confirm on the crawl); persisting config (code
  writes it to the image config object).

## Input

```json
{ "references": ["imageRef", "..."],            // may be empty
  "preset": "photographic | illustration | flat | none",
  "brand_palette": ["#RRGGBB", "..."] }
```

## Output

```json
{ "style_descriptor": {
    "medium": "string",                 // e.g. "natural-light photography", "flat vector illustration"
    "mood": "string",                   // e.g. "warm, appetizing, editorial"
    "composition": "string",            // framing/perspective tendencies
    "color_direction": "string",        // how to use the brand palette + overall tone
    "detail_level": "string",
    "avoid": ["string", "..."]          // e.g. "no stocky poses", "no neon", "no clutter"
  },
  "confidence": "high | medium | low" } // low when references are few/inconsistent
```

## How to judge

- **Infer from the references first.** Read the uploaded images as a set and describe what is
  *consistent* across them — medium, lighting, palette use, framing, level of detail, mood.
  Describe the pattern, don't over-fit one image.
- **Fold in the preset** as a prior when references are few or absent: `photographic`,
  `illustration`, and `flat` set the default medium; `none` means lean entirely on references
  (or, if none, on a neutral, brand-palette-driven default).
- **Tie color to the brand palette** — the descriptor should say *how* to use the confirmed
  palette (accents vs dominant, warm vs cool), not restate hex values.
- **Populate `avoid`** with concrete anti-patterns visible in or implied by the references
  ("no generic stock poses", "no heavy filters"), so generation steers away from them.
- **Confidence** — `low` when references are few, inconsistent, or absent (descriptor leans on
  preset + palette); `high` when a clear, consistent style is evident. Surface the uncertainty
  rather than inventing a confident style from thin input.

## Hard rules

- **Descriptor only — never generate or source images.**
- **Describe the consistent pattern**, not a single reference; don't over-fit.
- **Reference the confirmed palette by role**, don't re-decide or restate raw hex.
- **Surface low confidence** honestly when input is thin; do not fabricate a definitive style.
- Output feeds `raster-generate`; it is a **setting** the user can edit in Settings › Images.
