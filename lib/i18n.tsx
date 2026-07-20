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
      badge: "Agency Marketing Toàn Diện",
      title1: "AGENCY MARKETING",
      title2: "TOÀN DIỆN CHO",
      titleAccent: "Doanh nghiệp",
      title3: "MỌI QUY MÔ",
      descP1: "Chúng tôi thấu hiểu ",
      descH1: "khách hàng",
      descP2: " và triển khai ",
      descH2: "chiến lược marketing",
      descP3: " tạo ra ",
      descH3: "kết quả đo lường được",
      descP4: ". Từ SEO, mạng xã hội đến nội dung và email marketing.",
      ctaStart: "Bắt đầu ngay",
      googlePartner: "Đối tác Google",
      googlePartnerSub: "Agency được chứng nhận",
      bbb: "Được BBB công nhận",
      bbbSub: "Xếp hạng A+",
      verified: "Agency được xác thực",
      verifiedSub: "Đối tác đáng tin cậy",
      stat1: "Chiến dịch thành công",
      stat2: "Khách hàng hài lòng",
      stat3: "Doanh thu tạo ra",
    },
    howWeWork: {
      title: "Cách chúng tôi làm việc",
      subtitle: "Quy trình đã được chứng minh của chúng tôi đảm bảo kết quả xuất sắc cho mọi dự án",
      step1Title: "Khám phá",
      step1Desc: "Chúng tôi tìm hiểu sâu về doanh nghiệp, mục tiêu và thách thức của bạn.",
      step2Title: "Thiết kế",
      step2Desc: "Đội ngũ của chúng tôi tạo ra các giải pháp sáng tạo phù hợp với nhu cầu riêng của bạn.",
      step3Title: "Triển khai",
      step3Desc: "Chúng tôi thực hiện chính xác và hỗ trợ bạn trong từng bước.",
    },
    services: {
      title: "Dịch vụ sáng tạo cho tăng trưởng",
      subtitle: "Giải pháp tùy chỉnh để tối ưu hóa, đổi mới và phát triển.",
      socialTitle: "Mạng xã hội trả phí",
      socialDesc:
        "Thúc đẩy tăng trưởng và tương tác với quảng cáo mạng xã hội dựa trên dữ liệu, sử dụng chiến lược nhắm mục tiêu để nâng tầm thương hiệu của bạn.",
      googleTitle: "Google Ads",
      googleDesc:
        "Tiếp cận khách hàng vào đúng thời điểm với Google Ads, thúc đẩy lưu lượng truy cập và doanh số thông qua quảng cáo trực tuyến có mục tiêu.",
      emailTitle: "Email / SMS",
      emailDesc:
        "Tiếp cận khách hàng với email và SMS marketing có mục tiêu thúc đẩy doanh số, tăng trưởng và lòng trung thành.",
      seoTitle: "SEO",
      seoDesc:
        "Nâng cao khả năng hiển thị trên công cụ tìm kiếm với dịch vụ SEO, bao gồm kiểm tra, phân tích từ khóa và tối ưu hóa.",
      analyticsTitle: "Phân tích",
      analyticsDesc:
        "Theo dõi hiệu suất và thu thập thông tin chi tiết với giải pháp phân tích và báo cáo toàn diện cho các quyết định dựa trên dữ liệu.",
      webDevTitle: "Phát triển Web",
      webDevDesc:
        "Chúng tôi tạo ra mọi thứ từ website đơn giản đến phức tạp, với các gói linh hoạt và giải pháp tùy chỉnh phù hợp với nhu cầu của bạn.",
      badgeSsl: "Bảo mật SSL",
      badgeNoMonthly: "Không phí hàng tháng",
      badgeUptime: "99.9% Uptime",
      learnMore: "Tìm hiểu thêm",
    },
    roi: {
      title: "Tính toán ROI của bạn",
      subtitle: "Xem bạn có thể tạo ra bao nhiêu doanh thu với các chiến lược marketing đã được chứng minh của chúng tôi",
      selectBusiness: "Chọn loại hình doanh nghiệp của bạn",
      retailName: "Bán lẻ",
      retailDesc: "Thương mại điện tử & Cửa hàng",
      realEstateName: "Bất động sản",
      realEstateDesc: "Môi giới & Quản lý tài sản",
      artistName: "Nghệ sĩ",
      artistDesc: "Nhạc sĩ & Nhà sáng tạo nội dung",
      professionalName: "Dịch vụ chuyên nghiệp",
      professionalDesc: "Tư vấn & Nhà cung cấp dịch vụ",
      monthlyBudget: "Ngân sách Marketing hàng tháng",
      conversionTarget: "Tỷ lệ chuyển đổi mục tiêu",
      perMonth: "/tháng",
      disclaimerTitle: "Dựa trên dữ liệu khách hàng thực tế",
      disclaimerBody:
        "Các dự báo này dựa trên dữ liệu hiệu suất thực tế từ khách hàng hiện tại của chúng tôi trong các loại hình doanh nghiệp và phạm vi ngân sách tương tự. Kết quả cá nhân có thể khác nhau.",
      monthlyRevenue: "Doanh thu hàng tháng",
      annualRevenue: "Doanh thu hàng năm",
    },
    footer: {
      newsletterTitle: "Luôn dẫn đầu xu hướng",
      newsletterDesc:
        "Nhận thông tin chi tiết độc quyền, chiến lược thương hiệu và mẹo tăng trưởng được gửi đến hộp thư của bạn hàng tuần.",
      emailPlaceholder: "Nhập email của bạn",
      subscribed: "Cảm ơn bạn đã đăng ký! 🎉",
      description:
        "Trao quyền cho các chuyên gia sáng tạo và doanh nhân xây dựng thương hiệu mạnh mẽ thúc đẩy sức hút thực sự và tăng trưởng bền vững trong thị trường cạnh tranh ngày nay.",
      servicesTitle: "Dịch vụ",
      service1: "Phát triển nhận diện thương hiệu",
      service2: "Marketing kỹ thuật số",
      service3: "Sáng tạo nội dung",
      service4: "SEO & Phân tích",
      service5: "Quản lý mạng xã hội",
      service6: "Marketing hiệu suất",
      contactTitle: "Liên hệ",
      address: "12 Tôn Đức Thắng, TP.HCM",
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
      badge: "Full-Service Marketing Agency",
      title1: "FULL-SERVICE",
      title2: "MARKETING FOR",
      titleAccent: "Businesses",
      title3: "OF EVERY SIZE",
      descP1: "We deeply understand your ",
      descH1: "customers",
      descP2: " and deploy ",
      descH2: "marketing strategies",
      descP3: " that deliver ",
      descH3: "measurable results",
      descP4: ". From SEO and social media to content and email marketing.",
      ctaStart: "Get Started",
      googlePartner: "Google Partner",
      googlePartnerSub: "Certified agency",
      bbb: "BBB Accredited",
      bbbSub: "A+ Rating",
      verified: "Verified Agency",
      verifiedSub: "Trusted partner",
      stat1: "Successful campaigns",
      stat2: "Satisfied clients",
      stat3: "Revenue generated",
    },
    howWeWork: {
      title: "How We Work",
      subtitle: "Our proven process ensures outstanding results for every project",
      step1Title: "Discover",
      step1Desc: "We dive deep into your business, goals and challenges.",
      step2Title: "Design",
      step2Desc: "Our team crafts creative solutions tailored to your unique needs.",
      step3Title: "Deploy",
      step3Desc: "We execute with precision and support you every step of the way.",
    },
    services: {
      title: "Creative Services for Growth",
      subtitle: "Tailored solutions to optimize, innovate and grow.",
      socialTitle: "Paid Social",
      socialDesc:
        "Drive growth and engagement with data-driven social media ads, using targeting strategies to elevate your brand.",
      googleTitle: "Google Ads",
      googleDesc:
        "Reach customers at the right moment with Google Ads, driving traffic and sales through targeted online advertising.",
      emailTitle: "Email / SMS",
      emailDesc:
        "Reach customers with targeted email and SMS marketing that drives sales, growth and loyalty.",
      seoTitle: "SEO",
      seoDesc:
        "Boost your search engine visibility with SEO services including audits, keyword research and optimization.",
      analyticsTitle: "Analytics",
      analyticsDesc:
        "Track performance and gather insights with comprehensive analytics and reporting for data-driven decisions.",
      webDevTitle: "Web Development",
      webDevDesc:
        "We build everything from simple to complex websites, with flexible packages and custom solutions to fit your needs.",
      badgeSsl: "SSL Security",
      badgeNoMonthly: "No Monthly Fees",
      badgeUptime: "99.9% Uptime",
      learnMore: "Learn More",
    },
    roi: {
      title: "Calculate Your ROI",
      subtitle: "See how much revenue you could generate with our proven marketing strategies",
      selectBusiness: "Select your business type",
      retailName: "Retail",
      retailDesc: "E-commerce & Stores",
      realEstateName: "Real Estate",
      realEstateDesc: "Brokerage & Property Management",
      artistName: "Artists",
      artistDesc: "Musicians & Content Creators",
      professionalName: "Professional Services",
      professionalDesc: "Consulting & Service Providers",
      monthlyBudget: "Monthly Marketing Budget",
      conversionTarget: "Target Conversion Rate",
      perMonth: "/month",
      disclaimerTitle: "Based on real client data",
      disclaimerBody:
        "These projections are based on actual performance data from our current clients in similar business types and budget ranges. Individual results may vary.",
      monthlyRevenue: "Monthly Revenue",
      annualRevenue: "Annual Revenue",
    },
    footer: {
      newsletterTitle: "Stay Ahead of the Curve",
      newsletterDesc:
        "Get exclusive insights, brand strategies and growth tips delivered to your inbox every week.",
      emailPlaceholder: "Enter your email",
      subscribed: "Thanks for subscribing! 🎉",
      description:
        "Empowering creative professionals and entrepreneurs to build powerful brands that drive real traction and sustainable growth in today's competitive market.",
      servicesTitle: "Services",
      service1: "Brand Identity Development",
      service2: "Digital Marketing",
      service3: "Content Creation",
      service4: "SEO & Analytics",
      service5: "Social Media Management",
      service6: "Performance Marketing",
      contactTitle: "Contact",
      address: "12 Ton Duc Thang, HCMC",
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
