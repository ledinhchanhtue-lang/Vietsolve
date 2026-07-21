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

        {/* Agency Operating Table — four artifact modules (brand board, media
            timeline, website browser, AI agent panel) stacked with depth, with
            an LED rail lighting Brand → Media → Website → AI once on load.
            Hovering a module brings it forward and dims the others. Each is an
            interface demo, labelled as such — no client data, no numbers.
            xl-only; the labels are real content elsewhere on the page. */}
        {panels && panels.length > 0 && (
          <div
            className="absolute right-10 top-1/2 hidden w-[320px] xl:block"
            style={{
              perspective: "1100px",
              transform: "translate3d(calc(var(--vs-px) * -0.7), calc(-50% + var(--vs-py) * -0.7), 0)",
            }}
          >
            {/* LED rail — one dot per module, lit in sequence, then steady */}
            <div className="absolute -left-6 top-2 bottom-2 flex flex-col items-center" aria-hidden="true">
              <span className="w-px flex-1 bg-gray-200" />
            </div>
            <div
              className="group/stack pointer-events-auto relative"
              style={{ transformStyle: "preserve-3d", transform: "rotateY(-8deg) rotateX(3deg)" }}
            >
              {panels.slice(0, 4).map((label, i) => {
                const KIND = ["brand", "media", "browser", "ai"][i]
                const depth = panels.length - 1 - i
                return (
                  <div
                    key={label}
                    className="relative mb-2.5 rounded-xl border bg-white/95 p-3.5 backdrop-blur-sm transition-all duration-300 group-hover/stack:opacity-55 hover:!opacity-100 hover:-translate-y-1 hover:z-20"
                    style={{
                      transform: `translateZ(${-depth * 26}px) translateX(${depth * 8}px)`,
                      borderColor: i === 0 ? "rgb(254 202 202)" : "rgb(229 231 235)",
                      boxShadow:
                        i === 0
                          ? "0 16px 30px -18px rgb(220 38 38 / 0.35), 0 4px 10px -6px rgb(15 23 42 / 0.15)"
                          : "0 12px 24px -18px rgb(15 23 42 / 0.3)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {/* Sequence LED — lights in load order, then stays on */}
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-red-600 shadow-[0_0_5px_rgba(220,38,38,0.7)] vs-anim"
                          style={{ animation: `vs-fill-in 0.4s ease-out ${0.5 + i * 0.45}s backwards` }}
                        />
                        <span className="text-[11px] font-semibold tracking-wide text-gray-800">{label}</span>
                      </div>
                      <span className="text-[9px] font-medium uppercase tracking-wider text-gray-300">
                        Interface demo
                      </span>
                    </div>

                    {/* Artifact content per module */}
                    {KIND === "brand" && (
                      <div className="mt-2.5 flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-sm font-bold text-gray-800">Aa</span>
                        <span className="h-8 w-8 rounded-md bg-red-600" />
                        <span className="h-8 w-8 rounded-md bg-gray-900" />
                        <span className="h-8 w-8 rounded-md border border-gray-200 bg-gray-100" />
                        <span className="ml-1 space-y-1">
                          <span className="block h-1.5 w-16 rounded-full bg-gray-200" />
                          <span className="block h-1.5 w-10 rounded-full bg-red-100" />
                        </span>
                      </div>
                    )}
                    {KIND === "media" && (
                      <div className="relative mt-2.5 space-y-1">
                        <div className="flex gap-1">
                          <span className="h-3.5 w-14 rounded-sm bg-gray-200" />
                          <span className="h-3.5 w-8 rounded-sm bg-red-500/80" />
                          <span className="h-3.5 w-16 rounded-sm bg-gray-200" />
                          <span className="h-3.5 w-6 rounded-sm bg-gray-300" />
                        </div>
                        <div className="flex gap-1">
                          <span className="h-3.5 w-8 rounded-sm bg-gray-100" />
                          <span className="h-3.5 w-20 rounded-sm bg-gray-200" />
                          <span className="h-3.5 w-10 rounded-sm bg-red-100" />
                        </div>
                        {/* Playhead */}
                        <span className="absolute -top-1 bottom-0 left-[38%] w-px bg-red-600" />
                      </div>
                    )}
                    {KIND === "browser" && (
                      <div className="mt-2.5 overflow-hidden rounded-md border border-gray-200">
                        <div className="flex h-4 items-center gap-1 border-b border-gray-200 bg-gray-50 px-1.5">
                          <span className="h-1 w-1 rounded-full bg-gray-300" />
                          <span className="h-1 w-1 rounded-full bg-gray-300" />
                          <span className="ml-1 h-1 flex-1 rounded-full bg-gray-200" />
                        </div>
                        <div className="space-y-1 p-1.5">
                          <span className="block h-2.5 w-3/5 rounded-sm bg-red-100" />
                          <span className="block h-1.5 w-4/5 rounded-full bg-gray-100" />
                          <span className="block h-1.5 w-2/3 rounded-full bg-gray-100" />
                        </div>
                      </div>
                    )}
                    {KIND === "ai" && (
                      <div className="mt-2.5 space-y-1.5">
                        <span className="block w-3/4 rounded-lg rounded-bl-sm bg-gray-100 px-2 py-1">
                          <span className="block h-1.5 w-full rounded-full bg-gray-300" />
                        </span>
                        <span className="ml-auto block w-2/3 rounded-lg rounded-br-sm bg-red-50 px-2 py-1 ring-1 ring-red-100">
                          <span className="block h-1.5 w-full rounded-full bg-red-200" />
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-1.5 py-0.5 text-[9px] font-semibold text-gray-500">
                          <span className="h-1 w-1 rounded-full bg-red-600" /> → CRM
                        </span>
                      </div>
                    )}
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
