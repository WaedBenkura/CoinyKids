"use client"

import { motion, useMotionValue, useTransform } from "motion/react"
import React from "react"

export function PhoneMockup({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  return (
    <div
      style={{ perspective: 1000 }}
      className={`relative flex h-[600px] w-full items-center justify-center ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative h-[550px] w-[280px] rounded-[3rem] border-8 border-slate-900 bg-slate-950 shadow-2xl"
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-xl bg-slate-900" />
        
        {/* Screen Content */}
        <div className="h-full w-full overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-950 flex flex-col">
          {children}
        </div>
      </motion.div>
    </div>
  )
}
