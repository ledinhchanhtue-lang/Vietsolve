"use client"

import { useLanguage } from "@/lib/i18n"
import { PageHero } from "@/components/kit/page-hero"
import { Container, Section, SectionEyebrow, SectionHeading } from "@/components/kit/section"
import { LacConstellation } from "@/components/visuals/lac-constellation"
import { OperatingSystem } from "@/components/home/operating-system"
import { FinalCta } from "@/components/sections/final-cta"
import { projects } from "@/lib/content/projects"

/**
 * About.
 *
 * No team grid: there is no verified team data in the repository, and the spec
 * forbids placeholder people. Add real profiles to site-config and a Leadership
 * section can be introduced here.
 *
 * No founding year or years-in-operation claims — neither is verified.
 */
export function AboutPage() {
  const { t, lang } = useLanguage()

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
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <SectionEyebrow>{t.aboutPage.storyEyebrow}</SectionEyebrow>
              <SectionHeading className="mt-6 text-ivory">
                {t.aboutPage.storyHeading}
              </SectionHeading>
            </div>
            <p className="text-body-lg leading-relaxed text-vs-steel text-pretty lg:pt-4">
              {t.aboutPage.storyBody}
            </p>
          </div>
        </Container>
      </Section>

      {/* ---- The Lạc bird ---- */}
      <Section surface="graphite">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionEyebrow>{t.aboutPage.lacEyebrow}</SectionEyebrow>
              <SectionHeading className="mt-6 text-ivory">{t.aboutPage.lacHeading}</SectionHeading>
              <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-vs-steel text-pretty">
                {t.aboutPage.lacBody}
              </p>
            </div>
            <div className="rounded-stage border border-white/[0.08] bg-obsidian/50 p-8 lg:p-12">
              <LacConstellation tone="light" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Values ---- */}
      <Section surface="ivory">
        <Container>
          <div className="max-w-3xl">
            <SectionEyebrow>{t.aboutPage.valuesEyebrow}</SectionEyebrow>
            <SectionHeading className="mt-6 text-obsidian">
              {t.aboutPage.valuesHeading}
            </SectionHeading>
          </div>

          <dl className="mt-16 grid gap-x-14 gap-y-12 md:grid-cols-3">
            {values.map((v, i) => (
              <div key={v.title} className="border-t border-black/[0.10] pt-7">
                <span className="font-mono text-xs tracking-[0.14em] text-vs-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt className="mt-4">
                  <span className="block font-display text-2xl font-medium text-obsidian">
                    {v.title}
                  </span>
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-black/35">
                    {v.en}
                  </span>
                </dt>
                <dd className="mt-4 text-[15px] leading-relaxed text-vs-muted text-pretty">
                  {v.body}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ---- How we work (shared OS component) ---- */}
      <OperatingSystem />

      {/* ---- Collaborations ---- */}
      {projects.length > 0 && (
        <Section surface="graphite" className="py-section-sm">
          <Container>
            <SectionEyebrow tone="muted">{t.collaborations.eyebrow}</SectionEyebrow>
            <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-stage border border-white/[0.08] bg-white/[0.06] sm:grid-cols-4">
              {projects.map((p) => (
                <li key={p.slug} className="bg-graphite px-6 py-10 text-center">
                  <span className="block font-display text-lg font-medium text-white/50">
                    {p.name}
                  </span>
                  <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-white/25">
                    {p.industry[lang]}
                  </span>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <FinalCta />
    </>
  )
}
