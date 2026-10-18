---
name: guide-shop-onboarding
description: Walk a shop owner through getting their AI sales staff live, inside the Agent Dashboard chat — after the bundle is already installed. Use when the owner is new or has not yet put the staff to work, or says (Vietnamese/English) "bắt đầu", "hướng dẫn", "cài đặt shop", "tôi mới vào", "làm sao để bán", "thêm sản phẩm", "nối kênh", "kết nối Facebook/Zalo", "tạo nhân viên AI", "đưa vào hoạt động", "go live", "get started", "set up my shop". This is the post-install in-app onboarding, NOT the infra deploy/env setup (that is setup-sales-agent-multi-channel).
---

Dẫn chủ shop từ shop trống → **Nhân viên AI bán được hàng**, ngay trong cửa sổ chat của Bảng điều khiển. Mỗi lần chỉ một bước, khích lệ + trấn an theo `SOUL.md`. Dùng **chữ hiển thị** (Nhân viên AI, thêm sản phẩm, nối kênh, Chat thử, Đưa vào hoạt động) — KHÔNG để lọt thuật ngữ kỹ thuật (agent, persona, go-live, channel, OAuth).

## Trước tiên: đọc mức-độ-sẵn-sàng, đừng hỏi lại cái đã có

Nhìn trạng thái shop rồi nhảy vào **bước chưa xong đầu tiên**:

1. Có **tên shop** chưa? (Hồ sơ shop — `agent-staff/knowledge/shop-info.md`)
2. Có **≥1 sản phẩm** chưa? (`agent-staff/knowledge/catalog.json`)
3. **Hồ sơ shop** đủ chưa? (địa chỉ · khu vực giao · giờ mở cửa · SĐT liên hệ · cách nhận tiền)
4. Đã **nối ≥1 kênh** chưa? (Facebook / Zalo / Web)
5. Đã có **Nhân viên AI** (4 file) chưa?
6. Đã **Đưa vào hoạt động** chưa?

Việc nào xong rồi → ghi nhận ngắn ("Shop mình đã có 5 sản phẩm rồi nha") và bỏ qua. Đừng bắt chủ làm lại.

## Các bước dẫn

### B1 — Tên shop + Hồ sơ shop
Hỏi tên shop trước (1 câu). Sau đó gom dần Hồ sơ shop: địa chỉ, khu vực giao, giờ mở cửa, SĐT liên hệ, cách nhận tiền (COD / chuyển khoản). Gộp được nhiều ý trong 1 câu thì gộp, nhưng đừng spam danh sách dài. Ghi vào Hồ sơ shop. Mốc giờ tính theo **giờ Việt Nam** (cố định, #102).

### B2 — Thêm sản phẩm (prereq go-live)
Cần **≥1 sản phẩm** mới chạy được. Dẫn chủ thêm: tên · giá · mô tả ngắn · `tồn` (còn/hết). Không có sản phẩm → Nhân viên AI không có gì để tư vấn. KHÔNG bịa sản phẩm hộ chủ.

### B3 — Nối kênh
Dẫn chủ nối **≥1 kênh** để khách nhắn tới: **Facebook** (đăng nhập cho phép trang) hoặc **Zalo** (quét mã trên điện thoại). Bước nối kênh có flow riêng trong từng tab Bảng điều khiển (#36) — chỉ rõ chủ bấm vào đâu, KHÔNG tự thực hiện việc nối hộ. Web có thể bật ngay không cần đăng nhập.

### B4 — Tạo Nhân viên AI
Khi đã có **tên shop + ≥1 sản phẩm**: tạo Nhân viên AI bằng tool **`generate_persona`**. Tool TỰ đọc Hồ sơ shop + sản phẩm bên trong (kiểm điều kiện) — **bạn KHÔNG cần đọc file**; nếu prompt đã kèm tóm tắt shop thì rút flavor (giọng/khách/tên) từ đó rồi gọi tool luôn, đừng đọc lại. Đây là bản chạy-được-ngay; chủ chỉnh tay sau qua màn **Nhân viên AI** nếu muốn.
- Prereq chưa đủ (thiếu tên shop hoặc chưa có sản phẩm) → quay lại B1/B2, đừng gọi tool.
- Chủ đã có Nhân viên AI rồi → **KHÔNG tự sinh lại** (đè mất chỉnh tay). Sinh lại chỉ khi chủ chủ động yêu cầu.

### B5 — Chat thử (bước review)
Trước khi Đưa vào hoạt động, mời chủ **Chat thử**: chủ đóng vai khách nhắn vài câu, xem Nhân viên AI trả lời. Nếu có câu Chat-thử gợi sẵn (từ kỹ năng đào tạo) → đưa ra cho chủ bấm 1 chạm. Đây là cách chủ "review" trước khi bật thật.

### B6 — Đưa vào hoạt động
Đủ {tên shop + ≥1 sản phẩm + ≥1 kênh + đã có Nhân viên AI} → mời chủ **Đưa vào hoạt động**. Sau khi bật: trấn an ("Nhân viên AI bắt đầu trả lời khách rồi. Bạn vào **Rà soát cửa hàng** bất cứ lúc nào để kiểm tra hoặc đào tạo thêm nha") và bàn giao sang kỹ năng đào tạo (`$trainer-shop-coaching`) khi chủ muốn cải thiện.

## Ranh giới
- Đây là onboarding **trong app sau khi đã cài**. Việc cài đặt hạ tầng (env, deploy, openclaw.json) là kỹ năng **riêng** `setup-sales-agent-multi-channel` — KHÔNG làm lại ở đây.
- KHÔNG bao giờ thay khách trả lời, KHÔNG tự sửa file Nhân viên AI ngoài luồng chủ duyệt.
- Thiếu một bước thì dẫn đúng bước đó, không nhảy cóc tới Đưa-vào-hoạt-động khi prereq chưa đủ.
