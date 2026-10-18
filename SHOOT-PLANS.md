# Shoot Plans

## 2026-10-05 - P0 Sales Agent Tutorials

### Current Product State
- Bundle verify: 29 passed, 0 failed.
- Installed plugins: Facebook Messenger, Facebook Pages, Sales Manager, Web Widget, Zalo OA Connect, Zalo OA.
- Live shop state: already live, vision on, nightly learning on, one Facebook page connected.
- Missing for a convincing live demo: product catalog, payment method, owner notifications, Web channel, Zalo recorder health.
- Last 7 days: 0 conversations, 0 orders. Use curated demo/screenshots for tutorial flow, then record live configuration steps separately.

### Blockers To Fix Before Recording
- Zalo recorder is not receiving messages because `openzca` is missing. Repair path shown by health check: `bash /home/node/.openclaw/workspace-ws-zalo-assist-agent/install/config.sh install-openzca`.
- Catalog has 0 products. Add at least 3 realistic sample products before recording the product and chat-test tutorial.
- Payment is not configured. Enable COD or QR before recording the order tutorial.
- Owner notifications are not connected. Decide whether Telegram or Zalo bot is the tutorial default.

### Tutorial 1
- Title: Cai Nhan vien AI ban hang da kenh trong 10 phut
- Goal: Show the owner journey from empty shop to ready-to-test staff.
- Runtime target: 8-10 minutes.
- Story mode: Demo-first onboarding.
- Hook: "Neu shop cua anh co Facebook, Zalo va website, mot nhan vien AI co the truc ca ba noi trong mot dashboard."
- Screen explain: Marketplace/install, Agent Dashboard, 6 tabs, run switch, shop profile, product setup.
- B-roll: Desk shot, dashboard scrolling, close-up of "Dang truc", tab navigation.
- Ending: Owner has shop profile + products + one connected channel + Chat thu next.

### Tutorial 2
- Title: Day Nhan vien AI tu van dung san pham va len don nhap
- Goal: Demonstrate catalog-driven answer, customer intent, draft order, and owner approval.
- Runtime target: 8-12 minutes.
- Story mode: Real workflow demo.
- Screen explain: Add/edit products, Chat thu as customer, staff recommends product, creates draft order, owner reviews.
- B-roll: Screenshot `assets/screenshots/01-tong-quan.png`, product card close-ups, order card close-up.
- Key lesson: AI should not invent products or close orders without owner confirmation.

### Tutorial 3
- Title: Ra soat va dao tao Nhan vien AI sau khi da chay
- Goal: Show how owner checks conversations, finds weak replies, and turns them into approved lessons.
- Runtime target: 8-10 minutes.
- Story mode: Trust-building coaching.
- Screen explain: Conversations tab, cases needing help, review conversation, training/coaching loop, owner approval.
- B-roll: Screenshot `assets/screenshots/02-hoi-thoai.png`, hand notes on lesson examples, dashboard filter/search.
- Key lesson: Human-in-loop is the safety story: AI suggests, owner approves.

### Camera Plan
- DJI: A-roll talking head, desktop/monitor B-roll, over-shoulder dashboard navigation.
- iPhone 11 Pro Max: Macro inserts of mouse/keyboard, product notes, phone notification shots.
- Audio: DJI mic.
- Lighting: Softbox as fill; keep monitor glow visible but not overexposed.

### Prep Tonight
- Repair Zalo recorder or explicitly skip Zalo live demo and say Zalo setup is a separate connector video.
- Seed catalog with 3 sample products and one clear upsell/cross-sell pair.
- Configure payment path for the order tutorial.
- Prepare 5 customer prompts for Chat thu: ask price, ask color/stock, compare two products, ask shipping/payment, commit to buy.
- Use curated screenshots for hero/thumbnail and record live dashboard clips for credibility.

## 2026-08-06 - AI Agent 101 Ep 1

### Video
- Title: Ai cũng nói AI Agent. Nhưng nó là cái quái gì vậy?
- Runtime target: 8-9 minutes
- Story mode: Authority explainer + cultural reframing
- Sheet: https://docs.google.com/spreadsheets/d/13OsxJJlzejYMJkrkJFBj0SvL_eaAcopPLKXcQs110SM/edit

### Story Spine
- Hook: Jensen Huang, Zuckerberg, Sam Altman all talk about agents, but most people still do not know what an AI Agent actually is.
- Core insight: An agent is not just a smarter chatbot. It is a digital worker that can receive a job, read context, use tools, produce output, and operate inside a working environment.
- Anchor example: Chatbot gives advice for preparing a workday. Agent reads calendar/email and returns a daily brief with priorities.
- Product lesson: Define agents by the work they take responsibility for, not by the tech first.
- Closing line: If ChatGPT is where you talk to AI, agent is where you start giving work to AI.

### Shoot Blocks
- A-roll: Main explainer, shot on DJI at desk, medium close-up.
- B-roll: AI headline montage, desk setup, scrolling news, email/calendar/docs mock, screen examples.
- Macro: Hand scrolling trackpad, writing `agent`, `may cay`, `internet`, `lao dong so`, touching monitor, typing 2-3 short bursts.
- Screen explain: 3-column slide `Chatbot / Assistant / Agent`; slide `Internet -> information` and `Agent -> digital labor`.
- Props: Notebook, pen, 2 monitors, Mac mini, speakers, phone, clean desk.

### Camera And Lighting
- DJI: Main camera for A-roll, establishing desk shot, over-shoulder screen/desk cutaways.
- iPhone 11 Pro Max: Macro inserts only: notebook, trackpad, keyboard, close screen details.
- Audio: DJI mic for all spoken A-roll and any room-tone pickup.
- Lighting: Softbox as fill, 35-45 degrees from face and slightly above eye level. Keep monitor glow as practical light.

### Production Notes
- Keep ClawExperts as a soft bridge: "noi nguoi tho so co xuong de lam viec that", not a feature walkthrough.
- Avoid turning Jensen/Zuck/Altman into empty name-drops. Use them only as cultural proof, then quickly move into the plain-language definition.
- Most important visual: the chatbot vs assistant vs agent comparison slide.
- Most important example: daily brief from calendar + email.

### Efficient Shoot Order
- Setup 1: DJI talking head, record all A-roll in one pass.
- Setup 2: Screen recording/headline montage and slides.
- Setup 3: DJI desk B-roll and over-shoulder shots.
- Setup 4: iPhone macro inserts.
- Setup 5: Pickup close talking-head line for final definition.
