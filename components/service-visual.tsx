import type { ReactElement } from "react"
import { cn } from "@/lib/utils"

/**
 * Abstract mini-interface per service group.
 *
 * Every service group was a heading, a paragraph and a row of pills — six cards
 * that looked identical apart from their glyph. Each now carries a small
 * composition that says what the work actually looks like: a type-and-grid
 * system for branding, a growth curve for marketing, a storyboard strip for
 * media, a browser frame for web, a branch flow for AI, a data stack for
 * analytics.
 *
 * Pure inline SVG — no raster asset, no request, no layout shift. Every fill is
 * charcoal at low alpha plus the one brand red, so six different drawings still
 * read as one system. Decorative, so aria-hidden throughout.
 */

type Props = { id: string; className?: string }

const INK = "rgb(15 23 42 / 0.10)"
const INK_SOFT = "rgb(15 23 42 / 0.055)"
const RED = "#dc2626"

function Branding() {
  return (
    <>
      {/* Grid system + type specimen — the two halves of an identity */}
      <g fill={INK_SOFT}>
        <rect x="18" y="20" width="52" height="52" rx="10" />
        <rect x="78" y="20" width="52" height="52" rx="26" />
        <rect x="138" y="20" width="52" height="52" rx="4" />
      </g>
      <g stroke={INK} strokeWidth="1">
        <path d="M18 88 H 260" />
        <path d="M18 104 H 214" />
        <path d="M18 120 H 238" />
      </g>
      <rect x="198" y="20" width="62" height="52" rx="10" fill={RED} opacity="0.9" />
      <circle cx="229" cy="46" r="11" fill="#fff" opacity="0.92" />
      <g stroke={RED} strokeWidth="1.5" strokeLinecap="round">
        <path d="M18 136 H 96" />
      </g>
    </>
  )
}

function Marketing() {
  return (
    <>
      {/* Growth curve over a funnel of decreasing bars */}
      <g fill={INK_SOFT}>
        <rect x="18" y="96" width="30" height="46" rx="5" />
        <rect x="56" y="80" width="30" height="62" rx="5" />
        <rect x="94" y="62" width="30" height="80" rx="5" />
        <rect x="132" y="48" width="30" height="94" rx="5" />
      </g>
      <path
        d="M22 118 C 70 108, 108 78, 150 56 S 224 30, 258 24"
        stroke={RED}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="258" cy="24" r="5" fill={RED} />
      <circle cx="150" cy="56" r="3.5" fill={RED} opacity="0.55" />
      {/* Target */}
      <g stroke={INK} strokeWidth="1.25" fill="none">
        <circle cx="222" cy="104" r="26" />
        <circle cx="222" cy="104" r="16" />
      </g>
      <circle cx="222" cy="104" r="6" fill={RED} opacity="0.85" />
    </>
  )
}

function Media() {
  return (
    <>
      {/* Storyboard strip with sprocket holes */}
      <rect x="18" y="24" width="242" height="70" rx="8" fill={INK_SOFT} />
      <g fill="rgb(15 23 42 / 0.14)">
        {Array.from({ length: 7 }).map((_, i) => (
          <rect key={`t${i}`} x={28 + i * 34} y="30" width="14" height="7" rx="2" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <rect key={`b${i}`} x={28 + i * 34} y="81" width="14" height="7" rx="2" />
        ))}
      </g>
      <rect x="30" y="44" width="66" height="30" rx="4" fill="rgb(15 23 42 / 0.18)" />
      <rect x="104" y="44" width="66" height="30" rx="4" fill={RED} opacity="0.85" />
      <rect x="178" y="44" width="66" height="30" rx="4" fill="rgb(15 23 42 / 0.18)" />
      {/* Waveform */}
      <g stroke={INK} strokeWidth="2.5" strokeLinecap="round">
        {[14, 26, 40, 22, 34, 18, 30, 44, 24, 16, 28, 20, 36, 22].map((h, i) => (
          <path key={i} d={`M${24 + i * 18} ${132 - h / 2} V ${132 + h / 2}`} />
        ))}
      </g>
      <g stroke={RED} strokeWidth="2.5" strokeLinecap="round">
        <path d="M150 110 V 154" />
      </g>
    </>
  )
}

