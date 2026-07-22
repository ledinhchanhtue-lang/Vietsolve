"use client"

import { useState } from "react"
import {
  Compass,
  Shapes,
  Clapperboard,
  AppWindow,
  Workflow,
  BarChart3,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Hệ sinh thái năng lực — a Project Builder, replacing the radial
 * constellation. Pick a problem type on the left; the project desk on the
 * right lights the modules that actually go to work on it, with an LED rail
 * running through the active set in order.
 *
 * The module set is the real service-group taxonomy. Which modules light per
 * problem describes how the team assembles — process, not a results claim.
 * Buttons carry aria-pressed; the desk itself is a decorative reflection of
 * the selection and is aria-hidden.
 */

type ModuleId = "strategy" | "branding" | "media" | "website" | "ai" | "data"

const MODULES: Array<{ id: ModuleId; label: string; icon: LucideIcon }> = [
  { id: "strategy", label: "Strategy", icon: Compass },
  { id: "branding", label: "Branding", icon: Shapes },
  { id: "media", label: "Media", icon: Clapperboard },
  { id: "website", label: "Website", icon: AppWindow },
  { id: "ai", label: "AI & Automation", icon: Workflow },
  { id: "data", label: "Data & SEO", icon: BarChart3 },
]

const PROBLEMS: Array<{ label: string; modules: ModuleId[] }> = [
  { label: "Ra mắt thương hiệu", modules: ["strategy", "branding", "media"] },
  { label: "Chiến dịch tăng trưởng", modules: ["strategy", "media", "data"] },
  { label: "Xây dựng website", modules: ["strategy", "branding", "website", "data"] },
  { label: "Sản xuất media", modules: ["strategy", "media"] },
  { label: "Tự động hóa bán hàng", modules: ["strategy", "website", "ai", "data"] },
]

export function ProjectBuilder() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = PROBLEMS[activeIdx]
  const activeSet = new Set(active.modules)

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-12">
      {/* Problem selector — vertical rail on desktop, wrap of pills on mobile */}
      <div
        role="group"
        aria-label="Loại bài toán"
        className="flex flex-wrap gap-2 lg:flex-col"
      >
        {PROBLEMS.map((p, i) => {
          const selected = i === activeIdx
          return (
            <button
              key={p.label}
              type="button"
              aria-pressed={selected}
              onClick={() => setActiveIdx(i)}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-sm font-semibold transition-all duration-200 lg:min-h-[52px] lg:text-base",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
                selected
                  ? "border-red-600 bg-red-50/70 text-red-700 shadow-[inset_0_0_0_1px_rgba(220,38,38,0.2),0_0_14px_-6px_rgba(220,38,38,0.5)]"
                  : "border-gray-200 bg-white text-gray-700 hover:border-red-200",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-200",
                  selected ? "bg-red-600 shadow-[0_0_6px_rgba(220,38,38,0.7)]" : "bg-gray-300",
                )}
              />
              {p.label}
            </button>
          )
        })}
      </div>

      {/* Project desk — modules light up per selection */}
      <div
        aria-hidden="true"
        className="relative rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5 sm:p-7"
      >
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
        <div className="flex items-baseline justify-between gap-3">
          <p key={active.label} className="animate-fade-in text-sm font-bold uppercase tracking-wider text-gray-900">
            {active.label}
          </p>
          <span className="text-xs font-semibold tabular-nums text-gray-400">
            {active.modules.length}/6 module
          </span>
        </div>

        {/* LED rail — one segment per active module, lit in assembly order */}
        <div key={`rail-${active.label}`} className="mt-4 flex items-center gap-1">
          {active.modules.map((m, i) => (
            <span key={m} className="flex flex-1 items-center gap-1">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-red-600 shadow-[0_0_6px_rgba(220,38,38,0.6)] vs-anim"
                style={{ animation: `vs-fill-in 0.35s ease-out ${i * 0.18}s backwards` }}
              />
              {i < active.modules.length - 1 && (
                <span
                  className="h-px flex-1 bg-red-400 vs-anim"
                  style={{ animation: `vs-fill-in 0.35s ease-out ${i * 0.18 + 0.09}s backwards` }}
                />
              )}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {MODULES.map((m) => {
            const on = activeSet.has(m.id)
            const order = active.modules.indexOf(m.id)
            return (
              <div
                key={`${active.label}-${m.id}`}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border px-3.5 py-3 transition-all duration-300",
                  on
                    ? "border-red-300 bg-white shadow-[0_0_14px_-6px_rgba(220,38,38,0.45)]"
                    : "border-gray-200 bg-white/60 opacity-45",
                )}
                style={
                  on
                    ? { animation: `vs-fill-in 0.4s ease-out ${order * 0.18}s backwards` }
                    : undefined
                }
              >
                <m.icon
                  strokeWidth={1.5}
                  className={cn("h-[18px] w-[18px] shrink-0", on ? "text-red-600" : "text-gray-400")}
                />
                <span className={cn("text-sm font-semibold", on ? "text-gray-900" : "text-gray-500")}>
                  {m.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
