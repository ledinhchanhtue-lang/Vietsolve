import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ReactNode, ButtonHTMLAttributes } from "react"

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-all duration-hover ease-smooth " +
  "min-h-[44px] px-6 py-3 text-[15px] " +
  "disabled:opacity-50 disabled:pointer-events-none"

/** Solid red. Reserved for the single primary action in a view. */
const primary = cn(base, "bg-vs-red text-white hover:bg-[#c81727] active:bg-[#b01423]")

/** Transparent with a hairline. Adapts to the surface it sits on. */
const secondaryOnDark = cn(
  base,
  "border border-white/20 text-ivory hover:bg-white/[0.07] hover:border-white/30",
)
const secondaryOnLight = cn(
  base,
  "border border-black/15 text-obsidian hover:bg-black/[0.04] hover:border-black/25",
)

type CommonProps = {
  children: ReactNode
  className?: string
  href?: string
  /** External links open in a new tab with safe rel */
  external?: boolean
  withArrow?: boolean
}

function Inner({ children, withArrow }: { children: ReactNode; withArrow?: boolean }) {
  return (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-hover ease-smooth group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  )
}

export function PrimaryButton({
  children,
  className,
  href,
  external,
  withArrow = true,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn("group", primary, className)

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        <Inner withArrow={withArrow}>{children}</Inner>
      </a>
    ) : (
      <Link href={href} className={classes}>
        <Inner withArrow={withArrow}>{children}</Inner>
      </Link>
    )
  }

  return (
    <button className={classes} {...rest}>
      <Inner withArrow={withArrow}>{children}</Inner>
    </button>
  )
}

export function SecondaryButton({
  children,
  className,
  href,
  external,
  withArrow = false,
  onDark = false,
  ...rest
}: CommonProps & { onDark?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn("group", onDark ? secondaryOnDark : secondaryOnLight, className)

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        <Inner withArrow={withArrow}>{children}</Inner>
      </a>
    ) : (
      <Link href={href} className={classes}>
        <Inner withArrow={withArrow}>{children}</Inner>
      </Link>
    )
  }

  return (
    <button className={classes} {...rest}>
      <Inner withArrow={withArrow}>{children}</Inner>
    </button>
  )
}

/** Inline text link with a nudging arrow. */
export function TextLink({
  children,
  href,
  className,
  onDark = false,
  external,
}: CommonProps & { onDark?: boolean }) {
  const classes = cn(
    "group inline-flex items-center gap-1.5 text-[15px] font-medium",
    "border-b border-transparent pb-0.5 transition-colors duration-hover",
    onDark
      ? "text-ivory hover:border-vs-coral hover:text-vs-coral"
      : "text-obsidian hover:border-vs-red hover:text-vs-red",
    className,
  )

  const content = (
    <>
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-hover ease-smooth group-hover:translate-x-1"
        aria-hidden="true"
      />
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href ?? "#"} className={classes}>
      {content}
    </Link>
  )
}
