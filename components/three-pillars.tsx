"use client"

import { motion } from "framer-motion"
import { Radar, Shapes, Waypoints } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { IconTile } from "@/components/ui-kit/icon-tile"
import { PillarVisual } from "@/components/pillar-visual"

/**
 * Three pillars — Intelligent · Creative · Innovation.
 *
 * The philosophy layer under everything VietSolve does. White theme, light
 * cards to match the rest of the homepage. One line each — not paragraphs.
 */
export default function ThreePillars() {
  const { t } = useLanguage()

  const pillars = [
    { icon: Radar, visual: "constellation" as const, title: t.pillars.p1Title, en: t.pillars.p1En, desc: t.pillars.p1Desc },
    { icon: Shapes, visual: "layers" as const, title: t.pillars.p2Title, en: t.pillars.p2En, desc: t.pillars.p2Desc },
    { icon: Waypoints, visual: "modules" as const, title: t.pillars.p3Title, en: t.pillars.p3En, desc: t.pillars.p3Desc },
  ]

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-xs sm:text-sm font-semibold text-red-600 uppercase tracking-wider">
            {t.pillars.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">{t.pillars.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((p, index) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden vs-scan bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:border-red-200 hover:bg-white hover:shadow-md transition-all duration-300"
            >
              {/* Was a solid red-100 square with a red glyph — the only place on
                  the site that filled an icon container with brand colour. */}
              <div className="mb-6">
                <IconTile icon={p.icon} size="lg" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-xl font-bold text-gray-900">{p.title}</h3>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {p.en}
                </span>
              </div>
              <p className="mt-3 text-gray-600 leading-relaxed max-w-[42ch]">{p.desc}</p>

              {/* Each pillar draws its own idea — a data constellation, a stack
                  of shapes, a connected module row — instead of three identical
                  boxes distinguished only by their glyph. */}
              <PillarVisual kind={p.visual} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
