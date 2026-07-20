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

        <div className="mt-12 lg:mt-16">
          <ProjectCard project={featuredProject} variant="feature" priority />
        </div>

        {/* One featured project plus three — the full set lives on /case-studies */}
        {rest.length > 0 && (
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-12">
            {rest.slice(0, 3).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
