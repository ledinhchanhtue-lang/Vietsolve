/**
 * The four capability pillars.
 *
 * Deliberately four — not the 8–12 equal-weight service cards the old site had.
 * Each pillar is a full stage on the page with its own system visual.
 */

import type { Lang } from "@/lib/i18n"

export type Bilingual<T = string> = Record<Lang, T>

export type CapabilityId = "ai-agents" | "digital-products" | "brand-growth" | "media-creative"

export type Capability = {
  id: CapabilityId
  /** Two-digit stage number shown in the UI */
  index: string
  name: Bilingual
  heading: Bilingual
  /** Full paragraph — used on /services */
  description: Bilingual
  /** One sentence — used in the homepage 2×2 grid */
  shortDescription: Bilingual
  /** Three headline services — homepage only. Full list lives on /services. */
  highlights: Bilingual<string[]>
  services: Bilingual<string[]>
  /** Which system visual to render alongside this stage */
  visual: "agent-flow" | "web-stack" | "journey" | "creative-pipeline"
}

export const capabilities: Capability[] = [
  {
    id: "ai-agents",
    index: "01",
    visual: "agent-flow",
    name: {
      vi: "AI Agents & Automation",
      en: "AI Agents & Automation",
    },
    heading: {
      vi: "AI Agent làm việc cùng đội ngũ của bạn.",
      en: "AI agents that work alongside your team.",
    },
    description: {
      vi: "Thiết kế AI Agent và workflow automation giúp doanh nghiệp phản hồi khách hàng, xử lý dữ liệu, tạo báo giá, cập nhật CRM và tự động hóa các tác vụ lặp lại.",
      en: "We design AI agents and automation workflows that respond to customers, process data, generate quotes, update your CRM and take over repetitive work.",
    },
    shortDescription: {
      vi: "Xây AI Agent và workflow giúp doanh nghiệp xử lý khách hàng, dữ liệu và các tác vụ lặp lại.",
      en: "AI agents and workflows that handle customers, data and repetitive work.",
    },
    highlights: {
      vi: ["AI Sales Agent", "CRM Automation", "Internal Workflow"],
      en: ["AI Sales Agent", "CRM automation", "Internal workflow"],
    },
    services: {
      vi: [
        "AI Sales Agent",
        "Customer Service Agent",
        "Chatbot đọc dữ liệu và hình ảnh",
        "Order – CRM – Shipping Automation",
        "Internal Workflow Automation",
        "Reporting Automation",
      ],
      en: [
        "AI Sales Agent",
        "Customer Service Agent",
        "Vision & document-aware chatbot",
        "Order – CRM – Shipping automation",
        "Internal workflow automation",
        "Reporting automation",
      ],
    },
  },
  {
    id: "digital-products",
    index: "02",
    visual: "web-stack",
    name: {
      vi: "AI Websites & Digital Products",
      en: "AI Websites & Digital Products",
    },
    heading: {
      vi: "Website không chỉ để giới thiệu. Website phải tham gia vào hoạt động kinh doanh.",
      en: "A website shouldn't just introduce you. It should take part in the business.",
    },
    description: {
      vi: "Xây dựng website, web app và digital product có khả năng bán hàng, cá nhân hóa trải nghiệm, thu thập dữ liệu và tích hợp AI.",
      en: "We build websites, web apps and digital products that sell, personalise the experience, capture data and integrate AI.",
    },
    shortDescription: {
      vi: "Website và sản phẩm số biết bán hàng, thu thập dữ liệu và kết nối vào quy trình kinh doanh.",
      en: "Websites and digital products that sell, capture data and plug into the business.",
    },
    highlights: {
      vi: ["AI-powered Website", "E-commerce", "Customer Portal"],
      en: ["AI-powered website", "E-commerce", "Customer portal"],
    },
    services: {
      vi: [
        "AI-powered Website",
        "E-commerce",
        "Web App",
        "Customer Portal",
        "Dashboard",
        "AI Recommendation",
        "Payment & CRM Integration",
      ],
      en: [
        "AI-powered website",
        "E-commerce",
        "Web app",
        "Customer portal",
        "Dashboard",
        "AI recommendation",
        "Payment & CRM integration",
      ],
    },
  },
  {
    id: "brand-growth",
    index: "03",
    visual: "journey",
    name: {
      vi: "Brand, Growth & Performance",
      en: "Brand, Growth & Performance",
    },
    heading: {
      vi: "Xây thương hiệu để tăng trưởng. Không chỉ để trông đẹp hơn.",
      en: "Build a brand to grow. Not just to look better.",
    },
    description: {
      vi: "Kết hợp chiến lược thương hiệu, nội dung, truyền thông và performance marketing để tạo ra nhận diện rõ ràng và hành trình chuyển đổi nhất quán.",
      en: "We combine brand strategy, content, communications and performance marketing into one clear identity and a consistent path to conversion.",
    },
    shortDescription: {
      vi: "Chiến lược thương hiệu, nội dung và performance gắn liền với hành trình chuyển đổi.",
      en: "Brand strategy, content and performance tied to the conversion journey.",
    },
    highlights: {
      vi: ["Brand Strategy", "Performance Marketing", "SEO & AI Search"],
      en: ["Brand strategy", "Performance marketing", "SEO & AI search"],
    },
    services: {
      vi: [
        "Brand Strategy",
        "Brand Identity",
        "Campaign",
        "Content",
        "Performance Marketing",
        "SEO & AI Search",
        "Growth Strategy",
      ],
      en: [
        "Brand strategy",
        "Brand identity",
        "Campaign",
        "Content",
        "Performance marketing",
        "SEO & AI search",
        "Growth strategy",
      ],
    },
  },
  {
    id: "media-creative",
    index: "04",
    visual: "creative-pipeline",
    name: {
      vi: "Media & Creative Technology",
      en: "Media & Creative Technology",
    },
    heading: {
      vi: "Biến ý tưởng thành nội dung có thể mở rộng.",
      en: "Turn ideas into content that scales.",
    },
    description: {
      vi: "Kết hợp đội ngũ sáng tạo với AI video, AI voice và creative automation để sản xuất nội dung nhanh hơn nhưng vẫn giữ chất lượng thương hiệu.",
      en: "We pair a creative team with AI video, AI voice and creative automation to produce faster without losing brand quality.",
    },
    shortDescription: {
      vi: "Sản xuất nội dung đa nền tảng nhanh hơn nhờ kết hợp đội ngũ sáng tạo với AI.",
      en: "Multi-platform content produced faster by pairing a creative team with AI.",
    },
    highlights: {
      vi: ["Key Visual", "Video & TVC", "AI Video / Voice"],
      en: ["Key visual", "Video & TVC", "AI video / voice"],
    },
    services: {
      vi: [
        "Key Visual",
        "Video & TVC",
        "Social Content",
        "Podcast",
        "AI Video",
        "AI Voice",
        "Creative Automation",
      ],
      en: [
        "Key visual",
        "Video & TVC",
        "Social content",
        "Podcast",
        "AI video",
        "AI voice",
        "Creative automation",
      ],
    },
  },
]

