"use client"

import { useEffect, useRef } from "react"

export default function MouseMoveEffect() {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    let x = 0
    let y = 0

    const render = () => {
      frame = 0
      const el = overlayRef.current
      if (el) {
        el.style.background = `radial-gradient(600px at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      x = event.clientX
      y = event.clientY
      // Throttle to one update per animation frame instead of one per event
      if (!frame) frame = requestAnimationFrame(render)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={overlayRef} className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300" />
}
