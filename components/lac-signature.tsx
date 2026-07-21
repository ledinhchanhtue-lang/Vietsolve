"use client"

import { TechLayer } from "@/components/tech/tech-layer"

/**
 * Chim Lạc — the signature visual moment of the About page.
 *
 * A large light-theme construction drawing of the mark: base silhouette wash,
 * contour that draws itself in, construction geometry, a ring of Đông Sơn-drum
 * concentric motifs at low opacity, anchor points and coordinate markers, and
 * one segmented red signal line retracing the flight path.
 *
 * "Vietnamese identity interpreted through modern technology" — so the drum
 * reference stays abstract (concentric rings + radial ticks), never a museum
 * illustration.
 *
 * All animation is one-shot draw work gated by the TechLayer observer and
 * flattened by prefers-reduced-motion. Decorative: aria-hidden.
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
                return <path key={i} d={`M${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`} />
              })}
            </g>
            <g stroke="rgb(15 23 42 / 0.12)" strokeWidth="1">
              <path d="M240 12 V 468 M12 240 H 468" strokeDasharray="4 8" />
              <path d="M78 402 L 402 78" strokeDasharray="4 8" />
            </g>

            {/* Base silhouette — a warm wash under the line work */}
            <path
              d="M96 300 C 140 236, 210 196, 300 188 C 322 178 344 172 372 172 L 396 162 L 374 180 C 350 184 330 190 306 198 C 276 222 240 240 198 252 C 224 254 244 250 262 244 C 230 270 192 284 150 288 C 128 300 108 318 92 344 C 92 328 93 313 96 300 Z"
              fill="rgb(220 38 38 / 0.05)"
            />

            {/* Contour — draws in when the section arrives */}
            <g
              stroke="rgb(15 23 42 / 0.8)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M96 300 C 140 236, 210 196, 300 188" pathLength={1} className="vs-draw vs-anim" />
              <path
                d="M300 188 C 272 216, 236 236, 198 252"
                pathLength={1}
                className="vs-draw vs-anim"
                style={{ animationDelay: "0.4s" }}
              />
              <path
                d="M96 300 C 124 296, 162 284, 198 252"
                pathLength={1}
                className="vs-draw vs-anim"
                style={{ animationDelay: "0.65s" }}
              />
              <path
                d="M96 300 C 76 314, 60 332, 48 356"
                pathLength={1}
                className="vs-draw vs-anim"
                style={{ animationDelay: "0.9s" }}
              />
              <path
                d="M110 310 C 94 328, 82 346, 76 368"
                pathLength={1}
                className="vs-draw vs-anim"
                style={{ animationDelay: "1.05s" }}
              />
              <path
                d="M126 318 C 116 338, 110 356, 108 376"
                pathLength={1}
                className="vs-draw vs-anim"
                style={{ animationDelay: "1.2s" }}
              />
            </g>

            {/* Head + beak in red */}
            <g stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round">
              <path
                d="M300 188 C 322 178, 344 172, 372 172"
                pathLength={1}
                className="vs-draw vs-anim"
                style={{ animationDelay: "1.4s" }}
              />
              <path
                d="M372 172 L 396 162"
                pathLength={1}
                className="vs-draw vs-anim"
                style={{ animationDelay: "1.6s" }}
              />
            </g>

            {/* Segmented signal line retracing the flight path */}
            <path
              d="M48 356 C 120 300, 210 240, 300 188 C 330 172, 360 166, 396 162"
              pathLength={1}
              stroke="rgb(251 113 133 / 0.65)"
              strokeWidth="1.75"
              strokeDasharray="0.04 0.03"
              fill="none"
              className="vs-draw vs-anim"
              style={{ animationDelay: "1.8s", animationDuration: "2.2s" }}
            />

            {/* Anchor points */}
            <g fill="rgb(220 38 38 / 0.65)">
              <circle cx="96" cy="300" r="4" className="vs-node vs-anim" />
              <circle cx="198" cy="252" r="4" className="vs-node vs-anim" style={{ animationDelay: "-1.2s" }} />
              <circle cx="300" cy="188" r="4" className="vs-node vs-anim" style={{ animationDelay: "-2.4s" }} />
              <circle cx="396" cy="162" r="4" className="vs-node vs-anim" style={{ animationDelay: "-3.1s" }} />
            </g>
            <g fill="rgb(15 23 42 / 0.3)">
              <circle cx="48" cy="356" r="3" />
              <circle cx="108" cy="376" r="3" />
            </g>

            {/* Coordinate markers */}
            <g fill="rgb(15 23 42 / 0.35)" fontSize="10" fontFamily="monospace">
              <text x="30" y="378">48 · 356</text>
              <text x="352" y="150">396 · 162</text>
              <text x="206" y="272">198 · 252</text>
            </g>
          </svg>
        </TechLayer>
      </div>
    </div>
  )
}
