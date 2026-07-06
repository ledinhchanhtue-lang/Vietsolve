# Vietsolve — Website Marketing

## Repository
- **Remote:** https://github.com/hoang27077-agenai/Vietsolve
- **Branch đã tải về:** `local-update`
- **Clone command:** `git clone --branch local-update https://github.com/hoang27077-agenai/Vietsolve.git`
- **Thư mục local:** `D:\Công việc\Viet Solve\Vietsolve`

## Tổng quan
Website marketing của Vietsolve, xây dựng bằng **Next.js 15 (App Router)** + **React 19** + **TypeScript**, style bằng **Tailwind CSS 3**, UI dùng **shadcn/ui** (Radix UI primitives) và animation bằng **framer-motion**. Ngôn ngữ hiển thị: tiếng Việt (`<html lang="vi">`).

> Lưu ý: `package.json` vẫn còn tên nội bộ `motion-records-website` (template gốc từ v0.app). Tên hiển thị "Amane Soft" đã được đổi thành **Viet Solve** ở layout/footer/features.

## Hiệu năng (đã tối ưu)
Trang chủ trước đây bị giật do quá nhiều hiệu ứng nền chạy đồng thời. Đã xử lý:
- **Video nền hero**: thay iframe YouTube (nặng, hay không autoplay) bằng thẻ `<video>` gốc phát file local `public/videos/hero-bg.mp4` — mượt, GPU-accelerated. Muốn đổi video: thay file này.
- **`mouse-move-effect.tsx`**: bỏ `setState` mỗi lần rê chuột, ghi thẳng DOM qua `ref` + throttle bằng `requestAnimationFrame`.
- **`background-paths.tsx` / `background-stripes.tsx`**: giảm số SVG path animation (360 → 56), hạ chiều cao layer `800vh → 200vh`.
- **`animated-background.tsx`** (canvas): chỉ vẽ vùng viewport thay vì toàn trang, giảm orb (6→4), giới hạn ~30fps.
- Gỡ `backdrop-blur-sm` khỏi các thẻ nền đục nằm trên background động (`innovative-services`, `roi-calculator-home`) — nguyên nhân chính gây giật khi cuộn.

### Audit sâu (dọn mạnh tay)
- **`navbar.tsx`**: gỡ 2 animation vô hạn (đổi màu viền + **box-shadow nhấp nháy**) — thanh nav luôn hiển thị nên đây là chi phí repaint liên tục; chuyển thành viền/shadow tĩnh.
- **`counting-stats.tsx`**: gỡ animation vô hạn `text-shadow` + lớp `blur-xl` bị animate `scale` (rasterize lại filter mờ mỗi frame) → tĩnh.
- **`innovative-services.tsx`**: gỡ 12 animation vô hạn của các mockup nhỏ (chạy mãi kể cả ngoài màn hình); giữ animation xuất-hiện-khi-cuộn-tới (`whileInView`, chạy 1 lần).
- **`roi-calculator-home.tsx`**: gỡ animation gradient vô hạn 15s trên card lớn → gradient tĩnh.
- **`background-paths.tsx` / `background-stripes.tsx`**: chuyển hẳn sang SVG **tĩnh** (bỏ hết framer-motion) — giữ hình trang trí, bỏ toàn bộ animation.
- **Kết quả**: mọi component trang chủ = **0 animation vô hạn**; chỉ còn 1 canvas nền ở 30fps.

### Đã xóa code chết (không import ở đâu)
`animated-cubes`, `brand-strategy`, `business-selector`, `cta`, `cursor-effect`, `features`, `footer` (bản dùng thật là `animated-footer`), `interactive-cta`, `services-page`, `success-stories` (bản dùng thật là `success-stories-redesign`), `testimonials`, `theme-provider`. Số module Next.js giảm 1511 → 1458.

> ⚠️ Ghi chú thiết kế: các con số thống kê trong `counting-stats` dùng chữ trắng (`text-white`) — vốn cho nền tối của template gốc. Trên nền hero sáng có thể khó đọc; cân nhắc đổi sang `text-gray-900`.

## Song ngữ (VI / EN)
Hệ thống i18n nhẹ, client-side (không đổi cấu trúc route):
- **`lib/i18n.tsx`**: `LanguageProvider` (context) + hook `useLanguage()` trả về `{ lang, setLang, toggle, t }`; từ điển `translations` gồm `vi` và `en` (92 key mỗi bên, khớp 1-1). Ngôn ngữ lưu ở `localStorage("lang")` và cập nhật `document.documentElement.lang`. Mặc định: **vi**.
- Provider bọc trong `app/layout.tsx`.
- Nút chuyển **VI/EN** ở `navbar.tsx` (desktop + mobile).
- Đã dịch các component trang chủ: `navbar`, `hero`, `how-we-work`, `innovative-services`, `roi-calculator-home`, `animated-footer` (dùng `const { t } = useLanguage()`).
- **Cách thêm chữ mới**: thêm key vào CẢ `vi` và `en` trong `lib/i18n.tsx`, rồi dùng `t.<section>.<key>` trong component (component phải là `"use client"`).
- **Chưa dịch** (còn tiếng Việt tĩnh): các trang con `app/about`, `app/services`, `app/blog`, `app/contact`, `app/case-studies`, `app/get-started`, v.v. — làm tương tự khi cần.

## Công nghệ chính
- Next.js `^15.1.6`, React `^19`, TypeScript `^5`
- Tailwind CSS `^3.4.17` + `tailwindcss-animate`
- shadcn/ui + Radix UI (`components/ui/`)
- framer-motion `^11`, lucide-react (icons), recharts (charts), react-hook-form

## Lệnh thường dùng
```bash
npm install       # cài dependencies
npm run dev       # chạy dev server tại http://localhost:3000
npm run build     # build production
npm run start     # chạy bản production
npm run lint      # kiểm tra lint (eslint + next)
```

## Cấu trúc thư mục
```
app/            # Next.js App Router — mỗi thư mục con là 1 route
  about/  artists/  blog/  case-studies/  contact/
  get-started/  inquiry/  services/  success-stories/
  layout.tsx    # root layout (font Inter, metadata, MouseMoveEffect)
  page.tsx      # trang chủ
  globals.css   # global styles + Tailwind
components/      # React components (hero, navbar, footer, services, ...)
  ui/           # shadcn/ui primitives
hooks/          # custom React hooks
lib/
  utils.ts      # helper (cn() cho classnames)
public/         # static assets
styles/         # style bổ sung
.claude/
  launch.json   # cấu hình dev server (npm run dev, port 3000)
```

## Alias import
`@/` trỏ tới thư mục gốc dự án (xem `tsconfig.json` / `components.json`). Ví dụ: `@/components/hero`, `@/lib/utils`.

## Ghi chú
- `pnpm-lock.yaml` và `package-lock.json` cùng tồn tại — nên chọn 1 package manager. Hiện `launch.json` cấu hình dùng `npm`.
