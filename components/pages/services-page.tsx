"use client"

import { useLanguage } from "@/lib/i18n"
import { PageHero } from "@/components/kit/page-hero"
import { Container, Section, SectionEyebrow, SectionHeading } from "@/components/kit/section"
import { TextLink } from "@/components/kit/buttons"
import { Capabilities } from "@/components/sections/capabilities"
import { FinalCta } from "@/components/sections/final-cta"
import { capabilities, engagementModels } from "@/lib/content/capabilities"

export function ServicesPage() {
  const { t, lang } = useLanguage()

  return (
    <>
      <PageHero
        eyebrow={t.servicesPage.eyebrow}
        heading={t.servicesPage.heading}
        description={t.servicesPage.description}
      >
        {/* Capability index — jump links, so the page is navigable at a glance */}
        <nav className="mt-12" aria-label={t.servicesPage.overviewTitle}>
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

      <Capabilities showHeader={false} />

      {/* ---- Engagement models ---- */}
      <Section surface="ivory">
        <Container>
          <div className="max-w-3xl">
            <SectionEyebrow>{t.servicesPage.engagementEyebrow}</SectionEyebrow>
            <SectionHeading className="mt-6 text-obsidian">
              {t.servicesPage.engagementHeading}
            </SectionHeading>
            <p className="mt-6 text-body-lg leading-relaxed text-vs-muted text-pretty">
              {t.servicesPage.engagementNote}
            </p>
          </div>

          <div className="mt-16 grid gap-x-14 gap-y-12 md:grid-cols-2">
            {engagementModels.map((m) => (
              <div key={m.id} className="border-t border-black/[0.10] pt-7">
                <h3 className="font-display text-2xl font-medium text-obsidian">{m.name[lang]}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-vs-muted text-pretty">
                  {m.description[lang]}
                </p>

                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-black/40">
                  {t.servicesPage.fitFor}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {m.fitFor[lang].map((f) => (
                    <li
                      key={f}
                      className="rounded-full border border-black/12 px-3 py-1.5 text-[12px] text-obsidian/70"
                    >
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <TextLink href="/contact">{t.servicesPage.engagementCta}</TextLink>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  )
}
