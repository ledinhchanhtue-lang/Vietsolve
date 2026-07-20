"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/i18n"
import { Container, SectionEyebrow, SectionHeading } from "@/components/kit/section"
import { osSteps } from "@/lib/content/capabilities"
import { cn } from "@/lib/utils"

/**
 * The VietSolve Operating System — Diagnose → Design → Build → Integrate → Optimize.
 *
 * A single data path runs through five nodes. The active node is driven by
 * scroll position (the animation is tied to content, not decoration), and the
 * path fills as the reader progresses. Mobile collapses to the same vertical
 * timeline at a tighter rhythm.
 *
 * Replaces the old three-step "Khám phá – Thiết kế – Triển khai", which didn't
 * describe integration or ongoing optimisation at all.
 */
export function OperatingSystem({
  /** Homepage uses `compact`: name + one sentence, no deliverable chips. */
  compact = false,
  eyebrow,
  heading,
}: {
  compact?: boolean
  eyebrow?: string
  heading?: string
} = {}) {
  const { t, lang } = useLanguage()
  const [active, setActive] = useState(0)
  const stepRefs = useRef<Array<HTMLLIElement | null>>([])

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLLIElement[]
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the middle of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          const idx = els.indexOf(visible[0].target as HTMLLIElement)
          if (idx >= 0) setActive(idx)
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="surface-dark py-section" id="how-we-build">
      <Container>
        <div className="max-w-3xl">
          <SectionEyebrow>{eyebrow ?? t.os.eyebrow}</SectionEyebrow>
          <SectionHeading className="mt-5 text-ivory">{heading ?? t.os.heading}</SectionHeading>
        </div>

        {/* Horizontal progress rail — desktop only */}
        <div className="mt-14 hidden lg:block" aria-hidden="true">
          <div className="flex items-center gap-3">
            {osSteps.map((s, i) => (
              <div key={s.index} className="flex flex-1 items-center gap-3">
                <span
                  className={cn(
                    "h-2 w-2 shrink-0 rounded-full transition-colors duration-500 ease-smooth",
                    i <= active ? "bg-vs-red" : "bg-white/20",
                  )}
                />
                <span
                  className={cn(
                    "font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-500",
                    i === active ? "text-ivory" : i < active ? "text-white/50" : "text-white/25",
                  )}
                >
                  {s.name[lang]}
                </span>
                {i < osSteps.length - 1 && (
                  <span className="ml-1 h-px flex-1 bg-white/10">
                    <span
                      className="block h-px bg-vs-red transition-all duration-700 ease-smooth"
                      style={{ width: i < active ? "100%" : "0%" }}
                    />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <ol className="relative mt-14 lg:mt-20">
          {/* The path itself */}
          <span
            className="absolute left-[7px] top-2 h-full w-px bg-white/10 lg:left-[11px]"
            aria-hidden="true"
          >
            <span
              className="block w-px bg-vs-red transition-all duration-700 ease-smooth"
              style={{ height: `${((active + 1) / osSteps.length) * 100}%` }}
            />
          </span>

          {osSteps.map((step, i) => {
            const on = i <= active
            const isActive = i === active
            return (
              <li
                key={step.index}
                ref={(el) => {
                  stepRefs.current[i] = el
                }}
                className={cn(
                  "relative pl-10 last:pb-0 lg:pl-16",
                  compact ? "pb-9 lg:pb-12" : "pb-14 lg:pb-20",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 transition-all duration-500 ease-smooth lg:h-6 lg:w-6",
                    on ? "border-vs-red bg-obsidian" : "border-white/20 bg-obsidian",
                    isActive && "scale-110",
                  )}
                  aria-hidden="true"
                >
                  {isActive && (
                    <span className="absolute inset-[3px] rounded-full bg-vs-red lg:inset-[5px]" />
                  )}
                </span>

                <div
                  className={cn(
                    "grid gap-6",
                    !compact && "lg:grid-cols-[1.2fr_1fr] lg:gap-14",
                  )}
                >
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span
                        className={cn(
                          "font-mono text-xs tracking-[0.14em] transition-colors duration-500",
                          on ? "text-vs-red" : "text-white/30",
                        )}
                      >
                        {step.index}
                      </span>
                      <h3
                        className={cn(
                          "font-display text-2xl font-medium transition-colors duration-500 lg:text-3xl",
                          on ? "text-ivory" : "text-white/40",
                        )}
                      >
                        {step.name[lang]}
                      </h3>
                    </div>
                    <p
                      className={cn(
                        "mt-4 max-w-lg text-[15px] leading-relaxed text-pretty transition-colors duration-500 lg:text-base",
                        on ? "text-vs-steel" : "text-white/30",
                      )}
                    >
                      {step.description[lang]}
                    </p>
                  </div>

                  {/* Deliverable chips are detail — /services and /ai-systems
                      show them; the homepage timeline stays to one line each. */}
                  {!compact && (
                    <div className="lg:pt-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                        {t.os.deliverables}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {step.deliverables[lang].map((d) => (
                          <li
                            key={d}
                            className={cn(
                              "rounded-full border px-3 py-1.5 font-mono text-[11px] transition-colors duration-500",
                              on
                                ? "border-white/12 text-ivory/70"
                                : "border-white/[0.06] text-white/25",
                            )}
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
