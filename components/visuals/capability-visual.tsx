"use client"

import { useLanguage } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/**
 * Abstract system diagrams, one per capability stage.
 *
 * These are drawn, not photographed — no stock imagery, no robots, no AI brains.
 * Each one shows the actual shape of the work: a flow, a stack, a journey, a
 * pipeline. Static by default; the only motion is a hover lift on the container.
 */

export type CapabilityVisualKind =
  | "agent-flow"
  | "web-stack"
  | "journey"
  | "creative-pipeline"
  | "automation-chain"
  | "data-mesh"

export function CapabilityVisual({
  kind,
  className,
}: {
  kind: CapabilityVisualKind
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-stage border border-white/[0.08] bg-graphite grid-backdrop",
        className,
      )}
    >
      <div className="absolute inset-0 p-6 sm:p-8">
        {kind === "agent-flow" && <AgentFlow />}
        {kind === "web-stack" && <WebStack />}
        {kind === "journey" && <Journey />}
        {kind === "creative-pipeline" && <CreativePipeline />}
        {kind === "automation-chain" && <AutomationChain />}
        {kind === "data-mesh" && <DataMesh />}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- */

function Panel({
  children,
  className,
  accent,
}: {
  children: React.ReactNode
  className?: string
  accent?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-xl border px-3.5 py-2.5",
        accent ? "border-vs-red/40 bg-vs-red/[0.08]" : "border-white/10 bg-obsidian/70",
        className,
      )}
    >
      {children}
    </div>
  )
}

function Label({ children, dim }: { children: React.ReactNode; dim?: boolean }) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] tracking-tight sm:text-[11px]",
        dim ? "text-white/35" : "text-ivory/80",
      )}
    >
      {children}
    </span>
  )
}

function Connector({ vertical }: { vertical?: boolean }) {
  return (
    <span
      className={cn("shrink-0 bg-gradient-to-r from-vs-red/50 to-vs-red/10", vertical ? "h-4 w-px" : "h-px w-4")}
      aria-hidden="true"
    />
  )
}

/* ---- 01 · AI Agents & Automation ---- */
function AgentFlow() {
  const { t } = useLanguage()
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="flex items-center gap-2">
        <Panel className="flex-1">
          <Label>{t.system.node1}</Label>
        </Panel>
        <Connector />
        <Panel accent className="flex-1">
          <Label>AI Agent</Label>
        </Panel>
      </div>

      <div className="ml-auto flex w-[85%] flex-col gap-2">
        {[t.workflow.retail.s2, t.workflow.retail.s4, t.workflow.retail.s6].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <Connector />
            <Panel className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <Label dim={i > 1}>{s}</Label>
                <span
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full",
                    i === 0 ? "bg-vs-red" : i === 1 ? "bg-vs-red/60" : "bg-white/20",
                  )}
                />
              </div>
            </Panel>
          </div>
        ))}
      </div>

      <div className="mt-1 flex items-center gap-2">
        <Panel className="flex-1">
          <Label dim>{t.system.node6}</Label>
        </Panel>
        <Connector />
        <Panel className="flex-1">
          <Label dim>{t.system.node7}</Label>
        </Panel>
      </div>
    </div>
  )
}

/* ---- 02 · AI Websites & Digital Products ---- */
function WebStack() {
  const { t } = useLanguage()
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {/* Browser chrome — VietSolve's own domain, not a template placeholder */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-obsidian/70">
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-3 py-2">
          <span className="flex gap-1" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/20" />
            ))}
          </span>
          <span className="ml-1 rounded bg-white/[0.06] px-2 py-0.5 font-mono text-[9px] text-white/45">
            vietsolve.vn
          </span>
        </div>
        <div className="space-y-1.5 p-3">
          <span className="block h-1.5 w-2/3 rounded-full bg-white/15" />
          <span className="block h-1.5 w-1/2 rounded-full bg-white/10" />
          <span className="mt-2 block h-5 w-24 rounded-full bg-vs-red/70" />
        </div>
      </div>

      <div className="flex justify-center" aria-hidden="true">
        <Connector vertical />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {["AI", "CRM", "Analytics"].map((s, i) => (
          <Panel key={s} accent={i === 0} className="text-center">
            <Label dim={i !== 0}>{s}</Label>
          </Panel>
        ))}
      </div>

      <Panel className="text-center">
        <Label dim>{t.system.node3}</Label>
      </Panel>
    </div>
  )
}

