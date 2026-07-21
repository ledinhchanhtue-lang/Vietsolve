"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { projects } from "@/lib/content/projects"
import { ProjectVisual } from "@/components/project-visual"
import { TextLink } from "@/components/ui-kit/button"
import { TechLayer } from "@/components/tech/tech-layer"

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
    <section className="relative py-16 lg:py-24 bg-white">
      {/* Level 1 only — the thumbnails already carry a lot of visual weight, so
          the section behind them stays quiet. */}
      <TechLayer>
        <div className="absolute inset-0 vs-grid-1 vs-mask-center" />
      </TechLayer>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="shrink-0">
            <TextLink href="/case-studies">{t.featured.viewAll}</TextLink>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {shown.map((project, index) => {
            const featured = index === 0
            const card = (
              <>
                {/* Distinct brand visual per project — same system, different look */}
                <ProjectVisual project={project} priority={index === 0} />

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
                  {/* Dot-separated, not a third row of pills — the highlight
                      pills already carry that shape elsewhere on the page. */}
                  <p className="mt-4 text-sm text-gray-500">
                    {project.deliverables[lang].slice(0, 3).join(" · ")}
                  </p>
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
                /* First project leads the section at full width; the offset
                   plate matches the case-studies featured slot. */
                className={featured ? "group relative md:col-span-2" : "group"}
              >
                {featured && (
                  <span
                    aria-hidden="true"
                    className="absolute -inset-4 -z-10 translate-x-3 translate-y-3 rounded-2xl border border-red-100/80 bg-gradient-to-br from-red-50/60 to-gray-50 sm:-inset-5"
                  />
                )}
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
