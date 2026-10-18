---
name: setup-zalo-assist-agent
description: Cài đặt lần đầu agent thư ký Zalo `thu` trên một instance OpenClaw mới — hỏi Bot Token Telegram, khoá danh sách trắng về đúng một người, cảnh báo rủi ro tài khoản Zalo chính, khảo sát ngưỡng follow-up, và nghiệm thu bốn cổng red-line (không mạo danh chủ, không nhận trực hộ, không bịa kho, không có kênh Zalo trong config). Chạy khi chủ nói "setup zalo assist", "cài thư ký Zalo", "cài agent thu", "deploy ws-zalo-assist-agent", "$setup-zalo-assist-agent", hoặc khi bot Telegram đã cài mà chưa có token nên im hoàn toàn.
---

# Cài đặt thư ký Zalo `thu`

`references/manifest.yaml` là **nguồn sự thật máy-đọc**. Đọc nó trước, rồi lặp qua
`required_env` · `channels_to_pair` · `khao_sat` · `verification`. ⛔ Đừng dùng danh sách trong trí
nhớ — manifest đổi thì hành vi phải đổi theo.

## Luật cứng

1. **Idempotent.** Trước mỗi câu hỏi, ĐỌC giá trị hiện tại. Đã là giá trị thật (không rỗng, không
   còn dấu setup) thì **báo "đã có, bỏ qua"**, ⛔ không hỏi lại. Chạy lại skill trên instance đã cài
   phải là việc AN TOÀN — nếu không thì ⛔ không ai dám chạy lại.
2. 🔴 **KHÔNG cài tiếp khi chưa có Telegram user id của chủ.** Ws này ⛔ KHÔNG có "để trống là mặc
   định an toàn" — để trống ở đây là **mặc định NGUY HIỂM**. Bot Telegram mặc định ai cũng nhắn
   được, mà agent thì đọc lại toàn bộ hội thoại Zalo cá nhân của chủ. Chưa có id thì **DỪNG**.
3. 🔴 **Nói rủi ro acc chính TRƯỚC khi hỏi bất cứ thứ gì.** Automation trên Zalo cá nhân ⛔ không
   chính thống, tài khoản CÓ THỂ BỊ KHOÁ. Chủ phải biết trước khi quyết định cài, ⛔ không phải sau
   khi acc bị khoá. Chủ ⛔ không chấp nhận thì DỪNG — đó là một kết cục **hợp lệ**, ⛔ đừng trấn an
   để cài cho xong.
4. ⛔ **KHÔNG khai biến ngoài `required_env`.** `apply-overrides` ⛔ không bao giờ đè giá trị đã có
   trong `runtime.env` ⇒ một biến khai sớm bị **khoá cứng** ở giá trị cài lần đầu, trên mọi máy đã
   cài. Chủ hỏi về mục ở `chua_thu_o_nac_nay` thì trả lời thẳng: chưa tới nấc, sẽ mở khi nào.
5. ⚠ **Ghi xong khối `env` phải KHỞI ĐỘNG LẠI CỨNG.** Khối `env` chỉ vào `process.env` lúc khởi
   động; SIGUSR1 / reload mềm ⛔ KHÔNG bơm lại. `openclaw gateway restart` VÔ HIỆU trong docker —
   phải `docker restart <container>` (local) hoặc để BE restart (cloud), rồi đợi ~120s. Triệu chứng
   khi quên: bot im hoàn toàn, ⛔ không một dòng lỗi — trông y hệt token sai.
6. ⛔ **Không đọc, không in, không nhắc lại giá trị token** sau khi nhận. Xác nhận bằng độ dài hoặc
   4 ký tự cuối, ⛔ không bằng nguyên chuỗi.
7. **Bí đâu nói đó.** Bước nào ⛔ không làm được thì nói rõ bước nào và vì sao, ⛔ không báo "đã cài
   xong" khi còn bước treo.

## Nấc hiện tại — nói trước cho chủ khỏi kỳ vọng sai

Bundle này đã qua **C1 + C2**: có bộ não, có Bộ thu, **đọc được kho**, trả lời được *"khách nào
đang chờ anh"*, và có sổ đánh dấu.

**CÓ**: đăng nhập Zalo (`/zalo-login`) · Bộ thu tự hồi sinh · Độ tươi · danh sách follow-up
(`/viec`) · soát từng người bằng nút · thôi-theo-dõi / đánh-dấu-xong + đường lùi (`/dabo`) ·
chỉnh nhịp bằng chat.

**CHƯA CÓ** — nói thẳng ra, ⛔ đừng để chủ tự phát hiện:
tra cứu nội dung cũ · báo cáo theo kỳ · đọc ảnh · thẻ phân loại · gửi tin.
Hỏi vào mấy thứ đó thì Thư **nói thẳng là chưa có**. **Đó là hành vi đúng**, ⛔ không phải lỗi.

⚠ Ngay sau khi cài, kho **RỖNG** cho tới khi chủ quét QR. Và kể cả quét xong, Zalo chỉ backfill
được cửa sổ gần đây ⇒ tuần đầu câu *"tuần này anh support ai"* sẽ thiếu. Nói trước.

⛔ Đừng hứa ngày cho phần chưa có.

## Thứ tự chạy

1. **Chào + nói phạm vi** (mục trên) + **cảnh báo rủi ro acc chính** (luật cứng 3). Nói luôn
   red-line: Thư ⛔ KHÔNG BAO GIỜ tự nhắn cho ai trên Zalo, và đó ⛔ không phải một công tắc bị tắt
   — nó **bất khả thi về cơ chế** vì Zalo ⛔ không được khai thành channel.
