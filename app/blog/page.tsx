import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import BlogPage from "@/components/blog-page"

export const metadata = {
  title: "VietSolve Blog – Insights & Vision",
  description:
    "Khám phá chiến lược, sáng tạo và công nghệ giúp thương hiệu Việt vươn tầm quốc tế cùng VietSolve Agency.",
}

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <BlogPage />
      <AnimatedFooter />
    </div>
  )
}
