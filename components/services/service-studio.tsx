"use client"

import { useEffect, useRef, useState } from "react"
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
 * Interactive Service Studio — the page's main wow moment.
 *
 * Desktop (lg+): a 3-part stage pinned for six viewport-lengths of scroll.
 *   Left  — numbered service navigation with a vertical LED rail.
 *   Centre — the Product Stage: a completely different interactive scene per
 *            group (see services/stages.tsx).
 *   Right — the group's tagline, deliverables, a related real project, CTA.
 * Scrolling advances the active service one by one; clicking a nav item jumps
 * the scroll there. Nothing hijacks the wheel — it's a plain sticky element,
 * so the user can always keep scrolling straight through.
 *
 * Tablet (md–lg): the same three parts stacked, click-driven, no pinning.
 * Mobile (<md): an accordion — one group open at a time, each opening its own
 * scene. Accordion items carry the group ids so /services#<id> deep links keep
 * working everywhere.
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

export function ServiceStudio() {
  const { lang } = useLanguage()
  const [activeIdx, setActiveIdx] = useState(0)
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const wrapRef = useRef<HTMLDivElement>(null)
  /* True while a click-initiated smooth scroll is in flight, so the scroll
     handler doesn't fight the animation. */
  const jumping = useRef(false)

  const active = serviceGroups[activeIdx]
  const ActiveIcon = ICONS[active.icon] ?? Compass
  const Stage = STAGE_BY_ID[active.id]
  const related = projects.find((p) => p.capability === GROUP_CAPABILITY[active.id])

  /* Scroll-driven activation, desktop only */
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)")
    const onScroll = () => {
      if (!lg.matches || jumping.current || !wrapRef.current) return
      const el = wrapRef.current
      const total = el.offsetHeight - window.innerHeight
      if (total <= 0) return
      const y = window.scrollY - el.offsetTop
      const idx = Math.min(N - 1, Math.max(0, Math.floor((y / total) * N)))
      setActiveIdx(idx)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Deep link: /services#<group id> selects that group (and opens its
     accordion item on mobile). Also handles hash-only navigation — clicking a
     footer/homepage anchor while already on /services changes only the hash,
     which never remounts this component. */
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "")
      const idx = serviceGroups.findIndex((g) => g.id === hash)
      if (idx >= 0) {
        setActiveIdx(idx)
        setOpenIdx(idx)
        jumpTo(idx, "auto")
      }
    }
    applyHash()
    window.addEventListener("hashchange", applyHash)
    return () => window.removeEventListener("hashchange", applyHash)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const jumpTo = (idx: number, behavior: ScrollBehavior = "smooth") => {
    setActiveIdx(idx)
    const el = wrapRef.current
    if (!el || !window.matchMedia("(min-width: 1024px)").matches) return
    const total = el.offsetHeight - window.innerHeight
    if (total <= 0) return
    const target = el.offsetTop + (idx / N) * total + 2
    jumping.current = true
    window.scrollTo({ top: target, behavior })
    window.setTimeout(() => {
      jumping.current = false
    }, 650)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    let next = -1
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (activeIdx + 1) % N
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (activeIdx - 1 + N) % N
    if (next === -1) return
    e.preventDefault()
    jumpTo(next)
    document.getElementById(`studio-tab-${serviceGroups[next].id}`)?.focus()
  }

  /* -------- Shared output panel -------- */
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

  return (
    <>
      {/* ================= Desktop: pinned studio ================= */}
      <div ref={wrapRef} className="hidden lg:block" style={{ height: `${N * 88}vh` }}>
        <div className="sticky top-20 flex h-[calc(100vh-5.5rem)] items-center">
          <div className="grid w-full gap-6 xl:gap-8 lg:grid-cols-[260px_minmax(0,1fr)_250px]">
            {/* Left — navigation with LED rail */}
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Nhóm dịch vụ"
              onKeyDown={onKeyDown}
              className="relative space-y-1 border-l border-gray-200 pl-4"
            >
              {/* LED rail marker follows the active index */}
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
                    onClick={() => jumpTo(i)}
                    className={cn(
                      "flex min-h-11 w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
                      selected ? "bg-red-50/70" : "hover:bg-gray-50",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-mono text-xs font-semibold tabular-nums",
                        selected ? "text-red-600" : "text-gray-300",
                      )}
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

            {/* Centre — Product Stage */}
            <div
              id="studio-stage"
              role="tabpanel"
              aria-labelledby={`studio-tab-${active.id}`}
              className="relative isolate self-stretch overflow-y-auto rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm"
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
              <div key={active.id} className="mt-5">
                <Stage />
              </div>
            </div>

            {/* Right — Output panel */}
            <div key={`out-${active.id}`} className="vs-scene self-center">
              <OutputPanel group={active} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= Mobile / tablet: accordion ================= */}
      <div className="space-y-3 lg:hidden">
        {serviceGroups.map((group, i) => {
          const Icon = ICONS[group.icon] ?? Compass
          const open = openIdx === i
          const GStage = STAGE_BY_ID[group.id]
          return (
            <div
              key={group.id}
              id={group.id}
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
                className={cn(
                  "flex min-h-[56px] w-full items-center gap-3 px-4 py-3 text-left",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-inset",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn("font-mono text-xs font-semibold tabular-nums", open ? "text-red-600" : "text-gray-300")}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon strokeWidth={1.5} aria-hidden="true" className={cn("h-5 w-5 shrink-0", open ? "text-red-600" : "text-gray-400")} />
                <span className={cn("font-semibold", open ? "text-red-700" : "text-gray-900")}>
                  {group.name[lang]}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn("ml-auto h-4 w-4 shrink-0 text-gray-400 transition-transform duration-300", open && "rotate-180")}
                />
              </button>
              {open && (
                <div id={`studio-panel-${group.id}`} className="border-t border-gray-100 p-4">
                  <p className="mb-3 text-right text-[10px] font-medium uppercase tracking-wider text-gray-300">
                    {STAGE_LABEL[group.id]}
                  </p>
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
    </>
  )
}
