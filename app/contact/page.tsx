import type { Metadata } from "next"
import BackgroundStripes from "@/components/background-stripes"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import ContactPage from "@/components/contact-page"
import BackgroundPaths from "@/components/background-paths"

export const metadata: Metadata = {
  title: "Liên hệ VietSolve — Trao đổi dự án",
  description:
    "Chia sẻ bài toán của doanh nghiệp — VietSolve sẽ liên hệ để cùng xác định hướng triển khai phù hợp về branding, marketing, website, AI và automation.",
  alternates: { canonical: "/contact" },
}

export default function Contact() {
  return (
    <div className="relative min-h-screen bg-white">
      <BackgroundPaths />
      <AnimatedBackground />
      <BackgroundStripes />

      <div className="relative z-10">
        <Navbar />
        <ContactPage />
        <AnimatedFooter />
      </div>
    </div>
  )
}
