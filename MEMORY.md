## Fanpage: Học cùng Bruno
- Page ID: 585775954614144
- Category: Trang web giáo dục
- Managed by user (full permissions: MODERATE, MESSAGING, ANALYZE, ADVERTISE, CREATE_CONTENT, MANAGE)
- Recent post ID: 585775954614144_122181932486786083
- Post content: "Thói quen học tập hiệu quả giúp bạn tiến bộ lâu dài..."
- Image uploaded to Google Drive (file ID: 1UfKFQe9Hkq44DC5PJIXEQTMzFhh1VZhB, parent folder ID: 1EZRFOxmO5FEM4ZBPQZFBn0tkOVv1cKXo) and shared publicly.
## Cấu hình đăng bài tự động
- Yêu cầu style hình ảnh: hustle, grinding, học hành, sách vở, laptop coding, vibrant modern style
- Thư mục Google Drive đích: 1p9cC4Aaa21wCcjW5AhqanKLndTsYAu-b (URL: https://drive.google.com/drive/folders/1p9cC4Aaa21wCcjW5AhqanKLndTsYAu-b?hl=vi)
- Tự động tạo hình → upload Drive → đăng bài Facebook khi nhận lệnh "đăng bài"

## Cách hỗ trợ Trí khi làm sản phẩm/agent
- **Cách làm việc với con người:** Trí tôn trọng năng lực và lập luận hơn vai vế; kỳ vọng sự chủ động thay vì chỉ nhận task rồi trả output. Giao tiếp nên thẳng, có cấu trúc (vấn đề → lý do/evidence → phương án → quyết định cần chốt), tránh vòng vo. Báo cáo hoàn thành phải có bằng chứng như output/link/trạng thái/test/số liệu. Trí đánh giá cao phản biện có dữ liệu, nêu trade-off/rủi ro và chịu trách nhiệm cho phương án thay thế; không che bất định bằng tự tin — phải phân biệt rõ phần đã kiểm chứng với giả định và đề xuất bước kiểm chứng nhanh. Đòi hỏi cao về logic, khả năng mở rộng/bàn giao, nhưng xem collaboration là cùng xây và trao quyền cho người hiểu mục tiêu/bối cảnh/tiêu chuẩn thành công.
- Trí thích kiểu phản biện sâu, không chỉ tóm tắt hoặc đồng ý. Khi Trí đưa idea/spec/brief, cần bóc các tầng: surface/UI, nghiệp vụ/domain model, agent decision logic, trust/safety, metrics, edge cases, và moat.
- Luôn đặt câu hỏi sắc để làm rõ bản chất sản phẩm: agent hiểu gì, quyết định gì, theo luật nào, khi nào không hành động, học lại thế nào, và user tin nó bằng gì.
- Với spec agent, phân biệt rõ "screen brief/app surface" với "nghiệp vụ agent/decision system"; nếu thiếu tầng nghiệp vụ thì nói thẳng và đề xuất cấu trúc bổ sung.
- Khi Trí bàn về sản phẩm Agent App/OpenClaw, hãy ép concept qua 4 lớp: vấn đề thật có đau không, nghiệp vụ agent nằm ở đâu, tại sao khách phải mua, và OpenClaw tạo lợi thế vận hành gì. Trí thích câu trả lời đi tới "bán được, build được, khác biệt được", không chỉ hợp lý về mặt ý tưởng.
- Hướng chiến lược đang hình thành: không pitch "AI chatbot", mà pitch "Agent Workforce OS" hoặc hệ thống quản lý nhân viên agent trên OpenClaw: đào tạo, phân quyền, giám sát, HITL, hiểu sản phẩm/đơn hàng, chốt đơn có kiểm soát, audit, và tự cải thiện từ hội thoại thật.

## Framework: Core / Layers / Features
- Khi định vị sản phẩm hoặc ứng viên, dùng frame: Core = bài toán trung tâm đáng thuê để giải; Layers = các năng lực/meta-domain quanh core; Features/evidence = biểu hiện cụ thể bám vào từng layer; Unique = các layer kết nối thành một hệ năng lực khó thay thế.
- Với sản phẩm Agent, không đánh giá bằng danh sách feature rời rạc. Hỏi: "Feature này thuộc layer nào, layer này có làm core mạnh hơn không, và các feature có kết nối thành một hệ thống giải bài toán không?"
- Ví dụ core "Agent quản lý & điều phối công việc qua email" có layers: quản lý, điều phối, công việc, email. Feature phải bám layer: priority queue, thread state, follow-up, draft approval, calendar link, memory.
- Ánh xạ tuyển dụng: Candidate Core = bài toán người này giải tốt hơn người khác; Candidate Layers = hard skills + soft skills + domain context + execution style; Candidate Features = bằng chứng cụ thể; Candidate Unique = các skill kết nối để giải cùng một bài toán.

## Product Direction: Email Revenue Follow-through Agent
- Khi Trí nói về "kiếm tiền qua email" / bán hàng và nhận đơn 100% qua email, core nên là `Email Revenue Follow-through`, không phải email summary hay inbox assistant.
- Positioning: agent giúp không bỏ sót cơ hội kiếm tiền trong email: phát hiện lead/đơn hàng, ưu tiên khách đáng chốt, chuẩn bị trả lời, theo dõi tới khi ra tiền hoặc cần người quyết định.
- Email trong use case này là sales pipeline. Meta layers: Lead/Opportunity, Sales Conversation, Order/Transaction, Follow-through/Chốt đơn, Trust/Approval.
- Revenue Morning Brief nên trả lời: deals needing decision, hot leads to reply today, quotes waiting for follow-up, orders missing information, at-risk deals, draft replies ready to approve, revenue forecast from email pipeline.
- Câu hỏi cốt lõi của sản phẩm: "Email nào có tiền trong đó? Tiền đang kẹt ở bước nào? Hôm nay cần làm gì để tiền tiếp tục chạy?"

## Training Loop & Company Asset
- Bản chất training cho agent không nhất thiết là fine-tune model. V0 nên hiểu là: human correction -> agent rút pattern -> lưu thành rule/memory/playbook -> áp dụng cho email tương tự -> đo approval/edit/success.
- Training cần diễn ra ở 5 lớp: Product/Offer, Customer/Segment, Sales Process, Communication/Reply, Decision/Approval.
- Training moments: setup training, correction training khi human sửa/reject/đổi stage, outcome training khi deal won/lost/no response, periodic review training hằng tuần.
- Training features đáng có: teach from correction, approved examples library, playbook editor, customer memory, outcome feedback, training review report.
- Training input: email thread, catalog/price/policy, approved/rejected drafts, human edits, deal outcome, CRM/order/payment data, explicit instruction. Training output: rules, memory, approved snippets, scoring/follow-up/approval policy, updated playbook, confidence threshold.
- Đo training bằng quality metrics (approval rate, edit distance, rejection rate, classification accuracy), revenue metrics (hot-lead response time, follow-up coverage, deal leakage, quote-to-close rate, revenue influenced), trust metrics (hỏi đúng lúc, tự làm quá tay, lỗi giá/policy, auto action không gây vấn đề).
- Trợ lý agent trở thành tài sản công ty khi nó tích lũy `Sales Operating Memory`: customer memory + sales playbook + approved examples + deal outcome history + pricing/approval policy + follow-up intelligence + training loop. Nếu đổi người hoặc scale team mà công ty vẫn giữ cách bán hàng qua email, agent đã là company asset.

## Workflow Lessons from ws-agent-email Prototype/Mockup Work (2026-07-03)
- When Trí asks to compare `screens-brief.md`, `mockups.html`, `mockups.data.js`, and prototype, do not jump straight into implementation. First identify source of truth and ask/choose the correct artifact to edit. In this project, Trí explicitly wanted **mockup complete states first**, not prototype changes.
- If a mistake is made by editing the wrong layer (for example prototype before mockup), acknowledge plainly, revert the wrong-layer change, then continue on the correct layer. Do not defend the mistake or keep building on it.
- For design/prototype repos, distinguish three layers clearly:
  1. `mockups.data.js` / `mockups.html` = source-of-truth visual/state mockup for review.
  2. `screens-brief.md` = requirements for states, CTA, and flows.
  3. `prototype/` + `prototype.html` + `prototype-assets/` = throwaway Vite implementation after mockup is correct.
- Preserve renderer/data separation: `mockups.html` should remain the fixed shell/engine; screen content should live in `mockups.data.js` under `window.WIREFRAME`. Do not inline screen content in `mockups.html` unless explicitly asked.
- Before reporting “done”, provide evidence: `git status --short --branch`, syntax/build checks (`node --check mockups.data.js`, Vite build if prototype changed), commit hash, push range, and exact files changed.
- When pushing user-requested repo changes, keep messages concise but include exact commit IDs and whether working tree is clean.

## ws-agent-email Product/UX Lessons (2026-07-03)
- Onboarding is not optional. Queue must not open directly after Gmail connect. Required flow: `Kết nối Gmail` → OAuth/loading “quét lịch sử & học giọng” → `Risk Profile Draft` / calibration → confirm → responsibility queue.
- S1 consent/data policy must be explicit and plain-language: minimal Gmail scopes, reads email to perform task, drafts require approval, no auto-send, no train/fine-tune shared model, retention 90 days, purge on disconnect.
- The product is not an inbox assistant. It is a **Responsibility Queue / Email Revenue Follow-through** system: “80 emails processed → 9 decisions left.” The UI should communicate that agent work happened before the user sees the queue.
- Queue rows should expose decision fields, not just email previews: `waiting_on`, `value_type`, `confidence`, `last_user_sent_at`, `suggested_next_date`, `next_action_hint`, `last_meaningful_snippet`, and core-loop label.
- Important S2 buckets/states: Mail bị trả lại, Cần bạn trả lời, Đã có reply, Cần follow-up, Có thể bỏ qua/deprioritized, why/evidence, Operating Memory suggestion, all-safe, first-run, loading, error.
- Important S3 states: draft-ready, draft-generating with send locked, needs-reply/manual Gmail reply, confirm-close, bounced-alert, loading, error, done. Sending must stay human-approved.
- Important S4 states: settings/cadence, excludes, delete learned voice data, Risk Profile Draft, Operating Memory suggestions, deep evidence, empty excludes, saved, error.
- Evidence rule: Level B is default (pattern + lightly masked subject/snippet + high-level signals). Level C/full thread evidence opens only after user clicks deep evidence; avoid making the default UI feel like inbox surveillance.
- Core loop language that fits this product: Detect → Understand → Prioritize → Dispatch → Human decision → Track reply → Outcome feedback → Operating Memory.
- Core vs Meta framing for this project:
  - Core: Email Revenue Follow-through — find money/responsibility stuck in email and move it forward.
  - Domain layers: Lead/Opportunity, Sales Conversation, Follow-through, Trust/Approval.
  - Meta layers: Risk Profile, Operating Memory, Evidence Policy, Governance, Training Loop.
- Operating Memory is the “company asset” layer: approved examples, customer memory, playbook rules, cadence/exclude preferences, and correction/outcome history. The agent improves by storing rules/memory/playbooks, not by claiming to fine-tune a shared model.

## Meta-learning directive from Trí (2026-07-03)
- Trí wants me to become better at building agents and developing stronger use cases over time. Treat each product/prototype session as training data: capture workflow mistakes, product framing lessons, source-of-truth decisions, and reusable agent design patterns into memory.
- For future use-case/product work, actively improve by applying prior lessons rather than starting from scratch: identify core problem, domain layers, meta layers, core loop, trust/safety, evidence, onboarding, decision logic, and what makes it sellable/buildable/different.
- On 2026-07-26, Trí asked me to build myself around OpenClaw multi-agent routing so he can pursue Agent Workforce OS ideas. Created pending Skill Workshop proposal `multi-agent-workforce-architect-20260726-2c60a5e3a1`: a reusable workflow for turning an idea into isolated agents, workspaces, `agentDir`s, bindings, channel account routes, tool/sandbox policies, trust gates, training loops, config sketches, and smoke tests. Until applied, treat it as a pending proposal rather than live behavior.

## Use-case learning principle — prototype only after mockup trust gate (2026-07-04)
- For agent-app workflows, static mockup/source-of-truth state coverage is the trust gate before interactive prototype. Prototype work should only start after `mockups.data.js`/`mockups.html` and `screens-brief.md` agree on states, CTAs, and flow.
- A prototype must make key states reachable through real user actions, not only hidden demo tabs/toggles; otherwise it tests visuals but not the agent loop.
- Represent agent “learning” as Operating Memory/rules/playbooks/corrections/outcome history by default, not vague fine-tuning claims. This is clearer and safer for non-technical buyers.

## Use-case learning principle — state reachability gate for prototypes (2026-07-05)
- For agent-app prototypes, add a state-reachability gate: every key state/CTA from `screens-brief.md` and `mockups.data.js` should be reachable through real user actions or explicit simulated agent events.
- Prototype generators such as `to-prototype` should report `reachable / demo-only / missing` states instead of hiding important states behind invisible toggles or implying complete flow coverage.
- A prototype is not the source of truth; it is a behavior test of the approved source of truth. Source order remains: Agent Domain Spec → screen brief/mockup → prototype.

## Use-case learning principle — polish/load bugs are trust bugs (2026-07-06)
- For non-technical agent apps, frontend polish issues such as blank pages, wrong font fallback, CSS loading order, or broken deploy previews are not merely cosmetic; they are trust bugs. Users judge whether the agent is safe/credible before they understand the deeper agent logic.
- Every agent-app prototype should carry a state-reachability matrix: each key state/CTA from the brief/mockup is marked `reachable / demo-only / missing` with the user action or simulated agent event that reaches it. Without this, a prototype may only test visuals, not the agent loop.

## Use-case Factory repo location
- Repo chính: `/home/node/usecase-factory/` (có git tracking, remote: github.com/Tritintruong114/usecase-factory.git)
- Bản `use-case-factory/` (có dấu gạch) đã xoá — là skill artifact cũ, không git, không xài
- Pipeline: brief → Agent Fit Check → 4 worker research → Dossier → 4 synthesis → Decision Gate → Handoff
- 9 skills, 7 agents, 6 templates, 6 scripts, 1 design system
- Workspaces cũ: doc/ws-agency-weekly-report-pilot/, doc/ws-lock-smoke/, doc/ws-smoke-test/

## Use-case learning principle — agent workspace/runtime/publish gates (2026-07-07)
- Do not confuse toolchain source with an agent product workspace. A dedicated agent should own its outputs, publishing path, decisions, and runtime identity; vendored skills/plugins are internal engines only.
- For completed use-case work, local artifacts are insufficient for non-technical review. Require a publish readiness gate: commit, GitHub URL when available, Vercel/preview URL for visual artifacts, and clear missing setup if unavailable.
- New agent setup needs a runtime registration gate: verify OpenClaw can list/run the agent and smoke-test a response, not just create folders/config.

## Use-case learning principle — plain-language gate for non-technical agent apps (2026-07-08)
- For non-technical agent apps, jargon removal is trust design, not superficial copy polish. Backend terms like `thread`, `draft`, `contact`, `NDR`, `correction`, and `export` should be translated into user-language such as “cuộc hội thoại”, “bản nháp”, “người gửi/khách”, “mail bị trả lại”, “lịch sử sửa chữa”, and “tải về”.
- Add a Plain-language Gate before prototype review: every label, CTA, state, bucket, and audit-log field must be understandable to the target buyer/user without learning the backend ontology.
- Keep two layers in sync: user-facing plain language for trust and usability, plus precise backend/domain terms in the spec for builders.

## Use-case/product lessons — 2026-07-09

- Explainability for agent apps should be productized as a visible trust surface, not hidden in technical logs. Audit rows should expose action, reasoning, signals, state/result, and Operating Memory impact in plain language.
- For non-technical founders, use-case research should produce a Decision Pack rather than a pile of files: quick verdict entrypoint, product map, agent-domain spec, screen brief, prototype, and appendix evidence.

## Zalo Agent Bridge skill (2026-08-23)
- Live skill `connect-zalo-agent-bridge` exists for configuring `/home/node/.openclaw/zalo-b2b-bridge.mjs`. When Trí asks to connect/gắn/bind a Zalo bot to an OpenClaw agent, use this skill so the agent asks for target agent id, Zalo bot identity, token or confirmation to reuse the existing token, and whether to restart the bridge.
- Safety rule: never expose Zalo bot tokens in chat/log/final answers; redact env values and preserve existing env variables. Validate with `node --check`, process check, and bridge logs after changes.
- Current reviewed bridge pattern routes Zalo polling messages through `openclaw agent --agent <agentId>` with session key `agent:<agentId>:zalo-bot:group:<chatId>` and chunks replies under Zalo's 2000-character limit.
- `https://github.com/Tritintruong114/agents-factory` is now the ClawExperts agents factory repo. It includes the reusable `connect-zalo-agent-bridge` skill plus a production-ready Zalo polling bridge package: one-shot installer, per-bot status/restart/log scripts, systemd template, env example, fixture tests, mention gate, checkpointing, backoff, structured redacted logs, and the default model `1 Zalo bot = 1 OpenClaw agent = 1 isolated bridge process`.

## Daily Chinese Flashcard Goal — HSK4
- Trí wants a daily Telegram Chinese flashcard image routine that remembers each delivered lesson, increments lesson/day count, avoids repeating content, and progresses toward HSK4.
- Cron job: `daily-chinese-flashcard-image` (`fc59cc40-d22b-4c5c-94e0-b04e5157379e`), scheduled daily at 07:30 Asia/Ho_Chi_Minh.
- Each run should log the date, lesson number, HSK level, theme, main sentence, vocabulary, and output file into `memory/YYYY-MM-DD.md`.
- Learning path should build from HSK1 foundations through HSK2/HSK3 patterns and eventually HSK4 vocabulary/grammar, while keeping each image small enough for daily writing practice.
- iPad writing workflow: use Apple Markup, not a third-party note app by default. The daily job should create a PDF worksheet alongside the PNG, upload/share it via Google Drive, and send it in Telegram so Trí can open the PDF on iPad, tap Markup, write with Apple Pencil, save, and optionally send the marked-up result back for correction.
- ElevenLabs voice for daily Chinese flashcard audio: `9DMBSOAnMDPiFAsz1ZGK`. Use it for the slow model reading sent with the Telegram image/PDF when ElevenLabs/TTS is configured.

## Client context — Mái Nhà Việt / anh Long
- Google Sheets / Drive cleanup and product-image extraction tasks involving Mái Nhà Việt are for anh Long's customer.
- In the 2026-08-25 image extraction task, source sheet `16jOApDzVBZYyV6sdH3pXvk1PEPxPl23H09VYjR-7ftY` had visible tabs `Bluescop`, `xà gồ dày`, and `Romatruss`; the target product sheet was `1YF-hbTc3rhBm4Jn9pgHxinmfWw-zgns9Eh1b4skOF4c`, tab `lamthu-all`, with image links in column H.

## Tài chính & đời sống cá nhân (2026-07-26)
- Thu nhập hiện tại của Trí: 27 triệu/tháng.
- Trí đang phụ mẹ trả nợ 5,6 triệu/tháng (fixed).
- Chi phí trọ hiện tại: 3,5 triệu/tháng (fixed).
- Trí đang chuẩn bị chuyển sang trọ mới thoáng hơn, có không gian để quay content.
- Ngoài builder/product person, Trí còn là YouTuber nói về làm sản phẩm.

## Content creation direction (2026-07-26)
- Nếu làm content AI Agent hằng tuần, tỷ trọng nên ưu tiên: 50% end-user/problem-first, 30% power-user/framework, 20% builder/operator/deep dive.
- Tuy nhiên với nhịp hiện tại khoảng 1 video/tuần, nên focus rõ hơn vào end-users để mở rộng reach và làm cho khái niệm AI Agent dễ hiểu nhất có thể.
- Hướng ưu tiên: problem-first, plain-language, mass-friendly; tránh làm tutorial nặng tool/technical từ đầu.
- Hook nên đi từ pain đời sống/công việc thật; phần sâu hơn mới cài insight framework phía sau.
- Quy tắc GTM quan trọng cho ClawExperts: không giải thích nền tảng bằng tính năng/connector/runtime trước. Nên giải thích bằng ví dụ công việc thật, use case thật, tình huống thật, và worldview về agent; ClawExperts chỉ xuất hiện như nơi các ví dụ đó chạy được thật.
- Với series `AI Agent 101 cùng ClawExperts`, file/series này là GTM through examples, không phải feature walkthrough. Example là sản phẩm marketing; platform là enabling layer phía sau.

## Product Focus: XinChao App UA/GTM (2026-08-30)
- Trí wants me to act as an AI Agent focused on user acquisition for `https://xinchao.app/`, the mobile app/product he needs marketing help with.
- Product positioning to remember: XinChao is not a generic language-learning app; it is a `Survival Vietnamese` pocket companion for tourists, expats, and remote workers in Vietnam who need usable street phrases, pronunciation, accent awareness, camera-powered help, and confidence in real situations.
- Current public proof points researched on 2026-08-30: iOS app `XinChao - Learn Vietnamese` by Tin Truong, Education category, free with in-app purchases, iPhone-only, version history began May 20 2026, not enough ratings yet; public pricing is 3-day free trial, $6.99/month or $69.99/year, with HN/SG accent audio, survival packs, voice practice, quizzes, streak/XP, and seasonal scenarios.
- Primary acquisition wedge: sell the outcome `survive your first 7 days in Vietnam`, not `learn Vietnamese`. Start with moments that create immediate pain: ordering food, bargaining, Grab/taxi, landlord chats, reading signs/menus, basic work/street conversations, and not sounding totally like a tourist.
- Best early segments: first-time Vietnam travelers, expats/remote workers newly settling in HCMC/Hanoi/Da Nang, foreigners dating/marrying/working with Vietnamese people, and tourists who want street-food/market confidence before arrival.
- Marketing rule: lead with real Vietnam moments and short-form scenarios; use plain English for foreigners, sprinkle Vietnamese phrases, and avoid heavy grammar or classroom framing. The mascot/brand can be playful, but the promise should be practical and confidence-building.
- Core channels to prioritize: TikTok/Reels/Shorts street scenarios, SEO/blog pages for high-intent queries, App Store Optimization, Reddit/Facebook expat communities with helpful posts, partnerships with hostels/coworking/visa/relocation content, and Apple Search Ads/Google UAC only after store screenshots and paywall conversion are ready.
- ASO direction: title/subtitle/keywords should capture intent like learn Vietnamese, Vietnamese phrases, Vietnam travel, expat Vietnam, food ordering, pronunciation, and survival Vietnamese. First screenshots must show the moment/value, not just UI: `Order phở without freezing`, `Bargain at the market`, `Hear Hanoi vs Saigon accents`, `Scan a menu/sign`, `Practice before you speak`.
- Growth loop to design around: content clip/post teaches one useful phrase or cultural moment -> CTA to free survival pack -> user saves/practices phrase -> travel/expat anxiety is reduced -> prompt for rating/share after successful usage -> retarget to Pro for accents, voice feedback, full scenario library.
- Metrics that matter: app store page conversion, first-session survival-pack completion, D1/D7 retention, voice-practice activation, saved phrases, trial start rate, trial-to-paid conversion, refund/cancel reasons, rating volume/quality, CAC vs LTV by segment/channel, and which scenarios drive subscription.
- Key risk: broad language-learning competitors are stronger at habit/gamification and big catalogs. XinChao should win by being narrower, more local, more practical, more culturally contextual, and more tied to the user's immediate Vietnam survival moments.

## GA4 tracking format for Agent apps (2026-09-29)
- For Agent app feature tracking, start from the product story/funnel, not raw UI clicks. Break a feature into: user enters surface -> starts step -> key business action starts/completes/fails -> optional proof/engagement action -> final conversion. Track only events that answer a business/product question.
- Event naming pattern: `{screen}_{object}_{action}_{status}` in `snake_case`. All events belonging to one screen/feature must share the screen prefix. Example for onboarding: every event starts with `onboarding_`.
- Use square-bracket placeholders in planning docs when part of the event name is substituted by a dimension value: `onboarding_[channel]_connect_completed` means concrete events like `onboarding_facebook_connect_completed`, `onboarding_zalo_connect_completed`, or `onboarding_web_connect_completed`. `[...]` is a planning placeholder, not literal text.
- Keep two related columns in tracking specs:
  - `Params sent`: the fields dev sends to GA4 with the event, e.g. `channel`, `source`, `step_id`, `error_code`.
  - `Report by`: the field the team will group/filter reports by, e.g. `channel` to compare Facebook/Zalo/Web.
- `Dimension value` is the concrete value for a report field or placeholder, e.g. `channel = facebook`, `source = sheet`, `step_id = channel_connect`.
- For the multi-channel sales assistant onboarding, the current real flow is: onboarding/checklist view -> Step 1 channel connect -> Step 2 product setup -> optional test chat -> Go live button appears only after Step 1 + Step 2 are done -> Go live modal view -> confirm click -> completed/failed.
- Do not mark `missing_channel` or `missing_product` as Go live failure reasons when the UI hides the Go live button until channel + product prerequisites are satisfied. Valid Go live failure reasons should be post-confirm errors such as `runtime_write_error`, `persona_error`, or `audit_error`.
- Useful event examples for the multi-channel onboarding:
  - `onboarding_[step_id]_start` / `onboarding_[step_id]_completed`
  - `onboarding_[channel]_connect_started` / `completed` / `failed`
  - `onboarding_product_setup_[source]_started` / `completed` / `failed`
  - `onboarding_test_chat_opened` / `onboarding_test_chat_message_sent`
  - `onboarding_go_live_clicked` / `onboarding_go_live_modal_view` / `onboarding_go_live_confirm_clicked` / `onboarding_go_live_completed` / `onboarding_go_live_failed`
- For the multi-channel sales assistant after Go live, the next activation surface is `Conversations`: user goes to their Fanpage/Zalo/Web to send a real test message, backend receives it, AI staff replies, then user may return to dashboard to inspect the thread or take over.
- Keep the first Conversations tracking simple and do not include order tracking unless Trí explicitly asks. Core events: `conversations_view`, `conversations_[channel]_message_received`, `conversations_[channel]_ai_reply_sent`, `conversations_[channel]_ai_reply_failed`, `conversations_thread_opened`, `conversations_thread_takeover_clicked`.
- Conversations events split by implementation source: message received / AI reply sent / AI reply failed are likely server-side events from webhook/backend; `conversations_view`, `conversations_thread_opened`, and `conversations_thread_takeover_clicked` are client-side dashboard events.
- For Google Sheet tracking specs, keep tab styling consistent across feature tabs. Current style to mirror from `Onboarding`: header background `#1F2937`, white bold centered header text, frozen first row, wrapped text, `Event name` and `Dimension value` columns in light `#F8FAFC` with monospace font, other body columns in `#E5E5E5`, light borders, and dimension/reference rows at the bottom rather than separate computed-metric rows.

## Content production setup của Trí (2026-08-05)
- Camera/drone: DJI 3
- Phone camera: iPhone 11 Pro Max
- Audio: mic DJI
- Lighting: 1 softbox dạng bù sáng
- Desk/setup: 2 màn hình, 1 Mac mini, 2 loa
- Support gear: tripod đầy đủ
- DJI 3 là camera quay chính cho video.
- iPhone 11 Pro Max là camera phụ / resource camera: macro nhanh, insert, behind-the-scenes, hoặc shot bổ sung khi cần.
- Khi lên plan video, nên tận dụng workflow quay hybrid: DJI làm A-roll + desk B-roll chính; iPhone hỗ trợ macro/inserts/screen adjacency; screen explain khi cần; DJI có thể dùng thêm cho establishing/movement shots.
