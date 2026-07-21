"use client"

import { Pacifico } from "next/font/google"
import { PrimaryButton } from "@/components/ui-kit/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative flex items-center overflow-hidden pt-28 pb-16 min-h-[80vh] lg:min-h-[88vh]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center center", pointerEvents: "none" }}
          src="/videos/hero-bg.mp4"
          poster="/videos/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          /* metadata, not auto: the clip is ~11MB and `auto` forced the whole
             file down before first paint. The poster covers the gap. */
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-white/75" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center lg:text-left space-y-6">
          <div className="space-y-5">
            <div className="inline-flex items-center px-5 py-2.5 bg-white/80 border border-red-200 rounded-full text-xs sm:text-sm text-gray-900 font-semibold tracking-wide backdrop-blur-sm">
              <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
              <span>{t.hero.badge}</span>
            </div>

            {/* text-balance keeps the headline from dropping a lone word onto its own line */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-balance">
              <span className="text-gray-900">{t.hero.title1} </span>
              <span className="text-gray-900">{t.hero.title2} </span>
              <span
                className={cn(
                  "bg-gradient-to-r from-red-600 via-gray-900 to-red-700 bg-clip-text text-transparent",
                  pacifico.className,
                )}
              >
                {t.hero.titleAccent}
              </span>
              {t.hero.title3 && <span className="text-gray-700"> {t.hero.title3}</span>}
            </h1>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t.hero.descP1}
              <span className="text-red-600 font-semibold">{t.hero.descH1}</span>
              {t.hero.descP2}
              <span className="text-red-600 font-semibold">{t.hero.descH2}</span>
              {t.hero.descP3}
              <span className="text-red-600 font-semibold">{t.hero.descH3}</span>
              {t.hero.descP4}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start">
            {/* Was <AnimatedButton variant="slim"> — "slim" is not a valid
                variant, so the styling silently fell back and the button was
                also an <a> nested inside a <Link>. */}
            <PrimaryButton href="/contact">{t.hero.ctaStart}</PrimaryButton>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full border border-gray-300 bg-white/70 text-gray-900 font-medium hover:bg-white hover:border-gray-400 transition-colors backdrop-blur-sm"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
