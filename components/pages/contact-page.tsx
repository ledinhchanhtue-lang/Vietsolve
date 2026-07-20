"use client"

import { useState, type FormEvent } from "react"
import { Check, Loader2, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { PageHero } from "@/components/kit/page-hero"
import { Container, Section } from "@/components/kit/section"
import { siteConfig, readVerified } from "@/lib/site-config"
import { cn } from "@/lib/utils"

/**
 * Contact.
 *
 * Submission is REAL, not simulated. The previous forms across the site ran a
 * `setTimeout`, showed "we'll reply within 24 hours", and discarded every field.
 *
 * Behaviour:
 *  - If NEXT_PUBLIC_CONTACT_ENDPOINT is set, the payload is POSTed there.
 *  - Otherwise the submission composes a pre-filled email to the verified
 *    address, so the enquiry still reaches a human.
 *  On failure the form keeps its values and points the user at the email.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? ""

type Errors = Partial<Record<"name" | "email" | "problem" | "consent", string>>

export function ContactPage() {
  const { t } = useLanguage()
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [errors, setErrors] = useState<Errors>({})

  const email = readVerified(siteConfig.contact.email)
  const phone = readVerified(siteConfig.contact.phone)
  const address = readVerified(siteConfig.contact.address)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const values = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      problem: String(data.get("problem") ?? "").trim(),
      solution: String(data.get("solution") ?? ""),
      timeline: String(data.get("timeline") ?? ""),
      budget: String(data.get("budget") ?? ""),
      details: String(data.get("details") ?? "").trim(),
      consent: data.get("consent") === "on",
    }

    const next: Errors = {}
    if (!values.name) next.name = t.contactPage.errorRequired
    if (!values.email) next.email = t.contactPage.errorRequired
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = t.contactPage.errorEmail
    if (!values.problem) next.problem = t.contactPage.errorRequired
    if (!values.consent) next.consent = t.contactPage.errorConsent

    setErrors(next)
    if (Object.keys(next).length > 0) {
      // Move focus to the first field with a problem
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus()
      return
    }

    setStatus("sending")

    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
        if (!res.ok) throw new Error(String(res.status))
      } else if (email) {
        // No endpoint configured — hand the enquiry to the user's mail client
        // rather than pretending it was sent.
        const subject = `[VietSolve] ${values.company || values.name}`
        const bodyLines = [
          `${t.contactPage.fName}: ${values.name}`,
          `${t.contactPage.fEmail}: ${values.email}`,
          values.phone && `${t.contactPage.fPhone}: ${values.phone}`,
          values.company && `${t.contactPage.fCompany}: ${values.company}`,
          "",
          `${t.contactPage.fProblem}`,
          values.problem,
          "",
          values.solution && `${t.contactPage.fSolution}: ${values.solution}`,
          values.timeline && `${t.contactPage.fTimeline}: ${values.timeline}`,
          values.budget && `${t.contactPage.fBudget}: ${values.budget}`,
          values.details && `\n${t.contactPage.fDetails}\n${values.details}`,
        ].filter(Boolean)

        window.location.href = `mailto:${email}?subject=${encodeURIComponent(
          subject,
        )}&body=${encodeURIComponent(bodyLines.join("\n"))}`
      } else {
        throw new Error("no-channel")
      }

      setStatus("sent")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <>
        <PageHero eyebrow={t.contactPage.eyebrow} heading={t.contactPage.successTitle} />
        <Section surface="dark" className="pt-0">
          <Container>
            <div className="flex max-w-lg items-start gap-4 rounded-stage border border-vs-red/30 bg-vs-red/[0.07] p-8">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-vs-red">
                <Check className="h-4 w-4 text-white" strokeWidth={3} aria-hidden="true" />
              </span>
              <p className="text-[15px] leading-relaxed text-ivory">
                {t.contactPage.successBody}
              </p>
            </div>
          </Container>
        </Section>
      </>
    )
  }

  return (
    <>
      <PageHero
        eyebrow={t.contactPage.eyebrow}
        heading={t.contactPage.heading}
        description={t.contactPage.description}
      />

      <Section surface="dark" className="pt-0" id="brief">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            {/* ---- Verified contact details only ---- */}
            <div>
              <dl className="space-y-8">
                {email && (
                  <div>
                    <dt className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      {t.contactPage.emailLabel}
                    </dt>
                    <dd className="mt-3">
                      <a
                        href={`mailto:${email}`}
                        className="text-lg text-ivory transition-colors duration-hover hover:text-vs-coral"
                      >
                        {email}
                      </a>
                    </dd>
                  </div>
                )}

                {phone && (
                  <div>
                    <dt className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                      <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                      {t.contactPage.phoneLabel}
                    </dt>
                    <dd className="mt-3">
                      <a
                        href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                        className="text-lg text-ivory transition-colors duration-hover hover:text-vs-coral"
                      >
                        {phone}
                      </a>
                    </dd>
                  </div>
                )}

                {address && (
                  <div>
                    <dt className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {t.contactPage.addressLabel}
                    </dt>
                    <dd className="mt-3 text-[15px] leading-relaxed text-vs-steel">
                      {address.line1}
                      <br />
                      {address.line2}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* ---- Form ---- */}
            <form onSubmit={handleSubmit} noValidate className="space-y-7">
              <div className="grid gap-7 sm:grid-cols-2">
                <Field
                  name="name"
                  label={t.contactPage.fName}
                  error={errors.name}
                  required
                  autoComplete="name"
                />
                <Field
                  name="email"
                  type="email"
                  label={t.contactPage.fEmail}
                  error={errors.email}
                  required
                  autoComplete="email"
                />
                <Field
                  name="phone"
                  type="tel"
                  label={t.contactPage.fPhone}
                  optional={t.contactPage.optional}
                  autoComplete="tel"
                />
                <Field
                  name="company"
                  label={t.contactPage.fCompany}
                  optional={t.contactPage.optional}
                  autoComplete="organization"
                />
              </div>

              <Field
                name="problem"
                label={t.contactPage.fProblem}
                error={errors.problem}
                required
                textarea
                rows={3}
              />

              <div className="grid gap-7 sm:grid-cols-3">
                <SelectField
                  name="solution"
                  label={t.contactPage.fSolution}
                  placeholder={t.contactPage.select}
                  options={[
                    t.contactPage.solAiAgent,
                    t.contactPage.solWebsite,
                    t.contactPage.solBranding,
                    t.contactPage.solMedia,
                    t.contactPage.solUndecided,
                  ]}
                />
                <SelectField
                  name="timeline"
                  label={t.contactPage.fTimeline}
                  placeholder={t.contactPage.select}
                  options={[
                    t.contactPage.timeAsap,
                    t.contactPage.time1to3,
                    t.contactPage.time3to6,
                    t.contactPage.timePlanning,
                  ]}
                />
                <SelectField
                  name="budget"
                  label={t.contactPage.fBudget}
                  placeholder={t.contactPage.select}
                  options={[
                    t.contactPage.budgetU50,
                    t.contactPage.budget50to100,
                    t.contactPage.budget100to300,
                    t.contactPage.budgetO300,
                    t.contactPage.budgetAdvise,
                  ]}
                />
              </div>

              <Field
                name="details"
                label={t.contactPage.fDetails}
                optional={t.contactPage.optional}
                textarea
                rows={4}
              />

              <div>
                {/* The whole row is the label, so the tap target is the full
                    line rather than the 18px box. */}
                <label className="flex min-h-[44px] cursor-pointer items-center gap-3 py-1">
                  <input
                    type="checkbox"
                    name="consent"
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? "err-consent" : undefined}
                    className="h-[20px] w-[20px] shrink-0 cursor-pointer rounded border-white/25 bg-transparent accent-vs-red"
                  />
                  <span className="text-[14px] leading-relaxed text-vs-steel">
                    {t.contactPage.fConsent}
                  </span>
                </label>
                {errors.consent && (
                  <p id="err-consent" className="mt-2 text-[13px] text-vs-coral">
                    {errors.consent}
                  </p>
                )}
              </div>

              {status === "error" && (
                <p role="alert" className="text-[14px] text-vs-coral">
                  {t.contactPage.errorSubmit}
                  {email && (
                    <>
                      {" "}
                      <a href={`mailto:${email}`} className="underline">
                        {email}
                      </a>
                    </>
                  )}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-vs-red px-7 text-[15px] font-medium text-white transition-colors duration-hover hover:bg-[#c81727] disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    {t.contactPage.submitting}
                  </>
                ) : (
                  t.contactPage.submit
                )}
              </button>
            </form>
          </div>
        </Container>
      </Section>
    </>
  )
}

