---
name: "write-product-roadmap-update"
description: "Viết update product roadmap theo giọng team"
---

# Write Product Roadmap Update

Use this skill to turn rough notes into a polished Vietnamese update suitable for a larger internal group.

## Output Style

- Write in Vietnamese by default unless the user asks otherwise.
- Tone: warm, clear, team-oriented, practical, and slightly informal.
- Start with a friendly greeting if the context is a group update.
- Use the user's relationship language naturally: `em`, `anh/chị`, `mọi người`, `team`.
- Keep the update concise but complete enough for a large group to understand status, priority, timeline, and next steps.
- Preserve real metrics, dates, names, project names, and links exactly unless correcting an obvious typo.
- Do not over-polish into corporate language. It should sound like an internal operator/product lead update.

## Default Structure

When the user gives weekly roadmap notes, use this structure unless another structure is requested:

```markdown
Hello mọi người,
Em update [Product/Project] tuần này nha mọi người ơi

[Tuần trước]
[Summary of shipped work, released items, production/staging changes, and measurable outcomes.]

[Operational metrics if available]
[Before/after improvements if available]
[Business or workflow impact.]

[Rút kinh nghiệm tuần rồi]
[Known issues, observed failures, learnings, or production feedback.]

[Tuần này]
Team tập trung các hạng mục P1: [main priority]

Mục tiêu: [clear outcome for customer, business, or operations]

Các việc chính:
- [Workstream 1]
- [Workstream 2]
- [Workstream 3]

Timeline
Bắt đầu/Planning: [date if available]
Dự kiến staging/QC/release: [date if available]

Xem chi tiết: [Roadmap/doc link if available]
```

## Writing Rules

- Lead with what changed, not with process.
- Separate shipped facts from current-week plans.
- Include numbers when available: conversations, leads, response time, conversion, error count, staging date, release date.
- Translate technical work into operational value: faster sales response, fewer missed leads, better handoff, clearer customer context, more stable production behavior.
- For bugs or instability, be transparent but constructive: state that the team observed issues and is monitoring/fixing/improving data or flows.
- If the user provides P0/P1/P2, preserve priority labels.
- If the user gives only rough bullets, infer a reasonable objective and `Các việc chính`, but avoid inventing metrics, dates, customer names, or release status.
- If important fields are missing, either omit them cleanly or mark them as `TBD` only when the user needs a planning format.

## Preferred Phrases

Use these naturally when they fit:

- `Em update [tên dự án] tuần này nha mọi người ơi`
- `Team đã release...`
- `Team đã đưa... lên production/staging...`
- `Luồng này bắt đầu chứng minh giá trị...`
- `Rút kinh nghiệm tuần rồi...`
- `Tuần này team sẽ tiếp tục monitor, fix lỗi và cải thiện...`
- `Team tập trung các hạng mục P1: ...`
- `Mục tiêu là...`
- `giảm tình trạng khách rời website mà không để lại thông tin`
- `giúp đội sales xử lý cơ hội nhanh hơn`

## Quality Checklist

Before answering, check that the update has:

- A warm opening suitable for a group.
- `[Tuần trước]` with concrete progress or outcomes.
- Learnings or production observations when relevant.
- `[Tuần này]` with a clear P1 focus.
- A customer/business objective, not only engineering tasks.
- Timeline dates if provided.
- No fabricated metrics or links.
- No markdown tables.

## Example Pattern

```markdown
Hello mọi người,
Em update Sale Agent tuần này nha mọi người ơi

[Tuần trước]
Team đã release tính năng báo lead vào Zalo group và gắn Sale Agent vào page production thật của Mái Nhà Việt.

Trong 3 ngày vừa qua, Agent ghi nhận tổng cộng 259 hội thoại tư vấn trên Fanpage.
Tốc độ phản hồi được cải thiện rõ rệt: từ 42 phút 23 giây xuống 27 giây, tương đương giảm khoảng 98.9% thời gian chờ của khách.

Luồng Zalo group cũng bắt đầu chứng minh giá trị trong việc vận hành cửa hàng: tổng cộng đã có 29 ca được đẩy về group để team xử lý tiếp.

Rút kinh nghiệm tuần rồi: team vẫn ghi nhận một số case Agent tư vấn sai luồng hoặc gặp lỗi trong hội thoại thực tế. Tuần này team sẽ tiếp tục monitor, fix lỗi và cải thiện dữ liệu/nghiệp vụ tư vấn để Agent ổn định hơn khi chạy production và mở rộng sang website.

[Tuần này]
Team tập trung các hạng mục P1: Agent trực trên website của khách hàng

Mục tiêu: tư vấn kịp thời cho khách truy cập website có nhu cầu, chuyển các lượt truy cập này thành lead đủ thông tin và ngữ cảnh tư vấn, giảm tình trạng khách rời website mà không để lại thông tin, đồng thời giúp đội sales xử lý cơ hội nhanh hơn.

Timeline
Bắt đầu/Planning: 31/08/2026
Dự kiến staging: Thứ Sáu, 04/09/2026

Xem chi tiết: Sale Agent Roadmap
```
