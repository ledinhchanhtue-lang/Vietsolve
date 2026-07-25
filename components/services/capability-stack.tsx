"use client"

import { useState } from "react"
import { PrimaryButton } from "@/components/ui-kit/button"
import { cn } from "@/lib/utils"

/**
 * Cross-capability Project Builder — the page's second wow moment.
 *
 * "Không dự án nào chỉ cần một dịch vụ": pick a problem type and the matching
 * modules assemble into a project — each module carries its own mini artifact
 * (not just a name pill), an LED rail threads them in assembly order, and a
 * composed output preview shows what the finished project looks like. The CTA
 * carries the right ?service= query to Contact.
 *
 * Everything here describes how the team assembles for a problem — process, not
 * a results claim. The stack + preview are a decorative reflection of the
 * selection (aria-hidden); the selector buttons carry the state.
 */

type ModuleKind =
  | "strategy" | "identity" | "website" | "media" | "growth" | "landing"
  | "data" | "ux" | "ui" | "dev" | "seo" | "concept" | "storyboard"
  | "production" | "edit" | "distribution" | "audit" | "ai" | "crm"
  | "human" | "reporting"

type PreviewKind = "brand-kit" | "growth-system" | "product" | "campaign-wall" | "automation"

type Problem = {
  label: string
  modules: Array<{ name: string; kind: ModuleKind }>
  outputTitle: string
  output: string
  preview: PreviewKind
  service: string
}

const INK = "rgb(15 23 42 / 0.35)"
const RED = "#dc2626"

