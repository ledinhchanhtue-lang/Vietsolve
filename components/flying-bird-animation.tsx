"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

export function FlyingBirdAnimation() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      setParticles((prev) => [
        ...prev.slice(-20), // Keep only last 20 particles for performance
        {
          id: Date.now(),
          x: Math.random() * 40 - 20, // Random x offset
          y: Math.random() * 40 - 20, // Random y offset
        },
      ])
    }, 100)

    return () => clearInterval(interval)
  }, [isAnimating])

  useEffect(() => {
    // Reset animation every 8 seconds
    const resetInterval = setInterval(() => {
      setIsAnimating(false)
      setParticles([])
      setTimeout(() => setIsAnimating(true), 1000)
    }, 8000)

    return () => clearInterval(resetInterval)
  }, [])

  if (!isAnimating) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Bird */}
      <motion.div
        className="absolute top-1/3"
        initial={{ x: "-10%", y: 0, opacity: 0 }}
        animate={{
          x: "110%",
          y: [0, -30, -10, -40, 0],
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{
          duration: 7,
          ease: "easeInOut",
          times: [0, 0.1, 0.3, 0.6, 1],
        }}
      >
        <motion.div
          animate={{
            rotate: [0, -5, 5, -5, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Image src="/bird-vietsolve.png" alt="Flying bird" width={60} height={60} className="drop-shadow-lg" />
        </motion.div>

        {/* Particle trail */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: "linear-gradient(135deg, #C94A4A, #5A2A3A)",
              left: particle.x,
              top: particle.y,
            }}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{
              opacity: 0,
              scale: 0,
              x: -50,
              y: particle.y + 20,
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
