import type { Metadata } from "next"
import { LegalPage } from "@/components/pages/legal-page"

export const metadata: Metadata = {
  title: "Điều khoản sử dụng",
  description: "Điều khoản sử dụng website VietSolve.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <LegalPage kind="terms" />
}
