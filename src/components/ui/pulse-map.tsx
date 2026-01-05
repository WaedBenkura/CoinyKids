"use client"

import { cn } from "@/lib/utils"

export function Pulse({ className, delay = 0 }: { className?: string, delay?: number }) {
  return (
    <div className={cn("absolute flex items-center justify-center", className)}>
      <span className="relative flex h-3 w-3">
        <span 
            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" 
            style={{ animationDelay: `${delay}s`, animationDuration: "2s" }}
        />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
      </span>
    </div>
  )
}

export function PulseMap() {
  return (
    <div className="relative w-full h-full opacity-30">
        {/* Abstract Map Lines (Simple SVG Pattern) */}
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M10,10 Q30,50 50,10 T90,90" stroke="currentColor" fill="none" strokeWidth="0.5" className="text-muted-foreground/50" />
            <path d="M10,90 Q30,50 50,90 T90,10" stroke="currentColor" fill="none" strokeWidth="0.5" className="text-muted-foreground/50" />
            <path d="M50,0 V100" stroke="currentColor" fill="none" strokeWidth="0.5" className="text-muted-foreground/50" />
            <path d="M0,50 H100" stroke="currentColor" fill="none" strokeWidth="0.5" className="text-muted-foreground/50" />
            <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="0.5" className="text-muted-foreground/50" />
        </svg>

        {/* Random Pulses representing resolved complaints */}
        <Pulse className="top-[20%] left-[30%]" delay={0} />
        <Pulse className="top-[50%] left-[60%]" delay={0.5} />
        <Pulse className="top-[70%] left-[20%]" delay={1.2} />
        <Pulse className="top-[30%] left-[80%]" delay={0.8} />
        <Pulse className="top-[60%] left-[40%]" delay={1.5} />
        <Pulse className="top-[80%] left-[70%]" delay={0.2} />
    </div>
  )
}
