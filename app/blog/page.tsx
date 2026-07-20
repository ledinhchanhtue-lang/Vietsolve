import type { Metadata } from "next"
import { InsightsPage } from "@/components/pages/insights-page"

export const metadata: Metadata = {
  title: "Insights về AI, Growth & Creative Technology",
  description:
    "Góc nhìn của VietSolve về hệ thống AI, tăng trưởng và công nghệ sáng tạo dành cho doanh nghiệp Việt Nam.",
  alternates: { canonical: "/blog" },
}

export default function Page() {
  return <InsightsPage />
}
