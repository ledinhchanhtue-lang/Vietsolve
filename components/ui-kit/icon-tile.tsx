"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Icon container — one treatment for every icon on the site.
 *
 * Before this, icons were drawn three different ways: bare 36px charcoal
 * strokes on service cards, 28px red glyphs inside a solid red-100 square on
 * the pillars, and 32px inline glyphs with no container in the process steps.
 * Different sizes, different stroke weights, different padding, no shared hover.
 *
 * Everything now goes through this: fixed size ramp, stroke 1.5 everywhere,
 * a hairline frame, a corner accent line, and a hover state that lights the
 * glyph red with a soft bloom. Put it inside a `.group` and it reacts with the
 * card; on its own it reacts to its own hover.
 */

const SIZES = {
  sm: { box: "h-10 w-10 rounded-lg", icon: "h-[18px] w-[18px]", accent: "h-2.5 w-2.5" },
  md: { box: "h-12 w-12 rounded-xl", icon: "h-[22px] w-[22px]", accent: "h-3 w-3" },
  lg: { box: "h-14 w-14 rounded-xl", icon: "h-[26px] w-[26px]", accent: "h-3.5 w-3.5" },
} as const

export function IconTile({
  icon: Icon,
  size = "md",
  className,
  /** "dark" is for charcoal surfaces (footer, CTA cards). */
  tone = "light",
}: {
  icon: LucideIcon
  size?: keyof typeof SIZES
  className?: string
  tone?: "light" | "dark"
}) {
  const s = SIZES[size]

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center border transition-all duration-300",
        s.box,
        tone === "light"
          ? "border-gray-200 bg-gradient-to-br from-white to-gray-50 group-hover:border-red-200 hover:border-red-200"
          : "border-white/15 bg-white/5 group-hover:border-red-400/40 hover:border-red-400/40",
        className,
      )}
    >
      <Icon
        strokeWidth={1.5}
        className={cn(
          s.icon,
          "transition-all duration-300",
          tone === "light"
            ? "text-gray-900 group-hover:text-red-600 hover:text-red-600"
            : "text-white/80 group-hover:text-red-300 hover:text-red-300",
          "group-hover:drop-shadow-[0_0_7px_rgba(220,38,38,0.4)] hover:drop-shadow-[0_0_7px_rgba(220,38,38,0.4)]",
        )}
      />
      {/* Corner accent — resolves on hover, same language as the card bracket */}
      <span
        className={cn(
          "pointer-events-none absolute right-0 top-0 rounded-tr-[inherit] border-r border-t border-red-500/0",
          "transition-all duration-300 group-hover:border-red-500/50 hover:border-red-500/50",
          s.accent,
        )}
      />
    </span>
  )
}