function Website() {
  return (
    <>
      {/* Browser chrome + modular page blocks */}
      <rect x="18" y="20" width="242" height="122" rx="10" fill={INK_SOFT} />
      <path d="M18 44 H 260" stroke={INK} strokeWidth="1" />
      <g fill="rgb(15 23 42 / 0.16)">
        <circle cx="34" cy="32" r="3.5" />
        <circle cx="46" cy="32" r="3.5" />
        <circle cx="58" cy="32" r="3.5" />
      </g>
      <rect x="76" y="27" width="120" height="10" rx="5" fill="rgb(15 23 42 / 0.09)" />
      <rect x="32" y="58" width="96" height="70" rx="6" fill="rgb(15 23 42 / 0.13)" />
      <rect x="140" y="58" width="108" height="20" rx="5" fill={RED} opacity="0.85" />
      <rect x="140" y="86" width="108" height="9" rx="4.5" fill="rgb(15 23 42 / 0.12)" />
      <rect x="140" y="102" width="80" height="9" rx="4.5" fill="rgb(15 23 42 / 0.12)" />
      <rect x="140" y="118" width="52" height="10" rx="5" fill="rgb(15 23 42 / 0.18)" />
    </>
  )
}

function Ai() {
  return (
    <>
      {/* Branch flow: one trigger fans into parallel steps and rejoins */}
      <g stroke={INK} strokeWidth="1.5" fill="none">
        <path d="M52 81 H 96" />
        <path d="M96 81 C 116 81, 116 40, 136 40" />
        <path d="M96 81 C 116 81, 116 122, 136 122" />
        <path d="M188 40 C 208 40, 208 81, 228 81" />
        <path d="M188 122 C 208 122, 208 81, 228 81" />
      </g>
      <path
        d="M96 81 C 116 81, 116 40, 136 40"
        stroke={RED}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <g fill="#fff" stroke={INK} strokeWidth="1.25">
        <rect x="24" y="67" width="30" height="28" rx="8" />
        <rect x="136" y="26" width="52" height="28" rx="8" />
        <rect x="136" y="108" width="52" height="28" rx="8" />
        <rect x="228" y="67" width="30" height="28" rx="8" />
      </g>
      <g fill={RED}>
        <circle cx="39" cy="81" r="4" />
        <circle cx="162" cy="40" r="4" />
      </g>
      <g fill="rgb(15 23 42 / 0.22)">
        <circle cx="162" cy="122" r="4" />
        <circle cx="243" cy="81" r="4" />
      </g>
    </>
  )
}

function Data() {
  return (
    <>
      {/* Layered series over a search field */}
      <rect x="18" y="20" width="242" height="26" rx="13" fill={INK_SOFT} />
      <g stroke={INK} strokeWidth="1.5" fill="none">
        <circle cx="40" cy="33" r="6" />
        <path d="M45 38 L 51 44" strokeLinecap="round" />
      </g>
      <rect x="62" y="29" width="104" height="8" rx="4" fill="rgb(15 23 42 / 0.12)" />
      <g fill={INK_SOFT}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={22 + i * 35} y={142 - (30 + ((i * 17) % 46))} width="22" height={30 + ((i * 17) % 46)} rx="4" />
        ))}
      </g>
      <path
        d="M33 108 L 68 92 L 103 100 L 138 74 L 173 82 L 208 62 L 243 68"
        stroke={RED}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g fill={RED}>
        <circle cx="138" cy="74" r="4" />
        <circle cx="243" cy="68" r="4" />
      </g>
    </>
  )
}

const BY_ID: Record<string, () => ReactElement> = {
  "branding-strategy": Branding,
  "marketing-growth": Marketing,
  "media-creative": Media,
  "website-digital": Website,
  "ai-automation": Ai,
  "data-seo-analytics": Data,
}

export function ServiceVisual({ id, className }: Props) {
  const Composition = BY_ID[id]
  if (!Composition) return null

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white",
        "transition-colors duration-300 group-hover:border-red-200",
        className,
      )}
    >
      {/* Level 1 grid behind the drawing, so the composition sits on the same
          blueprint surface as the rest of the site. */}
      <div className="absolute inset-0 vs-grid-1 opacity-70" />
      <svg
        viewBox="0 0 278 162"
        className="relative h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        preserveAspectRatio="xMidYMid meet"
      >
        <Composition />
      </svg>
      {/* Same hover accents as the project thumbnails */}
      <span className="pointer-events-none absolute inset-0 vs-scan rounded-xl" />
    </div>
  )
}
