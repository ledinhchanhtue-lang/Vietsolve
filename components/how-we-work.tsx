"use client"

import { motion } from "framer-motion"
import { Lightbulb, Users, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Khám phá",
    description: "Chúng tôi tìm hiểu sâu về doanh nghiệp, mục tiêu và thách thức của bạn.",
    icon: <Lightbulb className="w-8 h-8" />,
  },
  {
    number: "02",
    title: "Thiết kế",
    description: "Đội ngũ của chúng tôi tạo ra các giải pháp sáng tạo phù hợp với nhu cầu riêng của bạn.",
    icon: <Users className="w-8 h-8" />,
  },
  {
    number: "03",
    title: "Triển khai",
    description: "Chúng tôi thực hiện chính xác và hỗ trợ bạn trong từng bước.",
    icon: <Rocket className="w-8 h-8" />,
  },
]

export default function HowWeWork() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-red-700 to-gray-900 bg-clip-text text-transparent mb-4">
            Cách chúng tôi làm việc
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quy trình đã được chứng minh của chúng tôi đảm bảo kết quả xuất sắc cho mọi dự án
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group bg-red-50 rounded-2xl p-8 border-2 border-red-200 hover:border-red-600 transition-all duration-300 hover:shadow-xl hover:shadow-red-100"
            >
              {/* Number Badge */}
              <div className="absolute -top-6 left-8">
                <div className="w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  {step.number}
                </div>
              </div>

              {/* Icon */}
              <div className="mt-8 mb-6">{step.icon}</div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-red-800 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>

              {/* Decorative Element */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
