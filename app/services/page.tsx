import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import SolutionsPage from "@/components/solutions-page"

export const metadata = {
  title: "Dịch vụ VietSolve – Intelligent • Creative • Innovation",
  description:
    "VietSolve cung cấp dịch vụ toàn diện giúp doanh nghiệp Việt tăng trưởng bằng trí tuệ, sáng tạo và công nghệ AI.",
}

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <SolutionsPage />
      <AnimatedFooter />
    </div>
  )
}
