"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  type?: "button" | "submit"
  href?: string
  disabled?: boolean
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
}

const variantClasses = {
  primary: "bg-red-700 hover:bg-red-800 text-white shadow-lg shadow-red-600/50",
  secondary: "bg-gray-800 hover:bg-gray-900 text-white shadow-lg shadow-gray-800/50",
  outline: "border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white",
}

export default function AnimatedButton({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  href,
  disabled = false,
}: AnimatedButtonProps) {
  const buttonContent = (
    <motion.button
      className={cn(
        "relative overflow-hidden rounded-xl font-medium transition-all flex items-center justify-center",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    )
  }

  return buttonContent
}
