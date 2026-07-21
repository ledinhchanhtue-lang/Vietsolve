"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * VietSolve logo with an LED trace.
 *
 * The light is a gradient masked with the logo PNG itself, so it travels along
 * the Lạc bird's own outline rather than sweeping a rectangle across it. The
 * mark is never recoloured, redrawn, stretched or made to blink — the only
 * thing that changes is light passing over it, plus a soft red drop-shadow that
 * fades in over ~450ms and back out.
 *
 * The intro sweep fires once per session, not once per mount: every page
 * renders its own <Navbar>, so a module-level flag is what stops the animation
 * replaying on each client-side navigation.
 */
let introPlayed = false

export function LedLogo({
  src,
  alt,
  width,
  height,
  className,
  /** Footer sits on charcoal — use the white-cored sweep there. */
  invert = false,
  priority = false,
  /** Opt out of the one-shot intro (footer logo is below the fold on load). */
  intro = true,
}: {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  invert?: boolean
  priority?: boolean
  intro?: boolean
}) {
  const [showIntro, setShowIntro] = useState(intro && !introPlayed)

  useEffect(() => {
    if (!showIntro) return
    introPlayed = true
    // Drop the flag once the keyframes finish (0.4s delay + 1.3s run) so the
    // intro rule stops competing with :hover for the same element.
    const id = window.setTimeout(() => setShowIntro(false), 1800)
    return () => window.clearTimeout(id)
  }, [showIntro])

  return (
    <span className="vs-logo">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={className}
      />
      <span
        className={cn("vs-logo-led", invert && "vs-logo-led-invert")}
        data-intro={showIntro ? "true" : undefined}
        style={{
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
        }}
      />
    </span>
  )
}
