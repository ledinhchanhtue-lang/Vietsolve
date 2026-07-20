"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChartBig as ChartBar, Lightbulb, Target, Rocket, X, TrendingUp, Users, Eye, Award } from "lucide-react"
import AnimatedButton from "@/components/animated-button"
import Image from "next/image"

const categories = ["Tất cả", "Marketing", "Công nghệ", "Sáng tạo", "AI & Automation", "Branding"]

const caseStudies = [
  {
    id: 1,
    title: "Thương hiệu thời trang x TikTok",
    category: "Marketing",
    description: "Chiến dịch viral giúp thương hiệu thời trang Việt tăng 300% doanh số trong 3 tháng",
    image: "/fashion-brand-campaign.jpg",
    badge: "+300% Doanh số",
    objective: "Tăng nhận diện thương hiệu và doanh số cho thương hiệu thời trang mới trên thị trường Việt Nam",
    challenge: "Thị trường thời trang cạnh tranh cao, ngân sách marketing hạn chế, cần tạo viral nhanh",
    strategy: "Xây dựng chiến dịch TikTok với influencer micro, kết hợp UGC và hashtag challenge sáng tạo",
    solution: "Tạo 50+ video content với 20 influencers, chạy ads targeting chính xác, tối ưu conversion funnel",
    results: [
      "300% tăng trưởng doanh số trong 3 tháng",
      "5M+ lượt xem trên TikTok",
      "50K+ followers mới",
      "ROI 450% từ chiến dịch",
    ],
  },
  {
    id: 2,
    title: "Startup Fintech x AI Chatbot",
    category: "Công nghệ",
    description: "Triển khai AI chatbot giúp giảm 70% thời gian xử lý khách hàng cho startup fintech",
    image: "/fintech-ai-chatbot.jpg",
    badge: "-70% Thời gian xử lý",
    objective: "Tự động hóa quy trình chăm sóc khách hàng và giảm chi phí vận hành",
    challenge: "Khối lượng câu hỏi lớn, đội ngũ CS nhỏ, cần phản hồi 24/7",
    strategy: "Xây dựng AI chatbot với NLP tiếng Việt, tích hợp CRM và knowledge base",
    solution: "Training model với 10K+ câu hỏi thực tế, tích hợp Zalo, Facebook, Website",
    results: [
      "70% giảm thời gian xử lý",
      "24/7 hỗ trợ khách hàng",
      "95% độ chính xác câu trả lời",
      "60% tiết kiệm chi phí CS",
    ],
  },
  {
    id: 3,
    title: "Thương hiệu F&B x Rebranding",
    category: "Branding",
    description: "Làm mới thương hiệu F&B 10 năm tuổi, tăng 200% lượt tương tác trên social media",
    image: "/fb-rebranding.jpg",
    badge: "+200% Engagement",
    objective: "Làm mới hình ảnh thương hiệu để thu hút Gen Z và tăng trưởng doanh số",
    challenge: "Thương hiệu cũ, hình ảnh lỗi thời, khó tiếp cận khách hàng trẻ",
    strategy: "Rebranding toàn diện: logo, packaging, tone of voice, visual identity",
    solution: "Nghiên cứu insight Gen Z, thiết kế hệ thống nhận diện mới, rollout đa kênh",
    results: ["200% tăng engagement", "150% tăng traffic website", "80% tăng brand awareness", "120% tăng doanh số"],
  },
  {
    id: 4,
    title: "E-commerce x Marketing Automation",
    category: "AI & Automation",
    description: "Tự động hóa email marketing giúp tăng 180% conversion rate cho sàn TMĐT",
    image: "/ecommerce-automation.jpg",
    badge: "+180% Conversion",
    objective: "Tăng tỷ lệ chuyển đổi và giá trị đơn hàng trung bình thông qua automation",
    challenge: "Tỷ lệ bỏ giỏ hàng cao, email marketing thủ công không hiệu quả",
    strategy: "Xây dựng hệ thống marketing automation với personalization và AI recommendation",
    solution: "Tích hợp CDP, thiết lập 15+ automation workflows, A/B testing liên tục",
    results: ["180% tăng conversion rate", "45% giảm cart abandonment", "25% tăng AOV", "300% ROI từ email marketing"],
  },
  {
    id: 5,
    title: "Doanh nghiệp B2B x Content Marketing",
    category: "Sáng tạo",
    description: "Chiến lược content marketing giúp doanh nghiệp B2B tăng 250% leads chất lượng",
    image: "/b2b-content-marketing.jpg",
    badge: "+250% Leads",
    objective: "Tăng số lượng leads chất lượng cao và xây dựng thought leadership",
    challenge: "Thị trường B2B khó tiếp cận, chu kỳ bán hàng dài, cần xây dựng trust",
    strategy: "Content marketing dài hạn với blog, case study, webinar và LinkedIn",
    solution: "Sản xuất 100+ bài content chất lượng cao, SEO optimization, lead nurturing",
    results: [
      "250% tăng qualified leads",
      "400% tăng organic traffic",
      "150% tăng webinar attendance",
      "80% tăng sales pipeline",
    ],
  },
  {
    id: 6,
    title: "App Mobile x Growth Hacking",
    category: "Marketing",
    description: "Growth hacking strategy giúp app mobile đạt 500K downloads trong 6 tháng",
    image: "/mobile-app-growth.jpg",
    badge: "500K Downloads",
    objective: "Tăng số lượng downloads và active users cho app mobile mới",
    challenge: "Thị trường app đông đúc, ngân sách marketing hạn chế, cần viral nhanh",
    strategy: "Growth hacking với referral program, ASO, và influencer marketing",
    solution: "Tối ưu ASO, xây dựng referral system, chạy ads targeting chính xác",
    results: [
      "500K downloads trong 6 tháng",
      "40% organic growth",
      "4.8★ rating trên App Store",
      "60% retention rate sau 30 ngày",
    ],
  },
]

