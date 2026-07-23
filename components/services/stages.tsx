"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Play, RotateCcw, Monitor, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Six product stages — one distinct interactive scene per service group.
 *
 * Every scene shows the artifacts that group actually produces, and every
 * interaction explains process, never results: nothing here renders a number
 * that could be mistaken for a client outcome. The one real asset available is
 * VietSolve's own brand (logo PNG); everything else is a clearly-labelled
 * interface demo. Charcoal ink + one brand red throughout, so six different
 * scenes still read as one system.
 */

const INK = "rgb(15 23 42 / 0.12)"

/* Small selectable chip used by several scenes for their hotspots */
function SceneChip({
  children,
  selected,
  onSelect,
}: {
  children: React.ReactNode
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "min-h-11 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 sm:text-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
        selected
          ? "border-red-600 bg-red-50 text-red-700 shadow-[0_0_12px_-5px_rgba(220,38,38,0.6)]"
          : "border-gray-200 bg-white text-gray-600 hover:border-red-200",
      )}
    >
      {children}
    </button>
  )
}

/* Progress rail: n dots, lit through `active` */
function LedRail({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="flex flex-1 items-center gap-1">
          <span
            className={cn(
              "h-2 w-2 shrink-0 rounded-full transition-all duration-300",
              i <= active
                ? "bg-red-600 shadow-[0_0_6px_rgba(220,38,38,0.6)]"
                : "border border-gray-300 bg-white",
            )}
          />
          {i < count - 1 && (
            <span
              className={cn(
                "h-px flex-1 transition-colors duration-300",
                i < active ? "bg-red-400" : "bg-gray-200",
              )}
            />
          )}
        </span>
      ))}
    </div>
  )
}

