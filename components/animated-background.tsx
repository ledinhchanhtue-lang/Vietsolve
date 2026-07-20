"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      // Canvas is position:fixed, so it only needs to cover the viewport,
      // not the entire (potentially huge) document height.
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Ambient color orbs that drift across the viewport
    const orbs = [
      { x: 0, y: 0, radius: 400, color: "59, 130, 246", speed: 0.3, angle: 0, offsetY: 0 }, // blue
      { x: 0, y: 0, radius: 350, color: "147, 51, 234", speed: 0.2, angle: Math.PI, offsetY: 100 }, // purple
      { x: 0, y: 0, radius: 300, color: "34, 197, 94", speed: 0.25, angle: Math.PI / 2, offsetY: 200 }, // green
      { x: 0, y: 0, radius: 320, color: "236, 72, 153", speed: 0.28, angle: Math.PI * 0.7, offsetY: 300 }, // pink
    ]

    let animationId: number
    let time = 0
    let lastFrame = 0
    const frameInterval = 1000 / 30 // cap at ~30fps to cut CPU/GPU load

    const animate = (now: number) => {
      animationId = requestAnimationFrame(animate)
      if (now - lastFrame < frameInterval) return
      lastFrame = now

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      orbs.forEach((orb) => {
        // Move orbs in circular patterns across the viewport
        orb.angle += orb.speed * 0.01
        orb.x = canvas.width / 2 + Math.cos(orb.angle + time) * (canvas.width * 0.4)
        orb.y = canvas.height / 2 + Math.sin(orb.angle + time) * (canvas.height * 0.35)

        // Create gradient
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
        gradient.addColorStop(0, `rgba(${orb.color}, 0.08)`)
        gradient.addColorStop(0.5, `rgba(${orb.color}, 0.04)`)
        gradient.addColorStop(1, `rgba(${orb.color}, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(orb.x - orb.radius, orb.y - orb.radius, orb.radius * 2, orb.radius * 2)
      })
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}
