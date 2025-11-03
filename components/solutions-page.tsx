"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Zap, TrendingUp, DollarSign, Target, Lightbulb, Rocket, Check, ChevronDown, ChevronUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import GlossyIcon from "./glossy-icon"
import GlowButton from "./glow-button"

const pricingPlans = [
  {
    name: "Start",
    badge: "Best for SME",
    subline: "Giải pháp cơ bản cho doanh nghiệp nhỏ",
    features: [
      "Content calendar & AI Content Factory (5 posts/tuần)",
      "Phân tích dữ liệu cơ bản",
      "Báo cáo hàng tháng",
      "Hỗ trợ email (48h response)",
      "1 kênh marketing (TikTok hoặc Facebook)",
    ],
    cta: "Nhận báo giá chi tiết",
    featured: false,
  },
  {
    name: "Grow",
    badge: "Best for Growth",
    subline: "Tích hợp AI/Automation & Creative Mix",
    features: [
      "Tất cả tính năng Start",
      "AI Chatbot & Automation Hub",
      "Dashboard realtime + InsightX Analytics",
      "Chiến lược IMC đa kênh (3-4 kênh)",
      "Hỗ trợ ưu tiên (24h response)",
      "CRM/TikTok/Shopee integration",
      "Dedicated Account Manager",
    ],
    cta: "Book demo 15'",
    featured: true,
  },
  {
    name: "Scale",
    badge: "Best for Enterprise",
    subline: "Chiến lược toàn diện – Data Intelligence + AI",
    features: [
      "Tất cả tính năng Grow",
      "AI Data Intelligence & Predictive Analytics",
      "Full CRM Integration (Salesforce, Hubspot)",
      "Custom AI Agent & Workflow Automation",
      "Dedicated Team (AM + Strategist + Creative)",
      "Tư vấn chiến lược 24/7 (8-12h SLA)",
      "White-label solutions",
    ],
    cta: "Bắt đầu dự án",
    featured: false,
  },
]

const comparisonFeatures = [
  { name: "Content calendar & AI Factory", start: "5 posts/tuần", grow: "10 posts/tuần", scale: "Unlimited" },
  { name: "AI Chatbot", start: false, grow: true, scale: true },
  { name: "Dashboard realtime", start: false, grow: true, scale: true },
  { name: "CRM/TikTok/Shopee integration", start: false, grow: "TikTok + 1", scale: "Full integration" },
  { name: "Dedicated Account Manager", start: false, grow: true, scale: "Team" },
  { name: "SLA Response Time", start: "48h", grow: "24h", scale: "8-12h" },
  { name: "Custom AI Agent", start: false, grow: false, scale: true },
  { name: "White-label solutions", start: false, grow: false, scale: true },
]

const processSteps = [
  {
    icon: Target,
    title: "Discovery",
    duration: "1-2 tuần",
    description: "Khảo sát nhu cầu, phân tích thị trường và đối thủ",
  },
  {
    icon: Lightbulb,
    title: "Blueprint",
    duration: "1 tuần",
    description: "Xây dựng chiến lược, roadmap và KPI measurement",
  },
  {
    icon: Rocket,
    title: "Implement",
    duration: "2-4 tuần",
    description: "Triển khai giải pháp, setup automation và training",
  },
  {
    icon: TrendingUp,
    title: "Optimize",
    duration: "Liên tục",
    description: "Đo lường, tối ưu và scale theo dữ liệu thực tế",
  },
]

const caseHighlights = [
  {
    title: "Rabity x ALOHA STITCH",
    brand: "Fashion",
    thumbnail: "/fashion-brand-campaign.jpg",
    kpis: [
      { label: "ROAS", value: "5.2x" },
      { label: "CPA", value: "-27%" },
    ],
  },
  {
    title: "Nordic Naturals Vietnam",
    brand: "Health & Wellness",
    thumbnail: "/tiktok-viral-campaign.jpg",
    kpis: [
      { label: "Views", value: "3M+" },
      { label: "Engagement", value: "85%" },
    ],
  },
  {
    title: "ABA x Ladipage",
    brand: "SaaS",
    thumbnail: "/marketing-automation-dashboard.png",
    kpis: [
      { label: "Cost", value: "-50%" },
      { label: "Conversion", value: "3x" },
    ],
  },
]

const faqs = [
  {
    q: "Phạm vi bàn giao bao gồm những gì?",
    a: "Bao gồm: chiến lược chi tiết, tài liệu training, source code (nếu có), quyền truy cập dashboard, và hỗ trợ 30 ngày sau bàn giao.",
  },
  {
    q: "Thời gian triển khai dự án là bao lâu?",
    a: "Start: 2-3 tuần, Grow: 3-4 tuần, Scale: 4-6 tuần tùy độ phức tạp. Timeline chi tiết sẽ được thống nhất trong Discovery phase.",
  },
  {
    q: "Có phát sinh chi phí nào không?",
    a: "Chi phí quảng cáo (ads budget) và phí API bên thứ 3 (nếu có) do khách hàng chi trả. Mọi chi phí khác đã bao gồm trong gói.",
  },
  {
    q: "Dữ liệu & quyền riêng tư được bảo vệ như thế nào?",
    a: "Chúng tôi ký NDA, tuân thủ GDPR/PDPA, và không chia sẻ dữ liệu với bên thứ 3. Khách hàng sở hữu 100% dữ liệu và tài sản.",
  },
  {
    q: "Điều kiện hủy hợp đồng?",
    a: "Có thể hủy với thông báo trước 30 ngày. Phí đã thanh toán cho công việc hoàn thành sẽ không được hoàn lại.",
  },
]

