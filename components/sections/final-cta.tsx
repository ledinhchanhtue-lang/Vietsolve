"use client"

import { useLanguage } from "@/lib/i18n"
import { Container, SectionEyebrow, SectionHeading } from "@/components/kit/section"
import { PrimaryButton, SecondaryButton } from "@/components/kit/buttons"
import { LacConstellation } from "@/components/visuals/lac-constellation"

/**
 * The single closing CTA. Used at the end of every page.
 *
 * One CTA before the footer — the previous site stacked repeated conversion
 * bands (newsletter + lead form + red gradient CTA) on most pages.
 */
export function FinalCta() {
  const { t } = useLanguage()

  return (
    <section className="surface-dark relative overflow-hidden border-t border-white/[0.06] py-section">
      {/* Lạc constellation with a red path leading toward the CTA */}
      <div
        className="pointer-events-none absolute -right-24 top-1/2 w-[680px] -translate-y-1/2 opacity-40 lg:right-0"
        aria-hidden="true"
      >
        <LacConstellation tone="light" />
      </div>

      <Container className="relative">
        <div className="max-w-2xl">
          <SectionEyebrow>{t.finalCta.eyebrow}</SectionEyebrow>
          <SectionHeading className="mt-6 text-ivory">{t.finalCta.heading}</SectionHeading>
          <p className="mt-6 text-body-lg leading-relaxed text-vs-steel text-pretty">
            {t.finalCta.body}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrimaryButton href="/contact">{t.finalCta.primary}</PrimaryButton>
            <SecondaryButton href="/contact#brief" onDark>
              {t.finalCta.secondary}
            </SecondaryButton>
          </div>
        </div>
      </Container>
    </section>
  )
}
