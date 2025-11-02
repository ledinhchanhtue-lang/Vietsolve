import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import CaseStudiesPage from "@/components/case-studies-page"

export const metadata: Metadata = {
  title: "Dự án tiêu biểu - VietSolve",
  description: "Những giải pháp sáng tạo & đổi mới giúp doanh nghiệp Việt tăng trưởng vượt bậc.",
}

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CaseStudiesPage />
      <AnimatedFooter />
    </div>
  )
}
