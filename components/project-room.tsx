"use client"

import { useState } from "react"
import {
  ClipboardList,
  Compass,
  Shapes,
  AppWindow,
  Handshake,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Cách tổ chức đội ngũ — a project room of workstations, replacing the flat
 * org-chart SVG. Hovering or focusing a workstation lights its connection to
 * the Project Lead desk and shows what that station actually hands over.
 *
 * Roles and outputs only — no invented people. The connector overlay is
 * decorative (aria-hidden); the station cards themselves are real content and
 * keyboard-focusable so the interaction is not hover-only.
 */

type Station = {
  id: string
  icon: LucideIcon
  name: string
  output: string
  /** Grid placement */
  area: string
}

const STATIONS: Station[] = [
  {
    id: "lead",
    icon: ClipboardList,
    name: "Project Lead",
    output: "Brief, phạm vi, tiến độ và chất lượng của toàn dự án.",
    area: "lead",
  },
  {
    id: "strategy",
    icon: Compass,
    name: "Strategy Board",
    output: "Định vị, insight khách hàng và hướng triển khai.",
    area: "strategy",
  },
  {
    id: "creative",
    icon: Shapes,
    name: "Creative Workstation",
    output: "Concept, nhận diện, nội dung và thiết kế.",
    area: "creative",
  },
  {
    id: "tech",
    icon: AppWindow,
    name: "Technology Workstation",
    output: "Website, AI agent, automation và tích hợp dữ liệu.",
    area: "tech",
  },
  {
    id: "dock",
    icon: Handshake,
    name: "Specialist Dock",
    output: "Chuyên gia theo từng loại dự án, ghép vào khi cần.",
    area: "dock",
  },
]

export function ProjectRoom() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="relative mx-auto max-w-3xl">
      {/* Connection overlay — lead sits above the three stations, dock below.
          The touched station's line lights red. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 40"
        className="pointer-events-none absolute inset-x-0 top-[74px] hidden h-10 w-full sm:block"
        preserveAspectRatio="none"
      >
        {[
          ["strategy", 100],
          ["creative", 300],
          ["tech", 500],
        ].map(([id, x]) => (
          <path
            key={id as string}
            d={`M300 0 C 300 20, ${x} 20, ${x} 40`}
            fill="none"
            stroke={active === id || active === "lead" ? "rgb(220 38 38 / 0.6)" : "rgb(15 23 42 / 0.14)"}
            strokeWidth={active === id || active === "lead" ? 2 : 1.25}
            className="transition-all duration-300"
          />
        ))}
      </svg>

      <div
        className="grid gap-3 sm:gap-4 sm:[grid-template-areas:'lead_lead_lead''strategy_creative_tech''dock_dock_dock'] sm:[grid-template-columns:1fr_1fr_1fr]"
        onMouseLeave={() => setActive(null)}
      >
        {STATIONS.map((s) => {
          const isLead = s.id === "lead"
          const isDock = s.id === "dock"
          const lit = active === s.id
          return (
            <div
              key={s.id}
              tabIndex={0}
              onMouseEnter={() => setActive(s.id)}
              onFocus={() => setActive(s.id)}
              onBlur={() => setActive(null)}
              style={{ gridArea: s.area }}
              className={cn(
                "group rounded-2xl border bg-white p-5 transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
                isLead && "sm:mx-auto sm:w-72 sm:text-center",
                isDock &&
                  "border-dashed border-red-300/70 bg-red-50/40 sm:text-center",
                !isDock && "border-gray-200",
                lit && !isDock && "border-red-300 shadow-[0_0_18px_-8px_rgba(220,38,38,0.5)] -translate-y-0.5",
                lit && isDock && "shadow-[0_0_18px_-8px_rgba(220,38,38,0.5)] -translate-y-0.5",
              )}
            >
              <div className={cn("flex items-center gap-2.5", (isLead || isDock) && "sm:justify-center")}>
                <s.icon
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className={cn("h-5 w-5 shrink-0 transition-colors", lit ? "text-red-600" : "text-gray-500")}
                />
                <h3 className="font-bold text-gray-900">{s.name}</h3>
                <span
                  aria-hidden="true"
                  className={cn(
                    "ml-auto h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300",
                    (isLead || isDock) && "sm:hidden",
                    lit ? "bg-red-600 shadow-[0_0_6px_rgba(220,38,38,0.7)]" : "bg-gray-200",
                  )}
                />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.output}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
