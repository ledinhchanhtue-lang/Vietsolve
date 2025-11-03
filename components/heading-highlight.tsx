"use client"

import type React from "react"

import { motion } from "framer-motion"

export function HeadingHighlight({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="relative text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E60023] via-[#FF4D4D] to-[#8B0000]"
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        textShadow: ["0 0 10px rgba(255,0,0,0.5)", "0 0 30px rgba(255,100,100,0.9)", "0 0 10px rgba(255,0,0,0.5)"],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
    >
      {children}
    </motion.span>
  )
}
