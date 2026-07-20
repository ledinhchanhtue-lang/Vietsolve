/**
 * Site navigation — single source of truth for header, footer and sitemap.
 *
 * Routes keep their original paths (/services, /case-studies, /blog) so existing
 * SEO equity and inbound links survive, while the UI labels reflect the current
 * positioning (Năng lực / Dự án / Góc nhìn).
 */

import { hasInsights } from "./insights"

export type NavItem = {
  /** i18n key under `t.nav` */
  key: "capabilities" | "aiSystems" | "work" | "about" | "insights"
  href: string
}

const allNav: NavItem[] = [
  { key: "capabilities", href: "/services" },
  { key: "aiSystems", href: "/ai-systems" },
  { key: "work", href: "/case-studies" },
  { key: "about", href: "/about" },
  { key: "insights", href: "/blog" },
]

/**
 * "Góc nhìn" stays hidden until there is real content behind it — a nav item
 * that leads to an empty state is worse than no nav item. It reappears
 * automatically once an article is published in lib/content/insights.ts.
 */
export const mainNav: NavItem[] = allNav.filter(
  (item) => item.key !== "insights" || hasInsights,
)

/** The single conversion destination. Reached via CTA only — not duplicated in the menu. */
export const primaryCta = { href: "/contact" }

export const legalNav = [
  { key: "privacy" as const, href: "/privacy" },
  { key: "terms" as const, href: "/terms" },
]
