"use client"

import { useEffect, useRef } from "react"
import { TechLayer } from "@/components/tech/tech-layer"
import { LOGO_BIRD_PATH, LOGO_TEXT_PATH, LOGO_VIEWBOX } from "@/lib/lac-path"

/**
 * About hero, right column — the full VietSolve logo as a wireframe drawing.
 *
 * The geometry is the real logo (traced from the PNG — see lib/lac-path), and
 * it stays OUTLINE ONLY: the bird's contour draws itself in red, then the
 * wordmark draws in charcoal. No fill — the wireframe read is the point.
 *
 * One-shot: the draw is gated by the TechLayer observer and never loops.
 * Reduced-motion shows the finished outline immediately. Decorative — the
 * real logo (with alt text) lives in the header; this layer is aria-hidden.
 */

const KEYWORDS = ["Creative", "Intelligence", "Innovation", "Technology", "Growth"]

export function AboutHeroVisual() {
  /* Pointer tilt — the wireframe card leans a few degrees toward the cursor.
     Fine-pointer + motion-allowed only; transform-only so it stays on the
     compositor. ±5° max: depth, not a gimmick. */
  const tiltRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = tiltRef.current
    if (!el) return
    if (!window.matchMedia("(pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    let rx = 0
    let ry = 0
    const apply = () => {
      frame = 0
      el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`
    }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      ry = ((e.clientX - r.left) / r.width - 0.5) * 10
      rx = -((e.clientY - r.top) / r.height - 0.5) * 10
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      rx = 0
      ry = 0
      if (!frame) frame = requestAnimationFrame(apply)
    }
    el.addEventListener("pointermove", onMove, { passive: true })
    el.addEventListener("pointerleave", onLeave)
    return () => {
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        ref={tiltRef}
        className="relative aspect-[5/4] transition-transform duration-300 ease-out"
      >
        {/* One-shot LED edge — a light crosses the top edge once on load */}
        <span className="pointer-events-none absolute inset-x-4 top-0 z-10 h-px overflow-hidden rounded-full">
          <span
            className="block h-full w-2/5 bg-gradient-to-r from-transparent via-red-500 to-transparent vs-anim"
            style={{ animation: "vs-run 1.4s ease-out 0.5s 1 backwards" }}
          />
        </span>
        <TechLayer className="overflow-visible">
          {/* Blueprint surface */}
          <div className="absolute inset-0 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 vs-grid-1" />

          {/* Construction geometry behind the mark */}
          <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full" fill="none">
            <g stroke="rgb(15 23 42 / 0.10)" strokeWidth="1">
              <circle cx="200" cy="160" r="118" />
              <path d="M200 28 V 292 M68 160 H 332" strokeDasharray="4 7" />
            </g>
          </svg>

          {/* The logo — real geometry, outline only. Bird draws first in red,
              the wordmark follows in charcoal. */}
          <svg
            viewBox={LOGO_VIEWBOX}
            className="absolute left-1/2 top-1/2 h-[80%] w-[84%] -translate-x-1/2 -translate-y-1/2"
            fill="none"
          >
            <path
              d={LOGO_BIRD_PATH}
              pathLength={1}
              stroke="#dc2626"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="vs-draw vs-anim"
              style={{ animationDuration: "1.8s" }}
            />
            <path
              d={LOGO_TEXT_PATH}
              pathLength={1}
              stroke="rgb(15 23 42 / 0.75)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="vs-draw vs-anim"
              style={{ animationDuration: "2.2s", animationDelay: "0.9s" }}
            />
          </svg>

          {/* Keyword panels — stacked bottom-left with slight depth, staggered in */}
          <div className="absolute -bottom-4 -left-2 flex flex-col gap-1.5 sm:-left-5">
            {KEYWORDS.map((k, i) => (
              <span
                key={k}
                className="animate-fade-in inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white/95 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-gray-600 shadow-sm"
                style={{
                  animationDelay: `${0.5 + i * 0.14}s`,
                  animationFillMode: "backwards",
                  marginLeft: `${i * 12}px`,
                  boxShadow:
                    i === 0
                      ? "0 8px 18px -10px rgb(220 38 38 / 0.4)"
                      : "0 6px 14px -10px rgb(15 23 42 / 0.25)",
                }}
              >
                <span className={i === 0 ? "h-1.5 w-1.5 rounded-full bg-red-600" : "h-1.5 w-1.5 rounded-full bg-gray-300"} />
                {k}
              </span>
            ))}
          </div>
        </TechLayer>
      </div>
    </div>
  )
}