/* ---------------------------------------------------------------- */

const inputBase =
  "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-[15px] text-ivory " +
  "placeholder:text-white/25 transition-colors duration-hover " +
  "focus:border-vs-red focus:outline-none"

function Field({
  name,
  label,
  error,
  required,
  optional,
  textarea,
  rows,
  type = "text",
  autoComplete,
}: {
  name: string
  label: string
  error?: string
  required?: boolean
  optional?: string
  textarea?: boolean
  rows?: number
  type?: string
  autoComplete?: string
}) {
  const id = `f-${name}`
  const errId = `err-${name}`
  const Tag = textarea ? "textarea" : "input"

  return (
    <div className={textarea ? "sm:col-span-2" : undefined}>
      {/* Labels are always visible — never placeholder-only */}
      <label htmlFor={id} className="block text-[13px] font-medium text-ivory/80">
        {label}
        {optional && <span className="ml-1.5 font-normal text-white/35">({optional})</span>}
        {required && (
          <span className="ml-1 text-vs-red" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <Tag
        id={id}
        name={name}
        rows={rows}
        {...(!textarea ? { type } : {})}
        autoComplete={autoComplete}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errId : undefined}
        className={cn(
          inputBase,
          "mt-2",
          error ? "border-vs-coral" : "border-white/12",
          textarea && "resize-y",
        )}
      />
      {error && (
        <p id={errId} className="mt-2 text-[13px] text-vs-coral">
          {error}
        </p>
      )}
    </div>
  )
}

function SelectField({
  name,
  label,
  placeholder,
  options,
}: {
  name: string
  label: string
  placeholder: string
  options: string[]
}) {
  const id = `f-${name}`
  return (
    <div>
      <label htmlFor={id} className="block text-[13px] font-medium text-ivory/80">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue=""
        className={cn(inputBase, "mt-2 border-white/12 [&>option]:bg-obsidian")}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}
