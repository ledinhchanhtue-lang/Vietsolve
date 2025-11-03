import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import dynamic from "next/dynamic"

const MouseMoveEffect = dynamic(() => import("@/components/mouse-move-effect"), {
  ssr: false,
  loading: () => null,
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Amane Soft - Giải pháp phần mềm tiên tiến",
  description: "Amane Soft cung cấp giải pháp phần mềm sáng tạo, hiệu suất cao cho doanh nghiệp của tương lai.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.NodeNode
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="font-sans bg-background text-foreground antialiased">
        <MouseMoveEffect />
        {children}
      </body>
    </html>
  )
}
