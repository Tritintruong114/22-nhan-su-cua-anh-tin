---
name: blog-images
description: >
  Use this skill whenever a blog article needs its illustrations — right after seo_write_blog
  finishes, or when the user asks for "ảnh", "thumbnail", "ảnh đại diện", "thêm ảnh cho bài",
  "tạo ảnh". It runs the ONE tool that draws them (seo_generate_images), waits for the real
  result, and reports honest counts. This skill NEVER writes or edits article prose (that is
  seo_write_blog / seo_apply_fixes), never uploads images by hand (code pushes them to
  WordPress on its own), and never promises images the instance cannot make.
---

# Skill: blog-images

## Goal

Bài viết xong phải **có ảnh, và người dùng phải biết lúc nào ảnh xong** — không để họ ngồi
đoán. Toàn bộ việc vẽ nằm ở đúng một tool: `seo_generate_images(blogId)`.

## Trình tự chuẩn — HAI bước, không gộp

```
1. seo_write_blog(blogId)      → bài hiện NGAY trong editor. Báo user: đã viết xong, N từ.
2. seo_generate_images(blogId) → GỌI NGAY sau bước 1. Tool CHỜ ảnh vẽ xong (~30s) rồi mới trả.
                                 Báo user con số THẬT: "đã có 4 ảnh (1 đại diện + 3 trong bài)".
```

Vì sao tách hai bước chứ không vẽ ngầm trong lúc viết: bài dài hơn ảnh, gộp lại thì người dùng
phải chờ cả cụm mới thấy gì. Tách ra thì bài hiện trước, còn thẻ tool thứ hai chính là thứ cho
họ thấy ảnh đang chạy và lúc nào xong.

## Bài ĐÃ CÓ SẴN muốn thêm ảnh — vẫn đúng một tool đó

Bài viết từ lâu, bài sync từ WordPress về, hay bài viết trước khi có tính năng ảnh: **không cần
viết lại bài, không cần bước chuẩn bị nào.** Cứ gọi thẳng:

```
seo_generate_images(blogId)
```

Tool tự đọc tiêu đề + các mục (heading) đang có trong bài để nghĩ ra ảnh nào đặt ở đâu, rồi vẽ.
Nó **không sửa một chữ nào** trong bài — chỉ chèn thêm ảnh vào giữa các mục.

Bài đã có sẵn ảnh đại diện + ≥2 ảnh trong bài thì tool trả về mà không vẽ thêm (tránh vẽ chồng,
tránh tốn tiền) — lúc đó cứ báo bài đã đủ ảnh.

## Đọc kết quả trả về

| Trả về | Nói gì với người dùng |
|---|---|
| `ready: N`, `pending: 0` | "Đã tạo xong N ảnh." — kèm ảnh đại diện nếu có |
| `pending: > 0` | "N ảnh đã xong, còn M ảnh đang vẽ — sẽ tự hiện trong trình soạn thảo." **KHÔNG gọi lại tool để hỏi tiến độ.** |
| `failed: > 0` | Nói thẳng số ảnh lỗi + mời thử lại (gọi lại tool là nó tự vẽ lại đúng phần lỗi) |
| `pending_upload: > 0` | "Ảnh đang lưu tạm, sẽ tự đẩy lên WordPress khi bạn kết nối." |
| `available: false` | Đọc NGUYÊN VĂN `message` — nó chỉ thẳng chỗ bấm: **Cài đặt → AI Models**, cắm key **OpenAI** hoặc **Google**. **Đừng bảo họ "đổi model"** (model chat nào cũng không vẽ được ảnh) và **đừng để họ tưởng ChatGPT Plus là đủ** — gói Plus đăng nhập kiểu khác, không gọi được API ảnh. Các nhà còn lại (Anthropic, Groq, Cerebras, Fireworks, Together…) chỉ viết chữ. |

## Hard rules

- **Không bao giờ hứa suông.** Chỉ nói "đã có ảnh" khi `ready` thật sự tăng. Không nói "ảnh sẽ
  có sau ít phút" khi `available:false` — nó sẽ không bao giờ có cho tới khi user cắm key.
- **Không gọi tool lặp để poll.** Tool đã chờ sẵn; `pending` còn lại là chạy nền, editor tự cập nhật.
- **Không tự chèn `<img>` vào bài.** Code chèn ảnh vào đúng chỗ (ngay sau heading đã chọn) và
  quản lý luôn việc đẩy lên WordPress. Agent chèn tay sẽ tạo ảnh mồ côi không ai dọn.
- **Không chạy hàng loạt.** Mỗi lần đúng MỘT bài, và chỉ khi user vừa viết bài đó hoặc vừa yêu
  cầu. Không tự quét cả site để "thêm ảnh cho mọi bài" — tiền thật, phải do user quyết.
- **Bài chưa có nội dung thì không gọi.** Viết bài trước đã; tool sẽ báo lỗi.

## Ảnh được vẽ như thế nào (để trả lời khi user hỏi)

- Mỗi bài: **1 ảnh đại diện** (thumbnail, tỉ lệ 16:9 — cái hiện khi chia sẻ lên Google/Facebook)
  + **tối đa 3 ảnh trong bài** (4:3), đặt ngay sau các mục phù hợp.
- Nội dung ảnh do chính lượt viết bài nghĩ ra (mô tả cảnh + alt), nên ảnh bám sát chủ đề bài.
- Ảnh **không có chữ** trong hình — model vẽ chữ hay sai chính tả, và chữ sai trên ảnh thì không
  sửa được. Muốn diễn đạt bằng chữ thì đó là việc của bài viết.
- Ảnh được nén còn ~100 KB trước khi lưu → trang WordPress không bị nặng.
- Site đã nối WordPress: ảnh lên thư viện WP ngay. Chưa nối: giữ tạm, tự đẩy lên khi kết nối.
