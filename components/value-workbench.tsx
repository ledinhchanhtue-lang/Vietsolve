"use client"

import { useState } from "react"
import { Radar, Shapes, Waypoints, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Ba giá trị — one interactive workbench instead of three look-alike cards.
 *
 * Tabs (Sáng tạo / Trí tuệ / Đổi mới) swap a stage that shows the artifact
 * each value actually produces: a creative canvas (type, colour, image,
 * layout), a strategy canvas (audience → problem → insight → direction), and
 * an automation workflow (trigger → AI → CRM → approval → output) whose
 * connector LED-draws once per selection.
 *
 * Proper tablist semantics with arrow-key roving tabindex — same contract as
 * the services showcase. Stage visuals are interface demos and say so.
 */

const INK = "rgb(15 23 42 / 0.14)"

type ValueDef = {
  id: string
  icon: LucideIcon
  title: string
  en: string
  desc: string
}

const VALUES: ValueDef[] = [
  {
    id: "creative",
    icon: Shapes,
    title: "Sáng tạo",
    en: "Creative",
    desc: "Biến chiến lược thành thương hiệu, nội dung và trải nghiệm khác biệt.",
  },
  {
    id: "intelligence",
    icon: Radar,
    title: "Trí tuệ",
    en: "Intelligence",
    desc: "Dữ liệu, insight và tư duy chiến lược giúp xác định đúng bài toán.",
  },
  {
    id: "innovation",
    icon: Waypoints,
    title: "Đổi mới",
    en: "Innovation",
    desc: "Ứng dụng công nghệ và AI để giải pháp hiệu quả hơn theo thời gian.",
  },
]

/* ---------------- Stage canvases — interface demos ---------------- */

function CreativeCanvas() {
  return (
    <svg viewBox="0 0 560 260" className="h-auto w-full" aria-hidden="true">
      {/* Typography specimen */}
      <rect x="16" y="16" width="150" height="130" rx="10" fill="#fff" stroke={INK} />
      <text x="42" y="86" fontSize="52" fontWeight="700" fill="rgb(15 23 42 / 0.85)">Aa</text>
      <rect x="36" y="106" width="80" height="7" rx="3.5" fill="rgb(15 23 42 / 0.15)" />
      <rect x="36" y="120" width="56" height="7" rx="3.5" fill="rgb(220 38 38 / 0.35)" />
      {/* Colour system */}
      <g>
        <rect x="16" y="158" width="46" height="46" rx="9" fill="#dc2626" />
        <rect x="68" y="158" width="46" height="46" rx="9" fill="#111827" />
        <rect x="120" y="158" width="46" height="46" rx="9" fill="#e5e7eb" />
        <rect x="16" y="212" width="150" height="8" rx="4" fill="rgb(15 23 42 / 0.1)" />
      </g>
      {/* Image frame */}
      <rect x="182" y="16" width="212" height="188" rx="10" fill="rgb(15 23 42 / 0.06)" stroke={INK} />
      <circle cx="234" cy="66" r="20" fill="rgb(220 38 38 / 0.5)" />
      <path d="M182 176 L 250 118 L 300 154 L 348 108 L 394 148 L 394 204 L 182 204 Z" fill="rgb(15 23 42 / 0.16)" />
      <rect x="196" y="180" width="70" height="7" rx="3.5" fill="#fff" opacity="0.85" />
      {/* Layout blocks */}
      <g>
        <rect x="410" y="16" width="134" height="54" rx="8" fill="rgb(220 38 38 / 0.12)" stroke="rgb(220 38 38 / 0.35)" />
        <rect x="410" y="78" width="134" height="36" rx="8" fill="#fff" stroke={INK} />
        <rect x="410" y="122" width="64" height="82" rx="8" fill="#fff" stroke={INK} />
        <rect x="480" y="122" width="64" height="82" rx="8" fill="rgb(15 23 42 / 0.06)" stroke={INK} />
      </g>
      <rect x="182" y="212" width="362" height="8" rx="4" fill="rgb(15 23 42 / 0.08)" />
      <g fill="rgb(15 23 42 / 0.4)" fontSize="10" fontWeight="600" letterSpacing="0.06em">
        <text x="16" y="248">TYPOGRAPHY</text>
        <text x="182" y="248">IMAGE</text>
        <text x="410" y="248">LAYOUT</text>
      </g>
    </svg>
  )
}

function StrategyCanvas() {
  const CELLS: Array<[string, number, number]> = [
    ["AUDIENCE", 16, 16],
    ["PROBLEM", 288, 16],
    ["INSIGHT", 16, 124],
    ["DIRECTION", 288, 124],
  ]
  return (
    <svg viewBox="0 0 560 260" className="h-auto w-full" aria-hidden="true">
      {CELLS.map(([label, x, y]) => (
        <g key={label}>
          <rect x={x} y={y} width="256" height="96" rx="10" fill={label === "DIRECTION" ? "rgb(220 38 38 / 0.06)" : "#fff"} stroke={label === "DIRECTION" ? "rgb(220 38 38 / 0.4)" : INK} />
          <text x={x + 14} y={y + 24} fontSize="10" fontWeight="700" letterSpacing="0.08em" fill={label === "DIRECTION" ? "rgb(185 28 28 / 0.9)" : "rgb(15 23 42 / 0.45)"}>
            {label}
          </text>
          <rect x={x + 14} y={y + 40} width="180" height="7" rx="3.5" fill="rgb(15 23 42 / 0.12)" />
          <rect x={x + 14} y={y + 56} width="140" height="7" rx="3.5" fill="rgb(15 23 42 / 0.08)" />
          <rect x={x + 14} y={y + 72} width="100" height="7" rx="3.5" fill="rgb(15 23 42 / 0.08)" />
        </g>
      ))}
      {/* The reasoning path: audience → problem → insight → direction */}
      <path
        d="M144 112 V 124 M416 112 V 124 M272 64 H 288 M272 172 H 288"
        stroke={INK}
        strokeWidth="1.5"
      />
      <path
        d="M144 64 C 200 64, 230 64, 272 64 M416 92 C 416 108, 300 120, 160 128 M160 172 C 220 172, 250 172, 288 172"
        stroke="rgb(220 38 38 / 0.7)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        pathLength={1}
        className="vs-draw vs-anim"
        style={{ animationDuration: "1.4s" }}
      />
      <g fill="#dc2626">
        <circle cx="272" cy="64" r="3.5" />
        <circle cx="288" cy="172" r="3.5" />
      </g>
      <g fill="rgb(15 23 42 / 0.4)" fontSize="10" fontWeight="600" letterSpacing="0.06em">
        <text x="16" y="248">STRATEGY CANVAS</text>
      </g>
    </svg>
  )
}

function InnovationCanvas() {
  const STEPS = ["Trigger", "AI action", "CRM update", "Approval", "Output"]
  return (
    <svg viewBox="0 0 560 260" className="h-auto w-full" aria-hidden="true">
      {STEPS.map((label, i) => {
        const x = 16 + i * 110
        const active = i === 1
        return (
          <g key={label}>
            <rect
              x={x}
              y="88"
              width="94"
              height="64"
              rx="10"
              fill={active ? "rgb(220 38 38 / 0.07)" : "#fff"}
              stroke={active ? "rgb(220 38 38 / 0.45)" : INK}
            />
            <circle cx={x + 16} cy="108" r="4" fill={active ? "#dc2626" : "rgb(15 23 42 / 0.2)"} />
            <text x={x + 12} y="136" fontSize="11" fontWeight="600" fill="rgb(15 23 42 / 0.7)">
              {label}
            </text>
          </g>
        )
      })}
      {/* Connector LED-draws once whenever this tab is selected */}
      <path d="M110 120 H 566" stroke={INK} strokeWidth="1.5" />
      <path
        d="M110 120 H 544"
        stroke="rgb(220 38 38 / 0.75)"
        strokeWidth="2.25"
        strokeLinecap="round"
        pathLength={1}
        className="vs-draw vs-anim"
        style={{ animationDuration: "1.5s" }}
      />
      {/* Human approval loop above step 4 */}
      <path d="M405 88 C 405 56, 460 56, 460 88" stroke={INK} strokeWidth="1.5" fill="none" strokeDasharray="4 5" />
      <text x="396" y="48" fontSize="10" fontWeight="600" letterSpacing="0.06em" fill="rgb(15 23 42 / 0.4)">
        HUMAN-IN-THE-LOOP
      </text>
      {/* Output rows */}
      <rect x="16" y="180" width="240" height="8" rx="4" fill="rgb(15 23 42 / 0.08)" />
      <rect x="16" y="196" width="180" height="8" rx="4" fill="rgb(220 38 38 / 0.18)" />
      <g fill="rgb(15 23 42 / 0.4)" fontSize="10" fontWeight="600" letterSpacing="0.06em">
        <text x="16" y="248">AUTOMATION WORKFLOW</text>
      </g>
    </svg>
  )
}

const CANVASES: Record<string, () => React.ReactElement> = {
  creative: CreativeCanvas,
  intelligence: StrategyCanvas,
  innovation: InnovationCanvas,
}

export function ValueWorkbench() {
  const [activeId, setActiveId] = useState(VALUES[0].id)
  const active = VALUES.find((v) => v.id === activeId) ?? VALUES[0]
  const Canvas = CANVASES[active.id]

  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = VALUES.findIndex((v) => v.id === activeId)
    let next = -1
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % VALUES.length
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + VALUES.length) % VALUES.length
    if (next === -1) return
    e.preventDefault()
    setActiveId(VALUES[next].id)
    document.getElementById(`wb-tab-${VALUES[next].id}`)?.focus()
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Giá trị cốt lõi"
        onKeyDown={onKeyDown}
        className="grid grid-cols-3 gap-2 sm:gap-3"
      >
        {VALUES.map((v) => {
          const selected = v.id === activeId
          return (
            <button
              key={v.id}
              id={`wb-tab-${v.id}`}
              role="tab"
              aria-selected={selected}
              aria-controls="wb-stage"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(v.id)}
              className={cn(
                "group flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-xl border px-2 py-3 transition-all duration-200 sm:flex-row sm:gap-2.5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
                selected
                  ? "border-red-600 bg-red-50/70 shadow-[inset_0_0_0_1px_rgba(220,38,38,0.2)]"
                  : "border-gray-200 bg-white hover:border-red-200",
              )}
            >
              <v.icon
                strokeWidth={1.5}
                aria-hidden="true"
                className={cn("h-5 w-5 shrink-0", selected ? "text-red-600" : "text-gray-400 group-hover:text-gray-700")}
              />
              <span className={cn("text-sm font-bold sm:text-base", selected ? "text-red-700" : "text-gray-900")}>
                {v.title}
              </span>
              <span className="hidden text-xs font-medium uppercase tracking-wider text-gray-400 lg:inline">
                {v.en}
              </span>
            </button>
          )
        })}
      </div>

      {/* Stage — key remount replays the LED draw for the new canvas */}
      <div
        id="wb-stage"
        role="tabpanel"
        aria-labelledby={`wb-tab-${active.id}`}
        className="relative mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5 sm:p-7"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"
        />
        <div key={active.id} className="animate-fade-in">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-gray-600">{active.desc}</p>
            <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-gray-300">
              Interface demo
            </span>
          </div>
          <div className="mt-5">
            <Canvas />
          </div>
        </div>
      </div>
    </div>
  )
}
