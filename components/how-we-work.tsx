"use client"

import { motion } from "framer-motion"
import { Brain, Sparkles, TrendingUp, ArrowRight, Zap } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "AI Phân tích & Chiến lược",
    description:
      "AI phân tích dữ liệu doanh nghiệp, hành vi khách hàng và xu hướng thị trường để xác định cơ hội tăng trưởng tối ưu.",
    icon: Brain,
    features: ["Phân tích dữ liệu tự động", "Dự đoán xu hướng", "Xác định đối tượng mục tiêu"],
    color: "from-vietsolve-red to-red-600",
  },
  {
    number: "02",
    title: "AI Sáng tạo Nội dung",
    description:
      "Hệ thống AI tạo nội dung đa kênh, thiết kế creative và copy tự động, tối ưu cho từng phân khúc khách hàng.",
    icon: Sparkles,
    features: ["Gen nội dung đa ngôn ngữ", "Thiết kế creative tự động", "A/B testing thông minh"],
    color: "from-orange-500 to-red-500",
  },
  {
    number: "03",
    title: "Tối ưu & Mở rộng",
    description:
      "AI liên tục học hỏi, tối ưu chiến dịch theo thời gian thực, tự động điều chỉnh ngân sách và targeting để tối đa ROI.",
    icon: TrendingUp,
    features: ["Tối ưu real-time", "Auto-scaling ngân sách", "Báo cáo insights tự động"],
    color: "from-red-600 to-vietsolve-burgundy",
  },
]

export default function HowWeWork() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="absolute top-20 left-10 w-72 h-72 bg-vietsolve-red/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-vietsolve-red/10 to-orange-500/10 px-4 py-2 rounded-full mb-6 border border-vietsolve-red/20"
          >
            <Zap className="w-4 h-4 text-vietsolve-red" />
            <span className="text-sm font-semibold text-vietsolve-red">Quy trình AI tự động</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-vietsolve-red to-vietsolve-burgundy bg-clip-text text-transparent text-5xl">
              Cách AI làm việc cho bạn
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Từ phân tích dữ liệu đến tối ưu chiến dịch, AI tự động hóa toàn bộ quy trình marketing của bạn
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-vietsolve-red via-orange-500 to-vietsolve-burgundy transform -translate-y-1/2 opacity-20" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className="relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-vietsolve-red/50 transition-all duration-500 hover:shadow-2xl hover:shadow-vietsolve-red/10 h-full">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-vietsolve-red/5 via-transparent to-orange-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Number badge with gradient */}
                    <div className="absolute -top-6 left-8 z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg shadow-vietsolve-red/30 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <span className="text-2xl font-bold text-white">{step.number}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 mt-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-vietsolve-red transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{step.description}</p>

                      {/* Features list */}
                      <ul className="space-y-3">
                        {step.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 + idx * 0.1 }}
                            className="flex items-center gap-2 text-sm text-gray-700"
                          >
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color}`} />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Arrow indicator for next step */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-20">
                        <div className="w-12 h-12 bg-white rounded-full border-2 border-vietsolve-red/30 flex items-center justify-center group-hover:border-vietsolve-red group-hover:scale-110 transition-all duration-300">
                          <ArrowRight className="w-5 h-5 text-vietsolve-red" />
                        </div>
                      </div>
                    )}

                    {/* Bottom gradient line */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl`}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6">Sẵn sàng trải nghiệm quy trình AI tự động?</p>
          <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-vietsolve-red to-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-vietsolve-red/30 transition-all duration-300 hover:scale-105">
            <span>Đặt lịch tư vấn miễn phí</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
