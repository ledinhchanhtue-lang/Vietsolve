"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import { TechLayer } from "@/components/tech/tech-layer"

/**
 * Hero backdrop — the densest use of the pattern system (level 2).
 *
 * Sits above the video's white wash and below the copy: grid, three signal
 * traces with light running through them, pulsing junction nodes, and a warm
 * red bloom in the top-right corner.
 *
 * Parallax is opt-in by device, not by breakpoint: it only binds on a fine
 * pointer (so it never runs on touch) and only when motion is allowed. It
 * writes two CSS variables from inside a rAF, so a burst of pointermove events
 * still produces at most one style write per frame, and the transform it drives
 * is compositor-only.
 */

/* Drawn twice — once as a static hairline for structure, once as a short bright
   dash travelling along it. Separate <path> elements rather than <use>, because
   animating an inherited stroke-dashoffset through a shadow tree is not
   something to rely on. */
const TRACES = [
  { d: "M-40 168 H 372 L 436 104 H 800 L 872 176 H 1480", stroke: "rgb(220 38 38 / 0.85)", delay: "0s" },
  { d: "M-40 552 H 300 L 372 616 H 764 L 836 548 H 1480", stroke: "rgb(220 38 38 / 0.7)", delay: "-4s" },
  /* One cyan trace, and only one — the tech read comes from the geometry, not
     from turning the palette blue. */
  { d: "M1180 -40 V 128 L 1116 192 V 372 L 1188 444 V 740", stroke: "rgb(6 182 212 / 0.45)", delay: "-7.5s" },
]

const NODES = [
  { cx: 436, cy: 104, delay: "0s" },
  { cx: 872, cy: 176, delay: "-1.2s" },
  { cx: 372, cy: 616, delay: "-2.4s" },
  { cx: 1116, cy: 192, delay: "-0.6s" },
]

export function HeroTech({ chips }: { chips?: string[] }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia("(pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    let x = 0
    let y = 0

    const apply = () => {
      frame = 0
      el.style.setProperty("--vs-px", `${x.toFixed(2)}px`)
      el.style.setProperty("--vs-py", `${y.toFixed(2)}px`)
    }

    const onMove = (e: PointerEvent) => {
      // ±10px total travel. Enough to feel like depth, small enough that nobody
      // consciously notices the background moving while they read.
      x = (e.clientX / window.innerWidth - 0.5) * 20
      y = (e.clientY / window.innerHeight - 0.5) * 20
      if (!frame) frame = requestAnimationFrame(apply)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const base = { "--vs-px": "0px", "--vs-py": "0px" } as CSSProperties

  return (
    <TechLayer>
      <div ref={ref} className="absolute inset-0" style={base}>
        {/* Warm bloom, top-right — the one place red is allowed to spread */}
        <div className="absolute inset-0 bg-[radial-gradient(32rem_24rem_at_85%_6%,rgb(220_38_38/0.10),transparent_70%)]" />

        {/* Level 2 grid, faded out behind the headline */}
        <div
          className="absolute inset-0 vs-grid-2 vs-mask-center opacity-90"
          style={{
            transform: "translate3d(calc(var(--vs-px) * 0.35), calc(var(--vs-py) * 0.35), 0)",
          }}
        />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 700"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          style={{ transform: "translate3d(var(--vs-px), var(--vs-py), 0)" }}
        >
          <g stroke="rgb(15 23 42 / 0.08)" strokeWidth="1">
            {TRACES.map((tr) => (
              <path key={tr.d} d={tr.d} />
            ))}
          </g>

          <g strokeWidth="2" strokeLinecap="round" fill="none">
            {TRACES.map((tr) => (
              <path
                key={tr.d}
                d={tr.d}
                stroke={tr.stroke}
                className="vs-dash vs-anim"
                style={{ animationDelay: tr.delay }}
              />
            ))}
          </g>

          <g fill="rgb(220 38 38 / 0.55)">
            {NODES.map((n) => (
              <circle
                key={`${n.cx}-${n.cy}`}
                cx={n.cx}
                cy={n.cy}
                r="4"
                className="vs-node vs-anim"
                style={{ animationDelay: n.delay }}
              />
            ))}
          </g>
        </svg>

        {/* Capability chips — only where there is genuinely spare canvas (xl and
            up, bottom-right gutter). Decorative: the layer is aria-hidden, and
            every one of these words already appears as real content further
            down the page. */}
        {chips && chips.length > 0 && (
          <div
            className="absolute bottom-10 right-8 hidden xl:flex flex-col items-end gap-2"
            style={{
              transform: "translate3d(calc(var(--vs-px) * -0.6), calc(var(--vs-py) * -0.6), 0)",
            }}
          >
            {chips.map((chip, i) => (
              <span
                key={chip}
                className="flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/70 px-3 py-1.5 text-[11px] font-medium tracking-wide text-gray-500 backdrop-blur-sm"
                style={{ opacity: 0.9 - i * 0.12 }}
              >
                <span
                  className="h-1 w-1 rounded-full bg-red-600 vs-node vs-anim"
                  style={{ animationDelay: `${-i * 0.9}s` }}
                />
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
    </TechLayer>
  )
}
