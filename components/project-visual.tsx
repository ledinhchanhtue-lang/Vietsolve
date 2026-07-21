"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/content/projects"

/**
 * Project thumbnail — one visual system, a distinct look per project.
 *
 * When a real screenshot exists it renders inside a light browser frame (the
 * presentation layer the spec asks for — never a bare screenshot on white).
 *
 * When no asset exists yet, we draw a deterministic brand visual seeded from the
 * project slug, so every project looks different while staying in the same
 * system. Explicitly NOT one shared placeholder repeated four times.
 *
 * Fixed 16:10 ratio everywhere so grids never mix aspect ratios.
 */

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

/** Four distinct pattern families, picked by slug. */
type Pattern = "grid" | "arcs" | "columns" | "diagonals"
const PATTERNS: Pattern[] = ["grid", "arcs", "columns", "diagonals"]

export function ProjectVisual({
  project,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  project: Project
  className?: string
  priority?: boolean
  sizes?: string
}) {
  /* Real asset — framed, cover-cropped, explicit ratio, lazy unless priority */
  if (project.image) {
    return (
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden rounded-xl border border-gray-200 bg-gray-100",
          className,
        )}
      >
        <Image
          src={project.image}
          alt={`${project.name} — ${project.summary.vi}`}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
    )
  }

  const seed = hash(project.slug)
  const pattern = PATTERNS[seed % PATTERNS.length]
  const hueShift = seed % 3 // 0 = deep charcoal, 1 = warm red, 2 = near-black

  const bg =
    hueShift === 0
      ? "from-gray-900 via-gray-800 to-gray-900"
      : hueShift === 1
        ? "from-red-950 via-gray-900 to-gray-800"
        : "from-gray-800 via-gray-900 to-black"

  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-xl border border-gray-200",
        className,
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br", bg)} />

      <svg
        viewBox="0 0 320 200"
        className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {pattern === "grid" && (
          <g stroke="rgba(255,255,255,0.10)" strokeWidth="1">
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="200" />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 40} x2="320" y2={i * 40} />
            ))}
          </g>
        )}

        {pattern === "arcs" && (
          <g stroke="rgba(255,255,255,0.13)" strokeWidth="1.25" fill="none">
            {Array.from({ length: 7 }).map((_, i) => (
              <circle key={i} cx="240" cy="180" r={40 + i * 34} />
            ))}
          </g>
        )}

        {pattern === "columns" && (
          <g fill="rgba(255,255,255,0.07)">
            {Array.from({ length: 10 }).map((_, i) => (
              <rect
                key={i}
                x={i * 32 + 6}
                y={200 - (40 + ((seed >> i) % 5) * 28)}
                width="18"
                height={40 + ((seed >> i) % 5) * 28}
                rx="3"
              />
            ))}
          </g>
        )}

        {pattern === "diagonals" && (
          <g stroke="rgba(255,255,255,0.11)" strokeWidth="1.25">
            {Array.from({ length: 14 }).map((_, i) => (
              <line key={i} x1={-60 + i * 34} y1="200" x2={40 + i * 34} y2="0" />
            ))}
          </g>
        )}

        {/* One red signal stroke — the brand accent, positioned per seed */}
        <path
          d={`M0 ${150 - (seed % 40)} C 90 ${100 + (seed % 30)}, 200 ${60 + (seed % 50)}, 320 ${40 + (seed % 35)}`}
          stroke="#dc2626"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>

      <div className="absolute inset-0 flex items-end p-5 sm:p-6">
        <span className="text-lg font-bold text-white/90 sm:text-xl">{project.name}</span>
      </div>
    </div>
  )
}
