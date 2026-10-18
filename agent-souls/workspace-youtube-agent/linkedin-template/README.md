# LinkedIn HTML Export Template

Template HTML/CSS cho visual LinkedIn theo 3 concept:

- `metric` - so sanh truoc/sau, so lon, contrast manh.
- `editorial` - card editorial co tab, hop voi story/context.
- `collage` - poster/collage sticky card, hop voi offer/newsletter/lead magnet.

## LinkedIn Specs

- Main canvas: `1080 x 1350px`, ratio `4:5`.
- Export PNG tung slide de review.
- Export PDF nhieu trang de upload LinkedIn document/carousel.
- Safe margin: `74px`.

## Files

- `index.html` - preview tat ca slide, hoac render mot slide voi `?slide=1`.
- `styles.css` - preset visual va print CSS.
- `linkedin-data.js` - noi dung, theme, layout type.
- `export-linkedin.sh` - export PNG va PDF bang Chromium.

## Use

Preview:

```bash
open linkedin-template/index.html
```

Preview one slide:

```bash
open linkedin-template/index.html?slide=1
```

Export:

```bash
cd linkedin-template
chmod +x export-linkedin.sh
./export-linkedin.sh
```

Output:

```text
linkedin-template/export/linkedin-slide-01.png
linkedin-template/export/linkedin-slide-02.png
linkedin-template/export/linkedin-carousel.pdf
```

## Editing Content

Sua `linkedin-data.js`:

- Doi `brand` va `series` cho series.
- Moi slide chon `type`: `metric`, `editorial`, `collage`, hoac `note`.
- Doi `theme` tren tung slide neu muon dynamic styling theo mood rieng.

Content nen ngan:

- Headline: 5-10 tu.
- Body: 1-2 cau ngan.
- Chip/list: toi da 3-4 item.
