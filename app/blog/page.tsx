import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import BlogPage from "@/components/blog-page"
import { hasInsights } from "@/lib/content/insights"

/**
 * The route stays live so existing inbound links don't 404, but it is noindexed
 * while there are no real articles. Both this and the nav item flip on
 * automatically once an article is published in lib/content/insights.ts.
 */
export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Góc nhìn của VietSolve về thương hiệu, marketing, website và công nghệ dành cho doanh nghiệp Việt.",
  alternates: { canonical: "/blog" },
  robots: hasInsights ? { index: true, follow: true } : { index: false, follow: true },
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
