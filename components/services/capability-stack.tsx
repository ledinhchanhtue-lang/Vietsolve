"use client"

import { useState } from "react"
import { PrimaryButton } from "@/components/ui-kit/button"
import { cn } from "@/lib/utils"

/**
 * Cross-capability Project Builder — the page's second wow moment.
 *
 * "Không dự án nào chỉ cần một dịch vụ": pick a problem type, and the matching
 * modules stack themselves into a project with an LED rail running through the
 * assembly order, a one-line output preview, and a CTA that carries the right
 * ?service= query to Contact.
 *
 * Module lists describe how the team assembles for each problem — process, not
 * a results claim. The stack itself is a decorative reflection of the selected
 * problem (aria-hidden); the selector buttons carry the state.
 */

type Problem = {
  label: string
  modules: string[]
  output: string
  service: string
}

const PROBLEMS: Problem[] = [
  {
    label: "Ra mắt thương hiệu",
    modules: ["Strategy", "Identity", "Website", "Media", "Growth"],
    output: "Một thương hiệu sẵn sàng xuất hiện: định vị, nhận diện, website và chiến dịch ra mắt.",
    service: "branding-strategy",
  },
  {
    label: "Tăng trưởng bán hàng",
    modules: ["Strategy", "Growth", "Media", "Landing page", "Data"],
    output: "Một hệ chiến dịch: hành trình khách hàng, nội dung, kênh và đo lường.",
    service: "marketing-growth",
  },
  {
    label: "Xây website",
    modules: ["Strategy", "UX", "Website", "CMS", "SEO"],
    output: "Một nền tảng số: kiến trúc trải nghiệm, website, hệ quản trị nội dung và nền SEO.",
    service: "website-digital",
  },
  {
    label: "Sản xuất chiến dịch",
    modules: ["Concept", "Storyboard", "Production", "Edit", "Distribution"],
    output: "Một chiến dịch media: từ concept, sản xuất đến phân phối nội dung.",
    service: "media-creative",
  },
  {
    label: "Tự động hóa quy trình",
    modules: ["Process audit", "AI Agent", "CRM integration", "Data", "Human control"],
    output: "Một quy trình vận hành: AI xử lý, CRM đồng bộ, con người kiểm soát.",
    service: "ai-automation",
  },
]

export function CapabilityStack() {
  const [idx, setIdx] = useState(0)
  const active = PROBLEMS[idx]

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-12">
      {/* Problem selector — column on desktop, pills on mobile (stepper-like) */}
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

      {/* Project stack */}
      <div className="relative rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5 sm:p-7">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"
        />
        <p key={active.label} className="vs-scene text-sm font-bold uppercase tracking-wider text-gray-900">
          {active.label}
        </p>

        {/* Modules assemble into the stack, LED rail threads them in order */}
        <div key={`stack-${active.label}`} aria-hidden="true" className="mt-4 space-y-2">
          {active.modules.map((m, i) => (
            <div
              key={m}
              className="flex items-center gap-3"
              style={{ animation: `vs-fill-in 0.35s ease-out ${i * 0.14}s backwards` }}
            >
              <span className="flex flex-col items-center self-stretch">
                <span className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_6px_rgba(220,38,38,0.6)]" />
                {i < active.modules.length - 1 && <span className="w-px flex-1 bg-red-300" />}
              </span>
              <span
                className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-sm"
                style={{ marginLeft: `${i * 10}px` }}
              >
                {m}
              </span>
            </div>
          ))}
        </div>

        {/* Output preview */}
        <div key={`out-${active.label}`} className="vs-scene mt-5 rounded-xl border border-red-100 bg-red-50/40 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-red-700/70">Đầu ra</p>
          <p className="mt-1 text-sm leading-relaxed text-gray-700">{active.output}</p>
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
