"use client"

import { useLanguage } from "@/lib/i18n"
import { Container, SectionEyebrow, SectionHeading } from "@/components/kit/section"

/**
 * Why VietSolve — four statements on warm ivory.
 *
 * Placed here deliberately: after a long run of dark sections, the light
 * surface resets the eye before the final CTA. No heavy card borders.
 */
export function WhyVietSolve() {
  const { t } = useLanguage()

  const points = [
    { n: "01", title: t.why.p1Title, body: t.why.p1Body },
    { n: "02", title: t.why.p2Title, body: t.why.p2Body },
    { n: "03", title: t.why.p3Title, body: t.why.p3Body },
    { n: "04", title: t.why.p4Title, body: t.why.p4Body },
  ]

  return (
    <section className="surface-ivory py-section">
      <Container>
        <div className="max-w-3xl">
          <SectionEyebrow>{t.why.eyebrow}</SectionEyebrow>
          <SectionHeading className="mt-6 text-obsidian">{t.why.heading}</SectionHeading>
        </div>

        <dl className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2 lg:mt-20 lg:gap-y-16">
          {points.map((p) => (
            <div key={p.n} className="border-t border-black/[0.10] pt-7">
              <span className="font-mono text-xs tracking-[0.14em] text-vs-red">{p.n}</span>
              <dt className="mt-4 font-display text-2xl font-medium text-obsidian">{p.title}</dt>
              <dd className="mt-3 max-w-md text-[15px] leading-relaxed text-vs-muted text-pretty lg:text-base">
                {p.body}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
