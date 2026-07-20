"use client"

import { useLanguage } from "@/lib/i18n"
import { PageHero } from "@/components/kit/page-hero"
import { Container, Section } from "@/components/kit/section"
import { ProjectCard } from "@/components/work/project-card"
import { FinalCta } from "@/components/sections/final-cta"
import { projects, featuredProject } from "@/lib/content/projects"

/**
 * Selected Work — real projects only.
 *
 * No filter bar: with four projects it would create groups of one or two, which
 * reads worse than no filter at all. Reintroduce it once the set grows.
 *
 * No lead-capture form at the bottom either — the shared Final CTA covers it.
 */
export function WorkPage() {
  const { t } = useLanguage()
  const rest = projects.filter((p) => p.slug !== featuredProject.slug)

  return (
    <>
      <PageHero
        eyebrow={t.work.eyebrow}
        heading={t.work.heading}
        description={t.work.subheading}
      />

      <Section surface="dark" className="pt-0">
        <Container>
          {/* Keeps the h1 → h2 → h3 order intact; cards render their titles as h3 */}
          <h2 className="sr-only">{t.work.eyebrow}</h2>

          <ProjectCard project={featuredProject} variant="feature" priority />

          {rest.length > 0 && (
            <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-14">
              {rest.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          )}
        </Container>
      </Section>

      <FinalCta />
    </>
  )
}
