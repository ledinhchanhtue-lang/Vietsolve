"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n"
import { ProjectVisual } from "./project-visual"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/content/projects"

/**
 * Project preview.
 *
 * Wraps in a link ONLY when a detail page exists. No "Xem chi tiết" CTA and no
 * "nội dung đang hoàn thiện" placeholder — an unfinished state shouldn't be
 * advertised on production, and a CTA must never lead to a 404.
 */
export function ProjectCard({
  project,
  variant = "default",
  priority = false,
}: {
  project: Project
  variant?: "default" | "feature"
  priority?: boolean
}) {
  const { t, lang } = useLanguage()
  const feature = variant === "feature"

  const body = (
    <>
      <ProjectVisual
        project={project}
        priority={priority}
        className={cn(feature ? "aspect-[16/9]" : "aspect-[4/3]")}
      />

      <div className={cn(feature ? "" : "mt-5")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
          <span className="text-vs-red">{project.industry[lang]}</span>
          {project.year && (
            <>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
            </>
          )}
        </div>

        <h3
          className={cn(
            "mt-3 font-display font-medium text-ivory",
            feature ? "text-h3" : "text-xl",
          )}
        >
          {project.name}
        </h3>

        <p
          className={cn(
            "mt-3 leading-relaxed text-vs-steel text-pretty",
            feature ? "max-w-[60ch] text-base" : "max-w-[55ch] text-[15px]",
          )}
        >
          {project.summary[lang]}
        </p>

        {/* Two or three capability tags — not the full deliverable list */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.deliverables[lang].slice(0, feature ? 3 : 2).map((d) => (
            <li
              key={d}
              className="rounded-full border border-white/12 px-3 py-1.5 text-[12px] text-ivory/70"
            >
              {d}
            </li>
          ))}
        </ul>

        {/* Verified metrics only — empty by default, never invented */}
        {project.metrics.length > 0 && (
          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            {project.metrics.map((m) => (
              <div key={m.value}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                  {m.label[lang]}
                </dt>
                <dd className="mt-1 font-display text-2xl font-medium text-ivory">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {project.hasDetailPage && (
          <p className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-ivory transition-colors duration-hover group-hover:text-vs-coral">
            {t.work.viewProject}
            <span aria-hidden="true">→</span>
          </p>
        )}
      </div>
    </>
  )

  const wrapperClass = cn(
    "group",
    feature && "grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14",
  )

  if (project.hasDetailPage) {
    return (
      <Link href={`/case-studies/${project.slug}`} className={wrapperClass}>
        {body}
      </Link>
    )
  }

  return <article className={wrapperClass}>{body}</article>
}
