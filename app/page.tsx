import BackgroundStripes from "@/components/background-stripes"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import HowWeWork from "@/components/how-we-work"
import AIDifferentiators from "@/components/ai-differentiators"
import CaseStudyShowcase from "@/components/case-study-showcase"
import InnovativeServices from "@/components/innovative-services"
import ROICalculatorHome from "@/components/roi-calculator-home"
import FAQSection from "@/components/faq-section"
import AnimatedFooter from "@/components/animated-footer"
import BackgroundPaths from "@/components/background-paths"

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
