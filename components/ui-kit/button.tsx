"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ReactNode, ButtonHTMLAttributes, MouseEventHandler } from "react"

/**
 * Button system — one source of truth for the whole site.
 *
 * Four kinds only: Primary, Secondary, TextLink, IconButton.
 * Sizes follow the spec: desktop 48–52px, mobile min 44px tap target.
 * Hover is restrained — arrow nudges 4px, lift max 1px, no glow.
 */

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full " +
  "transition-all duration-200 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 " +
  "disabled:opacity-60 disabled:pointer-events-none"

/** Solid red. One primary action per view.
 *  vs-sweep sends a thin light band under the label on hover; vs-glow-soft adds
 *  a low red bloom below the button. Both are hover-only — a button that glows
 *  permanently stops reading as "this is the action". */
const primaryCls = cn(
  base,
  "bg-red-600 text-white px-7 min-h-[48px] shadow-sm",
  "hover:bg-red-700 hover:-translate-y-px active:translate-y-0",
  "vs-sweep vs-glow-soft",
)

/** White/transparent with a charcoal hairline.
 *  vs-fill wipes a faint red tint in from the left instead of a flat colour
 *  swap, so the two button kinds share one motion language. */
const secondaryCls = cn(
  base,
  "bg-white text-gray-900 border border-gray-300 px-7 min-h-[48px]",
  "hover:border-red-300",
  "vs-fill",
)

type Common = {
  children: ReactNode
  className?: string
  href?: string
  external?: boolean
  /** Primary shows an arrow by default; turn off for short labels. */
  withArrow?: boolean
}

function Inner({ children, withArrow }: { children: ReactNode; withArrow?: boolean }) {
  return (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  )
}

function renderAs(
  classes: string,
  href: string | undefined,
  external: boolean | undefined,
  content: ReactNode,
  rest: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  if (href) {
    /* onClick has to survive the link branch: the mobile drawer's CTA relies on
       it to close the menu, and it was previously dropped on the floor here
       because only the <button> branch spread `rest`. */
    const { onClick, "aria-label": ariaLabel } = rest
    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    ) : (
      <Link
        href={href}
        className={classes}
        onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    )
  }
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  )
}

export function PrimaryButton({
  children,
  className,
  href,
  external,
  withArrow = true,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return renderAs(
    cn("group", primaryCls, className),
    href,
    external,
    <Inner withArrow={withArrow}>{children}</Inner>,
    rest,
  )
}

export function SecondaryButton({
  children,
  className,
  href,
  external,
  withArrow = false,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return renderAs(
    cn("group", secondaryCls, className),
    href,
    external,
    <Inner withArrow={withArrow}>{children}</Inner>,
    rest,
  )
}

/** Inline link with a nudging arrow. Underline on hover, not a faint opacity shift. */
export function TextLink({
  children,
  href,
  className,
  external,
  onClick,
  /** Use when several links share the same visible label but different targets. */
  ariaLabel,
}: Common & { onClick?: () => void; ariaLabel?: string }) {
  /* min-h-11 keeps these standalone CTAs at a 44px tap target. (Links sitting
     inside a sentence are exempt under WCAG 2.5.8's inline exception and are
     styled separately.) */
  /* vs-underline draws a red→coral rule left-to-right on hover. `relative` is
     required — the rule is a positioned pseudo-element. */
  const classes = cn(
    "group relative vs-underline inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-red-600",
    "transition-colors duration-200 hover:text-red-700",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 rounded-sm",
    className,
  )

  const content = (
    <>
      {children}
      <ArrowRight
        className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
        aria-hidden="true"
      />
    </>
  )

  if (!href) {
    return (
      <button type="button" onClick={onClick} aria-label={ariaLabel} className={classes}>
        {content}
      </button>
    )
  }

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} aria-label={ariaLabel} className={classes}>
      {content}
    </Link>
  )
}

/** Icon-only control. Always 44×44 minimum with an accessible label. */
export function IconButton({
  children,
  label,
  className,
  href,
  ...rest
}: {
  children: ReactNode
  label: string
  className?: string
  href?: string
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(
    "inline-flex h-11 w-11 items-center justify-center rounded-full",
    "text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
    className,
  )

  if (href) {
    return (
      <Link href={href} aria-label={label} title={label} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" aria-label={label} title={label} className={classes} {...rest}>
      {children}
    </button>
  )
}
