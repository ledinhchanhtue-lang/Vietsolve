"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n"
import { mainNav, legalNav, primaryCta } from "@/lib/content/navigation"
import { capabilities } from "@/lib/content/capabilities"
import { siteConfig, readVerified } from "@/lib/site-config"
import { LacMark } from "@/components/visuals/lac-constellation"
import { TextLink } from "@/components/kit/buttons"

/**
 * Site footer.
 *
 * No newsletter here — that lives on the Insights page only, where it has a
 * reason to exist. Contact details and social links render ONLY when marked
 * verified in site-config; the previous footer shipped a US placeholder phone
 * number and four social icons pointing at href="#".
 */
export function SiteFooter() {
  const { t, lang } = useLanguage()

  const email = readVerified(siteConfig.contact.email)
  const phone = readVerified(siteConfig.contact.phone)

  const socials: Array<{ label: string; href: string }> = [
    { label: "LinkedIn", href: readVerified(siteConfig.social.linkedin) },
    { label: "Facebook", href: readVerified(siteConfig.social.facebook) },
    { label: "Instagram", href: readVerified(siteConfig.social.instagram) },
    { label: "YouTube", href: readVerified(siteConfig.social.youtube) },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href))

  const year = new Date().getFullYear()

  return (
    <footer className="surface-dark relative overflow-hidden border-t border-white/[0.08]">
      {/* Lạc mark bleeding off the right edge — identity, not decoration overload */}
      <div
        className="pointer-events-none absolute -right-16 bottom-0 w-[520px] opacity-[0.18] sm:-right-8 lg:right-8"
        aria-hidden="true"
      >
        <LacMark tone="light" />
      </div>

      <div className="relative mx-auto max-w-[1360px] px-5 py-section-sm sm:px-6 md:px-8 lg:px-12 xl:px-[72px]">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" aria-label="VietSolve — trang chủ">
              <Image
                src="/images/logo-vietsolve-official.png"
                alt="VietSolve"
                width={140}
                height={140}
                className="h-20 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-5 text-[15px] leading-relaxed text-vs-steel">{t.footer.tagline}</p>

            <div className="mt-6">
              <TextLink href={primaryCta.href} onDark>
                {t.footer.contactCta}
              </TextLink>
            </div>
          </div>

          {/* Capabilities */}
          <nav aria-labelledby="footer-capabilities">
            <h2
              id="footer-capabilities"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45"
            >
              {t.footer.capabilities}
            </h2>
            <ul className="mt-5 space-y-3">
              {capabilities.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/services#${c.id}`}
                    className="text-[15px] text-ivory/75 transition-colors duration-hover hover:text-ivory"
                  >
                    {c.name[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company">
            <h2
              id="footer-company"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45"
            >
              {t.footer.company}
            </h2>
            <ul className="mt-5 space-y-3">
              {mainNav.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-[15px] text-ivory/75 transition-colors duration-hover hover:text-ivory"
                  >
                    {t.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect — only verified channels */}
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
              {t.footer.connect}
            </h2>
            <ul className="mt-5 space-y-3">
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="text-[15px] text-ivory/75 transition-colors duration-hover hover:text-ivory"
                  >
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className="text-[15px] text-ivory/75 transition-colors duration-hover hover:text-ivory"
                  >
                    {phone}
                  </a>
                </li>
              )}
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-ivory/75 transition-colors duration-hover hover:text-ivory"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-white/40">
            © {year} {siteConfig.name}. {t.footer.copyright}
          </p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="font-mono text-xs text-white/40 transition-colors duration-hover hover:text-ivory"
                >
                  {t.footer[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
