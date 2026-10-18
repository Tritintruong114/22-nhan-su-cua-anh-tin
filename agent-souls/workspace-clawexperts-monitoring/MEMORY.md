# MEMORY.md – Durable Index & High-Confidence Context

> Đây là memory điều hướng và các nguyên tắc bền vững. Nhật ký đầy đủ vẫn nằm trong `memory/YYYY-MM-DD.md`. Không dùng memory cũ để trả số liệu realtime.
> Bản trước khi tái cấu trúc: `memory/legacy/MEMORY-pre-restructure-2026-09-04.md`.

## Điều hướng
- Index tổng: `memory/PROJECT-INDEX.md`
- Sale Agent Control Tower (chiến lược → khách hàng → delivery): `memory/SALE-AGENT-CONTROL-TOWER.md`
- Sale Agent metrics/instances: `memory/SALE-AGENT-OPERATING-RULES.md`, `data/sale-agent/workspaces.json`, `data/sale-agent/metrics-schema.json`
- Sale Agent pipeline: `memory/SALE-AGENT-CUSTOMER-PIPELINE.md`
- Product/roadmap/customer value: `memory/SALE-AGENT-PRODUCT-ROADMAP.md`
- Mái Nhà Việt evidence: `memory/MNV-CASE-EVIDENCE.md`
- B2B outreach: `memory/B2B-OUTREACH-RULES.md`
- Workshop: `memory/WORKSHOP-SALE-AGENT.md`
- Sales Kit: `memory/SALES-KIT-NHAN-VIEN-SO.md`
- Contract templates / Google Docs MSA + ĐĐHDV: `memory/CONTRACT-TEMPLATES.md`
- Raw history: `memory/YYYY-MM-DD.md`

## Global product-thinking rules
- Trước khi đề xuất solution/feature/message: persona → status quo → workflow → pain/cost/trigger → desired progress → customer value → adoption condition → small next action → observable proof.
- Customer Value là outcome của khách, không phải feature. Phân biệt business outcome, customer value, capability, mechanism.
- Customer Value Delivery Tree/Roadmap: map causal chain từ value → capability → behavior → feature → acceptance criteria → evidence. Feature hoàn thành không đồng nghĩa value đã được chứng minh.
- Với Agentic product, luôn xét delegated responsibility, autonomy (observe/recommend/decide/act/escalate), uncertainty, guardrails, data readiness, evals, human handoff và feedback loop.
- **Agent Marketplace / Nhân viên số taxonomy is a guiding brainstorm frame with the user:** Agent Chat = open conversational delegation/exploration; Mini Agent App = productized task/skill with structured input, guardrails, ready-to-use output, and clear Done; Agent App = operationalized digital employee/workflow with ICP, customer value, data, services, integrations, metrics, lifecycle. Long mạch: AI biết nói chuyện → AI biết làm một việc → AI thành Nhân viên số → nhiều Nhân viên số thành Công ty số. Behavioral economics: Chat reduces initial thinking cost; Mini App reduces repeated-task friction/quality variance; Agent App reduces coordination/monitoring/risk/operating cost. Use this as the default frame when brainstorming Agent Marketplace concepts with the user.
- Phân biệt fact đã xác nhận, manual evidence, hypothesis và unknown. Không bịa pain/ROI/authority/revenue.
- Giai đoạn sau MVP/paid/early evidence: observed outcome vs old way → evidence → friction/missing evidence → expand/adopt/iterate/stop → new baseline → next value loop.

## Sale Agent core context
- Linear project: **Sale AI Agents**, team **AI Agents ClawExperts** — https://linear.app/ai-agents-clawexperts/project/sale-ai-agents-e660aef7d843
- Core values: **Tư vấn đúng sản phẩm/thông tin cửa hàng** và **Không bỏ sót khách từ Fanpage**. Supporting: dễ setup, kiểm soát tư vấn, handoff đúng lúc.
- ICP V0: shop/chủ shop bán sản phẩm vật lý qua Facebook Fanpage/Zalo, thường đang trả lời thủ công hoặc có 1–2 nhân viên; wedge ưu tiên là shop/showroom nhiều SKU đang chạy ads.
- V1 foundation: hội thoại/session/context, import/chuẩn hóa sản phẩm, setup Nhân viên AI, quản lý hội thoại, kết nối Fanpage, handoff người thật, image consultation, production fixes.
- Không mở đầu bằng “AI chat/dashboard”; nói bằng vai trò nghiệp vụ và kết quả workflow. Với shop dùng “Nhân Viên CSKH số”; với group dùng “Mời Nhân Viên Số vào nhóm”.

