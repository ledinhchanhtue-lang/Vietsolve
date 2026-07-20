"use client"

import { ArrowRight } from "lucide-react"
import { Pacifico } from "next/font/google"
import AnimatedButton from "./animated-button"
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
    <section className="relative pt-24 pb-10 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 80%", pointerEvents: "none" }}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center lg:text-left space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center px-5 py-2.5 bg-white/80 border border-red-200 rounded-full text-sm text-gray-900 font-medium backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              <span className="block text-gray-900 mb-1">{t.hero.title1}</span>
              <span className="block text-gray-900 mb-1">{t.hero.title2}</span>
              <span
                className={cn(
                  "block mb-1 bg-gradient-to-r from-red-600 via-gray-900 to-red-700 bg-clip-text text-transparent",
                  pacifico.className,
                )}
              >
                {t.hero.titleAccent}
              </span>
              <span className="block text-gray-700">{t.hero.title3}</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto lg:mx-0">
              {t.hero.descP1}
              <span className="text-red-600 font-semibold">{t.hero.descH1}</span>
              {t.hero.descP2}
              <span className="text-red-600 font-semibold">{t.hero.descH2}</span>
              {t.hero.descP3}
              <span className="text-red-600 font-semibold">{t.hero.descH3}</span>
              {t.hero.descP4}
            </p>
          </div>

          <div className="flex flex-col gap-5 items-center justify-center lg:justify-start lg:items-start">
            <Link href="/contact">
              <AnimatedButton variant="slim" className="bg-red-600 text-white hover:bg-red-700">
                <span className="flex items-center">
                  {t.hero.ctaStart}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
