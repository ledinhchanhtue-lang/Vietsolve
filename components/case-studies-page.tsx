"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  X,
  TrendingUp,
  Target,
  Sparkles,
  Search,
  ChevronDown,
  Check,
  Cpu,
  Bot,
  BarChart3,
  Zap,
  Brain,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import CountingStats from "@/components/counting-stats"
import GlowButton from "@/components/glow-button"
import GlossyIcon from "@/components/glossy-icon"

const categories = ["Tất cả", "Marketing", "Công nghệ", "Sáng tạo", "AI & Automation", "Branding"]
const sortOptions = [
  { value: "latest", label: "Mới nhất" },
  { value: "roi", label: "Hiệu quả cao (ROAS/ROI)" },
  { value: "duration", label: "Thời lượng dự án" },
  { value: "budget", label: "Ngân sách" },
]

const caseStudies = [
  {
    id: 1,
    title: "Thương hiệu thời trang x TikTok",
    category: "Marketing",
    industry: "Thời trang",
    description: "Chiến dịch viral giúp thương hiệu thời trang Việt tăng 300% doanh số trong 3 tháng",
    thumbnail: "/fashion-brand-campaign.jpg",
    videoPreview: "/fashion-preview.mp4",
    kpiBadges: ["+300% Doanh số", "ROAS 5.2x"],
    roi: 520,
    duration: 3,
    budget: 150,
    datePublished: "2024-10-15",
    brand: "Fashion Brand X",
    objective: "Tăng nhận diện thương hiệu và doanh số cho thương hiệu thời trang mới trên thị trường Việt Nam",
    challenge: "Thị trường thời trang cạnh tranh cao, ngân sách marketing hạn chế, cần tạo viral nhanh",
    strategy: "Xây dựng chiến dịch TikTok với influencer micro, kết hợp UGC và hashtag challenge sáng tạo",
    solution: "Tạo 50+ video content với 20 influencers, chạy ads targeting chính xác, tối ưu conversion funnel",
    results: [
      { text: "300% tăng trưởng doanh số trong 3 tháng", icon: TrendingUp },
      { text: "5M+ lượt xem trên TikTok", icon: Target },
      { text: "50K+ followers mới", icon: Sparkles },
      { text: "ROI 520% từ chiến dịch", icon: BarChart3 },
    ],
    aiSolutions: [
      { name: "AI Content Factory", icon: Cpu, description: "Tự động tạo 50+ variants content/tuần" },
      { name: "AI Sales Agent", icon: Bot, description: "Phân tích insight khách hàng từ social comments" },
      { name: "InsightX", icon: Brain, description: "Dự đoán trend và tối ưu targeting" },
    ],
    gallery: [
      "/fashion-ad-before-traditional-design.jpg",
      "/fashion-ad-after-ai-modern-vibrant.jpg",
      "/ab-testing-dashboard-analytics-comparison.jpg",
    ],
    beforeImage: "/fashion-ad-before-traditional-design.jpg",
    afterImage: "/fashion-ad-after-ai-modern-vibrant.jpg",
  },
  {
    id: 2,
    title: "Startup Fintech x AI Chatbot",
    category: "Công nghệ",
    industry: "Fintech",
    description: "Triển khai AI chatbot giúp giảm 70% thời gian xử lý khách hàng cho startup fintech",
    thumbnail: "/fintech-ai-chatbot.jpg",
    kpiBadges: ["-70% Thời gian", "95% Độ chính xác"],
    roi: 380,
    duration: 2,
    budget: 80,
    datePublished: "2024-09-20",
    brand: "Fintech Startup Y",
    objective: "Tự động hóa quy trình chăm sóc khách hàng và giảm chi phí vận hành",
    challenge: "Khối lượng câu hỏi lớn, đội ngũ CS nhỏ, cần phản hồi 24/7",
    strategy: "Xây dựng AI chatbot với NLP tiếng Việt, tích hợp CRM và knowledge base",
    solution: "Training model với 10K+ câu hỏi thực tế, tích hợp Zalo, Facebook, Website",
    results: [
      { text: "70% giảm thời gian xử lý", icon: Zap },
      { text: "24/7 hỗ trợ khách hàng", icon: Bot },
      { text: "95% độ chính xác câu trả lời", icon: Check },
      { text: "60% tiết kiệm chi phí CS", icon: TrendingUp },
    ],
    aiSolutions: [
      { name: "AI Sales Agent", icon: Bot, description: "Chatbot NLP tiếng Việt 24/7" },
      { name: "Automation Hub", icon: Zap, description: "Tích hợp đa kênh tự động" },
      { name: "InsightX", icon: Brain, description: "Phân tích sentiment khách hàng" },
    ],
    gallery: ["/fintech-chatbot-ui.jpg", "/fintech-analytics.jpg", "/fintech-integration.jpg"],
    beforeImage: "/fintech-before.jpg",
    afterImage: "/fintech-after.jpg",
  },
  {
    id: 3,
    title: "Chuỗi F&B x Marketing Automation",
    category: "AI & Automation",
    industry: "F&B",
    description: "Tự động hóa marketing giúp chuỗi F&B tăng 180% conversion và giảm 45% chi phí",
    thumbnail: "/fb-automation.jpg",
    kpiBadges: ["+180% Conversion", "-45% Chi phí"],
    roi: 420,
    duration: 4,
    budget: 120,
    datePublished: "2024-08-10",
    brand: "F&B Chain Z",
    objective: "Tăng tỷ lệ chuyển đổi và tối ưu chi phí marketing cho 20 cửa hàng",
    challenge: "Quản lý marketing thủ công cho nhiều chi nhánh, chi phí cao, ROI thấp",
    strategy: "Triển khai marketing automation với personalization và AI recommendation",
    solution: "Xây dựng CDP, thiết lập 15+ automation workflows, A/B testing liên tục",
    results: [
      { text: "180% tăng conversion rate", icon: TrendingUp },
      { text: "45% giảm chi phí marketing", icon: Target },
      { text: "25% tăng AOV", icon: BarChart3 },
      { text: "300% ROI từ email marketing", icon: Sparkles },
    ],
    aiSolutions: [
      { name: "AI Content Factory", icon: Cpu, description: "Tạo content cho 20 chi nhánh tự động" },
      { name: "Automation Hub", icon: Zap, description: "15+ workflows tự động" },
      { name: "InsightX", icon: Brain, description: "Personalization dựa trên hành vi" },
    ],
    gallery: ["/fb-automation-dashboard.jpg", "/fb-email-campaign.jpg", "/fb-analytics.jpg"],
    beforeImage: "/fb-before.jpg",
    afterImage: "/fb-after.jpg",
  },
  {
    id: 4,
    title: "Nền tảng Giáo dục x Content Marketing",
    category: "Sáng tạo",
    industry: "Giáo dục",
    description: "Chiến lược content marketing giúp EdTech tăng 250% leads chất lượng trong 6 tháng",
    thumbnail: "/edtech-content.jpg",
    kpiBadges: ["+250% Leads", "+400% Traffic"],
    roi: 350,
    duration: 6,
    budget: 200,
    datePublished: "2024-07-05",
    brand: "EdTech Platform",
    objective: "Tăng số lượng leads chất lượng cao và xây dựng thought leadership",
    challenge: "Thị trường EdTech cạnh tranh, cần xây dựng trust và authority",
    strategy: "Content marketing dài hạn với blog, case study, webinar và social media",
    solution: "Sản xuất 100+ bài content chất lượng cao, SEO optimization, lead nurturing",
    results: [
      { text: "250% tăng qualified leads", icon: TrendingUp },
      { text: "400% tăng organic traffic", icon: Target },
      { text: "150% tăng webinar attendance", icon: Sparkles },
      { text: "80% tăng sales pipeline", icon: BarChart3 },
    ],
    aiSolutions: [
      { name: "AI Content Factory", icon: Cpu, description: "Tạo 100+ bài content/tháng" },
      { name: "InsightX", icon: Brain, description: "SEO optimization tự động" },
      { name: "AI Sales Agent", icon: Bot, description: "Lead scoring và nurturing" },
    ],
    gallery: ["/edtech-blog.jpg", "/edtech-webinar.jpg", "/edtech-social.jpg"],
    beforeImage: "/edtech-before.jpg",
    afterImage: "/edtech-after.jpg",
  },
  {
    id: 5,
    title: "App Mỹ phẩm x Growth Hacking",
    category: "Marketing",
    industry: "Mỹ phẩm",
    description: "Growth hacking strategy giúp app mỹ phẩm đạt 500K downloads và 4.8★ rating",
    thumbnail: "/beauty-app-growth.jpg",
    kpiBadges: ["500K Downloads", "4.8★ Rating"],
    roi: 480,
    duration: 6,
    budget: 180,
    datePublished: "2024-06-15",
    brand: "Beauty App",
    objective: "Tăng số lượng downloads và active users cho app mỹ phẩm mới",
    challenge: "Thị trường app đông đúc, ngân sách marketing hạn chế, cần viral nhanh",
    strategy: "Growth hacking với referral program, ASO, và influencer marketing",
    solution: "Tối ưu ASO, xây dựng referral system, chạy ads targeting chính xác",
    results: [
      { text: "500K downloads trong 6 tháng", icon: TrendingUp },
      { text: "40% organic growth", icon: Target },
      { text: "4.8★ rating trên App Store", icon: Sparkles },
      { text: "60% retention rate sau 30 ngày", icon: BarChart3 },
    ],
    aiSolutions: [
      { name: "AI Content Factory", icon: Cpu, description: "Tạo content cho ASO và ads" },
      { name: "InsightX", icon: Brain, description: "Phân tích user behavior" },
      { name: "Automation Hub", icon: Zap, description: "Referral program tự động" },
    ],
    gallery: ["/beauty-app-ui.jpg", "/beauty-app-referral.jpg", "/beauty-app-analytics.jpg"],
    beforeImage: "/beauty-app-before.jpg",
    afterImage: "/beauty-app-after.jpg",
  },
  {
    id: 6,
    title: "Chuỗi Bán lẻ x Omnichannel",
    category: "Branding",
    industry: "Bán lẻ",
    description: "Chiến lược omnichannel giúp chuỗi bán lẻ tăng 200% doanh số online",
    thumbnail: "/retail-omnichannel.jpg",
    kpiBadges: ["+200% Doanh số", "+150% Engagement"],
    roi: 390,
    duration: 5,
    budget: 250,
    datePublished: "2024-05-20",
    brand: "Retail Chain",
    objective: "Tích hợp trải nghiệm online-offline và tăng doanh số đa kênh",
    challenge: "Khách hàng mua sắm đa kênh, cần trải nghiệm liền mạch",
    strategy: "Xây dựng hệ thống omnichannel với CRM, loyalty program, và personalization",
    solution: "Tích hợp POS, e-commerce, app mobile, và social commerce",
    results: [
      { text: "200% tăng doanh số online", icon: TrendingUp },
      { text: "150% tăng engagement", icon: Target },
      { text: "80% tăng brand awareness", icon: Sparkles },
      { text: "120% tăng customer lifetime value", icon: BarChart3 },
    ],
    aiSolutions: [
      { name: "AI Content Factory", icon: Cpu, description: "Content đa kênh tự động" },
      { name: "InsightX", icon: Brain, description: "Personalization cross-channel" },
      { name: "AI Sales Agent", icon: Bot, description: "Chatbot tư vấn sản phẩm" },
    ],
    gallery: ["/retail-pos.jpg", "/retail-app.jpg", "/retail-social.jpg"],
    beforeImage: "/retail-before.jpg",
    afterImage: "/retail-after.jpg",
  },
]

