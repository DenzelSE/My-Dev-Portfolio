"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import type { ReactNode } from "react"

interface ParallaxLayerProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
}

export default function ParallaxLayer({ children, className = "", speed = 0.5, direction = "up" }: ParallaxLayerProps) {
  const { scrollY } = useScroll()

  // Calculate transform based on direction
  const transform = useTransform(
    scrollY,
    [0, 1000],
    direction === "up"
      ? [0, -speed * 300]
      : direction === "down"
        ? [0, speed * 300]
        : direction === "left"
          ? [0, -speed * 300]
          : [0, speed * 300],
  )

  return (
    <motion.div
      className={`${className}`}
      style={direction === "left" || direction === "right" ? { x: transform } : { y: transform }}
    >
      {children}
    </motion.div>
  )
}
