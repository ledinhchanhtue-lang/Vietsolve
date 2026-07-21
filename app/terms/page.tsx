import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import LegalPage from "@/components/legal-page"

export const metadata = {
  title: "Điều khoản sử dụng",
  description: "Điều khoản sử dụng website VietSolve.",
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
