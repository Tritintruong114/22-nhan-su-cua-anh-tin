# AGENTS.md — ws-seo-agent subagent bundle

This subagent backs the **ws-seo-agent** use-case — SEO content management.

Host workspace files referenced by absolute path (`~/.openclaw/workspace/AGENTS.md`).

## ⚠ Yêu cầu MODEL — tối thiểu `gpt-5.4`

Mọi tác vụ lõi của agent chạy qua **model của instance** (agent model, resolve lúc
request — plugin KHÔNG hardcode model): phân tích business-info (crawl → profile),
gom cụm chủ đề / lập kế hoạch từ khoá, viết & tối ưu bài, và audit SEO. Đây là các
route SYNC bị chặn ~28s (< proxy 30s) nên cần model **vừa đủ mạnh vừa NHANH**.

**Model tối thiểu: `gpt-5.4` (lớp 5.4 trở lên / tương đương).** Model yếu hoặc
chậm hơn — ví dụ `toc/auto` route sang model chậm — sẽ vượt ngưỡng thời gian: audit/
phân tích trả **502**, còn outline/business-info ra rỗng.

**Agent PHẢI cảnh báo user.** Khi user chat mà một tác vụ liên tục fail với lỗi
timeout / "model chưa cấu hình" / 502, hãy nói THẲNG với user rằng model đang chạy
có thể quá yếu hoặc chậm, và đề nghị họ đổi model của agent lên tối thiểu
`gpt-5.4`. KHÔNG im lặng retry vô hạn — nêu rõ yêu cầu model để chủ site sửa,
rồi mới tiếp tục.

## What ships here

- `agent-seo-agent/plugins/seo-agent/` — in-instance plugin that manages an SQLite
  database (site, topic, blog tables) and serves CRUD HTTP routes for the
  operation dashboard. Lazy-migrates on startup via `PRAGMA user_version`.

## Data model

```
Site → Topic → Blog (pillar | support)
```

Each Blog has: title, primary_keyword, keywords (JSON), status, content, slug, wp_post_id.

## Database location

`~/.openclaw/workspace-ws-seo-agent/user_data/db/seo-agent.db`

Plugin creates this file automatically on first startup. Migration is incremental —
existing data is never lost on update.

## Agent tools (Content Backlog)

The plugin registers these agent-callable tools (no runtime tool enumeration
exists — they are documented here so the agent knows them). Behavior that drives
them lives in [SOUL.md](SOUL.md) → *Content Backlog — chủ động viết & tối ưu bài*.

```
seo_write_blog(blogId)      → { blogId, wordCount, title, image_notice }          (owner-only)
seo_generate_images(blogId) → { ready, failed, pending, pending_upload } (owner-only)  // vẽ ảnh: 1 ảnh đại diện + tối đa 3 ảnh trong bài. CHỜ tới khi ảnh xong (~30s) rồi mới trả → báo được con số THẬT. `available:false` = instance chưa sinh được ảnh, đọc nguyên `message` cho user
seo_optimize_blog(blogId)   → { blogId, wordCount, title, regenerated } (owner-only)  // FULL rewrite (outline regen)
seo_apply_fixes(blogId)     → { blogId, wordCount, title } (owner-only)  // SURGICAL PREVIEW: edit ONLY the ticked SEO Health findings (read from the blog's audit context) into a before/after preview, keep the rest + the article's ORIGINAL language byte-for-byte. Does NOT save/publish — commits only when the user clicks the panel save button (label follows the site platform: "Lưu lên WordPress", "Lưu lên Haravan", …)
seo_pending_offer()         → { pending, blog_id?, verb?, keyword? } (owner-only, consume-once, TTL 15m)
seo_check_duplicates(siteId?) → { total, truncated, blogs[]{id,keyword,title,topic,status,has_content,lang}, obvious_groups[] } (owner-only, READ-only)  // keyword cannibalisation — YOU judge, the tool only hands you the WHOLE keyword map. `obvious_groups` = a cheap string-only pre-pass (identical / same word-set / ≥80% overlap, already scoped PER LANGUAGE): treat as already-confirmed. Your job is what strings can't see: same SEARCH INTENT, different words ("cách cài đặt X" ⟷ "hướng dẫn setup X" = ONE group; "X là gì" vs "giá X" = DIFFERENT intents, keep apart). NEVER group across `lang` ("openclaw là gì" vi vs "what is openclaw" en = one article for two markets, different SERPs, cannot cannibalise) — code drops cross-language ids anyway
seo_flag_duplicates(siteId?, groups[]{keyword,blog_ids[],reason}) → { group_count, blog_count } (owner-only)  // ALWAYS call right after judging, BEFORE answering — the SEO map reads this to highlight exactly the articles you describe — it writes NOTHING to the database (in-memory, this check only), so never tell the user anything was "saved" (empty groups = clear the highlight, still report "không có bài nào trùng"). In-memory + on-demand: nothing is persisted, a gateway restart just falls the map back to the string pre-pass. Then REPORT each group: keep the article that already has content, merge/re-target the rest, flag cross-topic ones; NEVER delete anything

seo_preview_keyword_import(keywords?, googleSheetUrl?, siteId?, kwCol?)   // EITHER keywords (inline chat list) OR googleSheetUrl
    → { import_id, site, mode, cluster_count, keyword_count, clusters[]{topic,pillar,keywords[]}, uncategorized[], uncategorized_count }  (owner-only, NO write)
seo_confirm_keyword_import(import_id)
    → { topics, blogs }                                             (owner-only, writes DB)
```

