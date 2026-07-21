"use client"

import { TechLayer } from "@/components/tech/tech-layer"

/**
 * About hero, right column — the brand drawn as a working document.
 *
 * Light-theme counterpart of the signature section: construction grid, the Lạc
 * contour drawing itself in, a red LED trail over the wing, and small keyword
 * panels stacked with a little depth. All SVG/CSS; the draw runs once when the
 * layer first reports itself visible, then the composition stands still.
 *
 * Decorative throughout — every keyword here is real content elsewhere on the
 * page, so the whole layer is aria-hidden.
 */

const KEYWORDS = ["Creative", "Intelligence", "Innovation", "Technology", "Growth"]

export function AboutHeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="relative aspect-[5/4]">
        <TechLayer className="overflow-visible">
          {/* Construction grid appears first */}
          <div className="absolute inset-0 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 vs-grid-1" />

          <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full" fill="none">
            {/* Construction geometry */}
            <g stroke="rgb(15 23 42 / 0.12)" strokeWidth="1">
              <circle cx="200" cy="160" r="118" />
              <circle cx="200" cy="160" r="74" />
              <path d="M200 28 V 292 M68 160 H 332" strokeDasharray="4 7" />
            </g>

            {/* Lạc contour — draws in, charcoal on light */}
            <g
              stroke="rgb(15 23 42 / 0.75)"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M118 208 C 146 164, 194 136, 252 131" pathLength={1} className="vs-draw vs-anim" />
              <path
                d="M252 131 C 232 151, 207 166, 177 176"
                pathLength={1}
                className="vs-draw vs-anim"
                style={{ animationDelay: "0.3s" }}
              />
              <path
                d="M118 208 C 138 205, 161 197, 177 176"
                pathLength={1}
                className="vs-draw vs-anim"
                style={{ animationDelay: "0.5s" }}
              />
              <path
                d="M118 208 C 101 218, 86 233, 76 253"
                pathLength={1}
                className="vs-draw vs-anim"
                style={{ animationDelay: "0.7s" }}
              />
              <path
                d="M128 215 C 114 230, 105 245, 100 262"
                pathLength={1}
                className="vs-draw vs-anim"
                style={{ animationDelay: "0.85s" }}
              />
            </g>

            {/* LED trail retraces the wing once the contour is down */}
            <path
              d="M118 208 C 146 164, 194 136, 252 131"
              pathLength={1}
              stroke="rgb(220 38 38 / 0.8)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              className="vs-draw vs-anim"
              style={{ animationDelay: "1.15s" }}
            />

            {/* Head + beak in brand red */}
            <g stroke="#dc2626" strokeWidth="2.25" strokeLinecap="round">
              <path
                d="M252 131 C 267 124, 282 120, 300 120"
                pathLength={1}
                className="vs-draw vs-anim"
                style={{ animationDelay: "1.35s" }}
              />
              <path
                d="M300 120 L 318 113"
                pathLength={1}
                className="vs-draw vs-anim"
                style={{ animationDelay: "1.55s" }}
              />
            </g>

            {/* Anchor points */}
            <g fill="rgb(220 38 38 / 0.6)">
              <circle cx="118" cy="208" r="3.5" className="vs-node vs-anim" />
              <circle cx="177" cy="176" r="3.5" className="vs-node vs-anim" style={{ animationDelay: "-1.1s" }} />
              <circle cx="252" cy="131" r="3.5" className="vs-node vs-anim" style={{ animationDelay: "-2.2s" }} />
            </g>
            <g fill="rgb(15 23 42 / 0.3)">
              <circle cx="76" cy="253" r="2.5" />
              <circle cx="318" cy="113" r="2.5" />
            </g>

            {/* Tiny coordinate markers — the identity-manual read */}
            <g fill="rgb(15 23 42 / 0.35)" fontSize="9" fontFamily="monospace">
              <text x="60" y="264">x·76</text>
              <text x="300" y="104">y·113</text>
            </g>
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