/* ---------------------------------------------------------------- */
/*  VietSolve Operating System — the five-step delivery model        */
/* ---------------------------------------------------------------- */

export type OsStep = {
  index: string
  name: Bilingual
  description: Bilingual
  deliverables: Bilingual<string[]>
}

export const osSteps: OsStep[] = [
  {
    index: "01",
    name: { vi: "Diagnose", en: "Diagnose" },
    description: {
      vi: "Phân tích bài toán, hành trình khách hàng, dữ liệu, quy trình và mức độ sẵn sàng ứng dụng AI.",
      en: "We analyse the problem, the customer journey, the data, the process and how ready the business is for AI.",
    },
    deliverables: {
      vi: ["Business audit", "Customer journey", "AI readiness", "Opportunity map"],
      en: ["Business audit", "Customer journey", "AI readiness", "Opportunity map"],
    },
  },
  {
    index: "02",
    name: { vi: "Design", en: "Design" },
    description: {
      vi: "Thiết kế chiến lược, trải nghiệm và kiến trúc hệ thống phù hợp với nguồn lực doanh nghiệp.",
      en: "We design the strategy, the experience and a system architecture that fits the resources you actually have.",
    },
    deliverables: {
      vi: ["Growth strategy", "UX architecture", "System design", "Creative direction"],
      en: ["Growth strategy", "UX architecture", "System design", "Creative direction"],
    },
  },
  {
    index: "03",
    name: { vi: "Build", en: "Build" },
    description: {
      vi: "Xây dựng website, nội dung, AI Agent, workflow hoặc digital product.",
      en: "We build the website, the content, the AI agents, the workflows or the digital product.",
    },
    deliverables: {
      vi: ["Website", "AI Agent", "Automation", "Creative system"],
      en: ["Website", "AI agent", "Automation", "Creative system"],
    },
  },
  {
    index: "04",
    name: { vi: "Integrate", en: "Integrate" },
    description: {
      vi: "Kết nối CRM, dữ liệu, marketing, sale và các công cụ doanh nghiệp đang sử dụng.",
      en: "We connect the CRM, the data, marketing, sales and the tools you already run on.",
    },
    deliverables: {
      vi: ["CRM integration", "Data sync", "API workflow", "Analytics"],
      en: ["CRM integration", "Data sync", "API workflow", "Analytics"],
    },
  },
  {
    index: "05",
    name: { vi: "Optimize", en: "Optimize" },
    description: {
      vi: "Đo lường, học từ dữ liệu và tiếp tục tối ưu hiệu suất.",
      en: "We measure, learn from the data and keep optimising performance.",
    },
    deliverables: {
      vi: ["Dashboard", "Experiment", "Performance review", "Continuous improvement"],
      en: ["Dashboard", "Experiment", "Performance review", "Continuous improvement"],
    },
  },
]

