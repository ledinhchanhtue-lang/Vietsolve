"use client"

import { motion } from "framer-motion"
import { Brain, Palette, Cpu, CheckCircle2, ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"

const solutions = [
  {
    icon: Brain,
    title: "Intelligent Solutions",
    description: "Giải pháp dựa trên dữ liệu, nghiên cứu hành vi khách hàng, tối ưu hiệu quả truyền thông.",
    features: [
      "Phân tích dữ liệu hành vi & insight",
      "Data-driven strategy & KPI measurement",
      "Báo cáo realtime dashboard",
      "Tối ưu ngân sách marketing",
    ],
    gradient: "from-teal-50 to-cyan-50",
    iconColor: "text-teal-600",
  },
  {
    icon: Palette,
    title: "Creative Solutions",
    description: "Tạo khác biệt bằng chiến lược nội dung, hình ảnh và trải nghiệm thương hiệu độc đáo.",
    features: [
      "Chiến lược sáng tạo nội dung (TVC, viral, TikTok)",
      "Key visual & storytelling nhất quán",
      "Campaign đa nền tảng (IMC)",
      "Phong cách thương hiệu riêng biệt",
    ],
    gradient: "from-purple-50 to-pink-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Cpu,
    title: "Innovation Solutions",
    description: "Ứng dụng công nghệ AI và tự động hóa để nâng cao năng suất, tăng trưởng doanh thu.",
    features: [
      "Xây dựng chatbot & AI Agent",
      "Automation & CRM integration",
      "Hệ thống phân tích dữ liệu AI",
      "Giải pháp tự động marketing – bán hàng",
    ],
    gradient: "from-blue-50 to-indigo-50",
    iconColor: "text-blue-600",
  },
]

const processSteps = [
  {
    step: "01",
    title: "Khảo sát & Đánh giá",
    description: "Khảo sát và đánh giá nhu cầu doanh nghiệp một cách chi tiết",
  },
  {
    step: "02",
    title: "Đề xuất chiến lược",
    description: "Đề xuất chiến lược và giải pháp tổng thể phù hợp",
  },
  {
    step: "03",
    title: "Triển khai & Tối ưu",
    description: "Triển khai, đo lường và tối ưu hiệu suất liên tục",
  },
  {
    step: "04",
    title: "Chuyển giao & Đồng hành",
    description: "Chuyển giao kiến thức và đồng hành dài hạn",
  },
]

export default function SolutionsPage() {



  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Dịch vụ VietSolve – <span className="text-red-700">Intelligent</span>.{" "}
            <span className="text-gray-800">Creative</span>. <span className="text-red-600">Innovation</span>.
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hệ sinh thái giải pháp toàn diện từ branding, marketing, đến công nghệ và AI - giúp doanh nghiệp tăng trưởng
            bền vững
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="px-8 py-4 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition-colors">
              Khám phá giải pháp
            </button>
            <button className="px-8 py-4 border-2 border-red-700 text-red-700 rounded-lg font-semibold hover:bg-red-50 transition-colors">
              Tư vấn miễn phí
            </button>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Hệ sinh thái <span className="text-red-700">giải pháp toàn diện</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <solution.icon className="w-8 h-8 text-red-700" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <ul className="space-y-3">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Quy trình làm việc <span className="text-red-700">chuyên nghiệp</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-700 font-bold text-xl mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-red-900 via-gray-900 to-black text-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Sẵn sàng bắt đầu dự án của bạn?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Liên hệ ngay để được tư vấn miễn phí và nhận báo giá chi tiết
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <button className="px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Liên hệ ngay
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
