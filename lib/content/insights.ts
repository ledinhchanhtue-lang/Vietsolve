/**
 * Insights (articles).
 *
 * INTENTIONALLY EMPTY.
 *
 * The previous site shipped nine fabricated articles with invented Vietnamese
 * author names, invented publication dates, and a fabricated executive byline
 * ("Nguyễn Văn An — CEO VietSolve"). Every card also linked to /blog/{slug},
 * which had no route — nine guaranteed 404s.
 *
 * All of it is removed. Until real articles exist, the Insights section renders
 * an honest empty state instead of filler.
 *
 * TO PUBLISH AN ARTICLE:
 *  1. Add an entry below with a REAL author and a REAL date.
 *  2. Create the body content.
 *  3. Set `published: true`.
 *  The listing, the homepage teaser and the sitemap all pick it up automatically.
 */

import type { Bilingual } from "./capabilities"

export type InsightCategory = "ai-systems" | "growth" | "creative-technology" | "founders-view"

export type Insight = {
  slug: string
  title: Bilingual
  excerpt: Bilingual
  category: InsightCategory
  /** Real person. Never invent a byline. */
  author: string
  /** ISO date. Never backdate. */
  publishedAt: string
  readingMinutes: number
  image: string | null
  published: boolean
}

export const insights: Insight[] = []

export const publishedInsights = insights.filter((i) => i.published)

export const hasInsights = publishedInsights.length > 0
