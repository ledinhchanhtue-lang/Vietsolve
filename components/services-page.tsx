"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  Megaphone,
  Video,
  Bot,
  Globe,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Search,
  User,
  Calendar,
  MapPin,
  ChevronDown,
} from "lucide-react"
import AnimatedButton from "./animated-button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ServicesPage() {
  const [currentCase, setCurrentCase] = useState(0)
  const [activeFilter, setActiveFilter] = useState("All")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    needs: "",
    budget: "",
  })

  const services = [
    {
      title: "Truyền thông & Thương hiệu",
      description: "Định vị – hệ thống nhận diện – IMC giúp thương hiệu ghi dấu ấn.",
      icon: <Megaphone className="w-8 h-8" />,
      deliverables: [
        "Định vị thương hiệu & thông điệp cốt lõi",
        "Bộ nhận diện (logo, guideline, key visual)",
        "Chiến lược truyền thông tích hợp (IMC)",
        "PR, KOL/Influencer, Social Campaign",
      ],
      note: "Nhấn kết quả kinh doanh đo lường (reach, share of voice)",
      color: "blue",
    },
    {
      title: "Sản xuất nội dung & Media",
      description: "Nội dung sáng tạo – tối ưu theo nền tảng.",
      icon: <Video className="w-8 h-8" />,
      deliverables: [
        "TVC / Viral / TikTok Video",
        "Flycam & Photography",
        "Podcast & Livestream",
        "Thiết kế ấn phẩm thương hiệu",
      ],
      color: "purple",
    },
    {
      title: "Công nghệ & Tự động hóa",
      description: "Ứng dụng AI và workflow tự động để tối ưu vận hành & marketing.",
      icon: <Bot className="w-8 h-8" />,
      deliverables: [
        "Chatbot & Agent AI tư vấn – chốt lead",
        "Tích hợp CRM & đồng bộ dữ liệu",
        "Marketing Automation (email, OA, remarketing)",
        "Kho dữ liệu & phân tích hiệu suất (dashboard)",
      ],
      color: "green",
    },
    {
      title: "Web & SEO / UX-UI",
      description: "Website là tài sản thương hiệu – nhanh, chuẩn SEO, tối ưu chuyển đổi.",
      icon: <Globe className="w-8 h-8" />,
      deliverables: [
        "Thiết kế UX/UI, design system",
        "Phát triển web chuẩn SEO (schema, tốc độ)",
        "Tối ưu landing page & conversion (A/B)",
      ],
      color: "orange",
    },
    {
      title: "Tư vấn chiến lược tăng trưởng",
      description: "Đồng hành dài hạn – chiến lược truyền thông, thương hiệu, vận hành.",
      icon: <TrendingUp className="w-8 h-8" />,
      deliverables: [
        "Phân tích mô hình kinh doanh",
        "Nghiên cứu thị trường & insight",
        "Lập chiến lược go-to-market, truyền thông – vận hành",
      ],
      color: "pink",
    },
  ]

  const processSteps = [
    {
      title: "Khám phá mục tiêu",
      description: "Phỏng vấn, audit tài sản số",
      icon: "1",
    },
    {
      title: "Chiến lược & lộ trình",
      description: "KPI, ngân sách, channel mix",
      icon: "2",
    },
    {
      title: "Thiết kế & sản xuất",
      description: "Brand/system, content, media",
      icon: "3",
    },
    {
      title: "Kích hoạt & tối ưu",
      description: "Launch, A/B, automation",
      icon: "4",
    },
    {
      title: "Đo lường & mở rộng",
      description: "Dashboard, tối ưu CAC/LTV",
      icon: "5",
    },
  ]

  const pricingPackages = [
    {
      name: "Start",
      subtitle: "Dành cho SMB thử nghiệm nhanh",
      features: ["Phạm vi rút gọn", "SLA cơ bản", "1 kênh chính", "Báo cáo cơ bản"],
      cta: "Nhận báo giá chi tiết",
    },
    {
      name: "Grow",
      subtitle: "Mở rộng kênh & automation",
      features: ["Nhiều định dạng nội dung", "2-3 kênh", "Báo cáo tháng", "Marketing automation"],
      cta: "Nhận báo giá chi tiết",
      featured: true,
    },
    {
      name: "Scale",
      subtitle: "Chiến lược toàn diện, AI + Data",
      features: ["IMC đa kênh", "Dashboard thời gian thực", "SLA nâng cao", "Tư vấn chiến lược"],
      cta: "Nhận báo giá chi tiết",
    },
  ]

  const caseStudies = [
    {
      title: "Rabity x ALOHA STITCH",
      result: "Tăng nhận diện 200%",
      image: "/fashion-brand-campaign.jpg",
    },
    {
      title: "Nordic Naturals Vietnam",
      result: "Chuỗi TikTok >3M views",
      image: "/tiktok-viral-campaign.jpg",
    },
    {
      title: "ABA x Ladipage",
      result: "AI Automation giảm 50% chi phí MKT",
      image: "/marketing-automation-dashboard.png",
    },
  ]

  const faqs = [
    {
      question: "Thời gian triển khai 1 dự án là bao lâu?",
      answer:
        "Thời gian triển khai phụ thuộc vào quy mô và độ phức tạp của dự án. Thông thường, một dự án cơ bản mất 4-6 tuần, dự án quy mô trung bình 8-12 tuần, và dự án lớn có thể kéo dài 3-6 tháng. Chúng tôi sẽ cung cấp timeline chi tiết sau khi đánh giá yêu cầu của bạn.",
    },
    {
      question: "Cam kết KPI đo lường như thế nào?",
      answer:
        "Chúng tôi cam kết đo lường KPI dựa trên các chỉ số cụ thể như reach, engagement, conversion rate, ROI, và các metrics phù hợp với mục tiêu kinh doanh của bạn. Mỗi dự án đều có dashboard theo dõi real-time và báo cáo định kỳ để đảm bảo minh bạch và hiệu quả.",
    },
    {
      question: "Có tùy biến theo ngành & quy mô không?",
      answer:
        "Hoàn toàn có thể! Chúng tôi hiểu rằng mỗi ngành nghề và quy mô doanh nghiệp có những đặc thù riêng. Đội ngũ của chúng tôi sẽ nghiên cứu kỹ lưỡng về ngành của bạn, phân tích đối thủ cạnh tranh, và tùy chỉnh giải pháp phù hợp với ngân sách và mục tiêu cụ thể.",
    },
    {
      question: "Quy trình bàn giao tài liệu & đào tạo?",
      answer:
        "Sau khi hoàn thành dự án, chúng tôi sẽ bàn giao đầy đủ tài liệu bao gồm: brand guidelines, source files, báo cáo phân tích, và hướng dẫn sử dụng. Ngoài ra, chúng tôi cung cấp buổi đào tạo cho team của bạn về cách vận hành và tối ưu các công cụ, hệ thống đã triển khai.",
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-red-50",
        border: "border-red-200",
        icon: "text-red-600",
        hover: "hover:border-red-400",
      },
      purple: {
        bg: "bg-gray-50",
        border: "border-gray-200",
        icon: "text-gray-800",
        hover: "hover:border-gray-400",
      },
      green: {
        bg: "bg-gray-100",
        border: "border-gray-300",
        icon: "text-gray-700",
        hover: "hover:border-gray-500",
      },
      orange: {
        bg: "bg-red-50",
        border: "border-red-200",
        icon: "text-red-500",
        hover: "hover:border-red-400",
      },
      pink: {
        bg: "bg-red-50",
        border: "border-red-100",
        icon: "text-red-400",
        hover: "hover:border-red-300",
      },
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  const nextCase = () => {
    setCurrentCase((prev) => (prev + 1) % caseStudies.length)
  }

  const prevCase = () => {
    setCurrentCase((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)
  }

  const chartData = [300, 900, 2000, 1400, 1200, 1100, 950]
  const chartLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="pt-32 pb-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-[32px] overflow-hidden relative bg-gradient-to-b from-white via-[#F3F4F6] to-[#0F0F0F] p-6 md:p-12 mb-24 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="md:col-span-6 z-10">
              <h1 className="text-white text-5xl md:text-7xl font-serif leading-[0.9] mb-6">Dịch vụ VietSolve</h1>
              <p className="text-white/85 text-lg md:text-xl mt-4 max-w-[560px] mb-10 leading-relaxed">
                Từ chiến lược đến thực thi — chúng tôi giúp thương hiệu tăng trưởng bền vững.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="#lead-form">
                  <AnimatedButton size="lg" className="bg-red-600 text-white hover:bg-red-700 rounded-full px-8">
                    Nhận tư vấn giải pháp
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </AnimatedButton>
                </a>
                <a href="#pricing">
                  <button
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all flex items-center justify-center"
                    aria-label="Xem thêm thông tin"
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </button>
                </a>
              </div>
            </div>

            {/* Right Visual Mockup */}
            <div className="md:col-span-6 relative">
              <div className="bg-gray-200 rounded-3xl h-[340px] md:h-[420px] relative overflow-hidden">
                {/* Placeholder gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />

                {/* Floating Badge - Top Right */}
                <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-red-600 text-white ring-8 ring-white/70 shadow-2xl flex items-center justify-center">
                  <ArrowUpRight className="w-8 h-8" />
                </div>

                {/* Mini Analytics Card - Bottom Right */}
                <div className="absolute -bottom-8 right-6 bg-white rounded-2xl shadow-xl p-4 w-[260px] scale-90 md:scale-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-gray-900">$29,00</span>
                    <span className="text-sm text-gray-500">12%</span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                      Cardiology
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                      General Wellness
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-gray-800 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Service Groups */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2, once: true }}
          variants={containerVariants}
          className="mb-32"
        >
          <div className="relative bg-zinc-900 text-white rounded-[36px] md:rounded-[44px] p-6 md:p-10 shadow-2xl overflow-hidden ring-1 ring-white/10">
            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />

            <div className="relative z-10">
              {/* Header Row */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
              >
                <h1 className="text-3xl md:text-5xl font-serif tracking-tight">Smart Financial — Solutions</h1>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <Input
                      placeholder="Search you want.."
                      className="w-[240px] md:w-[280px] pl-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus-visible:ring-red-500"
                    />
                  </div>
                  <button
                    className="size-10 rounded-full bg-zinc-100 text-zinc-900 hover:scale-105 transition-transform flex items-center justify-center"
                    aria-label="Expand view"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>

              {/* Filter Chips */}
              <motion.div variants={itemVariants} className="flex items-center gap-3 flex-wrap mb-6">
                <span className="text-sm text-zinc-400">Filter:</span>
                {["All", "Investments", "Credit & Installments"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      activeFilter === filter ? "bg-white text-zinc-900" : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </motion.div>

              {/* Divider */}
              <div className="border-t border-white/10 my-6 md:my-8" />

              {/* Section Title */}
              <motion.h2 variants={itemVariants} className="text-xl md:text-2xl font-medium mb-4 md:mb-6">
                Digital Payments
              </motion.h2>

              {/* Visual Grid */}
              <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">
                {/* Analytics Card */}
                <motion.div
                  variants={itemVariants}
                  className="col-span-12 md:col-span-6 lg:col-span-6 bg-white text-zinc-900 rounded-3xl p-5 shadow-xl group hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Analytics</h3>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="rounded-full text-xs">
                        Calories
                      </Badge>
                      <Badge variant="secondary" className="rounded-full text-xs">
                        Heartrate
                      </Badge>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="flex items-end justify-between gap-2 h-[160px] md:h-[200px]">
                    {chartData.map((value, idx) => {
                      const maxValue = Math.max(...chartData)
                      const height = (value / maxValue) * 100
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                          <div
                            className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg transition-all hover:from-red-600 hover:to-red-500"
                            style={{ height: `${height}%` }}
                          />
                          <span className="text-xs text-zinc-500">{chartLabels[idx]}</span>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Mock Box Small (Top Right) */}
                <motion.div
                  variants={itemVariants}
                  className="col-span-12 md:col-span-6 lg:col-span-4 bg-zinc-800 rounded-3xl h-[200px] md:h-[240px] group hover:-translate-y-1 transition-transform duration-300"
                />

                {/* Mock Box Large (Bottom) */}
                <motion.div
                  variants={itemVariants}
                  className="col-span-12 lg:col-span-8 bg-zinc-800 rounded-3xl h-[220px] md:h-[260px] group hover:-translate-y-1 transition-transform duration-300"
                />

                {/* Info Column */}
                <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-zinc-400" />
                      <div>
                        <p className="text-xs uppercase tracking-wider text-zinc-400">User Client</p>
                        <p className="font-medium text-white">Adreas B.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-zinc-400" />
                      <div>
                        <p className="text-xs uppercase tracking-wider text-zinc-400">Year</p>
                        <p className="font-medium text-white">2025</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-zinc-400" />
                      <div>
                        <p className="text-xs uppercase tracking-wider text-zinc-400">Location</p>
                        <p className="font-medium text-white">Cilacap, Indonesia</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating Action Button */}
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.35 }}
                className="absolute right-6 md:right-8 top-[140px] md:top-[120px] size-12 md:size-14 rounded-full bg-red-600 text-white shadow-2xl ring-8 ring-red-600/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                aria-label="Quick action"
              >
                <ArrowUpRight className="w-6 h-6" />
              </motion.button>

              {/* Accordion for Other Services */}
              <motion.div variants={itemVariants} className="mt-8 md:mt-10">
                <Accordion type="single" collapsible className="space-y-3">
                  <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="bg-zinc-800/50 hover:bg-zinc-800 rounded-2xl px-6 py-4 text-left text-lg font-medium transition-colors [&[data-state=open]>svg]:rotate-180">
                      <div className="flex items-center justify-between w-full pr-4">
                        <span>Smart Investing</span>
                        <ChevronDown className="w-5 h-5 transition-transform duration-200" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pt-4 pb-2 text-zinc-300">
                      Đầu tư thông minh với AI phân tích thị trường, tối ưu danh mục đầu tư và quản lý rủi ro tự động.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border-none">
                    <AccordionTrigger className="bg-zinc-800/50 hover:bg-zinc-800 rounded-2xl px-6 py-4 text-left text-lg font-medium transition-colors [&[data-state=open]>svg]:rotate-180">
                      <div className="flex items-center justify-between w-full pr-4">
                        <span>Expense Tracker</span>
                        <ChevronDown className="w-5 h-5 transition-transform duration-200" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pt-4 pb-2 text-zinc-300">
                      Theo dõi chi tiêu tự động, phân loại giao dịch và cảnh báo ngân sách thông minh.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Quy trình triển khai</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-200 via-gray-200 to-red-200 transform -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg relative z-10">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pricing Packages */}
        <motion.div
          id="pricing"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Gói dịch vụ</h2>
          <p className="text-xl text-gray-600 text-center mb-16">Chọn gói phù hợp với quy mô doanh nghiệp của bạn</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`rounded-3xl p-8 border-2 ${
                  pkg.featured
                    ? "bg-red-50 border-red-600 shadow-xl scale-105"
                    : "bg-white border-gray-200 hover:border-red-300"
                } transition-all duration-300`}
              >
                {pkg.featured && (
                  <div className="bg-red-600 text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                    Phổ biến nhất
                  </div>
                )}
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-8">{pkg.subtitle}</p>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#lead-form">
                  <AnimatedButton
                    className={`w-full ${
                      pkg.featured
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    {pkg.cta}
                  </AnimatedButton>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Case Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Case Study nổi bật</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-red-50 to-gray-50 rounded-3xl p-8 border-2 border-red-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <img
                    src={caseStudies[currentCase].image || "/placeholder.svg"}
                    alt={caseStudies[currentCase].title}
                    className="rounded-2xl w-full h-64 object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{caseStudies[currentCase].title}</h3>
                  <p className="text-xl text-red-600 font-semibold mb-6">{caseStudies[currentCase].result}</p>
                  <Link href="/case-studies">
                    <AnimatedButton className="bg-gray-900 text-white hover:bg-gray-800">
                      Xem case <ArrowRight className="ml-2 h-4 w-4 inline" />
                    </AnimatedButton>
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevCase}
                className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-red-600 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div className="flex items-center gap-2">
                {caseStudies.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentCase(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === currentCase ? "bg-red-600 w-8" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextCase}
                className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-red-600 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Câu hỏi thường gặp</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white border-2 border-gray-200 rounded-2xl px-6 hover:border-red-300 transition-colors"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-red-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>

        {/* Lead Form */}
        <motion.div
          id="lead-form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-red-600 to-gray-900 rounded-3xl p-12 text-white"
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-4">Sẵn sàng tăng trưởng cùng VietSolve?</h2>
              <p className="text-xl text-blue-100">Điền thông tin, chúng tôi tư vấn trong 24h.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Họ tên *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="0912345678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Doanh nghiệp</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Tên công ty"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Nhu cầu *</label>
                <textarea
                  required
                  value={formData.needs}
                  onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Mô tả ngắn gọn về nhu cầu của bạn..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ngân sách dự kiến</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="" className="text-gray-900">
                    Chọn mức ngân sách
                  </option>
                  <option value="under-10m" className="text-gray-900">
                    Dưới 10 triệu
                  </option>
                  <option value="10m-30m" className="text-gray-900">
                    10-30 triệu
                  </option>
                  <option value="30m-50m" className="text-gray-900">
                    30-50 triệu
                  </option>
                  <option value="50m-100m" className="text-gray-900">
                    50-100 triệu
                  </option>
                  <option value="over-100m" className="text-gray-900">
                    Trên 100 triệu
                  </option>
                </select>
              </div>

              <div className="flex items-center justify-center gap-3 text-sm text-blue-100">
                <CheckCircle2 className="w-5 h-5" />
                <span>Tư vấn miễn phí – Bảo mật thông tin</span>
              </div>

              <div className="text-center">
                <AnimatedButton type="submit" size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-12">
                  Gửi yêu cầu tư vấn
                </AnimatedButton>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
