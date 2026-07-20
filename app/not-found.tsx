import Link from "next/link"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="flex min-h-[65vh] items-center bg-gradient-to-br from-white via-red-50/30 to-gray-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">404</span>
          <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900">
            Không tìm thấy trang này
          </h1>
          <p className="mt-5 max-w-lg text-lg text-gray-600 leading-relaxed">
            Đường dẫn có thể đã thay đổi hoặc không còn tồn tại.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
            >
              Về trang chủ
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full border border-gray-300 text-gray-900 font-medium hover:bg-gray-100 transition-colors"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </main>
      <AnimatedFooter />
    </div>
  )
}
