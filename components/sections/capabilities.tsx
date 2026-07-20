"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n"
import { Container, SectionEyebrow, SectionHeading } from "@/components/kit/section"
import { TextLink } from "@/components/kit/buttons"
import { CapabilityVisual } from "@/components/visuals/capability-visual"
import { capabilities } from "@/lib/content/capabilities"
import { cn } from "@/lib/utils"

/**
 * The four capability pillars, in two densities:
 *
 *  - `compact` (homepage): a 2×2 grid — name, one sentence, three headline
 *    services, visual, link. Also carries the condensed problem framing that
 *    used to be its own full-height section.
 *  - `full` (/services): alternating full-width stages with the complete
 *    service list.
 *
 * Same data source either way, so the two pages can't drift apart.
 */
export function Capabilities({
  variant = "full",
  showHeader = true,
}: {
  variant?: "compact" | "full"
  showHeader?: boolean
}) {
  const { t, lang } = useLanguage()

  if (variant === "compact") {
    return (
      <section className="surface-dark py-section" id="capabilities">
        <Container>
          <div className="max-w-3xl">
            <SectionEyebrow>{t.capabilities.eyebrow}</SectionEyebrow>
            <SectionHeading className="mt-5 text-ivory">{t.capabilities.heading}</SectionHeading>

            {/* Condensed problem framing — replaces the old standalone section */}
            <p className="mt-6 max-w-[65ch] text-body-lg leading-relaxed text-vs-steel text-pretty">
              {t.capabilities.intro}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {[t.capabilities.gap1, t.capabilities.gap2, t.capabilities.gap3].map((gap) => (
                <li
                  key={gap}
                  className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45"
                >
                  <span className="h-1 w-1 rounded-full bg-vs-red" aria-hidden="true" />
                  {gap}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-stage border border-white/[0.08] bg-white/[0.07] md:grid-cols-2">
            {capabilities.map((c) => (
              <article key={c.id} className="flex flex-col bg-obsidian p-7 lg:p-9">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs tracking-[0.14em] text-vs-red">{c.index}</span>
                  <span className="h-px w-6 bg-vs-red/40" aria-hidden="true" />
                </div>

                <h3 className="mt-5 font-display text-xl font-medium leading-snug text-ivory lg:text-2xl">
                  {c.name[lang]}
                </h3>

                <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-vs-steel text-pretty">
                  {c.shortDescription[lang]}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {c.highlights[lang].map((h) => (
                    <li
                      key={h}
                      className="rounded-full border border-white/12 px-3 py-1.5 text-[12px] text-ivory/70"
                    >
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <CapabilityVisual kind={c.visual} className="aspect-[16/10]" />
                </div>

                <div className="mt-6">
                  <TextLink href={`/services#${c.id}`} onDark>
                    {t.capabilities.explore}
                  </TextLink>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    )
  }

  /* ---------------- full (services page) ---------------- */
  return (
    <section className="surface-dark py-section" id="capabilities">
      <Container>
        {showHeader && (
          <div className="max-w-3xl">
            <SectionEyebrow>{t.capabilities.eyebrow}</SectionEyebrow>
            <SectionHeading className="mt-5 text-ivory">{t.capabilities.heading}</SectionHeading>
          </div>
        )}

        <div className={cn("space-y-20 lg:space-y-28", showHeader && "mt-16 lg:mt-20")}>
          {capabilities.map((c, i) => {
            const flipped = i % 2 === 1
            return (
              <motion.article
                key={c.id}
                id={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="scroll-mt-28 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={cn(flipped && "lg:order-2")}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs tracking-[0.14em] text-vs-red">
                      {c.index}
                    </span>
                    <span className="h-px w-8 bg-vs-red/40" aria-hidden="true" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
                      {c.name[lang]}
                    </span>
                  </div>

                  <SectionHeading size="h3" className="mt-5 text-ivory">
                    {c.heading[lang]}
                  </SectionHeading>

                  <p className="mt-4 max-w-[65ch] text-[15px] leading-relaxed text-vs-steel text-pretty lg:text-base">
                    {c.description[lang]}
                  </p>

                  <div className="mt-7">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                      {t.capabilities.includes}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {c.services[lang].map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-white/12 px-3 py-1.5 text-[12px] text-ivory/70"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7">
                    <TextLink href="/contact" onDark>
                      {t.capabilities.discuss}
                    </TextLink>
                  </div>
                </div>

                <div className={cn(flipped && "lg:order-1")}>
                  <CapabilityVisual kind={c.visual} />
                </div>
              </motion.article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
