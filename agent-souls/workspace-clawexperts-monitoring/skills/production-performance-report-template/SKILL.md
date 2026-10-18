---
name: "production-performance-report-template"
description: "Neutral production report template with MNV release phases."
---

# Production Performance Report Template

Use this template when the user asks for a production performance report for a customer workspace, especially when the report may be read by a customer, business owner, operator, or internal executive.

## Principles

- Write in neutral business-report language.
- Avoid overusing technical or product-internal wording in customer-facing copy.
- Keep quality-scoring, internal metric names, and judging workflow out of public reports unless the user explicitly asks to include them.
- Focus the public report on operational value: response speed, customer intake, captured needs, action cases, data gaps, stability, and next operational steps.
- Do not expose API keys, private customer phone numbers, raw transcripts, or sensitive workspace credentials.
- If reporting from dashboard data, use production data and the workspace code supplied by the user.

## Report Structure

### 1. Header

Use a concise title:

```text
<Workspace Code> Performance Report
```

Short intro:

```text
Tổng hợp hiệu quả tiếp nhận, phản hồi và ghi nhận nhu cầu khách hàng của workspace <workspace_code> trong giai đoạn production.
```

### 2. Executive Summary

Summarize the current status in 3-5 sentences:

- Is the workspace operating stably?
- How much activity was recorded?
- What concrete customer/business signals were captured?
- What improved compared with the previous/manual process?
- What still needs to be completed before claiming revenue impact?

Example wording:

```text
Workspace <workspace_code> đang vận hành ổn định trong môi trường production. Trong kỳ theo dõi, hệ thống ghi nhận <conversation_count> hội thoại và <message_count> tin nhắn. Sổ vận hành cho thấy đã có <customer_info_events> lượt ghi nhận thông tin khách hàng và <action_cases> ca cần người phụ trách tiếp nhận. Điểm cải thiện nổi bật là thời gian phản hồi giảm từ <baseline_response_time> xuống <current_response_time>, tương đương nhanh hơn khoảng <speedup> lần.
```

### 3. Key Numbers

Show only understandable report-facing metrics:

| Metric | Meaning |
| --- | --- |
| Hội thoại ghi nhận | Customer conversations recorded during the period |
| Tổng tin nhắn | Total customer + system messages |
| Ca chuyển xử lý | Cases that need human/operator follow-up |
| Thời gian phản hồi | Median or benchmark response time |
| Tạm dừng vận hành | Stability indicator |
| Thông tin khách | Customer-info capture events and approximate distinct customers |

### 4. Impact Highlights

Make improvement numbers visually prominent:

- Cải thiện tốc độ phản hồi: `<speedup> lần`
- Giảm thời gian chờ: `<wait_time_reduction>%`
- Đầu việc thực tế: `<action_cases> ca`

Explain each in one plain sentence.

### 5. Operational Signals

Use this section to show business usefulness without overselling:

- Activity is real and comes from production traffic.
- Customer needs include concrete products, quantities, sizes, locations, or requested quotes.
- Important cases are routed to the responsible person/team.
- Notifications were sent through the expected channel, when available.

### 6. Issues To Resolve

List operational blockers, not internal blame:

- Missing price/product data for repeated codes.
- Customers sending images that require code or product recognition.
- Manual follow-up outcome not yet connected back to the dashboard.
- Reliability issues such as response generation failure or send failure.

### 7. Priority Cases

Include only names or labels if safe. Do not include phone numbers in public pages unless the user explicitly asks and the surface is private.

Format:

```text
Các ca cần ưu tiên: <case_1>, <case_2>, <case_3>
```

### 8. Daily Activity

Use a compact table:

| Ngày | Hội thoại | Tin nhắn | Ca chuyển xử lý | Phản hồi trung vị |
| --- | ---: | ---: | ---: | ---: |
| <date> | <count> | <count> | <count> | <time> |

### 9. Conclusion

Use balanced wording:

```text
<workspace_code> đã chứng minh được năng lực tiếp nhận và phản hồi khách hàng trong môi trường production. Giá trị hiện tại nằm ở tốc độ phản hồi, khả năng ghi nhận thông tin khách và tạo đầu việc cho người phụ trách. Bước tiếp theo nên tập trung hoàn thiện dữ liệu giá/mã hàng, xử lý ảnh khách gửi và nối kết quả sau tiếp nhận để đánh giá đầy đủ tác động đến doanh thu.
```

## Anh Long / Mái Nhà Việt Production Release Phases

Use this section when the report or internal summary needs to explain the actual three production release phases for Anh Long / Mái Nhà Việt / Tổng Kho Gạch Khổ Lớn.

### Phase 1: Mở production ngắn có giám sát

Purpose: test real customer traffic on the actual Tổng Kho Gạch Khổ Lớn page while keeping the release tightly controlled.

Known MNV evidence:

