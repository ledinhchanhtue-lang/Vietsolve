"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/content/projects"

/**
 * Project imagery.
 *
 * When a real screenshot exists, it renders. When it doesn't, we draw a
 * deterministic brand visual instead — derived from the project slug, so each
 * project looks distinct and stable across renders.
 *
 * This is deliberate: the previous site referenced 18 image files that did not
 * exist in /public, producing broken thumbnails across the whole site. A
 * designed placeholder is honest; a broken <img> or a random stock photo is not.
 */

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

export function ProjectVisual({
  project,
  className,
  priority = false,
}: {
  project: Project
  className?: string
  priority?: boolean
}) {
  if (project.image) {
    return (
      <div className={cn("relative overflow-hidden rounded-stage bg-graphite", className)}>
        <Image
          src={project.image}
          alt={project.name}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-reveal ease-smooth group-hover:scale-[1.03]"
        />
      </div>
    )
  }

  const seed = hash(project.slug)
  const rotate = (seed % 40) - 20
  const offsetX = (seed % 7) * 6
  const bandCount = 5 + (seed % 3)

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-stage border border-white/[0.08] bg-graphite",
        className,
      )}
    >
      <div className="absolute inset-0 grid-backdrop opacity-70" aria-hidden="true" />

      {/* Parametric bands — a Lạc-derived motion trail, seeded per project */}
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <g
          transform={`rotate(${rotate} 200 150)`}
          stroke="rgba(244,241,234,0.16)"
          strokeWidth={1.25}
          fill="none"
          strokeLinecap="round"
        >
          {Array.from({ length: bandCount }).map((_, i) => {
            const y = 60 + i * 34
            const amp = 26 + ((seed >> i) % 18)
            return (
              <path
                key={i}
                d={`M${-40 + offsetX} ${y} C 90 ${y - amp}, 200 ${y + amp}, 440 ${y - amp / 2}`}
              />
            )
          })}
        </g>

        {/* One red signal path */}
        <path
          d={`M${-40 + offsetX} ${150} C 110 ${150 - 40}, 230 ${150 + 34}, 440 ${150 - 20}`}
          transform={`rotate(${rotate} 200 150)`}
          stroke="#E21B2D"
          strokeWidth={1.75}
          fill="none"
          strokeLinecap="round"
          opacity={0.85}
        />
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 10%, rgba(226,27,45,0.14) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* The project name IS the visual — editorial, not a fake screenshot */}
      <div className="absolute inset-0 flex items-end p-7 sm:p-9">
        <span className="font-display text-2xl font-medium tracking-tight text-ivory/85 sm:text-3xl">
          {project.name}
        </span>
      </div>
    </div>
  )
}