/* ---------------------------------------------------------------- */
/*  Engagement models — replaces the old Start / Grow / Scale tiers  */
/* ---------------------------------------------------------------- */

export type EngagementModel = {
  id: string
  name: Bilingual
  /** Who this is for */
  bestFor: Bilingual
  /** What a typical scope covers */
  scope: Bilingual<string[]>
}

export const engagementModels: EngagementModel[] = [
  {
    id: "ai-sprint",
    name: { vi: "AI Sprint", en: "AI Sprint" },
    bestFor: {
      vi: "Doanh nghiệp muốn thử AI trong phạm vi nhỏ, rõ ràng trước khi đầu tư lớn.",
      en: "Teams who want to test AI in a small, clearly bounded scope before committing.",
    },
    scope: {
      vi: ["AI readiness", "Automation audit", "Proof of concept", "UX prototype"],
      en: ["AI readiness", "Automation audit", "Proof of concept", "UX prototype"],
    },
  },
  {
    id: "project-build",
    name: { vi: "Project Build", en: "Project Build" },
    bestFor: {
      vi: "Doanh nghiệp cần một dự án hoàn chỉnh từ chiến lược đến sản phẩm bàn giao.",
      en: "Businesses that need a complete project, from strategy through to a delivered product.",
    },
    scope: {
      vi: ["Website", "Brand system", "Campaign", "AI Agent", "Automation"],
      en: ["Website", "Brand system", "Campaign", "AI agent", "Automation"],
    },
  },
  {
    id: "growth-partnership",
    name: { vi: "Growth Partnership", en: "Growth Partnership" },
    bestFor: {
      vi: "Doanh nghiệp cần đồng hành liên tục để triển khai, đo lường và tối ưu theo chu kỳ.",
      en: "Businesses that need an ongoing partner to ship, measure and optimise in cycles.",
    },
    scope: {
      vi: ["Growth strategy", "Content", "Performance", "SEO", "Tối ưu liên tục"],
      en: ["Growth strategy", "Content", "Performance", "SEO", "Continuous optimisation"],
    },
  },
  {
    id: "enterprise-integration",
    name: { vi: "Enterprise Integration", en: "Enterprise Integration" },
    bestFor: {
      vi: "Tổ chức nhiều phòng ban cần kết nối dữ liệu và công cụ đang phân mảnh.",
      en: "Multi-team organisations that need to connect fragmented data and tools.",
    },
    scope: {
      vi: ["CRM", "Data pipeline", "AI system", "Workflow đa phòng ban", "API integration"],
      en: ["CRM", "Data pipeline", "AI system", "Multi-team workflow", "API integration"],
    },
  },
]
