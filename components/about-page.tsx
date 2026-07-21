"use client"

import { motion } from "framer-motion"
import { Radar, Shapes, Waypoints, ArrowRight } from "lucide-react"
import Link from "next/link"
import { IconTile } from "@/components/ui-kit/icon-tile"
import { PrimaryButton, SecondaryButton } from "@/components/ui-kit/button"
import { PillarVisual } from "@/components/pillar-visual"
import { AboutHeroVisual } from "@/components/about-hero-visual"
import { LacSignatureVisual } from "@/components/lac-signature"
import { CapabilityConstellation } from "@/components/capability-constellation"
import { TechLayer } from "@/components/tech/tech-layer"
import { TechDivider } from "@/components/tech/tech-divider"

/**
 * About — restructured to seven sections, down from ten-plus.
 *
 * The previous version said the same things repeatedly: "Giá trị cốt lõi"
 * appeared twice (a full section AND a sidebar mini-list), "hệ sinh thái giải
 * pháp" three times (an intro card, a seven-row numbered list, and scattered
 * mentions), and the page opened with three near-identical intro cards. The
 * Lạc bird lived in a small sidebar card.
 *
 * Now: Hero (copy + brand visual) → who VietSolve is (manifesto + three
 * statements) → core values, once → the Lạc signature moment → capability
 * constellation → team diagram → final CTA. Each idea appears exactly once,
 * and the page's one mid-flow CTA lives in the hero — the closing red section
 * is the only other CTA.
 */
