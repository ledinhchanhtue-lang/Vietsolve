"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import AnimatedButton from "./animated-button"
import { useLanguage } from "@/lib/i18n"
import { hasInsights } from "@/lib/content/insights"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { lang, toggle, t } = useLanguage()
  const pathname = usePathname()

  /* Blog is hidden until there is a real article; the /blog route stays live. */
  const links = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/case-studies", label: t.nav.caseStudies },
    ...(hasInsights ? [{ href: "/blog", label: t.nav.blog }] : []),
    { href: "/contact", label: t.nav.contact },
  ]

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <>
      {/* Skip link — first focusable element on every page */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-red-600 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Chuyển tới nội dung chính
      </a>

    <header className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl">
      <nav
        className="relative bg-white/80 backdrop-blur-md border rounded-2xl shadow-lg overflow-hidden"
        style={{ borderColor: "rgba(220, 38, 38, 0.3)" }}
      >
        <div className="relative z-10 px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3" aria-label="VietSolve — trang chủ">
                <Image
                  src="/images/logo-vietsolve-official.png"
                  alt="VietSolve"
                  width={140}
                  height={50}
                  className="w-auto h-12"
                  priority
                />
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-6">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      // 44px tap target — the link text alone was only 20px tall
                      "inline-flex min-h-[44px] items-center text-sm font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 rounded",
                      isActive(link.href) ? "text-red-700" : "text-gray-900 hover:text-red-700",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <LanguageToggle lang={lang} toggle={toggle} />
              <Link href="/contact">
                <AnimatedButton size="sm" className="bg-red-700 text-white hover:bg-red-900 min-h-11">
                  {t.nav.contactNow}
                </AnimatedButton>
              </Link>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <LanguageToggle lang={lang} toggle={toggle} />
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
                aria-expanded={isMenuOpen}
                className="flex h-11 w-11 items-center justify-center rounded-full text-gray-900 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/90 backdrop-blur-md rounded-b-2xl">
            <div className="px-6 py-4 space-y-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    // Full-width 48px rows — the drawer has the space for them
                    "flex min-h-[48px] items-center font-medium",
                    isActive(link.href) ? "text-red-700" : "text-gray-900 hover:text-red-700",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-200">
                <Link href="/contact" className="block" onClick={() => setIsMenuOpen(false)}>
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
    </>
  )
}

function LanguageToggle({ lang, toggle }: { lang: "vi" | "en"; toggle: () => void }) {
  /* aria-pressed exposes which language is active — a single unlabelled
     button gave assistive tech no way to read the current state. */
  return (
    <div
      role="group"
      aria-label="Ngôn ngữ / Language"
      className="flex items-center rounded-full border border-red-200 overflow-hidden text-xs font-semibold"
    >
      {(["vi", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => {
            if (lang !== code) toggle()
          }}
          aria-pressed={lang === code}
          aria-label={code === "vi" ? "Tiếng Việt" : "English"}
          className={cn(
            "flex min-h-11 items-center px-3 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-inset",
            lang === code ? "bg-red-700 text-white" : "text-gray-600 hover:text-gray-900",
          )}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
