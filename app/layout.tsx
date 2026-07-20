import type { Metadata } from "next"
import { Manrope, Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/i18n"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { siteConfig } from "@/lib/site-config"

/* Display — geometric, tight, good Latin coverage */
const display = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
})

/* Body — designed for Vietnamese diacritics */
const body = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
})

/* Data / labels */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "VietSolve — AI Agency, Automation & Digital Growth",
    template: "%s — VietSolve",
  },
  description:
    "VietSolve là AI-powered Growth Agency giúp doanh nghiệp Việt xây dựng thương hiệu, website, AI Agent và hệ thống automation phục vụ bán hàng và vận hành.",
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "VietSolve — AI Agency, Automation & Digital Growth",
    description: siteConfig.statement.vi,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "VietSolve — AI-powered Growth Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VietSolve — AI Agency, Automation & Digital Growth",
    description: siteConfig.statement.vi,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
}

/** Organization schema — only verified facts. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.statement.vi,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-obsidian font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <LanguageProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  )
}
