"use client"

import { useLanguage } from "@/lib/i18n"
import { ProjectVisual } from "./project-visual"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/content/projects"

/**
 * Project preview.
 *
 * Only links to a detail page when one actually exists (`hasDetailPage`).
 * Otherwise it renders as a non-interactive article — no CTA leading to a 404,
 * which is what the previous blog and case-study grids did.
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

  return (
    <article
      className={cn(
        "group",
        feature && "grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14",
      )}
    >
      <ProjectVisual
        project={project}
        priority={priority}
        className={cn(feature ? "aspect-[16/10]" : "aspect-[4/3]")}
      />

      <div className={cn(feature ? "" : "mt-6")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
          <span className="text-vs-red">{project.industry[lang]}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
        </div>

        <h3
          className={cn(
            "mt-4 font-display font-medium text-ivory",
            feature ? "text-h3" : "text-xl lg:text-2xl",
          )}
        >
          {project.name}
        </h3>

        <p
          className={cn(
            "mt-3 leading-relaxed text-vs-steel text-pretty",
            feature ? "max-w-xl text-base" : "text-[15px]",
          )}
        >
          {project.summary[lang]}
        </p>

        <div className="mt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
            {t.work.delivered}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.deliverables[lang].map((d) => (
              <li
                key={d}
                className="rounded-full border border-white/12 px-3 py-1.5 text-[12px] text-ivory/70"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>

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

        {!project.hasDetailPage && (
          <p className="mt-6 font-mono text-[11px] text-white/30">{t.work.detailComingSoon}</p>
        )}
      </div>
    </article>
  )
}
