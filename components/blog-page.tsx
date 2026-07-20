"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { publishedInsights } from "@/lib/content/insights"

/**
 * Blog / Insights — white theme.
 *
 * The previous version of this file shipped nine fabricated articles with
 * invented Vietnamese author names, invented publication dates and a fabricated
 * executive byline ("Nguyễn Văn An — CEO VietSolve"). Every card also linked to
 * /blog/{slug}, a route that does not exist — nine guaranteed 404s.
 *
 * All of it is removed. Articles now come from lib/content/insights.ts and the
 * page renders an honest, finished-looking state until real posts are added.
 */
export default function BlogPage() {
  const posts = publishedInsights

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-white via-red-50/30 to-gray-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">
              Blog &amp; Insights
            </span>
            <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Góc nhìn về thương hiệu,{" "}
              <span className="bg-gradient-to-r from-red-600 to-gray-900 bg-clip-text text-transparent">
                marketing và công nghệ
              </span>
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Những chia sẻ từ đội ngũ VietSolve về cách doanh nghiệp Việt xây dựng thương hiệu,
              vận hành hiệu quả và ứng dụng công nghệ vào tăng trưởng.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl rounded-3xl border border-gray-200 bg-gray-50/60 p-10 lg:p-14"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                Bài viết đầu tiên đang được chuẩn bị
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Trong lúc chờ, bạn có thể xem các dự án VietSolve đã thực hiện hoặc trao đổi trực
                tiếp về bài toán của doanh nghiệp.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                >
                  Xem dự án
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full border border-gray-300 text-gray-900 font-medium hover:bg-gray-100 transition-colors"
                >
                  Liên hệ VietSolve
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {post.title.vi}
                    </h2>
                    <p className="mt-3 text-gray-600 leading-relaxed">{post.excerpt.vi}</p>
                    <p className="mt-4 text-sm text-gray-500">
                      {post.author} ·{" "}
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                      </time>
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
