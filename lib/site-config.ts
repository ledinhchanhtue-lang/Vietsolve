/**
 * ============================================================================
 *  VIETSOLVE — SINGLE SOURCE OF TRUTH FOR BUSINESS INFORMATION
 * ============================================================================
 *
 *  RULE: nothing in this file may be invented.
 *
 *  Every contact detail carries a `verified` flag. The UI renders a field ONLY
 *  when `verified === true`. Anything unverified stays `null` and simply does
 *  not appear on the site — we never ship placeholder phone numbers, fake
 *  addresses, or unearned trust badges to production.
 *
 *  TO THE SITE OWNER: fill in the values marked `TODO — NEEDS VERIFICATION`
 *  and flip `verified` to true. The section will then appear automatically.
 * ============================================================================
 */

export type VerifiableField<T> = {
  value: T | null
  verified: boolean
}

const unverified = <T,>(): VerifiableField<T> => ({ value: null, verified: false })
const verified = <T,>(value: T): VerifiableField<T> => ({ value, verified: true })

export const siteConfig = {
  name: "VietSolve",
  legalName: "VietSolve",
  domain: "vietsolve.vn",
  url: "https://vietsolve.vn",
  locale: "vi_VN",

  /** One-line positioning used in metadata, footer and schema.org */
  positioning: {
    vi: "AI-powered Growth Agency cho doanh nghiệp Việt Nam.",
    en: "AI-powered Growth Agency for Vietnamese businesses.",
  },

  statement: {
    vi: "VietSolve kết hợp chiến lược, sáng tạo và công nghệ AI để giúp doanh nghiệp bán hàng nhanh hơn, vận hành tinh gọn hơn và tăng trưởng có thể đo lường.",
    en: "VietSolve combines strategy, creative and AI technology to help businesses sell faster, operate leaner and grow measurably.",
  },

  contact: {
    /**
     * Email runs on the company's own verified domain (Lark Suite / vietsolve.vn).
     * TODO — CONFIRM this mailbox is monitored before launch.
     */
    email: verified("contact@vietsolve.vn"),

    /**
     * TODO — NEEDS VERIFICATION.
     * The previous site shipped "+1 (555) 123-4567" and "0909.xxx.xxx" —
     * both fake. Nothing renders until a real number is supplied here.
     */
    phone: unverified<string>(),

    /**
     * TODO — NEEDS VERIFICATION.
     * The previous site contained two contradictory addresses
     * (Tôn Đức Thắng vs. Saigon Centre / Lê Lợi). Both removed.
     */
    address: unverified<{ line1: string; line2: string; mapUrl?: string }>(),

    /** TODO — NEEDS VERIFICATION. Response-time promises must be operationally real. */
    responseTime: unverified<{ vi: string; en: string }>(),
  },

  /**
   * Social profiles. Only verified handles render.
   * The old footer linked four icons to href="#", and /artists linked to a
   * third-party music account (@motionrecordsofficial) — all removed.
   */
  social: {
    linkedin: unverified<string>(),
    facebook: unverified<string>(),
    instagram: unverified<string>(),
    youtube: unverified<string>(),
  },

  /**
   * Third-party certifications.
   * Deliberately EMPTY. The previous site claimed "Google Partner",
   * "BBB Accredited A+" and "Verified Agency" with no supporting documentation —
   * a trademark and false-advertising exposure. Only add an entry here when a
   * verification URL or certificate exists.
   */
  certifications: [] as Array<{
    name: string
    issuer: string
    verificationUrl: string
  }>,
} as const

/** Helper: read a verified field, or null when unverified. */
export function readVerified<T>(field: VerifiableField<T>): T | null {
  return field.verified ? field.value : null
}

/** True when at least one direct contact channel can be displayed. */
export const hasDirectContactChannel =
  siteConfig.contact.email.verified ||
  siteConfig.contact.phone.verified ||
  siteConfig.contact.address.verified