/* ---------- Module glyph — a tiny artifact per module ---------- */
function Glyph({ kind }: { kind: ModuleKind }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const
  switch (kind) {
    case "strategy":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="8" height="8" rx="1.5" stroke={INK} />
          <rect x="13" y="3" width="8" height="8" rx="1.5" fill={RED} opacity="0.85" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" stroke={INK} />
          <rect x="13" y="13" width="8" height="8" rx="1.5" stroke={INK} />
        </svg>
      )
    case "identity":
      return (
        <svg {...common}>
          <circle cx="7" cy="8" r="4" fill={RED} opacity="0.85" />
          <rect x="13" y="4.5" width="7" height="7" rx="1.5" stroke={INK} />
          <rect x="3" y="16" width="18" height="4" rx="2" fill="rgb(15 23 42 / 0.15)" />
        </svg>
      )
    case "website":
    case "dev":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="15" rx="2" stroke={INK} />
          <path d="M3 8 H21" stroke={INK} />
          <rect x="5.5" y="10.5" width="7" height="6" rx="1" fill={RED} opacity="0.7" />
          <path d="M14 11 H19 M14 14 H17" stroke={INK} strokeLinecap="round" />
        </svg>
      )
    case "media":
    case "storyboard":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" stroke={INK} />
          <path d="M3 5 V19 M21 5 V19" stroke={INK} strokeDasharray="2 2" />
          <path d="M9 12 L14 9 V15 Z" fill={RED} opacity="0.85" />
        </svg>
      )
    case "growth":
    case "reporting":
      return (
        <svg {...common}>
          <path d="M3 20 V4 M3 20 H21" stroke={INK} strokeLinecap="round" />
          <path d="M6 16 L11 11 L14 13 L20 6" stroke={RED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="6" r="1.6" fill={RED} />
        </svg>
      )
    case "landing":
    case "ui":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" stroke={INK} />
          <rect x="6.5" y="5.5" width="11" height="4" rx="1" fill={RED} opacity="0.7" />
          <path d="M6.5 12 H17.5 M6.5 15 H14" stroke={INK} strokeLinecap="round" />
          <rect x="6.5" y="17" width="7" height="2.2" rx="1.1" fill="rgb(15 23 42 / 0.2)" />
        </svg>
      )
    case "data":
      return (
        <svg {...common}>
          <rect x="4" y="12" width="3.5" height="8" rx="1" fill="rgb(15 23 42 / 0.2)" />
          <rect x="10" y="8" width="3.5" height="12" rx="1" fill="rgb(15 23 42 / 0.2)" />
          <rect x="16" y="5" width="3.5" height="15" rx="1" fill={RED} opacity="0.8" />
        </svg>
      )
    case "ux":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" stroke={INK} />
          <rect x="5.5" y="6.5" width="5" height="11" rx="1" fill="rgb(15 23 42 / 0.14)" />
          <path d="M12.5 7 H18.5 M12.5 10 H16.5 M12.5 13 H18" stroke={INK} strokeLinecap="round" />
          <rect x="12.5" y="15" width="5" height="2.2" rx="1.1" fill={RED} opacity="0.7" />
        </svg>
      )
    case "seo":
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="6" stroke={INK} />
          <path d="M14.5 14.5 L20 20" stroke={RED} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case "concept":
      return (
        <svg {...common}>
          <circle cx="9" cy="12" r="5.5" stroke={INK} />
          <circle cx="15" cy="12" r="5.5" stroke={RED} opacity="0.7" />
        </svg>
      )
    case "production":
      return (
        <svg {...common}>
          <rect x="3" y="8" width="18" height="12" rx="2" stroke={INK} />
          <path d="M3 8 L7 4 L11 8 M11 8 L15 4 L19 8" stroke={INK} strokeLinejoin="round" />
          <circle cx="12" cy="14" r="2.6" fill={RED} opacity="0.8" />
        </svg>
      )
    case "edit":
      return (
        <svg {...common}>
          <path d="M3 8 H21 M3 12 H21 M3 16 H21" stroke={INK} strokeLinecap="round" />
          <rect x="6" y="6" width="5" height="4" rx="1" fill="rgb(15 23 42 / 0.16)" />
          <rect x="12" y="10" width="6" height="4" rx="1" fill={RED} opacity="0.75" />
          <path d="M9 4 V20" stroke={RED} strokeWidth="1.4" />
        </svg>
      )
    case "distribution":
      return (
        <svg {...common}>
          <circle cx="5" cy="12" r="2.4" fill={RED} opacity="0.85" />
          <circle cx="18" cy="6" r="2.2" stroke={INK} />
          <circle cx="18" cy="12" r="2.2" stroke={INK} />
          <circle cx="18" cy="18" r="2.2" stroke={INK} />
          <path d="M7 11 L16 6.5 M7.2 12 H15.8 M7 13 L16 17.5" stroke={INK} strokeLinecap="round" />
        </svg>
      )
    case "audit":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" stroke={INK} />
          <path d="M7 8 L8.5 9.5 L11 7" stroke={RED} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 13.5 L8.5 15 L11 12.5" stroke={INK} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 8.5 H17 M13 14 H17" stroke={INK} strokeLinecap="round" />
        </svg>
      )
    case "ai":
      return (
        <svg {...common}>
          <path d="M4 6 A2 2 0 0 1 6 4 H18 A2 2 0 0 1 20 6 V13 A2 2 0 0 1 18 15 H10 L6 19 V15 A2 2 0 0 1 4 13 Z" stroke={INK} strokeLinejoin="round" />
          <circle cx="9" cy="10" r="1.2" fill={INK} />
          <circle cx="12" cy="10" r="1.2" fill={RED} />
          <circle cx="15" cy="10" r="1.2" fill={INK} />
        </svg>
      )
    case "crm":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" stroke={INK} />
          <circle cx="7.5" cy="9" r="2" fill={RED} opacity="0.8" />
          <path d="M11 8 H18 M11 11 H16 M6 15 H18" stroke={INK} strokeLinecap="round" />
        </svg>
      )
    case "human":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" stroke={INK} />
          <path d="M8 12 L11 15 L16.5 9" stroke={RED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
  }
}

