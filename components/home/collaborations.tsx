"use client"

import { useLanguage } from "@/lib/i18n"
import { Container, SectionEyebrow, SectionHeading } from "@/components/kit/section"
import { projects } from "@/lib/content/projects"

/**
 * Selected collaborations.
 *
 * Renders the names of projects VietSolve actually delivered — no invented
 * client logos, no unverified partner badges. When logo assets exist, drop them
 * into /public/images/clients/ and swap the wordmark for <Image>.
 */
export function Collaborations() {
  const { t, lang } = useLanguage()

  if (projects.length === 0) return null

  return (
    <section className="surface-dark border-t border-white/[0.06] py-section-sm">
      <Container>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionEyebrow tone="muted">{t.collaborations.eyebrow}</SectionEyebrow>
            <SectionHeading size="h3" className="mt-4 max-w-xl text-ivory">
              {t.collaborations.heading}
            </SectionHeading>
          </div>
          <p className="text-sm text-white/40 lg:text-right">{t.collaborations.note}</p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-stage border border-white/[0.08] bg-white/[0.06] sm:grid-cols-4">
          {projects.map((p) => (
            <li key={p.slug} className="group bg-obsidian px-6 py-10 text-center">
              <span className="block font-display text-lg font-medium text-white/45 transition-colors duration-ui group-hover:text-ivory">
                {p.name}
              </span>
              <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-white/25">
                {p.industry[lang]}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
