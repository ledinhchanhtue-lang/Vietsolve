import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import SolutionsPage from "@/components/solutions-page"

export const metadata: Metadata = {
  title: "Dịch vụ Branding, Marketing, Website, AI & Automation — VietSolve",
  description:
    "Hệ sinh thái dịch vụ VietSolve: Branding, Marketing & Growth, Media & Creative, Website & Digital Products, AI Agents & Automation, Data & SEO.",
  alternates: { canonical: "/services" },
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
