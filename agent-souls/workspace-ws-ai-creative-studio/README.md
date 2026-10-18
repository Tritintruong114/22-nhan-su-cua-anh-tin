# AI Creative Studio

Studio tạo ảnh marketing/ecommerce cho **19 loại ấn phẩm**. Dashboard 3 tab: `/` **Tạo ảnh** (grid 19 use-case + masonry template LIVE, editor mở inline dạng overlay) · `/gallery` **Thư viện** · `/brand` **Thương hiệu**. Ảnh sinh qua `imageGenerationModel` của instance hoặc đường FREE (không có API key riêng trong workspace). Quyết định thiết kế đang chạy: [decision-log.md](decision-log.md).

⚠ **Hai tài liệu đã XOÁ 2026-08-26** (còn trong git history nếu cần tra): `SPEC-purpose-social-media.md`
(đặc tả route `/purpose` + `/social/*` + planner + QA — gỡ hết ở D28/2026-08-25) và `CHANGELOG-strip.md`
(nhật ký bản strip làm rỗng 3 tab — cả 3 tab đã dựng lại từ lâu, và nó còn dùng tên workspace cũ
`ws-lumo-studio`). Phần DUY NHẤT còn giá trị của CHANGELOG-strip là §4, đã chuyển xuống
[§Verify UI](#verify-ui--make-package-không-bắt-được) bên dưới.

## Architecture

- `install/manage.yaml` khai báo UI (`/`, `/gallery`, `/brand` — route `/purpose` đã xoá ở D28) bằng node stock + custom node ws-ai-creative-studio trong Renderer (`use-case-renderers/src/engine/use-cases/ai-creative-studio/`): `acs-app-header`, `acs-studio-home`, `acs-home-create-bar`, `acs-usecase-chips`, `acs-template-grid`, `acs-studio-editor`, `acs-job-dock`, `acs-library`, `acs-brand-kit` — ĐÚNG 9 node, và đó là toàn bộ danh sách `manage.yaml` mount. (Câu cũ còn kể `acs-purpose-asks` · `acs-image-set` · `acs-template-picker` "dùng bên trong editor": cả BA đã xoá và chưa từng có node nào trong số đó được `manage.yaml` mount — `git log --all -S` trên mọi manage.yaml trả 0 commit cho cả ba.) **Đọc [§Verify UI](#verify-ui--make-package-không-bắt-được) trước khi thêm node** — `make package` không validate `ui.routes`.
- `/gallery` = **Library** (`acs-library`): 2 view trên data thật — "Tất cả" (`/versions/list`) và "Theo nhóm" theo **use-case** (`/versions/groups` → `/versions/list?usecase=`). Bấm 1 ảnh → event `edit` → mở `acs-studio-editor` đúng version đã lưu (D33).
- `/brand` = **Brand kit** ("Thương hiệu") — node `acs-brand-kit` (port design ImgBrandTab): 1 hoặc nhiều bộ nhận diện, mỗi bộ = tên + bảng màu + 3 hàng ảnh (logo · tài sản · ảnh tham chiếu), kèm "Xưởng màu" 20 bảng màu. Kho THẬT là SQLite của plugin từ migration **v12** (2026-08-25): bảng `brand_kit` + `brand_asset`, CRUD qua `/brand/kits/*` + `/brand/assets/*`; localStorage (`oc-uc:acs-brand:v1:<ws>:<instance>`) chỉ còn là cache khởi động + đường import bản cũ. `/uc/generate` **có** nhận `brand_colors` (`src/uc/contract.ts:54` → `pipeline.ts:268`) nên bảng màu ĐI VÀO prompt vẽ; `/asks` cũng đọc nó để khỏi hỏi lại về màu. Nút "Trích xuất" từ website/PDF đi qua `/brand/extract` + `/brand/extract-file` (thật, không phải giả lập). Tab chỉ hiện khi `header.on.gotoBrand` được wire (WIRE = HIỆN).
- `agent-ai-creative-studio/` là bộ prompt của agent (SOUL/IDENTITY/USER/AGENTS) — đây là brain của use-case.
- `agent-ai-creative-studio/plugins/ai-creative-studio/` là plugin in-instance: `/verify` (step `check_llm` của setup wizard — đừng xoá), `/templates/search` + `/styles/list` + `/usecases/list` (proxy catalog), `/asks` + `/asks/status` (một lượt LLM đọc yêu cầu → `questions[]`, tự chain sang gen khi đủ rõ), **`/uc/generate` + `/uc/status`** (job async tạo ảnh cho CẢ 19 use-case — contract lock ở `src/uc/contract.ts`), `/uc/trace` + `/uc/prompts`, `/brand/*` (kits · assets · extract), `/projects/*` + `/versions/*` (CRUD SQLite; `/versions/image?format=data` trả data-URL vì kit không auth được `<img src>` — xem D33).
  ⚠ **Đã XOÁ, đừng viết lại vào tài liệu**: `/social/generate` + `/social/status` + module `src/social/` (2026-07-26) · `/uploads` (ảnh giờ đi kèm body) · `/generate` + `/status` (đường Home legacy) · `/classify` + `/classify/status` (2026-08-25 — lượt chọn use-case chuyển vào TRONG `/asks`).
- `skills/` chỉ còn `setup-ai-creative-studio` (luồng cài đặt, bắt buộc theo root CLAUDE.md). Ba playbook chat `sang-tao`/`brand-check`/`ecom-rules` đã gỡ — agent giờ chạy thuần trên prompt bundle `agent-ai-creative-studio/`. Gateway auto-load qua `skills.load.extraDirs`.

## Local verification

```bash
cd scripts/setup-manifest && bun test
make check-drift WS=ws-ai-creative-studio
make package WS=ws-ai-creative-studio
```

## Verify UI — `make package` KHÔNG bắt được

`scripts/setup-manifest/validator.mjs` chỉ walk `ui.view` / `ui.screens` / `ui.components` — **không bao
giờ descend vào `ui.routes`**, mà 100% view tree của use-case này nằm ở `ui.routes`. Node type sai dưới
`routes:` **pass `make package` im lặng** và chỉ vỡ lúc dashboard load.

Cách verify thật — chạy zod THẬT của Renderer (đã dùng lại 2026-08-26):

```bash
# trong repo use-case-renderers, tạo 1 file test tạm rồi xoá
cat > src/__v.test.ts <<'EOF'
import { readFileSync } from 'node:fs';
import { expect, it } from 'bun:test';
import YAML from 'yaml';
import { validateUiSpec } from '@/schema/ui/validate-ui-spec';
it('manage.yaml hợp lệ', () => {
  const p = '<đường-dẫn>/use-case/ws-ai-creative-studio/install/manage.yaml';
  const res = validateUiSpec(YAML.parse(readFileSync(p, 'utf8')).ui);
  if (!res.ok) console.log(res.errors.join('\n'));
  expect(res.errors).toEqual([]);
});
EOF
bun test src/__v.test.ts && rm src/__v.test.ts
```

Ba luật hay vi phạm nhất (verify bằng zod, không đoán):

1. **`view:` là key DUY NHẤT không optional trên route.** Tab rỗng = `view: { type: stack }`. Bỏ hẳn
   key `view:` → `routes.0.view: Required` → **hỏng CẢ dashboard**, không riêng tab đó.
2. **`on_enter:` / `on:` / `submit.action` phải khai trong `actions:`.** Thêm node có `on:` mà quên
   khai action → `action "<tên>" not declared`.
3. **`nav` path phải khớp route đã khai** (chiều ngược lại thì không — route không có nav item vẫn hợp lệ).

⚠ **Bẫy false-negative:** `validateUiSpec` chạy `uiSpecSchema.safeParse` TRƯỚC rồi **return sớm nếu
fail**. Nên một lỗi schema ở `nav.label` sẽ **short-circuit toàn bộ lint layer** (on_enter, nav→route
không bao giờ chạy) và bạn nhận về "chỉ 1 lỗi" trong khi còn cả đống chưa ai soi.

Không thêm key provider ảnh vào workspace: ảnh sinh qua `imageGenerationModel` cấu hình ở instance (`agents.defaults`), plugin không giữ key riêng.
