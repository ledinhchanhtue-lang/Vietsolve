"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import AnimatedButton from "./animated-button"

export default function AnimatedFooter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setTimeout(() => setIsSubscribed(false), 3000)
    setEmail("")
  }

  return (
    <footer className="relative bg-gray-900 border-t border-gray-700">
      {/* Newsletter Section */}
      <div className="relative z-10 border-b border-gray-700 bg-gradient-to-br from-red-950/30 via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Luôn dẫn đầu xu hướng</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Nhận thông tin chi tiết độc quyền, chiến lược thương hiệu và mẹo tăng trưởng được gửi đến hộp thư của bạn
              hàng tuần.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubscribe}
            className="max-w-md mx-auto"
          >
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                  required
                />
              </div>
              <AnimatedButton
                type="submit"
                className="bg-red-600 text-white hover:bg-red-700"
                gradient="radial-gradient(circle, rgba(220,38,38,0.2) 0%, rgba(185,28,28,0.1) 50%, rgba(153,27,27,0) 100%)"
              >
                <ArrowRight className="h-5 w-5" />
              </AnimatedButton>
            </div>
            {isSubscribed && (
              <p className="text-green-400 text-center mt-4 animate-fade-in">Cảm ơn bạn đã đăng ký! 🎉</p>
            )}
          </motion.form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="group flex justify-center lg:justify-start">
              <Image
                src="/images/design-mode/Logo_VietSolve_Expanded-white(1).png"
                alt="Motion Records LLC"
                width={300}
                height={100}
                className="w-auto brightness-0 invert transition-transform duration-300 group-hover:scale-105 h-36 leading-7"
              />
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              Trao quyền cho các chuyên gia sáng tạo và doanh nhân xây dựng thương hiệu mạnh mẽ thúc đẩy sức hút thực sự
              và tăng trưởng bền vững trong thị trường cạnh tranh ngày nay.
            </p>

            {/* Social Links */}
            <div className="flex space-x-6 justify-center lg:justify-start">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={href} className="group relative" aria-label={label}>
                    <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center group-hover:bg-gray-700 group-hover:border-gray-600 transition-colors">
                      <Icon className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Links and Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-left">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Dịch vụ</h4>
              <ul className="space-y-4">
                {[
                  "Phát triển nhận diện thương hiệu",
                  "Marketing kỹ thuật số",
                  "Sáng tạo nội dung",
                  "SEO & Phân tích",
                  "Quản lý mạng xã hội",
                  "Marketing hiệu suất",
                ].map((link, index) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-center sm:justify-start group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-200 mr-0 group-hover:mr-2" />
                      {link}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Liên hệ</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300 justify-center sm:justify-start">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <span>hi@vietsolve.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 justify-center sm:justify-start">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 justify-center sm:justify-start">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>12 Tôn Đức Thắng, TP.HCM </span>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/inquiry">
                  <AnimatedButton
                    className="w-full bg-red-600 text-white hover:bg-red-700"
                    gradient="radial-gradient(circle, rgba(220,38,38,0.2) 0%, rgba(185,28,28,0.1) 50%, rgba(153,27,27,0) 100%)"
                  >
                    Bắt đầu dự án của bạn
                  </AnimatedButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-center sm:text-left">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Motion Records LLC. Đã đăng ký bản quyền.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Chính sách bảo mật
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Điều khoản dịch vụ
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Chính sách Cookie
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
