"use client"

import { motion } from "framer-motion"
import { TrendingUp, Target, Zap, ArrowRight, Bot, BarChart3 } from "lucide-react"
import Image from "next/image"

export default function CaseStudyShowcase() {
  const metrics = [
    { label: "Tăng trưởng doanh số", value: "+245%", icon: TrendingUp },
    { label: "Giảm CPA", value: "-67%", icon: Target },
    { label: "Tốc độ triển khai", value: "3 tuần", icon: Zap },
  ]

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-red-50/30 to-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full border border-red-500/20 mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-red-600">Case Study</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 bg-clip-text text-transparent">
            Thành công thực tế
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Ngành Thời trang & Lifestyle</p>
        </motion.div>

        {/* Case Study Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        >
          {/* Context Section */}
          <div className="p-8 md:p-12 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ngữ cảnh</h3>
                <p className="text-gray-600 leading-relaxed">
                  Thương hiệu thời trang mid-tier với 15 cửa hàng, gặp khó khăn trong việc tạo nội dung đa kênh
                  (Facebook, Instagram, TikTok) với ngân sách marketing hạn chế. Chi phí thuê agency truyền thống cao,
                  thời gian sản xuất content chậm (2-3 tuần/campaign), và ROI không ổn định.
                </p>
              </div>
            </div>
          </div>

          {/* Solution Section */}
          <div className="p-8 md:p-12 bg-white border-b border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Giải pháp AI</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Triển khai bộ giải pháp AI toàn diện: <strong>AI Content Factory</strong> tự động tạo 50+ variants
                  content/tuần từ 1 brief, <strong>AI Media Planner</strong> phân bổ ngân sách tối ưu theo real-time
                  performance, <strong>AI Creative Testing</strong> A/B test tự động 20+ biến thể creative, và
                  <strong> AI Sales Agent</strong> phân tích insight khách hàng từ social comments.
                </p>
              </div>
            </div>

            {/* Image Previews */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Before Image */}
              <motion.div whileHover={{ scale: 1.02 }} className="relative group">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden border-2 border-gray-200">
                  <Image
                    src="/fashion-ad-before-traditional-design.jpg"
                    alt="Trước khi áp dụng AI"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-gray-900/80 text-white text-sm font-semibold rounded-full mb-2">
                      Trước
                    </span>
                    <p className="text-white text-sm">Content thủ công, 2-3 tuần/campaign</p>
                  </div>
                </div>
              </motion.div>

              {/* After Image */}
              <motion.div whileHover={{ scale: 1.02 }} className="relative group">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden border-2 border-red-500">
                  <Image
                    src="/fashion-ad-after-ai-modern-vibrant.jpg"
                    alt="Sau khi áp dụng AI"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-full mb-2">
                      Sau
                    </span>
                    <p className="text-white text-sm">AI-powered, 50+ variants/tuần</p>
                  </div>
                </div>
              </motion.div>

              {/* A/B Testing Image */}
              <motion.div whileHover={{ scale: 1.02 }} className="relative group">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden border-2 border-purple-500">
                  <Image
                    src="/ab-testing-dashboard-analytics-comparison.jpg"
                    alt="A/B Testing Dashboard"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm font-semibold rounded-full mb-2">
                      A/B Test
                    </span>
                    <p className="text-white text-sm">20+ variants tự động, real-time optimization</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Results Section */}
          <div className="p-8 md:p-12 bg-gradient-to-br from-red-50 to-orange-50">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Kết quả</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sau 3 tháng triển khai, thương hiệu đạt được những con số ấn tượng với chi phí marketing giảm 67%
                  nhưng doanh số tăng 245%, thời gian từ ý tưởng đến campaign chỉ còn 3 ngày thay vì 2-3 tuần, và tỷ lệ
                  engagement tăng 180% nhờ content được tối ưu liên tục.
                </p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-red-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <metric.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                        {metric.value}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{metric.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300">
                Xem thêm Case Studies
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
