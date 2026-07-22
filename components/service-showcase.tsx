"use client"

import { useEffect, useState } from "react"
import {
  Compass,
  TrendingUp,
  Clapperboard,
  AppWindow,
  Workflow,
  BarChart3,
  type LucideIcon,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { serviceGroups } from "@/lib/content/services"
import { projects } from "@/lib/content/projects"
import { ProjectVisual } from "@/components/project-visual"
import { IconTile } from "@/components/ui-kit/icon-tile"
import Link from "next/link"
import { TextLink } from "@/components/ui-kit/button"
import { ServiceVisual } from "@/components/service-visual"
import { cn } from "@/lib/utils"

/**
 * Interactive service showcase — desktop only (lg+).
 *
 * Left: the six groups as a selectable rail. Right: a stage that swaps to the
 * chosen group's composition, service list and CTA. Below lg the page keeps its
 * stacked cards, which already behave like an open accordion — a hover-driven
 * stage has no good touch equivalent.
 *
 * Proper tabs semantics (tablist / tab / tabpanel with arrow-key movement), so
 * the rail is one tab stop, not six.
 *
 * Deep links still work: /services#ai-automation selects that tab on mount.
 * (The mobile cards carry the same ids, so native anchor scrolling covers
 * small screens.)
 */

/* Which real project exercised this group, keyed by the project's own
   `capability` field — an honest association, not a marketing pairing.
   Groups with no matching project simply show no related-work block. */
const GROUP_CAPABILITY: Record<string, string> = {
  "branding-strategy": "brand-growth",
  "marketing-growth": "brand-growth",
  "media-creative": "media-creative",
  "website-digital": "digital-products",
  "ai-automation": "ai-agents",
  "data-seo-analytics": "digital-products",
}

const ICONS: Record<string, LucideIcon> = {
  Compass,
  TrendingUp,
  Clapperboard,
  AppWindow,
  Workflow,
  BarChart3,
}

export function ServiceShowcase() {
  const { lang } = useLanguage()
  const [activeId, setActiveId] = useState(serviceGroups[0].id)
  const active = serviceGroups.find((g) => g.id === activeId) ?? serviceGroups[0]
  const ActiveIcon = ICONS[active.icon] ?? Compass

  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash && serviceGroups.some((g) => g.id === hash)) setActiveId(hash)
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = serviceGroups.findIndex((g) => g.id === activeId)
    let next = -1
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (idx + 1) % serviceGroups.length
    if (e.key === "ArrowUp" || e.key === "ArrowLeft")
      next = (idx - 1 + serviceGroups.length) % serviceGroups.length
    if (next === -1) return
    e.preventDefault()
    setActiveId(serviceGroups[next].id)
    document.getElementById(`svc-tab-${serviceGroups[next].id}`)?.focus()
  }

  const related = projects.find((pr) => pr.capability === GROUP_CAPABILITY[active.id])

  return (
    <div className="hidden gap-6 lg:grid lg:grid-cols-[minmax(0,280px)_1fr_minmax(0,250px)] xl:gap-8">
      {/* Rail */}
      <div role="tablist" aria-orientation="vertical" onKeyDown={onKeyDown} className="space-y-2">
        {serviceGroups.map((group) => {
          const Icon = ICONS[group.icon] ?? Compass
          const selected = group.id === activeId
          return (
            <button
              key={group.id}
              id={`svc-tab-${group.id}`}
              role="tab"
              aria-selected={selected}
              aria-controls="svc-stage"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(group.id)}
              className={cn(
                "group flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
                selected
                  ? "border-red-600 bg-red-50/70 shadow-[inset_0_0_0_1px_rgba(220,38,38,0.2),0_0_16px_-6px_rgba(220,38,38,0.5)]"
                  : "border-gray-200 bg-white hover:border-red-200 hover:bg-red-50/30",
              )}
            >
              <Icon
                strokeWidth={1.5}
                aria-hidden="true"
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  selected ? "text-red-600" : "text-gray-400 group-hover:text-gray-700",
                )}
              />
              <span className={cn("font-semibold", selected ? "text-red-700" : "text-gray-900")}>
                {group.name[lang]}
              </span>
              {/* Active rail marker */}
              <span
                aria-hidden="true"
                className={cn(
                  "ml-auto h-6 w-0.5 rounded-full transition-all duration-200",
                  selected ? "bg-red-600" : "bg-transparent",
                )}
              />
            </button>
          )
        })}
      </div>

      {/* Stage — key remounts on switch so the reveal replays */}
      <div
        id="svc-stage"
        role="tabpanel"
        aria-labelledby={`svc-tab-${active.id}`}
        className="relative isolate overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"
        />
        <div key={active.id} className="animate-fade-in">
          <div className="flex items-center gap-4">
            <IconTile icon={ActiveIcon} size="md" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{active.name[lang]}</h3>
              <p className="mt-1 text-gray-600">{active.tagline[lang]}</p>
            </div>
          </div>

          <ServiceVisual id={active.id} className="mt-6 aspect-[278/140]" />
          <p className="mt-3 text-right text-[10px] font-medium uppercase tracking-wider text-gray-300">
            Interface demo
          </p>
        </div>
      </div>

      {/* Right column — deliverables, related real work, CTA */}
      <div key={`side-${active.id}`} className="animate-fade-in space-y-6">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Deliverables</h4>
          <ul className="mt-3 space-y-2">
            {active.services[lang].map((s) => (
              <li key={s} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-600"
                />
                <span className="text-sm text-gray-700">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {related && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Dự án liên quan
            </h4>
            <Link
              href="/case-studies"
              className="group mt-3 block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
              <ProjectVisual project={related} sizes="250px" />
              <span className="mt-2 block text-sm font-bold text-gray-900 transition-colors group-hover:text-red-600">
                {related.name}
              </span>
              <span className="block text-xs text-gray-500">{related.industry[lang]}</span>
            </Link>
          </div>
        )}

        <div className="border-t border-gray-200 pt-5">
          <TextLink
            href={`/contact?service=${active.id}`}
            ariaLabel={`Trao đổi về ${active.name[lang]}`}
          >
            Trao đổi về nhóm này
          </TextLink>
        </div>
      </div>
    </div>
  )
}
