"use client"

import { motion } from "framer-motion"
import { Sparkles, Target, FlaskConical, Brain } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI Content Factory",
    description: "Tạo nội dung đa định dạng (text, image, video) tự động từ 1 brief, tối ưu cho từng kênh phân phối.",
  },
  {
    icon: Target,
    title: "AI Media Planner",
    description: "Phân bổ ngân sách thông minh theo real-time performance, tự động shift budget về kênh ROI cao nhất.",
  },
  {
    icon: FlaskConical,
    title: "AI Creative Testing",
    description: "A/B test hàng trăm biến thể creative đồng thời, học từ data để đề xuất winning formula.",
  },
  {
    icon: Brain,
    title: "AI Sales Agent/InsightX",
    description: "Chatbot tư vấn 24/7 + phân tích hành vi khách hàng để cá nhân hóa journey và tăng conversion.",
  },
]

export default function AIDifferentiators() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-vietsolve-red/10 to-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-vietsolve-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-vietsolve-burgundy/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-vietsolve-red/10 to-vietsolve-burgundy/10 border border-vietsolve-red/20">
              <Sparkles className="w-4 h-4 text-vietsolve-red" />
              <span className="text-sm font-semibold text-vietsolve-red">AI Technology</span>
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-vietsolve-red via-vietsolve-burgundy to-vietsolve-red bg-clip-text text-transparent">
              Tại sao  chúng tôi khác biệt?
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Công nghệ AI tiên tiến giúp tự động hóa toàn bộ quy trình marketing từ A-Z
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-vietsolve-red/5 via-vietsolve-burgundy/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-vietsolve-red/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-vietsolve-red to-vietsolve-burgundy text-white mb-6 shadow-lg"
                  >
                    <feature.icon className="w-7 h-7" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-vietsolve-red transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                  {/* Animated underline */}
                  <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy rounded-full transition-all duration-500" />
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-vietsolve-red/20 to-vietsolve-burgundy/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">Sẵn sàng trải nghiệm sức mạnh của AI Marketing?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Đặt lịch tư vấn miễn phí
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
