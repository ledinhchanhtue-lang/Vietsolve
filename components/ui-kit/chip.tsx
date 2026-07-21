"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

/**
 * Chip — the fourth button kind, alongside Primary / Secondary / TextLink.
 *
 * Two jobs, one look:
 *   • SelectableChip — a radio in a radiogroup (contact form's project type).
 *     Selected state is unmistakable: red hairline, tinted fill, inner glow and
 *     a filled check badge. Not just a slightly darker border.
 *   • Tag — the read-only pill used for deliverables and service highlights.
 *
 * Both were previously inline Tailwind strings repeated across four files,
 * which is how the deliverable pills and the highlight pills drifted apart.
 */

const shared =
  "inline-flex items-center gap-2 rounded-xl border text-sm transition-all duration-200"

export function SelectableChip({
  children,
  selected,
  onSelect,
  className,
}: {
  children: ReactNode
  selected: boolean
  onSelect: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        shared,
        "min-h-[48px] w-full justify-between px-4 py-3 text-left",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
        selected
          ? "border-red-600 bg-red-50 font-semibold text-red-700 shadow-[inset_0_0_0_1px_rgba(220,38,38,0.22),0_0_14px_-4px_rgba(220,38,38,0.55)]"
          : "border-gray-200 bg-white text-gray-700 hover:border-red-200 hover:bg-red-50/40",
        className,
      )}
    >
      <span>{children}</span>
      {/* The indicator always occupies its slot, so selecting a chip does not
          reflow the label. */}
      <span
        aria-hidden="true"
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-200",
          selected ? "bg-red-600 scale-100" : "border border-gray-200 bg-white scale-90",
        )}
      >
        {selected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </span>
    </button>
  )
}

/** Read-only pill: deliverables, service highlights, topic tags. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        shared,
        "rounded-full border-gray-200 bg-gray-50 px-3 py-1.5 text-gray-700",
        "group-hover:border-red-100 group-hover:bg-red-50/50",
        className,
      )}
    >
      {children}
    </span>
  )
}
