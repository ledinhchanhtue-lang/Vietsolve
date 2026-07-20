/**
 * Site navigation — single source of truth for header, footer and sitemap.
 *
 * Note: routes keep their original paths (/services, /case-studies, /blog) so
 * existing SEO equity and inbound links survive, while the UI labels reflect
 * the new positioning (Năng lực / Dự án / Góc nhìn).
 */

export type NavItem = {
  /** i18n key under `t.nav` */
  key: "capabilities" | "aiSystems" | "work" | "about" | "insights"
  href: string
}

export const mainNav: NavItem[] = [
  { key: "capabilities", href: "/services" },
  { key: "aiSystems", href: "/ai-systems" },
  { key: "work", href: "/case-studies" },
  { key: "about", href: "/about" },
  { key: "insights", href: "/blog" },
]

/** The single conversion destination. Reached via CTA only — not duplicated in the menu. */
export const primaryCta = { href: "/contact" }

export const legalNav = [
  { key: "privacy" as const, href: "/privacy" },
  { key: "terms" as const, href: "/terms" },
]
