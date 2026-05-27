"use client"

import { useCallback, useEffect, useState } from "react"
import { ShaderAnimation } from "@/components/ui/shader-animation"

const INTRO_DURATION_MS = 3500

type IntroSplashProps = {
  onComplete: () => void
  isDarkMode: boolean
}

export function IntroSplash({ onComplete, isDarkMode }: IntroSplashProps) {
  const [isExiting, setIsExiting] = useState(false)

  const dismiss = useCallback(() => {
    if (isExiting) return
    setIsExiting(true)
  }, [isExiting])

  useEffect(() => {
    const timer = window.setTimeout(dismiss, INTRO_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [dismiss])

  useEffect(() => {
    if (!isExiting) return

    const timer = window.setTimeout(onComplete, 700)
    return () => window.clearTimeout(timer)
  }, [isExiting, onComplete])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        dismiss()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [dismiss])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center overflow-hidden transition-opacity duration-700 ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      onClick={dismiss}
      role="presentation"
      aria-hidden={isExiting}
    >
      <ShaderAnimation className="absolute inset-0 h-full w-full" isDarkMode={isDarkMode} />
      <span className="pointer-events-none relative z-10 px-4 text-center text-4xl font-semibold tracking-tighter text-neutral-950 dark:text-white sm:text-6xl md:text-7xl">
        Cole Hackman
      </span>
    </div>
  )
}
