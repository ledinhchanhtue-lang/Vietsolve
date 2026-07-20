"use client"

import { useLanguage } from "@/lib/i18n"
import { PageHero } from "@/components/kit/page-hero"
import { Container, Section, SectionEyebrow, SectionHeading } from "@/components/kit/section"
import { LacConstellation } from "@/components/visuals/lac-constellation"
import { FinalCta } from "@/components/sections/final-cta"

/**
 * About — five sections: hero, story, values, the Lạc bird, closing CTA.
 *
 * Deliberately omitted:
 *  - Team/leadership grid. There is no verified team data in the repository and
 *    placeholder people are not acceptable. Add real profiles to site-config and
 *    a Leadership section slots in between Lạc and the CTA.
 *  - Headline stats (100+ dự án, 50+ khách hàng, 98% hài lòng) — none verified.
 *  - Department-structure block and the repeated "hệ sinh thái toàn diện" copy.
 *  - The process timeline and client list, which already live on their own pages.
 */
export function AboutPage() {
  const { t } = useLanguage()

  const values = [
    { title: t.aboutPage.v1Title, en: t.aboutPage.v1En, body: t.aboutPage.v1Body },
    { title: t.aboutPage.v2Title, en: t.aboutPage.v2En, body: t.aboutPage.v2Body },
    { title: t.aboutPage.v3Title, en: t.aboutPage.v3En, body: t.aboutPage.v3Body },
  ]

  return (
    <>
      <PageHero
        eyebrow={t.aboutPage.eyebrow}
        heading={t.aboutPage.heading}
        description={t.aboutPage.description}
      />

      {/* ---- Story ---- */}
      <Section surface="dark">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <SectionEyebrow>{t.aboutPage.storyEyebrow}</SectionEyebrow>
              <SectionHeading className="mt-5 text-ivory">
                {t.aboutPage.storyHeading}
              </SectionHeading>
            </div>
            <p className="max-w-[65ch] text-body-lg leading-relaxed text-vs-steel text-pretty lg:pt-3">
              {t.aboutPage.storyBody}
            </p>
          </div>
        </Container>
      </Section>

      {/* ---- Values ---- */}
      <Section surface="ivory">
        <Container>
          <div className="max-w-3xl">
            <SectionEyebrow>{t.aboutPage.valuesEyebrow}</SectionEyebrow>
            <SectionHeading className="mt-5 text-obsidian">
              {t.aboutPage.valuesHeading}
            </SectionHeading>
          </div>

          <dl className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-3">
            {values.map((v, i) => (
              <div key={v.title} className="border-t border-black/[0.10] pt-6">
                <span className="font-mono text-xs tracking-[0.14em] text-vs-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt className="mt-3">
                  <span className="block font-display text-xl font-medium text-obsidian lg:text-2xl">
                    {v.title}
                  </span>
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-black/35">
                    {v.en}
                  </span>
                </dt>
                <dd className="mt-3 max-w-[55ch] text-[15px] leading-relaxed text-vs-muted text-pretty">
                  {v.body}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ---- The Lạc bird ---- */}
      <Section surface="graphite">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionEyebrow>{t.aboutPage.lacEyebrow}</SectionEyebrow>
              <SectionHeading className="mt-5 text-ivory">{t.aboutPage.lacHeading}</SectionHeading>
              <p className="mt-5 max-w-[60ch] text-body-lg leading-relaxed text-vs-steel text-pretty">
                {t.aboutPage.lacBody}
              </p>
            </div>
            <div className="rounded-stage border border-white/[0.08] bg-obsidian/50 p-8 lg:p-12">
              <LacConstellation tone="light" />
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  )
}
