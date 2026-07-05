"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import AnimatedButton from "./animated-button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl">
      <motion.nav
        className="relative bg-white/80 backdrop-blur-md border rounded-2xl shadow-lg overflow-hidden"
        animate={{
          borderColor: [
            "rgba(220, 38, 38, 0.3)",
            "rgba(127, 29, 29, 0.3)",
            "rgba(185, 28, 28, 0.3)",
            "rgba(153, 27, 27, 0.3)",
            "rgba(220, 38, 38, 0.3)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: [
              "0 0 20px rgba(220, 38, 38, 0.2)",
              "0 0 20px rgba(127, 29, 29, 0.2)",
              "0 0 20px rgba(185, 28, 28, 0.2)",
              "0 0 20px rgba(153, 27, 27, 0.2)",
              "0 0 20px rgba(220, 38, 38, 0.2)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <div className="relative z-10 px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/images/logo-vietsolve-official.png"
                  alt="VietSolve"
                  width={140}
                  height={50}
                  className="w-auto h-12"
                />
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-6">
                <Link href="/" className="text-sm text-gray-900 hover:text-red-700 transition-colors font-medium">
                  Trang chủ
                </Link>
                <Link href="/about" className="text-sm text-gray-900 hover:text-red-700 transition-colors font-medium">
                  Về chúng tôi
                </Link>
                <Link
                  href="/services"
                  className="text-sm text-gray-900 hover:text-red-700 transition-colors font-medium"
                >
                  Dịch vụ
                </Link>
                <Link
                  href="/case-studies"
                  className="text-sm text-gray-900 hover:text-red-700 transition-colors font-medium"
                >
                  Case Study
                </Link>
                <Link href="/blog" className="text-sm text-gray-900 hover:text-red-700 transition-colors font-medium">
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="text-sm text-gray-900 hover:text-red-700 transition-colors font-medium"
                >
                  Liên hệ
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/contact">
                <AnimatedButton size="sm" className="bg-red-700 text-white hover:bg-red-900">
                  Liên hệ ngay
                </AnimatedButton>
              </Link>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5 text-gray-900" /> : <Menu className="h-5 w-5 text-gray-900" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/90 backdrop-blur-md rounded-b-2xl">
            <div className="px-6 py-4 space-y-3">
              <Link href="/" className="block text-gray-900 hover:text-red-700 font-medium">
                Trang chủ
              </Link>
              <Link href="/about" className="block text-gray-900 hover:text-red-700 font-medium">
                Về chúng tôi
              </Link>
              <Link href="/services" className="block text-gray-900 hover:text-red-700 font-medium">
                Dịch vụ
              </Link>
              <Link href="/case-studies" className="block text-gray-900 hover:text-red-700 font-medium">
                Case Study
              </Link>
              <Link href="/blog" className="block text-gray-900 hover:text-red-700 font-medium">
                Blog
              </Link>
              <Link href="/contact" className="block text-gray-900 hover:text-red-700 font-medium">
                Liên hệ
              </Link>
              <div className="pt-3 border-t border-gray-200">
                <Link href="/contact" className="block">
                  <AnimatedButton className="w-full bg-red-700 text-white hover:bg-red-900">
                    Liên hệ ngay
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        )}
      </motion.nav>
    </header>
  )
}
