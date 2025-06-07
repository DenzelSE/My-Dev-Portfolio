"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar after scrolling down a bit
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
      style={{
        scaleX,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    />
  )
}
