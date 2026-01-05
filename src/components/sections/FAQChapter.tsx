"use client";

import { motion } from "motion/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircleQuestion, Sparkles } from "lucide-react";
import { Particles } from "@/components/ui/particles";

export function FAQChapter() {
  const faqs = [
    {
      question: "How does CoinyKids help my child learn about money?",
      answer: "CoinyKids uses gamification to make financial education fun. Children earn virtual coins by completing tasks and chores, which they can save and use to achieve goals. This hands-on approach helps them understand the value of money and the importance of saving."
    },
    {
      question: "Is CoinyKids safe for children?",
      answer: "Absolutely! CoinyKids is designed with child safety as our top priority. All activities happen in a secure virtual environment with parental oversight. Parents control all aspects of their child's experience and can monitor their progress at any time."
    },
    {
      question: "How do parents control their child's account?",
      answer: "Parents have complete control through our Parent Dashboard. You can approve tasks, set spending limits, send allowances, track progress, and control rewards. All financial activities are transparent and require parental approval."
    },
    {
      question: "What age group is CoinyKids designed for?",
      answer: "CoinyKids is designed for children aged 8-14. The interface and financial concepts are tailored to be age-appropriate and engaging for this demographic, with different complexity levels as children grow."
    },
    {
      question: "Can I use CoinyKids on multiple devices?",
      answer: "Yes! CoinyKids is a web-based platform that works on any device with a modern browser. You can access your account from smartphones, tablets, laptops, and desktop computers."
    },
    {
      question: "Is there a cost to use CoinyKids?",
      answer: "CoinyKids offers a free tier with core features, and premium subscriptions for additional functionality. The free tier includes basic earning, saving, and goal-setting capabilities."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            <MessageCircleQuestion className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-200 mb-6 text-center drop-shadow-sm">
            Frequently Asked
          </h2>
          
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about starting your financial journey with CoinyKids.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem 
                  value={`item-${index}`} 
                  className="border border-slate-800 bg-slate-900/40 backdrop-blur-md rounded-2xl px-2 overflow-hidden hover:border-purple-500/30 hover:bg-slate-900/60 transition-all duration-300 group"
                >
                  <AccordionTrigger className="text-left px-4 py-5 text-lg font-bold text-slate-200 hover:text-purple-400 hover:no-underline transition-colors [&[data-state=open]]:text-purple-400">
                    <span className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-slate-500 text-sm font-bold group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                        0{index + 1}
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-6 pt-0 text-slate-400 text-base leading-relaxed pl-[3.75rem]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-purple-500/50 to-cyan-500/50">
            <div className="px-8 py-3 rounded-full bg-slate-950 flex items-center gap-2 text-slate-300">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Still have questions?</span>
              <a href="#" className="text-white font-bold hover:text-purple-400 transition-colors underline decoration-purple-500/50 underline-offset-4">Contact Support</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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