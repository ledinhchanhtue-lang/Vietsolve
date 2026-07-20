"use client"

import { useLanguage } from "@/lib/i18n"
import { Container, SectionEyebrow } from "@/components/kit/section"
import { PrimaryButton, SecondaryButton } from "@/components/kit/buttons"
import { SystemCanvas } from "@/components/visuals/system-canvas"

/**
 * Hero.
 *
 * Text renders immediately in the static HTML — no opacity:0 entrance animation
 * gating the headline behind hydration (the previous hero was invisible until
 * JS loaded). The only motion is inside the system canvas, which self-terminates.
 */
export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="surface-dark relative flex items-center overflow-hidden pb-16 pt-28 lg:min-h-[90vh] lg:pb-20 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-60" aria-hidden="true" />
      {/* One restrained red bloom — the signal colour, not a full-section gradient */}
      <div
        className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full opacity-[0.14] blur-[120px]"
        style={{ background: "radial-gradient(circle, #E21B2D 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <Container className="relative w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---- Copy ---- */}
          <div>
            <SectionEyebrow>{t.hero.eyebrow}</SectionEyebrow>

            <h1 className="mt-6 font-display text-h1 font-semibold text-balance">
              <span className="block text-ivory">{t.hero.titleLine1}</span>
              <span className="block text-ivory">
                {t.hero.titleLine2}{" "}
                <em className="not-italic text-vs-red">{t.hero.titleAccent}</em>
                <span className="text-ivory">.</span>
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-body-lg leading-relaxed text-vs-steel text-pretty">
              {t.hero.subheadline}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryButton href="/contact">{t.hero.ctaPrimary}</PrimaryButton>
              <SecondaryButton href="/ai-systems" onDark>
                {t.hero.ctaSecondary}
              </SecondaryButton>
            </div>

            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
              {t.hero.trustLine}
            </p>
          </div>

          {/* ---- Live system ---- */}
          <div className="lg:pl-4">
            <SystemCanvas />
          </div>
        </div>
      </Container>
    </section>
  )
}
