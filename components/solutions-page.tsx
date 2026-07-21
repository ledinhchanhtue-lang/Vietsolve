"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Radar,
  Shapes,
  Waypoints,
  Compass,
  TrendingUp,
  Clapperboard,
  AppWindow,
  Workflow,
  BarChart3,
  Search,
  PenTool,
  Route,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { serviceGroups } from "@/lib/content/services"
import { PrimaryButton, SecondaryButton, TextLink } from "@/components/ui-kit/button"
import { IconTile } from "@/components/ui-kit/icon-tile"
import { ServiceVisual } from "@/components/service-visual"
import { TechLayer } from "@/components/tech/tech-layer"
import { TechDivider } from "@/components/tech/tech-divider"

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

/* Must stay in sync with the `icon` names in lib/content/services.ts */
const GROUP_ICONS: Record<string, LucideIcon> = {
  Compass,
  TrendingUp,
  Clapperboard,
  AppWindow,
  Workflow,
  BarChart3,
}

export default function SolutionsPage() {
  const { t, lang } = useLanguage()

  const pillars = [
    { icon: Radar, title: t.pillars.p1Title, en: t.pillars.p1En, desc: t.pillars.p1Desc },
    { icon: Shapes, title: t.pillars.p2Title, en: t.pillars.p2En, desc: t.pillars.p2Desc },
    { icon: Waypoints, title: t.pillars.p3Title, en: t.pillars.p3En, desc: t.pillars.p3Desc },
  ]

  /* Search / pen / route — discovery, design, rollout. Deliberately not the
     lightbulb-people-rocket set the page used to ship. */
  const steps = [
    { n: "01", icon: Search, title: t.howWeWork.step1Title, desc: t.howWeWork.step1Desc },
    { n: "02", icon: PenTool, title: t.howWeWork.step2Title, desc: t.howWeWork.step2Desc },
    { n: "03", icon: Route, title: t.howWeWork.step3Title, desc: t.howWeWork.step3Desc },
  ]

  return (
    <main id="main" className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20 px-4 bg-gradient-to-br from-white via-red-50/30 to-gray-50/40">
        <TechLayer>
          <div className="absolute inset-0 vs-grid-2 vs-mask-center opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(30rem_22rem_at_82%_8%,rgb(220_38_38/0.08),transparent_72%)]" />
        </TechLayer>

        <div className="relative max-w-[1200px] mx-auto text-center">
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
            {/* Both CTAs have a real destination: one scrolls to the ecosystem
                section, the other pre-fills the contact form's context, and both
                now come from the shared kit, so the light sweep, focus
                ring and 48px height match every other CTA on the site. */}
            <PrimaryButton href="#service-ecosystem">Khám phá giải pháp</PrimaryButton>
            <SecondaryButton href="/contact?service=consulting">Nhận tư vấn</SecondaryButton>
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
                className="group relative overflow-hidden vs-scan bg-gray-50 border border-gray-200 p-8 rounded-2xl transition-all duration-300 hover:border-red-200 hover:bg-white hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <IconTile icon={p.icon} size="md" />
                <div className="mt-6 flex items-baseline gap-2">
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
      <section id="service-ecosystem" className="scroll-mt-24 py-16 md:py-24 px-4 bg-gray-50">
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
              const Icon = GROUP_ICONS[group.icon] ?? Compass
              return (
                <motion.div
                  key={group.id}
                  id={group.id}
                  className="group scroll-mt-28 relative isolate overflow-hidden vs-scan flex flex-col bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-red-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                >
                  {/* Same hover language as the homepage cards: pattern lifts,
                      bracket resolves, light bar crosses the top edge. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 vs-grid-3 vs-mask-corner opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 top-0 h-6 w-6 rounded-tr-2xl border-r-2 border-t-2 border-red-500/0 translate-x-1 -translate-y-1 transition-all duration-300 group-hover:border-red-500/50 group-hover:translate-x-0 group-hover:translate-y-0"
                  />

                  <IconTile icon={Icon} size="md" />
                  <h3 className="mt-6 text-xl font-bold text-gray-900">{group.name[lang]}</h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">{group.tagline[lang]}</p>

                  {/* A drawing of the actual work, not a sixth copy of the same
                      text block with a different glyph on top. */}
                  <ServiceVisual id={group.id} className="mt-6 aspect-[278/162]" />

                  <ul className="mt-6 space-y-3 flex-1">
                    {group.services[lang].map((s) => (
                      <li key={s} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-600"
                        />
                        <span className="text-gray-700">{s}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <TextLink
                      href={`/contact?service=${group.id}`}
                      ariaLabel={`Trao đổi về ${group.name[lang]}`}
                    >
                      Trao đổi về nhóm này
                    </TextLink>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <TechDivider className="mx-auto max-w-[1200px] px-4" />

      {/* Process */}
      <section className="relative py-16 md:py-24 px-4">
        <TechLayer>
          <div className="absolute inset-0 vs-grid-1 vs-mask-center" />
        </TechLayer>
        <div className="relative max-w-[1200px] mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Quy trình làm việc <span className="text-red-700">chuyên nghiệp</span>
          </motion.h2>

          {/* One line runs through all three markers on desktop, so the steps
              read as a sequence rather than three unrelated circles. */}
          <div className="relative">
            <div
              className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-red-200 to-transparent md:block"
              aria-hidden="true"
            />
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.n}
                  className="group text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-center">
                    <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-200 bg-white text-lg font-bold text-red-700 transition-colors duration-300 group-hover:border-red-600">
                      {step.n}
                    </span>
                  </div>
                  <div className="mt-5 flex justify-center">
                    <IconTile icon={step.icon} size="sm" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-gray-600 max-w-[38ch] mx-auto">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="group relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-gray-900 px-8 py-14 lg:px-16 lg:py-20 text-center text-white">
            {/* Identical treatment to the homepage final CTA */}
            <TechLayer>
              <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgb(255_255_255/0.07)_0_1px,transparent_1px_11px)] vs-mask-down" />
              <div className="absolute inset-0 bg-[radial-gradient(24rem_18rem_at_12%_8%,rgb(255_255_255/0.12),transparent_70%)]" />
            </TechLayer>
            <TechDivider variant="plain" className="absolute inset-x-8 top-0 lg:inset-x-16" />

            <h2 className="relative text-3xl md:text-4xl font-bold">{t.homeCta.title}</h2>
            <p className="relative mt-4 text-lg text-red-50/90 max-w-2xl mx-auto">{t.homeCta.body}</p>
            <Link
              href="/contact"
              className="relative mt-9 inline-flex items-center justify-center gap-2 min-h-[48px] px-8 rounded-full bg-white text-red-700 font-semibold transition-colors hover:bg-gray-100"
            >
              {t.homeCta.primary}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
