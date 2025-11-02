"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BookOpen,
  Lightbulb,
  Brain,
  PenLine,
  Calendar,
  User,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import AnimatedButton from "@/components/animated-button"
import Link from "next/link"
import Image from "next/image"

const categories = [
  { id: "all", label: "Tất cả", icon: BookOpen },
  { id: "marketing", label: "Marketing Insight", icon: Lightbulb },
  { id: "tech", label: "Công nghệ & AI", icon: Brain },
  { id: "case-study", label: "Case Study", icon: PenLine },
  { id: "ceo", label: "Góc nhìn CEO", icon: User },
]

const blogPosts = [
  {
    id: 1,
    slug: "tiktok-marketing-2025",
    category: "marketing",
    categoryLabel: "Marketing Insight",
    title: "TikTok Marketing 2025: Xu hướng và Chiến lược Hiệu quả",
    description:
      "Khám phá những xu hướng mới nhất và chiến lược marketing hiệu quả trên TikTok để tăng trưởng thương hiệu trong năm 2025.",
    image: "/tiktok-marketing-strategy.jpg",
    author: "Nguyễn Minh Anh",
    date: "15 Tháng 1, 2025",
    featured: true,
  },
  {
    id: 2,
    slug: "ai-content-creation",
    category: "tech",
    categoryLabel: "Công nghệ & AI",
    title: "AI trong Sáng tạo Nội dung: Cơ hội và Thách thức",
    description:
      "Phân tích vai trò của AI trong việc tạo nội dung marketing và cách tận dụng công nghệ này một cách hiệu quả.",
    image: "/ai-content-creation-technology.jpg",
    author: "Trần Văn Bình",
    date: "12 Tháng 1, 2025",
    featured: true,
  },
  {
    id: 3,
    slug: "fashion-brand-success",
    category: "case-study",
    categoryLabel: "Case Study",
    title: "Case Study: Thương hiệu Thời trang Tăng 300% Doanh số",
    description: "Câu chuyện thành công của một thương hiệu thời trang Việt Nam với chiến lược marketing đa kênh.",
    image: "/fashion-brand-success-story.jpg",
    author: "Lê Thị Cẩm",
    date: "10 Tháng 1, 2025",
    featured: false,
  },
  {
    id: 4,
    slug: "brand-storytelling",
    category: "marketing",
    categoryLabel: "Marketing Insight",
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
    slug: "automation-marketing",
    category: "tech",
    categoryLabel: "Công nghệ & AI",
    title: "Marketing Automation: Tối ưu hóa Quy trình và Tăng ROI",
    description: "Hướng dẫn chi tiết về cách áp dụng marketing automation để tăng hiệu quả và tiết kiệm thời gian.",
    image: "/marketing-automation-dashboard.png",
    author: "Hoàng Minh Tuấn",
    date: "5 Tháng 1, 2025",
    featured: false,
  },
  {
    id: 6,
    slug: "ceo-vision-2025",
    category: "ceo",
    categoryLabel: "Góc nhìn CEO",
    title: "Tầm nhìn 2025: Xây dựng Thương hiệu Bền vững",
    description:
      "CEO VietSolve chia sẻ về định hướng phát triển và tầm nhìn xây dựng thương hiệu bền vững trong tương lai.",
    image: "/ceo-vision-business-strategy.jpg",
    author: "Nguyễn Văn An - CEO",
    date: "1 Tháng 1, 2025",
    featured: false,
  },
  {
    id: 7,
    slug: "social-media-trends",
    category: "marketing",
    categoryLabel: "Marketing Insight",
    title: "10 Xu hướng Social Media Marketing không thể bỏ qua",
    description: "Tổng hợp những xu hướng social media marketing quan trọng nhất mà các thương hiệu cần chú ý.",
    image: "/social-media-trends-2025.jpg",
    author: "Vũ Thị Hương",
    date: "28 Tháng 12, 2024",
    featured: false,
  },
  {
    id: 8,
    slug: "ecommerce-optimization",
    category: "case-study",
    categoryLabel: "Case Study",
    title: "Tối ưu hóa E-commerce: Tăng Conversion Rate 150%",
    description: "Phân tích chi tiết về cách một website thương mại điện tử tăng tỷ lệ chuyển đổi gấp 1.5 lần.",
    image: "/ecommerce-optimization-analytics.jpg",
    author: "Đỗ Minh Khoa",
    date: "25 Tháng 12, 2024",
    featured: false,
  },
  {
    id: 9,
    slug: "chatbot-customer-service",
    category: "tech",
    categoryLabel: "Công nghệ & AI",
    title: "Chatbot AI: Cách mạng hóa Dịch vụ Khách hàng",
    description: "Khám phá cách chatbot AI đang thay đổi cách thức tương tác và chăm sóc khách hàng hiện đại.",
    image: "/ai-chatbot-customer-service.png",
    author: "Lý Thanh Tùng",
    date: "20 Tháng 12, 2024",
    featured: false,
  },
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [email, setEmail] = useState("")
  const postsPerPage = 6

  const filteredPosts =
    selectedCategory === "all" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)

  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = regularPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(regularPosts.length / postsPerPage)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribe email:", email)
    setEmail("")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('/modern-office.png')] bg-cover bg-center opacity-5" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Blog & Insights
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Chia sẻ kiến thức, kinh nghiệm và góc nhìn mới về truyền thông, thương hiệu & công nghệ.
            </p>
            <AnimatedButton href="#latest" className="bg-red-600 hover:bg-red-700 text-white">
              Đọc bài mới nhất
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-6">
          <div className="flex gap-4 justify-center flex-wrap">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setCurrentPage(1)
                  }}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Blog Section */}
      {selectedCategory === "all" && featuredPosts.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Bài viết nổi bật
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-4 py-1.5 bg-yellow-300 text-gray-900 text-sm font-semibold rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                        {post.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                    </div>
                    <h3
                      className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all"
                      >
                        Đọc tiếp
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section id="latest" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {selectedCategory === "all"
                ? "Tất cả bài viết"
                : categories.find((c) => c.id === selectedCategory)?.label}
            </h2>
            <p className="text-gray-600">{filteredPosts.length} bài viết</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium text-xs">
                      {post.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>
                  <h3
                    className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{post.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span className="text-xs">{post.author}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-2 text-red-600 font-semibold text-sm hover:gap-3 transition-all"
                    >
                      Đọc tiếp
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === page ? "bg-red-600 text-white" : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-red-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <BookOpen className="w-12 h-12 text-red-600 mx-auto mb-6" />
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Nhận tin tức & góc nhìn mới nhất từ VietSolve
            </h2>
            <p className="text-gray-600 mb-8">
              Đăng ký để nhận những bài viết mới nhất, insights và case study độc quyền từ đội ngũ chuyên gia của chúng
              tôi.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email của bạn"
                required
                className="flex-1 px-6 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
              >
                Đăng ký
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-4">Chúng tôi tôn trọng quyền riêng tư của bạn. Không spam.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Bạn muốn chia sẻ câu chuyện thương hiệu của mình?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Hãy để VietSolve đồng hành cùng bạn xây dựng và phát triển thương hiệu một cách bền vững.
            </p>
            <AnimatedButton href="/contact" className="bg-red-600 hover:bg-red-700 text-white">
              Liên hệ VietSolve
            </AnimatedButton>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
