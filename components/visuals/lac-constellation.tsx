"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * The Lạc bird — VietSolve's identity mark — reinterpreted as a data
 * constellation: joints become nodes, the silhouette becomes connective paths.
 *
 * Design intent: "Vietnamese identity interpreted through modern technology."
 * Not folk illustration; not a generic AI orb.
 *
 * Motion: paths draw once on reveal, a few nodes carry a slow pulse.
 * No continuous particle field. Honors prefers-reduced-motion globally.
 */

/* Bird flying right. Coordinates tuned in a 420×230 viewBox. */
const SPINE = "M404 88 L344 94 L302 110 L254 126 L200 138 L142 150 L80 166 L22 188"
const WING_UPPER = "M236 122 L196 58 L146 22"
const WING_LOWER = "M146 22 L176 78 L206 122"
const TAIL = "M142 150 L92 128 L44 112"
const LEGS = "M196 138 L180 176 L146 198"
const CREST = "M344 94 L350 78 L336 70"

type Node = { x: number; y: number; r: number; accent?: boolean; delay: number }

const NODES: Node[] = [
  { x: 404, y: 88, r: 3.5, accent: true, delay: 0 }, // beak tip — the leading edge
  { x: 344, y: 94, r: 3, delay: 0.3 }, // head
  { x: 302, y: 110, r: 2.5, delay: 0.5 },
  { x: 254, y: 126, r: 3, delay: 0.7 },
  { x: 236, y: 122, r: 3.5, accent: true, delay: 0.9 }, // wing root — the hub
  { x: 196, y: 58, r: 2.5, delay: 1.1 },
  { x: 146, y: 22, r: 3, delay: 1.3 }, // wing tip
  { x: 200, y: 138, r: 2.5, delay: 1.0 },
  { x: 142, y: 150, r: 3, delay: 1.4 },
  { x: 92, y: 128, r: 2.5, delay: 1.6 },
  { x: 44, y: 112, r: 2, delay: 1.8 },
  { x: 80, y: 166, r: 2.5, delay: 1.7 },
  { x: 22, y: 188, r: 2, delay: 1.9 },
  { x: 180, y: 176, r: 2, delay: 1.5 },
  { x: 146, y: 198, r: 2, delay: 1.7 },
]

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.18, duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
      opacity: { delay: i * 0.18, duration: 0.25 },
    },
  }),
}

export function LacConstellation({
  className,
  tone = "light",
  animate = true,
}: {
  className?: string
  /** `light` = pale strokes for dark surfaces. `dark` = dark strokes for light surfaces. */
  tone?: "light" | "dark"
  animate?: boolean
}) {
  const stroke = tone === "light" ? "rgba(244,241,234,0.34)" : "rgba(7,9,13,0.22)"
  const nodeFill = tone === "light" ? "rgba(244,241,234,0.85)" : "rgba(7,9,13,0.6)"

  const paths = [SPINE, WING_UPPER, WING_LOWER, TAIL, LEGS, CREST]

  return (
    <svg
      viewBox="0 0 420 230"
      fill="none"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="VietSolve — biểu tượng chim Lạc"
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        {paths.map((d, i) =>
          animate ? (
            <motion.path
              key={d}
              d={d}
              stroke={stroke}
              strokeWidth={1.25}
              variants={draw}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            />
          ) : (
            <path key={d} d={d} stroke={stroke} strokeWidth={1.25} />
          ),
        )}
      </g>

      {/* A single red data path traces the leading edge — the signal colour */}
      {animate ? (
        <motion.path
          d="M254 126 L302 110 L344 94 L404 88"
          stroke="#E21B2D"
          strokeWidth={1.75}
          strokeLinecap="round"
          variants={draw}
          custom={2.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        />
      ) : (
        <path
          d="M254 126 L302 110 L344 94 L404 88"
          stroke="#E21B2D"
          strokeWidth={1.75}
          strokeLinecap="round"
        />
      )}

      <g>
        {NODES.map((n) => (
          <circle
            key={`${n.x}-${n.y}`}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.accent ? "#E21B2D" : nodeFill}
            className={animate ? "animate-node-pulse" : undefined}
            style={animate ? { animationDelay: `${n.delay}s` } : undefined}
          />
        ))}
      </g>
    </svg>
  )
}

/**
 * Compact static mark for the footer / small placements.
 * No animation, no nodes — just the silhouette lines.
 */
export function LacMark({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const stroke = tone === "light" ? "rgba(244,241,234,0.4)" : "rgba(7,9,13,0.28)"
  return (
    <svg viewBox="0 0 420 230" fill="none" className={cn("h-auto w-full", className)} aria-hidden="true">
      <g stroke={stroke} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
        <path d={SPINE} />
        <path d={WING_UPPER} />
        <path d={WING_LOWER} />
        <path d={TAIL} />
      </g>
    </svg>
  )
}
