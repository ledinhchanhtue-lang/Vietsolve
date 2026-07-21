"use client"

import { TechLayer } from "@/components/tech/tech-layer"
import { LAC_PATH, LAC_VIEWBOX } from "@/lib/lac-path"

/**
 * About hero, right column — the actual Lạc bird from the logo, presented as a
 * working drawing.
 *
 * The geometry is the real mark (traced from the logo file — see lib/lac-path),
 * not an interpretation. On first view the outline draws itself along the
 * bird's true contour, then the brand-red fill fades in underneath; a
 * construction grid and keyword panels frame it like an identity-manual page.
 *
 * One-shot: the draw is gated by the TechLayer observer and never loops.
 * Reduced-motion shows the finished mark immediately. Decorative — the logo
 * itself (with alt text) lives in the header; this layer is aria-hidden.
 */

const KEYWORDS = ["Creative", "Intelligence", "Innovation", "Technology", "Growth"]

export function AboutHeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="relative aspect-[5/4]">
        <TechLayer className="overflow-visible">
          {/* Blueprint surface */}
          <div className="absolute inset-0 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 vs-grid-1" />

          {/* Construction geometry behind the mark */}
          <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full" fill="none">
            <g stroke="rgb(15 23 42 / 0.10)" strokeWidth="1">
              <circle cx="200" cy="160" r="118" />
              <circle cx="200" cy="160" r="74" />
              <path d="M200 28 V 292 M68 160 H 332" strokeDasharray="4 7" />
            </g>
          </svg>

          {/* The bird itself — real logo geometry, centred on the surface */}
          <svg
            viewBox={LAC_VIEWBOX}
            className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2"
            fill="none"
          >
            {/* Fill fades in once the outline is mostly drawn */}
            <path
              d={LAC_PATH}
              fill="#dc2626"
              fillRule="evenodd"
              stroke="none"
              className="vs-anim"
              style={{ animation: "vs-fill-in 0.9s ease-out 1.6s backwards" }}
            />
            {/* Outline draw — traces the true contour of the mark */}
            <path
              d={LAC_PATH}
              pathLength={1}
              stroke="rgb(153 27 27 / 0.9)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="vs-draw vs-anim"
              style={{ animationDuration: "2s" }}
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
