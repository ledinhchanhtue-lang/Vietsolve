"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useRef, useEffect } from "react"

interface GlowButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  onClick?: () => void
  type?: "button" | "submit"
  magnetic?: boolean
  ripple?: boolean
}

export default function GlowButton({
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
  type = "button",
  magnetic = false,
  ripple = false,
}: GlowButtonProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)

  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    if (!magnetic || !buttonRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return
      const rect = buttonRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

      // Magnetic radius: 80px
      if (distance < 80) {
        setIsHovering(true)
        const strength = 0.3
        setMousePosition({
          x: distanceX * strength,
          y: distanceY * strength,
        })
      } else if (isHovering) {
        setIsHovering(false)
        setMousePosition({ x: 0, y: 0 })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [magnetic, isHovering])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()

      setRipples((prev) => [...prev, { x, y, id }])

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, 600)
    }

    onClick?.()
  }

  return (
    <div
      ref={buttonRef}
      className="relative group"
      style={{
        transform: magnetic ? `translate(${mousePosition.x}px, ${mousePosition.y}px)` : undefined,
        transition: magnetic ? "transform 0.2s ease-out" : undefined,
      }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300 group-hover:duration-200" />
      <Button
        type={type}
        variant={variant}
        size={size}
        className={cn(
          "relative bg-vietsolve-red hover:bg-vietsolve-burgundy text-white border-0 transition-all duration-200 overflow-hidden",
          className,
        )}
        onClick={handleClick}
      >
        {ripple &&
          ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 0,
                height: 0,
              }}
            />
          ))}
        {children}
      </Button>
    </div>
  )
}