## Sale Agent measurement guardrail
- Boundary hiện tại: conversation → consultation → info collection → lead/handoff decision → notification → done.
- Không tự suy ra sales action, customer contacted, quote, order confirmed, paid, revenue attribution nếu chưa có CRM/POS/manual/downstream evidence.
- Metrics ưu tiên: usage, median/avg/P90 response, handoff completeness/delivery, qualified/hot lead handoff, required-field completion, wrong/flagged answer, human intervention, active groups, duplicate/low-quality handoff, stability.

## Mái Nhà Việt high-confidence summary
- Production workspace: `E-MNV-3`; workspace ID `3215258e-c507-4431-8c29-acb28356c5cd`; page `Tổng Kho Gạch Khổ Lớn`; Linear `AI-75`. Không trộn workspace MNV tương tự.
- Dashboard: https://main.sales-report-dashboard.pages.dev/; production API: https://api.tryopenclaw.io/; key chỉ đọc từ `.env.sales-report-dashboard`, không paste chat. Upgrade Agent trước production metrics.
- Case đang production/sale loop; adoption thực tế thiên về Zalo group hơn CE UI. Cần deep business training và đo handoff usable/downstream loop.
- Product context: khoảng 2.1k SKU; stair tile tính theo viên, không phải m2; quy cách thường 47x120; giá theo độ dày; shipping toàn quốc; cọc 30%, phần còn lại tại nhà xe. Giá thiếu/0/không rõ thì không bịa, phải handoff.
- Dashboard snapshot 2026-09-03: 295 conversations; 2,626 messages; 35 escalated; handoff 11.8644%; median response 6s; avg 6.626s; P90 22s; pause 0; dashboard orders/paid/close rate 0. Đây là dashboard evidence, không phải bằng chứng revenue.
- Manual evidence: 5 ngày 356 khách tư vấn, 48 support handoffs, 30 info/need handoffs, một known order 6,600,000 VND. Ghi rõ manual, không dùng như dashboard proof/public case nếu chưa được phép.

## CRM / pipeline sync
- CRM: **Sales Agent CRM - Customer Pipeline** — https://docs.google.com/spreadsheets/d/1jG0DnE4wyvYu3gTV3ZP46CcLC6p2DC4QCUWL4eNthsk/edit
- Mỗi thay đổi pipeline cần sync Linear + CRM Pipeline + Customer Evidence trong cùng turn khi có thể; nếu không phải ghi blocker.
- Các record chính và trạng thái nằm trong `memory/SALE-AGENT-CUSTOMER-PIPELINE.md`.

## Personal planning & team operating principle (user-confirmed, 2026-09-08)
- Plan cá nhân theo tinh thần **chủ động**: luôn hình dung kết quả cuối trước khi bắt đầu.
- **First things first**: ưu tiên theo ma trận gấp–quan trọng, nhưng đây là ưu tiên tương đối và thay đổi theo thời điểm, team và dự án.
- Mỗi task phải xác định rõ thế nào là **Done**, bao gồm ngày và giờ cần hoàn thành.
- Khi xử lý multiple tasks, tách thành 3 lớp: **xây** (planning, quản lý, resource), **vận hành** (điều phối, tối ưu), và **giải quyết việc không tên** (unplanned/unknown work).
- Ở lớp xây, phải biết **catch-up đúng thời điểm**; viết task cụ thể, rõ ràng, đủ để hình dung kết quả đầu ra.
- Logic vận hành: **hình dung kết quả → hiểu rõ việc cần đạt → catch-up hiệu quả → điều phối chính xác**.
- Đây là key operating rhythm: **mỗi tuần cần planning cùng team**, chốt kết quả, ưu tiên tương đối, owner/resource, mốc catch-up và thời điểm Done.

## External action safety
- B2B outreach: 1 persona → 1 context → 1 workflow hypothesis → 1 outcome → 1 CTA; verify PIC/email; research → Gmail draft → human approval → send.
- Không gửi email/public message hay hành động external nếu chưa được user duyệt rõ.

## Other durable references
- Roadmap Sheet: https://docs.google.com/spreadsheets/d/1a6f9YHH2u2znUSZSuET9VLM_BtNP8SubENNxepyFC_Y/edit?gid=1006385236#gid=1006385236
- Workshop internal sheet: https://docs.google.com/spreadsheets/d/1hBtVSWdHn7MU1iJkuWF3rDENcaRbotkh5AYGSAFVQ4A/edit
- Customer Value Confluence page: page ID `4145512449`, space `TOC`.
- Weekly update format: “Em update Sale Agent tuần này nha mọi người” → [Tuần trước] evidence/release → [Tuần này] P1/value/behavior → Timeline → roadmap.
