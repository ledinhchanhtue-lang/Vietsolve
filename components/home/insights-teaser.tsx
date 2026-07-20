"use client"

import { useLanguage } from "@/lib/i18n"
import { Container, SectionEyebrow, SectionHeading } from "@/components/kit/section"
import { TextLink } from "@/components/kit/buttons"
import { InsightCard } from "@/components/insights/insight-card"
import { publishedInsights } from "@/lib/content/insights"

/**
 * Insights teaser — at most three real articles.
 *
 * With no published articles, this renders an honest empty state rather than
 * the nine fabricated posts (invented authors, invented dates, 404 links) that
 * shipped previously.
 */
export function InsightsTeaser() {
  const { t } = useLanguage()
  const latest = publishedInsights.slice(0, 3)

  return (
    <section className="surface-graphite py-section" id="insights">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow>{t.insights.eyebrow}</SectionEyebrow>
            <SectionHeading className="mt-6 text-ivory">{t.insights.heading}</SectionHeading>
          </div>
          {latest.length > 0 && (
            <TextLink href="/blog" onDark className="shrink-0">
              {t.insights.readMore}
            </TextLink>
          )}
        </div>

        {latest.length > 0 ? (
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {latest.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-stage border border-white/[0.08] bg-obsidian/50 p-10 lg:p-14">
            <p className="font-display text-xl font-medium text-ivory">{t.insights.empty}</p>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-vs-steel">
              {t.insights.emptyBody}
            </p>
            <div className="mt-7">
              <TextLink href="/contact" onDark>
                {t.insights.emptyCta}
              </TextLink>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
