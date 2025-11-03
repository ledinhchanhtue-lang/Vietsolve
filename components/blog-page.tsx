"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Zap, ShoppingCart, Brain, Video, Target, User, Calendar, ArrowRight, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const categories = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "marketing", label: "Marketing", icon: Target },
  { id: "creative", label: "Creative", icon: Zap },
  { id: "ecommerce", label: "Ecommerce", icon: ShoppingCart },
  { id: "ai-automation", label: "AI & Automation", icon: Brain },
  { id: "livestream", label: "Livestream", icon: Video },
  { id: "brand-strategy", label: "Brand Strategy", icon: Target },
  { id: "ceo-vision", label: "CEO's Vision", icon: User },
]

const blogPosts = [
  {
    id: 1,
    slug: "tiktok-marketing-2025",
    category: "marketing",
    categoryLabel: "Marketing",
    title: "TikTok Marketing 2025: Xu hướng và Chiến lược Hiệu quả",
    description:
      "Khám phá những xu hướng mới nhất và chiến lược marketing hiệu quả trên TikTok để tăng trưởng thương hiệu trong năm 2025.",
    image: "/tiktok-viral-campaign.jpg",
    author: "Nguyễn Minh Anh",
    date: "15 Tháng 1, 2025",
    featured: true,
  },
  {
    id: 2,
    slug: "ai-content-creation",
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    title: "AI trong Sáng tạo Nội dung: Cơ hội và Thách thức",
    description:
      "Phân tích vai trò của AI trong việc tạo nội dung marketing và cách tận dụng công nghệ này một cách hiệu quả.",
    image: "/ai-content-creation-technology-workspace.jpg",
    author: "Trần Văn Bình",
    date: "12 Tháng 1, 2025",
    featured: true,
  },
  {
    id: 3,
    slug: "fashion-brand-success",
    category: "ecommerce",
    categoryLabel: "Ecommerce",
    title: "Case Study: Thương hiệu Thời trang Tăng 300% Doanh số",
    description: "Câu chuyện thành công của một thương hiệu thời trang Việt Nam với chiến lược marketing đa kênh.",
    image: "/fashion-ad-after-ai-modern-vibrant.jpg",
    author: "Lê Thị Cẩm",
    date: "10 Tháng 1, 2025",
    featured: true,
  },
  {
    id: 4,
    slug: "brand-storytelling",
    category: "brand-strategy",
    categoryLabel: "Brand Strategy",
    title: "Nghệ thuật Kể chuyện Thương hiệu trong Kỷ nguyên Số",
    description:
      "Làm thế nào để xây dựng câu chuyện thương hiệu hấp dẫn và kết nối với khách hàng trong thời đại digital.",
    image: "/brand-storytelling-digital.jpg",
    author: "Phạm Quốc Dũng",
    date: "8 Tháng 1, 2025",
    featured: false,
  },
  {
    id: 5,
    slug: "livestream-commerce",
    category: "livestream",
    categoryLabel: "Livestream",
    title: "Livestream Commerce: Tương lai của Bán hàng Online",
    description: "Hướng dẫn chi tiết về cách tận dụng livestream để tăng doanh số và xây dựng cộng đồng khách hàng.",
    image: "/tiktok-viral-campaign.jpg",
    author: "Hoàng Minh Tuấn",
    date: "5 Tháng 1, 2025",
    featured: false,
  },
  {
    id: 6,
    slug: "ceo-vision-2025",
    category: "ceo-vision",
    categoryLabel: "CEO's Vision",
    title: "Tầm nhìn 2025: Xây dựng Thương hiệu Bền vững",
    description:
      "CEO VietSolve chia sẻ về định hướng phát triển và tầm nhìn xây dựng thương hiệu bền vững trong tương lai.",
    image: "/ceo-vision-business-strategy-futuristic.jpg",
    author: "Nguyễn Văn An - CEO",
    date: "1 Tháng 1, 2025",
    featured: false,
  },
  {
    id: 7,
    slug: "creative-design-trends",
    category: "creative",
    categoryLabel: "Creative",
    title: "10 Xu hướng Thiết kế Sáng tạo năm 2025",
    description: "Tổng hợp những xu hướng thiết kế và sáng tạo nội dung quan trọng nhất mà các thương hiệu cần chú ý.",
    image: "/modern-creative-office-teamwork.jpg",
    author: "Vũ Thị Hương",
    date: "28 Tháng 12, 2024",
    featured: false,
  },
  {
    id: 8,
    slug: "ecommerce-optimization",
    category: "ecommerce",
    categoryLabel: "Ecommerce",
    title: "Tối ưu hóa E-commerce: Tăng Conversion Rate 150%",
    description: "Phân tích chi tiết về cách một website thương mại điện tử tăng tỷ lệ chuyển đổi gấp 1.5 lần.",
    image: "/ab-testing-dashboard-analytics-comparison.jpg",
    author: "Đỗ Minh Khoa",
    date: "25 Tháng 12, 2024",
    featured: false,
  },
  {
    id: 9,
    slug: "chatbot-customer-service",
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    title: "Chatbot AI: Cách mạng hóa Dịch vụ Khách hàng",
    description: "Khám phá cách chatbot AI đang thay đổi cách thức tương tác và chăm sóc khách hàng hiện đại.",
    image: "/ai-chatbot-customer-service-futuristic-interface.jpg",
    author: "Lý Thanh Tùng",
    date: "20 Tháng 12, 2024",
    featured: false,
  },
  {
    id: 10,
    slug: "marketing-automation-roi",
    category: "marketing",
    categoryLabel: "Marketing",
    title: "Marketing Automation: Tối ưu ROI với Công nghệ",
    description: "Cách áp dụng marketing automation để tăng hiệu quả chiến dịch và giảm chi phí vận hành.",
    image: "/professional-asian-businesswoman-creative-team-col.jpg",
    author: "Trần Minh Đức",
    date: "15 Tháng 12, 2024",
    featured: false,
  },
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [email, setEmail] = useState("")
  const [visiblePosts, setVisiblePosts] = useState(9)

  const filteredPosts =
    selectedCategory === "all" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)

  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)
  const displayedPosts = regularPosts.slice(0, visiblePosts)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribe email:", email)
    setEmail("")
    alert("Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi insights mới nhất đến email của bạn.")
  }

  const loadMore = () => {
    setVisiblePosts((prev) => prev + 6)
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-8 bg-gradient-to-br from-[#FDFDFD] via-[#F8F8F8] to-[#FFFFFF] overflow-hidden">
        {/* Floating shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-vietsolve-red/10 to-vietsolve-burgundy/10 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold font-sans tracking-tight text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Insights & Vision from VietSolve
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Chiến lược, sáng tạo và dữ liệu – góc nhìn giúp thương hiệu Việt vươn tầm quốc tế.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Explore Case Studies
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <button
                onClick={() => document.getElementById("subscribe")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-900 text-gray-900 font-semibold rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                Subscribe to Insights
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200 py-6 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <motion.button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setVisiblePosts(9)
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium whitespace-nowrap snap-start transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy text-white shadow-lg shadow-vietsolve-red/30"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {selectedCategory === "all" && featuredPosts.length > 0 && (
        <section className="py-24 px-6 md:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 mb-4">Bài viết nổi bật</h2>
              <p className="text-gray-600">Những insights và case studies được đánh giá cao nhất</p>
            </motion.div>

            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group min-w-[90%] md:min-w-[45%] lg:min-w-[32%] snap-start"
                >
                  <div className="relative h-0 pb-[56.25%] rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={post.image || "/placeholder.svg?height=400&width=700"}
                      alt={post.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-4 py-1.5 bg-yellow-400 text-gray-900 text-sm font-semibold rounded-full">
                        Featured
                      </span>
                    </div>
                    <motion.div
                      className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <p className="text-sm font-medium">{post.description}</p>
                    </motion.div>
                  </div>
                  <div className="space-y-3">
                    <span className="inline-block px-3 py-1 bg-vietsolve-red/10 text-vietsolve-red rounded-full text-sm font-medium">
                      {post.categoryLabel}
                    </span>
                    <h3 className="text-xl font-bold font-sans text-gray-900 group-hover:text-vietsolve-red transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-vietsolve-red font-semibold hover:gap-3 transition-all"
                    >
                      Đọc tiếp
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 px-6 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 mb-4">Tất cả bài viết</h2>
            <p className="text-gray-600">{filteredPosts.length} bài viết</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group"
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="relative h-0 pb-[75%] overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg?height=300&width=400"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-sm">
                      <span className="inline-block px-3 py-1 bg-vietsolve-red/10 text-vietsolve-red rounded-full font-medium text-xs">
                        {post.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold font-sans text-gray-900 mb-3 group-hover:text-vietsolve-red transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">{post.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span className="text-xs">{post.author}</span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-2 text-vietsolve-red font-semibold text-sm hover:gap-3 transition-all"
                      >
                        Đọc tiếp
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {visiblePosts < regularPosts.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <button
                onClick={loadMore}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105"
              >
                Xem thêm bài viết
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-24 px-6 md:px-8 bg-gradient-to-br from-white via-red-50/30 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 mb-4">Từ góc nhìn VietSolve CEO</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/professional-asian-businessman-ceo.jpg"
                  alt="VietSolve CEO"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-vietsolve-red to-vietsolve-burgundy rounded-full blur-3xl opacity-30" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="relative">
                <svg
                  className="absolute -top-4 -left-4 w-12 h-12 text-vietsolve-red/20"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h8V14h-4c0-2.2 1.8-4 4-4V8zm14 0c-3.3 0-6 2.7-6 6v10h8V14h-4c0-2.2 1.8-4 4-4V8z" />
                </svg>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed pl-8">
                  "Chúng tôi không chỉ kể câu chuyện thương hiệu, chúng tôi định hình hành trình tăng trưởng."
                </p>
              </div>
              <div className="pl-8">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Trong thời đại số, thành công không chỉ đến từ sản phẩm tốt mà còn từ cách bạn kết nối với khách hàng.
                  VietSolve tin rằng mỗi thương hiệu đều có một câu chuyện độc đáo, và nhiệm vụ của chúng tôi là giúp
                  câu chuyện đó được lan tỏa đến đúng người, đúng thời điểm.
                </p>
                <Link
                  href="/blog/ceo-vision"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Đọc bài viết của CEO
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="subscribe" className="py-24 px-6 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              {/* Gradient border glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-vietsolve-red via-purple-500 to-vietsolve-burgundy rounded-3xl blur-lg opacity-30" />
              <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-xl">
                <div className="text-center mb-8">
                  <Mail className="w-12 h-12 text-vietsolve-red mx-auto mb-4" />
                  <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 mb-4">
                    Đăng ký nhận bản tin VietSolve Journal
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Cập nhật chiến lược marketing, livestream và AI mỗi tuần. Nhận insights độc quyền từ đội ngũ chuyên
                    gia của chúng tôi.
                  </p>
                </div>
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email của bạn"
                      required
                      className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-vietsolve-red transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Đăng ký ngay
                  </button>
                </form>
                <p className="text-sm text-gray-500 text-center mt-4">
                  Chúng tôi tôn trọng quyền riêng tư của bạn. Không spam.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 px-6 md:px-8 bg-gradient-to-r from-[#E60023] to-[#FF6B00] overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-sans text-white mb-6">Ready to grow beyond borders?</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Hãy để VietSolve đồng hành cùng bạn xây dựng và phát triển thương hiệu một cách bền vững với chiến lược
              AI-powered marketing.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-vietsolve-red font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Book a Strategy Session
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
