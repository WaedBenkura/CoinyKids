"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Facebook, Twitter, Instagram, Linkedin, Send, Heart } from "lucide-react";
import { Link } from "react-router-dom";

// مكون العملة العائمة
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
      className={`absolute z-0 pointer-events-none opacity-40 ${className}`}
      style={{ left: x, top: y }}
      initial={{ y: 0, rotate: -10 }}
      animate={{ 
        y: [-15, 15, -15], 
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
        className="drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
      />
    </motion.div>
  );

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-900 pt-20 pb-10 overflow-hidden mt-auto">
      
      {/* --- Wave Shape Divider (Top) --- */}
      {/* 
          تم استبدال الموجة المعقدة بموجة ناعمة ونظيفة جداً.
          المسار (Path) مملوء بلون القسم السابق (slate-950) ليغطي الحافة العلوية للفوتر.
          باقي المساحة شفاف، مما يظهر لون الفوتر (slate-900) بشكل منحنى انسيابي.
      */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            className="relative block w-[calc(100%+1.3px)] h-[60px] sm:h-[100px] fill-slate-950"
        >
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>

      {/* --- Floating 3D Elements --- */}
      <FloatingCoin delay={0} x="5%" y="40%" size={80} className="blur-[1px]" />
      <FloatingCoin delay={2} x="90%" y="20%" size={100} />
      <FloatingCoin delay={1} x="80%" y="70%" size={60} className="blur-[2px]" />

      <div className="container mx-auto px-6 relative z-10 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/home" className="flex items-center gap-2 group w-fit">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20">
                <Sparkles className="text-white h-5 w-5" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                Coiny<span className="text-purple-500">Kids</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm">
              Empowering the next generation with financial superpowers. Fun, safe, and educational money management for kids.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-purple-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Explore
            </h3>
            <ul className="space-y-4 text-slate-400">
              {['Home', 'About Us', 'Mini Store', 'Features', 'Pricing'].map((item) => (
                <li key={item}>
                  <Link to="#" className="hover:text-purple-400 hover:pl-2 transition-all duration-300 flex items-center gap-2">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal/Help */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                Support
            </h3>
            <ul className="space-y-4 text-slate-400">
              {['Help Center', 'Safety Center', 'Community Guidelines', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Link to="#" className="hover:text-cyan-400 hover:pl-2 transition-all duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Stay in the loop 🚀</h3>
            <p className="text-slate-400 text-sm mb-4">
                Join our newsletter to get the latest money tips for kids.
            </p>
            <div className="space-y-3">
              <div className="relative">
                <Input 
                    placeholder="Enter your email" 
                    className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 h-12 rounded-xl focus-visible:ring-purple-500"
                />
              </div>
              <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-purple-900/20">
                Subscribe <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {currentYear} CoinyKids Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>for future leaders</span>
          </div>
        </div>
      </div>
    </footer>
  );
}