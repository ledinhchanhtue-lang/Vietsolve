# VietSolve — Website

## Định vị
**VietSolve — Agency Sáng tạo & Công nghệ.** Không phải công ty AI thuần túy.
Kết hợp: Branding · Strategy · Marketing · Growth · Media · Creative · Website · Digital Products · AI · Automation.
AI/Automation là năng lực nổi bật mới, **không lấn át** Branding/Marketing/Media.

## Repository
- **Fork đang push:** https://github.com/ledinhchanhtue-lang/Vietsolve — branch `local-update`
- **Backup bản dark cũ:** branch `backup/dark-ai-redesign` (đừng xóa)
- **Local:** `D:\Công việc\Viet Solve\Vietsolve`

## Tech stack
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 3 · framer-motion · static export (`output: 'export'`).
```bash
npm install
npm run dev
npm run build    # → out/
npx wrangler pages deploy out --project-name=vietsolve --branch=main --commit-dirty=true
```

## ⚠️ THEME TRẮNG — ĐỪNG ĐỔI SANG DARK
Website đã từng bị redesign thành dark AI-agency rồi **hoàn nguyên về theme trắng** (khôi phục từ commit `6a3c307`). Bản dark nằm ở branch `backup/dark-ai-redesign`.
- Nền trắng, font Inter (+ Pacifico cho chữ nhấn), màu đỏ nhận diện `red-600/700`.
- Header nổi bo tròn `navbar.tsx`, menu: **Trang chủ · Về chúng tôi · Dịch vụ · Case Study · Blog · Liên hệ** + VI/EN + CTA "Liên hệ ngay".
- **KHÔNG** dùng lại: obsidian bg, system-node graph, workflow canvas, chim Lạc data-constellation, menu "Năng lực/Hệ thống AI/Dự án".

