"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

interface CountingStatsProps {
  stats: Array<{
    value: number
    suffix: string
    label: string
  }>
}

export default function CountingStats({ stats }: CountingStatsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat, index) => {
        let start = 0
        const end = stat.value
        const duration = 2000
        const increment = end / (duration / 16)

        const timer = setInterval(() => {
          start += increment
          if (start >= end) {
            start = end
            clearInterval(timer)
          }
          setCounts((prev) => {
            const newCounts = [...prev]
            newCounts[index] = Math.floor(start)
            return newCounts
          })
        }, 16)
      })
    }
  }, [isInView, stats])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto lg:mx-0"
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center lg:text-left relative">
          <motion.div
            className="text-3xl font-bold text-white mb-1 relative"
            style={{
              textShadow: "0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(147, 51, 234, 0.6)",
            }}
          >
            <span>
              {counts[index]}
              {stat.suffix}
            </span>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur-xl opacity-50" />
          </motion.div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  )
}