- Date: 2026-08-27.
- Runtime: 2 hours 30 minutes.
- Real customer conversations: 20.
- Phone numbers collected: 3.
- Phone-number leads were sent to Trần Dương's team.
- Monitoring looked stable: no wrong product advice, no wrong business information, and customer-info/support-needed notifications reached the Zalo group.
- After Phase 1, the plan was to temporarily turn off and wait for Anh Long's feedback before moving forward.

How to report it:

```text
Phase 1 kiểm chứng khả năng vận hành trên traffic thật trong thời gian ngắn. Kết quả ghi nhận 20 hội thoại, 3 thông tin khách hàng và không phát hiện lỗi nghiêm trọng về tư vấn sản phẩm hoặc thông tin vận hành.
```

### Phase 2: Mở rộng thời lượng production và đo tín hiệu vận hành

Purpose: extend the real production window after Anh Long approves, then measure whether the workflow creates usable customer signals.

Known MNV evidence:

- Phase 2 opened after the team called Anh Long for permission.
- Initial run: 4 hours live consultation on Tổng Kho Gạch Khổ Lớn.
- Positive signal: phone-number leads and at least one wholesale/bulk-buying lead.
- Full measurement window on 2026-08-28: 13 hours 30 minutes, from 15:00 2026-08-27 to 09:00 2026-08-28.
- Facebook sessions: 88.
- Low-quality/uninterested leads filtered: 50.
- Real interested leads: 38.
- Phone numbers collected: 11, about 12.5% of total sessions.
- Human-support handoffs: 15.
- Order-intent conversations: 2.
- Manual-review conversations: 11.
- High-value customers by length/phone/order-intent criteria: 28.
- Zalo group notifications worked for wholesale/retail context, customer info, and support-needed cases.
- 22 conversations needed additional business training and were used for retraining.

How to report it:

```text
Phase 2 mở rộng thời lượng production và bắt đầu đo chất lượng tín hiệu. Trong 13 giờ 30 phút, hệ thống ghi nhận 88 phiên Facebook, lọc 50 phiên ít giá trị, xác định 38 khách có quan tâm thực, thu 11 số điện thoại, tạo 15 ca cần hỗ trợ và ghi nhận 2 hội thoại có tín hiệu đặt hàng.
```

### Phase 3: Production với vòng vận hành và theo dõi kết quả

Purpose: move from traffic/stability proof to operating-loop proof: customer intake -> notification -> human follow-up -> quote/opportunity/order/lost reason.

Known MNV context:

- As of 2026-08-29, Phase 3 was already running.
- Phase 3 should be tracked as Production with operating/sales loop, not just chat or phone-number collection.
- Main need: deeper training against Anh Long's real operating system and business rules.
- Training areas: internal workflow, product/category logic, scripts and objections, quote/order handoff, wholesale vs retail, area/shipping/deposit/payment policy, escalation rules, and how the team asks for and captures customer information.
- Monitoring must be active by time block: morning, noon, afternoon, evening.
- Intervention/pause rules must cover serious wrong advice, looping replies, notification failure, missed hot cases, or many unknown cases.
- Follow-up must be measured: called, confirmed need, quote sent, opportunity/order, lost reason, and response time after handoff.
- Team adoption matters: simple Zalo formats are important because the operating team already works there.

How to report it:

```text
Phase 3 tập trung đóng vòng vận hành sau khi đã có traffic thật. Trọng tâm không chỉ là phản hồi nhanh, mà là theo dõi các ca đã chuyển xử lý: người phụ trách đã tiếp nhận chưa, đã gọi/chốt nhu cầu chưa, đã báo giá chưa, có cơ hội hoặc đơn hàng không, và lý do mất khách là gì.
```

## Internal-Only Metrics Checklist

Keep this section for the user/internal team unless asked to publish it.

Operational metrics:

- `response_success_rate`
- `actionable_case_rate`
- `customer_info_complete_rate`
- `data_gap_rate`
- `followup_completion_rate`
- `outcome_after_followup`

Quality scoring workflow:

```text
raw conversation -> normalized transcript -> attach workspace catalog/policies/rules -> structured judge -> aggregate dashboard -> human calibration
```

Quality dimensions:

- Need understanding
- Product suggestion quality
- Policy/info accuracy
- Customer-info collection
- Handoff quality
- Outcome or next step

## MNV-3 Current Report Example Data

Use as an example pattern, not as fixed values for other customers:

- Workspace: `E-MNV-3`
- Production period: `01/08 - 31/08/2026`
- Conversations: `230`
- Messages: `2,090`
- Response median: `6s`, P90: `22s`
- Customer-info capture events: `16`
- Approximate distinct customers after rough dedupe: `13`
- Human-action cases: `23`
- Repeated data gaps: `KA20P`, `YSY768B`, `YKT4999F`, `YKA09P`, `YJA23`
- Response benchmark: `42 phút 23 giây` to `27 giây`, about `94 lần` faster and `98.9%` wait-time reduction
