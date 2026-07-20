"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n"
import { PageHero } from "@/components/kit/page-hero"
import { Container, Section } from "@/components/kit/section"
import { ProjectCard } from "@/components/work/project-card"
import { FinalCta } from "@/components/sections/final-cta"
import { projects, availableCategories, type ProjectCategory } from "@/lib/content/projects"
import { cn } from "@/lib/utils"

/**
 * Selected Work.
 *
 * Filters are generated from the projects that actually exist — an empty
 * category never gets a tab. The previous page shipped six categories over six
 * fabricated case studies with invented result metrics.
 */
export function WorkPage() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<ProjectCategory | "all">("all")

  const categories = availableCategories()
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter)

  const label: Record<ProjectCategory, string> = {
    "ai-systems": t.work.filterAiSystems,
    "digital-products": t.work.filterDigitalProducts,
    "brand-growth": t.work.filterBrandGrowth,
    media: t.work.filterMedia,
  }

  return (
    <>
      <PageHero
        eyebrow={t.work.eyebrow}
        heading={t.work.heading}
        description={t.work.subheading}
      />

      <Section surface="dark" className="pt-0">
        <Container>
          {/* Only show the filter bar when there's more than one category */}
          {categories.length > 1 && (
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label={t.work.eyebrow}
            >
              <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
                {t.work.filterAll}
              </FilterChip>
              {categories.map((c) => (
                <FilterChip key={c} active={filter === c} onClick={() => setFilter(c)}>
                  {label[c]}
                </FilterChip>
              ))}
            </div>
          )}

          {/* Section heading keeps the h1 → h2 → h3 order intact for the
              project cards below, which render their titles as h3. */}
          <h2 className="sr-only">{t.work.eyebrow}</h2>

          <div className="mt-14 grid gap-14 md:grid-cols-2 lg:gap-x-16 lg:gap-y-24">
            {visible.map((p, i) => (
              <div key={p.slug} className={i % 2 === 1 ? "md:pt-16" : undefined}>
                <ProjectCard project={p} priority={i === 0} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "min-h-[44px] rounded-full border px-5 text-sm transition-colors duration-hover",
        active
          ? "border-vs-red bg-vs-red text-white"
          : "border-white/12 text-ivory/65 hover:border-white/25 hover:text-ivory",
      )}
    >
      {children}
    </button>
  )
}
