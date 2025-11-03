"use client"

import type React from "react"

import { motion } from "framer-motion"

export function HeadingShimmer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-block">
      <span className="relative z-10 text-white">{children}</span>
      <motion.span
        aria-hidden
        className="absolute inset-0 -skew-x-6"
        style={{
          background: "linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent)",
        }}
        initial={{ x: "-120%" }}
        animate={{ x: ["-120%", "120%"] }}
        transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  )
}