export default function CaseStudiesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "Tất cả")
  const [selectedSort, setSelectedSort] = useState(searchParams.get("sort") || "latest")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)
  const [selectedCase, setSelectedCase] = useState<(typeof caseStudies)[0] | null>(null)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [beforeAfterSlider, setBeforeAfterSlider] = useState(50)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : 150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedCategory !== "Tất cả") params.set("category", selectedCategory)
    if (selectedSort !== "latest") params.set("sort", selectedSort)
    if (debouncedSearch) params.set("search", debouncedSearch)

    const queryString = params.toString()
    router.push(`/case-studies${queryString ? `?${queryString}` : ""}`, { scroll: false })
  }, [selectedCategory, selectedSort, debouncedSearch, router])

  const filteredAndSortedCases = useMemo(() => {
    let filtered = caseStudies

    // Filter by category
    if (selectedCategory !== "Tất cả") {
      filtered = filtered.filter((c) => c.category === selectedCategory)
    }

    // Filter by search query
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase()
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.brand.toLowerCase().includes(query) ||
          c.industry.toLowerCase().includes(query),
      )
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (selectedSort) {
        case "roi":
          return b.roi - a.roi
        case "duration":
          return a.duration - b.duration
        case "budget":
          return a.budget - b.budget
        case "latest":
        default:
          return new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
      }
    })

    return sorted
  }, [selectedCategory, selectedSort, debouncedSearch])

  const trackEvent = useCallback((eventName: string, params?: Record<string, any>) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", eventName, params)
    }
  }, [])

  const handleCategoryChange = useCallback(
    (category: string) => {
      setSelectedCategory(category)
      trackEvent("filter_change", { filter_type: "category", filter_value: category })
    },
    [trackEvent],
  )

  const handleSortChange = useCallback(
    (sort: string) => {
      setSelectedSort(sort)
      setShowSortDropdown(false)
      trackEvent("sort_change", { sort_type: sort })
    },
    [trackEvent],
  )

  const handleCaseClick = useCallback(
    (caseStudy: (typeof caseStudies)[0]) => {
      setSelectedCase(caseStudy)
      setCurrentGalleryIndex(0)
      trackEvent("case_modal_open", { case_id: caseStudy.id, case_title: caseStudy.title })
    },
    [trackEvent],
  )

  const jsonLdSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Case Studies - VietSolve",
      description: "Những giải pháp AI – sáng tạo – tối ưu chi phí được đo bằng KPI thực tế",
      url: "https://vietsolve.vn/case-studies",
      publisher: {
        "@type": "Organization",
        name: "VietSolve",
        logo: {
          "@type": "ImageObject",
          url: "https://vietsolve.vn/logo.png",
        },
      },
      hasPart: caseStudies.map((cs) => ({
        "@type": "CreativeWork",
        "@id": `https://vietsolve.vn/case-studies/${cs.id}`,
        name: cs.title,
        description: cs.description,
        datePublished: cs.datePublished,
        image: cs.thumbnail,
        brand: {
          "@type": "Brand",
          name: cs.brand,
        },
        industry: cs.industry,
        measurableKPI: cs.kpiBadges.join(", "),
      })),
    }
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />

      <main className="min-h-screen bg-white">
        <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-white via-red-50/20 to-white">
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {!prefersReducedMotion &&
              [...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-vietsolve-red/15 rounded-full"
                  style={{
                    left: `${15 + i * 12}%`,
                    top: `${25 + (i % 3) * 25}%`,
                  }}
                  animate={{
                    y: [0, -40, 0],
                    opacity: [0.1, 0.15, 0.1],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.4,
                  }}
                />
              ))}
          </div>

          <motion.div
            className="relative z-10 max-w-7xl mx-auto text-center"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-vietsolve-red/20 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-4 h-4 text-vietsolve-red" />
              <span className="text-sm font-semibold text-gray-700">Case Studies</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-gray-900">Dự án </span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy bg-clip-text text-transparent animate-light-sweep">
                  tiêu biểu
                </span>
              </span>
              <br />
              <span className="text-gray-900">VietSolve</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Những giải pháp AI – sáng tạo – tối ưu chi phí được đo bằng{" "}
              <span className="text-vietsolve-red font-semibold">KPI thực tế</span>.
            </motion.p>
          </motion.div>
        </section>

        <section
          className="py-6 px-6 border-b border-gray-200 bg-white/95 backdrop-blur-lg sticky z-40"
          style={{ top: "84px" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Category filters */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-5 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy text-white shadow-lg shadow-vietsolve-red/30"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>

              {/* Search and Sort */}
              <div className="flex gap-3 w-full lg:w-auto">
                {/* Search input */}
                <div className="relative flex-1 lg:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm theo tên, nhãn hàng, ngành..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-vietsolve-red focus:ring-2 focus:ring-vietsolve-red/20 outline-none transition-all"
                  />
                </div>

                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 hover:border-vietsolve-red bg-white transition-all"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {sortOptions.find((opt) => opt.value === selectedSort)?.label}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  <AnimatePresence>
                    {showSortDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
                      >
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleSortChange(option.value)}
                            className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                              selectedSort === option.value
                                ? "bg-red-50 text-vietsolve-red font-semibold"
                                : "text-gray-700"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <CountingStats
              stats={[
                { value: 38, suffix: "%", label: "ROI trung bình" },
                { value: 60, suffix: "%", label: "Giảm thời gian triển khai" },
                { value: 1.2, suffix: "M+", label: "Lượt xem/chiến dịch" },
              ]}
            />
          </div>
        </section>

        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              layout
              transition={{ opacity: { duration: 0.18 } }}
            >
              <AnimatePresence mode="popLayout">
                {filteredAndSortedCases.map((caseStudy, index) => (
                  <motion.div
                    key={caseStudy.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="group cursor-pointer"
                    onClick={() => handleCaseClick(caseStudy)}
                    whileHover={{ y: prefersReducedMotion ? 0 : -8 }}
                    onViewportEnter={() => trackEvent("case_card_view", { case_id: caseStudy.id })}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent relative">
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy p-[1px]">
                          <div className="w-full h-full bg-white rounded-2xl" />
                        </div>
                      </div>

                      {/* Image/Video preview */}
                      <div className="relative h-64 overflow-hidden">
                        <motion.div
                          className="absolute inset-0"
                          whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                          transition={{ duration: 0.6 }}
                        >
                          {caseStudy.videoPreview && !prefersReducedMotion ? (
                            <video
                              src={caseStudy.videoPreview}
                              className="w-full h-full object-cover"
                              muted
                              loop
                              playsInline
                              onMouseEnter={(e) => e.currentTarget.play()}
                              onMouseLeave={(e) => {
                                e.currentTarget.pause()
                                e.currentTarget.currentTime = 0
                              }}
                            />
                          ) : (
                            <Image
                              src={caseStudy.thumbnail || "/placeholder.svg?height=400&width=600"}
                              alt={caseStudy.title}
                              fill
                              className="object-cover"
                              loading="lazy"
                            />
                          )}
                        </motion.div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          {caseStudy.kpiBadges.map((badge, i) => (
                            <motion.div
                              key={i}
                              className="bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: index * 0.08 + i * 0.1, type: "spring" }}
                            >
                              {badge}
                            </motion.div>
                          ))}
                        </div>

                        {/* Category chip */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-vietsolve-red text-xs font-semibold rounded-full">
                            {caseStudy.category}
                          </span>
                        </div>

                        {/* Play icon overlay */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={false}
                        >
                          <motion.div
                            className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Play className="w-8 h-8 text-vietsolve-red ml-1" />
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="p-6 relative z-10">
                        <h3
                          className="text-xl font-bold text-gray-900 mb-2 line-clamp-2"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {caseStudy.title}
                        </h3>

                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{caseStudy.description}</p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{caseStudy.industry}</span>
                          <div className="text-vietsolve-red font-semibold flex items-center gap-2 group-hover:gap-3 transition-all text-sm">
                            Xem chi tiết
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                            >
                              →
                            </motion.span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredAndSortedCases.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <p className="text-xl text-gray-500">Không tìm thấy case study phù hợp</p>
              </motion.div>
            )}
          </div>
        </section>

        <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-red-50/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-vietsolve-red/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-vietsolve-burgundy/20 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Muốn xem case theo{" "}
              <span className="bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy bg-clip-text text-transparent">
                ngành của bạn
              </span>
              ?
            </motion.h2>

            <motion.p
              className="text-xl text-gray-600 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Chúng tôi tổng hợp 3 case gần nhất phù hợp KPI & ngân sách.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <GlowButton href="/contact" size="lg">
                Gửi yêu cầu case theo ngành
              </GlowButton>
            </motion.div>
          </div>
        </section>

        <AnimatePresence>
          {selectedCase && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <motion.div
                className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedCase(null)}
                  className="sticky top-4 right-4 float-right w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-gray-100 transition-colors z-10 border border-gray-200"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Header with brand info */}
                <div className="p-8 border-b border-gray-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-vietsolve-red to-vietsolve-burgundy rounded-xl flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2
                        id="modal-title"
                        className="text-3xl font-bold text-gray-900"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {selectedCase.title}
                      </h2>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm text-gray-600">{selectedCase.brand}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-600">{selectedCase.industry}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-600">{selectedCase.duration} tháng</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 border-b border-gray-200">
                  <h3
                    className="text-2xl font-bold text-gray-900 mb-6"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Trước & Sau
                  </h3>
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    {/* Before image */}
                    <Image
                      src={selectedCase.beforeImage || "/placeholder.svg?height=600&width=800"}
                      alt="Before"
                      fill
                      className="object-cover"
                    />
                    {/* After image with clip-path */}
                    <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - beforeAfterSlider}% 0 0)` }}>
                      <Image
                        src={selectedCase.afterImage || "/placeholder.svg?height=600&width=800"}
                        alt="After"
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Slider handle */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                      style={{ left: `${beforeAfterSlider}%` }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
                        <ChevronLeft className="w-4 h-4 text-gray-700 absolute left-1" />
                        <ChevronRight className="w-4 h-4 text-gray-700 absolute right-1" />
                      </div>
                    </div>
                    {/* Slider input */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={beforeAfterSlider}
                      onChange={(e) => setBeforeAfterSlider(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                      aria-label="Before/After slider"
                    />
                    {/* Labels */}
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 text-white text-sm font-semibold rounded-full">
                      Trước
                    </div>
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-sm font-semibold rounded-full">
                      Sau
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="p-8 border-b border-gray-200">
                  <h3
                    className="text-2xl font-bold text-gray-900 mb-6"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Kết quả đạt được
                  </h3>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {selectedCase.results.map((result, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-vietsolve-red to-vietsolve-burgundy rounded-lg flex items-center justify-center flex-shrink-0">
                          <result.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-700">{result.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 border-b border-gray-200">
                  <h3
                    className="text-2xl font-bold text-gray-900 mb-6"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Giải pháp AI
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {selectedCase.aiSolutions.map((solution, index) => (
                      <motion.div
                        key={index}
                        className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-vietsolve-red/30 transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <GlossyIcon icon={solution.icon} size="lg" className="mb-4" />
                        <h4 className="font-bold text-gray-900 mb-2">{solution.name}</h4>
                        <p className="text-sm text-gray-600">{solution.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="p-8 border-b border-gray-200">
                  <h3
                    className="text-2xl font-bold text-gray-900 mb-6"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Gallery
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedCase.gallery.map((image, index) => (
                      <motion.div
                        key={index}
                        className="relative aspect-video rounded-xl overflow-hidden cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setCurrentGalleryIndex(index)}
                      >
                        <Image
                          src={image || "/placeholder.svg?height=300&width=400"}
                          alt={`Gallery ${index + 1}`}
                          fill
                          className="object-cover"
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-4">
                    <GlowButton href="/contact" className="w-full">
                      Nhận tư vấn 15'
                    </GlowButton>
                    <button className="w-full px-6 py-3 border-2 border-vietsolve-red text-vietsolve-red font-semibold rounded-full hover:bg-vietsolve-red hover:text-white transition-all">
                      Xem case tương tự ngành {selectedCase.industry}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  )
}
