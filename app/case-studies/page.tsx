import type { Metadata } from "next"
import { WorkPage } from "@/components/pages/work-page"

export const metadata: Metadata = {
  title: "Dự án Branding, Website, AI & Growth",
  description:
    "Những dự án nơi chiến lược, sáng tạo và công nghệ được kết nối để giải quyết một bài toán cụ thể.",
  alternates: { canonical: "/case-studies" },
}

export default function Page() {
  return <WorkPage />
}