/* ================================================================== */
/* 6.1 Branding & Strategy — Brand System Table                        */
/* ================================================================== */
export function BrandStage() {
  const PHASES = ["Strategy", "Identity", "Application"] as const
  const [phase, setPhase] = useState(1)

  const dim = (idx: number) =>
    cn("rounded-xl border p-3 transition-all duration-300", phase === idx
      ? "border-red-300 bg-white shadow-[0_0_16px_-8px_rgba(220,38,38,0.5)]"
      : "border-gray-200 bg-white/70 opacity-50")

  return (
    <div className="vs-scene">
      <div className="grid gap-3 sm:grid-cols-3">
        {/* Strategy: positioning canvas */}
        <div className={dim(0)}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Strategy</p>
          <div className="mt-2 space-y-1.5">
            {["Định vị", "Khách hàng", "Thông điệp"].map((r) => (
              <div key={r} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600/60" />
                <span className="text-xs font-medium text-gray-600">{r}</span>
                <span className="ml-auto h-1.5 w-10 rounded-full bg-gray-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Identity: the REAL VietSolve logo + variations + type + colour */}
        <div className={dim(1)}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Identity</p>
          <div className="mt-2 flex items-center justify-center rounded-lg border border-gray-100 bg-white p-2">
            <Image
              src="/images/logo-vietsolve-official.png"
              alt="Logo VietSolve — logo master trong hệ thống thương hiệu"
              width={120}
              height={120}
              className="h-14 w-auto"
            />
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5" aria-hidden="true">
            <span className="flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white">
              <Image src="/images/logo-vietsolve-official.png" alt="" width={40} height={40} className="h-6 w-auto opacity-40 grayscale" />
            </span>
            <span className="flex h-9 items-center justify-center rounded-md bg-gray-900">
              <Image src="/images/logo-vietsolve-official.png" alt="" width={40} height={40} className="h-6 w-auto brightness-0 invert" />
            </span>
            <span className="flex h-9 items-center justify-center rounded-md bg-red-600">
              <Image src="/images/logo-vietsolve-official.png" alt="" width={40} height={40} className="h-6 w-auto brightness-0 invert" />
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5" aria-hidden="true">
            <span className="h-6 w-6 rounded-md bg-red-600" />
            <span className="h-6 w-6 rounded-md bg-gray-900" />
            <span className="h-6 w-6 rounded-md border border-gray-200 bg-white" />
            <span className="ml-auto text-lg font-bold text-gray-800">Aa</span>
            <span className="text-sm font-semibold text-gray-500">Aa</span>
            <span className="text-xs text-gray-400">Aa</span>
          </div>
        </div>

        {/* Application: guideline page + key visual + social */}
        <div className={dim(2)}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Application</p>
          <div className="mt-2 grid grid-cols-2 gap-1.5" aria-hidden="true">
            <span className="block space-y-1 rounded-md border border-gray-200 bg-white p-1.5">
              <span className="block h-1.5 w-3/4 rounded-full bg-red-200" />
              <span className="block h-1 w-full rounded-full bg-gray-100" />
              <span className="block h-1 w-2/3 rounded-full bg-gray-100" />
            </span>
            <span className="block rounded-md bg-gradient-to-br from-red-600 to-gray-900 p-1.5">
              <span className="block h-1.5 w-1/2 rounded-full bg-white/80" />
            </span>
            <span className="col-span-2 flex items-center gap-1.5 rounded-md border border-gray-200 bg-white p-1.5">
              <span className="h-5 w-5 rounded-full bg-red-100" />
              <span className="h-1.5 flex-1 rounded-full bg-gray-100" />
            </span>
          </div>
        </div>
      </div>

      {/* Strategy → Identity → Application connector + hotspots */}
      <div className="mt-4">
        <LedRail count={3} active={phase} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {PHASES.map((p, i) => (
          <SceneChip key={p} selected={phase === i} onSelect={() => setPhase(i)}>
            {p}
          </SceneChip>
        ))}
      </div>
    </div>
  )
}

/* ================================================================== */
/* 6.2 Marketing & Growth — Campaign Command Board                     */
/* ================================================================== */
export function GrowthStage() {
  const JOURNEY = [
    { label: "Awareness", channels: ["Social", "Video"], creative: "social" },
    { label: "Consideration", channels: ["Search", "Landing page"], creative: "landing" },
    { label: "Conversion", channels: ["Landing page", "Email"], creative: "form" },
  ] as const
  const [stage, setStage] = useState(0)
  const activeChannels = new Set<string>(JOURNEY[stage].channels)

  return (
    <div className="vs-scene">
      {/* Journey with LED progress */}
      <div className="flex flex-wrap gap-2">
        {JOURNEY.map((j, i) => (
          <SceneChip key={j.label} selected={stage === i} onSelect={() => setStage(i)}>
            {j.label}
          </SceneChip>
        ))}
      </div>
      <div className="mt-3">
        <LedRail count={3} active={stage} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_240px]">
        {/* Creative preview per stage */}
        <div key={stage} className="vs-scene rounded-xl border border-gray-200 bg-white p-3">
          {JOURNEY[stage].creative === "social" && (
            <div className="flex gap-2" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span key={i} className={cn("block flex-1 space-y-1.5 rounded-lg border p-2", i === 0 ? "border-red-200" : "border-gray-200")}>
                  <span className={cn("block h-14 rounded-md", i === 0 ? "bg-gradient-to-br from-red-500 to-red-700" : "bg-gray-100")} />
                  <span className="block h-1.5 w-3/4 rounded-full bg-gray-200" />
                  <span className="block h-1.5 w-1/2 rounded-full bg-gray-100" />
                </span>
              ))}
            </div>
          )}
          {JOURNEY[stage].creative === "landing" && (
            <div className="space-y-1.5" aria-hidden="true">
              <span className="block h-8 rounded-md bg-gradient-to-r from-red-600/90 to-red-700/70" />
              <div className="grid grid-cols-3 gap-1.5">
                <span className="block h-10 rounded-md bg-gray-100" />
                <span className="block h-10 rounded-md bg-gray-100" />
                <span className="block h-10 rounded-md bg-gray-100" />
              </div>
              <span className="mx-auto block h-6 w-32 rounded-full bg-red-600" />
            </div>
          )}
          {JOURNEY[stage].creative === "form" && (
            <div className="space-y-1.5" aria-hidden="true">
              <span className="block h-6 rounded-md border border-gray-200 bg-white" />
              <span className="block h-6 rounded-md border border-gray-200 bg-white" />
              <span className="block h-6 rounded-md border border-red-300 bg-red-50/40 shadow-[0_0_10px_-4px_rgba(220,38,38,0.5)]" />
              <span className="block h-7 w-36 rounded-full bg-red-600" />
            </div>
          )}
        </div>

        {/* Channel plan + calendar */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {["Social", "Search", "Email", "Landing page", "Video"].map((c) => (
              <span
                key={c}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all duration-300",
                  activeChannels.has(c)
                    ? "border-red-300 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-400 opacity-60",
                )}
              >
                {c}
              </span>
            ))}
          </div>
          {/* 4-week calendar — placement rhythm, no numbers */}
          <div className="grid grid-cols-7 gap-1" aria-hidden="true">
            {Array.from({ length: 28 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "aspect-square rounded-[4px] border",
                  [2, 5, 9, 12, 16, 19, 23, 26].includes(i)
                    ? "border-red-200 bg-red-100/70"
                    : "border-gray-100 bg-gray-50",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ================================================================== */
/* 6.3 Media & Creative — Production Suite                             */
/* ================================================================== */
export function MediaStage() {
  /* Clip start positions on the timeline (%) — clicking a storyboard frame
     jumps the playhead to its clip. */
  const CLIPS = [2, 30, 56, 80]
  const [frame, setFrame] = useState<number | null>(null)

  return (
    <div className="vs-scene">
      {/* Storyboard */}
      <div className="grid grid-cols-4 gap-2">
        {CLIPS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={frame === i}
            aria-label={`Cảnh ${i + 1}`}
            onClick={() => setFrame(i)}
            className={cn(
              "group relative aspect-video min-h-11 overflow-hidden rounded-lg border transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
              frame === i ? "border-red-500 shadow-[0_0_14px_-6px_rgba(220,38,38,0.6)]" : "border-gray-200 hover:border-red-200",
            )}
          >
            <svg viewBox="0 0 96 54" className="h-full w-full" aria-hidden="true">
              <rect width="96" height="54" fill={i % 2 ? "rgb(15 23 42 / 0.05)" : "rgb(15 23 42 / 0.08)"} />
              {i === 0 && <circle cx="30" cy="27" r="12" fill="rgb(220 38 38 / 0.5)" />}
              {i === 1 && <path d="M10 44 L 40 20 L 62 34 L 86 14" stroke="rgb(220 38 38 / 0.6)" strokeWidth="2.5" fill="none" />}
              {i === 2 && <rect x="28" y="14" width="40" height="26" rx="4" fill="rgb(220 38 38 / 0.35)" />}
              {i === 3 && (
                <g fill="rgb(15 23 42 / 0.25)">
                  <rect x="12" y="20" width="30" height="5" rx="2.5" />
                  <rect x="12" y="30" width="50" height="4" rx="2" fill="rgb(220 38 38 / 0.45)" />
                </g>
              )}
              <text x="5" y="49" fontSize="7" fontWeight="700" fill="rgb(15 23 42 / 0.35)">{`0${i + 1}`}</text>
            </svg>
          </button>
        ))}
      </div>

      {/* Timeline — playhead sweeps once on mount, storyboard clicks reposition it */}
      <div className="relative mt-3 rounded-xl border border-gray-200 bg-white p-3" aria-hidden="true">
        <div className="space-y-1.5">
          <div className="flex gap-1">
            {CLIPS.map((start, i) => (
              <span
                key={i}
                className={cn(
                  "h-4 rounded-sm transition-colors duration-300",
                  frame === i ? "bg-red-500/80" : "bg-gray-200",
                )}
                style={{ width: `${[26, 24, 22, 18][i]}%` }}
              />
            ))}
          </div>
          <div className="flex gap-1">
            <span className="h-4 w-[36%] rounded-sm bg-gray-100" />
            <span className="h-4 w-[30%] rounded-sm bg-red-100" />
            <span className="h-4 w-[24%] rounded-sm bg-gray-100" />
          </div>
          {/* Waveform */}
          <div className="flex items-end gap-[3px] pt-1">
            {[8, 14, 20, 11, 17, 9, 15, 22, 12, 8, 14, 10, 18, 11, 7, 13, 19, 10, 15, 8, 12, 16, 9, 14].map((h, i) => (
              <span key={i} className="w-1 rounded-full bg-gray-300" style={{ height: `${h}px` }} />
            ))}
          </div>
        </div>
        {/* Playhead */}
        <span
          className={cn("absolute bottom-2 top-2 w-px bg-red-600 shadow-[0_0_6px_rgba(220,38,38,0.7)]", frame === null && "vs-playhead vs-anim")}
          style={frame !== null ? { left: `${CLIPS[frame]}%` } : undefined}
        />
      </div>

      <p className="mt-2 text-xs text-gray-500">
        Storyboard → dựng → âm thanh — click một cảnh để nhảy playhead tới clip tương ứng.
      </p>
    </div>
  )
}

/* ================================================================== */
/* 6.4 Website & Digital Products — Product Experience Lab             */
/* ================================================================== */
export function WebStage() {
  const PAGES = [
    { label: "Trang chủ", key: "home" },
    { label: "Sản phẩm", key: "products" },
    { label: "Giới thiệu", key: "about" },
    { label: "Liên hệ", key: "contact" },
  ] as const
  const [page, setPage] = useState<(typeof PAGES)[number]["key"]>("home")
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop")

  const Blocks = () => (
    <div className="space-y-1.5" aria-hidden="true">
      {page === "home" && (
        <>
          <span className="block h-9 rounded-md bg-gradient-to-r from-red-600/90 to-red-700/60" />
          <div className={cn("grid gap-1.5", device === "desktop" ? "grid-cols-3" : "grid-cols-1")}>
            <span className="block h-8 rounded-md bg-gray-100" />
            <span className="block h-8 rounded-md bg-gray-100" />
            <span className="block h-8 rounded-md bg-gray-100" />
          </div>
        </>
      )}
      {page === "products" && (
        <div className={cn("grid gap-1.5", device === "desktop" ? "grid-cols-4" : "grid-cols-2")}>
          {Array.from({ length: device === "desktop" ? 8 : 4 }).map((_, i) => (
            <span key={i} className={cn("block h-10 rounded-md", i === 0 ? "bg-red-100 ring-1 ring-red-300" : "bg-gray-100")} />
          ))}
        </div>
      )}
      {page === "about" && (
        <div className={cn("grid gap-1.5", device === "desktop" ? "grid-cols-[2fr_1fr]" : "grid-cols-1")}>
          <span className="block space-y-1 rounded-md border border-gray-200 p-1.5">
            <span className="block h-1.5 w-2/3 rounded-full bg-gray-300" />
            <span className="block h-1.5 w-full rounded-full bg-gray-100" />
            <span className="block h-1.5 w-4/5 rounded-full bg-gray-100" />
          </span>
          <span className="block h-14 rounded-md bg-gradient-to-br from-gray-800 to-red-950" />
        </div>
      )}
      {page === "contact" && (
        <>
          <span className="block h-6 rounded-md border border-gray-200" />
          <span className="block h-6 rounded-md border border-red-300 bg-red-50/40" />
          <span className="block h-6 w-28 rounded-full bg-red-600" />
        </>
      )}
    </div>
  )

  return (
    <div className="vs-scene">
      <div className="grid gap-3 sm:grid-cols-[150px_1fr]">
        {/* Sitemap */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Sitemap</p>
          <div className="mt-2 space-y-1.5 border-l border-gray-200 pl-3">
            {PAGES.map((p) => (
              <button
                key={p.key}
                type="button"
                aria-pressed={page === p.key}
                onClick={() => setPage(p.key)}
                className={cn(
                  "-ml-[13px] flex min-h-11 w-full items-center gap-2 border-l-2 pl-3 text-left text-sm font-semibold transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded-sm",
                  page === p.key ? "border-red-600 text-red-700" : "border-transparent text-gray-500 hover:text-gray-900",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Browser / phone frame with depth */}
        <div>
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Preview</p>
            <div role="group" aria-label="Thiết bị" className="flex rounded-full border border-gray-200 p-0.5">
              {(
                [
                  ["desktop", Monitor],
                  ["mobile", Smartphone],
                ] as const
              ).map(([key, Icon]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={device === key}
                  aria-label={key === "desktop" ? "Bản desktop" : "Bản mobile"}
                  onClick={() => setDevice(key)}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-inset",
                    device === key ? "bg-red-600 text-white" : "text-gray-400 hover:text-gray-700",
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div
            key={`${page}-${device}`}
            className={cn(
              "vs-scene mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_14px_28px_-18px_rgba(15,23,42,0.35)]",
              device === "mobile" && "mx-auto max-w-[190px]",
            )}
            style={{ transform: "perspective(900px) rotateX(1.5deg)" }}
          >
            <div className="flex h-5 items-center gap-1 border-b border-gray-200 bg-gray-50 px-2" aria-hidden="true">
              {device === "desktop" ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                  <span className="ml-1 h-1.5 flex-1 rounded-full bg-gray-200" />
                </>
              ) : (
                <span className="mx-auto h-1 w-10 rounded-full bg-gray-300" />
              )}
            </div>
            <div className="p-2">
              <Blocks />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ================================================================== */
/* 6.5 AI Agents & Automation — Live Workflow Console                  */
/* ================================================================== */
export function AiStage() {
  const STEPS = [
    "Khách hàng gửi yêu cầu",
    "AI đọc nội dung",
    "AI đề xuất phản hồi",
    "Cập nhật CRM",
    "Nhân viên phê duyệt",
    "Hoàn thành tác vụ",
  ]
  const [step, setStep] = useState(-1)
  const [running, setRunning] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const run = () => {
    if (timer.current) clearInterval(timer.current)
    setStep(-1)
    setRunning(true)
    let i = -1
    timer.current = setInterval(() => {
      i += 1
      setStep(i)
      if (i >= STEPS.length - 1) {
        if (timer.current) clearInterval(timer.current)
        setRunning(false)
      }
    }, 650)
  }
  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current)
  }, [])

  const done = step >= STEPS.length - 1

  return (
    <div className="vs-scene">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={run}
          disabled={running}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-full bg-red-600 px-5 text-sm font-semibold text-white transition-colors",
            "hover:bg-red-700 disabled:opacity-60",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
          )}
        >
          {done ? <RotateCcw className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
          {done ? "Chạy lại" : "Chạy demo"}
        </button>
        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-300">Interface demo</span>
      </div>

      <div className="mt-3">
        <LedRail count={6} active={step} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {/* Conversation */}
        <div className="rounded-xl border border-gray-200 bg-white p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Hội thoại</p>
          <div className="mt-2 space-y-1.5" aria-hidden="true">
            <span className={cn("block w-4/5 rounded-lg rounded-bl-sm bg-gray-100 px-2 py-1.5 transition-opacity duration-300", step >= 0 ? "opacity-100" : "opacity-25")}>
              <span className="block h-1.5 w-full rounded-full bg-gray-300" />
              <span className="mt-1 block h-1.5 w-2/3 rounded-full bg-gray-300" />
            </span>
            <span className={cn("ml-auto block w-3/4 rounded-lg rounded-br-sm bg-red-50 px-2 py-1.5 ring-1 ring-red-100 transition-opacity duration-300", step >= 2 ? "opacity-100" : "opacity-25")}>
              <span className="block h-1.5 w-full rounded-full bg-red-200" />
              <span className="mt-1 block h-1.5 w-1/2 rounded-full bg-red-200" />
            </span>
          </div>
        </div>

        {/* Action log + CRM + approval — live region announces progress */}
        <div className="rounded-xl border border-gray-200 bg-white p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Action log</p>
          <ol className="mt-2 space-y-1" aria-live="polite">
            {STEPS.map((s, i) => (
              <li
                key={s}
                className={cn(
                  "flex items-center gap-2 text-xs transition-all duration-300",
                  i <= step ? "text-gray-800" : "text-gray-300",
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full",
                    i <= step ? (i === 4 ? "bg-gray-900" : "bg-red-600") : "bg-gray-200",
                  )}
                  aria-hidden="true"
                />
                {s}
                {i === 4 && i <= step && (
                  <span className="ml-auto rounded-full border border-gray-300 px-1.5 py-px text-[9px] font-bold uppercase text-gray-600">
                    Human
                  </span>
                )}
                {i === 5 && i <= step && (
                  <span className="ml-auto rounded-full bg-red-600 px-1.5 py-px text-[9px] font-bold uppercase text-white">
                    Done
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="mt-2 text-xs text-gray-500">
        Một tình huống cụ thể: AI xử lý — con người phê duyệt. Không có bước nào tự động gửi đi khi
        chưa được duyệt.
      </p>
    </div>
  )
}

/* ================================================================== */
/* 6.6 Data, SEO & Analytics — Search & Insight Lab                    */
/* ================================================================== */
export function DataStage() {
  const CLUSTERS = [
    {
      label: "Từ khóa thương hiệu",
      hit: 0,
      recs: ["Chuẩn hóa title & meta cho trang thương hiệu", "Schema Organization + logo"],
    },
    {
      label: "Từ khóa sản phẩm",
      hit: 1,
      recs: ["Trang danh mục theo cụm từ khóa", "Schema Product + internal link"],
    },
    {
      label: "Từ khóa thông tin",
      hit: 2,
      recs: ["Bài viết chuyên sâu theo chủ đề", "Liên kết về trang dịch vụ liên quan"],
    },
  ]
  const [cluster, setCluster] = useState(0)
  const active = CLUSTERS[cluster]

  return (
    <div className="vs-scene">
      <div className="flex flex-wrap gap-2">
        {CLUSTERS.map((c, i) => (
          <SceneChip key={c.label} selected={cluster === i} onSelect={() => setCluster(i)}>
            {c.label}
          </SceneChip>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {/* SERP preview — the row this cluster targets lights up */}
        <div className="rounded-xl border border-gray-200 bg-white p-3">
          <div className="flex h-6 items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full border border-gray-300" />
            <span className="h-1.5 w-24 rounded-full bg-gray-200" />
          </div>
          <div className="mt-2 space-y-2" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "rounded-lg border p-2 transition-all duration-300",
                  active.hit === i ? "border-red-300 bg-red-50/40 shadow-[0_0_10px_-5px_rgba(220,38,38,0.5)]" : "border-gray-100 opacity-60",
                )}
              >
                <span className={cn("block h-1.5 rounded-full", active.hit === i ? "w-3/4 bg-red-300" : "w-2/3 bg-gray-300")} />
                <span className="mt-1 block h-1 w-1/3 rounded-full bg-gray-200" />
                <span className="mt-1 block h-1 w-full rounded-full bg-gray-100" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {/* Trend line — no axes, no numbers: shape only */}
          <div className="rounded-xl border border-gray-200 bg-white p-3">
            <div className="flex items-baseline justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Xu hướng tìm kiếm</p>
              <span className="text-[9px] font-medium uppercase tracking-wider text-gray-300">Interface demo</span>
            </div>
            <svg viewBox="0 0 220 56" className="mt-1 h-14 w-full" aria-hidden="true">
              <path d="M4 46 C 40 42, 70 34, 104 28 S 180 14, 216 10" stroke="rgb(220 38 38 / 0.7)" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M4 46 C 40 42, 70 34, 104 28 S 180 14, 216 10 V 56 H 4 Z" fill="rgb(220 38 38 / 0.06)" stroke="none" />
              <circle cx="216" cy="10" r="3" fill="#dc2626" />
            </svg>
          </div>
          {/* Funnel — stage names only */}
          <div className="rounded-xl border border-gray-200 bg-white p-3" aria-hidden="true">
            {["Traffic", "Liên hệ", "Khách hàng"].map((f, i) => (
              <div key={f} className="mt-1 flex items-center gap-2 first:mt-0">
                <span className="w-16 text-[10px] font-semibold text-gray-500">{f}</span>
                <span className={cn("h-2.5 rounded-full", i === 0 ? "w-full bg-gray-200" : i === 1 ? "w-2/3 bg-red-200" : "w-1/3 bg-red-500/70")} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations follow the cluster */}
      <div key={cluster} className="vs-scene mt-3 rounded-xl border border-gray-200 bg-gray-50/60 p-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Đề xuất</p>
        <ul className="mt-1.5 space-y-1">
          {active.recs.map((r) => (
            <li key={r} className="flex items-start gap-2 text-xs text-gray-700">
              <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" aria-hidden="true" />
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const STAGE_BY_ID: Record<string, () => React.ReactElement> = {
  "branding-strategy": BrandStage,
  "marketing-growth": GrowthStage,
  "media-creative": MediaStage,
  "website-digital": WebStage,
  "ai-automation": AiStage,
  "data-seo-analytics": DataStage,
}

/** Per-stage demo label — brand uses the real VietSolve system. */
export const STAGE_LABEL: Record<string, string> = {
  "branding-strategy": "Brand system demo — VietSolve",
  "marketing-growth": "Interface demo",
  "media-creative": "Interface demo",
  "website-digital": "Interface demo",
  "ai-automation": "Interface demo",
  "data-seo-analytics": "Interface demo",
}
