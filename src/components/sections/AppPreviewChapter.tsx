"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PhoneMockup } from "@/components/ui/phone-mockup";
import { 
  LayoutDashboard, 
  Target, 
  CheckCircle2, 
  Trophy, 
  Wallet, 
  Gamepad2, 
  Plus, 
  TrendingUp,
  Sparkles,
  Lock,
  Star
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Particles } from "@/components/ui/particles";

// --- Floating Coin Component (Same as HeroChapter) ---
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

export function AppPreviewChapter() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  // تعريف محتوى الشاشات
  const screens = [
    { 
      id: "dashboard",
      icon: LayoutDashboard,
      title: "Dashboard", 
      description: "Track earnings & savings in real-time.",
      color: "from-purple-500 to-indigo-600"
    },
    { 
      id: "goals",
      icon: Target,
      title: "Smart Goals", 
      description: "Set visual targets for things you want.",
      color: "from-pink-500 to-rose-500"
    },
    { 
      id: "tasks",
      icon: CheckCircle2,
      title: "Daily Tasks", 
      description: "Complete chores to earn coins.",
      color: "from-emerald-400 to-teal-500"
    },
    { 
      id: "rewards",
      icon: Trophy,
      title: "Rewards", 
      description: "Unlock badges and achievements.",
      color: "from-amber-400 to-orange-500"
    }
  ];

  // التدوير التلقائي للشاشات
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % screens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // مكونات واجهة المستخدم الداخلية للهاتف
  const renderScreenContent = () => {
    switch (activeScreen) {
      case 0: // Dashboard
        return (
          <div className="space-y-4 p-1">
            {/* Balance Card */}
            <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 p-5 text-white shadow-lg shadow-purple-500/20">
              <div className="flex justify-between items-start mb-2">
                <span className="text-purple-100 text-xs font-medium uppercase tracking-wider">Total Balance</span>
                <Wallet className="w-5 h-5 text-purple-200" />
              </div>
              <div className="text-4xl font-black mb-1">1,250 <span className="text-xl">©</span></div>
              <div className="flex items-center gap-1 text-xs text-purple-200 bg-white/10 w-fit px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" />
                <span>+120 this week</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-purple-50 p-3 rounded-xl flex flex-col items-center justify-center gap-2 border border-purple-100">
                 <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600"><Plus className="w-5 h-5"/></div>
                 <span className="text-xs font-bold text-slate-600">Add Goal</span>
              </div>
              <div className="bg-purple-50 p-3 rounded-xl flex flex-col items-center justify-center gap-2 border border-purple-100">
                 <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600"><Gamepad2 className="w-5 h-5"/></div>
                 <span className="text-xs font-bold text-slate-600">Play</span>
              </div>
            </div>

            {/* Recent Activity List Mockup */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase ml-1">Recent Activity</div>
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-700">Clean Room</div>
                    <div className="text-[10px] text-slate-400">Today, 10:00 AM</div>
                  </div>
                  <div className="font-bold text-purple-600">+50</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 1: // Goals
        return (
          <div className="space-y-4 p-1">
             <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center text-pink-500">
                    <Target className="w-6 h-6" />
                  </div>
                  <Badge className="bg-pink-100 text-pink-600 hover:bg-pink-100">Active</Badge>
                </div>
                <h3 className="font-bold text-slate-800 text-lg">New Bicycle</h3>
                <p className="text-xs text-slate-500 mb-4">Target: 5,000 Coins</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-pink-600">2,500 collected</span>
                    <span className="text-slate-400">50%</span>
                  </div>
                  <Progress value={50} className="h-2 bg-slate-100" />
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mt-1">
                     <div className="h-full bg-pink-500 w-1/2 rounded-full" />
                  </div>
                </div>
             </div>

             <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm opacity-60">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                  <Badge variant="outline">Paused</Badge>
                </div>
                <h3 className="font-bold text-slate-800 text-lg">Video Game</h3>
                <p className="text-xs text-slate-500 mb-2">Target: 3,000 Coins</p>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500 w-[20%] rounded-full" />
                </div>
             </div>
          </div>
        );

      case 2: // Tasks
        return (
          <div className="space-y-3 p-1">
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl mb-4">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Daily Streak: 5 Days!</span>
              </div>
            </div>
            {["Make Bed", "Homework", "Walk the Dog", "Read 20 mins"].map((task, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm group hover:border-emerald-400 transition-colors cursor-pointer">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${i === 0 ? "bg-emerald-500 border-emerald-500" : "border-slate-300"}`}>
                  {i === 0 && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1 text-sm font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors">
                  {task}
                </div>
                <Badge variant="secondary" className="bg-amber-100 text-amber-700">+{(i+1)*10}</Badge>
              </div>
            ))}
          </div>
        );

      case 3: // Rewards
        return (
          <div className="grid grid-cols-2 gap-3 p-1">
             <div className="col-span-2 bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-2xl text-white shadow-lg shadow-orange-500/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-orange-100 uppercase">Current Rank</div>
                  <div className="text-2xl font-black">Gold Saver</div>
                </div>
                <Trophy className="w-10 h-10 text-yellow-200" />
             </div>
             {[1,2,3,4].map((i) => (
               <div key={i} className={`aspect-square rounded-2xl border flex flex-col items-center justify-center gap-2 p-2 ${i <= 2 ? 'bg-white border-slate-100' : 'bg-slate-50 border-slate-100'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${i <= 2 ? 'bg-amber-100 text-amber-500' : 'bg-slate-200 text-slate-400'}`}>
                    {i <= 2 ? <Star className="w-6 h-6 fill-current" /> : <Lock className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs font-bold ${i <= 2 ? 'text-slate-700' : 'text-slate-400'}`}>
                    Level {i}
                  </span>
               </div>
             ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
      <section className="relative min-h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center p-8 py-24">
      
      {/* --- Particles only (no grid) --- */}
      <Particles className="absolute inset-0 z-0" quantity={60} ease={80} color="#a855f7" refresh />
      
      {/* --- Floating Coins Animation --- */}
      <FloatingCoin delay={0} x="10%" y="20%" size={90} className="blur-[1px]" />
      <FloatingCoin delay={2} x="85%" y="15%" size={110} />
      <FloatingCoin delay={1} x="15%" y="75%" size={70} className="blur-[2px] opacity-80" />
      <FloatingCoin delay={3} x="80%" y="65%" size={80} className="opacity-90" />
      <FloatingCoin delay={1.5} x="5%" y="50%" size={50} className="blur-[3px] opacity-60" />
      <FloatingCoin delay={2.5} x="92%" y="40%" size={60} className="blur-[2px] opacity-70" />


      
      <div className="container relative z-10 px-4">
        {/* تم تقليل العرض الكلي (max-w-5xl) وتم توسيط العناصر (justify-center) */}
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          
          {/* Left Side: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1 flex justify-center lg:justify-end"
          >
            <PhoneMockup className="w-[320px] h-[650px]">
              <div className="w-full h-full bg-slate-50 flex flex-col overflow-hidden">
                
                {/* Mobile Header */}
                <div className="pt-12 pb-4 px-6 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">A</div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Welcome back</div>
                      <div className="text-sm font-black text-slate-800">Alex Junior</div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-0.5 -right-0.5 border-2 border-white" />
                    <Sparkles className="w-5 h-5 text-slate-400" />
                  </div>
                </div>

                {/* Mobile Content Area (Dynamic) */}
                <div className="flex-1 overflow-hidden relative p-4 bg-slate-50/50">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeScreen}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="h-full"
                    >
                      {renderScreenContent()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Mobile Bottom Navigation */}
                <div className="bg-white border-t border-slate-100 p-3 flex justify-around items-center pb-8">
                  {screens.map((screen, idx) => {
                    const Icon = screen.icon;
                    const isActive = activeScreen === idx;
                    return (
                       <div key={idx} className={`flex flex-col items-center gap-1 transition-colors duration-300 ${isActive ? 'text-purple-600' : 'text-slate-300'}`}>
                          <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
                          <span className="text-[9px] font-bold">{screen.title}</span>
                       </div>
                    )
                  })}
                </div>

              </div>
            </PhoneMockup>
          </motion.div>
          
          {/* Right Side: Features List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 lg:flex-none lg:w-auto lg:max-w-lg order-1 lg:order-2 text-left"
          >
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-6">
              App Preview
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
              Designed for kids, loved by parents. Experience a safe, engaging environment where financial literacy meets fun.
            </p>

            <div className="space-y-4">
              {screens.map((screen, index) => {
                const isActive = activeScreen === index;
                const Icon = screen.icon;
                
                return (
                  <div 
                    key={index}
                    onClick={() => {
                      setActiveScreen(index);
                      setAutoRotate(false);
                    }}
                    className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden group ${isActive ? 'bg-slate-900 border border-purple-500/50 shadow-lg shadow-purple-900/20' : 'bg-transparent border border-transparent hover:bg-slate-900/50'}`}
                  >
                    {/* Active Progress Bar Background */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeGlow"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-cyan-500"
                      />
                    )}

                    <div className="flex items-start gap-4">
                       <div className={`mt-1 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-gradient-to-br ' + screen.color + ' text-white' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'}`}>
                          <Icon className="w-5 h-5" />
                       </div>
                       <div>
                          <h3 className={`text-xl font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                            {screen.title}
                          </h3>
                          <p className={`text-sm mt-1 transition-colors ${isActive ? 'text-slate-300' : 'text-slate-600'}`}>
                            {screen.description}
                          </p>
                       </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}