import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import BlogPage from "@/components/blog-page"

export const metadata = {
  title: "Blog & Insights - VietSolve",
  description: "Chia sẻ kiến thức, kinh nghiệm và góc nhìn mới về truyền thông, thương hiệu & công nghệ.",
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