/* ---- 03 · Brand, Growth & Performance ---- */
function Journey() {
  const stages = ["Awareness", "Consideration", "Decision", "Conversion"]
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="relative">
        <span className="absolute left-0 top-[13px] h-px w-full bg-white/10" aria-hidden="true" />
        <span
          className="absolute left-0 top-[13px] h-px w-3/4 bg-vs-red"
          aria-hidden="true"
        />
        <ol className="relative flex justify-between">
          {stages.map((s, i) => (
            <li key={s} className="flex flex-col items-center gap-3">
              <span
                className={cn(
                  "h-[26px] w-[26px] rounded-full border-2 transition-colors",
                  i <= 2 ? "border-vs-red bg-obsidian" : "border-white/20 bg-obsidian",
                )}
              >
                {i <= 2 && <span className="m-[5px] block h-3 w-3 rounded-full bg-vs-red" />}
              </span>
              <span
                className={cn(
                  "font-mono text-[9px] tracking-tight sm:text-[10px]",
                  i <= 2 ? "text-ivory/75" : "text-white/30",
                )}
              >
                {s}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-2">
        {["Brand system", "Content", "Performance", "SEO / AI search"].map((s, i) => (
          <Panel key={s} accent={i === 0}>
            <Label dim={i > 1}>{s}</Label>
          </Panel>
        ))}
      </div>
    </div>
  )
}

/* ---- Workflow automation: trigger → conditions → actions → status ---- */
function AutomationChain() {
  const { t } = useLanguage()
  const rows = [
    { tag: "TRIGGER", label: t.system.node1, accent: true },
    { tag: "CONDITION", label: t.workflow.service.s2 },
    { tag: "ACTION", label: t.workflow.service.s5 },
    { tag: "ACTION", label: t.system.node6 },
  ]

  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      {rows.map((r, i) => (
        <div key={r.label} className="flex flex-col gap-2.5">
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl border px-3.5 py-2.5",
              r.accent ? "border-vs-red/40 bg-vs-red/[0.08]" : "border-white/10 bg-obsidian/70",
            )}
          >
            <span
              className={cn(
                "shrink-0 rounded px-1.5 py-0.5 font-mono text-[8px] tracking-[0.1em] sm:text-[9px]",
                r.accent ? "bg-vs-red/25 text-vs-coral" : "bg-white/[0.07] text-white/45",
              )}
            >
              {r.tag}
            </span>
            <Label dim={i > 2}>{r.label}</Label>
          </div>
          {i < rows.length - 1 && (
            <div className="flex justify-center" aria-hidden="true">
              <Connector vertical />
            </div>
          )}
        </div>
      ))}

      <div className="mt-2 flex items-center justify-between rounded-xl border border-white/10 bg-obsidian/70 px-3.5 py-2.5">
        <Label dim>{t.workflow.done}</Label>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
      </div>
    </div>
  )
}

/* ---- CRM & data integration: one record, many systems ---- */
function DataMesh() {
  const { t } = useLanguage()
  const systems = ["Website", "CRM", "E-commerce", "Analytics", "Ads", "Support"]

  return (
    <div className="flex h-full flex-col justify-center">
      <div className="grid grid-cols-3 gap-2">
        {systems.slice(0, 3).map((s) => (
          <Panel key={s} className="text-center">
            <Label dim>{s}</Label>
          </Panel>
        ))}
      </div>

      <div className="my-3 flex items-center justify-center gap-1" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-4 w-px flex-1 bg-gradient-to-b from-vs-red/40 to-vs-red/5" />
        ))}
      </div>

      <Panel accent className="text-center">
        <Label>{t.system.node3}</Label>
      </Panel>

      <div className="my-3 flex items-center justify-center gap-1" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-4 w-px flex-1 bg-gradient-to-t from-vs-red/40 to-vs-red/5" />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {systems.slice(3).map((s) => (
          <Panel key={s} className="text-center">
            <Label dim>{s}</Label>
          </Panel>
        ))}
      </div>
    </div>
  )
}

/* ---- 04 · Media & Creative Technology ---- */
function CreativePipeline() {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <Panel accent className="text-center">
        <Label>Brief</Label>
      </Panel>

      <div className="flex justify-center" aria-hidden="true">
        <Connector vertical />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {["Key visual", "Video", "Voice"].map((s) => (
          <Panel key={s} className="text-center">
            <Label>{s}</Label>
          </Panel>
        ))}
      </div>

      <div className="flex justify-center" aria-hidden="true">
        <Connector vertical />
      </div>

      {/* Multi-platform output */}
      <div className="grid grid-cols-4 gap-2">
        {["Social", "Web", "TVC", "Podcast"].map((s, i) => (
          <div
            key={s}
            className={cn(
              "rounded-lg border px-2 py-3 text-center",
              i < 2 ? "border-white/12 bg-obsidian/70" : "border-white/[0.07] bg-obsidian/40",
            )}
          >
            <span
              className={cn(
                "font-mono text-[9px] tracking-tight sm:text-[10px]",
                i < 2 ? "text-ivory/70" : "text-white/30",
              )}
            >
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
