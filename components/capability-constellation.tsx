"use client"

import { useState } from "react"
import { serviceGroups } from "@/lib/content/services"
import { useLanguage } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/**
 * Capability constellation — replaces the seven-row "01–07" list on About.
 *
 * Desktop: a hub ("VietSolve") ringed by capability nodes joined with hairline
 * spokes. Hovering or focusing a node lights its spoke and shows that
 * capability's one-line description under the hub. Every description is the
 * existing tagline from lib/content/services.ts — nothing here is new copy.
 *
 * Mobile (< md): the same data as a wrap of selectable pills with the active
 * description below — the radial layout is a desktop composition and is not
 * forced onto small screens.
 */

/* The seven capabilities the page already listed, keyed to the service group
   whose (existing) tagline describes them. */
const NODES: Array<{ label: string; groupId: string }> = [
  { label: "Thương hiệu & Nhận diện", groupId: "branding-strategy" },
  { label: "Truyền thông & Quảng cáo", groupId: "marketing-growth" },
  { label: "Sáng tạo & Nội dung", groupId: "media-creative" },
  { label: "SEO & Marketing số", groupId: "data-seo-analytics" },
  { label: "Website & Ứng dụng", groupId: "website-digital" },
  { label: "AI & Tự động hóa", groupId: "ai-automation" },
  { label: "Phát triển công nghệ", groupId: "website-digital" },
]

export function CapabilityConstellation() {
  const { lang } = useLanguage()
  const [active, setActive] = useState(0)

  const tagline = (groupId: string) =>
    serviceGroups.find((g) => g.id === groupId)?.tagline[lang] ?? ""

  /* Node positions on a 100×100 field (desktop). Hand-placed rather than
     computed so labels never collide. */
  const POS = [
    { x: 50, y: 6 },
    { x: 88, y: 24 },
    { x: 96, y: 62 },
    { x: 68, y: 92 },
    { x: 32, y: 92 },
    { x: 4, y: 62 },
    { x: 12, y: 24 },
  ]

  return (
    <div>
      {/* ---------- Desktop: radial system ---------- */}
      <div className="relative mx-auto hidden aspect-[10/8] max-w-3xl md:block">
        {/* Spokes */}
        <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none">
          {POS.map((p, i) => (
            <line
              key={i}
              x1="50"
              y1="40"
              x2={p.x}
              y2={(p.y * 80) / 100}
              stroke={i === active ? "rgb(220 38 38 / 0.55)" : "rgb(15 23 42 / 0.12)"}
              strokeWidth={i === active ? 0.5 : 0.25}
              className="transition-all duration-300"
            />
          ))}
        </svg>

        {/* Hub */}
        <div className="absolute left-1/2 top-1/2 w-64 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-[0_8px_22px_-10px_rgb(220_38_38/0.7)]">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80 vs-node vs-anim" />
            VietSolve
          </span>
          {/* Active description under the hub — existing tagline, no new copy */}
          <p
            key={active}
            className="animate-fade-in mx-auto mt-3 min-h-[3.5rem] max-w-[16rem] text-sm leading-relaxed text-gray-600"
          >
            {tagline(NODES[active].groupId)}
          </p>
        </div>

        {/* Nodes */}
        {NODES.map((node, i) => (
          <button
            key={node.label}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={cn(
              "absolute min-h-11 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
              i === active
                ? "border-red-600 bg-red-50 text-red-700 shadow-[0_0_16px_-6px_rgb(220_38_38/0.6)]"
                : "border-gray-200 bg-white text-gray-700 hover:border-red-200 hover:text-gray-900",
            )}
            style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%` }}
          >
            {node.label}
          </button>
        ))}
      </div>

      {/* ---------- Mobile: pills + active line ---------- */}
      <div className="md:hidden">
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Năng lực VietSolve">
          {NODES.map((node, i) => (
            <button
              key={node.label}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={cn(
                "min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
                i === active
                  ? "border-red-600 bg-red-50 text-red-700"
                  : "border-gray-200 bg-white text-gray-700",
              )}
            >
              {node.label}
            </button>
          ))}
        </div>
        <p key={active} className="animate-fade-in mx-auto mt-5 max-w-md text-center text-sm leading-relaxed text-gray-600">
          {tagline(NODES[active].groupId)}
        </p>
      </div>
    </div>
  )
}
