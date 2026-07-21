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
  navbar.tsx animated-footer.tsx hero.tsx
  three-pillars.tsx innovative-services.tsx featured-projects.tsx
  how-we-work.tsx home-cta.tsx
  solutions-page.tsx (services) about-page.tsx case-studies-page.tsx
  contact-page.tsx blog-page.tsx legal-page.tsx
  background-paths/stripes/animated-background.tsx (nền paths nhẹ)
  ui/ (shadcn)
```

## Homepage journey (7 section)
Hero → 3 trụ cột (Intelligent/Creative/Innovation) → Hệ sinh thái dịch vụ (6 nhóm) → Dự án tiêu biểu (4 dự án) → Quy trình (3 bước) → Final CTA → Footer.
**AI/Automation** là 1 trong 6 nhóm dịch vụ — không có section AI riêng, không workflow demo trên homepage.

## 6 nhóm dịch vụ (`lib/content/services.ts`)
Branding & Strategy · Marketing & Growth · Media & Creative · Website & Digital Products · AI Agents & Automation · Data, SEO & Analytics.
Homepage: tên + 1 câu + 3 highlight + link. `/services`: danh sách đầy đủ + anchor `#id`.

## ⚠️ Button system — dùng `components/ui-kit/button.tsx`
4 loại duy nhất: `PrimaryButton` (đỏ đặc, 48px) · `SecondaryButton` (trắng viền xám, 48px) · `TextLink` (đỏ + mũi tên, min 44px) · `IconButton` (44×44 + `aria-label`).
- **Đừng dùng lại `animated-button.tsx`** cho CTA mới — nó từng co lại thành hộp 20px và nhận `variant="slim"` không tồn tại.
- Mọi tap target đứng riêng phải ≥ 44px (WCAG 2.5.8). Link nằm giữa câu văn được miễn.

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

## Form liên hệ — GỬI THẬT
`components/contact-page.tsx`: có `NEXT_PUBLIC_CONTACT_ENDPOINT` → POST; không có → mở mailto soạn sẵn tới email verified. Field: name, email, phone, company, interest (6 nhóm), budget, timeline, message, consent. Validate + không reset khi lỗi.
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
