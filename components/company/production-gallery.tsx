"use client"

import Image from "next/image"
import type { CompanyPhoto } from "@/lib/content/company-media"
import { cn } from "@/lib/utils"

/**
 * Real-photo gallery for VietSolve's own team / production imagery.
 *
 * Desktop: a fixed row of framed tiles. Mobile: a horizontal scroll-snap strip
 * so it never overflows. Every tile is a real next/image (lazy, sized, alt),
 * framed to a common aspect so mixed source ratios stay tidy, with a red LED
 * edge and caption on hover/focus — the same interaction language as the
 * project thumbnails.
 *
 * Not decorative: these carry alt text and a caption. The eyebrow makes the
 * honesty explicit ("ê-kíp VietSolve"), so nothing reads as a stock photo or a
 * client result.
 */
export function ProductionGallery({
  photos,
  className,
  aspect = "aspect-[3/4]",
}: {
  photos: CompanyPhoto[]
  className?: string
  aspect?: string
}) {
  return (
    <ul
      className={cn(
        "flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "sm:grid sm:snap-none sm:overflow-visible sm:pb-0",
        "sm:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {photos.map((p, i) => (
        <li
          key={p.src}
          className="w-[62%] shrink-0 snap-start sm:w-auto"
        >
          <figure
            className={cn(
              "group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100",
              "transition-colors duration-300 hover:border-red-300",
              aspect,
            )}
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={p.w}
              height={p.h}
              loading="lazy"
              sizes="(max-width: 640px) 62vw, (max-width: 1024px) 33vw, 25vw"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
            {/* Red LED edge on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            {/* Caption */}
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
              <span className="text-xs font-semibold text-white/95">{p.caption}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}
