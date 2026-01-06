"use client"

import { PublicLayout } from "@/layouts/PublicLayout"
import { HeroChapter } from "@/components/sections/HeroChapter"
import { AppPreviewChapter } from "@/components/sections/AppPreviewChapter"
import { VoicesChapter } from "@/components/sections/VoicesChapter"
import { FAQChapter } from "@/components/sections/FAQChapter"
import { AboutChapter } from "@/components/sections/AboutChapter"
import { Particles } from "@/components/ui/particles"
import { motion } from "motion/react"

// مكون العملة العائمة (يتم تعريفه هنا ليظهر فوق الخلفية وتحت الأقسام)
const FloatingCoin = ({ delay, x, y, size = 60, className }: { delay: number, x: string, y: string, size?: number, className?: string }) => (
  <motion.div
    className={`absolute z-0 pointer-events-none ${className}`}
    style={{ left: x, top: y }}
    initial={{ y: 0, rotate: -10 }}
    animate={{ y: [-20, 20, -20], rotate: [-10, 10, -10] }}
    transition={{ duration: 5, repeat: Infinity, delay: delay, ease: "easeInOut" }}
  >
    <img 
      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png" 
      alt="Coin"
      style={{ width: size, height: size }}
      className="drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
    />
  </motion.div>
)

export default function LandingPage() {
  return (
    <PublicLayout>
      {/* 
          تعديل هام:
          1. إزالة bg-background (لأنه أبيض).
          2. وضع bg-slate-950 (لون الفضاء الداكن).
          3. إضافة overflow-hidden لمنع أي تمرير جانبي.
      */}
      <div className="relative w-full min-h-screen bg-slate-950 overflow-hidden font-sans selection:bg-purple-500/30">
        
        {/* --- 1. طبقة الخلفية الموحدة (Grid + Glow) --- */}
        <div className="absolute inset-0 z-0 pointer-events-none h-full w-full">
           {/* Grid Pattern: الشبكة المربعة */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
           
           {/* Purple Glow: الإضاءة البنفسجية العلوية */}
           <div className="absolute top-0 left-0 right-0 h-[800px] w-full bg-gradient-to-b from-purple-500/10 via-transparent to-transparent blur-3xl" />
        </div>

        {/* --- 2. الجسيمات المتحركة (Particles) --- */}
        <Particles 
            className="absolute inset-0 z-0 h-full w-full" 
            quantity={100} 
            ease={80} 
            color="#a855f7" 
            refresh 
        />

        {/* --- 3. العملات العائمة (موزعة على طول الصفحة) --- */}
        <FloatingCoin delay={0} x="5%" y="5%" size={90} className="blur-[1px]" />
        <FloatingCoin delay={2} x="85%" y="10%" size={110} />
        
        <FloatingCoin delay={1} x="10%" y="35%" size={70} className="blur-[2px] opacity-80" />
        <FloatingCoin delay={3} x="90%" y="45%" size={80} className="opacity-90" />
        
        <FloatingCoin delay={1.5} x="5%" y="70%" size={60} className="blur-[1px]" />
        <FloatingCoin delay={2.5} x="92%" y="85%" size={100} className="blur-[2px] opacity-70" />

        {/* --- 4. الأقسام (مكدسة فوق بعضها بشفافية) --- */}
        <div className="relative z-10 flex flex-col w-full">
          <HeroChapter />
          <AppPreviewChapter />
          <VoicesChapter />
          <FAQChapter />
          <div id="about">
            <AboutChapter />
          </div>
        </div>

      </div>
    </PublicLayout>
  )
}