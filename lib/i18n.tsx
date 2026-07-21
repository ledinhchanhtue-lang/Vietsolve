"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Language = "vi" | "en"

/** Full bilingual dictionary for the homepage (and shared chrome). */
export const translations = {
  vi: {
    nav: {
      home: "Trang chủ",
      about: "Về chúng tôi",
      services: "Dịch vụ",
      caseStudies: "Case Study",
      blog: "Blog",
      contact: "Liên hệ",
      contactNow: "Liên hệ ngay",
    },
    hero: {
      badge: "CREATIVE · TECHNOLOGY · GROWTH",
      title1: "Giải pháp sáng tạo",
      title2: "và công nghệ cho",
      titleAccent: "tăng trưởng",
      title3: "doanh nghiệp",
      descP1: "VietSolve kết hợp ",
      descH1: "branding, marketing, media",
      descP2: ", ",
      descH2: "website, AI và automation",
      descP3: " để giúp doanh nghiệp Việt xây dựng ",
      descH3: "thương hiệu",
      descP4: " và vận hành hiệu quả hơn.",
      ctaStart: "Trao đổi dự án",
      ctaSecondary: "Xem dự án",
    },
    pillars: {
      eyebrow: "CÁCH VIETSOLVE TẠO GIÁ TRỊ",
      title: "Trí tuệ · Sáng tạo · Đổi mới",
      p1Title: "Trí tuệ",
      p1En: "Intelligent",
      p1Desc: "Dữ liệu, insight và tư duy chiến lược giúp xác định đúng bài toán.",
      p2Title: "Sáng tạo",
      p2En: "Creative",
      p2Desc: "Biến chiến lược thành thương hiệu, nội dung và trải nghiệm khác biệt.",
      p3Title: "Đổi mới",
      p3En: "Innovation",
      p3Desc: "Ứng dụng website, AI và automation để tăng hiệu quả vận hành.",
    },
    ecosystem: {
      eyebrow: "HỆ SINH THÁI DỊCH VỤ",
      title: "Sáu nhóm dịch vụ trong một hệ thống",
      subtitle: "Từ chiến lược thương hiệu đến công nghệ và automation — kết nối trong cùng một đội ngũ.",
      viewAll: "Xem tất cả dịch vụ",
      explore: "Tìm hiểu thêm",
    },
    featured: {
      eyebrow: "DỰ ÁN TIÊU BIỂU",
      title: "Những dự án VietSolve đã thực hiện",
      subtitle: "Mỗi dự án là một bài toán riêng về thương hiệu, sản phẩm số và tăng trưởng.",
      viewAll: "Xem tất cả dự án",
    },
    homeCta: {
      title: "Bạn có một bài toán cần giải?",
      body: "Chia sẻ với VietSolve về mục tiêu của doanh nghiệp — chúng tôi sẽ cùng bạn xác định hướng triển khai phù hợp.",
      primary: "Trao đổi dự án",
      secondary: "Xem dịch vụ",
    },
    howWeWork: {
      title: "Cách chúng tôi làm việc",
      subtitle: "Một quy trình rõ ràng, đồng hành cùng bạn từ bài toán đến kết quả.",
      step1Title: "Khám phá",
      step1Desc: "Phân tích mục tiêu, khách hàng, thương hiệu và bài toán vận hành.",
      step2Title: "Thiết kế",
      step2Desc: "Xây dựng chiến lược, trải nghiệm và giải pháp phù hợp.",
      step3Title: "Triển khai",
      step3Desc: "Thực thi, đo lường và tiếp tục tối ưu theo dữ liệu.",
    },
    footer: {
      newsletterTitle: "Luôn dẫn đầu xu hướng",
      newsletterDesc:
        "Nhận thông tin chi tiết độc quyền, chiến lược thương hiệu và mẹo tăng trưởng được gửi đến hộp thư của bạn hàng tuần.",
      emailPlaceholder: "Nhập email của bạn",
      subscribed: "Cảm ơn bạn đã đăng ký! 🎉",
      description:
        "VietSolve kết hợp sáng tạo, chiến lược và công nghệ để giúp doanh nghiệp Việt tăng trưởng và vận hành hiệu quả hơn.",
      servicesTitle: "Dịch vụ",
      service1: "Branding & Strategy",
      service2: "Marketing & Growth",
      service3: "Media & Creative",
      service4: "Website & Digital Products",
      service5: "AI Agents & Automation",
      service6: "Data, SEO & Analytics",
      contactTitle: "Liên hệ",
      address: "",
      startProject: "Bắt đầu dự án của bạn",
      copyright: "Đã đăng ký bản quyền.",
      privacy: "Chính sách bảo mật",
      terms: "Điều khoản dịch vụ",
      cookie: "Chính sách Cookie",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      caseStudies: "Case Studies",
      blog: "Blog",
      contact: "Contact",
      contactNow: "Contact Now",
    },
    hero: {
      badge: "CREATIVE · TECHNOLOGY · GROWTH",
      title1: "Creative and technology",
      title2: "solutions for business",
      titleAccent: "growth",
      title3: "",
      descP1: "VietSolve combines ",
      descH1: "branding, marketing, media",
      descP2: ", ",
      descH2: "websites, AI and automation",
      descP3: " to help Vietnamese businesses build a stronger ",
      descH3: "brand",
      descP4: " and operate more effectively.",
      ctaStart: "Start a project",
      ctaSecondary: "View work",
    },
    pillars: {
      eyebrow: "HOW VIETSOLVE CREATES VALUE",
      title: "Intelligent · Creative · Innovation",
      p1Title: "Intelligent",
      p1En: "Trí tuệ",
      p1Desc: "Data, insight and strategic thinking to define the right problem.",
      p2Title: "Creative",
      p2En: "Sáng tạo",
      p2Desc: "Turning strategy into a brand, content and experiences that stand apart.",
      p3Title: "Innovation",
      p3En: "Đổi mới",
      p3Desc: "Applying websites, AI and automation to run more effectively.",
    },
    ecosystem: {
      eyebrow: "SERVICE ECOSYSTEM",
      title: "Six service groups in one system",
      subtitle: "From brand strategy to technology and automation — connected inside one team.",
      viewAll: "View all services",
      explore: "Learn more",
    },
    featured: {
      eyebrow: "SELECTED WORK",
      title: "Projects VietSolve has delivered",
      subtitle: "Each project is its own problem across brand, digital products and growth.",
      viewAll: "View all projects",
    },
    homeCta: {
      title: "Got a problem worth solving?",
      body: "Tell VietSolve about your goals — we'll work out the right way forward together.",
      primary: "Start a project",
      secondary: "View services",
    },
    howWeWork: {
      title: "How We Work",
      subtitle: "A clear process that stays with you from problem to result.",
      step1Title: "Discover",
      step1Desc: "We analyse goals, customers, brand and the operating problem.",
      step2Title: "Design",
      step2Desc: "We build the strategy, experience and the right solution.",
      step3Title: "Deploy",
      step3Desc: "We execute, measure and keep optimising from the data.",
    },
    footer: {
      newsletterTitle: "Stay Ahead of the Curve",
      newsletterDesc:
        "Get exclusive insights, brand strategies and growth tips delivered to your inbox every week.",
      emailPlaceholder: "Enter your email",
      subscribed: "Thanks for subscribing! 🎉",
      description:
        "VietSolve combines creativity, strategy and technology to help Vietnamese businesses grow and operate more effectively.",
      servicesTitle: "Services",
      service1: "Branding & Strategy",
      service2: "Marketing & Growth",
      service3: "Media & Creative",
      service4: "Website & Digital Products",
      service5: "AI Agents & Automation",
      service6: "Data, SEO & Analytics",
      contactTitle: "Contact",
      address: "",
      startProject: "Start Your Project",
      copyright: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookie: "Cookie Policy",
    },
  },
} as const

export type Translations = (typeof translations)["vi"]

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  toggle: () => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("vi")

  // Restore saved preference on mount
  useEffect(() => {
    const saved = (typeof window !== "undefined" && window.localStorage.getItem("lang")) as Language | null
    if (saved === "vi" || saved === "en") setLangState(saved)
  }, [])

  // Persist + reflect on <html lang>
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", lang)
      document.documentElement.lang = lang
    }
  }, [lang])

  const setLang = (l: Language) => setLangState(l)
  const toggle = () => setLangState((prev) => (prev === "vi" ? "en" : "vi"))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider")
  return ctx
}
