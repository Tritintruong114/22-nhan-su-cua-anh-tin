# MEMORY.md — Long-term project memory

## XinChao User Acquisition project

- Product: XinChao (https://www.xinchao.app/), a mobile app for practical / survival Vietnamese for foreigners in Vietnam.
- Assistant role: act as the User Acquisition and marketing agent for XinChao. Focus on research-backed acquisition, conversion, retention, ASO, content, partnerships, and measurement. Do not claim campaign performance without analytics evidence.
- Core positioning: XinChao is a **survival kit, not a traditional language course**. It helps a foreigner handle the next real-life moment in Vietnam in about 30 seconds: know the line, hear the local accent, repeat it, and use it outside.
- Strongest wedge: “survive your first 7 days in Vietnam” / “the next five minutes” rather than generic “learn Vietnamese.”
- Main pain points: freezing when a Grab driver asks a question; relying on Google Translate or a Vietnamese friend; not knowing how to order food/coffee; paying the first market price; difficulty with landlords, repairs, signs and menus; feeling outside local conversations.
- Priority audiences:
  1. First-time visitors / tourists who need phrases fast.
  2. Expats and remote workers settling into Vietnam.
  3. Foreigners who want practical speaking/listening instead of textbook grammar.
- High-intent situations / content pillars: Grab and directions, coffee/food ordering, market bargaining, landlord and maintenance, reading menus/signs with camera, money/prices, regional accents, cultural etiquette, “Vietnamese in 30 seconds.”
- Product proof points from site/App Store: Hanoi vs Saigon audio toggle; listen-repeat drills and quizzes with speaking feedback; camera-powered survival tools for signs/menus; Pocket saved phrases; daily goals, streaks, XP and badges; packs built around real moments; cloud sync; new street scenarios.
- Current monetization observed: 3-day free trial; App Store listing shows Monthly Pro $6.99 and Yearly Pro $69.99. Treat pricing/trial as mutable and verify before publishing.
- Current App Store state observed: iPhone app, iOS 15.1+, English listing, version 1.0.2 (Jun 22), not enough ratings/reviews for an overview, “Data Not Collected” shown. This creates an early-stage trust/ASO opportunity: collect authentic reviews, improve screenshots and clarify the differentiated use case.
- Recommended message hierarchy:
  1. “Say the right Vietnamese line when someone is waiting for your answer.”
  2. Real situations, not grammar drills.
  3. Hear Hanoi or Saigon; repeat once; use it today.
  4. Start free / full access for 3 days.
- Content acquisition strategy:
  - TikTok/Reels/Shorts first, English-language, scenario-led and native-looking rather than polished ads.
  - Hook in first 1–2 seconds with a stressful/funny Vietnam moment.
  - Show the English situation, the Vietnamese line, pronunciation/audio, then a CTA to practice in XinChao.
  - Build recurring series: “What to say in Vietnam,” “Vietnamese that Google Translate gets awkward,” “Survive your first 7 days,” “Hanoi vs Saigon,” “Street test,” and “Bé Ghế Nhựa” mascot-led bits.
  - CTA should deep-link to one relevant pack or the trial, not generic home-page traffic.
- Growth loops:
  - Shareable phrase cards and “I survived [moment]” badges.
  - Creator/expat partnerships with micro-creators in Hanoi, HCMC, Da Nang, Hội An and travel/remote-work niches.
  - SEO pages and short articles for high-intent searches (“Vietnamese phrases for Grab,” “how to order coffee in Vietnam,” etc.) connected to app download.
  - Community seeding in expat/travel communities with useful answers first; never spam.
  - Partnerships with hostels, co-living spaces, relocation agencies, language exchanges and tour operators.
- ASO priorities:
  - Lead with “Survival Vietnamese” and real situations in title/subtitle/first screenshot, not generic “Learn Vietnamese Daily.”
  - Screenshot sequence: Grab; order coffee/food; market price; landlord/repair; camera menu/sign; Hanoi/Saigon audio; speaking practice; 3-day trial.
  - Localize English metadata first; later test German, French, Korean, Chinese audiences if analytics show demand.
  - Prompt for review only after a meaningful success moment (completed first pack / used saved phrase), never immediately on launch.
- Funnel to instrument: content view → landing-page visit → store click → install → onboarding completion → first phrase played → first phrase spoken → first pack completion → trial start → paid conversion → week-1 retention. Segment by source, city/region, audience, pack, and platform.
- Initial experiments: (A) generic language-learning vs survival moment positioning; (B) 7-day challenge vs free trial CTA; (C) Grab vs food vs market creative; (D) Hanoi/Saigon accent demo vs camera demo; (E) monthly vs annual paywall framing. Use a clear hypothesis and stop/scale rule for each.
- Guardrails: Do not invent testimonials or market statistics. Existing website says expat stories are composite/illustrative, not individual endorsements. Avoid implying guaranteed safety, prices, translation accuracy, or fluency. Respect local people and culture in street content.
- Known sources researched on 2026-08-30:
  - https://www.xinchao.app/
  - https://www.xinchao.app/pricing
  - https://www.xinchao.app/terms
  - https://apps.apple.com/us/app/xinchao-learn-vietnamese/id6760842908
  - https://vietnamtourism.gov.vn/en/statistic/international (page did not expose usable statistics in fetch; do not cite a number from it without re-checking)
- Best next deliverables: 30-day English content calendar for TikTok/Reels/Shorts; ASO rewrite for App Store title/subtitle/description/screenshots; analytics event taxonomy; creator outreach scripts; landing-page and paywall A/B test brief.

## Mandatory Customer Value Discovery framework

Source: `customer-value-discovery` skill pulled from https://github.com/Tritintruong114/agents-factory/tree/main/skills/customer-value-discovery at commit `78879c5687489745ec80d3116043209c1a0d9446` on 2026-08-30. Local copy: `customer-value-discovery/`.

- Before writing XinChao marketing content, defining campaigns, proposing features, planning outreach, or suggesting monetization, first use Customer Value Discovery rather than jumping to feature lists or creative ideas.
- Core rule: customer value is the customer outcome, not the product feature or mechanism.
- Always separate: business outcome (e.g. installs/revenue), customer value (better state such as faster, less friction, fewer errors, higher confidence), capability, and mechanism.
- Discovery chain: persona → current status quo/workaround → cost/pain → trigger → desired progress → Customer Value → observable signal/metric.
- Use three phases:
  1. Need: understand context, pain/cost, desired progress and value; do not assume adoption, trust, pricing or feature preferences yet.
  2. Action: research alternatives, comparison criteria, trust/anxiety, adoption conditions and smallest safe trial.
  3. Result: compare observed outcome with the old way, inspect evidence/signals, then expand/adopt/iterate/stop.
- For every meaningful recommendation, distinguish verified facts, reasonable hypotheses and unknowns. Do not manufacture pain, ROI, authority, testimonials or personalization.
- Standard output before implementation: current phase + reason; discovery chain; Customer Value statement; observable signals/metrics; unknowns and next discovery questions; capability/content implications only afterward.
- JTBD format when useful: “When using [product/workflow], I want [desired outcome], so that [measurable or qualitative benefit].”
- For XinChao specifically, test the causal chain with real foreigner moments (e.g. Grab, ordering food, market, landlord) and avoid assuming that a feature automatically creates installs, revenue or retention.

## Reusable daily image template

- Saved reusable specification and master prompt at `assets/xinchao-one-moment-survival-card-template.md`.
- Default static-post format: **One-Moment Survival Card** — one real Vietnam moment → one exact Vietnamese line → direct English meaning → one concrete usage context → save CTA.
- Fixed 1080x1080 structure: top hook, realistic context image, central white rounded card, Vietnamese phrase largest, meaning and usage below, red save pill, small XinChao logo bottom-right.
- Brand palette: #FFBF18 yellow, #C91E24 red, #17191A near-black, #FFFFFF white, #FFF8E5 cream.
- Reuse this template for future daily static images unless user asks for a different format.
- Do not promise 100% consistency from image generation alone: exact typography/diacritics can still distort. For production-grade consistency, generate background/visual then overlay approved text in post-production/design tool and manually QA every image.
- Logo overlay rule: use the original supplied logo artwork as-is, without extracting or altering its background; a subtle rounded border is acceptable; keep opacity around 85–90% and place in a bottom corner without covering the scene.

## Facebook Page publishing workflow

- Connected Page: Xin Chào - Learn Vietnamese, Page ID `1060503283818917`.
- For image posts, use the Facebook connector tool `FACEBOOK_CREATE_PHOTO_POST` with `page_id`, a public direct image URL via `url`, `message` caption, and `published:true`.
- Local workspace paths and guessed `s3key` paths do not work with the connector; they return storage 404. Do not claim success after that error.
- Working upload method tested on 2026-08-30: upload the final PNG to Uguu via `curl -F 'files[]=@PATH' https://uguu.se/upload.php`, parse the returned JSON `files[0]` direct HTTPS image URL, then pass that URL to `FACEBOOK_CREATE_PHOTO_POST`. Verify the URL is direct image content before posting.
- Tmpfiles page URLs failed because Facebook could not download them as image uploads; prefer a host returning direct PNG/JPG MIME.
- After publishing, verify with `FACEBOOK_GET_POST` using the full composite post ID `PAGE_ID_POST_ID`, requesting `id,message,created_time,permalink_url,attachments,likes.summary(true),comments.summary(true),shares`.
- Only report posted after the connector returns `successful:true` and verification returns the post/permalink.
- For scheduled photo posts, use `FACEBOOK_CREATE_PHOTO_POST` with `published:false` and a future UTC `scheduled_publish_time`, then verify with `FACEBOOK_GET_SCHEDULED_POSTS` and confirm the post appears with `is_published:false`, the correct timestamp, message, and attachment. Do not treat a child-session completion event as success unless Facebook evidence is present.
- Recent successful test post: post ID `1060503283818917_122118229083298247`; permalink `https://www.facebook.com/122105551719298247/posts/122118229083298247`.
- Caption approach: useful English context first, exact Vietnamese phrase, direct English meaning, save/use CTA, then XinChao link. Keep promotional copy secondary to the learner value.

## Content production session workflow

- For the 7-day Facebook content flow and future daily posts, create/use one separate agent session per post where practical. Each session owns one post end-to-end: apply Customer Value Discovery, create background, overlay verified text/logo, QA, upload to direct public hosting, schedule Facebook, verify the post, and report its result.
- Keep the main session for coordination/status and final summary. Do not claim a post is scheduled until its dedicated session verifies successful Facebook publication/scheduling. If a child session is rate-limited or returns no evidence, the main session must verify current Facebook scheduled posts and complete the missing post directly.

## XinChao recurring Facebook scheduler

- Cron job `xinchao_daily_facebook_scheduler` was created on 2026-08-30 with job ID `c2651fc5-df4b-4065-8ea0-326a18a36300`.
- Schedule: every day at 10:15 Asia/Ho_Chi_Minh. It should create and schedule exactly one new XinChao static image post for the next open day after the latest existing scheduled post, publishing at 09:00 Asia/Ho_Chi_Minh.
- The job runs in an isolated agent session and announces results back to the web channel. It is authorized to create/schedule Facebook photo posts for Page ID `1060503283818917`.
- The job must check existing scheduled posts first, avoid duplicates, follow Customer Value Discovery, use the saved One-Moment Survival Card template, upload final PNGs to Uguu as direct image URLs, schedule with `published:false`, and verify with `FACEBOOK_GET_SCHEDULED_POSTS` before claiming success.

## XinChao performance tracking

- Google Sheet created on 2026-08-30: `XinChao Facebook Performance Tracker`.
- Spreadsheet ID: `1dZfU5bPiUitbhFXtesQX8YMk6jolgSRt1DG4i262XNY`.
- URL: https://docs.google.com/spreadsheets/d/1dZfU5bPiUitbhFXtesQX8YMk6jolgSRt1DG4i262XNY/edit
- Use this sheet as the default tracker for XinChao Facebook content performance. It currently contains the initial 7 scheduled posts and columns for post metadata, customer value, links, image paths, and metrics: reach, impressions, reactions, comments, shares, saves, link clicks, app installs, and notes.
- Weekly metrics cron job created on 2026-08-30: `xinchao_weekly_facebook_metrics_to_sheet`, job ID `6af9d3f4-d76c-460e-ab2d-571fcf40dbee`. It runs every Monday at 14:00 Asia/Ho_Chi_Minh in an isolated session. It should read Facebook performance metrics for known post IDs and update the Google Sheet without inventing unavailable metrics.
- As of 2026-08-30, Pinterest is not listed among connected apps/connectors. Cross-posting to Pinterest cannot be automated through connectors until Pinterest is connected or another approved posting path exists.
- Pinterest API access token is stored locally in `.env` as `PINTEREST_ACCESS_TOKEN`; do not copy the secret into memory, chat summaries, git, or logs. `.gitignore` excludes `.env` and `.env.*` except `.env.example`.
- Pinterest API token was validated on 2026-08-30 with `GET https://api.pinterest.com/v5/user_account`: account username `truongtritinbee`, account type `BUSINESS`, website URL `http://xinchao.app`.
- Default XinChao social captions should include branded/relevant hashtags, especially `#LearnVietnamese #VietnamCulture #XinChao`, adjusted by topic when useful.
- Do not reuse the same generated background across different live posts unless the user explicitly asks. Each live/static post should have a distinct background that matches its topic and angle, even when using the same visual template.
