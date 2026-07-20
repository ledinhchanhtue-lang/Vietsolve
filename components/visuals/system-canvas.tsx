"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/**
 * Hero "live system" canvas — four headline states.
 *
 * Lead mới → AI phân tích → CRM & workflow xử lý → Sale nhận kết quả.
 * The finer steps live in each node's tooltip rather than being listed out, so
 * the hero stays inside a single viewport.
 *
 * Behaviour:
 *  - Runs once when scrolled into view, then STOPS. No perpetual animation.
 *  - Nodes are real <button>s: keyboard focusable, each with a description.
 *  - Reduced motion → renders the final state immediately.
 *  - Mobile gets a compact stacked list instead of the graph.
 */

const VB = { w: 520, h: 300 }

type NodeDef = {
  id: number
  x: number
  y: number
  labelKey: `node${1 | 2 | 3 | 4}`
  detailKey: `node${1 | 2 | 3 | 4}Detail`
}

const NODES: NodeDef[] = [
  { id: 1, x: 76, y: 62, labelKey: "node1", detailKey: "node1Detail" },
  { id: 2, x: 214, y: 140, labelKey: "node2", detailKey: "node2Detail" },
  { id: 3, x: 140, y: 232, labelKey: "node3", detailKey: "node3Detail" },
  { id: 4, x: 392, y: 92, labelKey: "node4", detailKey: "node4Detail" },
]

/** from → to, and the step at which the edge becomes active */
const EDGES: Array<{ from: number; to: number; step: number }> = [
  { from: 1, to: 2, step: 2 },
  { from: 2, to: 3, step: 3 },
  { from: 3, to: 4, step: 4 },
  { from: 2, to: 4, step: 4 },
]

const byId = (id: number) => NODES.find((n) => n.id === id)!

export function SystemCanvas({ className }: { className?: string }) {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

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

    const timers: ReturnType<typeof setTimeout>[] = []

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        io.disconnect()
        NODES.forEach((_, i) => {
          timers.push(setTimeout(() => setStep(i + 1), 400 + i * 520))
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
      <div className="relative hidden aspect-[520/300] w-full sm:block">
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
                    "whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-tight transition-all duration-500 ease-smooth",
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

        {/* Shared detail slot — hovering never shifts layout */}
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

      {/* ---------- Mobile: compact stacked states ---------- */}
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
