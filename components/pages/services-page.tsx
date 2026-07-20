"use client"

import { useLanguage } from "@/lib/i18n"
import { PageHero } from "@/components/kit/page-hero"
import { Container, Section, SectionEyebrow, SectionHeading } from "@/components/kit/section"
import { TextLink } from "@/components/kit/buttons"
import { Capabilities } from "@/components/sections/capabilities"
import { OperatingSystem } from "@/components/home/operating-system"
import { ProjectCard } from "@/components/work/project-card"
import { FinalCta } from "@/components/sections/final-cta"
import { capabilities, engagementModels } from "@/lib/content/capabilities"
import { featuredProject } from "@/lib/content/projects"

/**
 * /services — the full capability detail.
 *
 * The homepage shows a condensed 2×2 of the same four pillars; this page is
 * where the complete service lists live. Both read from
 * lib/content/capabilities.ts, so they can't diverge.
 *
 * Replaces the legacy "Intelligent / Creative / Innovation Solutions" trio and
 * the Start / Grow / Scale package table. No pricing is shown — there is no
 * verified price list.
 */
export function ServicesPage() {
  const { t, lang } = useLanguage()

  return (
    <>
      <PageHero
        eyebrow={t.servicesPage.eyebrow}
        heading={t.servicesPage.heading}
        description={t.servicesPage.description}
      >
        <nav className="mt-10" aria-label={t.servicesPage.overviewTitle}>
          <ul className="grid gap-px overflow-hidden rounded-stage border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="group flex h-full flex-col gap-3 bg-obsidian p-6 transition-colors duration-hover hover:bg-graphite"
                >
                  <span className="font-mono text-xs tracking-[0.14em] text-vs-red">{c.index}</span>
                  <span className="font-display text-[17px] font-medium leading-snug text-ivory">
                    {c.name[lang]}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {/* Full capability stages */}
      <Capabilities variant="full" showHeader={false} />

      {/* Engagement models */}
      <Section surface="ivory">
        <Container>
          <div className="max-w-3xl">
            <SectionEyebrow>{t.servicesPage.engagementEyebrow}</SectionEyebrow>
            <SectionHeading className="mt-5 text-obsidian">
              {t.servicesPage.engagementHeading}
            </SectionHeading>
            <p className="mt-5 max-w-[65ch] text-body-lg leading-relaxed text-vs-muted text-pretty">
              {t.servicesPage.engagementNote}
            </p>
          </div>

          <div className="mt-14 grid gap-x-14 gap-y-11 md:grid-cols-2">
            {engagementModels.map((m) => (
              <div key={m.id} className="border-t border-black/[0.10] pt-6">
                <h3 className="font-display text-xl font-medium text-obsidian lg:text-2xl">
                  {m.name[lang]}
                </h3>

                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-black/40">
                  {t.servicesPage.bestFor}
                </p>
                <p className="mt-2 max-w-[55ch] text-[15px] leading-relaxed text-vs-muted text-pretty">
                  {m.bestFor[lang]}
                </p>

                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-black/40">
                  {t.servicesPage.typicalScope}
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-2">
                  {m.scope[lang].map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-black/12 px-3 py-1.5 text-[12px] text-obsidian/70"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  <TextLink href="/contact">{t.servicesPage.engagementCta}</TextLink>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process — the same timeline component the homepage uses */}
      <OperatingSystem
        eyebrow={t.servicesPage.processEyebrow}
        heading={t.servicesPage.processHeading}
      />

      {/* One selected project */}
      <Section surface="graphite">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionEyebrow>{t.servicesPage.projectEyebrow}</SectionEyebrow>
            <TextLink href="/case-studies" onDark className="shrink-0">
              {t.work.viewAll}
            </TextLink>
          </div>
          <div className="mt-10">
            <ProjectCard project={featuredProject} variant="feature" />
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  )
}
