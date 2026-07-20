"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { DollarSign, TrendingUp, Target, Briefcase, Palette, Home, BarChart3 } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export default function ROICalculatorHome() {
  const [selectedBudget, setSelectedBudget] = useState(5000)
  const [selectedBusiness, setSelectedBusiness] = useState("retail")
  const [conversionRate, setConversionRate] = useState(5)
  const { t } = useLanguage()

  const businessTypes = [
    {
      id: "retail",
      name: t.roi.retailName,
      icon: <Briefcase className="w-6 h-6" />,
      multiplier: 3.2,
      description: t.roi.retailDesc,
    },
    {
      id: "real-estate",
      name: t.roi.realEstateName,
      icon: <Home className="w-6 h-6" />,
      multiplier: 4.1,
      description: t.roi.realEstateDesc,
    },
    {
      id: "artist",
      name: t.roi.artistName,
      icon: <Palette className="w-6 h-6" />,
      multiplier: 2.8,
      description: t.roi.artistDesc,
    },
    {
      id: "professional",
      name: t.roi.professionalName,
      icon: <Target className="w-6 h-6" />,
      multiplier: 3.7,
      description: t.roi.professionalDesc,
    },
  ]

  const selectedBusinessType = businessTypes.find((b) => b.id === selectedBusiness)
  const multiplier = selectedBusinessType?.multiplier || 3.2

  const calculateROI = (budget: number, conversion: number) => {
    const baseReturn = budget * multiplier * conversion
    const scaleFactor = budget / 10000
    return Math.round(baseReturn * (1 + scaleFactor * 0.3))
  }

  const calculateMonthlyRevenue = (budget: number, conversion: number) => {
    return Math.round(calculateROI(budget, conversion) / 12)
  }

  return (
    <section className="py-24 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">{t.roi.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.roi.subtitle}</p>
        </motion.div>

        <div className="bg-white border border-gray-200 rounded-3xl p-8 relative overflow-hidden shadow-sm">
          {/* Subtle static background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(147,51,234,0.1) 0%, transparent 50%)",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Controls */}
            <div className="space-y-8">
              {/* Business Type Selection */}
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">{t.roi.selectBusiness}</label>
                <div className="grid grid-cols-2 gap-3">
                  {businessTypes.map((business) => (
                    <motion.button
                      key={business.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedBusiness(business.id)}
                      className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                        selectedBusiness === business.id
                          ? "bg-blue-50 border-blue-300 text-gray-900"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className={`p-2 rounded-lg ${
                            selectedBusiness === business.id ? "bg-blue-100" : "bg-gray-100"
                          }`}
                        >
                          {business.icon}
                        </div>
                        <div>
                          <div className="font-medium">{business.name}</div>
                          <div className="text-xs opacity-70">{business.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Budget Slider */}
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">{t.roi.monthlyBudget}</label>
                <div className="relative">
                  <input
                    type="range"
                    min="1000"
                    max="25000"
                    step="1000"
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-700"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>$1,000</span>
                    <span>$25,000</span>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <span className="text-3xl font-bold text-gray-900">${selectedBudget.toLocaleString()}</span>
                  <span className="text-gray-600 ml-2">{t.roi.perMonth}</span>
                </div>
              </div>

              {/* Conversion Rate Slider */}
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">{t.roi.conversionTarget}</label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-700"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>1%</span>
                    <span>10%</span>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <span className="text-3xl font-bold text-gray-900">{conversionRate}%</span>
                </div>
              </div>

              {/* Data Disclaimer */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">{t.roi.disclaimerTitle}</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">{t.roi.disclaimerBody}</p>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-8">
              {/* ROI Circle */}
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-gray-200"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 219.8" }}
                    animate={{
                      strokeDasharray: `${Math.min((calculateROI(selectedBudget, conversionRate) / (selectedBudget * 8)) * 219.8, 219.8)} 219.8`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06d6a0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      key={`${selectedBudget}-${selectedBusiness}-${conversionRate}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-bold text-gray-900"
                    >
                      {Math.round((calculateROI(selectedBudget, conversionRate) / selectedBudget) * 100)}%
                    </motion.div>
                    <div className="text-gray-600 text-sm">ROI</div>
                  </div>
                </div>
              </div>

              {/* Revenue Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center shadow-sm">
                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <motion.div
                    key={`monthly-${selectedBudget}-${selectedBusiness}-${conversionRate}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-gray-900 mb-1"
                  >
                    ${calculateMonthlyRevenue(selectedBudget, conversionRate).toLocaleString()}
                  </motion.div>
                  <div className="text-gray-600 text-sm">{t.roi.monthlyRevenue}</div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center shadow-sm">
                  <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <motion.div
                    key={`annual-${selectedBudget}-${selectedBusiness}-${conversionRate}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-gray-900 mb-1"
                  >
                    ${calculateROI(selectedBudget, conversionRate).toLocaleString()}
                  </motion.div>
                  <div className="text-gray-600 text-sm">{t.roi.annualRevenue}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
