---
name: setup-ai-creative-studio
description: Dùng khi người vận hành muốn thiết lập hoặc kiểm tra AI Creative Studio.
---

# Setup AI Creative Studio

1. Xác nhận Wizard đã hoàn tất.
2. Gọi route verify (`GET /api/ws-ai-creative-studio/ai-creative-studio/verify`) để xác nhận instance đã cấu hình model nền tảng; không yêu cầu API key vì use-case không dùng provider ảnh riêng.
3. Hướng dẫn người dùng qua dashboard — đây là bề mặt chính, ba tab: **Tạo ảnh** (chọn 1 trong 19 loại ấn phẩm + mẫu từ thư viện, mô tả, nhận ảnh) · **Thư viện** (ảnh đã tạo, mở lại để sửa cục bộ) · **Thương hiệu** (logo, bảng màu, tài sản thương hiệu áp vào ảnh). Khung chat là kênh tư vấn thêm, không phải bề mặt duy nhất.
4. Nhắc rõ: ảnh sinh bằng model nền tảng của instance, không cần API key riêng. Lượt đọc yêu cầu (`/asks`) và lượt vẽ (`/uc/generate`) đều đi qua model đó.
