"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import {
  Sparkles,
  Brain,
  Zap,
  TrendingUp,
  Users,
  ArrowRight,
  Target,
  Rocket,
  BarChart3,
  Cpu,
  Video,
  LineChart,
} from "lucide-react"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  })

  const opacity = useTransform(heroScrollProgress, [0, 1], [1, 0])
  const scale = useTransform(heroScrollProgress, [0, 1], [1, 0.8])
  const timelineGradient = useTransform(timelineScrollProgress, [0, 1], [0, 100])

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

  const timeline = [
    {
      year: "2023",
      title: "Khởi đầu",
      description: "Thành lập từ nhóm sáng tạo công nghệ với tầm nhìn ứng dụng AI vào Marketing.",
    },
    {
      year: "2024",
      title: "Phát triển",
      description: "Ra mắt dịch vụ AI Marketing & Livestream Solutions, phục vụ 50+ khách hàng.",
    },
    {
      year: "2025",
      title: "Đột phá",
      description: "Trở thành đối tác OpenAI & TikTok Agency Partner, mở rộng hệ sinh thái AI.",
    },
  ]

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
    { name: "Google", logo: "/google-logo.png" },
    { name: "Meta", logo: "/facebook-meta-logo.jpg" },
    { name: "HubSpot", logo: "/hubspot-logo.png" },
    { name: "Shopify", logo: "/shopify-logo.png" },
    { name: "Salesforce", logo: "/salesforce-logo.png" },
    { name: "Mailchimp", logo: "/mailchimp-logo-abstract.png" },
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
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent relative inline-block">
                  tiên phong ứng dụng AI
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear", repeatDelay: 2 }}
                    style={{ maskImage: "linear-gradient(to right, transparent, black, transparent)" }}
                  />
                </span>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-8">
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

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative h-full min-h-[600px] rounded-3xl overflow-hidden"
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
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
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
            </div>
          </div>
        </section>

        <section className="py-40 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              
              
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: Headline */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  Chúng tôi tin rằng sáng tạo không dừng ở cảm hứng —{" "}
                  <span className="bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy bg-clip-text text-transparent">
                    mà ở dữ liệu, công nghệ và con người.
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  AI không thay thế sáng tạo, mà giúp chúng ta sáng tạo nhanh hơn, chính xác hơn và hiệu quả hơn.
                </p>
              </motion.div>

              {/* Right: Animated AI connections */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative h-96"
              >
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  {/* Central node */}
                  <motion.circle
                    cx="200"
                    cy="200"
                    r="40"
                    fill="url(#gradient1)"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />

                  {/* Connecting lines */}
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const x = 200 + Math.cos((angle * Math.PI) / 180) * 120
                    const y = 200 + Math.sin((angle * Math.PI) / 180) * 120
                    return (
                      <motion.g key={i}>
                        <motion.line
                          x1="200"
                          y1="200"
                          x2={x}
                          y2={y}
                          stroke="url(#gradient2)"
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                        />
                        <motion.circle
                          cx={x}
                          cy={y}
                          r="20"
                          fill="url(#gradient1)"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                        />
                        <motion.circle
                          cx={x}
                          cy={y}
                          r="20"
                          fill="none"
                          stroke="url(#gradient2)"
                          strokeWidth="2"
                          animate={{ r: [20, 30, 20] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
                          opacity="0.5"
                        />
                      </motion.g>
                    )
                  })}

                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C94A4A" />
                      <stop offset="100%" stopColor="#5A2A3A" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C94A4A" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#5A2A3A" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision - Enhanced */}
        <section className="py-40 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative bg-gradient-to-br from-vietsolve-red to-vietsolve-burgundy p-12 rounded-3xl text-white shadow-2xl overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
                <Target className="w-16 h-16 mb-6 relative z-10" />
                <h3 className="text-3xl font-bold mb-4 relative z-10">Mission</h3>
                <p className="text-xl leading-relaxed text-white/90 relative z-10">
                  Ứng dụng AI để tái định nghĩa sự sáng tạo và tối ưu chi phí cho thương hiệu Việt.
                </p>
                <motion.div
                  className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-800 p-12 rounded-3xl text-white shadow-2xl overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                />
                <Rocket className="w-16 h-16 mb-6 relative z-10" />
                <h3 className="text-3xl font-bold mb-4 relative z-10">Vision</h3>
                <p className="text-xl leading-relaxed text-white/90 relative z-10">
                  Trở thành Agency AI hàng đầu Đông Nam Á về sáng tạo chiến lược và vận hành truyền thông.
                </p>
                <motion.div
                  className="absolute -bottom-10 -right-10 w-40 h-40 bg-vietsolve-red/20 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-40 bg-gradient-to-br from-gray-50 to-red-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Giá trị cốt lõi   </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Bốn giá trị cốt lõi định hình cách chúng tôi làm việc và tạo ra giá trị
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coreValues.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-1 transition-opacity duration-300`}
                    />

                    {/* Reflection effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ transform: "translateX(-100%)" }}
                      animate={{ transform: "translateX(100%)" }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                    />

                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed relative z-10">{value.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section ref={timelineRef} className="py-40 bg-white relative overflow-hidden">
          {/* Scroll-synced gradient line */}
          <motion.div
            className="absolute left-1/2 top-0 w-1 h-full hidden lg:block"
            style={{
              background: `linear-gradient(to bottom, #C94A4A ${timelineGradient}%, #e5e7eb ${timelineGradient}%)`,
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Quá trình hình thành và phát triển   </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Hành trình phát triển và đột phá của Vietsolve</p>
            </motion.div>

            <div className="space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div className="flex-1">
                    <motion.div
                      whileInView={{ scale: 1.05 }}
                      viewport={{ once: true }}
                      className={`bg-white p-8 rounded-3xl shadow-xl border border-gray-100 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}
                    >
                      <div className="font-bold bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy bg-clip-text text-transparent mb-4 text-3xl">
                        {item.year}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </motion.div>
                  </div>

                  {/* Active state highlight */}
                  <motion.div
                    className="relative z-10"
                    whileInView={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-vietsolve-red to-vietsolve-burgundy rounded-full flex items-center justify-center shadow-2xl">
                      <motion.div
                        className="w-8 h-8 bg-white rounded-full"
                        whileInView={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-vietsolve-red rounded-full blur-xl opacity-50"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-40 bg-gradient-to-br from-gray-900 via-vietsolve-burgundy to-vietsolve-red text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

          {/* Ripple light animation */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 0% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center text-white"
            >
              <h2 className="font-bold mb-6 leading-tight text-5xl">
                Cùng Vietsolve kiến tạo
                <br />
                chiến dịch vượt trội cùng AI
              </h2>
              <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
                Đặt lịch tư vấn miễn phí để khám phá cách AI có thể thay đổi cách bạn làm marketing
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(255,255,255,0.3)",
                      "0 0 40px rgba(255,255,255,0.5)",
                      "0 0 20px rgba(255,255,255,0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="px-12 py-5 bg-white text-vietsolve-red rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-2xl inline-flex items-center gap-3"
                >
                  Đặt lịch tư vấn ngay
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <AnimatedFooter />
    </div>
  )
}
