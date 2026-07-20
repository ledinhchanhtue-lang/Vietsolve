"use client"

import { ArrowRight } from "lucide-react"
import { Pacifico } from "next/font/google"
import AnimatedButton from "./animated-button"
import CountingStats from "./counting-stats"
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

  const stats = [
    { value: 500, suffix: "+", label: t.hero.stat1 },
    { value: 98, suffix: "%", label: t.hero.stat2 },
    { value: 15, suffix: "M+", label: t.hero.stat3 },
  ]

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
          preload="auto"
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
            <Link href="/get-started">
              <AnimatedButton variant="slim" className="bg-red-600 text-white hover:bg-red-700">
                <span className="flex items-center">
                  {t.hero.ctaStart}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </AnimatedButton>
            </Link>

            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md border border-gray-200">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.hero.googlePartner}</p>
                  <p className="text-xs text-gray-600">{t.hero.googlePartnerSub}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L3.09 8.26l1.42 1.42L12 4.16l7.49 5.52 1.42-1.42L12 2z" />
                    <path d="M12 6L6.5 10.5v7h3v-5h5v5h3v-7L12 6z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.hero.bbb}</p>
                  <p className="text-xs text-gray-600">{t.hero.bbbSub}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.hero.verified}</p>
                  <p className="text-xs text-gray-600">{t.hero.verifiedSub}</p>
                </div>
              </div>
            </div>

            <CountingStats stats={stats} />
          </div>
        </div>
      </div>
    </section>
  )
}
