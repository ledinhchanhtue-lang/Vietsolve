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
  description: Bilingual
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
  description: Bilingual
  fitFor: Bilingual<string[]>
}

export const engagementModels: EngagementModel[] = [
  {
    id: "ai-sprint",
    name: { vi: "AI Sprint", en: "AI Sprint" },
    description: {
      vi: "Đánh giá cơ hội, thiết kế giải pháp và xây prototype trong phạm vi rõ ràng.",
      en: "Assess the opportunity, design the solution and build a prototype inside a clearly bounded scope.",
    },
    fitFor: {
      vi: ["AI readiness", "Automation audit", "Proof of concept", "UX prototype"],
      en: ["AI readiness", "Automation audit", "Proof of concept", "UX prototype"],
    },
  },
  {
    id: "project-build",
    name: { vi: "Project Build", en: "Project Build" },
    description: {
      vi: "Thiết kế và triển khai một dự án hoàn chỉnh từ chiến lược đến sản phẩm.",
      en: "Design and deliver a complete project, from strategy through to the finished product.",
    },
    fitFor: {
      vi: ["Website", "Brand system", "Campaign", "AI Agent", "Automation"],
      en: ["Website", "Brand system", "Campaign", "AI agent", "Automation"],
    },
  },
  {
    id: "growth-partnership",
    name: { vi: "Growth Partnership", en: "Growth Partnership" },
    description: {
      vi: "Đồng hành theo chu kỳ để triển khai, đo lường và tiếp tục tối ưu.",
      en: "An ongoing cycle of shipping, measuring and optimising together.",
    },
    fitFor: {
      vi: ["Growth", "Content", "Performance", "SEO", "Continuous optimization"],
      en: ["Growth", "Content", "Performance", "SEO", "Continuous optimisation"],
    },
  },
  {
    id: "enterprise-transformation",
    name: { vi: "Enterprise Transformation", en: "Enterprise Transformation" },
    description: {
      vi: "Tư vấn và tích hợp nhiều nền tảng, phòng ban và luồng dữ liệu.",
      en: "Consulting and integration across multiple platforms, departments and data flows.",
    },
    fitFor: {
      vi: ["CRM", "Data", "AI system", "Multi-team workflow", "Digital transformation"],
      en: ["CRM", "Data", "AI system", "Multi-team workflow", "Digital transformation"],
    },
  },
]
