"use client"

import { motion, type Variants } from "motion/react"
import { cn } from "@/lib/utils"

interface StaggeredTextProps {
  text: string
  className?: string
  delay?: number
}

export function StaggeredText({ text, className, delay = 0 }: StaggeredTextProps) {
  const words = text.split(" ")

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i + delay },
    }),
  }

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      } as const,
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      } as const,
    },
  }

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn("mt-6", className)}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-2">
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
