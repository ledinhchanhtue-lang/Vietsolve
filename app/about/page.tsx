import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import AboutPage from "@/components/about-page"

export const metadata: Metadata = {
  title: "Về VietSolve — Agency Sáng tạo & Công nghệ",
  description:
    "VietSolve là agency sáng tạo và công nghệ giúp doanh nghiệp Việt xây dựng thương hiệu, sản phẩm số và hệ thống tăng trưởng.",
  alternates: { canonical: "/about" },
}

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <AboutPage />
      <AnimatedFooter />
    </div>
  )
}
