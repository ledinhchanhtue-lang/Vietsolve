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
      explore: "Xem dịch vụ",
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
    contact: {
      eyebrow: "START A PROJECT",
      title1: "Cho chúng tôi biết",
      title2: "bài toán bạn muốn giải quyết.",
      desc: "Chia sẻ mục tiêu, thách thức hoặc ý tưởng của doanh nghiệp. VietSolve thường phản hồi trong vòng một ngày làm việc.",
      tags: "Brand · Growth · Website · AI · Automation · Media",
      /* Cột trái — brief guide */
      topicsTitle: "Bạn có thể trao đổi với chúng tôi về",
      topic1: "Xây dựng hoặc tái định vị thương hiệu",
      topic2: "Website và nền tảng số",
      topic3: "Marketing và tăng trưởng",
      topic4: "Media và content",
      topic5: "AI Agent và automation",
      topic6: "Bài toán chưa xác định rõ",
      nextTitle: "Điều gì xảy ra tiếp theo?",
      next1: "VietSolve đọc brief của bạn.",
      next2: "Đội ngũ liên hệ để làm rõ bài toán.",
      next3: "Hai bên thống nhất phạm vi và hướng triển khai.",
      responseLabel: "Thời gian phản hồi",
      responseValue: "Thường trong một ngày làm việc",
      emailLabel: "Email",
      /* Form */
      formTitle: "Thông tin dự án",
      formHint: "Các trường có dấu * là bắt buộc.",
      fName: "Họ và tên",
      fEmail: "Email",
      fPhone: "Số điện thoại",
      fCompany: "Tên doanh nghiệp",
      fRole: "Vai trò của bạn",
      fType: "Loại dự án",
      fBudget: "Ngân sách dự kiến",
      fTimeline: "Thời gian mong muốn",
      fMessage: "Nội dung cần tư vấn",
      messageHelper: "Hãy chia sẻ mục tiêu, vấn đề hiện tại và kết quả bạn mong muốn.",
      optional: "không bắt buộc",
      consent: "Tôi đồng ý để VietSolve liên hệ và xử lý thông tin theo",
      consentLink: "Chính sách bảo mật",
      submit: "Gửi brief cho VietSolve",
      submitting: "Đang gửi...",
      /* Chips */
      typeBranding: "Branding & Strategy",
      typeMarketing: "Marketing & Growth",
      typeMedia: "Media & Creative",
      typeWebsite: "Website & Digital Product",
      typeAi: "AI & Automation",
      typeUndecided: "Chưa xác định",
      /* Budget */
      budgetSelect: "Chọn mức ngân sách",
      budget1: "Dưới 50 triệu",
      budget2: "50 – 100 triệu",
      budget3: "100 – 300 triệu",
      budget4: "Trên 300 triệu",
      budget5: "Cần VietSolve đề xuất",
      /* Timeline */
      timeSelect: "Chọn thời gian",
      time1: "Càng sớm càng tốt",
      time2: "Trong 1 – 2 tháng",
      time3: "Trong 3 – 6 tháng",
      time4: "Đang khảo sát",
      /* States */
      successTitle: "VietSolve đã nhận được yêu cầu.",
      successBody: "Đội ngũ sẽ xem brief và phản hồi qua thông tin bạn cung cấp.",
      successCta: "Xem dự án VietSolve",
      errorTitle: "Chưa gửi được brief",
      errorRetry: "Thử lại",
      errorFallback: "Hoặc gửi email trực tiếp tới",
      errName: "Vui lòng nhập họ và tên",
      errEmail: "Vui lòng nhập email",
      errEmailFormat: "Email chưa đúng định dạng",
      errPhone: "Vui lòng nhập số điện thoại",
      errType: "Vui lòng chọn loại dự án",
      errMessage: "Vui lòng mô tả nội dung cần tư vấn",
      errConsent: "Vui lòng đồng ý để chúng tôi liên hệ",
      workStripTitle: "Một số dự án VietSolve đã thực hiện",
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
      terms: "Điều khoản sử dụng",
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
      explore: "View service",
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
    contact: {
      eyebrow: "START A PROJECT",
      title1: "Tell us the problem",
      title2: "you want to solve.",
      desc: "Share your goals, challenges or ideas. VietSolve usually replies within one business day.",
      tags: "Brand · Growth · Website · AI · Automation · Media",
      topicsTitle: "You can talk to us about",
      topic1: "Building or repositioning a brand",
      topic2: "Websites and digital platforms",
      topic3: "Marketing and growth",
      topic4: "Media and content",
      topic5: "AI agents and automation",
      topic6: "A problem you haven't scoped yet",
      nextTitle: "What happens next?",
      next1: "VietSolve reads your brief.",
      next2: "Our team gets in touch to clarify the problem.",
      next3: "We agree on scope and the way forward.",
      responseLabel: "Response time",
      responseValue: "Usually within one business day",
      emailLabel: "Email",
      formTitle: "Project details",
      formHint: "Fields marked * are required.",
      fName: "Full name",
      fEmail: "Email",
      fPhone: "Phone number",
      fCompany: "Company",
      fRole: "Your role",
      fType: "Project type",
      fBudget: "Expected budget",
      fTimeline: "Preferred timeline",
      fMessage: "What you need help with",
      messageHelper: "Tell us your goals, the current problem and the outcome you want.",
      optional: "optional",
      consent: "I agree to be contacted by VietSolve and to the",
      consentLink: "Privacy Policy",
      submit: "Send brief to VietSolve",
      submitting: "Sending...",
      typeBranding: "Branding & Strategy",
      typeMarketing: "Marketing & Growth",
      typeMedia: "Media & Creative",
      typeWebsite: "Website & Digital Product",
      typeAi: "AI & Automation",
      typeUndecided: "Not sure yet",
      budgetSelect: "Select a budget range",
      budget1: "Under 50M VND",
      budget2: "50 – 100M VND",
      budget3: "100 – 300M VND",
      budget4: "Over 300M VND",
      budget5: "I'd like VietSolve to advise",
      timeSelect: "Select a timeline",
      time1: "As soon as possible",
      time2: "Within 1 – 2 months",
      time3: "Within 3 – 6 months",
      time4: "Still exploring",
      successTitle: "VietSolve has received your request.",
      successBody: "Our team will review the brief and reply using the details you provided.",
      successCta: "View VietSolve projects",
      errorTitle: "Couldn't send the brief",
      errorRetry: "Try again",
      errorFallback: "Or email us directly at",
      errName: "Please enter your name",
      errEmail: "Please enter your email",
      errEmailFormat: "That email doesn't look right",
      errPhone: "Please enter a phone number",
      errType: "Please choose a project type",
      errMessage: "Please describe what you need help with",
      errConsent: "Please agree so we can contact you",
      workStripTitle: "A few projects VietSolve has delivered",
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

  /* `translations` is `as const`, so translations[lang] is a union of the VI and
     EN literal shapes. They are structurally identical, but the literal string
     types differ, so the union is not assignable to Translations (which is keyed
     off VI). The cast below is what keeps per-key autocomplete working. */
  const setLang = (l: Language) => setLangState(l)
  const toggle = () => setLangState((prev) => (prev === "vi" ? "en" : "vi"))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: translations[lang] as Translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider")
  return ctx
}
