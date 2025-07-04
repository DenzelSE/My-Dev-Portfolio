"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Code, Zap, Globe, Database, Terminal, Layers } from "lucide-react"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [showIcons, setShowIcons] = useState(false)

  const loadingSteps = [
    { text: "Initializing portfolio...", icon: Terminal },
    { text: "Loading projects...", icon: Code },
    { text: "Connecting to servers...", icon: Database },
    { text: "Optimizing experience...", icon: Zap },
    { text: "Finalizing setup...", icon: Globe },
    { text: "Ready to showcase!", icon: Layers },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => onLoadingComplete(), 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [onLoadingComplete])

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepTimer)
          return prev
        }
        return prev + 1
      })
    }, 800)

    setTimeout(() => setShowIcons(true), 1000)

    return () => clearInterval(stepTimer)
  }, [])

  const floatingIcons = [
    { Icon: Code, delay: 0, x: "20%", y: "20%" },
    { Icon: Database, delay: 0.2, x: "80%", y: "30%" },
    { Icon: Globe, delay: 0.4, x: "15%", y: "70%" },
    { Icon: Terminal, delay: 0.6, x: "85%", y: "75%" },
    { Icon: Zap, delay: 0.8, x: "50%", y: "15%" },
    { Icon: Layers, delay: 1, x: "70%", y: "60%" },
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-50 bg-[#0a1020] flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Gradient Background */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 50%),
                          radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 50%)`,
            }}
            animate={{
              background: [
                `radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 50%),
                 radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 50%)`,
                `radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 50%),
                 radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 50%)`,
                `radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 50%),
                 radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 50%)`,
              ],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(to right, #3b82f6 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Floating Icons */}
          {showIcons &&
            floatingIcons.map(({ Icon, delay, x, y }, index) => (
              <motion.div
                key={index}
                className="absolute text-blue-500/20"
                style={{ left: x, top: y }}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{
                  opacity: [0, 0.3, 0.1],
                  scale: [0, 1.2, 1],
                  rotate: [0, 360],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  delay,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Icon size={32} />
              </motion.div>
            ))}
        </div>

        {/* Main Loading Content */}
        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative">
              <motion.div
                className="text-6xl font-bold mb-4"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(59, 130, 246, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.8)",
                    "0 0 10px rgba(59, 130, 246, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <span className="text-blue-500">DenzelSE </span>
                <span className="text-white">Portfolio</span>
              </motion.div>

              {/* Rotating Ring */}
              <motion.div
                className="absolute inset-0 border-2 border-blue-500/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                style={{ width: "120%", height: "120%", left: "-10%", top: "-10%" }}
              />

              {/* Pulsing Ring */}
              <motion.div
                className="absolute inset-0 border border-blue-500/20 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                style={{ width: "140%", height: "140%", left: "-20%", top: "-20%" }}
              />
            </div>
          </motion.div>

          {/* Loading Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-3 text-blue-400"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  {(() => {
                    const CurrentIcon = loadingSteps[currentStep]?.icon
                    return CurrentIcon ? <CurrentIcon className="w-5 h-5" /> : null
                  })()}
                </motion.div>
                <span className="text-lg font-medium">{loadingSteps[currentStep]?.text}</span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mb-6"
          >
            <div className="relative">
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                </motion.div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>Loading...</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </motion.div>

          {/* Binary Rain Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-blue-500 font-mono text-xs"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: "-10px",
                }}
                animate={{
                  y: ["0vh", "110vh"],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                  ease: "linear",
                }}
              >
                {Math.random() > 0.5 ? "1" : "0"}
              </motion.div>
            ))}
          </div>

          {/* Completion Message */}
          {progress >= 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-green-400 font-medium"
            >
              ✨ Welcome to my portfolio!
            </motion.div>
          )}
        </div>

        {/* Corner Decorations */}
        <motion.div
          className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-blue-500/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        />
        <motion.div
          className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-blue-500/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        />
        <motion.div
          className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-blue-500/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        />
        <motion.div
          className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-blue-500/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
