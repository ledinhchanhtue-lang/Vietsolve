"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import {
  Sparkles,
  Brain,
  Zap,
  TrendingUp,
  Users,
  ArrowRight,
  Rocket,
  BarChart3,
  Cpu,
  Video,
  LineChart,
  Check,
  ChevronDown,
  Lightbulb,
  Target,
  Workflow,
  Palette,
  BarChart,
} from "lucide-react"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import GlossyIcon from "@/components/glossy-icon"
import CountingStats from "@/components/counting-stats"
import GlowButton from "@/components/glow-button"
import AnimatedBackground from "@/components/animated-background"
import { HeadingHighlight } from "@/components/heading-highlight"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [activeMilestone, setActiveMilestone] = useState(0)
  const [beforeAfterPosition, setBeforeAfterPosition] = useState(50)
  const [showToast, setShowToast] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const timelineContentRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: timelineContentRef,
    offset: ["start center", "end center"],
  })

  const opacity = useTransform(heroScrollProgress, [0, 1], [1, 0])
  const scale = useTransform(heroScrollProgress, [0, 1], [1, 0.8])
  const timelineProgress = useTransform(timelineScrollProgress, [0.2, 0.8], [0, 100])

  useEffect(() => {
    setMounted(true)
  }, [])

  const coreValues = [
    {
      icon: Brain,
      title: "Sáng tạo dữ liệu",
      description:
        "Kết hợp AI và data analytics để tạo ra insights sáng tạo, dựa trên dữ liệu thực tế thay vì cảm tính.",
      color: "from-vietsolve-red to-vietsolve-burgundy",
    },
    {
      icon: Zap,
      title: "Tốc độ vượt trội",
      description: "Triển khai chiến dịch nhanh hơn 5× nhờ tự động hóa AI, rút ngắn thời gian từ ý tưởng đến thực thi.",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: TrendingUp,
      title: "Tối ưu hiệu quả",
      description: "Giảm chi phí tới 30% với AI optimization, A/B testing tự động và real-time performance tracking.",
      color: "from-red-600 to-pink-600",
    },
    {
      icon: Users,
      title: "Hợp tác nhân văn",
      description: "AI hỗ trợ, con người quyết định. Chúng tôi tin vào sự kết hợp hoàn hảo giữa công nghệ và sáng tạo.",
      color: "from-vietsolve-burgundy to-gray-900",
    },
  ]

  const coreValuesNew = [
    {
      id: 1,
      icon: Brain,
      title: "Sáng tạo dữ liệu",
      description:
        "Kết hợp AI và data analytics để tạo ra insights sáng tạo, dựa trên dữ liệu thực tế thay vì cảm tính.",
      category: "creative",
      bullets: ["Insight từ real data", "Ý tưởng có kiểm chứng", "Test nhanh – scale nhanh"],
      kpi: "+38% ROI",
      example: "Ra 20 biến thể KV trong 24h, chọn 3 mẫu CTR>3% để chạy chính.",
      color: "orange" as const,
    },
    {
      id: 2,
      icon: Zap,
      title: "Tốc độ vượt trội",
      description: "Triển khai chiến dịch nhanh hơn 5× nhờ tự động hóa AI, rút ngắn thời gian từ ý tưởng đến thực thi.",
      category: "operation",
      bullets: ["Tự động hoá quy trình", "Template hoá sản xuất", "Phê duyệt nhanh"],
      kpi: "-60% Time",
      example: "Rút từ 5 ngày → 2 ngày cho TVC social 15s.",
      color: "pink" as const,
    },
    {
      id: 3,
      icon: TrendingUp,
      title: "Tối ưu hiệu quả",
      description: "Giảm chi phí tới 30% với AI optimization, A/B testing tự động và real-time performance tracking.",
      category: "operation",
      bullets: ["A/B auto", "Budget re-allocation", "InsightX báo cáo"],
      kpi: "ROAS 5.2x",
      example: "CPA giảm 27% sau 2 tuần tối ưu.",
      color: "blue" as const,
    },
    {
      id: 4,
      icon: Users,
      title: "Hợp tác nhân văn",
      description: "AI hỗ trợ, con người quyết định. Chúng tôi tin vào sự kết hợp hoàn hảo giữa công nghệ và sáng tạo.",
      category: "people",
      bullets: ["Co-create với brand", "Minh bạch KPI", "Đội hình chuyên gia"],
      kpi: "NPS 9.2/10",
      example: "Workshop đồng sáng tạo concept trong 3 giờ.",
      color: "purple" as const,
    },
  ]

  const tabs = [
    { id: "all", label: "Tất cả" },
    { id: "operation", label: "Vận hành" },
    { id: "creative", label: "Sáng tạo" },
    { id: "people", label: "Con người" },
  ]

  const filteredValues = activeTab === "all" ? coreValuesNew : coreValuesNew.filter((v) => v.category === activeTab)

  const milestones = [
    {
      id: "milestone-2023-q4",
      year: "2023",
      quarter: "Q4",
      title: "Thành lập Vietsolve",
      description: "Ra mắt dịch vụ sáng tạo ứng dụng AI, đặt nền móng cho hệ sinh thái marketing thông minh.",
      bullets: ["Xây dựng đội ngũ core team", "Pilot 10+ dự án đầu tiên", "Thiết lập quy trình AI-first"],
      kpis: [
        { label: "10+ dự án pilot", value: "10+" },
        { label: "NPS 8.7", value: "8.7" },
      ],
      media: "/professional-asian-businesswoman-creative-team-col.jpg",
      mediaType: "image" as const,
    },
    {
      id: "milestone-2024-q2",
      year: "2024",
      quarter: "Q2",
      title: "AI Content Factory",
      description: "Chuẩn hoá pipeline nội dung đa kênh, tăng tốc độ sản xuất và giảm chi phí vận hành.",
      bullets: ["Tự động hoá quy trình sáng tạo", "Template library 200+ mẫu", "Multi-channel distribution"],
      kpis: [
        { label: "-60% Time", value: "-60%" },
        { label: "CTR +22%", value: "+22%" },
      ],
      media: "/ai-content-creation-technology-workspace.jpg",
      mediaType: "image" as const,
    },
    {
      id: "milestone-2024-q4",
      year: "2024",
      quarter: "Q4",
      title: "InsightX Analytics",
      description: "Ra quyết định theo dữ liệu real-time với dashboard analytics và A/B testing tự động.",
      bullets: ["Real-time performance tracking", "Predictive analytics AI", "Auto budget optimization"],
      kpis: [
        { label: "ROAS 5.2x", value: "5.2x" },
        { label: "CPA -27%", value: "-27%" },
      ],
      media: "/ab-testing-dashboard-analytics-comparison.jpg",
      mediaType: "image" as const,
      beforeAfter: {
        before: "/fashion-ad-before-traditional-design.jpg",
        after: "/fashion-ad-after-ai-modern-vibrant.jpg",
      },
    },
    {
      id: "milestone-2025-q1",
      year: "2025",
      quarter: "Q1",
      title: "Livestream AI Ops",
      description: "Chuẩn hoá vận hành live đa nền tảng với AI monitoring và real-time optimization.",
      bullets: ["Multi-platform streaming", "AI script assistant", "Real-time engagement tracking"],
      kpis: [
        { label: "4,000h/quarter", value: "4K+" },
        { label: "1.2M+ views", value: "1.2M+" },
      ],
      media: "/tiktok-viral-campaign.jpg",
      mediaType: "image" as const,
    },
    {
      id: "milestone-2025-q3",
      year: "2025",
      quarter: "Q3",
      title: "Mở rộng hệ sinh thái",
      description: "Triển khai AI Sales Agent và Automation Hub, hoàn thiện hệ sinh thái giải pháp toàn diện.",
      bullets: ["AI Sales Agent 24/7", "Automation Hub launch", "Partner ecosystem 20+"],
      kpis: [
        { label: "+38% ROI TB", value: "+38%" },
        { label: "20+ đối tác", value: "20+" },
      ],
      media: "/brand-storytelling-digital.jpg",
      mediaType: "image" as const,
    },
  ]

  const years = ["2023", "2024", "2025"]

  const scrollToMilestone = (index: number) => {
    const element = document.getElementById(milestones[index].id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  // Intersection observer for active milestone
  useEffect(() => {
    const observers = milestones.map((milestone, index) => {
      const element = document.getElementById(milestone.id)
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveMilestone(index)
          }
        },
        { threshold: 0.5, rootMargin: "-50% 0px -50% 0px" },
      )

      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  const aiCapabilities = [
    {
      icon: Sparkles,
      title: "AI Content Factory",
      description: "Tự động tạo nội dung đa kênh",
      angle: 0,
    },
    {
      icon: Cpu,
      title: "AI Sales Agent",
      description: "Chatbot thông minh 24/7",
      angle: 72,
    },
    {
      icon: BarChart3,
      title: "Automation Hub",
      description: "Tự động hóa quy trình",
      angle: 144,
    },
    {
      icon: Video,
      title: "Livestream AI",
      description: "Quản lý livestream thông minh",
      angle: 216,
    },
    {
      icon: LineChart,
      title: "InsightX",
      description: "Phân tích dữ liệu AI",
      angle: 288,
    },
  ]

  const partners = [
    { name: "Google", logo: "/google-logo.jpg" },
    { name: "Meta", logo: "/facebook-meta-logo.jpg" },
    { name: "HubSpot", logo: "/hubspot-logo.jpg" },
    { name: "Shopify", logo: "/shopify-logo.jpg" },
    { name: "Salesforce", logo: "/salesforce-logo.jpg" },
    { name: "Mailchimp", logo: "/mailchimp-logo-abstract.jpg" },
  ]

  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />

      <main className="bg-white">
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Parallax Layer 1 - Background */}
          <motion.div
            style={{ y: useTransform(heroScrollProgress, [0, 1], [0, 100]) }}
            className="absolute inset-0 bg-gradient-to-br from-vietsolve-red via-vietsolve-burgundy to-gray-900"
          >
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(220, 38, 38, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 80%, rgba(220, 38, 38, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.3) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>

          {/* Parallax Layer 2 - Grid with motion */}
          <motion.div
            style={{ y: useTransform(heroScrollProgress, [0, 1], [0, 50]) }}
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]"
          >
            <motion.div
              animate={{ backgroundPosition: ["0px 0px", "64px 64px"] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"
            />
          </motion.div>

          {/* Depth blur overlay */}
          <div className="absolute inset-0 backdrop-blur-[0.5px]" />

          <motion.div
            style={{ opacity, scale }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">AI Creative Agency</span>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight relative">
                Vietsolve — Creative Agency
                <br />
                <HeadingHighlight>tiên phong ứng dụng AI</HeadingHighlight>
              </h1>

              <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                Chúng tôi kết hợp sức mạnh công nghệ và sáng tạo con người để tạo ra chiến dịch hiệu quả vượt trội.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-white text-vietsolve-red rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-2xl inline-flex items-center gap-2 overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-vietsolve-red/20 to-orange-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <span className="relative z-10">Khám phá hành trình</span>
                    <ArrowRight className="w-5 h-5 relative z-10" />
                    <motion.div
                      className="absolute inset-0 border-2 border-vietsolve-red/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-white/20 transition-colors border border-white/30 inline-flex items-center gap-2"
                  >
                    Liên hệ hợp tác
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
            >
              <motion.div className="w-1 h-2 bg-white rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        <section className="py-40 bg-gradient-to-br from-white via-red-50/20 to-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-vietsolve-red/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-vietsolve-burgundy/5 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Giới thiệu <span className="text-vietsolve-red">VietSolve</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy mx-auto" />
            </motion.div>

            {/* CHANGE: Changed from 2-column grid to stacked layout: bird section full-width on top, 3 cards in row below */}
            <div className="space-y-16">
              {/* Bird Symbol Section - Full Width Horizontal */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative h-[500px] rounded-3xl overflow-hidden"
              >
                {/* Radial gradient spotlight background */}
                <div className="absolute inset-0 bg-gradient-to-br from-vietsolve-red via-vietsolve-burgundy to-gray-900">
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)",
                        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 0%, transparent 60%)",
                        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)",
                      ],
                    }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                </div>

                {/* Parallax Layer 1: Background particles (slowest) */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/40 rounded-full blur-sm"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Parallax Layer 2: Bird body (medium speed) */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                >
                  <motion.div
                    className="relative w-64 h-64"
                    animate={{
                      rotate: [-2, 2, -2],
                    }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    {/* Bird silhouette using VietSolve bird image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src="/images/design-mode/conchim-vietsolve.png"
                        alt="VietSolve Bird Logo"
                        className="w-48 h-48 object-contain drop-shadow-2xl"
                      />
                    </div>

                    {/* AI energy glow */}
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full blur-3xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.div>
                </motion.div>

                {/* Parallax Layer 3: Wing particles (fastest) */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    y: [0, -30, 0],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-gradient-to-br from-white to-vietsolve-red/50 rounded-full blur-md"
                      style={{
                        left: `${40 + Math.random() * 20}%`,
                        top: `${40 + Math.random() * 20}%`,
                      }}
                      animate={{
                        x: [0, (Math.random() - 0.5) * 40, 0],
                        y: [0, (Math.random() - 0.5) * 40, 0],
                        scale: [1, 1.8, 1],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 1.5,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Blur motion overlay for AI energy effect */}
                <motion.div
                  className="absolute inset-0 backdrop-blur-[0.5px]"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                />

                {/* Caption with bird symbol introduction */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute bottom-8 left-0 right-0 px-8"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold text-white mb-3 text-center">Biểu tượng chim Lạc</h3>
                    <p className="text-base lg:text-lg text-white/90 leading-relaxed text-center">
                      Thể hiện tinh thần dân tộc, khát vọng bay cao vươn xa, nhưng vẫn giữ gìn bản sắc văn hóa Việt Nam
                      – cũng chính là tinh thần mà VietSolve theo đuổi trong mọi dự án.
                    </p>
                    <motion.div
                      className="w-24 h-1 bg-gradient-to-r from-white/60 via-white to-white/60 mx-auto mt-4 rounded-full"
                      animate={{
                        scaleX: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Three Cards - Horizontal Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    rotateX: 6,
                    rotateY: -6,
                    scale: 1.02,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-400 border-2 border-transparent hover:border-gradient"
                >
                  {/* Border gradient effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-vietsolve-red/30 via-vietsolve-burgundy/20 to-vietsolve-red/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400 -z-10 blur-sm" />
                  <div
                    className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br from-vietsolve-red/40 to-vietsolve-burgundy/40 bg-clip-border opacity-20 group-hover:opacity-60 transition-opacity duration-400"
                    style={{ WebkitMaskComposite: "xor", maskComposite: "exclude" }}
                  />

                  {/* Glow shadow on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-vietsolve-red/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-400 -z-20" />

                  <motion.div
                    className="w-14 h-14 bg-gradient-to-br from-vietsolve-red to-vietsolve-burgundy rounded-2xl flex items-center justify-center mb-4"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Rocket className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Agency đồng hành cùng doanh nghiệp</h3>
                  <p className="text-gray-600 leading-relaxed">
                    VietSolve là{" "}
                    <span className="font-semibold text-vietsolve-red">Agency sáng tạo – công nghệ – truyền thông</span>{" "}
                    đồng hành cùng doanh nghiệp Việt Nam trong hành trình xây dựng thương hiệu và tăng trưởng bền vững.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{
                    rotateX: 6,
                    rotateY: -6,
                    scale: 1.02,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-400"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/30 via-red-600/20 to-orange-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400 -z-10 blur-sm" />
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br from-orange-500/40 to-red-600/40 bg-clip-border opacity-20 group-hover:opacity-60 transition-opacity duration-400" />
                  <div className="absolute inset-0 rounded-3xl bg-orange-500/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-400 -z-20" />

                  <motion.div
                    className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4"
                    whileHover={{ rotate: -5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sparkles className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Hệ sinh thái giải pháp toàn diện</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Với hệ sinh thái giải pháp đa dạng từ branding, truyền thông, quảng cáo, media, sản xuất nội dung,
                    SEO, website, AI & automation, đến phát triển công nghệ, VietSolve giúp doanh nghiệp{" "}
                    <span className="font-semibold text-vietsolve-red">
                      giải quyết vấn đề – kiến tạo giá trị – phát triển dài hạn
                    </span>
                    .
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{
                    rotateX: 6,
                    rotateY: -6,
                    scale: 1.02,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-400"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-600/30 via-pink-600/20 to-red-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400 -z-10 blur-sm" />
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br from-red-600/40 to-pink-600/40 bg-clip-border opacity-20 group-hover:opacity-60 transition-opacity duration-400" />
                  <div className="absolute inset-0 rounded-3xl bg-red-600/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-400 -z-20" />

                  <motion.div
                    className="w-14 h-14 bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl flex items-center justify-center mb-4"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Brain className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Công nghệ & AI tiên tiến</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Lấy <span className="font-semibold text-vietsolve-red">Sáng tạo – Trí tuệ – Đổi mới</span> làm giá
                    trị cốt lõi, VietSolve không chỉ mang đến ý tưởng độc đáo mà còn ứng dụng công nghệ và AI vào quy
                    trình, tạo ra giải pháp tối ưu, hiệu quả và phù hợp với đặc thù từng doanh nghiệp.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-vietsolve-burgundy to-vietsolve-red">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

          <div className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-28 xl:py-32 space-y-28 relative z-10">
            {/* Mission */}
            <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="col-span-12 md:col-span-6 order-2 md:order-1"
              >
                <h2 className="text-4xl md:text-5xl xl:text-6xl font-semibold tracking-tight text-white">
                  Our{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-purple-500">
                    Mission
                  </span>
                </h2>
                <p className="mt-5 text-base md:text-lg text-white/80">
                  Ứng dụng AI + sáng tạo để giúp thương hiệu Việt tăng trưởng nhanh, tiết kiệm chi phí.
                </p>
                <ul className="mt-6 space-y-3 text-white/80">
                  <li>• AI Content Factory – tạo nội dung 5× nhanh</li>
                  <li>• Automation Hub – tối ưu quy trình & chi phí</li>
                  <li>• InsightX – ra quyết định dựa trên dữ liệu</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="col-span-12 md:col-span-6 order-1 md:order-2"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                  <img
                    src="/professional-asian-businesswoman-creative-team-col.jpg"
                    alt="Modern Creative Office Teamwork"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>

            {/* Vision */}
            <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="col-span-12 md:col-span-6"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                  <img
                    src="/ceo-vision-business-strategy-futuristic.jpg"
                    alt="CEO Vision Business Strategy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="col-span-12 md:col-span-6"
              >
                <h2 className="text-4xl md:text-5xl xl:text-6xl font-semibold tracking-tight text-white">
                  Our{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500">
                    Vision
                  </span>
                </h2>
                <p className="mt-5 text-base md:text-lg text-white/80">
                  Trở thành AI Creative Agency dẫn đầu Đông Nam Á về hiệu quả và trải nghiệm.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                  >
                    <div className="text-2xl font-semibold text-white">+38%</div>
                    <div className="text-sm text-white/70">ROI TB</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                  >
                    <div className="text-2xl font-semibold text-white">1.2K+</div>
                    <div className="text-sm text-white/70">Lead/Tháng</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-28 bg-white relative overflow-hidden">
          {/* Subtle background elements */}
          <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Năng lực cốt lõi</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                AI-first & End-to-end Creative Operations
              </p>
            </motion.div>

            {/* 6 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Lightbulb,
                  color: "orange" as const,
                  title: "AI Creative Studio",
                  description: "Tạo content/visual/spot nhanh hơn 5× nhờ pipeline AI.",
                  bullets: ["Idea → KV → Video ngắn", "A/B nhanh theo insight"],
                },
                {
                  icon: Target,
                  color: "blue" as const,
                  title: "Performance Marketing",
                  description: "Tập trung KPI: CTR, CPA, ROAS.",
                  bullets: ["Budget re-allocation tự động", "Learning theo kênh"],
                },
                {
                  icon: Video,
                  color: "pink" as const,
                  title: "Livestream Operations",
                  description: "Vận hành live đa nền tảng theo chuẩn studio.",
                  bullets: ["4,000h+/quý", "Playbook tối ưu chuyển đổi"],
                },
                {
                  icon: Workflow,
                  color: "purple" as const,
                  title: "Automation Hub",
                  description: "Chuẩn hoá & tự động hoá quy trình marketing.",
                  bullets: ["Approve/QA tự động", "Workflow đa công cụ"],
                },
                {
                  icon: Palette,
                  color: "indigo" as const,
                  title: "Brand Strategy",
                  description: "Định vị thương hiệu & câu chuyện nhất quán.",
                  bullets: ["Narrative/Architecture", "Campaign big idea"],
                },
                {
                  icon: BarChart,
                  color: "green" as const,
                  title: "Data Analytics & Insights",
                  description: "InsightX realtime dẫn dắt quyết định.",
                  bullets: ["Dashboard hợp nhất", "Cảnh báo bất thường"],
                },
              ].map((capability, index) => {
                const Icon = capability.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -6,
                      rotateX: 3,
                      rotateY: -3,
                    }}
                    style={{ transformStyle: "preserve-3d", breakInside: "avoid" }}
                    className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-gradient overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Gradient border glow on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-vietsolve-red/40 via-vietsolve-burgundy/30 to-vietsolve-red/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
                    <div
                      className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-vietsolve-red/50 to-vietsolve-burgundy/50 opacity-20 group-hover:opacity-60 transition-opacity duration-300"
                      style={{ WebkitMaskComposite: "xor", maskComposite: "exclude" }}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-vietsolve-red/10 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-20 ring-1 ring-rose-400/30" />

                    {/* Card content */}
                    <div className="relative bg-white rounded-2xl p-6">
                      {/* Header with icon and badge */}
                      <div className="flex items-start justify-between mb-4">
                        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
                          <GlossyIcon color={capability.color} size="sm">
                            <Icon className="w-full h-full" />
                          </GlossyIcon>
                        </motion.div>

                        {/* AI-Powered Badge */}
                        <div className="px-3 py-1 bg-gradient-to-r from-vietsolve-red/10 to-vietsolve-burgundy/10 rounded-full border border-vietsolve-red/20">
                          <span className="text-xs font-bold text-vietsolve-red">AI-Powered</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{capability.title}</h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">{capability.description}</p>

                      {/* Bullets */}
                      <ul className="space-y-2">
                        {capability.bullets.map((bullet, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-700 group/item"
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Check className="w-4 h-4 text-gray-400 group-hover/item:text-vietsolve-red transition-colors duration-200 flex-shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-40 bg-gradient-to-br from-gray-50 to-red-50/30 relative overflow-hidden">
          {/* Animated background stripes + noise */}
          <motion.div
            className="absolute inset-0 opacity-[0.02] pointer-events-none motion-reduce:hidden"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(201, 74, 74, 0.1) 10px,
                rgba(201, 74, 74, 0.1) 20px
              )`,
            }}
            animate={{
              backgroundPosition: ["0px 0px", "40px 40px"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-12 gap-8 lg:gap-12">
              {/* Left Sidebar - Sticky */}
              <div className="col-span-12 lg:col-span-4">
                <div className="lg:sticky lg:top-20 space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Giá trị cốt lõi</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Bốn giá trị cốt lõi định hình cách chúng tôi làm việc và tạo ra giá trị vượt trội cho khách hàng.
                    </p>
                  </motion.div>

                  {/* Filter Tabs */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                    role="tablist"
                    aria-label="Core values categories"
                  >
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        className={`
                          w-full text-left px-6 py-3 rounded-xl font-semibold transition-all duration-300
                          ${
                            activeTab === tab.id
                              ? "bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy text-white shadow-lg"
                              : "bg-white/60 text-gray-700 hover:bg-white hover:shadow-md"
                          }
                        `}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Right Content - Cards Grid */}
              <div className="col-span-12 lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredValues.map((value, index) => {
                    const Icon = value.icon
                    const isExpanded = expandedCard === value.id

                    return (
                      <motion.div
                        key={value.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.08,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                        whileHover={{
                          y: -6,
                          rotateX: 5,
                          rotateY: -5,
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                          breakInside: "avoid",
                        }}
                        className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-transparent hover:border-gradient overflow-hidden"
                      >
                        {/* Gradient border effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-vietsolve-red/40 via-vietsolve-burgundy/30 to-vietsolve-red/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
                        <div
                          className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-vietsolve-red/50 to-vietsolve-burgundy/50 opacity-20 group-hover:opacity-60 transition-opacity duration-300"
                          style={{ WebkitMaskComposite: "xor", maskComposite: "exclude" }}
                        />

                        {/* Card content */}
                        <div className="relative bg-white rounded-2xl p-6 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                          {/* Header with icon and KPI badge */}
                          <div className="flex items-start justify-between mb-4">
                            <motion.div
                              animate={{
                                scale: [1, 1.02, 0.98, 1],
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                              style={{
                                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                              }}
                              className="motion-reduce:animate-none"
                            >
                              <GlossyIcon color={value.color} size="sm">
                                <Icon className="w-full h-full" />
                              </GlossyIcon>
                            </motion.div>

                            {/* KPI Badge */}
                            <div className="px-3 py-1 bg-gradient-to-r from-vietsolve-red/10 to-vietsolve-burgundy/10 rounded-full border border-vietsolve-red/20">
                              <span className="text-xs font-bold text-vietsolve-red">{value.kpi}</span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>

                          {/* Description */}
                          <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{value.description}</p>

                          {/* Bullet list */}
                          <ul className="space-y-2 mb-4">
                            {value.bullets.map((bullet, i) => (
                              <motion.li
                                key={i}
                                className="flex items-start gap-2 text-sm text-gray-700 group/item"
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Check className="w-4 h-4 text-gray-400 group-hover/item:text-vietsolve-red transition-colors duration-200 flex-shrink-0 mt-0.5" />
                                <span>{bullet}</span>
                              </motion.li>
                            ))}
                          </ul>

                          {/* Footer - Example toggle */}
                          <button
                            onClick={() => setExpandedCard(isExpanded ? null : value.id)}
                            className="w-full flex items-center justify-between text-sm font-semibold text-vietsolve-red hover:text-vietsolve-burgundy transition-colors duration-200 group/btn"
                          >
                            <span>Ví dụ ứng dụng</span>
                            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                          </button>

                          {/* Expandable example panel */}
                          <motion.div
                            initial={false}
                            animate={{
                              height: isExpanded ? "auto" : 0,
                              opacity: isExpanded ? 1 : 0,
                              marginTop: isExpanded ? 12 : 0,
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 bg-gradient-to-br from-gray-50 to-red-50/30 rounded-xl border border-gray-100">
                              <p className="text-sm text-gray-700 leading-relaxed">{value.example}</p>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-28 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            {/* Row 1: Counters */}
            <CountingStats
              stats={[
                { value: 50, suffix: "+", label: "thương hiệu tin tưởng" },
                { value: 38, suffix: "%", label: "ROI trung bình" },
                { value: 1.2, suffix: "M+", label: "lượt xem / campaign" },
              ]}
            />

            {/* Row 2: Logo Wall with Marquee */}
            <div className="mt-16 space-y-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Đối tác & Công nghệ</h3>
                <Link href="/case-studies">
                  <GlowButton ripple magnetic>
                    Xem Case Studies
                  </GlowButton>
                </Link>
              </div>

              {/* Marquee Row 1 - Left to Right */}
              <div className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

                <motion.div
                  className="flex gap-x-10 md:gap-x-14 motion-reduce:animate-none"
                  animate={{
                    x: [0, -1000],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  whileHover={{ animationPlayState: "paused" }}
                >
                  {[...Array(3)].map((_, setIndex) => (
                    <div key={setIndex} className="flex gap-x-10 md:gap-x-14 flex-shrink-0">
                      {[
                        { name: "Google", logo: "/google-logo.jpg" },
                        { name: "Meta", logo: "/facebook-meta-logo.jpg" },
                        { name: "Shopify", logo: "/shopify-logo.jpg" },
                      ].map((partner, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center h-10 md:h-12 opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                        >
                          <img
                            src={partner.logo || "/placeholder.svg"}
                            alt={partner.name}
                            className="h-full w-auto object-contain"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Marquee Row 2 - Right to Left */}
              <div className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

                <motion.div
                  className="flex gap-x-10 md:gap-x-14 motion-reduce:animate-none"
                  animate={{
                    x: [-1000, 0],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  whileHover={{ animationPlayState: "paused" }}
                >
                  {[...Array(3)].map((_, setIndex) => (
                    <div key={setIndex} className="flex gap-x-10 md:gap-x-14 flex-shrink-0">
                      {[
                        { name: "Salesforce", logo: "/salesforce-logo.jpg" },
                        { name: "HubSpot", logo: "/hubspot-logo.jpg" },
                        { name: "Mailchimp", logo: "/mailchimp-logo-abstract.jpg" },
                      ].map((partner, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center h-10 md:h-12 opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                        >
                          <img
                            src={partner.logo || "/placeholder.svg"}
                            alt={partner.name}
                            className="h-full w-auto object-contain"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section ref={timelineRef} className="py-24 md:py-28 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12">
              {/* Left Sidebar - Sticky */}
              <div className="col-span-12 lg:col-span-3">
                <div className="lg:sticky lg:top-28 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                      Quá trình hình thành và phát triển
                    </h2>
                    <p className="text-base text-gray-600 leading-relaxed">
                      Hành trình đột phá từ startup đến AI Creative Agency hàng đầu
                    </p>
                  </motion.div>

                  {/* Year anchors */}
                  <nav className="space-y-2" aria-label="Timeline navigation">
                    {years.map((year, index) => {
                      const isActive = milestones[activeMilestone]?.year === year
                      return (
                        <button
                          key={year}
                          onClick={() => {
                            const firstMilestoneIndex = milestones.findIndex((m) => m.year === year)
                            if (firstMilestoneIndex !== -1) scrollToMilestone(firstMilestoneIndex)
                          }}
                          aria-current={isActive ? "true" : undefined}
                          aria-controls={`milestone-${year}`}
                          className={`
                            w-full text-left px-4 py-2 rounded-lg font-semibold transition-all duration-300
                            ${
                              isActive
                                ? "text-white bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600 shadow-lg"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            }
                          `}
                        >
                          {year}
                        </button>
                      )
                    })}
                  </nav>
                </div>
              </div>

              {/* Right Content - Timeline */}
              <div ref={timelineContentRef} className="col-span-12 lg:col-span-9 relative">
                {/* Timeline axis */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 -translate-x-1/2 hidden md:block" />

                {/* Progress line */}
                <motion.div
                  className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-rose-400 via-pink-500 to-purple-600 -translate-x-1/2 origin-top hidden md:block"
                  style={{ height: `${timelineProgress.get()}%` }}
                />

                {/* Progress dot */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-rose-400 to-purple-600 shadow-lg hidden md:block z-20"
                  style={{
                    top: `${timelineProgress.get()}%`,
                  }}
                  animate={{
                    scale: [1, 1.15, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(244, 114, 182, 0.7)",
                      "0 0 0 8px rgba(244, 114, 182, 0)",
                      "0 0 0 0 rgba(244, 114, 182, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />

                {/* Milestones */}
                <div className="space-y-32 md:space-y-40">
                  {milestones.map((milestone, index) => {
                    const isLeft = index % 2 === 0
                    const isActive = activeMilestone === index

                    return (
                      <motion.div
                        key={milestone.id}
                        id={milestone.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.08 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className={`grid grid-cols-12 gap-6 items-center relative ${
                          isLeft ? "" : "md:flex-row-reverse"
                        }`}
                      >
                        {/* Milestone dot on axis */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block z-10">
                          <motion.div
                            className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 to-purple-600 shadow-xl"
                            animate={
                              isActive
                                ? {
                                    scale: [1, 1.15, 1],
                                    boxShadow: [
                                      "0 0 0 0 rgba(244, 114, 182, 0.7)",
                                      "0 0 0 12px rgba(244, 114, 182, 0)",
                                      "0 0 0 0 rgba(244, 114, 182, 0)",
                                    ],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            <div className="absolute inset-1 bg-white rounded-full" />
                          </motion.div>
                        </div>

                        {/* Card */}
                        <div className={`col-span-12 ${isLeft ? "md:col-span-5" : "md:col-span-5 md:col-start-8"}`}>
                          <motion.div
                            whileHover={{ y: -4, scale: 1.02 }}
                            className="relative bg-white rounded-2xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                          >
                            {/* Gradient border glow on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />

                            {/* Media */}
                            <div className="relative aspect-video overflow-hidden">
                              <img
                                src={milestone.media || "/placeholder.svg"}
                                alt={milestone.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                              {/* KPI badges */}
                              <div className="absolute top-3 right-3 flex flex-wrap gap-2 justify-end">
                                {milestone.kpis.map((kpi, i) => (
                                  <div
                                    key={i}
                                    className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 shadow-lg"
                                  >
                                    <span className="text-xs font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                                      {kpi.value}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                              {/* Header */}
                              <div className="flex items-center gap-3 mb-3">
                                <div className="px-3 py-1 bg-gradient-to-r from-rose-400/10 to-purple-600/10 rounded-full border border-rose-400/20">
                                  <span className="text-xs font-bold text-rose-600">
                                    {milestone.year} {milestone.quarter}
                                  </span>
                                </div>
                              </div>

                              <h3 className="text-2xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                              <p className="text-sm text-gray-600 leading-relaxed mb-4">{milestone.description}</p>

                              {/* Bullets */}
                              <ul className="space-y-2 mb-6">
                                {milestone.bullets.map((bullet, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                    <Check className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>

                              {/* CTAs */}
                              <div className="flex items-center gap-3">
                                <Link href="/case-studies">
                                  <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                                    Xem case
                                  </button>
                                </Link>
                                <Link href="/contact">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group"
                                  >
                                    <span className="relative z-10">Liên hệ</span>
                                    <motion.div
                                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                      animate={{
                                        scale: [1, 1.05, 1],
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Number.POSITIVE_INFINITY,
                                      }}
                                    />
                                  </motion.button>
                                </Link>
                              </div>
                            </div>

                            {/* Before/After slider (only for InsightX milestone) */}
                            {milestone.beforeAfter && (
                              <div className="p-6 pt-0">
                                <div className="border-t border-gray-100 pt-6">
                                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Before / After</h4>

                                  {/* Desktop: Slider */}
                                  <div className="hidden md:block relative aspect-video rounded-xl overflow-hidden ring-1 ring-gray-200">
                                    {/* After image (bottom layer) */}
                                    <img
                                      src={milestone.beforeAfter.after || "/placeholder.svg"}
                                      alt="After AI optimization"
                                      className="absolute inset-0 w-full h-full object-cover"
                                      loading="lazy"
                                    />

                                    {/* Before image (top layer with controlled width) */}
                                    <div
                                      className="absolute inset-0 overflow-hidden"
                                      style={{ width: `${beforeAfterPosition}%` }}
                                    >
                                      <img
                                        src={milestone.beforeAfter.before || "/placeholder.svg"}
                                        alt="Before traditional design"
                                        className="absolute inset-0 w-full h-full object-cover"
                                        style={{ width: `${(100 / beforeAfterPosition) * 100}%` }}
                                        loading="lazy"
                                      />
                                    </div>

                                    {/* Slider handle */}
                                    <div
                                      className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                                      style={{ left: `${beforeAfterPosition}%` }}
                                    >
                                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center">
                                        <div className="w-4 h-4 border-l-2 border-r-2 border-gray-400" />
                                      </div>
                                    </div>

                                    {/* Labels */}
                                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full">
                                      <span className="text-xs font-semibold text-white">Before</span>
                                    </div>
                                    <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full">
                                      <span className="text-xs font-semibold text-white">After</span>
                                    </div>

                                    {/* Range input */}
                                    <input
                                      type="range"
                                      min="0"
                                      max="100"
                                      value={beforeAfterPosition}
                                      onChange={(e) => setBeforeAfterPosition(Number(e.target.value))}
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                                      aria-label="Before/After slider"
                                    />
                                  </div>

                                  {/* Mobile: Stacked images */}
                                  <div className="md:hidden space-y-3">
                                    <div className="relative aspect-video rounded-xl overflow-hidden ring-1 ring-gray-200">
                                      <img
                                        src={milestone.beforeAfter.before || "/placeholder.svg"}
                                        alt="Before traditional design"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                      />
                                      <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full">
                                        <span className="text-xs font-semibold text-white">Before</span>
                                      </div>
                                    </div>
                                    <div className="relative aspect-video rounded-xl overflow-hidden ring-1 ring-gray-200">
                                      <img
                                        src={milestone.beforeAfter.after || "/placeholder.svg"}
                                        alt="After AI optimization"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                      />
                                      <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full">
                                        <span className="text-xs font-semibold text-white">After</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-gradient-to-br from-vietsolve-burgundy via-gray-900 to-vietsolve-red">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-30">
            <AnimatedBackground />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-8 py-28 md:py-32 relative z-10">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Hệ sinh thái Vietsolve</h2>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                Cùng kiến tạo tương lai AI-driven cho thương hiệu Việt.
              </p>
            </motion.div>

            {/* Ecosystem Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-16">
              {[
                { name: "MG Agency", subtitle: "Creative & Livestream Ops", icon: Palette },
                { name: "AgenAI", subtitle: "AI Agents & Automation", icon: Cpu },
                { name: "BusinessAI", subtitle: "AI for SMEs", icon: TrendingUp },
                { name: "LearningAI", subtitle: "AI Education Platform", icon: Brain },
                { name: "AIECOS", subtitle: "AI Ecosystem & Platforms", icon: Sparkles },
              ].map((ecosystem, index) => {
                const Icon = ecosystem.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="relative group"
                  >
                    {/* Connection line (animated gradient bar) */}
                    {index < 4 && (
                      <motion.div
                        className="absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-vietsolve-red via-pink-500 to-purple-600 hidden md:block motion-reduce:hidden"
                        animate={{
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.4,
                        }}
                      />
                    )}

                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-gradient p-6 text-center transition-all duration-300 hover:shadow-2xl">
                      {/* Gradient border glow on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-vietsolve-red/40 via-vietsolve-burgundy/30 to-vietsolve-red/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />

                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-vietsolve-red to-vietsolve-burgundy rounded-2xl flex items-center justify-center">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{ecosystem.name}</h3>
                      <p className="text-sm text-white/70">{ecosystem.subtitle}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's co-create your AI-driven brand.</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <GlowButton
                  magnetic
                  ripple
                  size="lg"
                  onClick={() => {
                    setShowToast(true)
                    setTimeout(() => setShowToast(false), 3000)
                  }}
                >
                  Book a Strategy Session
                </GlowButton>
                <Link href="/services">
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-white/20 transition-colors border border-white/30">
                    Xem năng lực chi tiết
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Toast Notification */}
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 bg-white rounded-xl shadow-2xl p-6 z-50 max-w-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-vietsolve-red to-vietsolve-burgundy rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Yêu cầu đã được gửi!</h4>
                  <p className="text-sm text-gray-600">Chúng tôi sẽ liên hệ trong 24h.</p>
                </div>
              </div>
            </motion.div>
          )}
        </section>
      </main>

      <AnimatedFooter />
    </div>
  )
}
