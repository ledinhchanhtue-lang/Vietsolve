"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Search, PenTool, Route, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { PrimaryButton, SecondaryButton } from "@/components/ui-kit/button"
import { IconTile } from "@/components/ui-kit/icon-tile"
import { CreativeDesk } from "@/components/services/creative-desk"
import { ServiceStudio } from "@/components/services/service-studio"
import { CapabilityStack } from "@/components/services/capability-stack"
import { TechLayer } from "@/components/tech/tech-layer"
import { TechDivider } from "@/components/tech/tech-divider"

/**
 * /services — rebuilt as an interactive creative studio.
 *
 * The previous page presented the six groups as six identical blocks (heading,
 * paragraph, bullets, CTA) — icons and borders could not save that shape, so
 * the shape is gone. Structure now:
 *
 *   Hero (copy 42% + Creative Control Desk 58%)
 *   → Interactive Service Studio (click-tab; six distinct product stages)
 *   → Cross-capability Project Builder
 *   → three-step process
 *   → final CTA
 *
 * The three-pillar section was dropped — it duplicated the homepage; the
 * values survive as one line in the hero. Deep links /services#<group.id>
 * keep working (handled inside ServiceStudio). The studio mounts EITHER the
 * desktop tabs OR the mobile accordion — never both — so no heading, id or CTA
 * is ever duplicated in the DOM.
 */
export default function SolutionsPage() {
  const { t } = useLanguage()

  const steps = [
    { n: "01", icon: Search, title: t.howWeWork.step1Title, desc: t.howWeWork.step1Desc },
    { n: "02", icon: PenTool, title: t.howWeWork.step2Title, desc: t.howWeWork.step2Desc },
    { n: "03", icon: Route, title: t.howWeWork.step3Title, desc: t.howWeWork.step3Desc },
  ]

  return (
    <main id="main" className="min-h-screen bg-white">
      {/* ============ Hero — Creative Control Desk ============ */}
      <section className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20 bg-gradient-to-br from-white via-red-50/30 to-gray-50/40">
        <TechLayer>
          <div className="absolute inset-0 vs-grid-2 vs-mask-center opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(30rem_22rem_at_82%_8%,rgb(220_38_38/0.08),transparent_72%)]" />
        </TechLayer>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[42fr_58fr] lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <p className="text-sm font-semibold text-red-600 uppercase tracking-wider">
                {t.ecosystem.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-bold text-gray-900 text-balance md:text-5xl xl:text-6xl">
                Dịch vụ <span className="text-red-700">Branding</span>,{" "}
                <span className="text-gray-800">Marketing</span>,{" "}
                <span className="text-red-600">Website</span>, AI &amp; Automation
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg text-gray-600 lg:mx-0">
                Hệ sinh thái giải pháp toàn diện từ chiến lược thương hiệu đến công nghệ và AI —
                giúp doanh nghiệp tăng trưởng bền vững.
              </p>
              {/* The three values, folded into one line instead of a section
                  that duplicated the homepage */}
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Intelligence · Creativity · Innovation
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <PrimaryButton href="/contact">Trao đổi dự án</PrimaryButton>
                <SecondaryButton href="#service-studio" withArrow>
                  Khám phá giải pháp
                </SecondaryButton>
              </div>
            </motion.div>

            <CreativeDesk />
          </div>
        </div>
      </section>

      {/* ============ Interactive Service Studio ============ */}
      <section id="service-studio" className="scroll-mt-24 py-14 md:py-20">
        {/* Keep the old anchor alive — homepage and footer still link to it */}
        <span id="service-ecosystem" className="block scroll-mt-24" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Hệ sinh thái <span className="text-red-700">giải pháp toàn diện</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">{t.ecosystem.subtitle}</p>
          </div>
          <ServiceStudio />
        </div>
      </section>

      <TechDivider className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />

      {/* ============ Cross-capability Project Builder ============ */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <TechLayer>
          <div className="absolute inset-0 vs-grid-1 vs-mask-center" />
        </TechLayer>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl text-balance">
              Không dự án nào chỉ cần <span className="text-red-700">một dịch vụ.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Chọn bài toán của bạn — xem một dự án được lắp từ những module nào.
            </p>
          </div>
          <CapabilityStack />
        </div>
      </section>

      <TechDivider className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />

      {/* ============ Process — kept, LED connector ============ */}
      <section className="py-14 md:py-20 px-4">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-14 text-center text-3xl font-bold md:text-4xl">
            Quy trình làm việc <span className="text-red-700">chuyên nghiệp</span>
          </h2>
          <div className="relative">
            <div className="absolute left-0 right-0 top-7 hidden md:block">
              <TechDivider variant="plain" />
            </div>
            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
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
                  <p className="mx-auto mt-2 max-w-[38ch] text-gray-600">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ Final CTA ============ */}
      <section className="py-14 md:py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="group relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-gray-900 px-8 py-14 text-center text-white lg:px-16 lg:py-20">
            <TechLayer>
              <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgb(255_255_255/0.07)_0_1px,transparent_1px_11px)] vs-mask-down" />
              <div className="absolute inset-0 bg-[radial-gradient(24rem_18rem_at_12%_8%,rgb(255_255_255/0.12),transparent_70%)]" />
            </TechLayer>
            <TechDivider variant="plain" className="absolute inset-x-8 top-0 lg:inset-x-16" />

            <h2 className="relative text-3xl font-bold md:text-4xl">{t.homeCta.title}</h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-lg text-red-50/90">{t.homeCta.body}</p>
            <Link
              href="/contact"
              className="relative mt-9 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white px-8 font-semibold text-red-700 transition-colors hover:bg-gray-100"
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
