/**
 * Selected work.
 *
 * RULES ENFORCED HERE:
 *  1. Only projects VietSolve actually delivered appear in this file.
 *  2. NO fabricated result metrics. The previous site shipped invented figures
 *     (+300% doanh số, ROI 450%, 500K downloads, 4.8★ App Store, +340% revenue).
 *     All removed. Where a verified number exists, add it to `metrics` WITH a
 *     source; until then, a project is described by WHAT WAS BUILT, not by an
 *     unbacked outcome claim.
 *  3. `image` stays null until a real asset is supplied. The UI then renders a
 *     designed brand visual — never a broken <img> and never a stock photo.
 *
 *  TO THE SITE OWNER: drop project images into /public/images/work/ and set the
 *  `image` path. Add verified outcomes to `metrics` with a `source` note.
 */

/** Bilingual string pair. */
export type Bilingual<T = string> = { vi: T; en: T }
/** Which capability a project primarily exercised. */
export type CapabilityId = "ai-agents" | "digital-products" | "brand-growth" | "media-creative"

export type ProjectCategory = "ai-systems" | "digital-products" | "brand-growth" | "media"

export type VerifiedMetric = {
  label: Bilingual
  value: string
  /** Where this number comes from. A metric with no source must not be added. */
  source: string
}

export type Project = {
  slug: string
  /** Client or project name — real names only. */
  name: string
  industry: Bilingual
  category: ProjectCategory
  capability: CapabilityId
  year: string
  /** One line describing what was delivered. Not a results claim. */
  summary: Bilingual
  /** Concrete deliverables. Factual. */
  deliverables: Bilingual<string[]>
  /** Real image path under /public, or null → brand visual is generated. */
  image: string | null
  /** Verified outcomes only. Empty is the correct default. */
  metrics: VerifiedMetric[]
  /** Set true once a full case-study page exists for this project. */
  hasDetailPage: boolean
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: "aba-vias-2025",
    name: "ABA — VIAS 2025",
    industry: { vi: "Sự kiện & Giải thưởng", en: "Events & Awards" },
    category: "brand-growth",
    capability: "brand-growth",
    year: "2025",
    summary: {
      vi: "Hệ thống nhận diện và truyền thông cho giải thưởng VIAS 2025.",
      en: "Identity and communications system for the VIAS 2025 awards.",
    },
    deliverables: {
      vi: ["Brand strategy", "Key visual", "Bộ nhận diện sự kiện", "Nội dung truyền thông"],
      en: ["Brand strategy", "Key visual", "Event identity system", "Communications content"],
    },
    image: null,
    metrics: [],
    hasDetailPage: false,
    featured: true,
  },
  {
    slug: "clearly",
    name: "Clearly",
    industry: { vi: "Thương mại điện tử", en: "E-commerce" },
    category: "digital-products",
    capability: "digital-products",
    year: "2025",
    summary: {
      vi: "Nền tảng thương mại điện tử với trải nghiệm mua hàng được thiết kế lại.",
      en: "E-commerce platform with a redesigned purchase experience.",
    },
    deliverables: {
      vi: ["UX architecture", "Website thương mại điện tử", "Tích hợp thanh toán", "Hệ thống nội dung"],
      en: ["UX architecture", "E-commerce website", "Payment integration", "Content system"],
    },
    image: null,
    metrics: [],
    hasDetailPage: false,
  },
  {
    slug: "nam-hai-furniture",
    name: "Nam Hải Furniture",
    industry: { vi: "Sản xuất & Nội thất", en: "Manufacturing & Furniture" },
    category: "digital-products",
    capability: "digital-products",
    year: "2025",
    summary: {
      vi: "Trải nghiệm số giới thiệu năng lực sản xuất và danh mục sản phẩm.",
      en: "A digital experience presenting manufacturing capability and product range.",
    },
    deliverables: {
      vi: ["Digital factory experience", "Website doanh nghiệp", "Hệ thống danh mục sản phẩm"],
      en: ["Digital factory experience", "Corporate website", "Product catalogue system"],
    },
    image: null,
    metrics: [],
    hasDetailPage: false,
  },
  {
    slug: "jade",
    name: "Jade",
    industry: { vi: "Bán lẻ & Lifestyle", en: "Retail & Lifestyle" },
    category: "brand-growth",
    capability: "brand-growth",
    year: "2025",
    summary: {
      vi: "Chiến lược thương hiệu và hệ thống nhận diện cho giai đoạn ra mắt.",
      en: "Brand strategy and identity system for launch.",
    },
    deliverables: {
      vi: ["Brand strategy", "Brand identity", "Định hướng sáng tạo", "Launch campaign"],
      en: ["Brand strategy", "Brand identity", "Creative direction", "Launch campaign"],
    },
    image: null,
    metrics: [],
    hasDetailPage: false,
  },
]

/** Categories that actually have projects — used to build the filter bar. */
export function availableCategories(): ProjectCategory[] {
  const present = new Set(projects.map((p) => p.category))
  const order: ProjectCategory[] = ["ai-systems", "digital-products", "brand-growth", "media"]
  return order.filter((c) => present.has(c))
}

export const featuredProject = projects.find((p) => p.featured) ?? projects[0]
