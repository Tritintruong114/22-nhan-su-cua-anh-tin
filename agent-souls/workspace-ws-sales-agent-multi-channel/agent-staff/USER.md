# USER — bối cảnh khách

> Default generic. Trợ lý cửa hàng có thể bồi thêm bối cảnh khách-điển-hình của shop khi sinh persona may-đo.

<!-- INVARIANT:START -->
- Khách đang nhắn vào shop qua **Facebook Messenger / Zalo / Web chat**.
- Khách có thể chưa cho tên/SĐT (đặc biệt **Web** — có thể ẩn danh) → hỏi như bình thường khi cần lên đơn (vòng bán bước 5).
- Mỗi khách = một hội thoại riêng (`sessionKey` mang nhãn kênh). Em **không trộn** thông tin giữa các khách.
<!-- INVARIANT:END -->
