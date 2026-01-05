"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Particles } from "@/components/ui/particles"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ArrowRight, ChevronDown, Coins, PiggyBank, Star } from "lucide-react"
import { useParentalApproval } from "@/contexts/ParentalApprovalContext"

// Floating Coin Component for background animation
const FloatingCoin = ({ 
  delay, 
  x, 
  y, 
  size = 60, 
  className 
}: { 
  delay: number, 
  x: string, 
  y: string, 
  size?: number,
  className?: string 
}) => (
  <motion.div
    className={`absolute z-0 pointer-events-none ${className}`}
    style={{ left: x, top: y }}
    initial={{ y: 0, rotate: -10 }}
    animate={{ 
      y: [-20, 20, -20], 
      rotate: [-10, 10, -10],
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      delay: delay,
      ease: "easeInOut" 
    }}
  >
    <img 
      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png" 
      alt="Coin"
      style={{ width: size, height: size }}
      className="drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
    />
  </motion.div>
)

export function HeroChapter() {
  const navigate = useNavigate()
  const { requestParentalApproval } = useParentalApproval();
  // State for opening/closing dialog
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false)

  // Steps data
  const steps = [
    {
      icon: <Coins className="w-8 h-8 text-yellow-400" />,
      title: "1. Earn",
      desc: "Complete tasks and chores to earn coins"
    },
    {
      icon: <PiggyBank className="w-8 h-8 text-yellow-400" />,
      title: "2. Save",
      desc: "Watch your savings grow with smart goals"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      title: "3. Achieve",
      desc: "Reach milestones and unlock rewards"
    }
  ]

  return (
    <section className="relative h-screen w-full overflow-hidden bg-slate-950 flex flex-col items-center justify-center">
      
      {/* --- Background effects --- */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-gradient-to-b from-purple-500/10 via-transparent to-transparent blur-3xl" />
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-purple-600/20 blur-[100px]" />
      <Particles className="absolute inset-0 z-0" quantity={80} ease={80} color="#a855f7" refresh />

      {/* --- Floating Coins Animation --- */}
      <FloatingCoin delay={0} x="10%" y="20%" size={90} className="blur-[1px]" />
      <FloatingCoin delay={2} x="85%" y="15%" size={110} />
      <FloatingCoin delay={1} x="15%" y="75%" size={70} className="blur-[2px] opacity-80" />
      <FloatingCoin delay={3} x="80%" y="65%" size={80} className="opacity-90" />
      <FloatingCoin delay={1.5} x="5%" y="50%" size={50} className="blur-[3px] opacity-60" />
      <FloatingCoin delay={2.5} x="92%" y="40%" size={60} className="blur-[2px] opacity-70" />

      {/* --- Main Content --- */}
      <div className="container relative z-10 px-4 text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <Badge variant="outline" className="border-purple-500/30 bg-purple-500/10 text-purple-400 px-4 py-1.5 text-sm backdrop-blur-md rounded-full">
             Fun-first financial education ✨
          </Badge>
        </motion.div>

        {/* Headings */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto max-w-4xl text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 sm:text-8xl md:text-9xl py-2"
        >
          CoinyKids
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl space-y-2"
        >
          <h2 className="text-2xl font-bold text-purple-400 md:text-3xl">
            Money skills start young.
          </h2>
          <p className="text-lg text-slate-400 font-medium leading-relaxed md:text-xl">
            Gamified financial education for kids.
             Earn coins, save smart, and achieve financial goals under parental supervision.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button 
            onClick={() => navigate("/store")}
            size="lg" 
            className="h-14 min-w-[200px] rounded-full bg-purple-500 text-lg font-bold text-white shadow-[0_0_30px_-10px_rgba(168,85,247,0.6)] hover:bg-purple-400 hover:scale-105 transition-all duration-300"
          >
            Start Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          {/* How it works button - opens dialog */}
          <Button 
            onClick={() => setIsHowItWorksOpen(true)}
            variant="outline"
            size="lg" 
            className="h-14 min-w-[200px] rounded-full border-slate-700 bg-slate-900/50 text-lg font-medium text-white backdrop-blur-sm hover:bg-slate-800 hover:text-purple-400 transition-all"
          >
            How it works?
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs uppercase tracking-[0.2em]">Discover More</span>
          <ChevronDown className="h-5 w-5 animate-bounce text-purple-500" />
        </div>
      </motion.div>

      {/* --- "How it works" dialog --- */}
      <Dialog open={isHowItWorksOpen} onOpenChange={setIsHowItWorksOpen}>
        <DialogContent className="bg-slate-950 border-slate-800 text-white sm:max-w-3xl">
          <DialogHeader className="text-center mb-6">
            <DialogTitle className="text-3xl font-bold text-purple-500 mb-2">Earning Coins in 3 Simple Steps</DialogTitle>
            <DialogDescription className="text-slate-400 text-lg">
              It's easier than you think, takes just a minute to get started
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-colors">
                <div className="mb-4 p-4 rounded-full bg-slate-950 border border-slate-800 shadow-xl">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button 
              onClick={() => {
                setIsHowItWorksOpen(false)
                navigate("/store")
              }}
              className="bg-purple-500 text-white font-bold hover:bg-purple-400 px-8 rounded-full"
            >
              Try Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </section>
  )
}