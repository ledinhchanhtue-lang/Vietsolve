import type { Metadata } from "next"
import { AboutPage } from "@/components/pages/about-page"

export const metadata: Metadata = {
  // `absolute` so the root template doesn't append a second " — VietSolve".
  title: { absolute: "Về VietSolve — Agency Sáng tạo & Công nghệ" },
  description:
    "VietSolve được xây dựng với niềm tin rằng công nghệ chỉ có giá trị khi nó giúp doanh nghiệp vận hành tốt hơn, thương hiệu mạnh hơn và con người làm việc hiệu quả hơn.",
  alternates: { canonical: "/about" },
}

export default function Page() {
  return <AboutPage />
}
