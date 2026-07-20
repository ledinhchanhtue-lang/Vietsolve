import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import MouseMoveEffect from "@/components/mouse-move-effect"
import { LanguageProvider } from "@/lib/i18n"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Viet Solve - Agency Marketing toàn diện",
  description: "Viet Solve là agency marketing toàn diện cho doanh nghiệp mọi quy mô: SEO, mạng xã hội, nội dung và email marketing với kết quả đo lường được.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <LanguageProvider>
          <MouseMoveEffect />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
