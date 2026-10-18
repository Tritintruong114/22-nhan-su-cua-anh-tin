# Weekly Use Case Synthesis — 2026-W27

## Top 3 patterns
- **Responsibility Queue > assistant UI:** agent app phải biến dữ liệu thô thành ít quyết định còn lại: “80 email đã xử lý · 9 việc cần anh xử lý hôm nay.”
- **Source of truth trước prototype:** Agent Domain Spec → screen brief/mockup → prototype. Prototype chỉ là bài test hành vi/reachability, không phải nơi tự phát minh product.
- **Trust = proof of work + audit:** user cần thấy agent đã làm gì, vì sao nổi item này, phần còn lại được bỏ qua an toàn ra sao, và khi nào human phải duyệt.

## Best use-case direction
Tiếp tục mạnh nhất: **Email Revenue / Responsibility Follow-through Agent** cho solopreneur/freelancer/consultant dùng email để chốt deal, giữ cam kết, chuẩn bị meeting, và chăm khách quan trọng. Positioning nên là “agent bảo vệ tiền + uy tín trong inbox”, không phải inbox summary.

## Non-tech usability lesson
Non-tech user không cần nghe “classification/model”. Họ cần:
- onboarding ngắn: intent/risk → Gmail consent → scan → Identity/Risk Profile Draft → confirm;
- queue nhỏ, có bucket rõ và CTA rõ;
- bằng chứng mức B mặc định, deep evidence khi click;
- giải thích kiểu “Tại sao em viết thế này?” để cảm giác agent cùng làm việc, không phải black box.

## OpenClaw leverage
OpenClaw hợp để bán/thiết kế “agent workforce OS”: memory, cron/background jobs, HITL approval, audit log, repo/spec inspection, browser preview, và Codex/Claude-terminal workflow để biến product lessons thành spec/mockup/prototype có kiểm chứng.

## Mistakes to avoid
- Nhảy vào prototype khi mockup/state/CTA chưa đủ.
- Sửa sai layer: renderer, data, screen brief, prototype phải tách rõ.
- Claim “đã xử lý X email” mà không có coverage/audit.
- Gọi learning là fine-tuning mơ hồ; dùng Operating Memory/rules/playbook/correction history.
- Tạo dashboard chỉ có số liệu; dashboard phải là proof-of-work + insight, còn Activity Log là audit sâu.

## Next 3 experiments
1. **State Reachability Report:** từ `screens-brief.md`/`mockups.data.js`, gắn nhãn từng state/CTA: reachable / demo-only / missing.
2. **Agent Core Loop Spec:** hoàn thiện data shapes + state machine + pseudocode cho Detect → Understand → Prioritize → Dispatch → Human Decision → Track → Learn.
3. **Trust Surface Test:** test 3 bề mặt với buyer non-tech: Identity/Risk Profile Draft, S4 proof-of-work dashboard, S6 activity/audit log.
