"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, X } from "lucide-react"
import { projects } from "@/lib/content/projects"
import { ProjectVisual } from "@/components/project-visual"
import { PrimaryButton } from "@/components/ui-kit/button"
import { TechLayer } from "@/components/tech/tech-layer"
import { TechDivider } from "@/components/tech/tech-divider"

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
  const [open, setOpen] = useState<string | null>(null)
  const active = projects.find((p) => p.slug === open) ?? null

  // Escape closes the modal; body scroll is restored on unmount.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <main id="main" className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-white via-red-50/30 to-gray-50/40">
        {/* Level 2 grid anchored top-right, away from the headline column */}
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
                  {/* Shared visual system — each project renders differently */}
                  <ProjectVisual project={project} priority={index === 0} />

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
                    {/* No detail page exists yet, so instead of a CTA that would
                        404 we open a modal built from this project's real data. */}
                    <button
                      type="button"
                      onClick={() => setOpen(project.slug)}
                      className="group/cta mt-6 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-red-600 transition-colors hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 rounded-sm"
                    >
                      Xem phạm vi dự án
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1"
                        aria-hidden="true"
                      />
                    </button>
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
      <section className="relative overflow-hidden py-20 px-4 bg-gradient-to-br from-red-900 via-gray-900 to-black text-white">
        <TechDivider variant="plain" className="absolute inset-x-0 top-0" />
        <TechLayer>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgb(255_255_255/0.06)_0_1px,transparent_1px_11px)] vs-mask-down" />
        </TechLayer>

        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold">Bạn có một bài toán cần giải?</h2>
          <p className="mt-5 text-lg text-gray-300 leading-relaxed">
            Chia sẻ với VietSolve về mục tiêu của doanh nghiệp, chúng tôi sẽ cùng bạn xác định hướng
            triển khai phù hợp.
          </p>
          {/* Label states the destination — not a generic "Liên hệ ngay" */}
          <div className="mt-9">
            <PrimaryButton href="/contact">Trao đổi dự án</PrimaryButton>
          </div>
        </div>
      </section>

      {/* Scope modal — content comes entirely from lib/content/projects.ts.
          Deliberately NOT wrapped in AnimatePresence: an exit animation keeps
          the overlay mounted until rAF completes, and if that never runs the
          invisible overlay would swallow every click on the page. Enter-only
          animation is safe because unmount is immediate. */}
      {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-gray-900/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="scope-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-7 shadow-xl sm:rounded-3xl sm:p-10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                    <span className="text-red-600">{active.industry.vi}</span>
                    <span className="text-gray-300" aria-hidden="true">•</span>
                    <span className="text-gray-500">{active.year}</span>
                  </div>
                  <h2 id="scope-title" className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                    {active.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  aria-label="Đóng"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <p className="mt-5 text-gray-600 leading-relaxed">{active.summary.vi}</p>

              <div className="mt-7">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                  Phạm vi VietSolve đã triển khai
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {active.deliverables.vi.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-gray-700">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600"
                        aria-hidden="true"
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <PrimaryButton href="/contact">Trao đổi dự án tương tự</PrimaryButton>
              </div>
            </motion.div>
          </motion.div>
      )}
    </main>
  )
}
