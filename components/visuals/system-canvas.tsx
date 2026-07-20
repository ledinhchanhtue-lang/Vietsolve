"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/**
 * Hero "live system" canvas.
 *
 * Shows a real lead travelling through an AI workflow: message → intent → CRM →
 * agent reply → recommendation → sales handoff → dashboard.
 *
 * Behaviour:
 *  - Activates once when scrolled into view, steps through, then STOPS.
 *    (No perpetual animation burning frames.)
 *  - Nodes are real <button>s: keyboard focusable, each with a description.
 *  - Reduced motion → everything renders in its final state immediately.
 *  - Mobile gets a compact stacked list instead of the graph.
 */

const VB = { w: 560, h: 420 }

type NodeDef = {
  id: number
  x: number
  y: number
  labelKey: `node${1 | 2 | 3 | 4 | 5 | 6 | 7}`
  detailKey: `node${1 | 2 | 3 | 4 | 5 | 6 | 7}Detail`
  accent?: boolean
}

const NODES: NodeDef[] = [
  { id: 1, x: 62, y: 78, labelKey: "node1", detailKey: "node1Detail" },
  { id: 2, x: 196, y: 148, labelKey: "node2", detailKey: "node2Detail" },
  { id: 3, x: 104, y: 286, labelKey: "node3", detailKey: "node3Detail" },
  { id: 4, x: 300, y: 224, labelKey: "node4", detailKey: "node4Detail", accent: true },
  { id: 5, x: 432, y: 118, labelKey: "node5", detailKey: "node5Detail" },
  { id: 6, x: 486, y: 264, labelKey: "node6", detailKey: "node6Detail" },
  { id: 7, x: 322, y: 356, labelKey: "node7", detailKey: "node7Detail" },
]

/** from → to, and the step at which the edge becomes active */
const EDGES: Array<{ from: number; to: number; step: number }> = [
  { from: 1, to: 2, step: 2 },
  { from: 2, to: 3, step: 3 },
  { from: 3, to: 4, step: 4 },
  { from: 2, to: 4, step: 4 },
  { from: 4, to: 5, step: 5 },
  { from: 5, to: 6, step: 6 },
  { from: 4, to: 7, step: 7 },
  { from: 6, to: 7, step: 7 },
]

const byId = (id: number) => NODES.find((n) => n.id === id)!

export function SystemCanvas({ className }: { className?: string }) {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

  // Step through once, when the canvas first enters the viewport.
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduced) {
      setStep(NODES.length)
      return
    }

    let timers: ReturnType<typeof setTimeout>[] = []

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        io.disconnect()
        NODES.forEach((_, i) => {
          timers.push(setTimeout(() => setStep(i + 1), 380 + i * 420))
        })
      },
      { threshold: 0.35 },
    )

    io.observe(el)
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  const complete = step >= NODES.length
  const activeNode = hovered ?? (step > 0 && !complete ? step : null)

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {/* ---------- Desktop / tablet: node graph ---------- */}
      <div className="relative hidden aspect-[560/420] w-full sm:block">
        <div className="absolute inset-0 rounded-stage border border-white/[0.08] bg-graphite/60 grid-backdrop" />

        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {EDGES.map(({ from, to, step: s }) => {
            const a = byId(from)
            const b = byId(to)
            const on = step >= s
            return (
              <line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={on ? "#E21B2D" : "rgba(244,241,234,0.14)"}
                strokeWidth={on ? 1.5 : 1}
                strokeDasharray={on ? "4 6" : undefined}
                className={cn(
                  "transition-[stroke] duration-500 ease-smooth",
                  on && !complete && "animate-dash-flow",
                )}
              />
            )
          })}
        </svg>

        {NODES.map((n) => {
          const on = step >= n.id
          const isActive = activeNode === n.id
          return (
            <button
              key={n.id}
              type="button"
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(n.id)}
              onBlur={() => setHovered(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-offset-4"
              style={{ left: `${(n.x / VB.w) * 100}%`, top: `${(n.y / VB.h) * 100}%` }}
              aria-label={`${t.system[n.labelKey]} — ${t.system[n.detailKey]}`}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "relative flex h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-500 ease-smooth",
                    on ? "bg-vs-red" : "bg-white/25",
                    isActive && "scale-[1.6]",
                  )}
                >
                  {on && isActive && (
                    <span className="absolute inset-0 rounded-full bg-vs-red/40 animate-node-pulse" />
                  )}
                </span>
                <span
                  className={cn(
                    "whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-tight transition-all duration-500 ease-smooth lg:text-[11px]",
                    on
                      ? "border-white/15 bg-obsidian/85 text-ivory"
                      : "border-white/[0.07] bg-obsidian/50 text-white/35",
                    isActive && "border-vs-red/50",
                  )}
                >
                  {t.system[n.labelKey]}
                </span>
              </span>
            </button>
          )
        })}

        {/* Detail readout — one shared slot, so hovering never shifts layout */}
        <div className="pointer-events-none absolute inset-x-4 bottom-4">
          <div
            className={cn(
              "rounded-xl border border-white/10 bg-obsidian/90 px-4 py-3 backdrop-blur-sm transition-opacity duration-ui",
              activeNode ? "opacity-100" : "opacity-0",
            )}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-vs-red">
              {activeNode ? `0${activeNode}` : "—"}
            </p>
            <p className="mt-1 text-sm text-ivory">
              {activeNode ? t.system[byId(activeNode).detailKey] : ""}
            </p>
          </div>
        </div>

        {/* Status chip */}
        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-obsidian/80 px-3 py-1.5">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              complete ? "bg-emerald-400" : "bg-vs-red animate-node-pulse",
            )}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-vs-steel">
            {t.hero.systemLabel}
          </span>
        </div>
      </div>

      {/* ---------- Mobile: compact stacked steps ---------- */}
      <ol className="space-y-0 rounded-stage border border-white/[0.08] bg-graphite/60 p-5 sm:hidden">
        {NODES.map((n, i) => {
          const on = step >= n.id
          return (
            <li key={n.id} className="relative flex gap-3 pb-4 last:pb-0">
              {i < NODES.length - 1 && (
                <span
                  className={cn(
                    "absolute left-[5px] top-4 h-full w-px transition-colors duration-500",
                    on ? "bg-vs-red/50" : "bg-white/10",
                  )}
                />
              )}
              <span
                className={cn(
                  "relative mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full transition-colors duration-500",
                  on ? "bg-vs-red" : "bg-white/25",
                )}
              />
              <div className="min-w-0">
                <p
                  className={cn(
                    "font-mono text-[11px] transition-colors duration-500",
                    on ? "text-ivory" : "text-white/40",
                  )}
                >
                  {t.system[n.labelKey]}
                </p>
                <p className="mt-0.5 text-[13px] leading-snug text-vs-steel">
                  {t.system[n.detailKey]}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
