---
name: vector-image-generate
description: >
  Use this skill to author SVG code for a DIAGRAM image slot — a comparison table, flowchart,
  process, timeline, comparison, or graph — themed with the site's confirmed brand palette.
  Trigger at Write-Blog resolution for any slot whose slot_type is "diagram". This skill
  produces SVG for structural visuals ONLY: it never generates photographic/illustrative
  images (that is raster-generate), never invents the data being visualized (code passes it),
  and never re-decides the medium (slot_type already routed it here). From
  `content-backlog-images.md` §3.2.
---

# Skill: vector-image-generate

## Goal

Turn a diagram slot's brief and data into clean, legible **SVG code**, themed with the
confirmed brand palette — crisp, small, and editable, rather than a rasterized picture.

## The boundary — code supplies → skill judges

- **Code supplies:** the slot's `diagram_kind`, the `brief`, the `data` to visualize
  (already extracted — table rows, process steps, comparison items, timeline points), and
  the confirmed `brand_palette`.
- **Skill judges:** the diagram's layout and structure, and the SVG that renders it clearly.
- **Never in this skill:** photographic or illustrative images (that is `raster-generate`);
  inventing or altering the data (code passes it as fact); choosing whether this should be a
  diagram at all (the `slot_type: diagram` tag already routed it here).

## Input

```json
{ "diagram_kind": "comparison_table | flowchart | process | comparison | timeline | graph",
  "brief": "what the diagram shows",
  "data": { },                        // shape depends on diagram_kind (see below)
  "brand_palette": ["#RRGGBB", "..."],
  "locale": "string" }
```

Typical `data` shapes: `comparison_table` → `{ columns[], rows[] }`; `process`/`flowchart`
→ `{ steps[] }` (+ optional branches); `timeline` → `{ points[] }`; `comparison` →
`{ items[], criteria[] }`; `graph` → `{ nodes[], edges[] }`.

## Output

Valid, self-contained SVG code (a single `<svg>…</svg>`), themed with the palette. No raster,
no external image refs.

## How to judge the layout

Pick the structure that fits the `diagram_kind`:

- **comparison_table** — a clean table grid; header row in a palette accent, zebra or hairline
  rows; align text; keep columns readable at blog width.
- **flowchart** — nodes connected by arrows; one clear direction (top-down or left-right);
  label edges only when a branch needs it.
- **process** — ordered, numbered steps with connectors; linear unless the brief has branches.
- **timeline** — a spine with dated/ordered points; consistent spacing.
- **comparison** — items × criteria, as columns or paired cards; make the differences visible.
- **graph** — nodes grouped by category (one palette color per category), edges as plain
  strokes; avoid a rainbow.

**Theming:** use the `brand_palette` for accents, headers, and category fills; keep large
areas neutral so it reads on a page; ensure text contrast against its fill.

**Legibility:** no font below 11px; label everything; do not crowd — if the data is large,
simplify or summarize rather than shrink past readability.

**Accessibility:** include a `<title>` and `<desc>` on the SVG describing the diagram in one
sentence.

## Hard rules

- **Diagram slots only.** Never emit a photographic/illustrative raster — that is
  `raster-generate`.
- **Never invent the data;** render what code passed. If data is missing, return an error
  note, not a fabricated chart.
- **Theme with the confirmed palette;** neutral large areas; readable contrast; no font <11px.
- **Self-contained, valid SVG** with `<title>`/`<desc>`; no external references.
- Output is a **candidate** in the slot's suggestion pool — the user accepts or regenerates;
  nothing auto-inserts unseen.
