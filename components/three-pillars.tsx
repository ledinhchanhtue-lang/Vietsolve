"use client"

import { motion } from "framer-motion"
import { Radar, Shapes, Waypoints } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { IconTile } from "@/components/ui-kit/icon-tile"

/**
 * Three pillars — Intelligent · Creative · Innovation.
 *
 * The philosophy layer under everything VietSolve does. White theme, light
 * cards to match the rest of the homepage. One line each — not paragraphs.
 */
const INK = "rgb(15 23 42 / 0.14)"
const RED = "#dc2626"

/** Mini SVG per pillar — same ink-plus-one-red language as service-visual. */
function PillarVisual({ kind }: { kind: "constellation" | "layers" | "modules" }) {
  return (
    <svg
      viewBox="0 0 220 64"
      className="mt-5 h-16 w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {kind === "constellation" && (
        <>
          {/* Insight constellation: scattered data points, one drawn-out line */}
          <g fill={INK}>
            {[
              [16, 44], [42, 22], [70, 50], [96, 16], [128, 40], [158, 24], [190, 46], [204, 18],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" />
            ))}
          </g>
          <path
            d="M16 44 L 96 16 L 158 24 L 204 18"
            stroke={RED}
            strokeWidth="1.75"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g fill={RED}>
            <circle cx="96" cy="16" r="3.5" />
            <circle cx="204" cy="18" r="3.5" />
          </g>
        </>
      )}
      {kind === "layers" && (
        <>
          {/* Creative layers fanning out of alignment */}
          <rect x="30" y="20" width="72" height="36" rx="6" fill="rgb(15 23 42 / 0.06)" transform="rotate(-5 66 38)" />
          <rect x="42" y="14" width="72" height="36" rx="6" fill="rgb(15 23 42 / 0.10)" transform="rotate(-2 78 32)" />
          <rect x="54" y="10" width="72" height="36" rx="6" fill="#fff" stroke={INK} />
          <rect x="60" y="18" width="34" height="5" rx="2.5" fill={RED} opacity="0.85" />
          <rect x="60" y="29" width="52" height="4" rx="2" fill="rgb(15 23 42 / 0.14)" />
          <g stroke={INK} strokeWidth="1.25" fill="none">
            <path d="M150 16 h 48 M150 30 h 36 M150 44 h 42" strokeLinecap="round" />
          </g>
          <circle cx="204" cy="30" r="3" fill={RED} />
        </>
      )}
      {kind === "modules" && (
        <>
          {/* Connected modules: idea → build → run */}
          <g stroke={INK} strokeWidth="1.5" fill="none">
            <path d="M62 32 H 92 M136 32 H 166" />
          </g>
          <g fill="#fff" stroke={INK} strokeWidth="1.25">
            <rect x="18" y="16" width="44" height="32" rx="8" />
            <rect x="92" y="16" width="44" height="32" rx="8" />
            <rect x="166" y="16" width="44" height="32" rx="8" />
          </g>
          <path d="M62 32 H 92" stroke={RED} strokeWidth="2" strokeLinecap="round" />
          <g fill={RED}>
            <circle cx="40" cy="32" r="3.5" />
          </g>
          <g fill="rgb(15 23 42 / 0.2)">
            <circle cx="114" cy="32" r="3.5" />
            <circle cx="188" cy="32" r="3.5" />
          </g>
        </>
      )}
    </svg>
  )
}

export default function ThreePillars() {
  const { t } = useLanguage()

  const pillars = [
    { icon: Radar, visual: "constellation" as const, title: t.pillars.p1Title, en: t.pillars.p1En, desc: t.pillars.p1Desc },
    { icon: Shapes, visual: "layers" as const, title: t.pillars.p2Title, en: t.pillars.p2En, desc: t.pillars.p2Desc },
    { icon: Waypoints, visual: "modules" as const, title: t.pillars.p3Title, en: t.pillars.p3En, desc: t.pillars.p3Desc },
  ]

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-xs sm:text-sm font-semibold text-red-600 uppercase tracking-wider">
            {t.pillars.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">{t.pillars.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((p, index) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden vs-scan bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:border-red-200 hover:bg-white hover:shadow-md transition-all duration-300"
            >
              {/* Was a solid red-100 square with a red glyph — the only place on
                  the site that filled an icon container with brand colour. */}
              <div className="mb-6">
                <IconTile icon={p.icon} size="lg" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-xl font-bold text-gray-900">{p.title}</h3>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {p.en}
                </span>
              </div>
              <p className="mt-3 text-gray-600 leading-relaxed max-w-[42ch]">{p.desc}</p>

              {/* Each pillar draws its own idea — a data constellation, a stack
                  of shapes, a connected module row — instead of three identical
                  boxes distinguished only by their glyph. */}
              <PillarVisual kind={p.visual} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