Rules:
- The OFFER (state + suggestions) is shown DETERMINISTICALLY by the system when a
  card opens (a `chat-say` bubble + button) — the agent does NOT read state or offer.
  There is NO `seo_get_blog_state` step; the offer is built server-side from
  `getBlogState` via the `blogs/ensure-outline` route.
- The agent is invoked ONLY by the offer BUTTON: "Viết full bài cho bài #ID" →
  `seo_write_blog(ID)`; "Tối ưu lại bài #ID" → `seo_optimize_blog(ID)`. Call the tool
  DIRECTLY — no state read, no re-confirm (the button click IS the confirmation).
- `seo_write_blog` / `seo_optimize_blog` self-read the blog from the DB and write per
  the `seo-blog-writing` skill (write-vs-optimize is chosen by the button, not status).
- **ẢNH = luôn đi qua skill `blog-images`, không tự chế, và CHỈ khi người dùng vừa yêu cầu.**
  Vẽ ảnh tốn tiền thật, nên có ĐÚNG BA cửa được phép gọi `seo_generate_images(ID)`:
  1. ngay sau `seo_write_blog` (viết bài mới) — `image_notice` sẽ nhắc;
  2. ngay sau `seo_optimize_blog` (người dùng bấm "Tối ưu bài viết") — cũng qua `image_notice`;
  3. người dùng nói thẳng "tạo ảnh / thêm ảnh / làm thumbnail cho bài này".
  ⛔ NGOÀI ba cửa đó thì KHÔNG BAO GIỜ tự gọi: mở một bài cũ ra xem, thấy bài thiếu ảnh, đọc
  SEO Health, quét danh sách bài… đều KHÔNG phải lý do để vẽ. Bài có sẵn mà chưa có ảnh thì cứ
  để yên, chỉ nhắc là có thể tạo nếu người dùng muốn.
  Đọc `skills/blog-images/SKILL.md` để biết cách đọc kết quả (`pending` = còn chạy nền, đừng gọi
  lại để hỏi; `available:false` = instance chưa sinh được ảnh, đọc nguyên `message`, ĐỪNG bảo
  user "đổi model"). Tuyệt đối không tự chèn thẻ `<img>` vào bài — code chèn + đẩy WordPress,
  agent chèn tay sẽ tạo ảnh mồ côi.
