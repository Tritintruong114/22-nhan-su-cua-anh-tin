---
name: "linkedin-png-template-no-jargon"
description: "No-jargon PNG workflow with required bridge line."
---

# LinkedIn PNG Template: No-Jargon Approval Workflow

Use this skill whenever preparing, revising, rendering, or drafting a LinkedIn PNG/card for Tín Trương Trí, especially cards about AI Agents, marketing workflows, business automation, or creator/business content.

## Core Rule

The image must be instantly understandable without extra explanation and must read as one connected idea.

Prefer:
- Vietnamese-first wording
- clear task names
- action-oriented bullets
- familiar business language
- concise line lengths
- one concrete takeaway
- a clear bridge from title to bullets

Avoid unless the user explicitly asks for it or the term is explained on-card:
- jargon or framework labels such as "Operating Brief", "agentic", "orchestration", "framework", "MCP", "governance", "workflow automation stack"
- decorative subtitles that do not add meaning
- English labels when a clear Vietnamese phrase works better
- clever but vague headlines
- concept-only statements without a usable structure
- title-to-bullet jumps that make the card feel cut off

## Hard PNG Copy Limit

Text on the PNG must be short enough to read on mobile and must not be clipped by the template.

Hard limit:
- Maximum 20 Vietnamese words total on the PNG content.
- Exclude avatar/name/title header UI, footer UI labels, and brand/profile metadata from the count.
- Include title, explanation line, bullets, and closing line in the 20-word limit.
- If the idea needs more than 20 words, move the detail to the LinkedIn caption instead of shrinking fonts or crowding the card.

Before previewing the structure to the user, count the words and rewrite until the PNG content is at or below 20 words.

## Content Structure

Before rendering, draft the image content in this order, while staying within the 20-word PNG limit:

1. **Title:** plain, specific, Vietnamese-first. It names the audience, problem, or task.
2. **Explanation line:** required. One short line that connects the title to the bullets and explains the practical point. Do not skip this unless the title itself already contains the explanation.
3. **Action structure:** 2-4 very short bullets or numbered steps.
4. **Closing line:** short, memorable, and grounded.

For the caption, expand the idea with context, examples, and the full explanation.

Good patterns:

```text
Founder đừng ôm hết việc

Giao phần lặp lại cho Agent:
1. Theo dõi insight
2. Viết draft
3. Nhắc duyệt

Founder quyết. Agent phụ.
```

```text
Giao việc rõ cho Agent

Đừng chỉ đưa một prompt:
1. Việc cần làm
2. Dữ liệu đầu vào
3. Điểm cần duyệt

Rõ việc, dễ dùng.
```

Bad pattern:

```text
Founder đừng ôm hết việc

1. Theo dõi insight
2. Viết draft
3. Nhắc duyệt

Founder quyết. Agent phụ.
```

Reason: it jumps from title to bullets without explaining what the bullets are.

## Approval Gate

Before generating or rendering the PNG, send the user a concise structure preview and wait for clear approval.

Preview format:

```text
Em đề xuất cấu trúc trên hình như này:

Title: ...
Explanation: ...
Bullets:
1. ...
2. ...
3. ...
Closing: ...

Word count trên PNG: X/20.
Em đã check: không jargon, có mạch giải thích, dễ đọc, không bị nhồi chữ. Anh duyệt thì em render PNG.
```

Only render after the user clearly approves, for example: "OK", "render", "duyệt", "OK PNG", or equivalent.

## No-Jargon And Flow Check

Before asking for approval, run this checklist:

- Can a non-technical business reader understand it in under 5 seconds?
- Is every English term necessary?
- Is the title concrete enough without the caption?
- Is there a bridge/explanation line before bullets?
- Do the bullets clearly belong to the explanation line?
- Does the card give the viewer a usable structure, not just an opinion?
- Is the PNG content at or below 20 words?
- Are bullets short enough to scan?
- Does the closing line reinforce the practical value?

If any answer is weak, rewrite before showing the user.

## Visual Template Guidelines

For the current LinkedIn card template:

- Keep the real avatar header when available.
- Use clean white background, black text, muted gray support text, and restrained gold only for small accents.
- Do not add a colored eyebrow/subtitle unless it directly clarifies the content.
- Avoid dense paragraphs on the image; use one short title, one short explanation line, 2-4 short bullets, and one short closing line.
- Keep title and bullets large enough for mobile scanning.
- Never shrink text just to fit more copy; cut copy instead.
- Footer icons may remain, but content readability has priority.

## Connector Draft Workflow

When the user asks to create a LinkedIn draft with the PNG via TryOpenClaw connectors, attach the image as a real media file. Do not put a Google Drive link in the caption as a substitute for the image.

Important constraints learned from the connector:

- `LINKEDIN_CREATE_LINKED_IN_POST.images[].s3key` must be a connector storage key, not a workspace path.
- Local paths such as `public/linkedin/...png` fail with storage 404.
- A Google Drive view link inside the caption is not an acceptable replacement for image upload.
- The LinkedIn connector currently exposes `lifecycleState` values such as `DRAFT`, but no direct `scheduledAt` or `publishAt` field.
- Do not use cron for LinkedIn scheduling unless the user explicitly asks for cron/reminder scheduling.

Use this tested path to create a proper LinkedIn draft with attached image:

1. Render PNG and save a stable local copy in the scheduled-draft folder.
2. If the image is not already in connector storage, upload/persist it through a connector-accessible source such as Google Drive.
3. Use `GOOGLEDRIVE_DOWNLOAD_FILE` on that Drive file to obtain the downloaded file object.
4. Extract the connector storage key from the returned temp storage URL/path. It looks like:

```text
<account>/googledrive/GOOGLEDRIVE_DOWNLOAD_FILE/response/<hash>
```

5. Call `LINKEDIN_CREATE_LINKED_IN_POST` with:

```json
{
  "author": "urn:li:person:<id>",
  "commentary": "<caption>",
  "visibility": "PUBLIC",
  "lifecycleState": "DRAFT",
  "images": [
    {
      "name": "<image-name>.png",
      "mimetype": "image/png or image/jpeg from connector output",
      "s3key": "<connector-storage-key>"
    }
  ]
}
```

6. If a bad draft was created using a Drive link in the caption, delete it with `LINKEDIN_DELETE_POST` after the correct attached-image draft succeeds.
7. Record the final draft/share URN in the local draft markdown.

Do not create text-only LinkedIn drafts for PNG posts unless the user explicitly approves text-only.

## Final Output

After rendering, send the PNG to Telegram and report:

- rendered/sent status
- output path
- confirmed 1080x1080 PNG when checked

After connector draft creation, report:

- whether the draft was created
- final LinkedIn draft/share URN
- whether any incorrect draft was deleted
- local draft markdown path
