"use client"

import Image from "next/image"
import { TechLayer } from "@/components/tech/tech-layer"
import { cn } from "@/lib/utils"

/**
 * Services hero — Creative Control Desk.
 *
 * Six artifact panels laid out as a working desk with depth: brand board,
 * website browser, media timeline, campaign creative, AI conversation and an
 * automation activity panel. Panels assemble in sequence on load with an LED
 * dot lighting per panel; hovering brings one forward and dims the rest, and
 * reveals its product-type label. Every panel is an interface demo and says
 * so; the only real asset is VietSolve's own logo on the brand board.
 *
 * Mobile shows the three primary panels (brand, website, AI) in a simple
 * stack — no parallax, no depth transforms.
 */

type Panel = {
  key: string
  label: string
  className: string
  depth: number
  primary?: boolean
}

const PANELS: Panel[] = [
  { key: "brand", label: "Brand guideline", className: "left-0 top-0 w-[46%]", depth: 0, primary: true },
  { key: "web", label: "Website", className: "right-0 top-[6%] w-[50%]", depth: 1, primary: true },
  { key: "media", label: "Video timeline", className: "left-[4%] top-[42%] w-[52%]", depth: 2 },
  { key: "campaign", label: "Campaign creative", className: "right-[2%] top-[48%] w-[38%]", depth: 3 },
  { key: "ai", label: "AI Agent", className: "left-0 bottom-0 w-[44%]", depth: 4, primary: true },
  { key: "auto", label: "Automation", className: "right-[6%] bottom-[2%] w-[42%]", depth: 5 },
]

function PanelBody({ kind }: { kind: string }) {
  switch (kind) {
    case "brand":
      return (
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo-vietsolve-official.png"
            alt=""
            width={56}
            height={56}
            className="h-9 w-auto"
          />
          <span className="h-7 w-7 rounded-md bg-red-600" />
          <span className="h-7 w-7 rounded-md bg-gray-900" />
          <span className="ml-auto space-y-1">
            <span className="block h-1.5 w-14 rounded-full bg-gray-200" />
            <span className="block h-1.5 w-9 rounded-full bg-red-100" />
          </span>
        </div>
      )
    case "web":
      return (
        <div className="overflow-hidden rounded-md border border-gray-200">
          <div className="flex h-3.5 items-center gap-1 border-b border-gray-200 bg-gray-50 px-1.5">
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span className="ml-1 h-1 flex-1 rounded-full bg-gray-200" />
          </div>
          <div className="space-y-1 p-1.5">
            <span className="block h-3 w-3/5 rounded-sm bg-red-100" />
            <div className="grid grid-cols-3 gap-1">
              <span className="block h-4 rounded-sm bg-gray-100" />
              <span className="block h-4 rounded-sm bg-gray-100" />
              <span className="block h-4 rounded-sm bg-gray-100" />
            </div>
          </div>
        </div>
      )
    case "media":
      return (
        <div className="relative space-y-1">
          <div className="flex gap-1">
            <span className="h-3 w-12 rounded-sm bg-gray-200" />
            <span className="h-3 w-7 rounded-sm bg-red-500/80" />
            <span className="h-3 w-14 rounded-sm bg-gray-200" />
            <span className="h-3 w-5 rounded-sm bg-gray-300" />
          </div>
          <div className="flex gap-1">
            <span className="h-3 w-7 rounded-sm bg-gray-100" />
            <span className="h-3 w-16 rounded-sm bg-red-100" />
            <span className="h-3 w-9 rounded-sm bg-gray-200" />
          </div>
          <span className="absolute -top-0.5 bottom-0 left-[42%] w-px bg-red-600" />
        </div>
      )
    case "campaign":
      return (
        <div className="space-y-1">
          <span className="block h-10 rounded-md bg-gradient-to-br from-red-600 to-gray-900" />
          <span className="block h-1.5 w-3/4 rounded-full bg-gray-200" />
          <span className="block h-1.5 w-1/2 rounded-full bg-gray-100" />
        </div>
      )
    case "ai":
      return (
        <div className="space-y-1">
          <span className="block w-4/5 rounded-lg rounded-bl-sm bg-gray-100 px-1.5 py-1">
            <span className="block h-1 w-full rounded-full bg-gray-300" />
          </span>
          <span className="ml-auto block w-2/3 rounded-lg rounded-br-sm bg-red-50 px-1.5 py-1 ring-1 ring-red-100">
            <span className="block h-1 w-full rounded-full bg-red-200" />
          </span>
        </div>
      )
    case "auto":
      return (
        <div className="space-y-1">
          {["Brief nhận", "AI phân loại", "CRM cập nhật"].map((row, i) => (
            <span key={row} className="flex items-center gap-1.5">
              <span className={cn("h-1 w-1 rounded-full", i < 2 ? "bg-red-600" : "bg-gray-300")} />
              <span className="text-[8px] font-semibold text-gray-500">{row}</span>
              <span className="ml-auto h-1 w-6 rounded-full bg-gray-100" />
            </span>
          ))}
        </div>
      )
    default:
      return null
  }
}

export function CreativeDesk() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* ---- Desktop / tablet: layered desk ---- */}
      <div className="relative hidden aspect-[10/9] sm:block">
        <TechLayer className="overflow-visible">
          <div className="absolute inset-0 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 vs-grid-1" />
        </TechLayer>
        <div
          className="group/desk pointer-events-auto absolute inset-4"
          style={{ perspective: "1200px" }}
        >
          {PANELS.map((p, i) => (
            <div
              key={p.key}
              className={cn(
                "group/panel absolute rounded-xl border bg-white/95 p-2.5 backdrop-blur-sm transition-all duration-300",
                "group-hover/desk:opacity-50 hover:!opacity-100 hover:-translate-y-1.5 hover:z-20",
                p.className,
              )}
              style={{
                transform: `translateZ(${-p.depth * 14}px)`,
                borderColor: p.depth === 0 ? "rgb(254 202 202)" : "rgb(229 231 235)",
                boxShadow:
                  p.depth === 0
                    ? "0 16px 30px -18px rgb(220 38 38 / 0.35)"
                    : "0 12px 24px -18px rgb(15 23 42 / 0.3)",
                animation: `vs-fill-in 0.45s ease-out ${0.25 + i * 0.22}s backwards`,
              }}
            >
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  {/* LED lights as each panel assembles, then stays on */}
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-red-600 shadow-[0_0_5px_rgba(220,38,38,0.7)]"
                    style={{ animation: `vs-fill-in 0.3s ease-out ${0.45 + i * 0.22}s backwards` }}
                  />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500">
                    {p.label}
                  </span>
                </span>
                {/* Product-type note appears on hover */}
                <span className="text-[8px] font-medium uppercase tracking-wider text-gray-300 opacity-0 transition-opacity duration-200 group-hover/panel:opacity-100">
                  Interface demo
                </span>
              </div>
              <PanelBody kind={p.key} />
            </div>
          ))}
        </div>
      </div>

      {/* ---- Mobile: the three primary panels, plainly stacked ---- */}
      <div className="space-y-2.5 sm:hidden">
        {PANELS.filter((p) => p.primary).map((p, i) => (
          <div
            key={p.key}
            className="rounded-xl border border-gray-200 bg-white p-3"
            style={{ animation: `vs-fill-in 0.4s ease-out ${0.2 + i * 0.15}s backwards` }}
          >
            <div className="mb-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{p.label}</span>
            </div>
            <PanelBody kind={p.key} />
          </div>
        ))}
      </div>
    </div>
  )
}
