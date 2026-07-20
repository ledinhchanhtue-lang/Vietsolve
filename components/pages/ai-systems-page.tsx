"use client"

import { ShieldCheck } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { PageHero } from "@/components/kit/page-hero"
import { Container, Section, SectionEyebrow, SectionHeading } from "@/components/kit/section"
import { CapabilityVisual } from "@/components/visuals/capability-visual"
import { AiWorkflow } from "@/components/home/ai-workflow"
import { AiReadiness } from "@/components/sections/ai-readiness"
import { FinalCta } from "@/components/sections/final-cta"
import { osSteps } from "@/lib/content/capabilities"
import { cn } from "@/lib/utils"

/**
 * /ai-systems — gives AI and automation its own page rather than burying it
 * inside the services list.
 *
 * Includes an explicit "human control" section: the spec requires we never
 * present AI as replacing people, and that permissions, approval steps, logging
 * and editability are stated plainly.
 */
export function AiSystemsPage() {
  const { t, lang } = useLanguage()

  const pillars = [
    { title: t.aiSystemsPage.s1Title, body: t.aiSystemsPage.s1Body, visual: "agent-flow" as const },
    { title: t.aiSystemsPage.s2Title, body: t.aiSystemsPage.s2Body, visual: "automation-chain" as const },
    { title: t.aiSystemsPage.s3Title, body: t.aiSystemsPage.s3Body, visual: "data-mesh" as const },
    { title: t.aiSystemsPage.s4Title, body: t.aiSystemsPage.s4Body, visual: "web-stack" as const },
  ]

  const useCases = [
    t.aiSystemsPage.useCase1,
    t.aiSystemsPage.useCase2,
    t.aiSystemsPage.useCase3,
    t.aiSystemsPage.useCase4,
    t.aiSystemsPage.useCase5,
    t.aiSystemsPage.useCase6,
  ]

  const controls = [
    t.aiSystemsPage.control1,
    t.aiSystemsPage.control2,
    t.aiSystemsPage.control3,
    t.aiSystemsPage.control4,
  ]

  return (
    <>
      <PageHero
        eyebrow={t.aiSystemsPage.eyebrow}
        heading={t.aiSystemsPage.heading}
        description={t.aiSystemsPage.description}
      />

      {/* ---- Four pillars ---- */}
      <Section surface="dark">
        <Container>
          <div className="space-y-24 lg:space-y-32">
            {pillars.map((p, i) => (
              <article
                key={p.title}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={cn(i % 2 === 1 && "lg:order-2")}>
                  <span className="font-mono text-xs tracking-[0.14em] text-vs-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <SectionHeading size="h3" className="mt-5 text-ivory">
                    {p.title}
                  </SectionHeading>
                  <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-vs-steel text-pretty lg:text-base">
                    {p.body}
                  </p>
                </div>
                <div className={cn(i % 2 === 1 && "lg:order-1")}>
                  <CapabilityVisual kind={p.visual} />
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Live demo (shared with the homepage) ---- */}
      <AiWorkflow />

      {/* ---- Use cases ---- */}
      <Section surface="dark">
        <Container>
          <SectionHeading className="max-w-3xl text-ivory">
            {t.aiSystemsPage.useCasesTitle}
          </SectionHeading>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-stage border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <li key={u} className="bg-obsidian p-7 lg:p-8">
                <span className="font-mono text-[11px] tracking-[0.14em] text-vs-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-[15px] leading-relaxed text-ivory/85 text-pretty">{u}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---- AI readiness self-assessment ---- */}
      <AiReadiness />

      {/* ---- Human control ---- */}
      <Section surface="ivory">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-vs-red/10">
                <ShieldCheck className="h-6 w-6 text-vs-red" aria-hidden="true" />
              </span>
              <SectionHeading className="mt-7 text-obsidian">
                {t.aiSystemsPage.controlTitle}
              </SectionHeading>
              <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-vs-muted text-pretty">
                {t.aiSystemsPage.controlBody}
              </p>
            </div>

            <ul className="space-y-6 lg:pt-4">
              {controls.map((c, i) => (
                <li key={c} className="flex gap-5 border-t border-black/[0.10] pt-6">
                  <span className="font-mono text-xs text-vs-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] leading-relaxed text-obsidian/80 text-pretty lg:text-base">
                    {c}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ---- Implementation process ---- */}
      <Section surface="graphite">
        <Container>
          <SectionEyebrow>{t.os.eyebrow}</SectionEyebrow>
          <SectionHeading className="mt-6 max-w-3xl text-ivory">
            {t.aiSystemsPage.processTitle}
          </SectionHeading>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-stage border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-5">
            {osSteps.map((s) => (
              <li key={s.index} className="bg-graphite p-6 lg:p-7">
                <span className="font-mono text-[11px] tracking-[0.14em] text-vs-red">
                  {s.index}
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-ivory">
                  {s.name[lang]}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-vs-steel text-pretty">
                  {s.description[lang]}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <FinalCta />
    </>
  )
}
