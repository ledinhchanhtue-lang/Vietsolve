"use client"

import { useLanguage } from "@/lib/i18n"
import { Container, SectionEyebrow } from "@/components/kit/section"
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
        {/* Kept deliberately short — this is a rhythm break between two large
            sections, not a section in its own right. */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <SectionEyebrow tone="muted">{t.collaborations.eyebrow}</SectionEyebrow>
          <p className="text-sm text-white/40">{t.collaborations.note}</p>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-stage border border-white/[0.08] bg-white/[0.06] sm:grid-cols-4">
          {projects.map((p) => (
            <li key={p.slug} className="group bg-obsidian px-6 py-8 text-center">
              <span className="block font-display text-base font-medium text-white/45 transition-colors duration-ui group-hover:text-ivory lg:text-lg">
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
