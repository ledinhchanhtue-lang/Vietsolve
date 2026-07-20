import type { Metadata } from "next"
import { InsightsPage } from "@/components/pages/insights-page"
import { hasInsights } from "@/lib/content/insights"

/**
 * The route stays live so existing inbound links don't 404, but it is noindexed
 * while there is nothing to read. Both this and the nav item flip automatically
 * once an article is published.
 */
export const metadata: Metadata = {
  title: "Insights về AI, Growth & Creative Technology",
  description:
    "Góc nhìn của VietSolve về hệ thống AI, tăng trưởng và công nghệ sáng tạo dành cho doanh nghiệp Việt Nam.",
  alternates: { canonical: "/blog" },
  robots: hasInsights ? { index: true, follow: true } : { index: false, follow: true },
}

export default function Page() {
  return <InsightsPage />
}
