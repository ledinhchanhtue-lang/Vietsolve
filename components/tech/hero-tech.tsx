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

export function HeroTech({ panels }: { panels?: string[] }) {
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

        {/* Layered panel stack — the hero's pseudo-3D moment, replacing the
            earlier flat chip column. One capability per layer, stacked in a
            shared perspective with counter-parallax so the stack drifts against
            the grid and reads as genuinely deeper than the page. xl-only and
            decorative: every label already appears as real content below. */}
        {panels && panels.length > 0 && (
          <div
            className="absolute right-10 top-1/2 hidden w-[300px] xl:block"
            style={{
              perspective: "1100px",
              transform: "translate3d(calc(var(--vs-px) * -0.7), calc(-50% + var(--vs-py) * -0.7), 0)",
            }}
          >
            <div
              className="relative h-[290px]"
              style={{ transformStyle: "preserve-3d", transform: "rotateY(-9deg) rotateX(4deg)" }}
            >
              {panels.slice(0, 4).map((label, i) => {
                /* Front card is fully opaque with the red accent; each layer
                   behind steps up-right, fades and recedes on Z. Shadows do the
                   depth work — no heavy blur layers. */
                const depth = panels.length - 1 - i
                return (
                  <div
                    key={label}
                    className="absolute left-0 right-0 rounded-xl border bg-white/90 p-4 backdrop-blur-sm"
                    style={{
                      top: `${i * 58}px`,
                      transform: `translateZ(${-depth * 34}px) translateX(${depth * 10}px)`,
                      opacity: 1 - depth * 0.16,
                      borderColor: i === 0 ? "rgb(254 202 202)" : "rgb(229 231 235)",
                      boxShadow:
                        i === 0
                          ? "0 18px 34px -18px rgb(220 38 38 / 0.35), 0 4px 10px -6px rgb(15 23 42 / 0.15)"
                          : "0 14px 26px -18px rgb(15 23 42 / 0.35)",
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={
                          i === 0
                            ? "h-2 w-2 rounded-full bg-red-600 vs-node vs-anim"
                            : "h-2 w-2 rounded-full bg-gray-300"
                        }
                      />
                      <span className="text-xs font-semibold tracking-wide text-gray-800">
                        {label}
                      </span>
                    </div>
                    {/* Skeleton content rows — an interface being assembled */}
                    <div className="mt-3 space-y-1.5">
                      <span className={`block h-1.5 rounded-full ${i === 0 ? "w-3/4 bg-red-100" : "w-2/3 bg-gray-100"}`} />
                      <span className="block h-1.5 w-1/2 rounded-full bg-gray-100" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </TechLayer>
  )
}
