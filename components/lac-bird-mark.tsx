"use client"

import { TechLayer } from "@/components/tech/tech-layer"

/**
 * Lạc bird — brand signature, drawn as construction line-art.
 *
 * The About page previously illustrated "Biểu tượng chim Lạc" with Lucide's
 * shield glyph: a shield standing in for the bird on the national drum. This
 * draws the motif properly — the swept wing, the long tail, the beak — as a
 * geometric construction over a blueprint grid, the way an identity manual
 * would present a mark.
 *
 * It is a stylised interpretation for the About page, not the logo itself; the
 * logo is never redrawn, only referenced. Decorative, so aria-hidden.
 */
export function LacBirdMark({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/15 bg-white/5">
        <TechLayer>
          {/* Construction grid, drawn in the card's own light */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />
        </TechLayer>

        <svg viewBox="0 0 240 240" className="relative h-full w-full" aria-hidden="true">
          {/* Construction geometry — the circles the curves are struck from */}
          <g stroke="rgb(255 255 255 / 0.16)" strokeWidth="1" fill="none">
            <circle cx="120" cy="120" r="92" />
            <circle cx="120" cy="120" r="58" />
            <path d="M120 20 V 220 M20 120 H 220" strokeDasharray="4 7" />
            <path d="M48 190 L 200 52" strokeDasharray="4 7" />
          </g>

          {/* Body and swept wing */}
          <g stroke="#fff" strokeWidth="2.25" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M62 152 C 84 118, 122 96, 168 92" />
            <path d="M168 92 C 152 108, 132 120, 108 128" />
            <path d="M62 152 C 78 150, 96 144, 108 128" />
            {/* Tail feathers */}
            <path d="M62 152 C 48 160, 36 172, 28 188" />
            <path d="M70 158 C 58 170, 50 182, 46 196" />
            <path d="M80 162 C 72 176, 68 188, 66 202" />
          </g>

          {/* Head and beak — the one red element */}
          <g stroke="#f87171" strokeWidth="2.25" fill="none" strokeLinecap="round">
            <path d="M168 92 C 180 86, 192 82, 206 82" />
            <path d="M206 82 L 220 76" />
          </g>
          <circle cx="180" cy="88" r="3" fill="#f87171" />

          {/* Junction nodes on the construction points */}
          <g fill="rgb(255 255 255 / 0.55)">
            <circle cx="62" cy="152" r="3" className="vs-node vs-anim" />
            <circle cx="108" cy="128" r="3" className="vs-node vs-anim" style={{ animationDelay: "-1.3s" }} />
            <circle cx="168" cy="92" r="3" className="vs-node vs-anim" style={{ animationDelay: "-2.5s" }} />
          </g>
        </svg>
      </div>
    </div>
  )
}
