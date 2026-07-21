"use client"

import Link from "next/link"
import { LedLogo } from "@/components/tech/led-logo"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { PrimaryButton } from "@/components/ui-kit/button"
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
                <LedLogo
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
              {/* Last two AnimatedButton call sites, replaced so the header CTA
                  shares the light-sweep and glow of every other primary. */}
              <PrimaryButton href="/contact" withArrow={false} className="min-h-11 px-5 text-sm">
                {t.nav.contactNow}
              </PrimaryButton>
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
                <PrimaryButton
                  href="/contact"
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.nav.contactNow}
                </PrimaryButton>
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
  /* Segmented switch. The previous version was two hard-edged cells whose
     active half flipped to a solid red block — it read as a dev utility, not a
     designed control. Now one capsule with a sliding red thumb: both cells are
     fixed-width so the thumb travels exactly one slot, the transition is
     transform-only (compositor-friendly) and is removed under reduced motion.
     aria-pressed still exposes the active language to assistive tech. */
  return (
    <div
      role="group"
      aria-label="Ngôn ngữ / Language"
      className="relative flex items-center rounded-full border border-gray-200 bg-white/85 p-0.5 text-xs font-semibold shadow-sm backdrop-blur-sm"
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-0.5 left-0.5 top-0.5 w-10 rounded-full bg-red-600",
          "shadow-[0_1px_5px_rgba(220,38,38,0.45),inset_0_1px_0_rgba(255,255,255,0.25)]",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          lang === "vi" ? "translate-x-0" : "translate-x-full",
        )}
      />
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
            "relative z-10 flex min-h-11 w-10 items-center justify-center rounded-full transition-colors duration-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-inset",
            lang === code ? "text-white" : "text-gray-500 hover:text-gray-900",
          )}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
