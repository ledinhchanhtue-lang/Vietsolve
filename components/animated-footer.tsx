"use client"

import { LedLogo } from "@/components/tech/led-logo"
import { TechDivider } from "@/components/tech/tech-divider"
import { TechLayer } from "@/components/tech/tech-layer"
import { IconTile } from "@/components/ui-kit/icon-tile"
import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { PrimaryButton } from "@/components/ui-kit/button"
import { useLanguage } from "@/lib/i18n"
import { siteConfig, readVerified } from "@/lib/site-config"

export default function AnimatedFooter() {
  const { t } = useLanguage()

  /* Contact details come from lib/site-config.ts and render only when marked
     verified. The old footer hard-coded "+1 (555) 123-4567" and an email on the
     wrong domain (hi@vietsolve.com vs the real .vn). */
  const contactEmail = readVerified(siteConfig.contact.email)
  const contactPhone = readVerified(siteConfig.contact.phone)
  const contactAddress = readVerified(siteConfig.contact.address)

  type Social = { icon: typeof Instagram; label: string; href: string }
  const socials: Social[] = (
    [
      { icon: Instagram, label: "Instagram", href: readVerified(siteConfig.social.instagram) },
      { icon: Linkedin, label: "LinkedIn", href: readVerified(siteConfig.social.linkedin) },
      { icon: Youtube, label: "YouTube", href: readVerified(siteConfig.social.youtube) },
      { icon: Twitter, label: "Twitter", href: null },
    ] as Array<{ icon: typeof Instagram; label: string; href: string | null }>
  ).filter((s): s is Social => Boolean(s.href))

  // Newsletter removed — it appeared on every page and did nothing (a setTimeout
  // that discarded the email). Reinstate only with a real subscription backend.
  return (
    <footer className="relative overflow-hidden bg-gray-900 border-t border-gray-700">
      {/* LED strip along the top edge — the hand-off from the last white
          section into the footer, and the site's one full-width neon element. */}
      <TechDivider variant="plain" className="absolute inset-x-0 top-0 z-20" />

      {/* Level 3 accent pattern, faded upward so it never reaches the copy */}
      <TechLayer>
        <div className="absolute inset-0 vs-grid-3 vs-mask-up opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(28rem_20rem_at_88%_0%,rgb(220_38_38/0.12),transparent_72%)]" />
      </TechLayer>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* On charcoal the sweep runs white-cored rather than red, and the
                intro is off — this logo is below the fold on load, so a one-shot
                animation nobody sees is just wasted work. The underline pulse
                is the footer's only looping element. */}
            <div className="flex flex-col items-center gap-3 lg:items-start">
              <LedLogo
                src="/images/logo-vietsolve-official.png"
                alt="VietSolve"
                width={200}
                height={80}
                className="w-auto h-20 brightness-0 invert transition-transform duration-300 hover:scale-105"
                invert
                intro={false}
              />
              <TechDivider variant="plain" className="w-44" />
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">{t.footer.description}</p>

            {/* Social links — only verified profiles render.
                The four icons here used to point at href="#". */}
            {socials.length > 0 && (
              <div className="flex space-x-6 justify-center lg:justify-start">
                {socials.map(({ icon: Icon, href, label }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      aria-label={label}
                    >
                      {/* Same tile geometry as every other icon on the site,
                          in its charcoal-surface variant. */}
                      <IconTile icon={Icon} size="md" tone="dark" />
                    </a>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Links and Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-left">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">{t.footer.servicesTitle}</h4>
              <ul className="space-y-4">
                {[
                  t.footer.service1,
                  t.footer.service2,
                  t.footer.service3,
                  t.footer.service4,
                  t.footer.service5,
                  t.footer.service6,
                ].map((link, index) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Every service link used to be href="#" — they now all
                        resolve to the services page. */}
                    <Link
                      href="/services"
                      className="flex min-h-[44px] items-center justify-center sm:justify-start text-gray-300 hover:text-white transition-colors duration-200 group"
                    >
                      {/* Rule grows from zero on hover — reserving the 8px keeps
                          the label from shifting sideways as it animates. */}
                      <span className="w-0 group-hover:w-2 h-0.5 bg-red-500 transition-all duration-200 mr-0 group-hover:mr-2 rounded-full" />
                      <span className="transition-transform duration-200">{link}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">{t.footer.contactTitle}</h4>
              <div className="space-y-4">
                {contactEmail && (
                  <a
                    href={`mailto:${contactEmail}`}
                    className="flex min-h-11 items-center space-x-3 text-gray-300 justify-center sm:justify-start hover:text-white transition-colors"
                  >
                    <Mail className="h-5 w-5 text-red-500" />
                    <span>{contactEmail}</span>
                  </a>
                )}
                {contactPhone && (
                  <a
                    href={`tel:${contactPhone.replace(/[^\d+]/g, "")}`}
                    className="flex min-h-11 items-center space-x-3 text-gray-300 justify-center sm:justify-start hover:text-white transition-colors"
                  >
                    <Phone className="h-5 w-5 text-red-500" />
                    <span>{contactPhone}</span>
                  </a>
                )}
                {contactAddress && (
                  <div className="flex items-start space-x-3 text-gray-300 justify-center sm:justify-start">
                    <MapPin className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <span>
                      {contactAddress.line1}
                      <br />
                      {contactAddress.line2}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-8">
                {/* ui-kit PrimaryButton guarantees the 48px target — the old
                    AnimatedButton collapsed to a 20px inline box. */}
                <PrimaryButton href="/contact" className="w-full">
                  {t.footer.startProject}
                </PrimaryButton>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Capability rail — Brand → Growth → Media → Website → AI → Data.
            Each stop links to its anchor on /services; the connecting segment
            lights up with its label on hover. */}
        <nav
          aria-label="Năng lực VietSolve"
          className="mb-10 flex flex-wrap items-center justify-center gap-y-3"
        >
          {(
            [
              ["Brand", "branding-strategy"],
              ["Growth", "marketing-growth"],
              ["Media", "media-creative"],
              ["Website", "website-digital"],
              ["AI", "ai-automation"],
              ["Data", "data-seo-analytics"],
            ] as const
          ).map(([label, id], i) => (
            <span key={id} className="flex items-center">
              {i > 0 && (
                <span aria-hidden="true" className="mx-2 h-px w-6 bg-gray-700 sm:w-9" />
              )}
              <Link
                href={`/services#${id}`}
                className="group inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-sm font-semibold text-gray-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gray-600 transition-all duration-200 group-hover:bg-red-500 group-hover:shadow-[0_0_6px_rgba(220,38,38,0.8)]" />
                {label}
              </Link>
            </span>
          ))}
        </nav>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-center sm:text-left">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} VietSolve. {t.footer.copyright}
            </p>
            {/* These three pointed at href="#"; /privacy and /terms now exist.
                The separate cookie policy is folded into the privacy page. */}
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="inline-flex min-h-[44px] items-center text-gray-400 hover:text-white transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="/terms" className="inline-flex min-h-[44px] items-center text-gray-400 hover:text-white transition-colors">
                {t.footer.terms}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
