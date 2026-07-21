"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Wrapper for decorative layers that animate.
 *
 * Flips `data-tech-active` as the layer enters and leaves the viewport;
 * globals.css pauses every `.vs-anim` inside an inactive layer. A looping
 * animation three screens below the fold still costs the compositor a frame
 * every tick, and a page like the homepage stacks several of them.
 *
 * Always aria-hidden and pointer-events-none: none of this is content, and
 * none of it may intercept a click.
 */
export function TechLayer({
  children,
  className,
  /** Start active so the first paint is never a blank frame above the fold. */
  initialActive = true,
}: {
  children: ReactNode
  className?: string
  initialActive?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(initialActive)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return

    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      // Generous margin: resume slightly before the layer scrolls into view so
      // the animation is already mid-cycle rather than starting from zero.
      { rootMargin: "220px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-tech-active={active}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {children}
    </div>
  )
}
