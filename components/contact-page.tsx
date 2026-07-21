"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Check, Loader2, AlertCircle, ArrowRight, Clock } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { siteConfig, readVerified } from "@/lib/site-config"
import { projects } from "@/lib/content/projects"
import { PrimaryButton, SecondaryButton } from "@/components/ui-kit/button"
import { TechLayer } from "@/components/tech/tech-layer"
import { TechDivider } from "@/components/tech/tech-divider"
import { IconTile } from "@/components/ui-kit/icon-tile"
import { SelectableChip } from "@/components/ui-kit/chip"
import { cn } from "@/lib/utils"

/**
 * Contact — a two-column consultation experience.
 *
 * Left: brief guide (verified email, response time, topics, what-happens-next).
 * Right: the form card.
 *
 * Submission is real: POSTs to NEXT_PUBLIC_CONTACT_ENDPOINT when configured,
 * otherwise opens a pre-filled mail draft to the verified address. It never
 * fakes success, and it never clears the user's input on failure.
 */

const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? ""

type Status = "idle" | "sending" | "sent" | "error"
type Errors = Partial<Record<"name" | "email" | "phone" | "type" | "message" | "consent", string>>

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  type: "",
  budget: "",
  timeline: "",
  message: "",
  consent: false,
}

export default function ContactPage() {
  const { t, lang } = useLanguage()
  const [form, setForm] = useState({ ...EMPTY })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>("idle")

  const email = readVerified(siteConfig.contact.email)
  const phone = readVerified(siteConfig.contact.phone)
  const address = readVerified(siteConfig.contact.address)

  const projectTypes = [
    t.contact.typeBranding,
    t.contact.typeMarketing,
    t.contact.typeMedia,
    t.contact.typeWebsite,
    t.contact.typeAi,
    t.contact.typeUndecided,
  ]

  const topics = [
    t.contact.topic1,
    t.contact.topic2,
    t.contact.topic3,
    t.contact.topic4,
    t.contact.topic5,
    t.contact.topic6,
  ]

  const steps = [t.contact.next1, t.contact.next2, t.contact.next3]

  /* Preselect the project type when arriving from /services?service=…
     Read once on mount; static export means we can't use server searchParams. */
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("service")
    if (!param) return
    const map: Record<string, string> = {
      branding: t.contact.typeBranding,
      "branding-strategy": t.contact.typeBranding,
      marketing: t.contact.typeMarketing,
      "marketing-growth": t.contact.typeMarketing,
      media: t.contact.typeMedia,
      "media-creative": t.contact.typeMedia,
      website: t.contact.typeWebsite,
      "website-digital": t.contact.typeWebsite,
      ai: t.contact.typeAi,
      "ai-automation": t.contact.typeAi,
      consulting: t.contact.typeUndecided,
    }
    const matched = map[param.toLowerCase()]
    if (matched) setForm((prev) => (prev.type ? prev : { ...prev, type: matched }))
    // Intentionally mount-only: re-running on language change would clobber a
    // choice the user has already made.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const set = (key: keyof typeof EMPTY, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key as keyof Errors]) setErrors((prev) => ({ ...prev, [key]: "" }))
  }

  const validate = () => {
    const next: Errors = {}
    if (!form.name.trim()) next.name = t.contact.errName
    if (!form.email.trim()) next.email = t.contact.errEmail
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t.contact.errEmailFormat
    if (!form.phone.trim()) next.phone = t.contact.errPhone
    if (!form.type) next.type = t.contact.errType
    if (!form.message.trim()) next.message = t.contact.errMessage
    if (!form.consent) next.consent = t.contact.errConsent
    setErrors(next)
    return next
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = validate()
    if (Object.keys(found).length > 0) {
      /* Move focus to the first invalid field once React has committed the
         error state. A macrotask is used rather than rAF: rAF is throttled in
         background tabs and can be skipped entirely, leaving the user with
         announced errors but no idea which field to fix. */
      const first = Object.keys(found)[0]
      setTimeout(() => {
        const el = document.getElementById(`f-${first}`)
        el?.focus({ preventScroll: true })
        el?.scrollIntoView({ block: "center", behavior: "smooth" })
      }, 0)
      return
    }

    setStatus("sending")
    try {
      if (CONTACT_ENDPOINT) {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error(String(res.status))
      } else if (email) {
        const body = [
          `${t.contact.fName}: ${form.name}`,
          `${t.contact.fEmail}: ${form.email}`,
          `${t.contact.fPhone}: ${form.phone}`,
          form.company && `${t.contact.fCompany}: ${form.company}`,
          form.role && `${t.contact.fRole}: ${form.role}`,
          `${t.contact.fType}: ${form.type}`,
          form.budget && `${t.contact.fBudget}: ${form.budget}`,
          form.timeline && `${t.contact.fTimeline}: ${form.timeline}`,
          "",
          form.message,
        ]
          .filter(Boolean)
          .join("\n")
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(
          `[VietSolve] ${form.company || form.name}`,
        )}&body=${encodeURIComponent(body)}`
      } else {
        throw new Error("no-channel")
      }
      setStatus("sent")
      setForm({ ...EMPTY })
    } catch {
      // Keep every value the user typed — never reset on failure.
      setStatus("error")
    }
  }

  return (
    <main id="main" className="bg-white">
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/60 via-white to-gray-50/60" />

        {/* Was a one-off inline grid. Now the shared level-2 pattern plus a
            contour motif, so the conversion page reads as part of the same
            system as the hero instead of a page that decorates itself. */}
        <TechLayer>
          <div className="absolute inset-0 vs-grid-2 vs-mask-corner opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(30rem_22rem_at_88%_10%,rgb(220_38_38/0.09),transparent_72%)]" />

          {/* Contour lines drawn from the arc of the Lạc bird's wing — the
              motif from the logo, reduced to an energy path. Desktop only:
              at 375px this would sit under the headline. */}
          <svg
            className="vs-desktop absolute inset-0 h-full w-full"
            viewBox="0 0 1440 420"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <g stroke="rgb(15 23 42 / 0.07)" strokeWidth="1" fill="none">
              <path d="M760 452 C 900 300, 1080 250, 1300 268" />
              <path d="M790 452 C 930 288, 1110 232, 1340 246" />
              <path d="M820 452 C 960 276, 1140 214, 1380 224" />
            </g>
            <path
              d="M790 452 C 930 288, 1110 232, 1340 246"
              stroke="rgb(220 38 38 / 0.7)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              className="vs-dash vs-anim"
            />
            <g fill="rgb(220 38 38 / 0.5)">
              <circle cx="1300" cy="268" r="4" className="vs-node vs-anim" />
              <circle cx="1340" cy="246" r="4" className="vs-node vs-anim" style={{ animationDelay: "-1.4s" }} />
              <circle cx="1380" cy="224" r="4" className="vs-node vs-anim" style={{ animationDelay: "-2.6s" }} />
            </g>
          </svg>
        </TechLayer>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-xs sm:text-sm font-semibold text-red-600 uppercase tracking-wider">
              {t.contact.eyebrow}
            </p>
            {/* No forced <br/> — text-balance distributes the lines so the last
                word never sits alone. */}
            <h1 className="mt-4 max-w-3xl text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.14] text-balance">
              {t.contact.title1} {t.contact.title2}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-600 leading-relaxed">{t.contact.desc}</p>
            <p className="mt-6 font-mono text-xs sm:text-sm tracking-wide text-gray-400">
              {t.contact.tags}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------- Two-column body ---------------- */}
      <section id="contact-form" className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[42fr_58fr] lg:gap-14 items-start">
            {/* ---- Left: brief guide. On mobile it moves below the form. ---- */}
            <div className="order-2 lg:order-1 space-y-8">
              {/* Verified channels only */}
              <div className="space-y-4">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="group relative overflow-hidden vs-scan flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:border-red-200 hover:shadow-sm"
                  >
                    <IconTile icon={Mail} size="sm" />
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-gray-500">
                        {t.contact.emailLabel}
                      </span>
                      <span className="mt-1 block font-semibold text-gray-900 group-hover:text-red-600 transition-colors break-all">
                        {email}
                      </span>
                    </span>
                  </a>
                )}

                <div className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5">
                  <IconTile icon={Clock} size="sm" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-gray-500">
                      {t.contact.responseLabel}
                    </span>
                    <span className="mt-1 block font-semibold text-gray-900">
                      {t.contact.responseValue}
                    </span>
                  </span>
                </div>

                {phone && (
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className="group relative overflow-hidden vs-scan flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 font-semibold text-gray-900 transition-all duration-300 hover:border-red-200 hover:shadow-sm"
                  >
                    <IconTile icon={Phone} size="sm" />
                    {phone}
                  </a>
                )}
                {address && (
                  <div className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 text-gray-700">
                    <IconTile icon={MapPin} size="sm" />
                    <span>
                      {address.line1}
                      <br />
                      {address.line2}
                    </span>
                  </div>
                )}
              </div>

              {/* Topics */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                  {t.contact.topicsTitle}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-3 text-gray-600">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What happens next — small timeline, not big cards */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                  {t.contact.nextTitle}
                </h2>
                <ol className="relative mt-4">
                  {steps.map((step, i) => (
                    <motion.li
                      key={step}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.45, delay: i * 0.12 }}
                      className="relative flex gap-4 pb-5 last:pb-0"
                    >
                      {i < steps.length - 1 && (
                        /* Connector reads as a signal path rather than a plain
                           rule: it fades from brand red at the node it leaves
                           to neutral at the node it reaches. */
                        <span
                          className="absolute left-[11px] top-7 h-full w-px bg-gradient-to-b from-red-300 to-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-bold text-red-600 ring-1 ring-red-100">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 leading-relaxed text-gray-600">{step}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </div>

            {/* ---- Right: form card ---- */}
            {/* The offset plate behind the card is what gives it depth — the
                card reads as lifted off the page instead of printed on it. */}
            <div className="relative order-1 lg:order-2">
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl border border-red-100/80 bg-gradient-to-br from-red-50/70 to-gray-50"
              />
              {status === "sent" ? (
                <SuccessCard
                  title={t.contact.successTitle}
                  body={t.contact.successBody}
                  cta={t.contact.successCta}
                />
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  /* The card is the focal object on this page, so it gets the
                     depth: a warmer shadow, a hairline that turns red as soon
                     as any field is focused, and a lit top edge. */
                  className="group/card relative isolate overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_18px_46px_-24px_rgba(15,23,42,0.28)] transition-colors duration-300 focus-within:border-red-200 sm:p-8 lg:p-10"
                >
                  {/* Top edge glow */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent"
                  />
                  {/* Inner gradient — a few percent of warmth at the top of the
                      card so it does not read as a flat white rectangle. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-red-50/70 to-transparent"
                  />

                  <div className="mb-7">
                    <h2 className="text-xl font-bold text-gray-900">{t.contact.formTitle}</h2>
                    <p className="mt-1.5 text-sm text-gray-500">{t.contact.formHint}</p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      name="name"
                      label={t.contact.fName}
                      error={errors.name}
                      required
                      value={form.name}
                      onChange={(v) => set("name", v)}
                      autoComplete="name"
                    />
                    <Field
                      name="email"
                      type="email"
                      label={t.contact.fEmail}
                      error={errors.email}
                      required
                      value={form.email}
                      onChange={(v) => set("email", v)}
                      autoComplete="email"
                    />
                    <Field
                      name="phone"
                      type="tel"
                      label={t.contact.fPhone}
                      error={errors.phone}
                      required
                      value={form.phone}
                      onChange={(v) => set("phone", v)}
                      autoComplete="tel"
                    />
                    <Field
                      name="company"
                      label={t.contact.fCompany}
                      optional={t.contact.optional}
                      value={form.company}
                      onChange={(v) => set("company", v)}
                      autoComplete="organization"
                    />
                    <Field
                      name="role"
                      label={t.contact.fRole}
                      optional={t.contact.optional}
                      value={form.role}
                      onChange={(v) => set("role", v)}
                      autoComplete="organization-title"
                      className="sm:col-span-2"
                    />
                  </div>

                  {/* Project type — selectable chips, keyboard accessible */}
                  <fieldset className="mt-7">
                    <legend className="text-sm font-semibold text-gray-900">
                      {t.contact.fType} <span className="text-red-600">*</span>
                    </legend>
                    <div
                      id="f-type"
                      tabIndex={-1}
                      role="radiogroup"
                      aria-label={t.contact.fType}
                      aria-required="true"
                      aria-invalid={Boolean(errors.type)}
                      aria-describedby={errors.type ? "err-type" : undefined}
                      className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-4 rounded-xl"
                    >
                      {/* Shared chip component — the selected state (red hairline,
                          tinted fill, inner glow, filled check) now lives in one
                          place instead of an inline class string. */}
                      {projectTypes.map((type) => (
                        <SelectableChip
                          key={type}
                          selected={form.type === type}
                          onSelect={() => set("type", type)}
                        >
                          {type}
                        </SelectableChip>
                      ))}
                    </div>
                    {errors.type && (
                      <p role="alert" id="err-type" className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {errors.type}
                      </p>
                    )}
                  </fieldset>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <SelectField
                      name="budget"
                      label={t.contact.fBudget}
                      optional={t.contact.optional}
                      placeholder={t.contact.budgetSelect}
                      value={form.budget}
                      onChange={(v) => set("budget", v)}
                      options={[
                        t.contact.budget1,
                        t.contact.budget2,
                        t.contact.budget3,
                        t.contact.budget4,
                        t.contact.budget5,
                      ]}
                    />
                    <SelectField
                      name="timeline"
                      label={t.contact.fTimeline}
                      optional={t.contact.optional}
                      placeholder={t.contact.timeSelect}
                      value={form.timeline}
                      onChange={(v) => set("timeline", v)}
                      options={[t.contact.time1, t.contact.time2, t.contact.time3, t.contact.time4]}
                    />
                  </div>

                  <div className="mt-7">
                    <label htmlFor="f-message" className="block text-sm font-semibold text-gray-900">
                      {t.contact.fMessage} <span className="text-red-600">*</span>
                    </label>
                    <p className="mt-1 text-sm text-gray-500">{t.contact.messageHelper}</p>
                    <textarea
                      id="f-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      aria-required="true"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "err-message" : undefined}
                      className={cn(
                        "mt-2.5 w-full resize-y rounded-xl border bg-white px-4 py-3 text-gray-900 transition-colors",
                        "focus:outline-none focus:ring-2 focus:ring-red-600/25",
                        errors.message ? "border-red-500 focus:border-red-600" : "border-gray-300 focus:border-red-600",
                      )}
                    />
                    {errors.message && (
                      <p id="err-message" role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-7">
                    <label className="flex min-h-[44px] cursor-pointer items-center gap-3">
                      <input
                        id="f-consent"
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => set("consent", e.target.checked)}
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={errors.consent ? "err-consent" : undefined}
                        className="h-5 w-5 shrink-0 cursor-pointer rounded border-gray-300 accent-red-600"
                      />
                      <span className="text-sm leading-relaxed text-gray-600">
                        {t.contact.consent}{" "}
                        <Link href="/privacy" className="text-red-600 underline hover:text-red-700">
                          {t.contact.consentLink}
                        </Link>
                        .
                      </span>
                    </label>
                    {errors.consent && (
                      <p role="alert" id="err-consent" className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <div
                      role="alert"
                      className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm"
                    >
                      <p className="font-semibold text-red-700">{t.contact.errorTitle}</p>
                      {email && (
                        <p className="mt-1 text-red-600">
                          {t.contact.errorFallback}{" "}
                          <a href={`mailto:${email}`} className="underline font-medium">
                            {email}
                          </a>
                        </p>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={cn(
                      "group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-8 font-semibold text-white",
                      "min-h-[52px] transition-all duration-200 ease-out",
                      /* Same sweep + bloom as every other primary on the site */
                      "vs-sweep vs-glow-soft",
                      "hover:bg-red-700 hover:-translate-y-px active:translate-y-0",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
                      "disabled:opacity-60 disabled:pointer-events-none",
                    )}
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        {t.contact.submitting}
                      </>
                    ) : (
                      <>
                        {status === "error" ? t.contact.errorRetry : t.contact.submit}
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Selected work strip ---------------- */}
      {projects.length > 0 && (
        <section className="relative overflow-hidden border-t border-gray-200 bg-gray-50 py-12 lg:py-16">
          {/* The connective line the brief asks for: it carries the eye from
              the form down into the footer instead of leaving a hard seam. */}
          <TechDivider variant="plain" className="absolute inset-x-0 top-0" />
          <TechLayer>
            <div className="absolute inset-0 vs-grid-1 vs-mask-up" />
          </TechLayer>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                {t.contact.workStripTitle}
              </h2>
              <Link
                href="/case-studies"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
              >
                {t.featured.viewAll}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-gray-200 bg-gray-200 sm:grid-cols-4">
              {projects.slice(0, 4).map((p) => (
                <li key={p.slug} className="bg-white px-5 py-7 text-center">
                  <span className="block font-bold text-gray-900">{p.name}</span>
                  <span className="mt-1 block text-xs uppercase tracking-wider text-gray-500">
                    {p.industry[lang]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  )
}

/* ------------------------------------------------------------------ */

function SuccessCard({ title, body, cta }: { title: string; body: string; cta: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-green-200 bg-green-50/50 p-8 text-center shadow-sm sm:p-12"
      role="status"
    >
      {/* A line runs across the top of the card once the message is away —
          the visual full-stop on the submission. */}
      <TechDivider variant="plain" className="absolute inset-x-0 top-0" />

      {/* vs-ring emits a slow expanding ring from the check mark. Green, not
          red: this is a system confirmation, not a brand moment. */}
      <span className="vs-ring vs-anim relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600">
        <Check className="h-7 w-7 text-white" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <h2 className="mt-6 text-2xl font-bold text-gray-900">{title}</h2>
      <p className="mt-3 text-gray-600 leading-relaxed">{body}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <PrimaryButton href="/case-studies">{cta}</PrimaryButton>
        <SecondaryButton href="/">VietSolve</SecondaryButton>
      </div>
    </motion.div>
  )
}

/* Focus is the only state that glows: red hairline plus a 4px soft bloom, so
   the active field is unmistakable without every field looking active. */
const inputCls =
  "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-gray-900 " +
  "transition-[border-color,box-shadow] duration-200 " +
  "min-h-[48px] focus:outline-none focus:border-red-500 " +
  "focus:shadow-[0_0_0_4px_rgba(220,38,38,0.10),0_0_12px_-4px_rgba(220,38,38,0.5)]"

function Field({
  name,
  label,
  value,
  onChange,
  error,
  required,
  optional,
  type = "text",
  autoComplete,
  className,
}: {
  name: string
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  required?: boolean
  optional?: string
  type?: string
  autoComplete?: string
  className?: string
}) {
  const id = `f-${name}`
  return (
    <div className={className}>
      {/* Label is always visible — never a placeholder standing in for it */}
      <label htmlFor={id} className="block text-sm font-semibold text-gray-900">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
        {optional && <span className="ml-1.5 font-normal text-gray-400">({optional})</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `err-${name}` : undefined}
        className={cn(
          inputCls,
          error ? "border-red-500 focus:border-red-600" : "border-gray-300 focus:border-red-600",
        )}
      />
      {error && (
        <p id={`err-${name}`} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

function SelectField({
  name,
  label,
  value,
  onChange,
  placeholder,
  options,
  optional,
}: {
  name: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  options: string[]
  optional?: string
}) {
  const id = `f-${name}`
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-900">
        {label}
        {optional && <span className="ml-1.5 font-normal text-gray-400">({optional})</span>}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputCls, "border-gray-300 focus:border-red-600")}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}
