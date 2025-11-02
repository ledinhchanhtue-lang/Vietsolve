import type { Metadata } from "next"
import { Suspense } from "react"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import CaseStudiesPage from "@/components/case-studies-page"

export const dynamic = "force-dynamic"

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

function CaseStudiesLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-6" />
            <div className="h-8 bg-gray-200 rounded-lg w-96 mx-auto mb-4" />
            <div className="h-6 bg-gray-200 rounded-lg w-80 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-2xl mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Suspense fallback={<CaseStudiesLoading />}>
        <CaseStudiesPage />
      </Suspense>
      <AnimatedFooter />
    </div>
  )
}
