/**
 * The six service groups that make up VietSolve's ecosystem.
 *
 * Single source of truth shared by the homepage (short form: name + one line +
 * three highlights) and the /services page (full service list). No pricing, no
 * fabricated metrics — see the fake-data rule in CLAUDE.md.
 */

export type Bilingual<T = string> = { vi: T; en: T }

export type ServiceGroup = {
  id: string
  /** lucide-react icon name, resolved in the component */
  icon: string
  name: Bilingual
  /** One-sentence summary — used on the homepage card */
  tagline: Bilingual
  /** Three headline services — homepage */
  highlights: Bilingual<string[]>
  /** Full list — /services page */
  services: Bilingual<string[]>
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: "branding-strategy",
    icon: "Sparkles",
    name: { vi: "Branding & Strategy", en: "Branding & Strategy" },
    tagline: {
      vi: "Xây dựng chiến lược và nhận diện thương hiệu khác biệt, nhất quán.",
      en: "Brand strategy and a distinctive, consistent identity.",
    },
    highlights: {
      vi: ["Brand strategy", "Brand identity", "Campaign concept"],
      en: ["Brand strategy", "Brand identity", "Campaign concept"],
    },
    services: {
      vi: ["Brand strategy", "Brand identity", "Rebranding", "Campaign concept"],
      en: ["Brand strategy", "Brand identity", "Rebranding", "Campaign concept"],
    },
  },
  {
    id: "marketing-growth",
    icon: "TrendingUp",
    name: { vi: "Marketing & Growth", en: "Marketing & Growth" },
    tagline: {
      vi: "Chiến dịch và hành trình khách hàng hướng tới tăng trưởng đo lường được.",
      en: "Campaigns and customer journeys built for measurable growth.",
    },
    highlights: {
      vi: ["Performance marketing", "Social media", "Growth campaign"],
      en: ["Performance marketing", "Social media", "Growth campaign"],
    },
    services: {
      vi: ["Performance marketing", "Social media", "Growth campaign", "Customer journey"],
      en: ["Performance marketing", "Social media", "Growth campaign", "Customer journey"],
    },
  },
  {
    id: "media-creative",
    icon: "Clapperboard",
    name: { vi: "Media & Creative", en: "Media & Creative" },
    tagline: {
      vi: "Sản xuất nội dung sáng tạo đa nền tảng giữ đúng chất thương hiệu.",
      en: "Multi-platform creative content that keeps the brand's voice.",
    },
    highlights: {
      vi: ["Key visual", "Video", "Social content"],
      en: ["Key visual", "Video", "Social content"],
    },
    services: {
      vi: ["Key visual", "Video", "Social content", "Podcast"],
      en: ["Key visual", "Video", "Social content", "Podcast"],
    },
  },
  {
    id: "website-digital",
    icon: "MonitorSmartphone",
    name: { vi: "Website & Digital Products", en: "Website & Digital Products" },
    tagline: {
      vi: "Website và sản phẩm số biết bán hàng và tham gia vào vận hành.",
      en: "Websites and digital products that sell and join the operation.",
    },
    highlights: {
      vi: ["Corporate website", "E-commerce", "Web app"],
      en: ["Corporate website", "E-commerce", "Web app"],
    },
    services: {
      vi: ["Corporate website", "E-commerce", "Landing page", "Web app", "Dashboard"],
      en: ["Corporate website", "E-commerce", "Landing page", "Web app", "Dashboard"],
    },
  },
  {
    id: "ai-automation",
    icon: "Bot",
    name: { vi: "AI Agents & Automation", en: "AI Agents & Automation" },
    tagline: {
      vi: "AI Agent và automation xử lý khách hàng, dữ liệu và tác vụ lặp lại.",
      en: "AI agents and automation for customers, data and repetitive work.",
    },
    highlights: {
      vi: ["AI Sales Agent", "CRM automation", "Reporting automation"],
      en: ["AI Sales Agent", "CRM automation", "Reporting automation"],
    },
    services: {
      vi: [
        "AI Sales Agent",
        "Customer Service Agent",
        "CRM automation",
        "Order workflow",
        "Reporting automation",
      ],
      en: [
        "AI Sales Agent",
        "Customer Service Agent",
        "CRM automation",
        "Order workflow",
        "Reporting automation",
      ],
    },
  },
  {
    id: "data-seo-analytics",
    icon: "BarChart3",
    name: { vi: "Data, SEO & Analytics", en: "Data, SEO & Analytics" },
    tagline: {
      vi: "Dữ liệu, SEO và phân tích giúp ra quyết định và tối ưu chuyển đổi.",
      en: "Data, SEO and analytics to guide decisions and lift conversion.",
    },
    highlights: {
      vi: ["SEO & AI Search", "Analytics", "Conversion optimization"],
      en: ["SEO & AI Search", "Analytics", "Conversion optimisation"],
    },
    services: {
      vi: ["SEO", "AI Search", "Analytics", "Dashboard", "Conversion optimization"],
      en: ["SEO", "AI Search", "Analytics", "Dashboard", "Conversion optimisation"],
    },
  },
]
