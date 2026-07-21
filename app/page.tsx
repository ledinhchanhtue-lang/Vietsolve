import type { Metadata } from "next"
import BackgroundStripes from "@/components/background-stripes"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import ThreePillars from "@/components/three-pillars"
import InnovativeServices from "@/components/innovative-services"
import FeaturedProjects from "@/components/featured-projects"
import HowWeWork from "@/components/how-we-work"
import HomeCta from "@/components/home-cta"
import AnimatedFooter from "@/components/animated-footer"
import BackgroundPaths from "@/components/background-paths"

export const metadata: Metadata = {
  title: "VietSolve — Creative, Technology & Growth Agency",
  description:
    "VietSolve kết hợp branding, marketing, media, website, AI và automation để giúp doanh nghiệp Việt xây dựng thương hiệu và tăng trưởng hiệu quả.",
  alternates: { canonical: "/" },
}

/**
 * Homepage — white theme.
 *
 * Journey: Hero → three pillars → service ecosystem (AI/automation is one of the
 * six groups) → featured projects → process → final CTA → footer.
 * The ROI calculator was removed; featured projects took its place.
 */
export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      <BackgroundPaths />
      <AnimatedBackground />
      <BackgroundStripes />

      <div className="relative z-40">
        <Navbar />
        <main id="main">
          <Hero />
          <ThreePillars />
          <InnovativeServices />
          <FeaturedProjects />
          <HowWeWork />
          <HomeCta />
        </main>
        <AnimatedFooter />
      </div>
    </div>
  )
}
