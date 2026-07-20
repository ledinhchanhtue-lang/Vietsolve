"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n"
import { Container, SectionEyebrow, SectionHeading } from "@/components/kit/section"
import { TextLink } from "@/components/kit/buttons"
import { CapabilityVisual } from "@/components/visuals/capability-visual"
import { capabilities } from "@/lib/content/capabilities"
import { cn } from "@/lib/utils"

/**
 * The four capability stages. Shared by the homepage and /services.
 *
 * Each capability is a full stage with its own system visual, alternating
 * left/right — not one of twelve identical service cards. Service names appear
 * as supporting detail inside the stage, never as the primary structure.
 */
export function Capabilities({ showHeader = true }: { showHeader?: boolean }) {
  const { t, lang } = useLanguage()

  return (
    <section className="surface-dark py-section" id="capabilities">
      <Container>
        {showHeader && (
          <div className="max-w-3xl">
            <SectionEyebrow>{t.capabilities.eyebrow}</SectionEyebrow>
            <SectionHeading className="mt-6 text-ivory">{t.capabilities.heading}</SectionHeading>
          </div>
        )}

        <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-36">
          {capabilities.map((c, i) => {
            const flipped = i % 2 === 1
            return (
              <motion.article
                key={c.id}
                id={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="scroll-mt-28 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Copy */}
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

                  <SectionHeading size="h3" className="mt-6 text-ivory">
                    {c.heading[lang]}
                  </SectionHeading>

                  <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-vs-steel text-pretty lg:text-base">
                    {c.description[lang]}
                  </p>

                  <div className="mt-8">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                      {t.capabilities.includes}
                    </p>
                    <ul className="mt-3.5 flex flex-wrap gap-2">
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

                  <div className="mt-9">
                    <TextLink href="/contact" onDark>
                      {t.capabilities.discuss}
                    </TextLink>
                  </div>
                </div>

                {/* Visual */}
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
