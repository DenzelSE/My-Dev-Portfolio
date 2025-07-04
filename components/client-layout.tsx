"use client"

import type React from "react"

import { useState, useEffect } from "react"
import LoadingScreen from "./loading-screen"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100) // Small delay to ensure smooth transition

    return () => clearTimeout(timer)
  }, [])

  const handleLoadingComplete = () => {
    setShowContent(true)
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  if (!showContent) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return <>{children}</>
}
