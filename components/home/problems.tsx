"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/i18n"
import { Container, SectionEyebrow, SectionHeading } from "@/components/kit/section"
import { cn } from "@/lib/utils"

/**
 * The real problem.
 *
 * Editorial three-column layout, not three identical cards. The visual makes
 * the argument literally: scattered points connect into one system as the
 * section enters view, then stops.
 */
export function Problems() {
  const { t } = useLanguage()

  const items = [
    { n: "01", title: t.problems.p1Title, body: t.problems.p1Body },
    { n: "02", title: t.problems.p2Title, body: t.problems.p2Body },
    { n: "03", title: t.problems.p3Title, body: t.problems.p3Body },
  ]

  return (
    <section className="surface-graphite py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <div>
            <SectionEyebrow>{t.problems.eyebrow}</SectionEyebrow>
            <SectionHeading className="mt-6 text-ivory">
              <span className="block">{t.problems.headingLine1}</span>
              <span className="block text-white/45">{t.problems.headingLine2}</span>
            </SectionHeading>
            <p className="mt-7 max-w-xl text-body-lg leading-relaxed text-vs-steel text-pretty">
              {t.problems.body}
            </p>
          </div>

          <div className="lg:pt-8">
            <ConnectionVisual
              disconnectedLabel={t.problems.disconnected}
              connectedLabel={t.problems.connected}
            />
          </div>
        </div>

        <ol className="mt-20 grid gap-px overflow-hidden rounded-stage border border-white/[0.08] bg-white/[0.07] md:grid-cols-3">
          {items.map((item) => (
            <li key={item.n} className="bg-graphite p-8 lg:p-10">
              <span className="font-mono text-xs tracking-[0.14em] text-vs-red">{item.n}</span>
              <h3 className="mt-5 font-display text-xl font-medium leading-snug text-ivory">
                {item.title}
              </h3>
              <p className="mt-3.5 text-[15px] leading-relaxed text-vs-steel text-pretty">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

/* ---------------------------------------------------------------- */

const POINTS = [
  { x: 40, y: 46 },
  { x: 148, y: 28 },
  { x: 258, y: 62 },
  { x: 92, y: 130 },
  { x: 200, y: 118 },
  { x: 300, y: 152 },
  { x: 56, y: 206 },
  { x: 168, y: 212 },
  { x: 272, y: 236 },
]

/** Edges drawn once the section is in view, in sequence. */
const LINKS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [1, 4],
  [4, 5],
  [2, 5],
  [3, 6],
  [6, 7],
  [4, 7],
  [7, 8],
  [5, 8],
]

function ConnectionVisual({
  disconnectedLabel,
  connectedLabel,
}: {
  disconnectedLabel: string
  connectedLabel: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setConnected(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setConnected(true)
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <div className="relative aspect-[340/270] w-full rounded-stage border border-white/[0.08] bg-obsidian/50">
        <svg viewBox="0 0 340 270" className="h-full w-full" aria-hidden="true">
          {LINKS.map(([a, b], i) => {
            const p1 = POINTS[a]
            const p2 = POINTS[b]
            return (
              <line
                key={`${a}-${b}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={i % 4 === 0 ? "#E21B2D" : "rgba(244,241,234,0.28)"}
                strokeWidth={i % 4 === 0 ? 1.4 : 1}
                style={{
                  transition: `stroke-dashoffset 700ms cubic-bezier(0.22,1,0.36,1) ${i * 90}ms, opacity 400ms ease ${i * 90}ms`,
                  strokeDasharray: 400,
                  strokeDashoffset: connected ? 0 : 400,
                  opacity: connected ? 1 : 0,
                }}
              />
            )
          })}

          {POINTS.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={4}
              fill={connected ? "#F4F1EA" : "rgba(244,241,234,0.4)"}
              className="transition-[fill] duration-700 ease-smooth"
            />
          ))}
        </svg>
      </div>

      <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em]">
        <span className={cn("transition-colors duration-500", connected ? "text-white/30" : "text-vs-steel")}>
          {disconnectedLabel}
        </span>
        <span className={cn("transition-colors duration-500", connected ? "text-vs-red" : "text-white/30")}>
          {connectedLabel}
        </span>
      </div>
    </div>
  )
}
