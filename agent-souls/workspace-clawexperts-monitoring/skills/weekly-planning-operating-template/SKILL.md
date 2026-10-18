---
name: "weekly-planning-operating-template"
description: "Template lập weekly planning theo milestone impact."
---

# Weekly Planning Operating Template

## Khi dùng
Dùng khi user muốn lập weekly planning, thường vào Chủ nhật hoặc sáng Thứ 2, hoặc khi user nói: `planning tuần sau`, `lên plan tuần`, `weekly plan`, `chuẩn bị planning`, `cập nhật plan tuần`, `check priority tuần này`.

## Nguyên tắc ngôn ngữ
- Viết bằng tiếng Việt mặc định.
- Dùng ngôn ngữ product/team-facing: outcome, customer/business impact, owner, dependency, release gate, adoption, pipeline, setup/support path.
- Không đưa framework brainstorm nội bộ như `7 Habits`, `First Things First`, `Quadrant` vào Linear/team-facing plan.
- Chỉ giữ tiếng Anh khi là tên feature/product hoặc thuật ngữ team đang dùng quen, ví dụ: `Multiple Page`, `Page business`, `Zalo Mini Agent App V0`, `onboarding`, `release gate`.

## Workflow mỗi lần planning
1. Đọc memory/context liên quan trước:
   - `MEMORY.md`
   - `memory/PROJECT-INDEX.md`
   - daily note hôm nay và các ngày gần nhất
   - `memory/SALE-AGENT-CONTROL-TOWER.md`
   - `memory/SALE-AGENT-CUSTOMER-PIPELINE.md`
   - file topical liên quan như roadmap, operating rules, product doc nếu task đụng tới.
2. Nếu có issue Linear tuần trước, đọc lại để xác định carry-over, Done, blocker, stale item.
3. Chuyển input của user thành outcome tuần, không bắt đầu bằng danh sách feature.
4. Gom việc thành 3 nhóm:
   - Customer/business unblock
   - Pipeline/customer care
   - Product repeatability/adoption engine
5. Với mỗi nhóm, xác định:
   - Vì sao làm tuần này
   - Kết quả sản phẩm
   - Kết quả phối hợp team
   - Done khi
   - Owner/resource đề xuất
   - Dependency/blocker
   - Business/team impact
6. Tạo milestone theo business impact, không chỉ theo output.
7. Thêm bad-scenario checks để phản biện plan trước khi commit.
8. Nếu user yêu cầu, tạo hoặc update Linear issue bằng bản tiếng Việt product/team-facing.
9. Ghi lại memory: link Linear, quyết định, weekly outcomes, milestone, và user guidance mới.

## Format chuẩn

```markdown
## Kế hoạch tuần — [dd.mm-dd.mm.yyyy]

### Mục tiêu chính
Tuần này ưu tiên [kết quả business/customer lớn nhất], đồng thời [kết quả product/team quan trọng cần bảo vệ].

### Kết quả cuối tuần
- **[Outcome 1]:** [mô tả kết quả quan sát được]
- **[Outcome 2]:** [mô tả kết quả quan sát được]
- **[Outcome 3]:** [mô tả kết quả quan sát được]
- **[Outcome 4]:** [mô tả kết quả quan sát được]

### Ưu tiên theo sản phẩm và phối hợp team
1. **[Priority 1]**
   - Vì sao làm trước: [customer/business reason]
   - Kết quả sản phẩm: [product behavior/outcome]
   - Kết quả phối hợp: [team alignment/owner/commitment]

2. **[Priority 2]**
   - Vì sao làm tuần này: [reason]
   - Kết quả sản phẩm: [outcome]
   - Kết quả phối hợp: [team outcome]

3. **[Priority 3]**
   - Vì sao làm tuần này: [reason]
   - Kết quả sản phẩm: [outcome]
   - Kết quả phối hợp: [team outcome]

### Milestone gắn với impact business
| Milestone | Thời điểm | Done khi | Impact cho business/team |
|---|---:|---|---|
| M1 — [Tên milestone] | [Thứ/ngày giờ] | [điều kiện kiểm chứng] | [business/team impact] |
| M2 — [Tên milestone] | [Thứ/ngày giờ] | [điều kiện kiểm chứng] | [business/team impact] |
| M3 — [Tên milestone] | [Thứ/ngày giờ] | [điều kiện kiểm chứng] | [business/team impact] |

### Task chính
| Kết quả | Owner/resource đề xuất | Done khi | Deadline |
|---|---|---|---|
| [Outcome/task] | [owner/resource] | [done criteria] | [yyyy-mm-dd + giờ] |

### Mốc phối hợp
- **[Thời điểm]:** [kiểm tra gì, quyết định gì]
- **[Thời điểm]:** [kiểm tra gì, quyết định gì]

### Bad scenario cần kiểm soát
- **[Risk 1]:** [bad scenario] → [cách kiểm soát/decision gate]
- **[Risk 2]:** [bad scenario] → [cách kiểm soát/decision gate]
- **[Risk 3]:** [bad scenario] → [cách kiểm soát/decision gate]

### Điều kiện kết thúc tuần
Tuần được xem là Done khi [các bằng chứng customer/business/product/team chính đã có].
```

## Checklist chất lượng trước khi gửi/ghi Linear
- Có mục tiêu chính đủ sắc chưa?
- Có kết quả cuối tuần quan sát được chưa?
- Mỗi priority có `vì sao`, `kết quả sản phẩm`, `kết quả phối hợp` chưa?
- Milestone có impact business/team, không chỉ output chưa?
- Mỗi task có owner/resource, Done, deadline chưa?
- Có bad scenario và cách kiểm soát chưa?
- Ngôn ngữ đã là tiếng Việt product/team-facing chưa?
- Có ghi lại memory sau khi chốt/tạo Linear chưa?