export default function AboutPage() {
  const coreValues = [
    {
      icon: Shapes,
      visual: "layers" as const,
      title: "Sáng tạo",
      titleEn: "Creative",
      description: "Biến chiến lược thành thương hiệu, nội dung và trải nghiệm khác biệt.",
    },
    {
      icon: Radar,
      visual: "constellation" as const,
      title: "Trí tuệ",
      titleEn: "Intelligence",
      description: "Dữ liệu, insight và tư duy chiến lược giúp xác định đúng bài toán.",
    },
    {
      icon: Waypoints,
      visual: "modules" as const,
      title: "Đổi mới",
      titleEn: "Innovation",
      description: "Ứng dụng công nghệ và AI để giải pháp hiệu quả hơn theo thời gian.",
    },
  ]

  /* Three ways of working — typography and dividers, not another card row */
  const statements = [
    {
      en: "Business thinking",
      vi: "Bắt đầu từ bài toán kinh doanh và mục tiêu tăng trưởng của doanh nghiệp.",
    },
    {
      en: "Creative execution",
      vi: "Triển khai bằng thương hiệu, nội dung và trải nghiệm được thiết kế kỹ.",
    },
    {
      en: "Technology enablement",
      vi: "Nhân hiệu quả lên bằng website, dữ liệu, AI và automation.",
    },
  ]

  return (
    <main id="main" className="bg-white">
      {/* ------------- 1 · Hero — copy left, brand visual right ------------- */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-br from-white via-red-50/30 to-gray-50/30">
        <TechLayer>
          <div className="absolute inset-0 vs-grid-2 vs-mask-center opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(30rem_22rem_at_84%_8%,rgb(220_38_38/0.08),transparent_72%)]" />
        </TechLayer>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[45fr_55fr] lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left"
            >
              <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">
                Giới thiệu doanh nghiệp
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1]">
                Tổng quan về{" "}
                <span className="bg-gradient-to-r from-red-600 via-red-800 to-gray-900 bg-clip-text text-transparent">
                  VietSolve
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600 leading-relaxed lg:mx-0">
                Agency sáng tạo – công nghệ – truyền thông đồng hành cùng doanh nghiệp Việt Nam
                trong hành trình xây dựng thương hiệu và tăng trưởng bền vững.
              </p>
              <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <PrimaryButton href="/contact">Liên hệ ngay</PrimaryButton>
                <SecondaryButton href="/case-studies">Xem dự án</SecondaryButton>
              </div>
            </motion.div>

            <AboutHeroVisual />
          </div>
        </div>
      </section>

      {/* ------------- 2 · VietSolve là ai ------------- */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-balance">
                Agency đồng hành cùng doanh nghiệp,{" "}
                <span className="text-red-600">kiến tạo giá trị bền vững</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Từ branding, truyền thông, media và sản xuất nội dung đến SEO, website, AI &
                automation — VietSolve giúp doanh nghiệp{" "}
                <span className="font-semibold text-gray-900">
                  giải quyết vấn đề, kiến tạo giá trị và phát triển dài hạn
                </span>{" "}
                trong cùng một đội ngũ.
              </p>
            </div>

            {/* Three statements — typography and dividers, deliberately not
                another row of look-alike cards */}
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {statements.map((s, i) => (
                <motion.div
                  key={s.en}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="group flex items-baseline gap-5 py-6"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs font-semibold text-red-600/70 tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-red-700">
                      {s.en}
                    </h3>
                    <p className="mt-1 text-gray-600 leading-relaxed">{s.vi}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TechDivider className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />

      {/* ------------- 3 · Giá trị cốt lõi — exactly once ------------- */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Giá trị cốt lõi</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Ba trụ cột định hình phong cách làm việc và giải pháp của VietSolve.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden vs-scan rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-red-200 hover:shadow-md hover:-translate-y-1"
              >
                <IconTile icon={value.icon} size="md" />
                <div className="mt-6 flex items-baseline gap-2">
                  <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {value.titleEn}
                  </span>
                </div>
                <p className="mt-3 text-gray-600 leading-relaxed">{value.description}</p>
                <PillarVisual kind={value.visual} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------- 4 · Chim Lạc — the signature moment ------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-red-50/25 to-white py-20 lg:flex lg:min-h-[75vh] lg:items-center lg:py-28">
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[55fr_45fr] lg:gap-10">
            <LacSignatureVisual />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left"
            >
              <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">
                Biểu tượng thương hiệu
              </span>
              <h2 className="mt-4 text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Chim Lạc
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600 leading-relaxed lg:mx-0">
                Thể hiện tinh thần dân tộc, khát vọng bay cao vươn xa, nhưng vẫn giữ gìn bản sắc
                văn hóa Việt Nam — cũng chính là tinh thần mà VietSolve theo đuổi trong mọi dự án.
              </p>
              <p className="mx-auto mt-5 max-w-xl text-sm font-medium uppercase tracking-wider text-gray-400 lg:mx-0">
                Vietnamese identity · Modern technology
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ------------- 5 · Hệ sinh thái năng lực ------------- */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <TechLayer>
          <div className="absolute inset-0 vs-grid-1 vs-mask-center" />
        </TechLayer>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Hệ sinh thái năng lực</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Bảy nhóm năng lực kết nối quanh một đội ngũ.
            </p>
          </div>
          <CapabilityConstellation />
        </div>
      </section>

      <TechDivider className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />

      {/* ------------- 6 · Đội ngũ dự án ------------- */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Cách tổ chức đội ngũ dự án
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Đội ngũ core kết hợp cùng chuyên gia theo từng loại dự án.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl"
          >
            {/* Core Team → Strategy / Creative / Technology → Specialist
                Network. Roles only — no invented people. Decorative duplication
                of the paragraph below, so aria-hidden. */}
            <svg viewBox="0 0 520 190" className="mx-auto w-full max-w-lg" aria-hidden="true">
              <g stroke="rgb(15 23 42 / 0.16)" strokeWidth="1.25" fill="none">
                <path d="M260 44 V 62 M260 62 H 110 M260 62 H 410 M110 62 V 78 M260 62 V 78 M410 62 V 78" />
                <path d="M110 116 V 132 M260 116 V 132 M410 116 V 132 M110 132 H 410" />
                <path d="M260 132 V 148" />
              </g>
              <path d="M260 44 V 78" stroke="#dc2626" strokeWidth="1.75" fill="none" />
              <g fill="#dc2626">
                <circle cx="260" cy="62" r="2.5" />
                <circle cx="260" cy="140" r="2.5" />
              </g>
              <rect x="196" y="14" width="128" height="30" rx="15" fill="#dc2626" />
              <text x="260" y="34" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">Core Team</text>
              <g>
                <rect x="50" y="78" width="120" height="38" rx="10" fill="#fff" stroke="rgb(15 23 42 / 0.18)" />
                <rect x="200" y="78" width="120" height="38" rx="10" fill="#fff" stroke="rgb(15 23 42 / 0.18)" />
                <rect x="350" y="78" width="120" height="38" rx="10" fill="#fff" stroke="rgb(15 23 42 / 0.18)" />
                <text x="110" y="102" textAnchor="middle" fill="rgb(15 23 42 / 0.8)" fontSize="13" fontWeight="600">Strategy</text>
                <text x="260" y="102" textAnchor="middle" fill="rgb(15 23 42 / 0.8)" fontSize="13" fontWeight="600">Creative</text>
                <text x="410" y="102" textAnchor="middle" fill="rgb(15 23 42 / 0.8)" fontSize="13" fontWeight="600">Technology</text>
              </g>
              <rect x="130" y="148" width="260" height="32" rx="16" fill="rgb(220 38 38 / 0.06)" stroke="rgb(220 38 38 / 0.35)" strokeDasharray="4 5" />
              <text x="260" y="169" textAnchor="middle" fill="rgb(185 28 28 / 0.9)" fontSize="12" fontWeight="600" letterSpacing="0.04em">Specialist Network</text>
            </svg>

            <p className="mx-auto mt-8 max-w-2xl text-center text-gray-600 leading-relaxed">
              Mỗi dự án được dẫn dắt bởi đội ngũ core của VietSolve và kết hợp cùng các chuyên gia
              phù hợp — từ chiến lược, sáng tạo, công nghệ đến vận hành — để đảm bảo giải pháp đúng
              với bài toán của doanh nghiệp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ------------- 7 · Final CTA — the one closing CTA ------------- */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-red-600 via-red-800 to-gray-900">
        <TechDivider variant="plain" className="absolute inset-x-0 top-0" />
        <TechLayer>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgb(255_255_255/0.07)_0_1px,transparent_1px_11px)] vs-mask-down" />
          {/* Mini Lạc contour in the section's own light */}
          <svg
            className="vs-desktop absolute -right-10 bottom-0 h-72 w-96 opacity-[0.14]"
            viewBox="0 0 400 320"
            fill="none"
          >
            <g stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none">
              <path d="M118 208 C 146 164, 194 136, 252 131" />
              <path d="M252 131 C 232 151, 207 166, 177 176" />
              <path d="M118 208 C 138 205, 161 197, 177 176" />
              <path d="M252 131 C 267 124, 282 120, 300 120 L 318 113" />
              <path d="M118 208 C 101 218, 86 233, 76 253" />
            </g>
          </svg>
        </TechLayer>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl lg:text-6xl font-bold leading-tight text-balance">
            Sẵn sàng đồng hành cùng VietSolve?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl opacity-90">
            Hãy để chúng tôi giúp bạn kiến tạo giá trị bền vững cho doanh nghiệp
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-white px-12 text-lg font-bold text-red-600 shadow-2xl transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-700"
            >
              Liên hệ ngay
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
