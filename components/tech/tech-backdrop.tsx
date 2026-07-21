/**
 * Site-wide backdrop — one static layer, no JavaScript.
 *
 * Replaces three components that used to stack on every page:
 *   • animated-background.tsx — a permanent 30fps canvas loop painting four
 *     large blue / purple / green / pink radial gradients. Off-brand and a
 *     constant GPU cost that never paused, not even off-screen.
 *   • background-paths.tsx + background-stripes.tsx — near-duplicates drawing
 *     56 bezier strokes each, at 200vh, which is what pushed the document past
 *     the viewport on mobile.
 *
 * What is left is a blueprint grid, a warm brand aura and a few circuit traces.
 * Being fully static, it costs nothing after first paint — which matters
 * precisely because this layer is on screen the entire session and therefore
 * could never be paused.
 */
export default function TechBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Brand aura — replaces the four drifting canvas orbs */}
      <div className="absolute inset-0 vs-aura" />

      {/* Blueprint grid, level 1. Faded out through the middle band where body
          copy sits, so it can never reduce reading contrast. */}
      <div className="absolute inset-0 vs-grid-1 vs-mask-center opacity-70" />

      {/* Circuit traces — depth on a large screen only. Hidden below 768px,
          where they would just crowd the content. */}
      <svg
        className="vs-desktop absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="rgb(15 23 42 / 0.07)" strokeWidth="1" fill="none">
          <path d="M-40 190 H 300 L 360 130 H 620 L 690 200 H 1040 L 1100 140 H 1480" />
          <path d="M-40 706 H 250 L 320 764 H 700 L 770 700 H 1120 L 1180 760 H 1480" />
          <path d="M182 -40 V 148 L 240 206 V 420" />
          <path d="M1256 940 V 742 L 1198 684 V 470" />
        </g>
        {/* Three red junction nodes — the only saturated marks in the backdrop */}
        <g fill="rgb(220 38 38 / 0.22)">
          <circle cx="360" cy="130" r="3.5" />
          <circle cx="1100" cy="140" r="3.5" />
          <circle cx="320" cy="764" r="3.5" />
        </g>
      </svg>
    </div>
  )
}
