"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

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
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-gray-900 px-8 py-14 lg:px-16 lg:py-20 text-center text-white"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">{t.homeCta.title}</h2>
          <p className="mt-4 text-lg text-red-50/90 leading-relaxed max-w-2xl mx-auto">
            {t.homeCta.body}
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
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
