"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { projects } from "@/lib/content/projects"

/**
 * Featured projects on the homepage — replaces the old ROI calculator (which
 * projected fabricated USD revenue figures).
 *
 * Real projects only, max four, from lib/content/projects.ts. No invented
 * metrics. A card links to a detail page only if one exists; otherwise it's a
 * non-interactive card — never a CTA to a 404. White theme to match the site.
 */
export default function FeaturedProjects() {
  const { t, lang } = useLanguage()
  const shown = projects.slice(0, 4)

  if (shown.length === 0) return null

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12"
        >
          <div>
            <p className="text-xs sm:text-sm font-semibold text-red-600 uppercase tracking-wider">
              {t.featured.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              {t.featured.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl">{t.featured.subtitle}</p>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors shrink-0"
          >
            {t.featured.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {shown.map((project, index) => {
            const card = (
              <>
                {/* Brand visual generated per project — no broken images, no stock */}
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-red-950 flex items-end p-6">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                      backgroundSize: "36px 36px",
                    }}
                    aria-hidden="true"
                  />
                  <span className="relative text-xl font-bold text-white/90">{project.name}</span>
                </div>

                <div className="mt-5">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                    <span className="text-red-600">{project.industry[lang]}</span>
                    {project.year && (
                      <>
                        <span className="text-gray-300" aria-hidden="true">•</span>
                        <span className="text-gray-500">{project.year}</span>
                      </>
                    )}
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed max-w-[55ch]">
                    {project.summary[lang]}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.deliverables[lang].slice(0, 3).map((d) => (
                      <li
                        key={d}
                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
                className="group"
              >
                {project.hasDetailPage ? (
                  <Link href={`/case-studies/${project.slug}`}>{card}</Link>
                ) : (
                  card
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
