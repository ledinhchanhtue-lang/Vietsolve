"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, MessageSquare, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { siteConfig, readVerified } from "@/lib/site-config"

/** Set this to a form endpoint (Cloudflare Pages Function, Formspree, …) to
 *  POST submissions. Without it the form falls back to a pre-filled mailto. */
const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? ""

export default function ContactPage() {
  const { toast } = useToast()

  const contactEmail = readVerified(siteConfig.contact.email)
  const contactPhone = readVerified(siteConfig.contact.phone)
  const contactAddress = readVerified(siteConfig.contact.address)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
    budget: "",
    timeline: "",
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

    /* This used to be a `setTimeout` that showed a success toast and threw the
       submission away. The enquiry now actually goes somewhere: to
       NEXT_PUBLIC_CONTACT_ENDPOINT if configured, otherwise into a pre-filled
       email to the verified address. On failure the form keeps its values. */
    try {
      if (CONTACT_ENDPOINT) {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error(String(res.status))
      } else if (contactEmail) {
        const body = [
          `Họ và tên: ${formData.name}`,
          `Email: ${formData.email}`,
          formData.phone && `Số điện thoại: ${formData.phone}`,
          formData.company && `Doanh nghiệp: ${formData.company}`,
          formData.interest && `Lĩnh vực quan tâm: ${formData.interest}`,
          formData.budget && `Ngân sách dự kiến: ${formData.budget}`,
          formData.timeline && `Thời gian triển khai: ${formData.timeline}`,
          "",
          formData.message,
        ]
          .filter(Boolean)
          .join("\n")

        window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
          `[VietSolve] ${formData.company || formData.name}`,
        )}&body=${encodeURIComponent(body)}`
      } else {
        throw new Error("no-channel")
      }

      toast({
        title: "Đã nhận được yêu cầu của bạn",
        description: "VietSolve sẽ liên hệ lại qua email bạn đã cung cấp.",
        duration: 5000,
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        interest: "",
        budget: "",
        timeline: "",
        message: "",
        agreeToPrivacy: false,
      })
    } catch {
      toast({
        title: "Chưa gửi được",
        description: contactEmail
          ? `Bạn có thể gửi email trực tiếp tới ${contactEmail}.`
          : "Vui lòng thử lại sau.",
        variant: "destructive",
        duration: 7000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background — /modern-creative-office-teamwork.jpg was referenced here
            but never existed in /public, so this rendered a broken image.
            Replaced with a brand gradient rather than a random stock photo. */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-red-50 via-white to-gray-50" />

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
          {/* Only verified channels render. The hotline card showed the literal
              placeholder "0909.xxx.xxx" and the address card pointed at Saigon
              Centre / 65 Lê Lợi, which contradicted the footer's address.
              Both now come from lib/site-config.ts and stay hidden until real
              details are supplied. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactEmail && (
              <motion.a
                href={`mailto:${contactEmail}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-600 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                  <Mail className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-xl font-bold text-gray-900 mb-2">Email</p>
                <p className="text-xl font-semibold text-red-600 mb-2 break-all">{contactEmail}</p>
                <p className="text-gray-600 text-sm">Gửi yêu cầu trực tiếp cho đội ngũ VietSolve.</p>
              </motion.a>
            )}

            {contactPhone && (
              <motion.a
                href={`tel:${contactPhone.replace(/[^\d+]/g, "")}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-600 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                  <Phone className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-xl font-bold text-gray-900 mb-2">Hotline</p>
                <p className="text-2xl font-semibold text-red-600 mb-2">{contactPhone}</p>
              </motion.a>
            )}

            {contactAddress && (
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
                <p className="text-xl font-bold text-gray-900 mb-2">Địa chỉ</p>
                <p className="text-lg font-semibold text-gray-900 mb-2">{contactAddress.line1}</p>
                <p className="text-gray-600 text-sm">{contactAddress.line2}</p>
              </motion.div>
            )}
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
                  placeholder="Số điện thoại của bạn"
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
                <option value="Branding & Strategy">Branding & Strategy</option>
                <option value="Marketing & Growth">Marketing & Growth</option>
                <option value="Media & Creative">Media & Creative</option>
                <option value="Website & Digital Product">Website & Digital Product</option>
                <option value="AI & Automation">AI & Automation</option>
                <option value="Chưa xác định">Chưa xác định</option>
              </select>
              {errors.interest && <p className="text-red-500 text-sm mt-1">{errors.interest}</p>}
            </div>

            {/* Budget + Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="budget" className="block text-sm font-semibold text-gray-900 mb-2">
                  Ngân sách dự kiến{" "}
                  <span className="font-normal text-gray-400">(không bắt buộc)</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500/20 transition-all"
                >
                  <option value="">Chọn mức ngân sách</option>
                  <option value="Dưới 50 triệu">Dưới 50 triệu</option>
                  <option value="50 – 100 triệu">50 – 100 triệu</option>
                  <option value="100 – 300 triệu">100 – 300 triệu</option>
                  <option value="Trên 300 triệu">Trên 300 triệu</option>
                  <option value="Cần VietSolve đề xuất">Cần VietSolve đề xuất</option>
                </select>
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-semibold text-gray-900 mb-2">
                  Thời gian triển khai{" "}
                  <span className="font-normal text-gray-400">(không bắt buộc)</span>
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500/20 transition-all"
                >
                  <option value="">Chọn thời gian</option>
                  <option value="Càng sớm càng tốt">Càng sớm càng tốt</option>
                  <option value="Trong 1–3 tháng">Trong 1–3 tháng</option>
                  <option value="Trong 3–6 tháng">Trong 3–6 tháng</option>
                  <option value="Đang lên kế hoạch">Đang lên kế hoạch</option>
                </select>
              </div>
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
    </div>
  )
}