- SEO Health "Viết lại N mục đã chọn": the fix panel pings *"Áp dụng các đề xuất SEO Health đã chọn
  cho bài #ID … chạy ngay seo_apply_fixes"*. Call `seo_apply_fixes(ID)` DIRECTLY — it reads the ticked
  findings from the blog's audit context and edits ONLY those into a before/after PREVIEW, keeping the
  rest + the article's ORIGINAL language. It does NOT save or publish — the user reviews the preview and
  commits by clicking the panel save button — name it after the SITE PLATFORM, never "WordPress" by default. So report the edit is READY TO REVIEW; do NOT claim it was
  saved/updated. Do NOT fall back to `seo_optimize_blog` (that regenerates the whole body from the
  outline and can flip the language) — `seo_apply_fixes` IS the tool for "apply specific fixes / giữ
  nguyên phần còn lại". It always exists; if unsure, call it (never tell the user it's missing).
  If `seo_apply_fixes` returns `{ ok:false }` with a JSON / generation error (long article, the model
  couldn't emit valid JSON), RELAY that message: tell the user the article is too long for the current
  model and to switch to a STRONGER model (stronger than gpt-5.4-mini) then retry. Do NOT just say
  "try again" on the same model, and do NOT blame the user's selected items — it's a model limit.
- Keyword Tracker proactive offer (declining row): the `blogs/suggest-on-click` route
  ALSO persists the latest offer (`pending_offer` in `kv_cache`). So the user can skip the
  button and just type "ok" — the agent calls `seo_pending_offer()` to get `{blog_id, verb}`
  of the MOST RECENT offer, then `seo_write_blog`/`seo_optimize_blog`. Consume-once + 15m TTL
  + cleared on any write → a stray/late "ok" won't rewrite. Behavior lives in SOUL.md.

## Agent tools (Keyword import via chat)

Let the user add keywords by chatting — EITHER an **inline keyword list** they paste/type
(e.g. "add keyword: test 1, test 2, test 3") OR a **Google Sheet link** (no CSV/file upload).
Runs headless via the tool — the agent does NOT send the user to the "+ Add → Keyword" UI.
Two-step, preview-then-confirm (mirrors the blog OFFER's OK gate):

1. `seo_preview_keyword_import(keywords?, googleSheetUrl?, siteId?, kwCol?)` — clusters the
   keywords WITHOUT writing. Pass `keywords` (array) for an inline chat list; pass
   `googleSheetUrl` for a sheet. Inline lists + raw sheets are LLM auto-clustered; a sheet with
   a filled Topic column is grouped by topic. Returns a preview (topics, the full keyword list
   per topic with the pillar marked, uncategorized) + an `import_id`. If several sites exist and
   `siteId` is omitted, returns `needs_site: true` + the site list → ask the user which site,
   call again with `siteId`.
2. After preview, SHOW the topic→keyword mapping and ASK the user to confirm. ONLY on their OK
   call `seo_confirm_keyword_import(import_id)` — it writes the previewed plan to the tracker
   (append mode: dedupes topics by title + keywords site-wide) and returns `{ topics, blogs }` =
   the count of NEW rows ACTUALLY written after dedupe, which may be LOWER than the previewed
   keyword_count when some keywords/topics already exist. Report the confirm-returned numbers
   (note any skipped duplicates) — not the preview count — then tell the user to refresh the
   Keyword Tracker.

Both reuse the SAME `commitPlan()` the FE "+ Add → Keyword" flow uses, so chat and UI write
identically. Confirm reads the cached plan, so it commits EXACTLY what was previewed.

## Routes served

```
GET  /api/ws-seo-agent/seo-agent/sites/list
POST /api/ws-seo-agent/seo-agent/sites/save
POST /api/ws-seo-agent/seo-agent/sites/delete
GET  /api/ws-seo-agent/seo-agent/topics/list?site_id=
POST /api/ws-seo-agent/seo-agent/topics/save
POST /api/ws-seo-agent/seo-agent/topics/delete
GET  /api/ws-seo-agent/seo-agent/blogs/list?topic_id=
POST /api/ws-seo-agent/seo-agent/blogs/save
POST /api/ws-seo-agent/seo-agent/blogs/delete
GET  /api/ws-seo-agent/seo-agent/db/status
```

The editor (Content Backlog) additionally uses: `GET /blogs/editor?id=`,
`POST /blogs/generate-outline`, `POST /blogs/ensure-outline`,
`POST /blogs/generate-content`, `POST /blogs/sync-content`, `POST /blogs/save-draft`,
`POST /blogs/links/{add,remove}`, `POST /blogs/{add,remove}-secondary`.

The Keyword Tracker uses `POST /blogs/suggest-on-click { id, decline_pct? }` to gate
the proactive "viết lại" chat offer: returns `ok:true` + `offer_message`/`cta_label`/
`cta_prompt`/`agent_offer_prompt` ONLY when the blog is declining (`tag='need_rewrite'`
& published, i.e. `needs_audit`, OR `decline_pct ≤ -10`); otherwise `ok:false` so the
`on_success` chat-say bubble is skipped (action engine has no `when` gate — see the
UI-event flow in SOUL.md).

## Lịch đăng bài — giữ dây chuyền luôn có bài (heartbeat)

Mỗi bài trên bản đồ chiếm ĐÚNG một ngày trong lịch (`blog.scheduled_at`, một bài/ngày). Trạng
thái không phải một cột mà được SUY RA: chưa có `content_html` → **Chưa viết**; có nội dung mà
`approved=0` → **Chờ duyệt**; `approved=1` chưa live → **Chờ đăng**; có `published_at`/WP đang
`publish` → **Đã đăng**.

Luật vận hành: **luôn có sẵn 5 bài đã viết ở đầu hàng**. Lịch mà tới ngày mới bắt đầu viết thì
ngày nào cũng là ngày trễ hạn — nên viết trước, và chỉ viết trước 5 bài (viết cả 20 bài rồi
người dùng đổi hướng là phí sạch).

Mỗi lần heartbeat (1 lần/ngày là đủ), gọi:

```
POST /api/ws-seo-agent/seo-agent/blogs/ensure-pipeline { "site_id": <id> }
```

Nó tự đếm số bài đã viết đang chờ, và chỉ viết bù phần thiếu (trả `{ ready, started[] }`).
KHÔNG cần hỏi người dùng — đây là việc nền, không tốn quyết định của họ. Bài viết xong nằm ở
**Chờ duyệt** trong Content Backlog; chỉ chủ site mới bấm Duyệt, agent không tự duyệt.

Route lịch khác: `GET /blogs/calendar?site_id=&month=YYYY-MM` (lịch tháng, tự đối chiếu trạng
thái thật trên WordPress), `POST /blogs/approve { id }` (duyệt 1 bài),
`POST /blogs/publish-approved { site_id }` (nối WP xong → đẩy mọi bài đã duyệt: tương lai hẹn
giờ, quá hạn đăng ngay).
