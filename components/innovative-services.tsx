"use client"

import { motion } from "framer-motion"
import {
  Compass,
  TrendingUp,
  Clapperboard,
  AppWindow,
  Workflow,
  BarChart3,
  type LucideIcon,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { serviceGroups } from "@/lib/content/services"
import { TextLink, SecondaryButton } from "@/components/ui-kit/button"

/**
 * Service ecosystem — the six service groups.
 *
 * Rebuilt from the old six-marketing-service grid. The previous version hardcoded
 * fake dashboard mockups (+23%, 15.2K impressions, 8.2% CTR, 9/10 Quality Score,
 * #1 ranking) presented as if they were real client results. All removed.
 *
 * The card visual style (gray-50 card, rounded-2xl, border, hover lift) is kept.
 * Content is now data-driven from lib/content/services.ts so the homepage and
 * /services can't drift apart. Homepage shows name + one line + three highlights.
 */

/* Icon language per group — compass/growth-line/frame/window/workflow/chart.
   Deliberately no robot or lightbulb clichés. */
const ICONS: Record<string, LucideIcon> = {
  Compass,
  TrendingUp,
  Clapperboard,
  AppWindow,
  Workflow,
  BarChart3,
}

export default function InnovativeServices() {
  const { t, lang } = useLanguage()

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-xs sm:text-sm font-semibold text-red-600 uppercase tracking-wider">
            {t.ecosystem.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            {t.ecosystem.title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{t.ecosystem.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {serviceGroups.map((group, index) => {
            const Icon = ICONS[group.icon] ?? Compass
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col bg-white border border-gray-200 rounded-2xl p-8 shadow-sm transition-all duration-300 ease-out hover:border-gray-300 hover:shadow-md hover:-translate-y-1"
              >
                {/* Charcoal icon, no red circle — red is reserved as an accent */}
                <Icon className="h-9 w-9 text-gray-900" strokeWidth={1.5} aria-hidden="true" />

                <h3 className="mt-6 text-xl font-bold text-gray-900">{group.name[lang]}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{group.tagline[lang]}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.highlights[lang].map((h) => (
                    <li
                      key={h}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700"
                    >
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-1">
                  <TextLink
                    href={`/services#${group.id}`}
                    ariaLabel={`${t.ecosystem.explore}: ${group.name[lang]}`}
                  >
                    {t.ecosystem.explore}
                  </TextLink>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <SecondaryButton href="/services" withArrow>
            {t.ecosystem.viewAll}
          </SecondaryButton>
        </div>
      </div>
    </section>
  )
}
