"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Sparkles,
  TrendingUp,
  Clapperboard,
  MonitorSmartphone,
  Bot,
  BarChart3,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { serviceGroups } from "@/lib/content/services"

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

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  TrendingUp,
  Clapperboard,
  MonitorSmartphone,
  Bot,
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
            const Icon = ICONS[group.icon] ?? Sparkles
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col bg-white border border-gray-200 rounded-2xl p-8 hover:border-red-300 hover:shadow-md transition-all duration-300 shadow-sm"
              >
                <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
                  <Icon className="w-7 h-7 text-red-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900">{group.name[lang]}</h3>
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

                <Link
                  href={`/services#${group.id}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                >
                  {t.ecosystem.explore}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-7 rounded-full border border-gray-300 text-gray-900 font-medium hover:bg-white hover:border-gray-400 transition-colors"
          >
            {t.ecosystem.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