const PROBLEMS: Problem[] = [
  {
    label: "Ra mắt thương hiệu",
    modules: [
      { name: "Strategy canvas", kind: "strategy" },
      { name: "Identity board", kind: "identity" },
      { name: "Website frame", kind: "website" },
      { name: "Media asset", kind: "media" },
      { name: "Launch campaign", kind: "growth" },
    ],
    outputTitle: "Brand launch kit",
    output: "Một thương hiệu sẵn sàng xuất hiện: định vị, nhận diện, website và chiến dịch ra mắt.",
    preview: "brand-kit",
    service: "branding-strategy",
  },
  {
    label: "Tăng trưởng bán hàng",
    modules: [
      { name: "Customer journey", kind: "growth" },
      { name: "Campaign", kind: "media" },
      { name: "Landing page", kind: "landing" },
      { name: "CRM", kind: "crm" },
      { name: "Data", kind: "data" },
    ],
    outputTitle: "Growth system",
    output: "Một hệ chiến dịch: hành trình khách hàng, nội dung, kênh và đo lường.",
    preview: "growth-system",
    service: "marketing-growth",
  },
  {
    label: "Xây website",
    modules: [
      { name: "Strategy", kind: "strategy" },
      { name: "UX", kind: "ux" },
      { name: "UI", kind: "ui" },
      { name: "Development", kind: "dev" },
      { name: "Analytics", kind: "data" },
    ],
    outputTitle: "Digital product",
    output: "Một nền tảng số: kiến trúc trải nghiệm, giao diện, phát triển và đo lường.",
    preview: "product",
    service: "website-digital",
  },
  {
    label: "Sản xuất chiến dịch",
    modules: [
      { name: "Concept", kind: "concept" },
      { name: "Key visual", kind: "identity" },
      { name: "Storyboard", kind: "storyboard" },
      { name: "Media production", kind: "production" },
      { name: "Distribution", kind: "distribution" },
    ],
    outputTitle: "Campaign launch wall",
    output: "Một chiến dịch media: từ concept, sản xuất đến phân phối nội dung.",
    preview: "campaign-wall",
    service: "media-creative",
  },
  {
    label: "Tự động hóa quy trình",
    modules: [
      { name: "Process audit", kind: "audit" },
      { name: "AI Agent", kind: "ai" },
      { name: "CRM integration", kind: "crm" },
      { name: "Human control", kind: "human" },
      { name: "Reporting", kind: "reporting" },
    ],
    outputTitle: "Automation console",
    output: "Một quy trình vận hành: AI xử lý, CRM đồng bộ, con người kiểm soát.",
    preview: "automation",
    service: "ai-automation",
  },
]

/* ---------- Composed output preview per problem ---------- */
function Preview({ kind }: { kind: PreviewKind }) {
  if (kind === "brand-kit")
    return (
      <div className="grid grid-cols-3 gap-2" aria-hidden="true">
        <div className="col-span-1 flex items-center justify-center rounded-md border border-gray-200 bg-white py-3 text-lg font-bold text-gray-800">Aa</div>
        <div className="col-span-2 flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3">
          <span className="h-6 w-6 rounded bg-red-600" />
          <span className="h-6 w-6 rounded bg-gray-900" />
          <span className="h-6 w-6 rounded border border-gray-200 bg-gray-100" />
        </div>
        <div className="col-span-2 overflow-hidden rounded-md border border-gray-200 bg-white">
          <span className="block h-4 border-b border-gray-100 bg-gray-50" />
          <span className="block h-6 bg-gradient-to-r from-red-100 to-transparent" />
        </div>
        <div className="rounded-md bg-gradient-to-br from-red-600 to-gray-900" />
      </div>
    )
  if (kind === "growth-system")
    return (
      <div className="grid grid-cols-2 gap-2" aria-hidden="true">
        <svg viewBox="0 0 120 64" className="w-full rounded-md border border-gray-200 bg-white p-1.5">
          <path d="M6 52 C 36 44, 60 30, 114 12" stroke={RED} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M6 52 C 36 44, 60 30, 114 12 V 60 H 6 Z" fill="rgb(220 38 38 / 0.08)" />
        </svg>
        <div className="rounded-md border border-gray-200 bg-white p-2">
          {["Traffic", "Lead", "Khách hàng"].map((r, i) => (
            <div key={r} className="mt-1 flex items-center gap-1.5 first:mt-0">
              <span className="w-12 text-[9px] font-semibold text-gray-500">{r}</span>
              <span className={cn("h-2 rounded-full", i === 0 ? "w-full bg-gray-200" : i === 1 ? "w-2/3 bg-red-200" : "w-1/3 bg-red-500/70")} />
            </div>
          ))}
        </div>
      </div>
    )
  if (kind === "product")
    return (
      <div className="flex items-end gap-2" aria-hidden="true">
        <div className="flex-1 overflow-hidden rounded-md border border-gray-200 bg-white">
          <span className="flex h-4 items-center gap-1 border-b border-gray-100 bg-gray-50 px-1.5">
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span className="h-1 w-1 rounded-full bg-gray-300" />
          </span>
          <span className="block space-y-1 p-2">
            <span className="block h-3 w-3/5 rounded bg-red-100" />
            <span className="block h-2 w-full rounded bg-gray-100" />
            <span className="block h-2 w-4/5 rounded bg-gray-100" />
          </span>
        </div>
        <div className="w-14 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <span className="mx-auto mt-1 block h-1 w-6 rounded-full bg-gray-300" />
          <span className="block space-y-1 p-1.5">
            <span className="block h-6 rounded bg-red-100" />
            <span className="block h-1.5 w-full rounded bg-gray-100" />
            <span className="block h-1.5 w-2/3 rounded bg-gray-100" />
          </span>
        </div>
      </div>
    )
  if (kind === "campaign-wall")
    return (
      <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={cn(
              "aspect-video rounded-md",
              i === 1 ? "bg-gradient-to-br from-red-600 to-red-800" : i === 4 ? "bg-red-100" : "bg-gray-100",
            )}
          />
        ))}
      </div>
    )
  // automation
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {["Trigger", "AI", "CRM", "Duyệt", "Xong"].map((s, i) => (
        <span key={s} className="flex flex-1 items-center gap-1.5">
          <span className={cn("flex-1 rounded-md border px-1 py-1.5 text-center text-[9px] font-semibold", i === 1 ? "border-red-300 bg-red-50 text-red-700" : "border-gray-200 bg-white text-gray-600")}>
            {s}
          </span>
          {i < 4 && <span className="h-px w-2 shrink-0 bg-red-300" />}
        </span>
      ))}
    </div>
  )
}

