"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Compass,
  TrendingUp,
  Clapperboard,
  AppWindow,
  Workflow,
  BarChart3,
  ChevronDown,
  type LucideIcon,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { serviceGroups } from "@/lib/content/services"
import { projects } from "@/lib/content/projects"
import { ProjectVisual } from "@/components/project-visual"
import { TextLink } from "@/components/ui-kit/button"
import { STAGE_BY_ID, STAGE_LABEL } from "@/components/services/stages"
import { cn } from "@/lib/utils"

/**
 * Interactive Service Studio.
 *
 * ONE tree is ever mounted at a time — a hydration-safe breakpoint decides
 * between the desktop studio and the mobile accordion, so the same content
 * never exists twice in the DOM / accessibility tree (an earlier version kept
 * both, hidden by CSS, which duplicated every heading).
 *
 * SSR and the first client paint render the accordion (all six group headings
 * present for no-JS / SEO, and it matches on both server and client so there's
 * no hydration mismatch). After mount, desktop switches to the studio.
 *
 * Desktop studio: click-driven tabs — nav (LED rail) / product stage / output —
 * all within one viewport, no scroll-jacking. Only the active stage mounts.
 * Mobile: an accordion, one group open at a time, only the open stage mounts.
 * Deep links (/services#<id>) select the group on both, live via hashchange.
 */

const ICONS: Record<string, LucideIcon> = {
  Compass,
  TrendingUp,
  Clapperboard,
  AppWindow,
  Workflow,
  BarChart3,
}

/* Real association: which delivered project exercised this group, through the
   project's own `capability` field. No match → no related block. */
const GROUP_CAPABILITY: Record<string, string> = {
  "branding-strategy": "brand-growth",
  "marketing-growth": "brand-growth",
  "media-creative": "media-creative",
  "website-digital": "digital-products",
  "ai-automation": "ai-agents",
  "data-seo-analytics": "digital-products",
}

const N = serviceGroups.length

/** Hydration-safe desktop check. null until mounted (renders accordion). */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return isDesktop
}

