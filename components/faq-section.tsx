"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react"

const faqs = [
  {
    question: "AI Marketing là gì và hoạt động như thế nào?",
    answer:
      "AI Marketing sử dụng trí tuệ nhân tạo để tự động hóa và tối ưu hóa các chiến dịch marketing. Hệ thống AI của chúng tôi phân tích dữ liệu khách hàng, tạo nội dung tự động, tối ưu hóa ngân sách quảng cáo theo thời gian thực, và đưa ra insights để cải thiện ROI liên tục.",
  },
  {
    question: "Mất bao lâu để thấy kết quả từ AI Marketing?",
    answer:
      "Thông thường, bạn sẽ thấy kết quả ban đầu trong 2-3 tuần đầu tiên. Các chỉ số như CTR và engagement thường cải thiện ngay trong tuần đầu. ROI và doanh số tăng đáng kể thường xuất hiện sau 4-6 tuần khi AI đã học đủ dữ liệu để tối ưu hóa hiệu quả.",
  },
  {
    question: "Chi phí sử dụng dịch vụ AI Marketing như thế nào?",
    answer:
      "Chúng tôi cung cấp các gói linh hoạt từ 15 triệu/tháng cho startup đến gói enterprise tùy chỉnh. Mỗi gói bao gồm AI tools, creative production, và campaign management. ROI trung bình của khách hàng là +38%, giúp chi phí marketing hiệu quả hơn 30% so với phương pháp truyền thống.",
  },
  {
    question: "Tôi có cần kiến thức kỹ thuật để sử dụng không?",
    answer:
      "Hoàn toàn không cần! Nền tảng AI của chúng tôi được thiết kế với giao diện thân thiện, dễ sử dụng. Team của bạn chỉ cần cung cấp brief và phê duyệt nội dung. Mọi việc từ setup, optimization đến reporting đều được AI và đội ngũ chuyên gia của chúng tôi xử lý.",
  },
  {
    question: "Các ngành nghề nào phù hợp với AI Marketing?",
    answer:
      "AI Marketing hiệu quả với hầu hết các ngành: E-commerce, F&B, Fashion, Beauty, Education, Real Estate, Finance, Healthcare. Chúng tôi đã triển khai thành công cho 200+ brands từ startup đến enterprise, với case studies cụ thể cho từng vertical.",
  },
  {
    question: "Dữ liệu của tôi có được bảo mật không?",
    answer:
      "Bảo mật dữ liệu là ưu tiên hàng đầu. Chúng tôi tuân thủ GDPR và các tiêu chuẩn bảo mật quốc tế. Dữ liệu được mã hóa end-to-end, lưu trữ trên server riêng biệt, và chỉ được sử dụng cho mục đích tối ưu chiến dịch của bạn. Chúng tôi ký NDA với mọi khách hàng.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-200 rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">Câu hỏi thường gặp</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Giải đáp{" "}
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">thắc mắc</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tất cả những gì bạn cần biết về AI Marketing và dịch vụ của chúng tôi
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left bg-white border border-gray-200 rounded-2xl p-6 hover:border-red-300 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                        {faq.question}
                      </h3>
                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-gray-600 leading-relaxed pt-2">{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-red-600 transition-colors" />
                  </motion.div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">Vẫn còn thắc mắc?</p>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-300">
            
            Liên hệ tư vấn miễn phí
          </button>
        </motion.div>
      </div>
    </section>
  )
}