export function CapabilityStack() {
  const [idx, setIdx] = useState(0)
  const active = PROBLEMS[idx]

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-12">
      {/* Problem selector — column on desktop, wrap of pills on mobile */}
      <div role="group" aria-label="Loại bài toán" className="flex flex-wrap gap-2 lg:flex-col">
        {PROBLEMS.map((p, i) => {
          const selected = i === idx
          return (
            <button
              key={p.label}
              type="button"
              aria-pressed={selected}
              onClick={() => setIdx(i)}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-sm font-semibold transition-all duration-200 lg:min-h-[52px] lg:text-base",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
                selected
                  ? "border-red-600 bg-red-50/70 text-red-700 shadow-[inset_0_0_0_1px_rgba(220,38,38,0.2),0_0_14px_-6px_rgba(220,38,38,0.5)]"
                  : "border-gray-200 bg-white text-gray-700 hover:border-red-200",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-200",
                  selected ? "bg-red-600 shadow-[0_0_6px_rgba(220,38,38,0.7)]" : "bg-gray-300",
                )}
              />
              {p.label}
            </button>
          )
        })}
      </div>

      {/* Project assembly */}
      <div className="relative rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5 sm:p-7">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"
        />
        <p key={active.label} className="vs-scene text-sm font-bold uppercase tracking-wider text-gray-900">
          {active.label}
        </p>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_minmax(0,240px)]">
          {/* Modules assemble in order — each with its own artifact glyph */}
          <div key={`stack-${active.label}`} aria-hidden="true" className="space-y-2">
            {active.modules.map((m, i) => (
              <div
                key={m.name}
                className="flex items-stretch gap-3"
                style={{ animation: `vs-fill-in 0.35s ease-out ${i * 0.13}s backwards` }}
              >
                <span className="flex flex-col items-center">
                  <span className="mt-4 h-2 w-2 shrink-0 rounded-full bg-red-600 shadow-[0_0_6px_rgba(220,38,38,0.6)]" />
                  {i < active.modules.length - 1 && <span className="w-px flex-1 bg-red-300" />}
                </span>
                <span
                  className="flex flex-1 items-center gap-3 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 shadow-sm"
                  style={{ marginLeft: `${i * 8}px` }}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gray-100 bg-gray-50">
                    <Glyph kind={m.kind} />
                  </span>
                  <span className="text-sm font-semibold text-gray-800">{m.name}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Composed output preview — what the assembled project becomes */}
          <div key={`prev-${active.label}`} className="vs-scene self-start rounded-xl border border-red-100 bg-red-50/40 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-red-700/70">Đầu ra dự án</p>
            <p className="mt-1 text-sm font-bold text-gray-900">{active.outputTitle}</p>
            <div className="mt-3">
              <Preview kind={active.preview} />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-gray-600">{active.output}</p>
          </div>
        </div>

        <div className="mt-6">
          <PrimaryButton href={`/contact?service=${active.service}`}>
            Bắt đầu với bài toán này
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