## ⚠️ KHÔNG BAO GIỜ RENDER DỮ LIỆU GIẢ
Đã xóa sạch: badge Google Partner/BBB A+ · SĐT `+1 (555) 123-4567`, `0909.xxx.xxx` · 2 địa chỉ mâu thuẫn (Tôn Đức Thắng / Saigon Centre-Lê Lợi) · map giả · ROI calculator USD · dashboard số liệu giả (+23%, 15.2K, 9/10, #1) · 9 blog giả · 6 case giả + metric bịa · bảng giá Start/Grow/Scale · tên khách hàng gán sai (Rabity/Nordic/Ladipage) · `motionmedia.com` · form giả setTimeout.

**Cơ chế chặn:**
- `lib/site-config.ts` — contact có cờ `verified`; UI **chỉ render khi `verified === true`**. Điền giá trị thật rồi đổi cờ → section tự hiện.
- `lib/content/projects.ts` — `metrics: []` mặc định, chỉ thêm khi có `source`. `image: null` → tự sinh visual thương hiệu.
- `lib/content/insights.ts` — rỗng; Blog ẩn khỏi nav + noindex tới khi có bài (`published: true`, tác giả + ngày thật).

## Cấu trúc
```
app/
  page.tsx           # Homepage (7 section)
  services/ case-studies/ about/ blog/ contact/ privacy/ terms/
  sitemap.ts robots.ts not-found.tsx layout.tsx
lib/
  site-config.ts     # ⭐ nguồn contact (cờ verified)
  i18n.tsx           # VI/EN (translations.vi / .en, as const)
  content/
    services.ts      # ⭐ 6 nhóm dịch vụ (homepage + /services dùng chung)
    projects.ts      # 4 dự án thật
    insights.ts      # rỗng (Blog empty state)
components/
  ui-kit/button.tsx  # ⭐ 4 loại button duy nhất của cả site
  tech/              # ⭐ lớp hiệu ứng công nghệ (backdrop, layer, hero, logo LED, divider)
  project-visual.tsx # visual sinh theo slug khi dự án chưa có ảnh thật
  navbar.tsx animated-footer.tsx hero.tsx
  three-pillars.tsx innovative-services.tsx featured-projects.tsx
  how-we-work.tsx home-cta.tsx
  solutions-page.tsx (services) about-page.tsx case-studies-page.tsx
  contact-page.tsx blog-page.tsx legal-page.tsx
  ui/ (shadcn)
```

## ⚠️ About = 7 section cố định
Hero (copy + visual 45/55) → VietSolve là ai (manifesto + 3 statement typography) → Giá trị cốt lõi (1 lần duy nhất) → **Chim Lạc signature** → Hệ sinh thái năng lực (constellation) → Đội ngũ (diagram SVG) → Final CTA. **Đừng thêm lại**: 3 intro card trùng ý, sidebar "Định vị"/"Giá trị cốt lõi" mini, danh sách 01–07. Mỗi ý đúng 1 lần.

## Homepage journey (7 section)
Hero → 3 trụ cột (Intelligent/Creative/Innovation) → Hệ sinh thái dịch vụ (6 nhóm) → Dự án tiêu biểu (4 dự án) → Quy trình (3 bước) → Final CTA → Footer.
**AI/Automation** là 1 trong 6 nhóm dịch vụ — không có section AI riêng, không workflow demo trên homepage.

## 6 nhóm dịch vụ (`lib/content/services.ts`)
Branding & Strategy · Marketing & Growth · Media & Creative · Website & Digital Products · AI Agents & Automation · Data, SEO & Analytics.
Homepage: tên + 1 câu + 3 highlight + link. `/services`: danh sách đầy đủ + anchor `#id`.

## ⚠️ Icon system — dùng `components/ui-kit/icon-tile.tsx`
**Mọi icon trên site đi qua `<IconTile icon={X} size="sm|md|lg" tone="light|dark" />`.** Một size ramp (40/48/56px), stroke 1.5, khung hairline, corner accent, hover đỏ + bloom.
- **Đừng** render `<Icon className="h-9 w-9" />` trần, **đừng** bọc icon trong ô gradient đỏ đặc.
- Đặt IconTile trong `.group` → nó sáng theo card.

**Ngôn ngữ icon (lucide) — đã bỏ hết cliché.** `Brain` `Cpu` `Rocket` `Lightbulb` `Sparkles` `Zap` `Users` đều đã gỡ khỏi codebase, đừng đưa lại:

| Ngữ cảnh | Icon |
|---|---|
| 3 trụ cột | `Radar` · `Shapes` · `Waypoints` |
| Quy trình 3 bước | `Search` · `PenTool` · `Route` |
| 6 nhóm dịch vụ | `Compass` `TrendingUp` `Clapperboard` `AppWindow` `Workflow` `BarChart3` |
| About | `Handshake` · `Layers` · `Sparkle` · `Boxes` · `Compass` |

## ⚠️ Visual support — đừng để trang chỉ có chữ + box
| Component | Dùng ở đâu |
|---|---|
| `service-visual.tsx` | 6 composition SVG riêng cho 6 nhóm dịch vụ (homepage + /services). Key theo `group.id` — **thêm nhóm mới phải thêm composition**, không sẽ render rỗng. |
| `project-visual.tsx` | Thumbnail dự án: có ảnh thật → khung browser chrome; chưa có → visual sinh theo slug |
| `lac-signature.tsx` + `about-hero-visual.tsx` | **NGUYÊN LOGO** trace từ PNG (`lib/lac-path.ts`, potrace): chim 2 subpath + wordmark 12 subpath, tách 2 layer. **CHỈ VIỀN — không bao giờ tô fill** (chủ website yêu cầu: tô vào mất chất công nghệ). Chim vẽ viền đỏ trước, chữ vẽ charcoal sau. Logo đổi → trace lại, không sửa path tay. |
| `capability-constellation.tsx` | Hệ sinh thái 7 năng lực dạng hub + node (desktop) / pills (mobile). Mô tả lấy từ tagline services.ts — không viết copy mới. |
| `pillar-visual.tsx` | 3 micro-drawing giá trị cốt lõi (dùng chung homepage + About) |

## ⚠️ Language switcher VI/EN
Segmented switch trong `navbar.tsx` (`LanguageToggle`): capsule trắng viền xám, **thumb đỏ trượt** bằng `translate-x` (compositor-only, tắt ở reduced-motion), 2 cell cố định `w-10` để thumb trượt đúng 1 slot, `aria-pressed` cho trạng thái. **Đừng đổi lại thành 2 ô đỏ đặc kiểu utility.**

## ⚠️ Services showcase — `components/service-showcase.tsx`
Desktop (lg+): rail 6 tab trái + stage phải, đúng semantics tablist/tab/tabpanel + phím mũi tên (roving tabindex). Mobile giữ card xếp chồng (vẫn mang `id` anchor). Deep-link `/services#<group.id>` tự chọn tab. **Đừng xóa card mobile** — anchor từ homepage phụ thuộc vào chúng.

## ⚠️ Contact query param
`?service=<id>` nhận mọi `group.id` thật (kể cả `data-seo-analytics` → map về Marketing & Growth vì form không có option Data riêng), auto-select tile + scroll tới `#contact-form`. Thêm nhóm dịch vụ mới thì phải thêm mapping trong `contact-page.tsx`.

## ⚠️ Pseudo-3D depth — dùng đúng 2 pattern này
- **Panel stack** (hero): container `perspective` + `preserve-3d`, layer con `translateZ` âm dần + shadow làm depth. Chỉ hiện ≥ xl **và hero content phải giữ `xl:pr-[360px]`** — bỏ padding đó là headline chui xuống dưới stack (đã đo 96px chồng thật ở 1280).
- **Offset plate**: `<span aria-hidden className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl border border-red-100/80 bg-gradient-to-br from-red-50/70 to-gray-50" />` đặt TRƯỚC card trong 1 wrapper `relative` (form Contact, featured project, visual Blog). Không nghiêng xoay liên tục, không 3D nặng.

## ⚠️ Button system — dùng `components/ui-kit/button.tsx`
4 loại: `PrimaryButton` (đỏ đặc, 48px, light sweep + glow) · `SecondaryButton` (viền, wipe đỏ nhạt) · `TextLink` (underline chạy trái→phải) · `IconButton` (44×44 + `aria-label`).
Loại thứ 5 cho form: **`components/ui-kit/chip.tsx`** — `SelectableChip` (radio, selected có inner glow + badge check) và `Tag` (pill read-only cho deliverable/highlight).
- **Đừng dùng lại `animated-button.tsx`** cho CTA mới — nó từng co lại thành hộp 20px và nhận `variant="slim"` không tồn tại.
- Mọi tap target đứng riêng phải ≥ 44px (WCAG 2.5.8). Link nằm giữa câu văn được miễn.

## ⚠️ Tech effect system — `components/tech/`
Lớp hiệu ứng công nghệ dùng chung cho cả site. **Đừng tự chế pattern riêng cho từng section.**

| File | Vai trò |
|---|---|
| `tech-backdrop.tsx` | Nền tĩnh toàn site (grid + aura + circuit). **Thay cho** `animated-background/background-paths/background-stripes` đã xóa |
| `tech-layer.tsx` | Bọc mọi lớp trang trí có animation; IntersectionObserver bật/tắt `data-tech-active` → CSS pause khi ngoài viewport |
| `hero-tech.tsx` | Nền hero: grid L2 + 3 trace + node + parallax chuột |
| `led-logo.tsx` | Logo + dải sáng LED (mask bằng chính file PNG → sáng chạy theo contour chim Lạc) |
| `tech-divider.tsx` | Divider có đèn chạy + node pulse |

**Pattern 3 cấp** (class trong `globals.css`, tiền tố `vs-`):
- `.vs-grid-1` subtle — section nhiều chữ
- `.vs-grid-2` medium — hero, services, contact, case hero
- `.vs-grid-3` accent — CTA, hover card, footer

**Luôn kèm mask** (`.vs-mask-center` / `-corner` / `-up` / `-down`) để pattern không chạy dưới chữ.

**Quy tắc bắt buộc:**
- Mọi animation lặp phải có class `.vs-anim` → mới pause được khi ngoài viewport và tắt được ở `prefers-reduced-motion`.
- Layer chỉ desktop thì thêm `.vs-desktop`.
- Neon chỉ ở hover / active / line / 1 từ trong heading. **Không** glow thường trực cả box.
- Tỷ lệ màu: ~85% trắng/charcoal, ~12% đỏ brand, ≤3% cyan (chỉ 1 trace duy nhất ở hero).
- `.vs-dash` (stroke-dashoffset) **tắt trên mobile** — nó repaint SVG mỗi frame, không chạy trên compositor.

## ⚠️ Mobile: đừng animate `x` trên element full-width
`initial={{ x: 20 }}` của framer-motion đẩy document rộng thêm 20px trước khi `whileInView` chạy → cả trang kéo ngang được ở 375px. Dùng `y` thay cho `x`. `globals.css` có `overflow-x: clip` làm lưới an toàn.

## Kiểm tra trước khi deploy
```bash
npx tsc --noEmit     # phải 0 lỗi — next.config có ignoreBuildErrors: true nên build KHÔNG bắt lỗi type
npm run build
```

## Asset
- `public/videos/hero-bg.mp4` — drone footage thật của VietSolve (720p/30fps/no-audio/faststart, ~9.6MB).
- `app/icon.png` + `app/apple-icon.png` — chim Lạc đỏ cắt từ logo chính thức (file convention của Next, **đừng** thêm block `icons` vào `layout.tsx`).
- `public/og.png` — og:image + twitter:image.

## Trang Liên hệ — điểm chạm tư vấn, không phải form suông
`components/contact-page.tsx` — 2 cột 42/58: trái là hướng dẫn viết brief + timeline phản hồi, phải là form trong card nổi.
- **Gửi thật:** có `NEXT_PUBLIC_CONTACT_ENDPOINT` → POST; không có → mở mailto soạn sẵn tới email verified. Field: name, email, phone, company, interest (6 nhóm), budget, timeline, message, consent.
- Validate xong **không reset** dữ liệu; focus tự nhảy về field lỗi đầu tiên (`setTimeout` 0 để chờ DOM) và scroll vào giữa màn hình.
- `role="radiogroup"` + `aria-required/invalid/describedby`, lỗi dùng `role="alert"`.
- `?service=<id>` từ trang Dịch vụ tự chọn sẵn nhóm quan tâm (useEffect chỉ chạy lúc mount).
→ **Nên làm:** tạo Cloudflare Pages Function / Formspree rồi set `NEXT_PUBLIC_CONTACT_ENDPOINT`.

## SEO
Metadata + canonical riêng từng trang. Homepage title "VietSolve — Creative, Technology & Growth Agency". Organization schema (chỉ dữ liệu verified). sitemap/robots có `dynamic="force-static"`. 1 H1/trang.

## Hạ tầng
- **Hosting:** Cloudflare Pages, project `vietsolve` → https://vietsolve.pages.dev
- **vietsolve.vn** — 🟢 LIVE (zone `757478975aeea2fa2c4719e1181b606d`, NS adele/damian).
- **Email Lark GIỮ NGUYÊN:** MX×3 larksuite.com + SPF + verify TXT. **ĐỪNG ĐỘNG MX.**
- **vietsolve.com** — Mắt Bão đã gỡ khóa, chưa trỏ.
- **Sau deploy: purge cache** (dash → Caching → Purge Everything) — route mới có thể bị edge cache 404 lúc propagate.

## Email công ty
Lark Standard F3, org `LJKNZL57744`, admin `ujpwldb6q2it.jp.larksuite.com/admin`.

## Baseline QA (đo thật trên vietsolve.vn, 375×812 — 2026-07-21)
| Chỉ số | Giá trị |
|---|---|
| URL trả 200 | 13/13 (8 trang + og.png, hero-bg.mp4, icon.png, sitemap.xml, robots.txt) |
| Link `href="#"` | 0 |
| Tap target < 44px | 0 |
| Kéo ngang mobile | không (`scrollWidth 375 = clientWidth 375`) |
| `npx tsc --noEmit` | 0 lỗi |
| TTFB / DOMContentLoaded / Load | 419ms / 891ms / 1.625s |
| Transfer / request | 455 KB / 23 |
| Ảnh thiếu `alt` | 0 |

**Chưa từng chạy Lighthouse** — số trên là Navigation Timing API. Muốn điểm chính thức thì chạy PageSpeed Insights.

## 🔧 NỢ KỸ THUẬT — việc còn lại
1. **`next.config.mjs` vẫn bật `ignoreBuildErrors: true` + `ignoreDuringBuilds: true`.** Chính nó đã che 2 lỗi type thật (`variant="slim"` ở hero, union type i18n). Giờ tsc đã sạch → **nên tắt** để build tự bắt lỗi. Chờ chủ website quyết vì đổi hành vi build.
2. **Form vẫn fallback mailto** tới khi có endpoint.
3. **`vietsolve.com` chưa trỏ** — Mắt Bão đã gỡ khóa, cần đổi zone + NS (có OTP).
4. **Modal case-study chưa verify bằng click thật** — `requestAnimationFrame` không chạy trong browser điều khiển qua CDP. Fix phòng thủ đã vào (bỏ `AnimatePresence` vì exit animation giữ overlay vô hình nuốt mọi click), cần click thử trên máy thật.

---

## 📋 CẦN CHỦ WEBSITE CUNG CẤP
| Mục | Ở đâu | Ghi chú |
|---|---|---|
| Xác nhận `contact@vietsolve.vn` có người đọc | `site-config.ts` | Đang render ở footer + contact |
| Hotline thật | `site-config.ts` → `contact.phone` | Chưa hiện |
| Địa chỉ thật | `site-config.ts` → `contact.address` | Chưa hiện |
| Link social thật | `site-config.ts` → `social` | Chưa hiện |
| Ảnh dự án | `/public/images/work/` → `projects.ts` `image` | Đang dùng visual sinh tự động |
| Số liệu kết quả + nguồn | `projects.ts` → `metrics` | Đang rỗng |
| Bài viết thật | `insights.ts` | Blog ẩn khỏi nav + noindex |
| Team thật | — | Chưa tạo (không dùng người giả) |
| Endpoint form | `NEXT_PUBLIC_CONTACT_ENDPOINT` | Đang fallback mailto |
