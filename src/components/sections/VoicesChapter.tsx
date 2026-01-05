"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { Particles } from "@/components/ui/particles";

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

export function VoicesChapter() {
  const testimonials = [
    {
      name: "Emma, Age 9",
      role: "Young Saver",
      content: "I love earning coins for doing chores! Now I save for toys instead of asking for them right away.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60",
      rating: 5
    },
    {
      name: "Mr. Johnson",
      role: "Parent",
      content: "CoinyKids has completely changed how my daughter thinks about money. She's saving and planning!",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60",
      rating: 5
    },
    {
      name: "Sophie, Age 11",
      role: "Goal Achiever",
      content: "I saved up 500 coins to buy a book! It felt amazing to earn it myself.",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60",
      rating: 5
    },
    {
      name: "Mrs. Davis",
      role: "Parent",
      content: "The parental controls are perfect - I can see what my kids are doing and approve tasks easily.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60",
      rating: 5
    },
    {
      name: "Liam, Age 8",
      role: "Coin Collector",
      content: "I got a star for saving $10! Now I want to save even more!",
      image: "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?w=500&auto=format&fit=crop&q=60",
      rating: 5
    },
    {
      name: "Dr. Smith",
      role: "Educator",
      content: "Financial literacy at an early age is crucial. CoinyKids makes it fun and engaging.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60",
      rating: 5
    }
  ];

  return (
    // تم تغيير الخلفية إلى شفافة وإزالة overflow-hidden للسماح للعناصر بالظهور بشكل متصل
      <section className="relative min-h-screen w-full flex items-center justify-center p-8 py-20 bg-slate-950 flex flex-col items-center justify-center">

      {/* تم إزالة كود الشبكة (Grid) من هنا كما طلبت */}
      <Particles className="absolute inset-0 z-0" quantity={60} ease={80} color="#a855f7" refresh />
      
      {/* --- Floating Coins --- */}
      <FloatingCoin delay={0} x="5%" y="20%" size={80} className="blur-[1px]" />
      <FloatingCoin delay={2} x="92%" y="30%" size={100} />
      <FloatingCoin delay={1} x="10%" y="80%" size={60} className="blur-[2px] opacity-70" />
      <FloatingCoin delay={3} x="85%" y="75%" size={70} className="opacity-80" />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          {/* Section Header */}
          <div className="mb-16 space-y-4">
            <motion.h2 
              className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
            >
              Voices of Success
            </motion.h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Join thousands of families transforming their financial future, one coin at a time.
            </p>
          </div>
          
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-slate-900/40 border-slate-800 backdrop-blur-sm hover:border-purple-500/50 hover:bg-slate-900/60 transition-all duration-500 group overflow-hidden relative">
                  {/* Decorational Gradient Blob inside card */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all duration-500" />
                  
                  <CardContent className="p-6 flex flex-col h-full text-left relative z-10">
                    <Quote className="w-8 h-8 text-purple-500/20 mb-4 group-hover:text-purple-500/50 transition-colors" />
                    
                    <p className="text-slate-300 mb-6 flex-grow leading-relaxed font-medium">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center gap-4 pt-4 border-t border-slate-800/50">
                      <Avatar className="h-12 w-12 border-2 border-purple-500/20 group-hover:border-purple-500 transition-colors">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} className="object-cover" />
                        <AvatarFallback className="bg-slate-800 text-purple-400">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">
                          {testimonial.name}
                        </h3>
                        <p className="text-slate-500 text-xs">{testimonial.role}</p>
                      </div>

                      <div className="ml-auto flex gap-0.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}