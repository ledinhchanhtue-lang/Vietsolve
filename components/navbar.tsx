"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import AnimatedButton from "./animated-button"
import { useLanguage } from "@/lib/i18n"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { lang, toggle, t } = useLanguage()

  return (
    <header className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl">
      <nav
        className="relative bg-white/80 backdrop-blur-md border rounded-2xl shadow-lg overflow-hidden"
        style={{ borderColor: "rgba(220, 38, 38, 0.3)" }}
      >
        <div className="relative z-10 px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/images/logo-vietsolve-official.png"
                  alt="VietSolve"
                  width={140}
                  height={50}
                  className="w-auto h-12"
                />
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-6">
                <Link href="/" className="text-sm text-gray-900 hover:text-red-700 transition-colors font-medium">
                  {t.nav.home}
                </Link>
                <Link href="/about" className="text-sm text-gray-900 hover:text-red-700 transition-colors font-medium">
                  {t.nav.about}
                </Link>
                <Link
                  href="/services"
                  className="text-sm text-gray-900 hover:text-red-700 transition-colors font-medium"
                >
                  {t.nav.services}
                </Link>
                <Link
                  href="/case-studies"
                  className="text-sm text-gray-900 hover:text-red-700 transition-colors font-medium"
                >
                  {t.nav.caseStudies}
                </Link>
                <Link href="/blog" className="text-sm text-gray-900 hover:text-red-700 transition-colors font-medium">
                  {t.nav.blog}
                </Link>
                <Link
                  href="/contact"
                  className="text-sm text-gray-900 hover:text-red-700 transition-colors font-medium"
                >
                  {t.nav.contact}
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <LanguageToggle lang={lang} toggle={toggle} />
              <Link href="/contact">
                <AnimatedButton size="sm" className="bg-red-700 text-white hover:bg-red-900">
                  {t.nav.contactNow}
                </AnimatedButton>
              </Link>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <LanguageToggle lang={lang} toggle={toggle} />
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5 text-gray-900" /> : <Menu className="h-5 w-5 text-gray-900" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/90 backdrop-blur-md rounded-b-2xl">
            <div className="px-6 py-4 space-y-3">
              <Link href="/" className="block text-gray-900 hover:text-red-700 font-medium">
                {t.nav.home}
              </Link>
              <Link href="/about" className="block text-gray-900 hover:text-red-700 font-medium">
                {t.nav.about}
              </Link>
              <Link href="/services" className="block text-gray-900 hover:text-red-700 font-medium">
                {t.nav.services}
              </Link>
              <Link href="/case-studies" className="block text-gray-900 hover:text-red-700 font-medium">
                {t.nav.caseStudies}
              </Link>
              <Link href="/blog" className="block text-gray-900 hover:text-red-700 font-medium">
                {t.nav.blog}
              </Link>
              <Link href="/contact" className="block text-gray-900 hover:text-red-700 font-medium">
                {t.nav.contact}
              </Link>
              <div className="pt-3 border-t border-gray-200">
                <Link href="/contact" className="block">
                  <AnimatedButton className="w-full bg-red-700 text-white hover:bg-red-900">
                    {t.nav.contactNow}
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

function LanguageToggle({ lang, toggle }: { lang: "vi" | "en"; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className="flex items-center rounded-full border border-red-200 overflow-hidden text-xs font-semibold"
    >
      <span className={`px-2.5 py-1 transition-colors ${lang === "vi" ? "bg-red-700 text-white" : "text-gray-600"}`}>
        VI
      </span>
      <span className={`px-2.5 py-1 transition-colors ${lang === "en" ? "bg-red-700 text-white" : "text-gray-600"}`}>
        EN
      </span>
    </button>
  )
}
