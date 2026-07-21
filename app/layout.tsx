import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import MouseMoveEffect from "@/components/mouse-move-effect"
import { LanguageProvider } from "@/lib/i18n"
import { siteConfig } from "@/lib/site-config"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "VietSolve — Agency Sáng tạo & Công nghệ",
    template: "%s | VietSolve",
  },
  description:
    "VietSolve kết hợp branding, marketing, media, website, AI và automation để giúp doanh nghiệp Việt xây dựng thương hiệu và vận hành hiệu quả hơn.",
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "VietSolve — Agency Sáng tạo & Công nghệ",
    description:
      "Branding, marketing, media, website, AI và automation cho doanh nghiệp Việt.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VietSolve — Agency Sáng tạo & Công nghệ",
    description:
      "Branding, marketing, media, website, AI và automation cho doanh nghiệp Việt.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  /* Favicon dùng file convention của Next: app/icon.png + app/apple-icon.png
     (chim Lạc đỏ cắt từ logo chính thức). Bộ icon "V2" của template v0 đã xóa. */
}

/** Organization schema — only verified facts. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo-vietsolve-official.png`,
  ...(siteConfig.contact.email.verified && siteConfig.contact.email.value
    ? {
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: siteConfig.contact.email.value,
          availableLanguage: ["Vietnamese", "English"],
        },
      }
    : {}),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <LanguageProvider>
          <MouseMoveEffect />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
