"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"

type Props = {
  imageSrc?: string
  className?: string
  // tuning
  yAmplitude?: number // biên độ lượn sóng trục Y
  speed?: number // hệ số tốc độ theo scroll
  scaleStart?: number // scale ban đầu (khi top)
  scaleEnd?: number // scale khi cuộn xuống
}

export default function FlyingBirdScroll({
  imageSrc = "/bird-vietsolve.png",
  className,
  yAmplitude = 120,
  speed = 1.2,
  scaleStart = 0.9,
  scaleEnd = 1.15,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  // lấy progress cuộn của toàn trang
  const { scrollYProgress } = useScroll()

  // map progress 0→1 sang quỹ đạo cong (Bezier mềm)
  const x = useSpring(useTransform(scrollYProgress, [0, 1], ["-15vw", "110vw"]), {
    stiffness: 80,
    damping: 20,
    mass: 0.4,
  })

  // lượn sóng theo sin để tự nhiên hơn
  const y = useTransform(scrollYProgress, (p) => {
    const wave = Math.sin(p * Math.PI * 2 * speed)
    return `${wave * yAmplitude}px`
  })

  // xoay theo hướng bay
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 8])

  // phóng to nhẹ khi người dùng cuộn xuống
  const scale = useTransform(scrollYProgress, [0, 1], [scaleStart, scaleEnd])

  // opacity: xuất hiện mượt, mờ dần khi ra khỏi màn
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.85, 1], [0, 1, 1, 0])

  // trail buffer (ghi lại vị trí gần đây để vẽ vệt sáng)
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([])
  const last = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const unsubX = x.on("change", (vx) => (last.current.x = Number.parseFloat(String(vx))))
    const unsubY = y.on("change", (vy) => (last.current.y = Number.parseFloat(String(vy))))
    let raf = 0
    const tick = () => {
      setTrail((t) => {
        const next = [...t, { x: last.current.x, y: last.current.y }]
        // giữ 18–22 điểm để trail mềm, xóa dần điểm cũ
        return next.slice(-22)
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      unsubX()
      unsubY()
    }
  }, [x, y])

  // tạo list blur levels cho trail
  const blurLevels = useMemo(() => Array.from({ length: 22 }, (_, i) => i), [])

  return (
    <div ref={ref} className={className} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }}>
      {/* Vệt sáng – additive blend */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <defs>
          {/* glow mềm với blur + màu thương hiệu */}
          <filter id="bird-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feColorMatrix
              type="matrix"
              values="
                1 0 0 0 0
                0 0.25 0 0 0
                0 0 0.25 0 0
                0 0 0 0.9 0"
            />
          </filter>
        </defs>

        {trail.map((p, idx) => {
          const t = idx / (blurLevels.length - 1)
          const size = 22 + t * 38 // hạt sau lớn & mờ hơn
          const alpha = 0.28 * t ** 0.7 // mờ dần
          return (
            <circle
              key={idx}
              cx={`calc(${p.x}px + 50vw)`} // dịch tương đối viewport
              cy={`calc(40vh + ${p.y}px)`}
              r={size}
              fill="url(#g)"
              style={{
                filter: "url(#bird-glow)",
                mixBlendMode: "screen", // cộng sáng
                opacity: alpha,
              }}
            />
          )
        })}

        {/* gradient cho hạt */}
        <radialGradient id="g">
          <stop offset="0%" stopColor="#C94A4A" />
          <stop offset="60%" stopColor="#5A2A3A" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </svg>

      {/* Con chim */}
      <motion.div
        style={{
          position: "absolute",
          left: "50vw",
          top: "40vh",
          x,
          y,
          rotate,
          scale,
          opacity,
          willChange: "transform, opacity",
          filter: "drop-shadow(0 6px 12px rgba(201, 74, 74, .45))",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 18 }}
      >
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt="VietSolve bird"
          width={88}
          height={88}
          priority
          style={{ userSelect: "none", pointerEvents: "none" }}
        />
      </motion.div>
    </div>
  )
}
