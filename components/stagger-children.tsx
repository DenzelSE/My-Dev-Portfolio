"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import type { ReactNode } from "react"

interface StaggerChildrenProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

export default function StaggerChildren({
  children,
  className = "",
  staggerDelay = 0.1,
  duration = 0.5,
  threshold = 0.1,
  once = true,
}: StaggerChildrenProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  })
  console.log(duration)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
