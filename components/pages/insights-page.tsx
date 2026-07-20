"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n"
import { PageHero } from "@/components/kit/page-hero"
import { Container, Section } from "@/components/kit/section"
import { InsightCard } from "@/components/insights/insight-card"
import { TextLink } from "@/components/kit/buttons"
import { FinalCta } from "@/components/sections/final-cta"
import { publishedInsights, type InsightCategory } from "@/lib/content/insights"
import { cn } from "@/lib/utils"

/**
 * Insights listing.
 *
 * With no published articles this renders a single honest empty state — no
 * ghost cards, no invented authors, no "Đọc tiếp" links into 404s.
 * The newsletter form lives here and nowhere else on the site.
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

  // Only offer filters for categories that actually have articles
  const present = Array.from(new Set(publishedInsights.map((i) => i.category)))
  const visible =
    filter === "all" ? publishedInsights : publishedInsights.filter((i) => i.category === filter)

  return (
    <>
      <PageHero eyebrow={t.insights.eyebrow} heading={t.insights.pageHeading} />

      <Section surface="dark" className="pt-0">
        <Container>
          {publishedInsights.length === 0 ? (
            <div className="max-w-2xl rounded-stage border border-white/[0.08] bg-graphite p-10 lg:p-14">
              <p className="font-display text-2xl font-medium text-ivory">{t.insights.empty}</p>
              <p className="mt-4 text-body-lg leading-relaxed text-vs-steel text-pretty">
                {t.insights.emptyBody}
              </p>
              <div className="mt-8">
                <TextLink href="/contact" onDark>
                  {t.insights.emptyCta}
                </TextLink>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
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
