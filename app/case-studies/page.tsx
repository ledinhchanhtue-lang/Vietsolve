import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import CaseStudiesPage from "@/components/case-studies-page"

export const metadata: Metadata = {
  title: "Dự án Branding, Marketing, Website & AI — VietSolve",
  description:
    "Những dự án VietSolve đã thực hiện — từ xây dựng thương hiệu, phát triển nền tảng số đến triển khai công nghệ phục vụ tăng trưởng.",
  alternates: { canonical: "/case-studies" },
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
