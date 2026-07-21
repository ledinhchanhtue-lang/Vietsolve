"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Brain,
  Palette,
  Cpu,
  Sparkles,
  TrendingUp,
  Clapperboard,
  MonitorSmartphone,
  Bot,
  BarChart3,
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { serviceGroups } from "@/lib/content/services"

/**
 * /services — white theme, kept from the existing design.
 *
 * Structure: hero → three-pillar philosophy (Intelligent / Creative /
 * Innovation) → the six service groups with full service lists → process →
 * final CTA.
 *
 * Removed from the previous version: the Start / Grow / Scale pricing table,
 * the fake case carousel, and the two dead hero buttons (no onClick, no link).
 * No pricing is shown — there is no verified price list.
 */

const GROUP_ICONS: Record<string, LucideIcon> = {
  Sparkles,
  TrendingUp,
  Clapperboard,
  MonitorSmartphone,
  Bot,
  BarChart3,
}

export default function SolutionsPage() {
  const { t, lang } = useLanguage()

  const pillars = [
    { icon: Brain, title: t.pillars.p1Title, en: t.pillars.p1En, desc: t.pillars.p1Desc },
    { icon: Palette, title: t.pillars.p2Title, en: t.pillars.p2En, desc: t.pillars.p2Desc },
    { icon: Cpu, title: t.pillars.p3Title, en: t.pillars.p3En, desc: t.pillars.p3Desc },
  ]

  const steps = [
    { n: "01", title: t.howWeWork.step1Title, desc: t.howWeWork.step1Desc },
    { n: "02", title: t.howWeWork.step2Title, desc: t.howWeWork.step2Desc },
    { n: "03", title: t.howWeWork.step3Title, desc: t.howWeWork.step3Desc },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-14 md:pt-40 md:pb-20 px-4 bg-gradient-to-br from-white via-red-50/30 to-gray-50/40">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-red-600 uppercase tracking-wider"
          >
            {t.ecosystem.eyebrow}
          </motion.p>
          <motion.h1
            className="mt-4 text-4xl md:text-6xl font-bold text-gray-900 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            Dịch vụ <span className="text-red-700">Branding</span>,{" "}
            <span className="text-gray-800">Marketing</span>,{" "}
            <span className="text-red-600">Website</span>, AI &amp; Automation
          </motion.h1>
          <motion.p
            className="mt-5 text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Hệ sinh thái giải pháp toàn diện từ chiến lược thương hiệu đến công nghệ và AI — giúp
            doanh nghiệp tăng trưởng bền vững.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition-colors"
            >
              Trao đổi dự án
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/case-studies"
              className="px-8 py-4 border-2 border-red-700 text-red-700 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              Xem dự án
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Philosophy — three pillars */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.pillars.title}
          </motion.h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
            Ba nguyên tắc dẫn dắt mọi giải pháp VietSolve xây dựng.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p, index) => (
              <motion.div
                key={p.title}
                className="bg-gray-50 border border-gray-200 p-8 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <p.icon className="w-7 h-7 text-red-700" />
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl font-bold text-gray-900">{p.title}</h3>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {p.en}
                  </span>
                </div>
                <p className="mt-3 text-gray-600 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Six service groups — full lists */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Hệ sinh thái <span className="text-red-700">giải pháp toàn diện</span>
          </motion.h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
            {t.ecosystem.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceGroups.map((group, index) => {
              const Icon = GROUP_ICONS[group.icon] ?? Sparkles
              return (
                <motion.div
                  key={group.id}
                  id={group.id}
                  className="scroll-mt-28 flex flex-col bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                >
                  <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-red-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{group.name[lang]}</h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">{group.tagline[lang]}</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {group.services[lang].map((s) => (
                      <li key={s} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{s}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                  >
                    Trao đổi về nhóm này
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Quy trình làm việc <span className="text-red-700">chuyên nghiệp</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.n}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-700 font-bold text-xl mb-4">
                  {step.n}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 max-w-[38ch] mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-gray-900 px-8 py-14 lg:px-16 lg:py-20 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold">{t.homeCta.title}</h2>
            <p className="mt-4 text-lg text-red-50/90 max-w-2xl mx-auto">{t.homeCta.body}</p>
            <Link
              href="/contact"
              className="mt-9 inline-flex items-center justify-center gap-2 min-h-[48px] px-8 rounded-full bg-white text-red-700 font-semibold hover:bg-gray-100 transition-colors"
            >
              {t.homeCta.primary}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
