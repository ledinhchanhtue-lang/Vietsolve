import { cn } from "@/lib/utils"
import type { ReactNode, ElementType } from "react"

/** Page-width container. One source of truth for horizontal rhythm. */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode
  className?: string
  size?: "default" | "narrow" | "wide"
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 md:px-8 lg:px-12 xl:px-[72px]",
        size === "default" && "max-w-[1360px]",
        size === "narrow" && "max-w-[900px]",
        size === "wide" && "max-w-[1560px]",
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Small uppercase label above a heading. The only place we use all-caps. */
export function SectionEyebrow({
  children,
  className,
  tone = "red",
}: {
  children: ReactNode
  className?: string
  tone?: "red" | "muted"
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] font-medium uppercase tracking-[0.16em] sm:text-xs",
        tone === "red" ? "text-vs-red" : "text-vs-steel",
        className,
      )}
    >
      {children}
    </p>
  )
}

/**
 * Section heading. `accent` highlights exactly one phrase in red —
 * never combined with gradient + glow + underline on the same words.
 */
export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
  size = "h2",
}: {
  children: ReactNode
  className?: string
  as?: ElementType
  size?: "h1" | "h2" | "h3"
}) {
  return (
    <Tag
      className={cn(
        "font-display font-semibold text-balance",
        size === "h1" && "text-h1",
        size === "h2" && "text-h2",
        size === "h3" && "text-h3",
        className,
      )}
    >
      {children}
    </Tag>
  )
}

/** Lead paragraph under a heading. */
export function SectionLead({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p className={cn("max-w-2xl text-body-lg leading-relaxed text-pretty", className)}>
      {children}
    </p>
  )
}

/** Standard section wrapper with consistent vertical rhythm and surface. */
export function Section({
  children,
  className,
  surface = "light",
  id,
  ...rest
}: {
  children: ReactNode
  className?: string
  surface?: "light" | "dark" | "graphite" | "ivory"
  id?: string
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-section",
        surface === "dark" && "surface-dark",
        surface === "graphite" && "surface-graphite",
        surface === "ivory" && "surface-ivory",
        surface === "light" && "bg-white text-obsidian",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  )
}
