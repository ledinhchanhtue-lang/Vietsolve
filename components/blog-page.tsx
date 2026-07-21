"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { publishedInsights } from "@/lib/content/insights"
import { PrimaryButton, SecondaryButton } from "@/components/ui-kit/button"
import { IconTile } from "@/components/ui-kit/icon-tile"
import { TechLayer } from "@/components/tech/tech-layer"
import { Compass, Workflow, Shapes } from "lucide-react"

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
    <main id="main" className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-white via-red-50/30 to-gray-50/40">
        <TechLayer>
          <div className="absolute inset-0 vs-grid-2 vs-mask-corner opacity-70" />
        </TechLayer>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            /* Editorial empty state — a designed page, not a heading floating
               in whitespace. Categories preview what's coming; no fake posts. */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16 items-start"
            >
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Bài viết đầu tiên đang được chuẩn bị
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-xl">
                  Chúng tôi đang biên tập những góc nhìn đầu tiên. Trong lúc chờ, bạn có thể xem các
                  dự án VietSolve đã thực hiện hoặc trao đổi trực tiếp về bài toán của doanh nghiệp.
                </p>

                <div className="mt-8">
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-900">
                    Chủ đề sắp có
                  </p>
                  <ul className="mt-4 divide-y divide-gray-200 border-y border-gray-200">
                    {[
                      { icon: Compass, name: "Branding & Growth", desc: "Định vị, nhận diện và tăng trưởng thương hiệu." },
                      { icon: Workflow, name: "AI & Automation", desc: "Ứng dụng AI vào bán hàng, vận hành và báo cáo." },
                      { icon: Shapes, name: "Creative Technology", desc: "Nơi sáng tạo gặp công nghệ và sản phẩm số." },
                    ].map(({ icon, name, desc }) => (
                      /* Was a 6px red dot per row. The upcoming topics map onto
                         real service groups, so they get those groups' icons. */
                      <li key={name} className="group flex items-start gap-4 py-4">
                        <IconTile icon={icon} size="sm" />
                        <span>
                          <span className="block font-semibold text-gray-900">{name}</span>
                          <span className="mt-0.5 block text-sm text-gray-600">{desc}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <PrimaryButton href="/case-studies">Xem dự án</PrimaryButton>
                  <SecondaryButton href="/contact">Trao đổi với VietSolve</SecondaryButton>
                </div>
              </div>

              {/* Editorial visual — brand grid, no stock imagery. The tilt +
                  offset plate lift it off the page; both settle on hover. */}
              <div className="relative hidden lg:block group">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-red-100/80 bg-gradient-to-br from-red-50/70 to-gray-50"
                />
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-900 via-gray-800 to-red-950 rotate-1 transition-transform duration-500 ease-out group-hover:rotate-0 motion-reduce:rotate-0">
                <svg
                  viewBox="0 0 400 300"
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <g stroke="rgba(255,255,255,0.09)" strokeWidth="1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <line key={`v${i}`} x1={i * 44} y1="0" x2={i * 44} y2="300" />
                    ))}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <line key={`h${i}`} x1="0" y1={i * 44} x2="400" y2={i * 44} />
                    ))}
                  </g>
                  {/* Three stacked "article" blocks — an editorial metaphor */}
                  <g>
                    {[0, 1, 2].map((i) => (
                      <g key={i} transform={`translate(60 ${58 + i * 70})`}>
                        <rect width="280" height="46" rx="8" fill="rgba(255,255,255,0.06)" />
                        <rect x="16" y="13" width="120" height="7" rx="3.5" fill="rgba(255,255,255,0.28)" />
                        <rect x="16" y="27" width="196" height="6" rx="3" fill="rgba(255,255,255,0.13)" />
                        <circle cx="256" cy="23" r="6" fill={i === 0 ? "#dc2626" : "rgba(255,255,255,0.18)"} />
                      </g>
                    ))}
                  </g>
                </svg>
                </div>
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
