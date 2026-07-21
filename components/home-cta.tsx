"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { TechLayer } from "@/components/tech/tech-layer"
import { TechDivider } from "@/components/tech/tech-divider"

/**
 * Final CTA on the homepage.
 *
 * One heading, one line, one primary CTA, one secondary. No newsletter here —
 * the newsletter lives in the footer only.
 */
export default function HomeCta() {
  const { t } = useLanguage()

  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-gray-900 px-8 py-14 lg:px-16 lg:py-20 text-center text-white"
        >
          {/* Level 3 diagonal matrix, in white here because the surface is red.
              Same pattern family as the service-card hover, inverted. */}
          <TechLayer>
            <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgb(255_255_255/0.07)_0_1px,transparent_1px_11px)] vs-mask-down" />
            <div className="absolute inset-0 bg-[radial-gradient(24rem_18rem_at_12%_8%,rgb(255_255_255/0.12),transparent_70%)]" />
          </TechLayer>

          {/* LED strip along the top edge of the card */}
          <TechDivider variant="plain" className="absolute inset-x-8 top-0 lg:inset-x-16" />

          <h2 className="relative text-3xl lg:text-4xl font-bold text-balance">{t.homeCta.title}</h2>
          <p className="relative mt-4 text-lg text-red-50/90 leading-relaxed max-w-2xl mx-auto">
            {t.homeCta.body}
          </p>
          <div className="relative mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 rounded-full bg-white text-red-700 font-semibold hover:bg-gray-100 transition-colors"
            >
              {t.homeCta.primary}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full border border-white/40 text-white font-medium hover:bg-white/10 transition-colors"
            >
              {t.homeCta.secondary}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
