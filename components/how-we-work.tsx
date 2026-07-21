"use client"

import { motion } from "framer-motion"
import { Lightbulb, Users, Rocket } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export default function HowWeWork() {
  const { t } = useLanguage()

  const steps = [
    {
      number: "01",
      title: t.howWeWork.step1Title,
      description: t.howWeWork.step1Desc,
      icon: <Lightbulb className="w-8 h-8" strokeWidth={1.5} />,
    },
    {
      number: "02",
      title: t.howWeWork.step2Title,
      description: t.howWeWork.step2Desc,
      icon: <Users className="w-8 h-8" strokeWidth={1.5} />,
    },
    {
      number: "03",
      title: t.howWeWork.step3Title,
      description: t.howWeWork.step3Desc,
      icon: <Rocket className="w-8 h-8" strokeWidth={1.5} />,
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-red-700 to-gray-900 bg-clip-text text-transparent mb-4">
            {t.howWeWork.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.howWeWork.subtitle}</p>
        </motion.div>

        {/* One connecting line runs through all three steps on desktop */}
        <div className="relative">
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-red-200 to-transparent md:block"
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group text-center md:text-left"
              >
                {/* Number sits on the connecting line */}
                <div className="flex justify-center md:justify-start">
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-200 bg-white text-lg font-bold text-red-700 transition-colors duration-300 group-hover:border-red-600">
                    {step.number}
                  </span>
                </div>

                <div className="mt-6 flex justify-center text-gray-900 md:justify-start" aria-hidden="true">
                  {step.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-600 max-w-[38ch] mx-auto md:mx-0">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
