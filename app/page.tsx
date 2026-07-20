import type { Metadata } from "next"
import { Hero } from "@/components/home/hero"
import { Collaborations } from "@/components/home/collaborations"
import { Capabilities } from "@/components/sections/capabilities"
import { OperatingSystem } from "@/components/home/operating-system"
import { SelectedWork } from "@/components/home/selected-work"
import { WhyVietSolve } from "@/components/home/why-vietsolve"
import { FinalCta } from "@/components/sections/final-cta"

export const metadata: Metadata = {
  title: "VietSolve — AI Agency, Automation & Digital Growth",
  description:
    "VietSolve là AI-powered Growth Agency giúp doanh nghiệp Việt xây dựng thương hiệu, website, AI Agent và hệ thống automation phục vụ bán hàng và vận hành.",
  alternates: { canonical: "/" },
}

/**
 * Homepage — seven sections.
 *
 * Deliberately trimmed. Removed from here:
 *  - "The real problem" as a standalone section → condensed into the
 *    Capabilities intro.
 *  - The Live System Demo → it duplicated the hero canvas. The component is
 *    kept and now runs only on /ai-systems.
 *  - Insights → hidden until there are at least three real articles.
 *
 * Rhythm: big hero → short collaborations → big capabilities → short process →
 * big work → short why → big CTA.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Collaborations />
      <Capabilities variant="compact" />
      <OperatingSystem compact />
      <SelectedWork />
      <WhyVietSolve />
      <FinalCta />
    </>
  )
}
