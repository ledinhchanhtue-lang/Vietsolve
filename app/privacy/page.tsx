import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import LegalPage from "@/components/legal-page"

export const metadata = {
  title: "Chính sách bảo mật - VietSolve",
  description: "Cách VietSolve thu thập, sử dụng và bảo vệ thông tin bạn gửi qua website.",
  alternates: { canonical: "/privacy" },
}

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <LegalPage kind="privacy" />
      <AnimatedFooter />
    </div>
  )
}
