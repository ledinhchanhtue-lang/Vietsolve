# Vietsolve — Website Marketing

## Repository
- **Remote:** https://github.com/hoang27077-agenai/Vietsolve (branch: `local-update`)
- **Thư mục local:** `D:\Công việc\Viet Solve\Vietsolve`

## Tổng quan
Website marketing **Next.js 15 (App Router) + React 19 + TypeScript + Tailwind 3 + shadcn/ui + framer-motion**. Ngôn ngữ: song ngữ VI/EN (mặc định VI). Template gốc từ v0.app (tên nội bộ `motion-records-website`).

## Lệnh
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production (ignoreBuildErrors=true nên không fail lint/type)
npm run start
```
- Chạy dev bằng terminal riêng (đóng terminal = tắt server = ERR_CONNECTION_REFUSED).
- **Deploy lên Cloudflare Pages:**
  ```bash
  npm run build && npx wrangler pages deploy out --project-name=vietsolve --branch=main --commit-dirty=true
  ```

## Cấu trúc
```
app/          # routes: about, artists, blog, case-studies, contact, get-started, inquiry, services, success-stories
components/   # hero, navbar, animated-footer, how-we-work, innovative-services, roi-calculator-home, background-*, ...
  ui/         # shadcn/ui
lib/
  utils.ts    # cn()
  i18n.tsx    # HỆ THỐNG SONG NGỮ (xem dưới)
public/videos/hero-bg.mp4   # video nền hero (đã nén 42MB→11MB, 720p, faststart, no audio)
public/videos/hero-poster.jpg  # poster frame cho video
```
Alias `@/` = gốc dự án.

## Song ngữ VI / EN — `lib/i18n.tsx`
- `LanguageProvider` (context) + hook `useLanguage()` → `{ lang, setLang, toggle, t }`.
- Từ điển `translations` gồm `vi`/`en` (92 key mỗi bên, khớp 1-1).
- Lưu `localStorage("lang")`, cập nhật `<html lang>`. Provider bọc trong `app/layout.tsx`.
- Nút chuyển **VI/EN** ở `navbar.tsx` (desktop + mobile).
- **Đã dịch trang chủ:** navbar, hero, how-we-work, innovative-services, roi-calculator-home, animated-footer.
- **Chưa dịch:** các trang con (about, services, blog, contact, case-studies, get-started...). Muốn thêm: thêm key vào CẢ `vi` và `en`, dùng `t.<section>.<key>`, component phải `"use client"`.

## Đã đổi tên thương hiệu
"Amane Soft" (template cũ) → **Viet Solve** ở `app/layout.tsx`, `animated-footer.tsx`, và các component dùng thật.

## Hiệu năng (đã tối ưu — trước đây rất lag)
- **Video nền hero** (`hero.tsx`): thay iframe YouTube bằng `<video>` local `/videos/hero-bg.mp4` (nén 42→11MB, 720p, faststart, bỏ audio, có poster).
- **`mouse-move-effect.tsx`**: bỏ setState mỗi mousemove → ghi DOM qua ref + throttle rAF.
- **`background-paths.tsx` / `background-stripes.tsx`**: SVG tĩnh (bỏ framer-motion), giảm path, 200vh.
- **`animated-background.tsx`** (canvas): chỉ vẽ viewport, 4 orb, cap 30fps.
- **`navbar.tsx`**: bỏ animation viền + box-shadow nhấp nháy vô hạn.
- **`counting-stats.tsx`**: bỏ blur-xl animate scale + text-shadow vô hạn.
- **`innovative-services.tsx`**: bỏ 12 micro-animation vô hạn; gỡ `backdrop-blur-sm`.
- **`roi-calculator-home.tsx`**: bỏ gradient động 15s; gỡ `backdrop-blur-sm`.
- **Kết quả:** 0 animation vô hạn trên trang chủ; chỉ còn 1 canvas nền 30fps.

## Đã xóa code chết
`animated-cubes`, `brand-strategy`, `business-selector`, `cta`, `cursor-effect`, `features`, `footer` (cũ), `interactive-cta`, `services-page`, `success-stories` (cũ), `testimonials`, `theme-provider`.

## Deploy — Cloudflare Pages
> Chuyển từ Vercel (Hobby chặn web thương mại → 402) sang **Cloudflare Pages** (miễn phí, cho thương mại).

- **Static export:** `next.config.mjs` có `output: 'export'` → `npm run build` tạo thư mục **`out/`** (~13MB kèm video).
- **Project Pages:** `vietsolve` — URL: **https://vietsolve.pages.dev**
- **Custom domains:** vietsolve.vn + www.vietsolve.vn → CNAME tới `vietsolve.pages.dev`.
- **Wrangler:** đã `wrangler login` OAuth vào Cloudflare của user.

## Tên miền — TRẠNG THÁI (cập nhật 20/07/2026)
Đăng ký tại **Mắt Bão** (id.matbao.net, tài khoản Lê Đình Chánh Tuệ). DNS chuyển về **Cloudflare** (`ledinhchanhtue@gmail.com`, account id `33aa8c17e4415cd24e7444a8b7beee5b`).

### vietsolve.vn — ✅ ĐANG CHẠY LIVE
- DNS zone Cloudflare (zone id `757478975aeea2fa2c4719e1181b606d`, NS `adele + damian .ns.cloudflare.com`). Zone **active**.
- Web: CNAME `@` và `www` → `vietsolve.pages.dev` (proxied). **https://vietsolve.vn = 200, SSL ok.**
- **Email Lark GIỮ NGUYÊN:** `MX×3 larksuite.com`, `TXT SPF`, `TXT lark verification`. **Đừng đổi/xóa MX.**

### vietsolve.com — ⏳ chờ trỏ DNS
- Mắt Bão đã gọi điện xác nhận **gỡ hết khóa** (ClientHold đã xóa, không còn vấn đề gì).
- **Bước tiếp theo:** add zone vào Cloudflare → hoàn tất onboarding (Free plan) → đổi NS ở Mắt Bão (cần OTP từ user) → gắn vietsolve.com + www vào Pages project `vietsolve`. Không có email trên .com nên đơn giản.

### Lưu ý thao tác Mắt Bão
- Đổi NS cần tắt "Xác thực DNS" + nhập OTP email/SMS (bước chính chủ).
- Nút "Lưu thay đổi" NS chỉ bật khi gõ phím thật (form_input tool đôi khi không trigger).

## Email công ty — Lark (Feishu)
- Tổ chức **Viet Solve** trên Lark (gói Standard F3, ID `LJKNZL57744`).
- Admin console: `ujpwldb6q2it.jp.larksuite.com/admin`.
- Email @vietsolve.vn chạy trên Lark.
- **Lark F3 KHÔNG có catch-all**, admin không set auto-forward hộ user được (mỗi người tự cài).
- Đã xóa nhân sự nghỉ việc: **Chris** (chris@) và **Duy Tran** (duytran@) — tài nguyên chuyển về Tue Le.

## Truy cập
Cloudflare (Wrangler CLI + dashboard), Mắt Bão, Gmail, Lark Admin — qua Chrome extension. OTP/xác thực chính chủ do user tự làm.
