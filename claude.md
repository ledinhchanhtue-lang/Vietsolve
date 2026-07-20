# VietSolve — Website

## Định vị
**VietSolve — AI-powered Growth Agency cho doanh nghiệp Việt Nam.**
Không phải marketing agency phổ thông, cũng không phải công ty chỉ bán chatbot. Kết hợp chiến lược + sáng tạo + công nghệ AI.

## Repository
- **Remote chính:** https://github.com/hoang27077-agenai/Vietsolve (không có quyền ghi)
- **Fork đang push:** https://github.com/ledinhchanhtue-lang/Vietsolve — branch `local-update`
- **Local:** `D:\Công việc\Viet Solve\Vietsolve`

## Tech stack
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 3 · framer-motion · static export (`output: 'export'`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # → out/
npx wrangler pages deploy out --project-name=vietsolve --branch=main --commit-dirty=true
```

---

## ⚠️ NGUYÊN TẮC SỐ 1 — KHÔNG BAO GIỜ RENDER DỮ LIỆU GIẢ

Website cũ chứa rất nhiều nội dung bịa. Toàn bộ đã bị xóa. **Đừng thêm lại.**

Đã xóa: badge Google Partner / BBB A+ / "Agency được chứng nhận" (không có giấy tờ) · SĐT `+1 (555) 123-4567` và `0909.xxx.xxx` · 2 địa chỉ mâu thuẫn · email `.com` vs `.vn` không khớp · ROI calculator USD ("1840% ROI", "$92,000/năm") kèm câu "dựa trên dữ liệu khách hàng thực tế" · 9 bài blog bịa (tác giả giả, ngày giả, CEO giả "Nguyễn Văn An") · 6 case study bịa + số liệu bịa (+300%, ROI 450%, 500K downloads) · 3 testimonial người Mỹ giả · tên khách hàng thật bị gán sai (Nordic Naturals, Ladipage) · `motionmedia.com`, "Motion Records" · 18 file ảnh không tồn tại · form giả `setTimeout` rồi vứt data.

### Cách hệ thống chặn dữ liệu giả

**`lib/site-config.ts`** — mọi thông tin liên hệ có cờ `verified`. UI **chỉ render khi `verified === true`**.
```ts
email: verified("contact@vietsolve.vn")   // hiện
phone: unverified<string>()               // KHÔNG hiện
address: unverified<...>()                // KHÔNG hiện
certifications: []                        // rỗng có chủ đích
```
→ Muốn hiện SĐT/địa chỉ: điền giá trị thật rồi đổi `verified: true`. Section tự xuất hiện.

**`lib/content/projects.ts`** — `metrics: []` mặc định. Chỉ thêm số liệu khi có `source`. Dự án mô tả bằng **cái đã làm**, không bằng kết quả bịa. `image: null` → tự sinh visual thương hiệu (không phải ảnh vỡ, không phải stock).

**`lib/content/insights.ts`** — rỗng có chủ đích. Bài viết chỉ hiện khi `published: true` và có tác giả + ngày thật.

---

## Cấu trúc

```
app/
  page.tsx            # Homepage (12 section)
  services/           # Năng lực (route giữ /services cho SEO)
  ai-systems/         # MỚI — trang riêng cho AI & automation
  case-studies/       # Selected Work
  about/  blog/  contact/  privacy/  terms/
  sitemap.ts  robots.ts  not-found.tsx
lib/
  site-config.ts      # ⭐ nguồn sự thật cho thông tin doanh nghiệp
  i18n.tsx            # VI/EN, `vi` định nghĩa shape, `en` bị ép khớp
  content/
    navigation.ts  capabilities.ts  projects.ts  insights.ts
components/
  kit/                # section, buttons, page-hero
  visuals/            # lac-constellation, system-canvas, capability-visual
  home/               # hero, collaborations, problems, operating-system,
                      # ai-workflow, selected-work, why-vietsolve, insights-teaser
  sections/           # capabilities, final-cta, ai-readiness
  pages/              # services, ai-systems, work, about, insights, contact, legal
  work/  insights/  ui/
```

## Homepage journey
Hero (live system canvas) → Collaborations → Problems → VietSolve OS (5 bước) → Capabilities (4 trụ) → Interactive AI Workflow → Selected Work → Why VietSolve → Insights → Final CTA.

## Design system
- **Màu:** obsidian `#07090D` · graphite `#11141A` · ivory `#F4F1EA` · **VietSolve Red `#E21B2D`** (chỉ ≤5%, dùng cho CTA / node active / data path) · coral `#FF4D58` · steel `#A7AFBC`.
- **Font:** Manrope (display) · Be Vietnam Pro (body, có dấu tiếng Việt) · JetBrains Mono (label/data).
- **Surface class:** `.surface-dark` `.surface-graphite` `.surface-ivory` — dùng thay vì tự viết bg/text.
- **Type scale:** `text-h1` `text-h2` `text-h3` `text-body-lg` `text-eyebrow` (fluid clamp).
- **Section rhythm:** `py-section` (72→160px). Container max 1360px.

### ⚠️ `lib/utils.ts` — tailwind-merge đã được extend
`cn()` dùng `extendTailwindMerge`. **Bắt buộc** — nếu không, tailwind-merge đoán nhầm `text-h2` là màu chữ và `cn("text-h2","text-ivory")` sẽ **xóa mất `text-h2`** (mọi heading tụt về 16px — đã từng xảy ra). Thêm token màu/size mới thì phải khai báo trong file này.

## Chim Lạc
`components/visuals/lac-constellation.tsx` — biểu tượng được diễn giải thành data constellation (node + path), không phải minh họa dân gian. `LacConstellation` (có animation vẽ 1 lần) và `LacMark` (tĩnh, cho footer). Cũng dùng trong OG image.

## Motion
- Hero canvas: chạy 1 lượt khi vào viewport rồi **dừng**.
- Workflow demo: chỉ chạy khi bấm, tự dừng, có nút Chạy lại.
- Không có animation vô hạn nào ngoài vài node pulse nhỏ (CSS).
- `prefers-reduced-motion` được tôn trọng toàn site (globals.css + check trong JS).

## Form liên hệ — GỬI THẬT
`components/pages/contact-page.tsx`:
- Có `NEXT_PUBLIC_CONTACT_ENDPOINT` → POST JSON tới đó.
- Không có → mở mailto soạn sẵn tới email đã verified.
- **Không bao giờ giả vờ gửi thành công.** Lỗi thì giữ nguyên dữ liệu + chỉ sang email.
- Label luôn hiện, validate rõ, `aria-invalid`, focus về field lỗi đầu tiên.

→ **Nên làm:** tạo Cloudflare Pages Function hoặc dùng Formspree, rồi set `NEXT_PUBLIC_CONTACT_ENDPOINT`.

## SEO
Metadata riêng từng trang · canonical · OG + Twitter card + `/og.png` (1200×630, sinh từ `next/og` rồi lưu tĩnh) · `sitemap.ts` chỉ liệt kê route có thật · `robots.ts` · Organization schema (chỉ dữ liệu verified) · 1 H1/trang.

Sitemap/robots cần `export const dynamic = "force-static"` vì dùng `output: 'export'`.

## Hạ tầng
- **Hosting:** Cloudflare Pages, project `vietsolve` → https://vietsolve.pages.dev
  (Vercel Hobby chặn web thương mại trên custom domain → HTTP 402. Đã bỏ.)
- **vietsolve.vn** — 🟢 LIVE. Zone `757478975aeea2fa2c4719e1181b606d`, NS `adele/damian.ns.cloudflare.com`.
- **Email Lark GIỮ NGUYÊN:** `MX×3 larksuite.com` + SPF + verify TXT. **ĐỪNG ĐỘNG VÀO MX.**
- **vietsolve.com** — Mắt Bão đã gỡ khóa. Chưa trỏ. Cần: add zone → onboarding → đổi NS (OTP) → gắn custom domain vào Pages.
- **Sau khi deploy: purge cache** (dash → Caching → Purge Everything). Route mới có thể bị edge cache 404 nếu request trúng lúc đang propagate — đã gặp với `/ai-systems` và `/terms`.

## Email công ty
Lark Standard F3, org `LJKNZL57744`, admin `ujpwldb6q2it.jp.larksuite.com/admin`. F3 không có catch-all; admin không set forward hộ được (mỗi người tự cài trong Lark Mail).

---

## 📋 CẦN CHỦ WEBSITE CUNG CẤP

| Mục | Ở đâu | Ghi chú |
|---|---|---|
| Xác nhận `contact@vietsolve.vn` có người đọc | `lib/site-config.ts` | Đang render |
| Hotline thật | `site-config.ts` → `contact.phone` | Chưa hiện |
| Địa chỉ thật | `site-config.ts` → `contact.address` | Chưa hiện |
| Link social thật | `site-config.ts` → `social` | Chưa hiện |
| Logo khách hàng | `/public/images/clients/` | Đang hiện tên chữ |
| Ảnh dự án | `/public/images/work/` → `projects.ts` `image` | Đang dùng visual sinh tự động |
| Số liệu kết quả + nguồn | `projects.ts` → `metrics` | Đang rỗng |
| Bài viết thật | `insights.ts` | `/blog` đang là empty state |
| Thành viên team | chưa có section | Không tạo người giả |
| Endpoint form | `NEXT_PUBLIC_CONTACT_ENDPOINT` | Đang fallback mailto |
| Giấy tờ chứng nhận | `site-config.ts` → `certifications` | Chỉ thêm khi có URL xác minh |