export default function CaseStudiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [selectedCase, setSelectedCase] = useState<(typeof caseStudies)[0] | null>(null)

  const filteredCases =
    selectedCategory === "Tất cả" ? caseStudies : caseStudies.filter((c) => c.category === selectedCategory)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <Image src="/modern-office.png" alt="Office background" fill className="object-cover opacity-10" />
          <div className="absolute inset-0 bg-white/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-red-600 via-red-700 to-gray-900 bg-clip-text text-transparent"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Dự án tiêu biểu VietSolve
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Những giải pháp sáng tạo & đổi mới giúp doanh nghiệp Việt tăng trưởng vượt bậc.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatedButton href="/services" className="bg-red-600 hover:bg-red-700 text-white">
              Xem tất cả dịch vụ
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-red-600 text-white shadow-lg shadow-red-500/30"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
            <AnimatePresence mode="popLayout">
              {filteredCases.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedCase(caseStudy)}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={caseStudy.image || "/placeholder.svg"}
                        alt={caseStudy.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Badge */}
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {caseStudy.badge}
                      </div>

                      {/* Hover Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                          <Eye className="w-8 h-8 text-red-600" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="text-sm text-red-600 font-semibold mb-2">{caseStudy.category}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{caseStudy.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{caseStudy.description}</p>
                      <div className="text-red-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                        Xem chi tiết
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Kết quả đạt được
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, number: "50+", label: "Dự án hoàn thành", color: "red" },
              { icon: TrendingUp, number: "200%", label: "Tăng trưởng ROI trung bình", color: "red" },
              { icon: Eye, number: "3M+", label: "Lượt xem trên các chiến dịch", color: "gray" },
              { icon: Users, number: "30+", label: "Thương hiệu Việt đồng hành", color: "gray" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${stat.color}-100 flex items-center justify-center`}
                >
                  <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Lead Form */}
      <section className="py-20 px-6 bg-gradient-to-br from-red-600 to-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Muốn dự án của bạn được kể như một câu chuyện thành công?
            </h2>
            <p className="text-xl text-red-50">Liên hệ VietSolve để nhận tư vấn giải pháp tối ưu cho doanh nghiệp.</p>
          </motion.div>

          <motion.form
            className="bg-white rounded-2xl p-8 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Họ tên *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Doanh nghiệp</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                  placeholder="Tên công ty"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ngân sách dự kiến</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-500/20 outline-none transition-all">
                  <option>Dưới 50 triệu</option>
                  <option>50-100 triệu</option>
                  <option>100-300 triệu</option>
                  <option>Trên 300 triệu</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mục tiêu dự án</label>
              <textarea
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-500/20 outline-none transition-all resize-none"
                rows={4}
                placeholder="Mô tả ngắn gọn về mục tiêu và thách thức của dự án..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Nhận tư vấn miễn phí
            </button>
          </motion.form>
        </div>
      </section>

      {/* Case Detail Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Banner Image */}
              <div className="relative h-80">
                <Image
                  src={selectedCase.image || "/placeholder.svg"}
                  alt={selectedCase.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="text-red-400 font-semibold mb-2">{selectedCase.category}</div>
                  <h2
                    className="text-4xl font-bold text-white mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {selectedCase.title}
                  </h2>
                  <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {selectedCase.badge}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Objective */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Mục tiêu dự án</h3>
                  </div>
                  <p className="text-gray-600 text-lg">{selectedCase.objective}</p>
                </div>

                {/* Challenge */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-gray-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Thách thức</h3>
                  </div>
                  <p className="text-gray-600 text-lg">{selectedCase.challenge}</p>
                </div>

                {/* Strategy */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <ChartBar className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Chiến lược thực hiện</h3>
                  </div>
                  <p className="text-gray-600 text-lg">{selectedCase.strategy}</p>
                </div>

                {/* Solution */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-gray-800" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Giải pháp ứng dụng</h3>
                  </div>
                  <p className="text-gray-600 text-lg">{selectedCase.solution}</p>
                </div>

                {/* Results */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Kết quả đạt được</h3>
                  </div>
                  <ul className="space-y-3">
                    {selectedCase.results.map((result, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span className="text-gray-600 text-lg">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="pt-6 border-t border-gray-200">
                  <AnimatedButton className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Liên hệ tư vấn giải pháp tương tự
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
