"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Section divider — a hairline with a slow travelling light and a pulse node.
 *
 * Gives the page a rhythm between sections instead of plain whitespace. Two
 * looping animations, both paused whenever the divider is off-screen, both
 * removed entirely under prefers-reduced-motion (the hairline stays).
 */
export function TechDivider({
  className,
  /** "node" adds a centred pulse dot; "plain" is just the running light. */
  variant = "node",
}: {
  className?: string
  variant?: "node" | "plain"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      rootMargin: "160px 0px",
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-tech-active={active}
      aria-hidden="true"
      /* No layout of its own — callers decide width and padding, so the same
         divider works as a full-bleed section break and as a 10rem accent rule
         under the footer logo. */
      className={cn("relative", className)}
    >
      <div className="relative flex items-center">
        <div className="vs-divider vs-anim flex-1" />
        {variant === "node" && (
          <span className="relative mx-3 flex h-1.5 w-1.5 shrink-0 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-red-600/70 vs-node vs-anim" />
            <span className="relative h-1 w-1 rounded-full bg-red-600" />
          </span>
        )}
        {variant === "node" && <div className="vs-divider vs-anim flex-1" />}
      </div>
    </div>
  )
}
