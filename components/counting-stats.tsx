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
          <motion.div className="text-3xl font-bold text-red-600 mb-1 relative">
            <motion.span
              animate={
                isInView
                  ? {
                      scale: [1, 1.05, 1],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {counts[index]}
              {stat.suffix}
            </motion.span>
          </motion.div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  )
}
