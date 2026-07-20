import type { ReactNode } from "react"
import { Container, SectionEyebrow } from "@/components/kit/section"

/**
 * Shared hero for internal pages.
 * Keeps typography, spacing and surface identical across the site — the
 * previous pages each invented their own hero treatment.
 */
export function PageHero({
  eyebrow,
  heading,
  description,
  children,
}: {
  eyebrow: string
  heading: ReactNode
  description?: string
  children?: ReactNode
}) {
  return (
    <section className="surface-dark relative overflow-hidden pb-16 pt-32 lg:pb-24 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-32 top-10 h-[440px] w-[440px] rounded-full opacity-[0.12] blur-[110px]"
        style={{ background: "radial-gradient(circle, #E21B2D 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-h1 font-semibold text-balance text-ivory">
          {heading}
        </h1>
        {description && (
          <p className="mt-7 max-w-2xl text-body-lg leading-relaxed text-vs-steel text-pretty">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  )
}
