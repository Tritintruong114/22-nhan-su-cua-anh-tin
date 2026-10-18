# MEMORY.md — YouTube Agent

## Sứ mệnh & mục tiêu
- Người dùng muốn agent này đồng hành để phát triển YouTube, với mục tiêu đầu tiên: **đạt 10.000 subscribers**.
- Chủ đề/niche đang ưu tiên: **tự học Product trong kỷ nguyên AI** (Product Management, Product Thinking, kỹ năng thực chiến và ứng dụng AI cho người làm Product).
- Chiến lược lõi: dùng **Outlier Theory** — xác định video có hiệu suất vượt trội trong các kênh/ngách liên quan, rút insight về nhu cầu/chủ đề/cách đóng gói/retention và tạo phiên bản nguyên bản, tốt hơn; không sao chép.

## Framework giao tiếp/scripting của Vinh Giang — 2026-10-10
- Người dùng muốn agent chủ động dùng 2 framework của **Vinh Giang** để cấu trúc public speaking, presentation và video; chọn framework phù hợp với mục tiêu giao tiếp, không ép dùng máy móc.
- **3-2-1 Method**: khi một chủ đề rộng/mơ hồ, đóng gói thành một trong ba cấu trúc để nói rõ, ngắn và tránh lan man:
  - **3 Steps**: cho quy trình, tutorial, transformation hoặc action plan. Mẫu: “Có 3 bước…”, gọi tên từng bước bằng nhãn song song, rồi chốt thứ tự/thông điệp.
  - **2 Types**: cho so sánh, diagnosis, segmentation, giúp người xem nhận diện mình. Mẫu: “Có 2 kiểu…”, mô tả contrast rõ và đặt câu hỏi tự phản chiếu.
  - **1 Thing**: cho một principle/insight/cảnh báo/takeaway mạnh. Mẫu: “Nếu chỉ nhớ 1 điều…”, giải thích vì sao, đưa ví dụ/hệ quả, rồi lặp lại câu chốt.
  - Quy tắc chọn: “Làm thế nào?” → 3 Steps; “Tôi thuộc kiểu nào/chọn gì?” → 2 Types; “Cần nhớ gì?” → 1 Thing. Với video ngắn, nêu cấu trúc từ đầu, mỗi point một hơi, nhãn cụ thể và kết bằng punchline.
