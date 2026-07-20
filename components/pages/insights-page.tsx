"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n"
import { PageHero } from "@/components/kit/page-hero"
import { Container, Section } from "@/components/kit/section"
import { InsightCard } from "@/components/insights/insight-card"
import { PrimaryButton, SecondaryButton } from "@/components/kit/buttons"
import { FinalCta } from "@/components/sections/final-cta"
import { publishedInsights, type InsightCategory } from "@/lib/content/insights"
import { cn } from "@/lib/utils"

/**
 * Insights listing.
 *
 * With nothing published this renders a short, finished-looking page that routes
 * the visitor onward — not a "coming soon" holding page, and not the nine
 * fabricated articles (invented authors, invented dates, 404 links) that shipped
 * previously. The nav item and search indexing are both off until real content
 * exists, so almost nobody lands here.
 */
export function InsightsPage() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<InsightCategory | "all">("all")

  const categoryLabels: Record<InsightCategory, string> = {
    "ai-systems": t.insights.catAiSystems,
    growth: t.insights.catGrowth,
    "creative-technology": t.insights.catCreativeTechnology,
    "founders-view": t.insights.catFoundersView,
  }

  const present = Array.from(new Set(publishedInsights.map((i) => i.category)))
  const visible =
    filter === "all" ? publishedInsights : publishedInsights.filter((i) => i.category === filter)

  /* ---- Empty: a short, complete page with two ways onward ---- */
  if (publishedInsights.length === 0) {
    return (
      <>
        <PageHero eyebrow={t.insights.eyebrow} heading={t.insights.pageHeading}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrimaryButton href="/case-studies">{t.work.viewAll}</PrimaryButton>
            <SecondaryButton href="/contact" onDark>
              {t.nav.cta}
            </SecondaryButton>
          </div>
        </PageHero>
        <FinalCta />
      </>
    )
  }

  return (
    <>
      <PageHero eyebrow={t.insights.eyebrow} heading={t.insights.pageHeading} />

      <Section surface="dark" className="pt-0">
        <Container>
          {present.length > 1 && (
            <div className="flex flex-wrap gap-2" role="group" aria-label={t.insights.eyebrow}>
              <Chip active={filter === "all"} onClick={() => setFilter("all")}>
                {t.work.filterAll}
              </Chip>
              {present.map((c) => (
                <Chip key={c} active={filter === c} onClick={() => setFilter(c)}>
                  {categoryLabels[c]}
                </Chip>
              ))}
            </div>
          )}

          <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} />
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  )
}

function Chip({
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
