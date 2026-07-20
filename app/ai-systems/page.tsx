import type { Metadata } from "next"
import { AiSystemsPage } from "@/components/pages/ai-systems-page"

export const metadata: Metadata = {
  title: "AI Agent & Automation cho doanh nghiệp",
  description:
    "VietSolve thiết kế AI Agent và automation dựa trên hoạt động thực tế của doanh nghiệp — từ bán hàng, chăm sóc khách hàng đến vận hành và báo cáo.",
  alternates: { canonical: "/ai-systems" },
}

export default function Page() {
  return <AiSystemsPage />
}
