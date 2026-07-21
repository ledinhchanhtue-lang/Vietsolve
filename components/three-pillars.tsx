"use client"

import { motion } from "framer-motion"
import { Brain, Palette, Cpu } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

/**
 * Three pillars — Intelligent · Creative · Innovation.
 *
 * The philosophy layer under everything VietSolve does. White theme, light
 * cards to match the rest of the homepage. One line each — not paragraphs.
 */
export default function ThreePillars() {
  const { t } = useLanguage()

  const pillars = [
    { icon: Brain, title: t.pillars.p1Title, en: t.pillars.p1En, desc: t.pillars.p1Desc },
    { icon: Palette, title: t.pillars.p2Title, en: t.pillars.p2En, desc: t.pillars.p2Desc },
    { icon: Cpu, title: t.pillars.p3Title, en: t.pillars.p3En, desc: t.pillars.p3Desc },
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
              className="bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:border-red-300 hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <p.icon className="w-7 h-7 text-red-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-xl font-bold text-gray-900">{p.title}</h3>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {p.en}
                </span>
              </div>
              <p className="mt-3 text-gray-600 leading-relaxed max-w-[42ch]">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
