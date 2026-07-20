"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Play, RotateCcw, Check } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { Container, SectionEyebrow, SectionHeading } from "@/components/kit/section"
import { cn } from "@/lib/utils"

/**
 * Interactive workflow demo.
 *
 * A front-end simulation of how a request travels through an AI workflow —
 * clearly labelled as a simulation, since there is no live backend behind it.
 *
 * Contract:
 *  - The animation runs on demand, completes, and STOPS. No looping.
 *  - Replay is explicit.
 *  - prefers-reduced-motion → renders the finished state with no stepping.
 *  - Tab list follows the WAI-ARIA tabs pattern (arrow keys, roving tabindex).
 */

type TabId = "retail" | "service" | "b2b"
type Status = "idle" | "running" | "done"

const STEP_MS = 620

export function AiWorkflow() {
  const { t } = useLanguage()
  const [tab, setTab] = useState<TabId>("retail")
  const [status, setStatus] = useState<Status>("idle")
  const [step, setStep] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const flow = t.workflow[tab]
  const steps = [flow.s1, flow.s2, flow.s3, flow.s4, flow.s5, flow.s6, flow.s7]

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  const run = useCallback(() => {
    clearTimers()
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduced) {
      setStep(steps.length)
      setStatus("done")
      return
    }

    setStep(0)
    setStatus("running")
    steps.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStep(i + 1), (i + 1) * STEP_MS))
    })
    timers.current.push(
      setTimeout(() => setStatus("done"), steps.length * STEP_MS + 200),
    )
  }, [clearTimers, steps.length])

  // Reset when the scenario changes; never leave a timer running.
  useEffect(() => {
    clearTimers()
    setStep(0)
    setStatus("idle")
  }, [tab, clearTimers])

  useEffect(() => clearTimers, [clearTimers])

  const tabs: Array<{ id: TabId; label: string }> = [
    { id: "retail", label: t.workflow.tabRetail },
    { id: "service", label: t.workflow.tabService },
    { id: "b2b", label: t.workflow.tabB2B },
  ]

  const onTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
    e.preventDefault()
    const next = e.key === "ArrowRight" ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length
    setTab(tabs[next].id)
    tabRefs.current[next]?.focus()
  }

  const statusLabel =
    status === "running" ? t.workflow.running : status === "done" ? t.workflow.done : t.workflow.idle

  return (
    <section className="surface-graphite py-section" id="live-demo">
      <Container>
        <div className="max-w-3xl">
          <SectionEyebrow>{t.workflow.eyebrow}</SectionEyebrow>
          <SectionHeading className="mt-6 text-ivory">{t.workflow.heading}</SectionHeading>
          <p className="mt-6 text-body-lg leading-relaxed text-vs-steel text-pretty">
            {t.workflow.description}
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label={t.workflow.heading}
          className="mt-12 inline-flex rounded-full border border-white/10 p-1"
        >
          {tabs.map((tb, i) => (
            <button
              key={tb.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              role="tab"
              id={`wf-tab-${tb.id}`}
              aria-selected={tab === tb.id}
              aria-controls={`wf-panel-${tb.id}`}
              tabIndex={tab === tb.id ? 0 : -1}
              onClick={() => setTab(tb.id)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              className={cn(
                "min-h-[40px] rounded-full px-5 text-sm transition-colors duration-hover",
                tab === tb.id ? "bg-vs-red text-white" : "text-ivory/60 hover:text-ivory",
              )}
            >
              {tb.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`wf-panel-${tab}`}
          aria-labelledby={`wf-tab-${tab}`}
          className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_1fr]"
        >
          {/* ---- Node graph ---- */}
          <div className="rounded-stage border border-white/[0.08] bg-obsidian/60 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                Workflow
              </span>
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    status === "running"
                      ? "bg-vs-red animate-node-pulse"
                      : status === "done"
                        ? "bg-emerald-400"
                        : "bg-white/25",
                  )}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-vs-steel">
                  {statusLabel}
                </span>
              </span>
            </div>

            <ol className="relative mt-7">
              <span className="absolute left-[9px] top-3 h-[calc(100%-24px)] w-px bg-white/10" aria-hidden="true">
                <span
                  className="block w-px bg-vs-red transition-all duration-500 ease-smooth"
                  style={{ height: `${(step / steps.length) * 100}%` }}
                />
              </span>

              {steps.map((label, i) => {
                const complete = step > i
                const current = status === "running" && step === i
                return (
                  <li key={label} className="relative flex items-start gap-4 pb-5 last:pb-0">
                    <span
                      className={cn(
                        "relative z-10 mt-0.5 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        complete
                          ? "border-vs-red bg-vs-red"
                          : current
                            ? "border-vs-red bg-obsidian"
                            : "border-white/20 bg-obsidian",
                      )}
                    >
                      {complete ? (
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      ) : current ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-vs-red animate-node-pulse" />
                      ) : (
                        <span className="font-mono text-[9px] text-white/35">{i + 1}</span>
                      )}
                    </span>
                    <span
                      className={cn(
                        "pt-px text-[14px] leading-snug transition-colors duration-300",
                        complete ? "text-ivory" : current ? "text-ivory" : "text-white/35",
                      )}
                    >
                      {label}
                    </span>
                  </li>
                )
              })}
            </ol>

            <div className="mt-7 flex items-center gap-3">
              <button
                type="button"
                onClick={run}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-vs-red px-5 text-sm font-medium text-white transition-colors duration-hover hover:bg-[#c81727]"
              >
                {status === "idle" ? (
                  <>
                    <Play className="h-4 w-4" aria-hidden="true" />
                    {t.workflow.run}
                  </>
                ) : (
                  <>
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    {t.workflow.replay}
                  </>
                )}
              </button>
              <p className="text-xs text-white/35">{t.workflow.demoNote}</p>
            </div>
          </div>

          {/* ---- Log + output ---- */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-stage border border-white/[0.08] bg-obsidian/60 p-6 sm:p-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                {t.workflow.logTitle}
              </span>

              <div
                className="mt-5 min-h-[168px] space-y-2"
                aria-live="polite"
                aria-atomic="false"
              >
                {steps.slice(0, step).map((label, i) => (
                  <p
                    key={label}
                    className="flex gap-3 font-mono text-[11px] leading-relaxed text-vs-steel animate-fade-up"
                  >
                    <span className="shrink-0 text-white/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ivory/70">{label}</span>
                  </p>
                ))}
                {step === 0 && (
                  <p className="font-mono text-[11px] text-white/25">—</p>
                )}
              </div>
            </div>

            <div
              className={cn(
                "rounded-stage border p-6 transition-colors duration-500 sm:p-8",
                status === "done"
                  ? "border-vs-red/35 bg-vs-red/[0.07]"
                  : "border-white/[0.08] bg-obsidian/60",
              )}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                {t.workflow.outputTitle}
              </span>
              <p
                className={cn(
                  "mt-3 text-[15px] leading-relaxed transition-colors duration-500",
                  status === "done" ? "text-ivory" : "text-white/25",
                )}
              >
                {status === "done" ? flow.output : "—"}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
