---
name: "creator-desk-thumbnail"
description: "Create desk-scene YouTube thumbnails from a title, subject photo, and optional supporting visuals."
---

# Creator Desk Thumbnail

Use this skill to create YouTube thumbnail prompts for creator-led business/AI/productivity videos where the visual concept is: one real person as the main subject, placed in a warm desk/computer scene, with supporting visual elements that explain the topic.

## Required Inputs

Ask only if missing and not inferable:

- `title`: the main thumbnail text, preferably 2-5 words.
- `subject_image`: the creator/person photo to use as the identity reference.
- `supporting_visuals`: optional images or concepts to place around the subject, such as OpenClaw bots, app UI, product mockups, order cards, agent cards, content posts, charts, or icons.

## Core Concept

The thumbnail should feel like a grounded creator/business scene, not a hype ad. Default composition:

- 16:9 YouTube thumbnail.
- Main subject centered or slightly off-center.
- Subject seated at or standing near a computer desk setup.
- Laptop/monitor/iPad visible if it supports the story.
- Supporting visuals appear around or behind the subject as clean graphic elements.
- Title is large, simple, and readable at mobile size.
- Keep small subtitles out unless the user explicitly asks.

## Visual Style

Prefer:

- Warm, approachable, modern creator-brand style.
- Clean desk setup, soft shadows, realistic lighting.
- Bold contrast and clear foreground/background separation.
- Editorial/business creator feel.
- Slightly playful if the topic allows.

Avoid:

- Robot faces unless specifically requested.
- Sci-fi humanoid AI workers.
- Money symbols, cash rain, luxury bait, exaggerated promises.
- Too many tiny labels or unreadable text.
- Overly futuristic blue neon dashboards.
- Crowded panels that make the thumbnail feel like a course ad.

## Layered Prompt Structure

When writing an image prompt, structure it like this:

```text
16:9 YouTube thumbnail, modern creator-brand style, warm and credible, high contrast, professional but approachable.

Subject layer:
Use the uploaded subject photo as the identity reference. Place the creator as the main character in the center, seated at a computer desk or standing beside a desk, natural expression, realistic photo style, clear face, good lighting.

Supporting visual layer:
Add [supporting_visuals] around the creator as friendly graphic/3D/illustrated elements. Keep them secondary to the person. If using OpenClaw bots, make them small companion-like red OpenClaw-style assistant bots near the desk or monitors, not humanoid robots.

Background layer:
A clean desk/computer workspace with subtle workflow elements on screens: app UI, chat bubbles, automation lines, order cards, or product mockups depending on the video topic. Keep it minimal and readable.

Text layer:
Large bold Vietnamese title: "[TITLE]"
No small subtitles unless requested. Make the title readable, with strong contrast and enough safe margin from the edges.

Style constraints:
No sci-fi humanoids, no money symbols, no get-rich-quick vibe, no tiny unreadable labels, no overcomplicated background.
```

## OpenClaw Bot Variant

When the user asks for OpenClaw-style bots:

- Make bots feel like small helper mascots or assistant devices around the desk.
- Use red/white/black accents if compatible with the source concept.
- Put them near monitors, keyboard, or floating lightly around the creator.
- Do not let bots replace the subject as the emotional center.
- Avoid making the bots look like generic aggressive robots.

Example:

```text
Add 3-4 small red OpenClaw-style assistant bots around the desk and monitor, cute but professional, simple rounded forms, expressive screen-like faces, supporting the creator like digital teammates.
```

## Title Guidance

Thumbnail title should usually be shorter than the YouTube title.

Good examples:

- `CÔNG TY SỐ`
- `DOANH NGHIỆP 1 NGƯỜI`
- `NHÂN SỰ AI`
- `APP ĐẦU TIÊN`
- `AI LÀM CÙNG TÔI`

Use one main phrase. If there are two phrases, make one dominant and the other visually secondary only when requested.

## Output Format

Default response should include:

- A short note on the visual direction.
- The final English image-generation prompt.
- Optional 1-2 quick variants only if useful.

Keep the prompt ready to paste into an image generator. If the user asks to generate the image directly and the image generation tool is available, use the image-generation skill/tool after producing or internally forming the prompt.

## Quality Checklist

Before finalizing, verify the prompt includes:

- 16:9 thumbnail format.
- Required title exactly as requested.
- Uploaded subject image as identity reference.
- Desk/computer concept.
- Supporting visuals clearly secondary.
- No scammy/get-rich-quick signals.
- No unnecessary subtitles or tiny text.
- Clear safe margins for title and face.
