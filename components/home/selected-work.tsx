"use client"

import { useLanguage } from "@/lib/i18n"
import { Container, SectionEyebrow, SectionHeading } from "@/components/kit/section"
import { TextLink } from "@/components/kit/buttons"
import { ProjectCard } from "@/components/work/project-card"
import { projects, featuredProject } from "@/lib/content/projects"

/**
 * Selected work — editorial layout, not a six-card grid.
 * Featured project runs full width; the rest sit in a staggered two-column set.
 */
export function SelectedWork() {
  const { t } = useLanguage()

  if (projects.length === 0) return null

  const rest = projects.filter((p) => p.slug !== featuredProject.slug)

  return (
    <section className="surface-dark py-section" id="work">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow>{t.work.eyebrow}</SectionEyebrow>
            <SectionHeading className="mt-6 text-ivory">{t.work.heading}</SectionHeading>
          </div>
          <TextLink href="/case-studies" onDark className="shrink-0">
            {t.work.viewAll}
          </TextLink>
        </div>

        <div className="mt-16 lg:mt-20">
          <ProjectCard project={featuredProject} variant="feature" priority />
        </div>

        {rest.length > 0 && (
          <div className="mt-20 grid gap-14 md:grid-cols-2 lg:mt-24 lg:gap-x-16 lg:gap-y-24">
            {rest.map((p, i) => (
              // Offset every second card so the grid reads editorial, not tabular
              <div key={p.slug} className={i % 2 === 1 ? "md:pt-16" : undefined}>
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
