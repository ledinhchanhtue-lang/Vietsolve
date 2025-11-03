"use client"

import dynamic from "next/dynamic"

const MouseMoveEffect = dynamic(() => import("@/components/mouse-move-effect"), {
  ssr: false,
  loading: () => null,
})

export function ClientMouseEffect() {
  return <MouseMoveEffect />
}
