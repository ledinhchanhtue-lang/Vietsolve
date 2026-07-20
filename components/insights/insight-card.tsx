"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n"
import type { Insight } from "@/lib/content/insights"

/** Article preview. Renders only real metadata — no invented byline or date. */
export function InsightCard({ insight }: { insight: Insight }) {
  const { t, lang } = useLanguage()

  const categoryLabel = {
    "ai-systems": t.insights.catAiSystems,
    growth: t.insights.catGrowth,
    "creative-technology": t.insights.catCreativeTechnology,
    "founders-view": t.insights.catFoundersView,
  }[insight.category]

  const date = new Date(insight.publishedAt).toLocaleDateString(
    lang === "vi" ? "vi-VN" : "en-GB",
    { day: "numeric", month: "short", year: "numeric" },
  )

  return (
    <article className="group">
      <Link href={`/blog/${insight.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-stage border border-white/[0.08] bg-obsidian">
          {insight.image ? (
            <Image
              src={insight.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-reveal ease-smooth group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 grid-backdrop opacity-70" aria-hidden="true" />
          )}
        </div>

        <div className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em]">
          <span className="text-vs-red">{categoryLabel}</span>
          <span className="text-white/25" aria-hidden="true">·</span>
          <time dateTime={insight.publishedAt} className="text-white/40">
            {date}
          </time>
        </div>

        <h3 className="mt-3 font-display text-xl font-medium leading-snug text-ivory transition-colors duration-hover group-hover:text-vs-coral">
          {insight.title[lang]}
        </h3>

        <p className="mt-3 text-[15px] leading-relaxed text-vs-steel text-pretty">
          {insight.excerpt[lang]}
        </p>

        <p className="mt-4 font-mono text-[11px] text-white/35">
          {insight.author} · {insight.readingMinutes} {t.insights.readingTime}
        </p>
      </Link>
    </article>
  )
}