2. **Thu `required_env`** theo đúng thứ tự manifest. Mỗi biến: đọc `purpose` cho chủ hiểu để làm gì,
   đưa `how_to_get` khi chủ hỏi cách lấy. ⛔ Dừng ở luật cứng 2 nếu thiếu owner id.
3. **Khảo sát `khao_sat`** — hỏi đúng câu trong manifest, ⛔ đừng suy đoán hộ. Ba câu: chấp nhận
   rủi ro acc chính · ngưỡng follow-up · khung giờ làm việc.
   🔴 **Hai câu sau GIỜ ÁP ĐƯỢC NGAY** — ⛔ đừng chỉ chép lại như bản cũ dặn. Sau khi gateway sống
   lại (bước 4), bảo chủ nói thẳng với Thư, ví dụ *"anh làm 7h tới 21h, nghỉ Chủ nhật, khách im 6
   tiếng làm việc là nhắc anh"*. Thư gọi `set_follow_up_limits` và **nhắc lại giá trị cũ** để chủ
   soát. ⚠ Chủ trả lời khảo sát mà nhịp ⛔ không đổi theo là lời hứa suông — đúng ca hỏng câm.
4. **Khởi động lại CỨNG**, chờ gateway sống lại (~120s). ⛔ Đừng nghiệm thu ngay sau lệnh restart.
5. **Nghiệm thu `verification`** — chạy ĐỦ sáu mục, theo thứ tự trong manifest.
   ⚠ Mục `khong-co-kenh-zalo` nghiệm thu bằng **lệnh**, ⛔ KHÔNG bằng cách hỏi agent:
   `bash install/config.sh check-redline`. Agent trả lời theo prompt, mà prompt thì đúng dù config
   có sai — chỉ merged `openclaw.json` mới nói thật.
6. **Chốt buổi cài**: liệt kê cái đã xong · cái còn treo · **nguyên văn** câu trả lời khảo sát ·
   và **nhịp đang chạy** (bảo Thư đọc `get_follow_up_limits`, hoặc chủ tự hỏi *"em tính theo ngưỡng
   nào"*).

## Chủ chỉnh nhịp bằng chat thế nào — chỉ đường một lần, ⛔ đừng bắt chủ đoán

Năm thứ chỉnh được, **⛔ không phải sửa tệp, ⛔ không phải env var** — nói bằng lời là xong:

| Chủ nói | Đổi cái gì | Mặc định |
|---|---|---|
| *"tính từ 6 tiếng thôi"* | ngưỡng khách chờ | 8 giờ làm việc |
| *"deal im 5 ngày thì nhắc anh"* | ngưỡng deal nguội | 3 ngày thường |
| *"anh làm 7h tới 21h"* | khung giờ làm việc | 8h–18h |
| *"anh nghỉ Chủ nhật"* | ngày nào tính là ngày làm việc | cả tuần |
| *"im 30 phút mới báo kho nguội"* | ngưỡng Độ tươi | 15 phút |

- Xem lại: *"em tính theo ngưỡng nào"*.
- Ăn **ngay từ câu hỏi kế tiếp** — tham số được đọc lại trước mỗi lần dựng danh sách.
- Lưu ở `uc-data/<ws>/tham-so-follow-up.json` ⇒ **sống sót cài lại**.
- Giá trị vô lý (vd khung giờ lộn ngược) bị **từ chối kèm lý do**, ⛔ không ghi nửa vời.

🔴 **⛔ ĐỪNG khai mấy giá trị này thành env var** (D-20): `apply-overrides` ⛔ KHÔNG đè giá trị đã
có trong `runtime.env`, nên biến khai sớm bị khoá cứng ở lần cài đầu — chủ đổi bằng chat sẽ
**⛔ không ăn mà cũng ⛔ không báo lỗi**.

## Gotchas

- **Bot im hoàn toàn sau khi cài** — soi theo thứ tự: (a) đã restart CỨNG chưa (luật cứng 5);
  (b) `botToken` trong merged config còn là dấu setup không (`install/config.sh diagnostic` nói
  ngay, ⛔ không in token); (c) `allowFrom` có đúng id chủ không — sai id thì bot im với CHÍNH CHỦ,
  nhìn từ ngoài y hệt token sai.
- **Bot trả lời được nhưng nghe lạ, ⛔ không giống Thư** — nhiều khả năng tin rơi về agent `main`
  của host chứ ⛔ không tới `thu`. Kiểm `bindings[]` trong merged config có dòng
  `{agentId: thu, match: {channel: telegram}}` không. Triệu chứng đánh lừa: câu trả lời vẫn trôi
  chảy, chỉ sai nhân cách và ⛔ không có luật nào của ws.
- **Agent hứa "để em kiểm tra rồi báo anh sau"** — TRƯỢT mục `khong-bia-kho`. Thư ⛔ không có gì để
  kiểm tra ở nấc này, và ⛔ không có nhịp chủ động nào để báo lại. Đây là ca hỏng câm: chủ ngồi chờ
  một tin ⛔ không bao giờ tới.
- **Người khác nhắn bot mà vẫn nhận được trả lời** — `allowFrom` đang sai hoặc `dmPolicy` ⛔ không
  phải `allowlist`. 🔴 DỪNG MỌI THỨ và vá ngay: toàn bộ hội thoại Zalo của chủ đang phơi ra.
- **Thấy `channels.openzalo` trong merged config** — ⛔ KHÔNG phải do bundle này. Hoặc ai đó khai
  tay, hoặc có ws khác trên cùng gateway khai. Gỡ khối đó rồi restart cứng; ws khác khai thì hai ws
  ⛔ KHÔNG ở chung instance được.
