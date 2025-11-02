"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Instagram, Youtube, CheckCircle, Sparkles, Brain, Zap, Target } from "lucide-react"
import AnimatedButton from "./animated-button"
import Link from "next/link"

const services = [
  {
    title: "AI Social Media Ads",
    description:
      "AI tự động tạo nội dung quảng cáo, tối ưu targeting và bidding theo thời gian thực. Phân tích hành vi người dùng để tối đa hóa ROI trên mọi nền tảng.",
    mockup: "social",
    aiFeature: "Auto-generate & optimize",
  },
  {
    title: "AI Google Ads",
    description:
      "AI dự đoán từ khóa hiệu quả, tự động điều chỉnh bid strategy và tạo ad copy variants. Machine learning tối ưu CPC/CPA liên tục 24/7.",
    mockup: "google-ads",
    aiFeature: "Smart bidding & prediction",
  },
  {
    title: "AI Email / SMS",
    description:
      "AI cá nhân hóa nội dung cho từng segment, tự động A/B test và chọn thời điểm gửi tối ưu. Tăng open rate và conversion với predictive analytics.",
    mockup: "email",
    aiFeature: "Personalization engine",
  },
  {
    title: "AI SEO",
    description:
      "AI phân tích search intent, tự động tối ưu on-page content và đề xuất chiến lược backlink. Theo dõi algorithm updates và điều chỉnh real-time.",
    mockup: "seo",
    aiFeature: "Content optimization",
  },
  {
    title: "AI Analytics",
    description:
      "AI phát hiện insights ẩn, dự đoán xu hướng và đề xuất hành động cụ thể. Dashboard tự động cập nhật với recommendations dựa trên data patterns.",
    mockup: "analytics",
    aiFeature: "Predictive insights",
  },
  {
    title: "AI Web Development",
    description:
      "Tích hợp AI chatbot, recommendation engine và personalization. Website tự học và tối ưu UX dựa trên hành vi người dùng thực tế.",
    mockup: "web-dev",
    aiFeature: "Smart integration",
    badges: [
      { icon: <Brain className="w-4 h-4" />, text: "AI Chatbot" },
      { icon: <Target className="w-4 h-4" />, text: "Personalization" },
      { icon: <Zap className="w-4 h-4" />, text: "Auto-optimize" },
    ],
  },
]

