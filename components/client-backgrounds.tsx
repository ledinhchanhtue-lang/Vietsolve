"use client"

import dynamic from "next/dynamic"

const BackgroundStripes = dynamic(() => import("@/components/background-stripes"), {
  ssr: false,
  loading: () => null,
})

const AnimatedBackground = dynamic(() => import("@/components/animated-background"), {
  ssr: false,
  loading: () => null,
})

const BackgroundPaths = dynamic(() => import("@/components/background-paths"), {
  ssr: false,
  loading: () => null,
})

export default function ClientBackgrounds() {
  return (
    <>
      <BackgroundPaths />
      <AnimatedBackground />
      <BackgroundStripes />
    </>
  )
}
