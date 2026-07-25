"use client"

import { motion } from "framer-motion"
import { TextLink } from "@/components/ui-kit/button"
import { ProductionGallery } from "@/components/company/production-gallery"
import { productionPhotos } from "@/lib/content/company-media"

/**
 * Homepage production band — real photos of VietSolve's own crew on set.
 *
 * Concrete proof of the media / creative capability, shown between the project
 * work and the process. Real photography, honest captions; nothing here claims
 * a client outcome. Six shoots, the gallery handles the responsive strip.
 */
export function ProductionBand() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10"
        >
          <div>
            <p className="text-xs sm:text-sm font-semibold text-red-600 uppercase tracking-wider">
              Ê-kíp VietSolve tại hiện trường
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Năng lực sản xuất thật
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              Podcast, TVC, sản xuất nội dung, chụp sản phẩm, dựng phim và livestream — do chính
              đội ngũ VietSolve thực hiện.
            </p>
          </div>
          <div className="shrink-0">
            <TextLink href="/services#media-creative">Xem nhóm Media &amp; Creative</TextLink>
          </div>
        </motion.div>

        <ProductionGallery photos={productionPhotos.slice(0, 6)} />
      </div>
    </section>
  )
}