- **PARA Method (Vinh Giang, không phải PARA PKM của Tiago Forte)**: framework để nêu quan điểm có chiều sâu mà không overshare/độc thoại. Gồm:
  - **P — Point**: nêu một statement/niềm tin/ý chính.
  - **A — Action**: nói hành động đã làm hoặc đang làm dựa trên point đó.
  - **R — Result**: cho biết kết quả, bằng chứng, hoặc insight nhận được.
  - **A — Ask**: hỏi lại người nghe để tạo đối thoại, không chiếm hết phần nói.
  - Dùng tốt cho conversation, presentation, video thought-leadership và post có CTA. Nguồn tham chiếu: video Vinh Giang “EASY Conversation Technique To Stop Oversharing (PARA Method)” (https://www.youtube.com/watch?v=dXCAyqM2zWY); ví dụ của ông: Point “rest quan trọng với high performance” → Action “nghỉ trọn cuối tuần” → Result “chất lượng công việc/cuộc sống tốt hơn” → Ask “mọi người nghỉ ngơi thế nào?”.
- Ứng dụng đã chốt cho video **Văn Phòng AI / AI Office**: PARA là xương sống: Point = tương lai không chỉ là chatbot mạnh hơn mà là AI office/nhân viên số có role, workflow; Action = team chuẩn hoá/productionize concept trong OpenClaw, show role-based AI + workflow; Result = người dùng biết AI nào làm gì, task ở đâu, cái gì cần duyệt và workflow nào scale được; Ask = “AI employee đầu tiên bạn tạo là ai?”. Có thể đặt **3 Steps demo** trong phần Action/Result: tạo AI employee → giao workflow → human review & scale.

## Học giao tiếp & nói chuyện — 2026-10-11
- Người dùng đang đầu tư khóa học **Speak Inn** để học giao tiếp và nói chuyện.
- Đây là một mảng ưu tiên cần theo dõi và hỗ trợ áp dụng thực tế, đặc biệt khi làm video, public speaking và presentation.
- Kết hợp nội dung/điểm học được từ Speak Inn với các framework Vinh Giang đã lưu (3-2-1 và PARA), nhưng không gán nhầm nguồn hay ép framework máy móc.

## Cách làm việc đã thống nhất
- Agent hỗ trợ: nghiên cứu ngách & đối thủ, lập danh sách ý tưởng ưu tiên, phân tích outlier, xây content plan, tối ưu title/thumbnail/hook/outline/script, và đánh giá kết quả để cải tiến vòng sau.
- Thành công ưu tiên theo cách bền vững và đúng chính sách YouTube: nội dung có giá trị, nguyên bản, không thao túng hay dùng thủ thuật rủi ro.
- Người dùng đã giao vai trò mở rộng: **Marketing Agent** cho YouTube + Facebook fanpage, không chỉ tư vấn mà còn có thể thực thi qua connectors khi được yêu cầu.
- Ưu tiên dùng **TryOpenClaw Connectors** cho các tác vụ trên dịch vụ bên ngoài (đặc biệt Google Docs/Drive) thay vì chỉ tạo file local hoặc hướng dẫn người dùng thao tác. Trước khi kết luận connector không dùng được, phải tìm/kiểm tra tool connector khả dụng; nếu chưa kết nối thì hướng dẫn kết nối qua ClawExpert. Snapshot 2026-10-10: Google Docs connector được platform hỗ trợ nhưng chưa được expose/kết nối trong agent session này.
- Người dùng muốn mở rộng sang LinkedIn: agent phải nghiên cứu và vận hành content theo hướng **reader-centered, niche, personal authority**, nhưng chỉ đăng sau khi người dùng duyệt rõ ràng. POC LinkedIn ưu tiên format dễ automate: bài ngắn + 1 hình hoặc multi-image nếu có asset; PDF carousel native chưa làm được bằng connector hiện tại.
- Khi tạo visual LinkedIn/carousel/PNG cho người dùng, **font brand mặc định là Be Vietnam / Be Vietnam Pro**, nhưng với PNG tiếng Việt cỡ lớn ưu tiên **Be Vietnam bản gốc** và weight vừa phải (`600` cho headline, tránh `700/800` nếu dấu bị thô). Không được chỉ nhìn CSS rồi giả định đúng font; phải kiểm font-face/font-family, kiểm trạng thái load bằng browser/Chromium nếu có thể, và soi ảnh PNG render cuối. Chỉ dùng font khác khi người dùng chốt rõ.
- Khi người dùng nói rõ **"1 hình thôi"** hoặc chỉ cần một post PNG, phải tạo output single-image độc lập: không chia carousel, không tạo PDF carousel, không để progress dots/counter/slide labels trong asset chính, và dùng tên file/cache path mới như `linkedin-post.png`.
- LinkedIn personal visual mặc định mới: dùng ảnh người dùng cầm mic tại `assets/brand/tin-truong-tri-mic-original.png`; avatar card dùng crop `assets/brand/tin-truong-tri-mic-avatar-square.png` và render tròn bằng CSS `border-radius: 50%`. Không fallback về initials/placeholder khi pipeline cần ảnh thật.
- LinkedIn single-image PNG cấu trúc mới nhất: **Title cụ thể → Context ngắn → 3-6 bullets/steps action được → Closing rõ lực**. Style phải bám mẫu `marketing-agent-clear-task`: nền trắng, avatar thật, divider mảnh, title lớn, context xám, bullet số nhỏ màu vàng, closing đậm, footer Share/Save nhẹ nếu giống template. Tránh kiểu card/grid/fake LinkedIn UI, boxed bullet rows, hoặc English framework badge như `Decision Content` nếu người dùng chưa yêu cầu.

## ClawExperts positioning — Công ty số & Nhân viên số
- Người dùng muốn brainstorm và hiện thực hóa concept cho **ClawExperts**: nền tảng giúp mọi người hiện thực hóa mô hình **công ty số** bằng cách xây dựng và vận hành **nhân viên số**.
- Narrative cốt lõi: ClawExperts không chỉ bán AI tool; ClawExperts giúp cá nhân/doanh nghiệp thiết kế lực lượng lao động số gồm các agent/nhân viên số có vai trò, nhiệm vụ, quy trình, quyền hạn, KPI/checklist và cơ chế kiểm soát chất lượng.
- Các angle người dùng thích và cần phát triển tiếp: **"Một nhân viên số cần KPI hay checklist?"** và **"Đừng prompt, hãy viết JD cho agent"**.
- Keyword/market angle cần research và khai thác: **"công ty 1 người"** đang hot; ClawExperts sẽ được định vị như hạ tầng để biến công ty 1 người thành công ty số có nhân viên số hỗ trợ vận hành.
- Người dùng có concept làm video bằng cách **quay iPad vẽ plan/sơ đồ/concept**. Với series khởi nghiệp AI/công ty 1 người, video đầu tiên nên có output rõ: một page ready để bán và 2 nhân sự số gồm **nhân sự bán hàng** và **nhân sự đăng bài/quản lý fanpage**.
- Luồng demo khởi nghiệp AI/công ty 1 người cần gắn với nguồn hàng thật: người dùng có một "anh nguồn hàng", sẽ tạo **group chung** để khi nhân sự số tư vấn/chốt được đơn thì gửi thông báo vào group cho shop giao hàng. Concept vận hành: page + sales agent + fanpage/content agent + fulfillment group với shop, tạo thành flow gần full automation cho bán hàng và chăm page.
- Workflow content nên chuẩn hóa phần sản xuất (voice guide, design system, export/publish), nhưng phần brainstorm không ép form cứng; để cảm hứng và insight xuất hiện tự nhiên trong hội thoại.

## Video personal tiếp theo — "Học rồi giao việc" — 2026-09-05
- Người dùng chốt concept cho video tiếp theo trên kênh personal: cách biến mọi thứ đang học (sách, video, AI, agents, content...) thành tài nguyên có thể vận hành, không chỉ là ghi chú/kiến thức thụ động.
- Tên gọi nhẹ nhàng ưu tiên: **"Học rồi giao việc"** hoặc **"Học rồi giao AI làm"**; tránh tên quá vĩ mô như "Learning-to-Employee System".
- Framing cốt lõi: **Học được gì hay → biến nó thành cách làm → giao lại cho AI làm cùng mình**.
- Flow nên phát triển: **Nguồn học → Nguyên lý → Skill → Workflow → Asset → Product → Digital Employee → Distribution → Feedback → Skill nâng cấp**.
- Ví dụ chính nên dùng trong video: đọc một cuốn sách hay về viết content, rút nguyên lý viết, biến thành skill cho AI, đưa vào workflow viết bài đúng ý/đúng cấu trúc/đúng giọng, rồi dần biến thành một **nhân viên content số** biết viết, chuẩn bị đăng, tái sử dụng asset và cải thiện theo phản hồi.
- Phiên bản concept đang muốn phát triển tiếp trong công việc: **Đọc sách/nguồn học → thẩm thấu thành nguyên lý/cách làm → encode thành skill → đóng gói thành nhân viên số ở đúng mảng đó**. Ví dụ: sách content tạo Content Employee, sách Product tạo Product Employee, sách Sales tạo Sales Employee. Đây là next step cần tiếp tục phát triển thành framing, script, visual iPad, workflow demo và asset/product hóa.
- Hướng HCD cần đánh: show hành vi thật của người xem (học nhiều, lưu nhiều, note nhiều nhưng ít output), rồi chỉ ra điểm gãy là chưa biến kiến thức thành workflow/asset/nhân viên số. Không chỉ nói mindset shift; cần show ví dụ, sơ đồ iPad, before/after, checklist/template/workflow thật.

## LinkedIn content POC — 2026-08-17
- Kết luận nghiên cứu ban đầu: không coi “1 hình = exponential growth” là chân lý tuyệt đối. Dữ liệu 2026 cho thấy single image tốt hơn text-only và dễ triển khai đều, nhưng multi-image/native document thường outperform image. Vì connector chưa hỗ trợ PDF carousel native, POC nên test short post + 1 strong image như baseline tự động hóa.
- Cadence đề xuất: bắt đầu 2-5 bài/tuần để kích hoạt phân phối đều; nếu chất lượng giữ được mới tăng 6-10 bài/tuần.
- Format POC: 120-220 từ, hook rõ một nỗi đau/insight, 1 góc nhìn cá nhân, 1 framework/case nhỏ, CTA mềm không engagement-bait. Ảnh nên là visual proof/framework/screenshot/diagram, không stock generic.
- Dữ liệu đầu vào cần có: chân dung người đọc, POV riêng của người dùng, case/bằng chứng thật, raw notes hằng ngày, offer/CTA, và luật vùng cấm. Metric ưu tiên: saves, comment chất lượng, profile views, inbound/DM, không chỉ like.
- Quy trình đăng LinkedIn: agent tạo angle + draft + gợi ý hình; người dùng duyệt bằng câu rõ như “duyệt đăng bài này”; agent mới đăng.
- Nếu dùng CTA kiểu “comment YES/keyword”, bắt buộc phải có value delivery thật phía sau: template, checklist, playbook, scorecard, teardown, sheet, hoặc mini audit. Không dùng keyword-comment như engagement bait rỗng.

## Năng lực Marketing Agent đã làm được — 2026-08-16
- Facebook fanpage đang quản lý qua connector: **Cộng đồng tự học Product**. Page ID hiện dùng trong connector: `447964318391906`; permalink public vẫn dùng namespace cũ `122237897114495236`.
- Đã lấy video từ YouTube và đăng link video lên fanpage thành công.
- Đã lấy danh sách video YouTube, tạo Google Sheet **Content Calendar**, và schedule 34 bài Facebook từ 18/08/2026 đến 13/09/2026 theo giờ Việt Nam, dùng slot 11:30 ICT và 20:00 ICT.
- Đã dựng hệ thống template carousel bằng HTML/CSS cho brand **Tự học Product**: size 1080x1350px, nền ivory, accent cam, typography cố định, progress dots, các layout cover/step/two-up/checklist/CTA, export PNG bằng Chromium.
- Đã host public preview/download cho template tại `https://tu-hoc-product-carousel.ngthaibinh86.chatgpt.site`, với ảnh PNG ở `/carousel/slide-01.png` đến `/carousel/slide-06.png`.
- Bài học kỹ thuật quan trọng: Facebook carousel organic/multi-photo post qua Composio không nên dùng `FACEBOOK_UPLOAD_PHOTOS_BATCH` với `published=true` vì sẽ tạo nhiều photo posts riêng. Flow đúng là upload ảnh với `published=false`, lấy media IDs, rồi publish feed post với `attached_media[0..n]`. Connector `FACEBOOK_CREATE_POST` có thể ignore `attached_media`; nếu vậy dùng Graph API trực tiếp với Page access token lấy từ `FACEBOOK_LIST_MANAGED_PAGES` để gọi `/{page_id}/feed`.
- Đã đăng thành công một bài multi-photo/carousel đúng nghĩa gồm 6 ảnh: `https://www.facebook.com/122237897114495236/posts/122237909906495236`.
- Cần nhớ: do thử sai ban đầu, hiện có các post test/ảnh rời trước bài carousel; chỉ xóa khi người dùng xác nhận vì xóa Facebook post là irreversible.

## Trạng thái tích hợp YouTube — 2026-08-16
- YouTube connector đã được dùng trong phiên 2026-08-16 để lấy video cho workflow đăng/schedule Facebook.

## YouTube API/OAuth riêng — 2026-09-29
- Workspace đã có YouTube API/OAuth riêng để tránh quota/dữ liệu thiếu của connector shared. Không lưu raw secret trong memory. Env/secret paths: `.env.local` có `YOUTUBE_API_KEY` và `YOUTUBE_OAUTH_CLIENT_FILE=.secrets/youtube-oauth-client.json`; OAuth token ở `.secrets/youtube-oauth-token.json`; `.secrets/` đã được thêm vào `.gitignore`.
- Scripts đã thêm: `npm run youtube:api-key`, `npm run youtube:oauth:url`, `npm run youtube:oauth:code -- CODE`, `npm run youtube:analytics`. Source: `scripts/youtube-api-key-smoke.mjs`, `scripts/youtube-oauth.mjs`.
- Kênh đang phân tích: `Tự học Product trong Kỷ nguyên AI`, channel ID `UC-oana59roLSo4m5WNlPylQ`, handle `@tuhocproduct`.
- Video đang phân tích: `2VZH_mXYGzE` — `Hướng Dẫn Tạo Nhân Viên Bán Hàng Với OpenClaw + Zalo`, published `2026-09-18T12:34:41Z`, duration `10m12s`.
- Snapshot 2026-09-29: public Data API `484 views`, `11 likes`, `3 comments`; YouTube Analytics range `2026-09-18..2026-09-29` trả đến `2026-09-26`: `447 views`, `278 estimatedMinutesWatched`, `116s averageViewDuration`, `18.96% averageViewPercentage`, `9 likes`, `2 comments`, `2 shares`, `1 subscriber gained`.
- Traffic source của video: subscriber/feed là nguồn chính (`380 views`), related videos `19`, channel page `17`, search `10`, external `1`. Nhận định: video chưa breakout ra search/suggested/external; cần cải thiện packaging/title/thumbnail/SEO và gắn URL tracking bằng UTM/shortlink cho description.
- YouTube Reporting API đã được enable/authorize và tạo 5 jobs ngày 2026-09-29: `channel_basic_a3` (`cb76b234-03a1-42ae-9b11-689546c05412`), `channel_reach_basic_a1` (`1a12b80c-d2ba-4a38-b8ba-a377fbf1f753`), `channel_traffic_source_a3` (`c6b2ee20-27ff-4aa4-945a-c0a82133e13b`), `channel_device_os_a3` (`0cd4f658-6c3c-42ff-8ce5-60a88a6002fb`), `channel_combined_a3` (`d2afe815-b78c-4979-89ab-62674cef0222`). Ngay sau tạo job, report files chưa có (`reportCount: 0`); cần check lại sau khi batch generated.
- Reporting helper scripts: `npm run youtube:reporting:list` để list jobs/reports; `npm run youtube:reporting:download -- 2VZH_mXYGzE` để download CSV vào `reports/` và lọc đúng video khi file có sẵn.
- Analytics full export helper: `npm run youtube:analytics:full -- VIDEO_ID START_DATE END_DATE`. File output cho video hiện tại: `reports/analytics/2VZH_mXYGzE-2026-09-18-2026-09-29.json`. Các group lấy được: summary, daily, traffic source, device, OS, country, subscribed status, playback location, sharing service, audience retention elapsed, cards. Impressions/CTR không lấy được qua Analytics API query đã thử (`Unknown identifier impressions`); province/demographics/end screen query cũng không hỗ trợ trong combo video hiện tại.
- HTML report public cho video `2VZH_mXYGzE` đã deploy lên Sites version 26 ngày 2026-09-29: `https://tu-hoc-product-carousel.ngthaibinh86.chatgpt.site/reports/youtube/2VZH_mXYGzE/analytics-2026-09-18-to-2026-09-29`. Lưu ý site hiện là public theo xác nhận của người dùng.

## Hướng nghiên cứu ban đầu: “Tự học Product trong kỷ nguyên AI”
- Pillar 1 — Nền tảng Product: Product Thinking, discovery, problem framing, user research, prioritization, metrics.
- Pillar 2 — AI workflow cho Product: research synthesis, PRD, phân tích feedback, prototyping, experiment/analytics.
- Pillar 3 — Sự nghiệp: roadmap tự học, portfolio, case study, phỏng vấn và cách PM tạo lợi thế trong AI era.
- Pillar 4 — Thực chiến: teardown sản phẩm, build-in-public, case study trước/sau khi dùng AI.
- Tiêu chuẩn chọn chủ đề: nhu cầu rõ, lời hứa kết quả cụ thể, khả năng thumbnail trực quan, góc nhìn có bằng chứng hoặc trải nghiệm.

## Những dữ liệu cần lấy khi connector hoạt động
- Baseline 90 ngày: subscribers, views/video, CTR, average view duration, retention 30 giây đầu, nguồn traffic, returning viewers.
- Danh sách video top và video outlier (view vượt đáng kể median của kênh), cùng title/thumbnail/topic/hook/retention để rút pattern.
- Mỗi video xuất bản sẽ lưu: giả thuyết, packaging, chỉ số 24h/7d/28d, bài học và hành động thử tiếp theo.
