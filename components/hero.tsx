"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Play, Sparkles, Zap, TrendingUp } from "lucide-react"
import { Pacifico } from "next/font/google"
import AnimatedButton from "./animated-button"
import Link from "next/link"
import { useState, useEffect } from "react"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

function useTypingEffect(phrases: string[], typingSpeed = 80, pauseDuration = 1200) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]

    if (isTyping) {
      if (displayedText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, pauseDuration)
        return () => clearTimeout(timeout)
      }
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText("")
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        setIsTyping(true)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [displayedText, isTyping, currentPhraseIndex, phrases, typingSpeed, pauseDuration])

  return displayedText
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const { scrollY } = useScroll()

  const typingPhrases = ["tạo nhanh 5×", "tiết kiệm chi phí 30%", "A/B test tự động"]
  const typedText = useTypingEffect(typingPhrases, 80, 1200)

  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const parallaxLayer1 = useTransform(scrollY, [0, 1000], [0, 50])
  const parallaxLayer2 = useTransform(scrollY, [0, 1000], [0, 150])
  const parallaxLayer3 = useTransform(scrollY, [0, 1000], [0, 250])

  useEffect(() => {
    setMounted(true)
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <>
      <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            y: prefersReducedMotion ? 0 : parallaxLayer1,
            zIndex: -10,
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(201, 74, 74, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(201, 74, 74, 0.3) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
            <motion.line
              x1="0"
              y1="30%"
              x2="100%"
              y2="30%"
              stroke="#C94A4A"
              strokeWidth="1"
              strokeDasharray="20 10"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      strokeDashoffset: [0, -30],
                    }
              }
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <motion.line
              x1="0"
              y1="70%"
              x2="100%"
              y2="70%"
              stroke="#5A2A3A"
              strokeWidth="1"
              strokeDasharray="20 10"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      strokeDashoffset: [0, -30],
                    }
              }
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            y: prefersReducedMotion ? 0 : parallaxLayer2,
            zIndex: 0,
          }}
        >
          <svg className="absolute inset-0 w-full h-full opacity-12" xmlns="http://www.w3.org/2000/svg">
            <motion.line
              x1="25%"
              y1="0"
              x2="25%"
              y2="100%"
              stroke="#C94A4A"
              strokeWidth="1.5"
              strokeDasharray="15 8"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      strokeDashoffset: [0, -23],
                    }
              }
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <motion.line
              x1="75%"
              y1="0"
              x2="75%"
              y2="100%"
              stroke="#5A2A3A"
              strokeWidth="1.5"
              strokeDasharray="15 8"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      strokeDashoffset: [0, -23],
                    }
              }
              transition={{
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <motion.path
              d="M 0 20 Q 25 40, 50 30 T 100 50"
              stroke="#C94A4A"
              strokeWidth="1"
              fill="none"
              strokeDasharray="12 6"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      strokeDashoffset: [0, -18],
                    }
              }
              transition={{
                duration: 9,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <motion.path
              d="M 100 80 Q 75 60, 50 70 T 0 50"
              stroke="#5A2A3A"
              strokeWidth="1"
              fill="none"
              strokeDasharray="12 6"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      strokeDashoffset: [0, -18],
                    }
              }
              transition={{
                duration: 11,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            y: prefersReducedMotion ? 0 : parallaxLayer3,
            zIndex: 10,
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(90, 42, 58, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(90, 42, 58, 0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
            <motion.line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="#C94A4A"
              strokeWidth="0.5"
              strokeDasharray="10 5"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      strokeDashoffset: [0, -15],
                    }
              }
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <motion.line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="#5A2A3A"
              strokeWidth="0.5"
              strokeDasharray="10 5"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      strokeDashoffset: [0, -15],
                    }
              }
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: 1,
              }}
            />
          </svg>
        </motion.div>

        <motion.div className="absolute inset-0 z-0" style={{ y }}>
          <div className="absolute inset-0 bg-gradient-to-br from-vietsolve-red to-vietsolve-burgundy" />

          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-vietsolve-red/50 via-transparent to-vietsolve-burgundy/50"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-vietsolve-red/20 to-vietsolve-burgundy/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-vietsolve-burgundy/20 to-vietsolve-red/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -40, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <motion.div
            className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-vietsolve-red/15 to-vietsolve-burgundy/15 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.35, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {mounted && (
            <div className="absolute inset-0 overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/IZkRgWfDlHc?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=IZkRgWfDlHc&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&start=0"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  opacity: 0.4,
                  width: "300vw",
                  height: "169vw",
                  minWidth: "177.78vh",
                  minHeight: "100vh",
                  border: "none",
                }}
                allow="autoplay; encrypted-media"
                title="Background Video"
              />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />

          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <motion.line
              x1="0"
              y1="20%"
              x2="100%"
              y2="20%"
              stroke="url(#gradient1)"
              strokeWidth="2"
              strokeDasharray="10 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.line
              x1="0"
              y1="80%"
              x2="100%"
              y2="80%"
              stroke="url(#gradient2)"
              strokeWidth="2"
              strokeDasharray="10 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 1.5 }}
            />
            <motion.line
              x1="15%"
              y1="0"
              x2="15%"
              y2="100%"
              stroke="url(#gradient3)"
              strokeWidth="2"
              strokeDasharray="10 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 0.5 }}
            />
            <motion.line
              x1="85%"
              y1="0"
              x2="85%"
              y2="100%"
              stroke="url(#gradient4)"
              strokeWidth="2"
              strokeDasharray="10 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 2 }}
            />
            <motion.path
              d="M 0 0 L 30 30 L 60 20 L 100 50"
              stroke="url(#gradient5)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="8 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.7, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            {[
              { cx: "10%", cy: "25%", delay: 0 },
              { cx: "90%", cy: "30%", delay: 0.5 },
              { cx: "20%", cy: "75%", delay: 1 },
              { cx: "80%", cy: "70%", delay: 1.5 },
            ].map((node, i) => (
              <motion.g key={i}>
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r="4"
                  fill="#C94A4A"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: node.delay }}
                />
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r="8"
                  fill="none"
                  stroke="#C94A4A"
                  strokeWidth="1"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 2], opacity: [0, 0.6, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: node.delay }}
                />
              </motion.g>
            ))}
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C94A4A" stopOpacity="0" />
                <stop offset="50%" stopColor="#C94A4A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#5A2A3A" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#5A2A3A" stopOpacity="0" />
                <stop offset="50%" stopColor="#C94A4A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#C94A4A" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C94A4A" stopOpacity="0" />
                <stop offset="50%" stopColor="#5A2A3A" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#C94A4A" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gradient4" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#5A2A3A" stopOpacity="0" />
                <stop offset="50%" stopColor="#C94A4A" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#5A2A3A" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C94A4A" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#5A2A3A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#C94A4A" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          <motion.div
            className="absolute top-0 left-0 w-64 h-px bg-gradient-to-r from-vietsolve-red via-white to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
          />
          <motion.div
            className="absolute top-0 right-0 w-px h-64 bg-gradient-to-b from-vietsolve-burgundy via-white to-transparent"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
            style={{ transformOrigin: "top" }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-64 h-px bg-gradient-to-l from-vietsolve-red via-white to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
            style={{ transformOrigin: "right" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-px h-64 bg-gradient-to-t from-vietsolve-burgundy via-white to-transparent"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
            style={{ transformOrigin: "bottom" }}
          />
        </motion.div>

        <motion.div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ opacity }}>
          <div className="max-w-5xl mx-auto text-center lg:text-left">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
              <div className="space-y-6">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-vietsolve-red via-vietsolve-burgundy to-vietsolve-red bg-[length:200%_100%] rounded-full text-sm text-white font-semibold shadow-lg shadow-vietsolve-red/30 backdrop-blur-sm"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                  </motion.div>
                  <motion.span
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    Agency Marketing Toàn Diện
                  </motion.span>
                  <motion.div
                    className="ml-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Zap className="w-4 h-4" />
                  </motion.div>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
                >
                  <motion.span
                    className="block mb-2 text-white drop-shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    Agency Marketing sáng tạo bằng AI
                  </motion.span>
                  <motion.span
                    className="block bg-gradient-to-r from-vietsolve-red via-vietsolve-burgundy to-vietsolve-red bg-clip-text text-transparent drop-shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    nhanh hơn 5×, chi phí tối ưu tới 30%
                  </motion.span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-lg sm:text-xl text-white leading-relaxed max-w-3xl mx-auto lg:mx-0 font-medium drop-shadow-lg"
                >
                  <motion.span
                    className="inline-flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <TrendingUp className="w-5 h-5 mr-2 text-vietsolve-red" />
                    Từ ý tưởng → nội dung → chiến dịch đa kênh.
                  </motion.span>
                  <br />
                  <motion.span
                    className="inline-flex items-center text-gray-100 min-h-[1.5em]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    <span className="bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy bg-clip-text text-transparent font-bold">
                      {typedText}
                    </span>
                    <motion.span
                      className="inline-block w-0.5 h-5 bg-vietsolve-red ml-1"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.span>
                  <span className="block text-gray-100 mt-1">— tối ưu CPC/CPA theo thời gian thực.</span>
                </motion.p>
              </div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/get-started">
                    <AnimatedButton
                      variant="slim"
                      className="bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy text-white hover:from-vietsolve-burgundy hover:to-vietsolve-red shadow-lg shadow-vietsolve-red/50 hover:shadow-xl hover:shadow-vietsolve-red/60 transition-all"
                    >
                      <span className="flex items-center font-semibold">
                        Nhận Demo 15'
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.div>
                      </span>
                    </AnimatedButton>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/case-studies">
                    <AnimatedButton
                      variant="slim"
                      className="bg-white text-gray-900 hover:bg-gray-50 border-2 border-gray-300 hover:border-vietsolve-red shadow-md hover:shadow-lg transition-all"
                    >
                      <span className="flex items-center font-semibold">
                        <Play className="mr-2 h-4 w-4 text-vietsolve-red" />
                        Xem Case Study
                      </span>
                    </AnimatedButton>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-20 -mt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-br from-white via-vietsolve-red/10 to-white rounded-3xl shadow-2xl border-2 border-vietsolve-red/20 p-8 md:p-12 backdrop-blur-sm relative overflow-hidden"
          >
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-vietsolve-red/10 to-transparent rounded-bl-full"
              animate={{ rotate: [0, 90, 0] }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-vietsolve-burgundy/10 to-transparent rounded-tr-full"
              animate={{ rotate: [0, -90, 0] }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-8 border-b-2 border-vietsolve-red/30 relative z-10">
              {[
                { value: "ROI +38%", label: "Tăng trưởng trung bình", delay: 0 },
                { value: "-60%", label: "Thời gian triển khai", delay: 0.1 },
                { value: ">1.2M", label: "Lượt xem/chiến dịch", delay: 0.2 },
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-vietsolve-red/10 to-vietsolve-burgundy/10 border border-vietsolve-red/30 shadow-md hover:shadow-lg transition-all"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: metric.delay }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className="font-bold bg-gradient-to-r from-vietsolve-red to-vietsolve-burgundy bg-clip-text text-transparent mb-2 text-3xl"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: metric.delay + 0.3 }}
                  >
                    {metric.value}
                  </motion.div>
                  <div className="text-sm text-gray-700 font-medium">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mb-8 relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center justify-center">
                <motion.span
                  className="w-12 h-px bg-gradient-to-r from-transparent to-vietsolve-red mr-3"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                Đối tác tin cậy
                <motion.span
                  className="w-12 h-px bg-gradient-to-l from-transparent to-vietsolve-red ml-3"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center relative z-10">
              {[
                { src: "/google-logo.png", alt: "Google Partner" },
                { src: "/facebook-meta-logo.jpg", alt: "Meta Partner" },
                { src: "/hubspot-logo.png", alt: "HubSpot Partner" },
                { src: "/shopify-logo.png", alt: "Shopify Partner" },
                { src: "/salesforce-logo.png", alt: "Salesforce Partner" },
                { src: "/mailchimp-logo-abstract.png", alt: "Mailchimp Partner" },
              ].map((logo, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center h-16 w-full p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-200 grayscale hover:grayscale-0 transition-all hover:shadow-md hover:border-vietsolve-red"
                  whileHover={{ scale: 1.1, y: -5, rotate: [0, -2, 2, 0] }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                >
                  <img src={logo.src || "/placeholder.svg"} alt={logo.alt} className="h-8 object-contain" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