const integrationLogos = [
  { name: "TikTok", src: "/tiktok-logo.jpg" },
  { name: "Shopee", src: "/shopee-logo.jpg" },
  { name: "Meta", src: "/facebook-meta-logo.jpg" },
  { name: "Google", src: "/google-logo.jpg" },
  { name: "Hubspot", src: "/hubspot-logo.jpg" },
  { name: "Salesforce", src: "/salesforce-logo.jpg" },
]

export default function SolutionsPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50])

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const scrollToCompare = () => {
    document.getElementById("compare")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-4 bg-gradient-to-br from-white via-red-50/20 to-white">
        <div className="max-w-[1200px] mx-auto">
          <motion.h1
            className="lg:text-7xl font-bold text-gray-900 mb-6 text-center text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Giải pháp AI Marketing toàn diện
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Kết hợp AI Content Factory, Automation Hub và InsightX Analytics để tăng trưởng bền vững.
          </motion.p>

          {/* 3 bullet differentiators */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-start gap-4">
              <GlossyIcon color="orange" size="md">
                <Zap className="w-6 h-6" />
              </GlossyIcon>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">5× tốc độ sản xuất nội dung</h3>
                <p className="text-sm text-gray-600">AI Content Factory tạo nội dung chất lượng trong vài phút</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <GlossyIcon color="blue" size="md">
                <TrendingUp className="w-6 h-6" />
              </GlossyIcon>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">-60% thời gian vận hành</h3>
                <p className="text-sm text-gray-600">Automation Hub tự động hóa quy trình marketing</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <GlossyIcon color="green" size="md">
                <DollarSign className="w-6 h-6" />
              </GlossyIcon>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">ROAS tăng trung bình +38%</h3>
                <p className="text-sm text-gray-600">InsightX Analytics tối ưu chiến dịch theo dữ liệu thực</p>
              </div>
            </div>
          </motion.div>

          {/* Dual CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <GlowButton
              magnetic={!prefersReducedMotion}
              ripple={!prefersReducedMotion}
              size="lg"
              className="px-8 py-6 text-lg font-semibold"
            >
              Book demo 15'
            </GlowButton>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToCompare}
              className="px-8 py-6 text-lg font-semibold border-2 border-vietsolve-red text-vietsolve-red hover:bg-vietsolve-red hover:text-white bg-transparent"
            >
              Xem bảng so sánh
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-28 px-4 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Chọn gói phù hợp với doanh nghiệp
          </motion.h2>
          <motion.p
            className="text-center text-gray-600 mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Từ SME đến Enterprise, chúng tôi có giải pháp phù hợp cho mọi quy mô
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`rounded-3xl p-8 flex flex-col h-full ${
                  plan.featured
                    ? "bg-gradient-to-br from-vietsolve-burgundy to-vietsolve-red text-white shadow-2xl relative"
                    : "bg-white/60 backdrop-blur-sm border border-white/10 shadow-lg"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={!prefersReducedMotion ? { y: -6 } : {}}
                style={{
                  ...(plan.featured
                    ? {}
                    : {
                        backgroundImage:
                          "linear-gradient(white, white), linear-gradient(135deg, rgba(201, 74, 74, 0.3) 0%, rgba(90, 42, 58, 0.3) 100%)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                      }),
                }}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-vietsolve-red px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Phổ biến nhất
                  </div>
                )}

                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      plan.featured ? "bg-white/20 text-white" : "bg-vietsolve-red/10 text-vietsolve-red"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>

                <h3 className={`text-3xl font-bold mb-2 ${plan.featured ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.featured ? "text-white/90" : "text-gray-600"}`}>{plan.subline}</p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.08 + idx * 0.05 }}
                    >
                      <Check
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          plan.featured ? "text-white" : "text-vietsolve-red"
                        }`}
                      />
                      <span className={`text-sm ${plan.featured ? "text-white" : "text-gray-700"}`}>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {plan.featured ? (
                  <GlowButton
                    className="w-full bg-white text-vietsolve-red hover:bg-gray-100"
                    size="lg"
                    magnetic={false}
                    ripple={!prefersReducedMotion}
                  >
                    {plan.cta}
                  </GlowButton>
                ) : (
                  <Button
                    className="w-full bg-vietsolve-red text-white hover:bg-vietsolve-burgundy"
                    size="lg"
                    aria-label={plan.cta}
                  >
                    {plan.cta}
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="compare" className="py-24 md:py-28 px-4 bg-gradient-to-br from-gray-50 to-red-50/20">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            So sánh chi tiết các gói
          </motion.h2>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Tính năng</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Start</th>
                  <th className="text-center py-4 px-6 font-semibold text-vietsolve-red">Grow</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Scale</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="py-4 px-6 text-gray-700">{feature.name}</td>
                    <td className="py-4 px-6 text-center">
                      {typeof feature.start === "boolean" ? (
                        feature.start ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-700">{feature.start}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center bg-red-50/50">
                      {typeof feature.grow === "boolean" ? (
                        feature.grow ? (
                          <Check className="w-5 h-5 text-vietsolve-red mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-900 font-medium">{feature.grow}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof feature.scale === "boolean" ? (
                        feature.scale ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-700">{feature.scale}</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile accordion */}
          <div className="md:hidden space-y-4">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedPlan(expandedPlan === plan.name ? null : plan.name)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  aria-expanded={expandedPlan === plan.name}
                >
                  <span className="font-semibold text-gray-900">{plan.name}</span>
                  {expandedPlan === plan.name ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                {expandedPlan === plan.name && (
                  <div className="p-4 space-y-3">
                    {comparisonFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-700">{feature.name}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {typeof feature[plan.name.toLowerCase() as keyof typeof feature] === "boolean"
                            ? feature[plan.name.toLowerCase() as keyof typeof feature]
                              ? "✓"
                              : "✗"
                            : feature[plan.name.toLowerCase() as keyof typeof feature]}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-semibold border-2 border-vietsolve-red text-vietsolve-red hover:bg-vietsolve-red hover:text-white bg-transparent"
            >
              Nhận tư vấn chọn gói phù hợp
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-28 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Quy trình triển khai
          </motion.h2>

          <div className="relative">
            {/* Connector line */}
            {!prefersReducedMotion && (
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-vietsolve-red via-vietsolve-burgundy to-vietsolve-red -translate-y-1/2 opacity-20" />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex flex-col items-center">
                    <GlossyIcon color="orange" size="lg" className="mb-4">
                      <step.icon className="w-8 h-8" />
                    </GlossyIcon>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-vietsolve-red font-semibold mb-3">{step.duration}</p>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 px-4 bg-gradient-to-br from-gray-50 to-red-50/20">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Tích hợp & Hệ sinh thái
          </motion.h2>

          <div className="relative">
            {/* Connector line */}
            {!prefersReducedMotion && (
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-vietsolve-red via-vietsolve-burgundy to-vietsolve-red -translate-y-1/2 opacity-20" />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {integrationLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-32 h-20 bg-white rounded-lg shadow-md flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.name}
                    width={100}
                    height={60}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Case Studies nổi bật
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseHighlights.map((caseItem, index) => (
              <motion.div
                key={index}
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={!prefersReducedMotion ? { y: -6 } : {}}
              >
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <Image
                    src={caseItem.thumbnail || "/placeholder.svg"}
                    alt={caseItem.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {caseItem.kpis.map((kpi, kpiIndex) => (
                      <span
                        key={kpiIndex}
                        className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-vietsolve-red"
                      >
                        {kpi.label}: {kpi.value}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{caseItem.brand}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 mb-4">{caseItem.title}</h3>
                  <Button
                    variant="outline"
                    className="w-full border-vietsolve-red text-vietsolve-red hover:bg-vietsolve-red hover:text-white bg-transparent"
                  >
                    Xem chi tiết case
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 px-4 bg-gradient-to-br from-gray-50 to-red-50/20">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Câu hỏi thường gặp & SLA
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* FAQ */}
            <div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                      aria-expanded={expandedFaq === index}
                    >
                      <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed">{faq.a}</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* SLA */}
            <div>
              <div className="space-y-6">
                {pricingPlans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    className="bg-white rounded-xl p-6 shadow-md"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                      <span className="px-3 py-1 bg-vietsolve-red/10 text-vietsolve-red rounded-full text-sm font-semibold">
                        {plan.name === "Start" ? "48h" : plan.name === "Grow" ? "24h" : "8-12h"}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {plan.name === "Start"
                        ? "Hỗ trợ email trong giờ hành chính, phản hồi trong 48h"
                        : plan.name === "Grow"
                          ? "Hỗ trợ ưu tiên qua email/chat, phản hồi trong 24h"
                          : "Hỗ trợ 24/7 qua hotline/chat, phản hồi khẩn cấp trong 8-12h"}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-4 bg-gradient-to-br from-vietsolve-red/5 via-vietsolve-burgundy/5 to-purple-500/5">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Sẵn sàng tăng trưởng với AI?
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Đặt lịch tư vấn miễn phí 15 phút hoặc nhận báo giá chi tiết ngay hôm nay
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <GlowButton
              magnetic={!prefersReducedMotion}
              ripple={!prefersReducedMotion}
              size="lg"
              className="px-8 py-6 text-lg font-semibold"
            >
              Book a Strategy Session
            </GlowButton>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-vietsolve-burgundy bg-transparent"
            >
              Nhận báo giá chi tiết
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
