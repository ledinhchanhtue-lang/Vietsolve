"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, MessageSquare, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
    message: "",
    agreeToPrivacy: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên"
    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại"
    if (!formData.interest) newErrors.interest = "Vui lòng chọn lĩnh vực quan tâm"
    if (!formData.message.trim()) newErrors.message = "Vui lòng nhập nội dung cần tư vấn"
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = "Vui lòng đồng ý với chính sách bảo mật"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Cảm ơn bạn!",
        description: "VietSolve sẽ liên hệ sớm.",
        duration: 5000,
      })
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        interest: "",
        message: "",
        agreeToPrivacy: false,
      })
    }, 1500)
  }

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/90 via-white/85 to-gray-50/90 z-10" />
          <img
            src="/modern-creative-office-teamwork.jpg"
            alt="VietSolve Office"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-red-600 via-red-700 to-gray-900 bg-clip-text text-transparent leading-tight pb-2">
              Liên hệ VietSolve
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-gray-900 mx-auto mb-8 rounded-full" />
            <p className="text-xl md:text-2xl text-gray-800 font-semibold mb-4 max-w-3xl mx-auto">
              Hãy để chúng tôi giúp bạn giải quyết bài toán tăng trưởng & thương hiệu.
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Đội ngũ VietSolve sẵn sàng tư vấn giải pháp phù hợp cho doanh nghiệp của bạn trong vòng 24 giờ.
            </p>
            <button
              onClick={scrollToForm}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-gray-900 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
            >
              Gửi yêu cầu tư vấn
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hotline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-600 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <Phone className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hotline</h3>
              <p className="text-2xl font-semibold text-red-600 mb-2">0909.xxx.xxx</p>
              <p className="text-gray-600 text-sm">Tư vấn trực tiếp 8:00 – 18:00 (T2–T6)</p>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-600 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <Mail className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-2xl font-semibold text-red-600 mb-2">contact@vietsolve.vn</p>
              <p className="text-gray-600 text-sm">Trả lời mọi thắc mắc trong 24 giờ.</p>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-600 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Địa chỉ</h3>
              <p className="text-lg font-semibold text-gray-900 mb-2">Tầng 5, Tòa nhà Saigon Centre</p>
              <p className="text-gray-600 text-sm">65 Lê Lợi, Quận 1, TP.HCM</p>
              <p className="text-gray-600 text-sm mt-1">Hẹn gặp bạn tại văn phòng VietSolve.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Gửi yêu cầu tư vấn cho VietSolve</h2>
            <p className="text-lg text-gray-600">Vui lòng điền thông tin, đội ngũ của chúng tôi sẽ liên hệ sớm nhất.</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500/20 transition-all`}
                  placeholder="Nguyễn Văn A"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500/20 transition-all`}
                  placeholder="email@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500/20 transition-all`}
                  placeholder="0909 xxx xxx"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
                  Tên doanh nghiệp
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500/20 transition-all"
                  placeholder="Công ty ABC"
                />
              </div>
            </div>

            {/* Interest Area */}
            <div className="mb-6">
              <label htmlFor="interest" className="block text-sm font-semibold text-gray-900 mb-2">
                Lĩnh vực quan tâm <span className="text-red-500">*</span>
              </label>
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white border ${
                  errors.interest ? "border-red-500" : "border-gray-300"
                } rounded-lg text-gray-900 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500/20 transition-all`}
              >
                <option value="">Chọn lĩnh vực</option>
                <option value="marketing">Truyền thông</option>
                <option value="ai">AI & Automation</option>
                <option value="strategy">Chiến lược</option>
                <option value="other">Khác</option>
              </select>
              {errors.interest && <p className="text-red-500 text-sm mt-1">{errors.interest}</p>}
            </div>

            {/* Message */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                Nội dung cần tư vấn <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3 bg-white border ${
                  errors.message ? "border-red-500" : "border-gray-300"
                } rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500/20 transition-all resize-none`}
                placeholder="Mô tả chi tiết về nhu cầu của bạn..."
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* Privacy Checkbox */}
            <div className="mb-8">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToPrivacy"
                  checked={formData.agreeToPrivacy}
                  onChange={handleChange}
                  className={`mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 ${
                    errors.agreeToPrivacy ? "border-red-500" : ""
                  }`}
                />
                <span className="text-sm text-gray-700">
                  Tôi đồng ý với{" "}
                  <Link href="/privacy" className="text-red-600 hover:text-red-700 underline">
                    Chính sách bảo mật thông tin
                  </Link>
                  .
                </span>
              </label>
              {errors.agreeToPrivacy && <p className="text-red-500 text-sm mt-1 ml-8">{errors.agreeToPrivacy}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-8 bg-gradient-to-r from-red-600 to-gray-900 hover:from-red-700 hover:to-black text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Đang gửi...
                </>
              ) : (
                <>
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Gửi yêu cầu tư vấn
                </>
              )}
            </button>
          </motion.form>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Đến thăm chúng tôi tại văn phòng VietSolve
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-3xl overflow-hidden shadow-xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4967814570393!2d106.69831731533417!3d10.772461262309804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc9%3A0x5a8b2d0c6e8e8e8e!2sSaigon%20Centre!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="VietSolve Office Location"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-red-600 via-red-700 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Bạn sẵn sàng cùng VietSolve tạo khác biệt?
            </h2>
            <p className="text-xl text-white/90 mb-8">Tư vấn miễn phí – Hợp tác dài hạn – Hiệu quả đo lường được.</p>
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-4 bg-white text-red-600 hover:bg-gray-100 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Bắt đầu ngay hôm nay
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
