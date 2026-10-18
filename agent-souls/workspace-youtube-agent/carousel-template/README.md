# Facebook Carousel Template

Template HTML/CSS cho series carousel của fanpage `Tu hoc Product`.

## Visual Direction

- Size export: `1080 x 1350px` ratio 4:5.
- Style: editorial minimal, ivory background, black typography, orange accent.
- Structure: one idea per slide, large heading, short supporting copy.
- Consistency: fixed brand mark, slide progress dots, safe margin, reusable slide types.

## Files

- `index.html` - preview all slides, or render one slide with `?slide=1`.
- `styles.css` - design system and layouts.
- `carousel-data.js` - content data for the sample series.
- `export-png.sh` - exports each slide to PNG using local Chromium.

## Use

Preview all slides:

```bash
open carousel-template/index.html
```

Preview one slide:

```bash
open carousel-template/index.html?slide=1
```

Export PNG:

```bash
cd carousel-template
./export-png.sh
```

Output goes to:

```text
carousel-template/export/slide-01.png
carousel-template/export/slide-02.png
...
```

## Content Rules

- Cover title: 5-10 words.
- Step title: 3-7 words.
- Body: max 2 short lines per text block.
- Checklist/list: max 4 items.
- CTA slide: include one clear action and source video title.
