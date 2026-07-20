import type { Metadata } from "next"
import { Hero } from "@/components/home/hero"
import { Collaborations } from "@/components/home/collaborations"
import { Problems } from "@/components/home/problems"
import { OperatingSystem } from "@/components/home/operating-system"
import { Capabilities } from "@/components/sections/capabilities"
import { AiWorkflow } from "@/components/home/ai-workflow"
import { SelectedWork } from "@/components/home/selected-work"
import { WhyVietSolve } from "@/components/home/why-vietsolve"
import { InsightsTeaser } from "@/components/home/insights-teaser"
import { FinalCta } from "@/components/sections/final-cta"

export const metadata: Metadata = {
  title: "VietSolve — AI Agency, Automation & Digital Growth",
  description:
    "VietSolve là AI-powered Growth Agency giúp doanh nghiệp Việt xây dựng thương hiệu, website, AI Agent và hệ thống automation phục vụ bán hàng và vận hành.",
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Collaborations />
      <Problems />
      <OperatingSystem />
      <Capabilities />
      <AiWorkflow />
      <SelectedWork />
      <WhyVietSolve />
      <InsightsTeaser />
      <FinalCta />
    </>
  )
}
