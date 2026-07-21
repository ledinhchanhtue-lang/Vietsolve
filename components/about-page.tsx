"use client"

import { motion } from "framer-motion"
import { Sparkles, Lightbulb, Zap, Users, Rocket, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const coreValues = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Sáng tạo",
      titleEn: "Creative",
      description: "Không ngừng đổi mới và sáng tạo trong mọi giải pháp, mang đến những ý tưởng độc đáo và khác biệt.",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Trí tuệ",
      titleEn: "Intelligence",
      description:
        "Ứng dụng công nghệ và AI vào quy trình, tạo ra giải pháp tối ưu, hiệu quả và phù hợp với đặc thù từng doanh nghiệp.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Đổi mới",
      titleEn: "Innovation",
      description: "Luôn tiên phong trong việc áp dụng công nghệ mới và xu hướng hiện đại để dẫn đầu thị trường.",
    },
  ]

  const solutions = [
    "Thương hiệu & Nhận diện",
    "Truyền thông & Quảng cáo",
    "Sáng tạo & Sản xuất nội dung", // Changed from "Truyền thông & Sản xuất nội dung"
    "SEO & Marketing số",
    "Phát triển Website & Ứng dụng",
    "AI & Tự động hóa",
    "Phát triển công nghệ",
  ]

  return (
    <main id="main" className="bg-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-br from-white via-red-50/30 to-gray-50/30 overflow-hidden">
          <div className="absolute left-0 top-32 w-64 h-[500px] opacity-40">
            <svg
              viewBox="0 0 200 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              style={{ filter: "blur(1px)" }}
            >
              <path
                d="M 50 0 Q 150 100, 100 250 T 150 500"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#DC2626" />
                  <stop offset="50%" stopColor="#991B1B" />
                  <stop offset="100%" stopColor="#1F2937" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">
                  Giới thiệu doanh nghiệp
                </span>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Tổng quan về
                <br />
                <span className="bg-gradient-to-r from-red-600 via-red-800 to-gray-900 bg-clip-text text-transparent">
                  VietSolve
                </span>
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center justify-center gap-4 mb-12"
              >
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-8 py-4 bg-[#F2682A] text-white rounded-full font-medium hover:bg-[#e05a1f] transition-colors shadow-lg inline-flex items-center gap-2"
                  >
                    Liên hệ ngay
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-gradient-to-br from-red-50/50 via-white to-gray-50/50 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200/20 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Giới thiệu{" "}
                <span className="bg-gradient-to-r from-red-600 to-gray-900 bg-clip-text text-transparent">
                  VietSolve
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-gray-900 mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Main content - spans 2 columns */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-6"
              >
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Agency đồng hành cùng doanh nghiệp</h3>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        VietSolve là{" "}
                        <span className="font-semibold text-red-600">Agency sáng tạo – công nghệ – truyền thông</span>{" "}
                        đồng hành cùng doanh nghiệp Việt Nam trong hành trình xây dựng thương hiệu và tăng trưởng bền
                        vững.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-700 to-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Hệ sinh thái giải pháp toàn diện</h3>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Với hệ sinh thái giải pháp đa dạng từ branding, truyền thông, quảng cáo, media, sản xuất nội
                        dung, SEO, website, AI & automation, đến phát triển công nghệ, VietSolve giúp doanh nghiệp{" "}
                        <span className="font-semibold text-red-700">
                          giải quyết vấn đề – kiến tạo giá trị – phát triển dài hạn
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Công nghệ & AI tiên tiến</h3>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Lấy <span className="font-semibold text-red-600">Sáng tạo – Trí tuệ – Đổi mới</span> làm giá trị
                        cốt lõi, VietSolve không chỉ mang đến ý tưởng độc đáo mà còn ứng dụng công nghệ và AI vào quy
                        trình, tạo ra giải pháp tối ưu, hiệu quả và phù hợp với đặc thù từng doanh nghiệp.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sidebar - spans 1 column */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Logo symbolism card */}
                <div className="bg-gradient-to-br from-red-600 to-gray-900 p-8 rounded-3xl shadow-xl text-white">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Biểu tượng chim Lạc</h3>
                  <p className="text-white/90 leading-relaxed">
                    Thể hiện tinh thần dân tộc, khát vọng bay cao vươn xa, nhưng vẫn giữ gìn bản sắc văn hóa Việt Nam –
                    cũng chính là tinh thần mà VietSolve theo đuổi trong mọi dự án.
                  </p>
                </div>

                {/* Positioning card */}
                <div className="bg-gradient-to-br from-red-700 to-gray-800 p-8 rounded-3xl shadow-xl text-white">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Định vị</h3>
                  <p className="text-2xl font-bold leading-relaxed">
                    Agency đồng hành cùng doanh nghiệp, kiến tạo giá trị bền vững
                  </p>
                </div>

                {/* Values card — replaced the 100+/50+/5+/98% stats block, which
                    had no verified source. */}
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Giá trị cốt lõi</h3>
                  <ul className="space-y-3">
                    {[
                      ["Sáng tạo", "Creative"],
                      ["Trí tuệ", "Intelligence"],
                      ["Đổi mới", "Innovation"],
                    ].map(([vi, en]) => (
                      <li key={vi} className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-red-600 rounded-full shrink-0" />
                        <span className="font-semibold text-gray-900">{vi}</span>
                        <span className="text-xs text-gray-400 uppercase tracking-wide">{en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Giá trị cốt lõi</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ba trụ cột định hình phong cách làm việc và giải pháp của VietSolve
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-gray-900 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm font-semibold text-red-600 mb-4 uppercase tracking-wide">{value.titleEn}</p>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Hệ sinh thái giải pháp</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Đa dạng dịch vụ từ sáng tạo đến công nghệ, đáp ứng mọi nhu cầu của doanh nghiệp
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-red-50 to-gray-50 p-6 rounded-2xl border-2 border-red-100 hover:border-red-300 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full" />
                    <p className="text-lg font-semibold text-gray-900">{solution}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-red-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Cách chúng tôi làm việc</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Đội ngũ core kết hợp cùng chuyên gia theo từng loại dự án
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-10 lg:p-12 rounded-3xl shadow-xl border border-gray-100"
            >
              <div className="text-center max-w-2xl mx-auto">
                <Users className="w-16 h-16 text-red-600 mx-auto mb-6" />
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Mỗi dự án được dẫn dắt bởi đội ngũ core của VietSolve và kết hợp cùng các chuyên gia
                  phù hợp — từ chiến lược, sáng tạo, công nghệ đến vận hành — để đảm bảo giải pháp đúng
                  với bài toán của doanh nghiệp.
                </p>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors shadow-lg inline-flex items-center gap-2"
                >
                  Trao đổi dự án
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-gradient-to-br from-red-600 via-red-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center text-white"
            >
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Sẵn sàng đồng hành cùng
                <br />
                VietSolve?
              </h2>
              <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
                Hãy để chúng tôi giúp bạn kiến tạo giá trị bền vững cho doanh nghiệp
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-12 py-5 bg-white text-red-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-2xl inline-flex items-center gap-3"
                >
                  Liên hệ ngay
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
    </main>
  )
}
