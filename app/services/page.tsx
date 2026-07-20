import type { Metadata } from "next"
import { ServicesPage } from "@/components/pages/services-page"

export const metadata: Metadata = {
  title: "Năng lực AI, Automation, Website & Growth",
  description:
    "VietSolve giúp doanh nghiệp từ xác định bài toán, xây thương hiệu, phát triển nền tảng số đến triển khai AI và automation.",
  alternates: { canonical: "/services" },
}

export default function Page() {
  return <ServicesPage />
}