export default function InnovativeServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-gradient-to-b from-white via-red-50/30 to-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">Powered by AI</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 lg:text-5xl">
            Dịch vụ sáng tạo với{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">AI</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tự động hóa, tối ưu và mở rộng quy mô với công nghệ AI tiên tiến. Từ content generation đến predictive
            analytics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {/* Top row - AI Social and AI Google Ads */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.slice(0, 2).map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="bg-white border border-gray-200 rounded-2xl p-8 backdrop-blur-sm hover:border-red-300 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 group relative overflow-hidden"
              >
                

                <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-6 overflow-hidden relative border border-gray-200 shadow-sm">
                  <div className="absolute inset-0 p-4">
                    {/* AI Social Mockup */}
                    {service.mockup === "social" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="w-full h-full p-2"
                      >
                        <div className="bg-white rounded-lg p-3 h-full border border-gray-200">
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                              <Brain className="w-4 h-4 text-red-600" />
                              <div className="text-xs font-semibold text-gray-900">AI Auto-pilot</div>
                            </div>
                            <div className="flex space-x-2">
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center"
                              >
                                <Instagram className="w-3 h-3 text-white" />
                              </motion.div>
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="w-5 h-5 bg-red-600 rounded-md flex items-center justify-center"
                              >
                                <Youtube className="w-3 h-3 text-white" />
                              </motion.div>
                            </div>
                          </div>
                          <div className="space-y-1 mb-3">
                            <motion.div
                              className="text-white text-xs px-2 py-1 rounded bg-gradient-to-r from-blue-600 to-blue-500 flex justify-between items-center"
                              initial={{ width: "0%" }}
                              whileInView={{ width: "100%" }}
                              transition={{ duration: 1, delay: 0.8 }}
                              viewport={{ once: true }}
                            >
                              <span>Facebook</span>
                              <span className="text-green-300">+42%</span>
                            </motion.div>
                            <motion.div
                              className="text-white text-xs px-2 py-1 rounded bg-gradient-to-r from-pink-600 to-pink-500 flex justify-between items-center"
                              initial={{ width: "0%" }}
                              whileInView={{ width: "100%" }}
                              transition={{ duration: 1, delay: 1 }}
                              viewport={{ once: true }}
                            >
                              <span>Instagram</span>
                              <span className="text-green-300">+38%</span>
                            </motion.div>
                            <motion.div
                              className="text-white text-xs px-2 py-1 rounded bg-gradient-to-r from-gray-900 to-gray-800 flex justify-between items-center"
                              initial={{ width: "0%" }}
                              whileInView={{ width: "100%" }}
                              transition={{ duration: 1, delay: 1.2 }}
                              viewport={{ once: true }}
                            >
                              <span>TikTok</span>
                              <span className="text-green-300">+55%</span>
                            </motion.div>
                          </div>
                          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded p-2 border border-red-200">
                            <div className="text-xs text-gray-600 mb-1">AI Optimization</div>
                            <div className="flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              >
                                <Sparkles className="w-4 h-4 text-red-600" />
                              </motion.div>
                              <span className="text-xs text-gray-900">Auto-adjusting bids...</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* AI Google Ads Mockup */}
                    {service.mockup === "google-ads" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="w-full h-full p-2"
                      >
                        <div className="bg-white rounded-lg p-3 h-full border border-gray-200">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200"
                              >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                  <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                  />
                                  <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                  />
                                  <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                  />
                                  <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                  />
                                </svg>
                              </motion.div>
                              <div>
                                <div className="text-xs font-semibold text-gray-900">AI Smart Bidding</div>
                              </div>
                            </div>
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full">
                              Active
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded border border-green-200">
                              <span className="text-gray-700 font-medium">CPA Optimized</span>
                              <motion.span
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                className="text-green-600 font-bold"
                              >
                                -32%
                              </motion.span>
                            </div>
                            <div className="flex justify-between text-xs bg-gradient-to-r from-blue-50 to-cyan-50 p-2 rounded border border-blue-200">
                              <span className="text-gray-700 font-medium">Quality Score</span>
                              <span className="text-blue-600 font-bold">9.2/10</span>
                            </div>
                            <div className="flex justify-between text-xs bg-gradient-to-r from-purple-50 to-pink-50 p-2 rounded border border-purple-200">
                              <span className="text-gray-700 font-medium">AI Predictions</span>
                              <span className="text-purple-600 font-bold">+28% CTR</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-between h-auto">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Middle row - AI Email/SMS, AI SEO, AI Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.slice(2, 5).map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + 2) * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 backdrop-blur-sm hover:border-red-300 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 group relative overflow-hidden"
              >
                

                <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-6 overflow-hidden relative border border-gray-200 shadow-sm">
                  <div className="absolute inset-0 p-4">
                    {/* AI Email/SMS Mockup */}
                    {service.mockup === "email" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: (index + 2) * 0.2 }}
                        className="w-full h-full p-2"
                      >
                        <div className="bg-white rounded-lg p-3 h-full border border-gray-200">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-red-600" />
                            <div className="text-xs font-semibold text-gray-900">AI Personalization</div>
                          </div>
                          <div className="space-y-2 mb-3">
                            <motion.div
                              animate={{ width: ["100%", "90%", "100%"] }}
                              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                              className="bg-gradient-to-r from-red-200 to-orange-200 h-2 rounded"
                            ></motion.div>
                            <motion.div
                              animate={{ width: ["75%", "85%", "75%"] }}
                              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                              className="bg-gradient-to-r from-red-200 to-orange-200 h-2 rounded"
                            ></motion.div>
                          </div>
                          <div className="space-y-1 mb-3">
                            <div className="bg-gray-100 h-1 w-full rounded"></div>
                            <div className="bg-gray-100 h-1 w-full rounded"></div>
                            <div className="bg-gray-100 h-1 w-2/3 rounded"></div>
                          </div>
                          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded p-2 border border-red-200">
                            <div className="text-xs text-gray-600">Open Rate</div>
                            <motion.div
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              className="text-sm font-bold text-red-600"
                            >
                              +45%
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* AI SEO Mockup */}
                    {service.mockup === "seo" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: (index + 2) * 0.2 }}
                        className="w-full h-full p-2"
                      >
                        <div className="bg-white rounded-lg p-3 h-full border border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4 text-red-600" />
                            <div className="text-xs font-semibold text-gray-900">AI Content Optimizer</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded p-2 border border-green-200">
                              <div className="text-xs text-gray-600">Ranking</div>
                              <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                className="text-sm font-bold text-green-600"
                              >
                                #1-3
                              </motion.div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded p-2 border border-blue-200">
                              <div className="text-xs text-gray-600">Traffic</div>
                              <div className="text-sm font-bold text-blue-600">+156%</div>
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded p-2 border border-red-200">
                            <div className="text-xs text-gray-600 mb-1">AI Suggestions</div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-600" />
                                <div className="text-xs text-gray-700">Keywords optimized</div>
                              </div>
                              <div className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-600" />
                                <div className="text-xs text-gray-700">Meta tags updated</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* AI Analytics Mockup */}
                    {service.mockup === "analytics" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: (index + 2) * 0.2 }}
                        className="w-full h-full p-2"
                      >
                        <div className="bg-white rounded-lg p-3 h-full border border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-red-600" />
                            <div className="text-xs font-semibold text-gray-900">AI Insights</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded p-2 border border-purple-200">
                              <div className="text-xs text-gray-600">Prediction</div>
                              <motion.div
                                animate={{ color: ["#9333ea", "#ec4899", "#9333ea"] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                className="text-sm font-bold"
                              >
                                +32%
                              </motion.div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded p-2 border border-orange-200">
                              <div className="text-xs text-gray-600">Anomaly</div>
                              <div className="text-sm font-bold text-orange-600">Detected</div>
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded p-2 border border-red-200">
                            <div className="text-xs text-gray-600 mb-1">AI Recommendations</div>
                            <div className="flex items-center gap-1">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              >
                                <Brain className="w-3 h-3 text-red-600" />
                              </motion.div>
                              <span className="text-xs text-gray-700">Analyzing patterns...</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-between h-auto">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom row - AI Web Development (full width) */}
          {services.slice(5).map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 backdrop-blur-sm hover:border-red-300 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 group relative overflow-hidden"
            >
              

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm mb-6">{service.description}</p>

                    {/* AI Features Badges */}
                    {service.badges && (
                      <div className="flex flex-wrap gap-3 mb-6">
                        {service.badges.map((badge, badgeIndex) => (
                          <div
                            key={badgeIndex}
                            className="flex items-center space-x-2 bg-gradient-to-r from-red-50 to-orange-50 px-3 py-2 rounded-lg border border-red-200 shadow-sm"
                          >
                            <div className="text-red-600">{badge.icon}</div>
                            <span className="text-xs text-gray-700 font-medium">{badge.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end items-center">
                    <Link href="/services#web-development">
                      <AnimatedButton className="bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700 px-6 py-2">
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Tìm hiểu thêm
                        </span>
                      </AnimatedButton>
                    </Link>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="aspect-[16/9] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden relative border border-gray-200 shadow-sm">
                    <div className="absolute inset-0 p-4">
                      {/* AI Web Development Mockup */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="w-full h-full"
                      >
                        {/* Browser Chrome */}
                        <div className="bg-gray-200 rounded-t-lg p-2 mb-2 border border-gray-300">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <div className="bg-white text-gray-700 text-xs px-2 py-1 rounded flex-1 flex items-center justify-center gap-2 border border-gray-300">
                              <Brain className="w-3 h-3 text-red-600" />
                              <span>AI-Powered Website</span>
                            </div>
                          </div>
                        </div>
                        {/* Website Content with AI Elements */}
                        <div className="bg-white rounded-b-lg p-3 h-[calc(100%-36px)] grid grid-cols-3 gap-3 border border-gray-200">
                          <div className="col-span-3 flex justify-between items-center mb-2">
                            <motion.div
                              animate={{ width: ["60px", "80px", "60px"] }}
                              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                              className="bg-gradient-to-r from-red-200 to-orange-200 h-4 rounded"
                            ></motion.div>
                            <div className="flex items-center gap-2">
                              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                <Sparkles className="w-2 h-2" />
                                <span>AI Active</span>
                              </div>
                            </div>
                          </div>
                          <motion.div
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            className="col-span-3 h-20 bg-gradient-to-r from-red-100 to-orange-100 rounded mb-3 flex items-center justify-center"
                          >
                            <Brain className="w-8 h-8 text-red-600" />
                          </motion.div>
                          <div className="bg-gray-100 h-24 rounded flex items-center justify-center">
                            <Target className="w-6 h-6 text-gray-400" />
                          </div>
                          <div className="bg-gray-100 h-24 rounded flex items-center justify-center">
                            <Zap className="w-6 h-6 text-gray-400" />
                          </div>
                          <div className="bg-gray-100 h-24 rounded flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-gray-400" />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
