import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge needs to be told about our custom scales, otherwise it
 * misclassifies them and silently drops classes.
 *
 * Concretely: `text-h2` is not in tailwind-merge's default font-size list, so it
 * guessed "text colour" — which meant `cn("text-h2", "text-ivory")` resolved the
 * two as conflicting and deleted `text-h2`. Every SectionHeading rendered at
 * 16px. Registering the custom font sizes and colours fixes it for good.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["h1", "h2", "h3", "body-lg", "eyebrow"] }],
      "text-color": [
        { text: ["obsidian", "graphite", "ivory", "vs-red", "vs-coral", "vs-steel", "vs-muted"] },
      ],
      "bg-color": [
        { bg: ["obsidian", "graphite", "ivory", "vs-red", "vs-coral", "vs-steel", "vs-muted"] },
      ],
      "border-color": [
        { border: ["obsidian", "graphite", "ivory", "vs-red", "vs-coral", "vs-steel", "vs-muted"] },
      ],
      rounded: [{ rounded: ["card", "stage"] }],
      p: [{ p: ["section", "section-sm"] }],
      py: [{ py: ["section", "section-sm"] }],
      pt: [{ pt: ["section", "section-sm"] }],
      pb: [{ pb: ["section", "section-sm"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
