"use client"

import { TechLayer } from "@/components/tech/tech-layer"
import { LOGO_BIRD_PATH, LOGO_TEXT_PATH, LOGO_VIEWBOX } from "@/lib/lac-path"

/**
 * Signature visual moment of the About page — the full logo as a large
 * wireframe construction drawing.
 *
 * Real geometry (traced from the logo PNG, lib/lac-path), OUTLINE ONLY — no
 * fill, that is what keeps the technology read. The bird contour draws itself
 * in red when the section scrolls into view, the wordmark follows in charcoal,
 * all over a faint Đông Sơn ring motif. Then everything stands still.
 *
 * Gated by the TechLayer observer; flattened under prefers-reduced-motion.
 * Decorative: aria-hidden.
 */
export function LacSignatureVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-xl">
      <div className="relative aspect-square">
        <TechLayer className="overflow-visible">
          {/* Đông Sơn motif — concentric rings + radial ticks, kept faint */}
          <svg viewBox="0 0 480 480" className="absolute inset-0 h-full w-full" fill="none">
            <g stroke="rgb(15 23 42 / 0.07)" strokeWidth="1">
              <circle cx="240" cy="240" r="228" />
              <circle cx="240" cy="240" r="196" />
              <circle cx="240" cy="240" r="150" />
              <circle cx="240" cy="240" r="96" />
              {Array.from({ length: 24 }).map((_, i) => {
                const a = (i * Math.PI * 2) / 24
                const x1 = 240 + Math.cos(a) * 196
                const y1 = 240 + Math.sin(a) * 196
                const x2 = 240 + Math.cos(a) * 210
                const y2 = 240 + Math.sin(a) * 210
                return (
                  <path
                    key={i}
                    d={`M${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`}
                  />
                )
              })}
            </g>
            <g stroke="rgb(15 23 42 / 0.12)" strokeWidth="1">
              <path d="M240 12 V 468 M12 240 H 468" strokeDasharray="4 8" />
            </g>

            {/* Anchor pulses where the axes meet the outer ring */}
            <g fill="rgb(220 38 38 / 0.5)">
              <circle cx="240" cy="44" r="3.5" className="vs-node vs-anim" />
              <circle cx="436" cy="240" r="3.5" className="vs-node vs-anim" style={{ animationDelay: "-1.3s" }} />
              <circle cx="240" cy="436" r="3.5" className="vs-node vs-anim" style={{ animationDelay: "-2.4s" }} />
              <circle cx="44" cy="240" r="3.5" className="vs-node vs-anim" style={{ animationDelay: "-3.2s" }} />
            </g>

            {/* Coordinate markers — identity-manual annotation */}
            <g fill="rgb(15 23 42 / 0.35)" fontSize="10" fontFamily="monospace">
              <text x="252" y="40">240 · 44</text>
              <text x="330" y="454">1080 × 1080</text>
            </g>
          </svg>

          {/* The full logo — wireframe only, bird in red then wordmark in
              charcoal. Wide mark on a square drum: centred, ~86% width. */}
          <svg
            viewBox={LOGO_VIEWBOX}
            className="absolute left-1/2 top-1/2 h-auto w-[86%] -translate-x-1/2 -translate-y-1/2"
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
              style={{ animationDuration: "2s" }}
            />
            <path
              d={LOGO_TEXT_PATH}
              pathLength={1}
              stroke="rgb(15 23 42 / 0.75)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="vs-draw vs-anim"
              style={{ animationDuration: "2.4s", animationDelay: "1s" }}
            />
          </svg>
        </TechLayer>
      </div>
    </div>
  )
}
