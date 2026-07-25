import type { Metadata } from "next"
import TechBackdrop from "@/components/tech/tech-backdrop"
import { TechDivider } from "@/components/tech/tech-divider"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import ThreePillars from "@/components/three-pillars"
import InnovativeServices from "@/components/innovative-services"
import FeaturedProjects from "@/components/featured-projects"
import { ProductionBand } from "@/components/company/production-band"
import HowWeWork from "@/components/how-we-work"
import HomeCta from "@/components/home-cta"
import AnimatedFooter from "@/components/animated-footer"

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
      {/* One static backdrop replaces the three stacked background components */}
      <TechBackdrop />

      <div className="relative z-40">
        <Navbar />
        <main id="main">
          <Hero />
          <ThreePillars />
          {/* Dividers mark the joins the journey actually turns on: capability →
              offer, and offer → proof. Not between every section. */}
          <TechDivider className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />
          <InnovativeServices />
          <TechDivider className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />
          <FeaturedProjects />
          {/* Real production photography — VietSolve's own crew on set */}
          <ProductionBand />
          <HowWeWork />
          <HomeCta />
        </main>
        <AnimatedFooter />
      </div>
    </div>
  )
}
