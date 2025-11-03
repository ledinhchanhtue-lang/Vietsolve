import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import HowWeWork from "@/components/how-we-work"
import AIDifferentiators from "@/components/ai-differentiators"
import CaseStudyShowcase from "@/components/case-study-showcase"
import InnovativeServices from "@/components/innovative-services"
import ROICalculatorHome from "@/components/roi-calculator-home"
import FAQSection from "@/components/faq-section"
import AnimatedFooter from "@/components/animated-footer"

const BackgroundStripes = dynamic(() => import("@/components/background-stripes"), {
  ssr: false,
  loading: () => null,
})

const AnimatedBackground = dynamic(() => import("@/components/animated-background"), {
  ssr: false,
  loading: () => null,
})

const BackgroundPaths = dynamic(() => import("@/components/background-paths"), {
  ssr: false,
  loading: () => null,
})

const generateStatic = "force-static"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      <BackgroundPaths />
      <AnimatedBackground />
      <BackgroundStripes />

      <div className="relative z-40">
        <Navbar />
        <Hero />
        <AIDifferentiators />
        <InnovativeServices />
        <CaseStudyShowcase />
        <HowWeWork />
        <ROICalculatorHome />
        <FAQSection />
        <AnimatedFooter />
      </div>
    </div>
  )
}
