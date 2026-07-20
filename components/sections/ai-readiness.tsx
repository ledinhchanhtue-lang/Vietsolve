"use client"

import { useState } from "react"
import { RotateCcw, ChevronDown } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { Container, Section, SectionEyebrow, SectionHeading } from "@/components/kit/section"
import { TextLink } from "@/components/kit/buttons"
import { cn } from "@/lib/utils"

/**
 * AI Readiness assessment.
 *
 * Replaces the old ROI calculator, which projected figures like "$92,000 annual
 * revenue" and "1840% ROI" from hardcoded multipliers while claiming to be
 * "based on actual performance data from our current clients".
 *
 * This asks five factual yes/no questions and returns a qualitative stage —
 * no currency, no invented savings, no personal data collected.
 */
export function AiReadiness({
  /** Collapsed by default so it doesn't stretch the page before anyone opts in. */
  collapsible = false,
}: {
  collapsible?: boolean
} = {}) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(!collapsible)
  const [answers, setAnswers] = useState<Array<boolean | null>>([null, null, null, null, null])

  const questions = [t.readiness.q1, t.readiness.q2, t.readiness.q3, t.readiness.q4, t.readiness.q5]

  const answered = answers.filter((a) => a !== null).length
  const complete = answered === questions.length
  const score = answers.filter(Boolean).length

  const result = complete
    ? score <= 2
      ? { title: t.readiness.exploringTitle, body: t.readiness.exploringBody, level: 1 }
      : score <= 4
        ? { title: t.readiness.readyTitle, body: t.readiness.readyBody, level: 2 }
        : { title: t.readiness.scalableTitle, body: t.readiness.scalableBody, level: 3 }
    : null

  const setAnswer = (i: number, value: boolean) =>
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? value : a)))

  return (
    <Section surface="graphite">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionEyebrow>{t.readiness.eyebrow}</SectionEyebrow>
            <SectionHeading className="mt-6 text-ivory">{t.readiness.heading}</SectionHeading>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-vs-steel text-pretty">
              {t.readiness.description}
            </p>

            {collapsible && (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="readiness-panel"
                className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 px-5 text-sm text-ivory transition-colors duration-hover hover:bg-white/[0.06]"
              >
                {open ? t.readiness.hide : t.readiness.start}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-ui",
                    open && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>
            )}

            {/* Progress */}
            {open && (
              <div className="mt-8">
                <div className="h-px w-full max-w-xs bg-white/10">
                  <div
                    className="h-px bg-vs-red transition-all duration-500 ease-smooth"
                    style={{ width: `${(answered / questions.length) * 100}%` }}
                  />
                </div>
                <p className="mt-3 font-mono text-[11px] text-white/40">
                  {answered} / {questions.length}
                </p>
              </div>
            )}
          </div>

          <div id="readiness-panel" hidden={!open}>
            <ol className="space-y-px overflow-hidden rounded-stage border border-white/[0.08] bg-white/[0.06]">
              {questions.map((q, i) => (
                <li
                  key={q}
                  className="flex flex-col gap-4 bg-graphite p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <span className="flex gap-4">
                    <span className="font-mono text-[11px] text-vs-red">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] leading-snug text-ivory/90 text-pretty">{q}</span>
                  </span>

                  <span
                    className="flex shrink-0 gap-2"
                    role="group"
                    aria-label={q}
                  >
                    <Choice
                      selected={answers[i] === true}
                      onClick={() => setAnswer(i, true)}
                      label={t.readiness.yes}
                    />
                    <Choice
                      selected={answers[i] === false}
                      onClick={() => setAnswer(i, false)}
                      label={t.readiness.no}
                    />
                  </span>
                </li>
              ))}
            </ol>

            {result && (
              <div
                className="mt-6 rounded-stage border border-vs-red/30 bg-vs-red/[0.07] p-7 lg:p-9"
                aria-live="polite"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-vs-red">
                  {t.readiness.result}
                </p>

                <div className="mt-3 flex items-baseline gap-3">
                  <h3 className="font-display text-2xl font-medium text-ivory">{result.title}</h3>
                  <span className="flex gap-1" aria-hidden="true">
                    {[1, 2, 3].map((lvl) => (
                      <span
                        key={lvl}
                        className={cn(
                          "h-1.5 w-6 rounded-full",
                          lvl <= result.level ? "bg-vs-red" : "bg-white/15",
                        )}
                      />
                    ))}
                  </span>
                </div>

                <p className="mt-4 text-[15px] leading-relaxed text-ivory/80 text-pretty">
                  {result.body}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-6">
                  <TextLink href="/contact" onDark>
                    {t.readiness.discuss}
                  </TextLink>
                  <button
                    type="button"
                    onClick={() => setAnswers([null, null, null, null, null])}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45 transition-colors duration-hover hover:text-ivory"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    {t.readiness.restart}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}

function Choice({
  selected,
  onClick,
  label,
}: {
  selected: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "min-h-[40px] rounded-full border px-4 text-[13px] transition-colors duration-hover",
        selected
          ? "border-vs-red bg-vs-red text-white"
          : "border-white/12 text-ivory/60 hover:border-white/25 hover:text-ivory",
      )}
    >
      {label}
    </button>
  )
}
