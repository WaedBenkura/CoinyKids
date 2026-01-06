"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Particles } from "@/components/ui/particles";
import { useUserAuth } from "@/contexts/UserAuthContext";
import { toast } from "sonner";
import { 
  Sparkles, 
  Lock, 
  Mail, 
  Rocket,
  ShieldCheck,
  TrendingUp,
  User
} from "lucide-react";

// --- Floating Coin Component ---
const FloatingCoin = ({ delay, x, y, size = 60 }: { delay: number, x: string, y: string, size?: number }) => (
  <motion.div
    className="absolute z-0 pointer-events-none opacity-30 blur-[1px]"
    style={{ left: x, top: y }}
    animate={{ 
      y: [-20, 20, -20], 
      rotate: [-10, 10, -10],
    }}
    transition={{ duration: 6, repeat: Infinity, delay: delay, ease: "easeInOut" }}
  >
    <img 
      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png" 
      alt="Coin"
      style={{ width: size, height: size }}
      className="drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
    />
  </motion.div>
);

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup } = useUserAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState<"boy" | "girl">("boy");
  
  const from = location.state?.from || '/home';

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const success = await login(formData.get('email') as string, formData.get('password') as string);
      if (success) {
        toast.success('Login successful!');
        navigate(from);
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('Login failed.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const success = await signup(
        formData.get('email') as string, 
        formData.get('pin') as string, 
        formData.get('childName') as string, 
        parseInt(formData.get('age') as string, 10), 
        selectedGender, 
        formData.get('pin') as string
      );
      if (success) {
        toast.success('Account created!');
        navigate(from);
      } else {
        toast.error('Email already exists');
      }
    } catch (error) {
      toast.error('Sign up failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 overflow-hidden relative font-sans selection:bg-purple-500/30">
      
      {/* --- Background --- */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 left-0 right-0 h-[400px] w-full bg-gradient-to-b from-purple-900/20 via-transparent to-transparent blur-3xl" />
      <Particles className="absolute inset-0 z-0" quantity={50} ease={80} color="#a855f7" refresh />
      <FloatingCoin delay={0} x="10%" y="15%" size={60} />
      <FloatingCoin delay={2} x="85%" y="80%" size={80} />

      {/* --- Main Container (Compact Layout) --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center"
      >
        
        {/* --- Left Side: Branding (Smaller & Compact) --- */}
        <div className="hidden lg:flex flex-col justify-center text-white space-y-6">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 w-fit"
          >
             <Rocket className="w-4 h-4 text-purple-400" />
             <span className="text-xs font-bold text-purple-200">Start for Free</span>
          </motion.div>
          
          <div className="space-y-3">
            <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
              Smart Money <br />
              <span className="text-purple-500">Smart Kids</span>
            </h1>
            <p className="text-base text-slate-400 max-w-sm leading-relaxed">
              The #1 financial literacy platform designed for the next generation.
            </p>
          </div>

          {/* Compact Feature List */}
          <div className="grid gap-3 max-w-sm">
             <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                   <ShieldCheck className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                   <h3 className="font-bold text-sm text-white">100% Safe</h3>
                   <p className="text-[10px] text-slate-400">Parental controls included.</p>
                </div>
             </div>
             
             <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                   <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div>
                   <h3 className="font-bold text-sm text-white">Learn by Doing</h3>
                   <p className="text-[10px] text-slate-400">Earn coins & save up.</p>
                </div>
             </div>
          </div>
        </div>

        {/* --- Right Side: Auth Form (Smaller & Compact) --- */}
        <Card className="border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-[2rem] overflow-hidden">
          <CardContent className="p-6">
            
            {/* Mobile Header */}
            <div className="text-center mb-4 lg:hidden">
               <h2 className="text-xl font-black text-white flex items-center justify-center gap-2">
                 <Sparkles className="w-5 h-5 text-purple-500" /> CoinyKids
               </h2>
            </div>

            <Tabs defaultValue="signup" className="w-full">
              
              {/* Fixed Buttons (Tabs) */}
              <TabsList className="grid w-full grid-cols-2 mb-6 rounded-xl bg-slate-950 p-1 border border-slate-800 h-12">
                <TabsTrigger 
                  value="login" 
                  className="rounded-lg font-bold text-xs h-full data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-500 transition-all"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="rounded-lg font-bold text-xs h-full data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-500 transition-all shadow-sm"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              {/* --- Login Form --- */}
              <TabsContent value="login" className="mt-0">
                <form onSubmit={handleLogin} className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-slate-400 ml-1">Parent Email</Label>
                    <div className="relative group">
                       <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                       <Input 
                         type="email" 
                         name="email"
                         placeholder="parent@example.com" 
                         className="pl-9 h-10 rounded-xl bg-slate-950 border-slate-800 text-sm text-white placeholder:text-slate-600 focus-visible:ring-purple-500 transition-all" 
                         required 
                       />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center ml-1">
                       <Label className="text-xs text-slate-400">Password</Label>
                       <a href="#" className="text-[10px] text-purple-400 hover:text-purple-300">Forgot?</a>
                    </div>
                    <div className="relative group">
                       <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                       <Input 
                         type="password" 
                         name="password"
                         placeholder="••••••••"
                         className="pl-9 h-10 rounded-xl bg-slate-950 border-slate-800 text-sm text-white placeholder:text-slate-600 focus-visible:ring-purple-500 transition-all" 
                         required 
                       />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm shadow-md mt-2" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>
              
              {/* --- Sign Up Form --- */}
              <TabsContent value="signup" className="mt-0">
                <form onSubmit={handleSignup} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-slate-400 ml-1">Child Name</Label>
                      <div className="relative group">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                        <Input 
                          name="childName"
                          placeholder="Alex" 
                          className="pl-9 h-10 rounded-xl bg-slate-950 border-slate-800 text-sm text-white placeholder:text-slate-600 focus-visible:ring-purple-500" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-slate-400 ml-1">Age</Label>
                      <Input 
                        name="age"
                        type="number" 
                        placeholder="8" 
                        className="h-10 rounded-xl bg-slate-950 border-slate-800 text-sm text-white placeholder:text-slate-600 focus-visible:ring-purple-500 text-center font-bold" 
                        min="5" 
                        max="16" 
                        required 
                      />
                    </div>
                  </div>

                  {/* 3D Avatar Selection (Fixed & Styled) */}
                  <div className="grid grid-cols-2 gap-3">
                      <div 
                        onClick={() => setSelectedGender("boy")}
                        className={`relative rounded-2xl p-2 cursor-pointer transition-all duration-300 border-2 flex flex-col items-center justify-center h-28 overflow-hidden group
                          ${selectedGender === 'boy' 
                          ? 'bg-blue-600/10 border-blue-500 shadow-lg shadow-blue-900/20' 
                          : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`
                        }
                      >
                         {/* Background Glow */}
                         <div className={`absolute inset-0 bg-blue-500/20 blur-xl transition-opacity ${selectedGender === 'boy' ? 'opacity-100' : 'opacity-0'}`} />
                         
                         <img 
                           src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Boy.png"
                           alt="Boy"
                           className={`w-16 h-16 object-contain z-10 transition-transform duration-300 ${selectedGender === 'boy' ? 'scale-110' : 'group-hover:scale-110 opacity-70 group-hover:opacity-100'}`}
                         />
                         <span className={`text-xs font-bold mt-1 z-10 ${selectedGender === 'boy' ? 'text-blue-400' : 'text-slate-500'}`}>Boy</span>
                      </div>

                      <div 
                        onClick={() => setSelectedGender("girl")}
                        className={`relative rounded-2xl p-2 cursor-pointer transition-all duration-300 border-2 flex flex-col items-center justify-center h-28 overflow-hidden group
                          ${selectedGender === 'girl' 
                          ? 'bg-pink-600/10 border-pink-500 shadow-lg shadow-pink-900/20' 
                          : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`
                        }
                      >
                         {/* Background Glow */}
                         <div className={`absolute inset-0 bg-pink-500/20 blur-xl transition-opacity ${selectedGender === 'girl' ? 'opacity-100' : 'opacity-0'}`} />

                         <img 
                           src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Girl.png"
                           alt="Girl"
                           className={`w-16 h-16 object-contain z-10 transition-transform duration-300 ${selectedGender === 'girl' ? 'scale-110' : 'group-hover:scale-110 opacity-70 group-hover:opacity-100'}`}
                         />
                         <span className={`text-xs font-bold mt-1 z-10 ${selectedGender === 'girl' ? 'text-pink-400' : 'text-slate-500'}`}>Girl</span>
                      </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-slate-400 ml-1">Parent Email</Label>
                    <div className="relative group">
                       <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                       <Input 
                         name="email"
                         type="email" 
                         placeholder="parent@email.com" 
                         className="pl-9 h-10 rounded-xl bg-slate-950 border-slate-800 text-sm text-white placeholder:text-slate-600 focus-visible:ring-purple-500" 
                         required 
                       />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-slate-400 ml-1">Set Parental PIN</Label>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                        <Input 
                          name="pin"
                          type="password" 
                          placeholder="••••" 
                          maxLength={4}
                          className="pl-9 h-10 rounded-xl bg-slate-950 border-slate-800 text-sm text-white placeholder:text-slate-600 focus-visible:ring-purple-500 tracking-widest" 
                          required 
                        />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-900/20 transition-all mt-2" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Start Journey 🚀"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                onClick={() => navigate("/home")} 
                className="text-slate-500 hover:text-white transition-colors text-xs h-auto p-0"
              >
                Back to Website
              </Button>
            </div>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}