"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { projects } from "@/lib/content/projects"

/**
 * Case studies — white theme, real projects only.
 *
 * The previous version shipped six fabricated cases ("Thương hiệu thời trang x
 * TikTok", "Startup Fintech x AI Chatbot", "F&B x Rebranding", "App Mobile x
 * Growth Hacking", …) with invented result metrics (+300% doanh số, ROI 450%,
 * 500K downloads, 4.8★ App Store) and aggregate stats (50+ dự án, 200% ROI).
 * None of it was verifiable, so all of it is gone.
 *
 * Projects now come from lib/content/projects.ts. A project shows a link only
 * when a detail page actually exists, and metrics render only when a verified
 * figure with a source has been added.
 */
export default function CaseStudiesPage() {
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
              Case Study
            </span>
            <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Những dự án{" "}
              <span className="bg-gradient-to-r from-red-600 to-gray-900 bg-clip-text text-transparent">
                VietSolve đã thực hiện
              </span>
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Mỗi dự án là một bài toán riêng — từ xây dựng thương hiệu, phát triển nền tảng số đến
              triển khai công nghệ phục vụ tăng trưởng.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2">
            {projects.map((project, index) => {
              const card = (
                <>
                  {/* Brand visual, generated per project — no broken images and
                      no stock photography stand-ins. */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-red-950 flex items-end p-7">
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                      aria-hidden="true"
                    />
                    <span className="relative text-2xl font-bold text-white/90">
                      {project.name}
                    </span>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                      <span className="text-red-600">{project.industry.vi}</span>
                      <span className="text-gray-300" aria-hidden="true">
                        •
                      </span>
                      <span className="text-gray-500">{project.year}</span>
                    </div>

                    <h2 className="mt-3 text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {project.name}
                    </h2>

                    <p className="mt-3 text-gray-600 leading-relaxed">{project.summary.vi}</p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {project.deliverables.vi.map((d) => (
                        <li
                          key={d}
                          className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>

                    {project.metrics.length > 0 && (
                      <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                        {project.metrics.map((m) => (
                          <div key={m.value}>
                            <dt className="text-xs uppercase tracking-wider text-gray-500">
                              {m.label.vi}
                            </dt>
                            <dd className="mt-1 text-2xl font-bold text-gray-900">{m.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </>
              )

              return (
                <motion.article
                  key={project.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
                  className="group"
                >
                  {project.hasDetailPage ? (
                    <Link href={`/case-studies/${project.slug}`}>{card}</Link>
                  ) : (
                    card
                  )}
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-red-900 via-gray-900 to-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold">Bạn có một bài toán cần giải?</h2>
          <p className="mt-5 text-lg text-gray-300 leading-relaxed">
            Chia sẻ với VietSolve về mục tiêu của doanh nghiệp, chúng tôi sẽ cùng bạn xác định hướng
            triển khai phù hợp.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-flex items-center justify-center gap-2 min-h-[48px] px-8 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
          >
            Liên hệ ngay
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
