import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import LegalPage from "@/components/legal-page"

export const metadata = {
  title: "Điều khoản sử dụng",
  description:
    "Điều khoản sử dụng website VietSolve: quyền sở hữu trí tuệ với nội dung và hình ảnh, phạm vi thông tin giới thiệu năng lực, liên kết bên ngoài và cách liên hệ.",
  alternates: { canonical: "/terms" },
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <LegalPage kind="terms" />
      <AnimatedFooter />
    </div>
  )
}
