import type { Metadata } from "next"
import { ContactPage } from "@/components/pages/contact-page"

export const metadata: Metadata = {
  title: "Trao đổi dự án cùng VietSolve",
  description:
    "Mô tả bài toán, mục tiêu hoặc ý tưởng của bạn. VietSolve sẽ liên hệ để cùng xác định hướng triển khai phù hợp.",
  alternates: { canonical: "/contact" },
}

export default function Page() {
  return <ContactPage />
}
