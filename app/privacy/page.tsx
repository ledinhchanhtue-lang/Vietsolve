import type { Metadata } from "next"
import { LegalPage } from "@/components/pages/legal-page"

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description: "Cách VietSolve thu thập, sử dụng và bảo vệ thông tin bạn gửi qua website.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <LegalPage kind="privacy" />
}
