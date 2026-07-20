"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { mainNav, primaryCta } from "@/lib/content/navigation"
import { PrimaryButton } from "@/components/kit/buttons"
import { cn } from "@/lib/utils"

/**
 * Site header.
 *
 * - Transparent over the hero, obsidian + blur with a hairline once scrolled.
 * - 72–80px tall, one CTA, no duplicate "Contact" menu item.
 * - Mobile: full-screen panel with focus trap, Escape to close, and body
 *   scroll restored on unmount.
 */
export function SiteHeader() {
  const { t, lang, setLang } = useLanguage()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile panel on navigation
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock scroll + trap focus while the panel is open
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        triggerRef.current?.focus()
        return
      }
      if (e.key !== "Tab") return

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    // Move focus into the panel
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-vs-red focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        {t.nav.skipToContent}
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-ui ease-smooth",
          scrolled || open
            ? "border-b border-white/[0.08] bg-obsidian/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1360px] items-center justify-between px-5 sm:px-6 md:px-8 lg:h-20 lg:px-12 xl:px-[72px]">
          <Link href="/" className="flex shrink-0 items-center" aria-label="VietSolve — trang chủ">
            {/* Source PNG is square with generous internal padding, so it needs
                a larger box than a wordmark asset would to read clearly. */}
            <Image
              src="/images/logo-vietsolve-official.png"
              alt="VietSolve"
              width={120}
              height={120}
              priority
              className="h-14 w-auto brightness-0 invert lg:h-16"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Chính">
            {mainNav.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-[15px] transition-colors duration-hover",
                    active ? "text-vs-coral" : "text-ivory/75 hover:text-ivory",
                  )}
                >
                  {t.nav[item.key]}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher lang={lang} setLang={setLang} />

            <PrimaryButton
              href={primaryCta.href}
              withArrow={false}
              className="hidden px-5 py-2.5 text-sm lg:inline-flex"
            >
              {t.nav.cta}
            </PrimaryButton>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ivory transition-colors duration-hover hover:bg-white/5 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile panel */}
      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="fixed inset-0 z-40 flex flex-col bg-obsidian pt-[72px] lg:hidden"
        >
          <nav className="flex flex-col gap-1 px-5 pt-8 sm:px-6" aria-label="Chính (di động)">
            {mainNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="border-b border-white/[0.08] py-4 font-display text-2xl text-ivory transition-colors duration-hover hover:text-vs-coral"
              >
                {t.nav[item.key]}
              </Link>
            ))}
          </nav>

          <div className="mt-auto px-5 pb-10 sm:px-6">
            <PrimaryButton href={primaryCta.href} className="w-full">
              {t.nav.cta}
            </PrimaryButton>
          </div>
        </div>
      )}
    </>
  )
}

function LanguageSwitcher({
  lang,
  setLang,
}: {
  lang: "vi" | "en"
  setLang: (l: "vi" | "en") => void
}) {
  return (
    <div
      className="flex items-center rounded-full border border-white/12 p-0.5"
      role="group"
      aria-label="Language / Ngôn ngữ"
    >
      {(["vi", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={cn(
            // Padded to a comfortable tap target while the pill stays visually compact
            "flex min-h-[38px] min-w-[42px] items-center justify-center rounded-full px-2.5",
            "font-mono text-[11px] uppercase tracking-wider transition-colors duration-hover",
            lang === code ? "bg-vs-red text-white" : "text-ivory/55 hover:text-ivory",
          )}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
