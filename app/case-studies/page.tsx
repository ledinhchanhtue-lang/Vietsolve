import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import CaseStudiesPage from "@/components/case-studies-page"

export const metadata: Metadata = {
  title: "Dự án tiêu biểu - VietSolve | Case Studies AI Marketing",
  description:
    "Những giải pháp AI – sáng tạo – tối ưu chi phí được đo bằng KPI thực tế. ROI trung bình +38%, giảm 60% thời gian triển khai, 1.2M+ lượt xem/chiến dịch.",
  keywords: [
    "case study",
    "AI marketing",
    "VietSolve",
    "dự án tiêu biểu",
    "marketing automation",
    "ROI",
    "thành công thực tế",
  ],
  openGraph: {
    title: "Dự án tiêu biểu - VietSolve",
    description: "Những giải pháp AI – sáng tạo – tối ưu chi phí được đo bằng KPI thực tế",
    url: "https://vietsolve.vn/case-studies",
    siteName: "VietSolve",
    images: [
      {
        url: "https://vietsolve.vn/og-case-studies.jpg",
        width: 1200,
        height: 630,
        alt: "VietSolve Case Studies",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dự án tiêu biểu - VietSolve",
    description: "Những giải pháp AI – sáng tạo – tối ưu chi phí được đo bằng KPI thực tế",
    images: ["https://vietsolve.vn/og-case-studies.jpg"],
  },
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
