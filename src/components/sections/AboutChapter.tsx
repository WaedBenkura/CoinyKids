"use client";

import { motion } from "motion/react";
import { Particles } from "@/components/ui/particles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Coins, Users, Trophy } from "lucide-react";

// --- Floating Coin Component ---
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
export function AboutChapter() {
  return (
      <section className="relative w-full py-20 bg-slate-950/50">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 right-0 h-[400px] w-full bg-gradient-to-b from-purple-500/10 via-transparent to-transparent blur-3xl z-0" />
      <Particles className="absolute inset-0 z-0" quantity={80} ease={80} color="#a855f7" refresh />


      {/* --- Floating Coins --- */}
      <FloatingCoin delay={0} x="5%" y="20%" size={80} className="blur-[1px]" />
      <FloatingCoin delay={2} x="92%" y="30%" size={100} />
      <FloatingCoin delay={1} x="10%" y="80%" size={60} className="blur-[2px] opacity-70" />
      <FloatingCoin delay={3} x="85%" y="75%" size={70} className="opacity-80" />

      <div className="container mx-auto px-4 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-4">
            About Our Mission
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We believe that financial literacy should be accessible to everyone, starting from a young age.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-700 hover:border-purple-500/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <CardTitle className="text-white">Educational</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">Learning made fun and engaging for children of all ages.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-700 hover:border-purple-500/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <Coins className="w-6 h-6 text-green-400" />
              </div>
              <CardTitle className="text-white">Rewarding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">Earn coins for completing educational content and challenges.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-700 hover:border-purple-500/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <CardTitle className="text-white">Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">Join thousands of kids learning about money together.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-700 hover:border-purple-500/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
              <CardTitle className="text-white">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">Collect badges and rewards for your learning milestones.</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-lg px-6 py-2">
            Making financial literacy fun since 2025
          </Badge>
        </div>
      </div>
    </section>
  );
}