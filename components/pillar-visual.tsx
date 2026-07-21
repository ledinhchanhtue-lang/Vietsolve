"use client"

/**
 * Micro-drawing per value pillar — shared by the homepage three-pillars section
 * and the About core-values section, so the same value is always illustrated
 * the same way. Ink-plus-one-red language, matching service-visual.
 */
const INK = "rgb(15 23 42 / 0.14)"
const RED = "#dc2626"

export function PillarVisual({ kind }: { kind: "constellation" | "layers" | "modules" }) {
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

