"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Pacifico } from "next/font/google"
import AnimatedButton from "./animated-button"
import CountingStats from "./counting-stats"
import Link from "next/link"
import { cn } from "@/lib/utils"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

export default function Hero() {
  const stats = [
    { value: 500, suffix: "+", label: "Chiến dịch thành công" },
    { value: 98, suffix: "%", label: "Khách hàng hài lòng" },
    { value: 15, suffix: "M+", label: "Doanh thu tạo ra" },
  ]

  return (
    <section className="relative min-h-screen flex items-center pt-8 pb-16 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://www.youtube.com/embed/IZkRgWfDlHc?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=IZkRgWfDlHc&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&start=1"
          className="w-full h-full object-cover opacity-30"
          style={{
            filter: "brightness(1.2) contrast(0.9)",
            pointerEvents: "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "177.77vh",
            minWidth: "100vw",
            height: "56.25vw",
            minHeight: "100vh",
            transform: "translate(-50%, -50%)",
          }}
          allow="autoplay; encrypted-media"
          frameBorder="0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-50 via-gray-50 to-red-50 border border-red-200 rounded-full text-sm text-gray-900 font-medium backdrop-blur-sm"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span>Agency Marketing Toàn Diện</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              >
                <span className="block text-gray-900 mb-2">AGENCY MARKETING</span>
                <span className="block text-gray-900 mb-2">TOÀN DIỆN CHO</span>
                <span
                  className={cn(
                    "block mb-2 bg-gradient-to-r from-red-600 via-gray-900 to-red-700 bg-clip-text text-transparent",
                    pacifico.className,
                  )}
                  style={{
                    textShadow: "0 0 40px rgba(220, 38, 38, 0.3)",
                  }}
                >
                  Doanh nghiệp
                </span>
                <span className="block text-gray-700">MỌI QUY MÔ</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto lg:mx-0"
              >
                Chúng tôi thấu hiểu <span className="text-red-600 font-semibold">khách hàng</span> và triển khai{" "}
                <span className="text-red-600 font-semibold">chiến lược marketing</span> tạo ra{" "}
                <span className="text-red-600 font-semibold">kết quả đo lường được</span>. Từ SEO, mạng xã hội đến nội
                dung và email marketing.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col gap-6 items-center justify-center lg:justify-start lg:items-start"
            >
              <Link href="/get-started">
                <AnimatedButton variant="slim" className="bg-red-600 text-white hover:bg-red-700">
                  <span className="flex items-center">
                    Bắt đầu ngay
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </AnimatedButton>
              </Link>

              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md border border-gray-200">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Đối tác Google</p>
                    <p className="text-xs text-gray-600">Agency được chứng nhận</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L3.09 8.26l1.42 1.42L12 4.16l7.49 5.52 1.42-1.42L12 2z" />
                      <path d="M12 6L6.5 10.5v7h3v-5h5v5h3v-7L12 6z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Được BBB công nhận</p>
                    <p className="text-xs text-gray-600">Xếp hạng A+</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Agency được xác thực</p>
                    <p className="text-xs text-gray-600">Đối tác đáng tin cậy</p>
                  </div>
                </div>
              </div>

              {/* Stats moved below badges */}
              <CountingStats stats={stats} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