export function ServiceStudio() {
  const { lang } = useLanguage()
  const isDesktop = useIsDesktop()
  const [activeIdx, setActiveIdx] = useState(0)
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  /* Deep link + hash-only navigation (a footer/homepage anchor changes only the
     hash and never remounts this component). */
  useEffect(() => {
    const apply = () => {
      const hash = window.location.hash.replace("#", "")
      const idx = serviceGroups.findIndex((g) => g.id === hash)
      if (idx >= 0) {
        setActiveIdx(idx)
        setOpenIdx(idx)
        // Scroll the studio section into view (works on both layouts); the
        // mobile accordion item for this group sits at the top of it.
        const target = document.getElementById(`svc-${hash}`) ?? document.getElementById("service-studio")
        target?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
    apply()
    window.addEventListener("hashchange", apply)
    return () => window.removeEventListener("hashchange", apply)
  }, [])

  const active = serviceGroups[activeIdx]

  const onTabKey = (e: React.KeyboardEvent) => {
    let next = -1
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (activeIdx + 1) % N
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (activeIdx - 1 + N) % N
    if (next === -1) return
    e.preventDefault()
    setActiveIdx(next)
    document.getElementById(`studio-tab-${serviceGroups[next].id}`)?.focus()
  }

  /* -------- Output panel (per active service) -------- */
  const OutputPanel = ({ group }: { group: (typeof serviceGroups)[number] }) => {
    const rel = projects.find((p) => p.capability === GROUP_CAPABILITY[group.id])
    return (
      <div className="space-y-5">
        <p className="text-sm leading-relaxed text-gray-600">{group.tagline[lang]}</p>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Deliverables</h4>
          <ul className="mt-2.5 space-y-1.5">
            {group.services[lang].map((s) => (
              <li key={s} className="flex items-start gap-2.5">
                <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                <span className="text-sm text-gray-700">{s}</span>
              </li>
            ))}
          </ul>
        </div>
        {rel && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Dự án liên quan</h4>
            <Link
              href="/case-studies"
              className="group mt-2.5 block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
              <ProjectVisual project={rel} sizes="240px" />
              <span className="mt-1.5 block text-sm font-bold text-gray-900 transition-colors group-hover:text-red-600">
                {rel.name}
              </span>
              <span className="block text-xs text-gray-500">{rel.industry[lang]}</span>
            </Link>
          </div>
        )}
        <div className="border-t border-gray-200 pt-4">
          <TextLink href={`/contact?service=${group.id}`} ariaLabel={`Trao đổi về ${group.name[lang]}`}>
            Trao đổi về nhóm này
          </TextLink>
        </div>
      </div>
    )
  }

  /* ================= Desktop: click-tab studio ================= */
  if (isDesktop) {
    const ActiveIcon = ICONS[active.icon] ?? Compass
    const Stage = STAGE_BY_ID[active.id]
    return (
      <div className="grid gap-6 xl:gap-8 lg:grid-cols-[248px_minmax(0,1fr)_248px]">
        {/* Left — navigation with LED rail */}
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Nhóm dịch vụ"
          onKeyDown={onTabKey}
          className="relative self-start space-y-1 border-l border-gray-200 pl-4"
        >
          <span
            aria-hidden="true"
            className="absolute -left-px w-0.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.7)] transition-all duration-300"
            style={{ top: `${(activeIdx / N) * 100}%`, height: `${100 / N}%` }}
          />
          {serviceGroups.map((group, i) => {
            const Icon = ICONS[group.icon] ?? Compass
            const selected = i === activeIdx
            return (
              <button
                key={group.id}
                id={`studio-tab-${group.id}`}
                role="tab"
                aria-selected={selected}
                aria-controls="studio-stage"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIdx(i)}
                className={cn(
                  "flex min-h-11 w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
                  selected ? "bg-red-50/70" : "hover:bg-gray-50",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn("font-mono text-xs font-semibold tabular-nums", selected ? "text-red-600" : "text-gray-300")}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className={cn("h-[18px] w-[18px] shrink-0", selected ? "text-red-600" : "text-gray-400")}
                />
                <span className={cn("text-sm font-semibold", selected ? "text-red-700" : "text-gray-700")}>
                  {group.name[lang]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Centre — product stage (only the active one mounts) */}
        <div
          id="studio-stage"
          role="tabpanel"
          aria-labelledby={`studio-tab-${active.id}`}
          className="relative isolate min-h-[460px] overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"
          />
          <div className="flex items-center justify-between gap-3">
            <h3 className="flex items-center gap-2.5 text-lg font-bold text-gray-900">
              <ActiveIcon strokeWidth={1.5} className="h-5 w-5 text-red-600" aria-hidden="true" />
              {active.name[lang]}
            </h3>
            <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-gray-300">
              {STAGE_LABEL[active.id]}
            </span>
          </div>
          {/* key remount replays the stage entrance on every switch */}
          <div key={active.id} className="mt-5">
            <Stage />
          </div>
        </div>

        {/* Right — output panel */}
        <div key={`out-${active.id}`} className="vs-scene self-start">
          <OutputPanel group={active} />
        </div>
      </div>
    )
  }

  /* ================= Mobile / SSR: accordion ================= */
  return (
    <div className="mx-auto max-w-2xl space-y-3">
      {serviceGroups.map((group, i) => {
        const Icon = ICONS[group.icon] ?? Compass
        const open = openIdx === i
        const GStage = STAGE_BY_ID[group.id]
        return (
          <div
            key={group.id}
            id={`svc-${group.id}`}
            className={cn(
              "scroll-mt-28 overflow-hidden rounded-2xl border transition-colors duration-300",
              open ? "border-red-200 bg-white" : "border-gray-200 bg-white",
            )}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`studio-panel-${group.id}`}
              onClick={() => setOpenIdx(open ? null : i)}
              className="flex min-h-[56px] w-full items-center gap-3 px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-inset"
            >
              <span
                aria-hidden="true"
                className={cn("font-mono text-xs font-semibold tabular-nums", open ? "text-red-600" : "text-gray-300")}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <Icon strokeWidth={1.5} aria-hidden="true" className={cn("h-5 w-5 shrink-0", open ? "text-red-600" : "text-gray-400")} />
              <span className={cn("font-semibold", open ? "text-red-700" : "text-gray-900")}>{group.name[lang]}</span>
              <ChevronDown
                aria-hidden="true"
                className={cn("ml-auto h-4 w-4 shrink-0 text-gray-400 transition-transform duration-300", open && "rotate-180")}
              />
            </button>
            {/* Only the open stage mounts — heavy scenes never run while closed */}
            {open && (
              <div id={`studio-panel-${group.id}`} className="border-t border-gray-100 p-4">
                <div className="mb-3 flex justify-end">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-gray-300">
                    {STAGE_LABEL[group.id]}
                  </span>
                </div>
                <GStage />
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <OutputPanel group={group} />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
