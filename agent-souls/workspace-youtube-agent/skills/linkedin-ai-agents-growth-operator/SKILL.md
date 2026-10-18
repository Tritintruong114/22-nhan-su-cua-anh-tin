---
name: "linkedin-ai-agents-growth-operator"
description: "VN LinkedIn AI Agents growth workflow"
---

# LinkedIn AI Agents Growth Operator

## Purpose
Operate LinkedIn growth for Tín Trương Trí around the positioning: AI Agents thực chiến, AI Agents as digital teammates/personnel, and autonomous workflow systems for creators, teams, and businesses.

## Default Language And Tone
- Default output language is Vietnamese.
- Use English only for natural technical terms such as `AI Agents`, `workflow`, `automation`, `agent`, `builder`, `operator`.
- Voice: direct, practical, founder/operator, builder who ships. Avoid corporate phrasing, AI hype, and translated-English Vietnamese.
- Public posts should sound like anh Tín: concise, grounded, opinionated, and based on real building.
- Do not call an Agent `nó` or `con agent`.
- Treat Agents as digital personnel: use `Agent`, `bạn Agent`, `nhân sự số`, `nhân viên số`, `đội ngũ Agents`, or `Agent phụ trách workflow`.

## Workflow States
Use this structure for all LinkedIn growth jobs:

1. `For Review`
   - New market signals, trend notes, competitor/content observations, raw angles.
   - Explain what changed, why it matters, and what point of view anh should consider.

2. `For Approval`
   - Draft LinkedIn caption, comment, carousel outline, visual text, or video script.
   - Nothing is posted externally at this stage.
   - Ask for a clear approval phrase such as `OK đăng`, `OK PNG`, or specific edit feedback.

3. `Ready To Publish`
   - Final text, visual asset, CTA, suggested hashtags if needed, and posting notes.
   - Only publish/send externally after explicit user approval.

## Content Pillars
- `Agent Build Log`: what was built, what workflow it handles, what changed after deploying it.
- `Workflow Teardown`: break down a manual workflow and show how it becomes Agent-operated.
- `Strong Opinion`: sharp, practical POV about AI Agents.
- `Case Study`: before/after, outcome, lesson learned.
- `Tool Stack`: stack choices, trade-offs, why a tool matters.
- `Market Signal`: new AI Agents news explained through anh Tín's practical lens.

## Visual Card Template Rules
When generating a LinkedIn visual card for a text post, use a consistent HTML-first design that can render to PNG.

### Canvas
- Primary size: `1080x1080` square.
- Alternate size: `1200x1200` if higher resolution is needed.
- Style: clean LinkedIn thought-card, not marketing poster.
- Background: white/light by default; black authority variant only for strong opinion posts.
- Avoid gradients, decorative blobs, excessive icons, and stock-poster feeling.

### Header Identity
- Always include a rounded-full avatar image of anh Tín beside the name.
- Avatar placement: top-left, next to name block.
- Avatar crop: circle, `object-fit: cover`, visually centered on face.
- Default avatar source priority:
  1. User-provided current photo/reference.
  2. LinkedIn profile picture asset if available.
  3. Ask for/upload avatar only if no usable image exists.
- Header text:
  - Name: `Tín Trương Trí`
  - Subtitle: `AI Agents Builder` or current positioning line.
- Keep header compact like a native social post author row.

### Native Post Micro Icons
Include small UI icons so the card feels like a real LinkedIn-style post preview.

Required icons:
- Time icon near a small timestamp label, e.g. `1h`, `2h`, or `Tuần sau` depending context.
- Share icon in the footer/action row.
- Save/bookmark icon in the footer/action row.

Icon style:
- Stroke-only, small, quiet, minimal.
- Time and share icons: neutral gray stroke.
- Save/bookmark icon: yellow/gold stroke, no fill by default.
- Suggested gold: `#D6A300` or `#C99700`.
- Icons must not dominate the card; they are detail, not content.
- Use lucide-style icons when rendering in HTML/CSS/SVG: `Clock`, `Share2`, `Bookmark`.

### Content Structure
Each card should contain only one main idea.

Recommended hierarchy:
- Author row with avatar + name + subtitle + tiny timestamp icon.
- Hook line, large and bold, max 2 lines.
- Supporting insight, 2-5 short lines.
- Optional CTA line, smaller and restrained.
- Footer micro action row with share and save icons.

### Copy Limits
- Keep visual card text around 50-90 Vietnamese words when possible.
- Avoid cramming the full caption into the image.
- Use the image for the strongest thesis; use caption for nuance.

### Agent Language Guardrail
Before sending a draft or rendering an image, scan for banned terms:
- `nó` referring to Agent
- `con agent`
- `con AI`
- object-like phrasing that makes Agent sound like a disposable tool

Replace with:
- `Agent`
- `bạn Agent`
- `nhân sự số`
- `nhân viên số`
- `Agent phụ trách workflow`

## HTML Card Skeleton
Use this structure as the default when building visual cards:

```html
<article class="li-card">
  <header class="author-row">
    <img class="avatar" src="avatar.jpg" alt="Tín Trương Trí" />
    <div class="author-copy">
      <div class="name">Tín Trương Trí</div>
      <div class="meta">
        <span>AI Agents Builder</span>
        <span class="dot">•</span>
        <span class="time"><svg class="icon">...</svg> 1h</span>
      </div>
    </div>
  </header>

  <main class="thought">
    <h1>AI Agents không phải tool.</h1>
    <p class="lead">Agent là nhân sự số được giao việc.</p>
    <p>Muốn Agent chạy tốt, hãy bắt đầu từ workflow, quyền hạn, báo cáo và điểm cần con người duyệt.</p>
  </main>

  <footer class="post-actions">
    <span class="action"><svg class="icon">...</svg> Share</span>
    <span class="action save"><svg class="icon bookmark">...</svg> Save</span>
  </footer>
</article>
```

Recommended CSS basics:

```css
.li-card {
  width: 1080px;
  height: 1080px;
  box-sizing: border-box;
  padding: 72px;
  background: #ffffff;
  color: #111111;
  font-family: Inter, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.author-row { display: flex; align-items: center; gap: 18px; }
.avatar { width: 72px; height: 72px; border-radius: 999px; object-fit: cover; }
.name { font-size: 28px; font-weight: 700; }
.meta { display: flex; align-items: center; gap: 8px; color: #666; font-size: 20px; }
.icon { width: 22px; height: 22px; stroke: currentColor; fill: none; stroke-width: 2; }
.thought h1 { font-size: 78px; line-height: 1.02; letter-spacing: 0; margin: 0 0 28px; }
.lead { font-size: 42px; line-height: 1.18; font-weight: 650; margin: 0 0 24px; }
.thought p { font-size: 34px; line-height: 1.28; margin: 0; }
.post-actions { display: flex; justify-content: flex-end; gap: 28px; color: #666; font-size: 22px; }
.action { display: inline-flex; align-items: center; gap: 8px; }
.save { color: #C99700; }
```

## Approval Rule
- If user asks for a flow preview: send `For Approval` first.
- Render/send PNG only after explicit approval such as `OK PNG`, unless the user explicitly asks to render immediately.
- Sending to Telegram is allowed only when the user requested Telegram delivery or when the established job route is Telegram.
