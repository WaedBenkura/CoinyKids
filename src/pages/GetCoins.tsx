"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Particles } from "@/components/ui/particles";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Brain, 
  Coins, 
  Trophy, 
  Clock, 
  ArrowRight,
  X,
  CheckCircle,
  AlertCircle,
  LogIn
} from "lucide-react";
import confetti from "canvas-confetti";
import { useGlobalCoin } from "@/contexts/GlobalCoinContext";
import { useParentalApproval } from "@/contexts/ParentalApprovalContext";
import { useUserAuth } from "@/contexts/UserAuthContext";

// --- بيانات الفيديوهات (روابط مباشرة MP4 للتحكم في انتهاء الفيديو) ---
const VIDEOS = [
  {
    id: 1,
    title: "What is Money? | Educational Video",
    description: "Learn about coins, bills, and how money helps us buy things.",
    durationLabel: "2:44",
    durationSeconds: 164,
    reward: 100,
    thumbnail: "https://img.youtube.com/vi/btZ43QLlj40/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/btZ43QLlj40"
  },
  {
    id: 2,
    title: "Needs vs Wants - Financial Literacy",
    description: "Discover the difference between needs and wants.",
    durationLabel: "5:15",
    durationSeconds: 315,
    reward: 120,
    thumbnail: "https://img.youtube.com/vi/TP1gPF6e3UM/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/TP1gPF6e3UM"
  },
  {
    id: 3,
    title: "How Savings Work",
    description: "Find out how saving your coins can help them grow.",
    durationLabel: "0:29",
    durationSeconds: 29,
    reward: 150,
    thumbnail: "https://img.youtube.com/vi/hYbRu_MXI80/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/hYbRu_MXI80"
  }
];


const QUIZZES = [
  {
    id: 1,
    title: "Money Recognition",
    questionsData: [
      { q: "What do we use to buy things at the store?", options: ["Food", "Money", "Toys"], correct: 1 },
      { q: "Which one is NOT a coin?", options: ["Penny", "Dollar", "Quarter"], correct: 1 },
      { q: "What color is a dollar bill?", options: ["Green", "Blue", "Red"], correct: 0 },
    ],
    reward: 150,
    difficulty: "Easy",
    color: "bg-emerald-500"
  },
  {
    id: 2,
    title: "Needs vs Wants",
    questionsData: [
      { q: "Do you need food?", options: ["Yes", "No"], correct: 0 },
      { q: "Is a toy a need or want?", options: ["Need", "Want"], correct: 1 },
      { q: "Which is a need?", options: ["Candy", "Pizza", "Video Game"], correct: 1 },
    ],
    reward: 200,
    difficulty: "Medium",
    color: "bg-blue-500"
  },
  {
    id: 3,
    title: "Saving Strategies",
    questionsData: [
      { q: "What happens when you save money?", options: ["It grows", "It disappears", "It changes color"], correct: 0 },
      { q: "Where should you keep your savings?", options: ["Under your bed", "Piggy bank", "In your pocket"], correct: 1 },
      { q: "If you save $5 every week, how much after 4 weeks?", options: ["$9", "$20", "$15"], correct: 1 },
    ],
    reward: 250,
    difficulty: "Hard",
    color: "bg-purple-500"
  }
];

// --- Floating Background Element ---
const FloatingCoin = ({ delay, x, y, size = 60, className }: { delay: number, x: string, y: string, size?: number, className?: string }) => (
  <motion.div
    className={`absolute z-0 pointer-events-none ${className}`}
    style={{ left: x, top: y }}
    initial={{ y: 0, rotate: -10 }}
    animate={{ y: [-20, 20, -20], rotate: [-10, 10, -10] }}
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

export default function GetCoins() {
  const navigate = useNavigate();
  const { updateBalance } = useGlobalCoin(); // Keep for compatibility but won't use for coin updates
  const { requestParentalApproval } = useParentalApproval();
  const { currentUser, isAuthenticated, updateUserCoins } = useUserAuth();
  
  // Ref to track the currently selected video
  const selectedVideoRef = useRef<typeof VIDEOS[0] | null>(null);
  // Ref to track the start time of the current video
  const videoStartTimeRef = useRef<number | null>(null);
  // Ref to track the current timer
  const videoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Ref to track document visibility state
  const isDocumentVisibleRef = useRef(true);
  
  // States
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEOS[0] | null>(null);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [watchProgress, setWatchProgress] = useState(0); // Track viewing progress
  const [videoRewardCollected, setVideoRewardCollected] = useState<Record<number, boolean>>({}); // Track collected videos
  
  const [activeQuiz, setActiveQuiz] = useState<typeof QUIZZES[0] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [currentReward, setCurrentReward] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  // Update Balance Helper
  const addCoins = (amount: number) => {
    // Update the user's coins using UserAuthContext
    if (currentUser) {
      const newCoins = currentUser.coins + amount;
      updateUserCoins(newCoins);
      // Also update global balance for display purposes
      updateBalance(amount);
    }
    
    // Trigger Confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      zIndex: 9999
    });
  };

  // Handle document visibility change to prevent cheating
  useEffect(() => {
    const handleVisibilityChange = () => {
      isDocumentVisibleRef.current = !document.hidden;
      
      // If document becomes hidden, stop the timer
      if (document.hidden && selectedVideoRef.current) {
        if (videoTimerRef.current) {
          clearTimeout(videoTimerRef.current);
          videoTimerRef.current = null;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Handle video click
  const handleVideoClick = (video: typeof VIDEOS[0]) => {
    if (!isAuthenticated) {
      // Redirect to auth page if not authenticated
      navigate('/auth', { state: { from: location.pathname } });
      return;
    }
    
    // If authenticated, proceed as normal
    setSelectedVideo(video);
    selectedVideoRef.current = video; // Update the ref
    videoStartTimeRef.current = Date.now(); // Set start time
    
    // Reset progress and completion states
    setVideoCompleted(false);
    setWatchProgress(0);
    
    // If it's a YouTube video, we'll use a timer to mark it as completed based on duration
    if (video.videoUrl.includes('youtube.com/embed')) {
      // Clear any existing timer
      if (videoTimerRef.current) {
        clearTimeout(videoTimerRef.current);
        videoTimerRef.current = null;
      }
      
      // Set a timer to mark video as completed after the full duration
      videoTimerRef.current = setTimeout(() => {
        if (selectedVideoRef.current && selectedVideoRef.current.id === video.id && isDocumentVisibleRef.current) {
          setVideoCompleted(true);
          setWatchProgress(100); // Mark as 100% watched
        }
      }, video.durationSeconds * 1000); // Convert seconds to milliseconds
      
      // Start progress tracking
      const interval = setInterval(() => {
        if (selectedVideoRef.current && selectedVideoRef.current.id === video.id && isDocumentVisibleRef.current && videoStartTimeRef.current) {
          // Calculate progress based on elapsed time
          const elapsed = (Date.now() - videoStartTimeRef.current) / 1000;
          const progress = Math.min(100, Math.floor((elapsed / video.durationSeconds) * 100));
          setWatchProgress(progress);
        } else {
          clearInterval(interval);
        }
      }, 1000); // Update every second
    }
  };

  // Handle quiz start
  const handleStartQuiz = (quiz: typeof QUIZZES[0]) => {
    if (!isAuthenticated) {
      // Redirect to auth page if not authenticated
      navigate('/auth', { state: { from: location.pathname } });
      return;
    }
    // If authenticated, proceed as normal
    startQuiz(quiz);
  };

  // --- Video Logic ---
  const handleVideoEnded = () => {
    if (selectedVideo) {
      setVideoCompleted(true);
    }
  };

  const handleVideoClose = () => {
    // Clear any existing timer when closing
    if (videoTimerRef.current) {
      clearTimeout(videoTimerRef.current);
      videoTimerRef.current = null;
    }
    
    // Reset video state when modal is closed
    setSelectedVideo(null);
    setVideoCompleted(false);
    setWatchProgress(0);
    selectedVideoRef.current = null;
    videoStartTimeRef.current = null;
  };

  const collectVideoReward = () => {
    if (selectedVideo && !videoRewardCollected[selectedVideo.id]) {
      addCoins(selectedVideo.reward);
      setVideoRewardCollected(prev => ({...prev, [selectedVideo.id]: true}));
      setVideoCompleted(false);
      setSelectedVideo(null);
      setWatchProgress(0);
      selectedVideoRef.current = null;
      videoStartTimeRef.current = null;
      
      // Clear any existing timer
      if (videoTimerRef.current) {
        clearTimeout(videoTimerRef.current);
        videoTimerRef.current = null;
      }
    }
  };

  // --- Quiz Logic ---
  const startQuiz = (quiz: typeof QUIZZES[0]) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setUserAnswers([]);
    setCorrectAnswersCount(0);
    setCurrentReward(quiz.reward);
  };

  const handleAnswer = (isCorrect: boolean, selectedIndex: number) => {
    if (!activeQuiz || isLocked) return;
    
    setIsLocked(true);
    const newAnswers = [...userAnswers, selectedIndex];
    setUserAnswers(newAnswers);

    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
    } else {
      // Deduct reward per wrong answer
      setCurrentReward(prev => Math.max(0, prev - (activeQuiz!.reward / activeQuiz!.questionsData.length)));
    }

    setTimeout(() => {
      if (currentQuestionIndex < activeQuiz.questionsData.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        finishQuiz();
      }
      setIsLocked(false);
    }, 1000);
  };

  const finishQuiz = () => {
    setQuizCompleted(true);
  };

  const collectQuizReward = () => {
    if (currentReward > 0) {
      addCoins(Math.floor(currentReward));
    }
    closeQuiz();
  };

  const closeQuiz = () => {
    setActiveQuiz(null);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
  };

  // Shake Animation Style
  useLayoutEffect(() => {
    const styleId = 'shake-animation-style';
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
      }
      .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <PublicLayout>
      <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden pb-20">
        
        {/* --- Background --- */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-gradient-to-b from-purple-500/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-purple-600/20 blur-[100px]" />
        <Particles className="absolute inset-0 z-0" quantity={80} ease={80} color="#a855f7" refresh />
        
        {/* --- Floating Coins --- */}
        <FloatingCoin delay={0} x="10%" y="20%" size={90} className="blur-[1px]" />
        <FloatingCoin delay={2} x="85%" y="15%" size={110} />
        <FloatingCoin delay={1} x="15%" y="75%" size={70} className="blur-[2px] opacity-80" />
        <FloatingCoin delay={3} x="80%" y="65%" size={80} className="opacity-90" />
        <FloatingCoin delay={1.5} x="5%" y="50%" size={50} className="blur-[3px] opacity-60" />
        <FloatingCoin delay={2.5} x="92%" y="40%" size={60} className="blur-[2px] opacity-70" />

        {/* --- Content --- */}
        <div className="container mx-auto px-4 relative z-10 pt-32">
          
{/* Header */}
<div className="flex justify-center items-center mb-16">
  <div className="text-center max-w-3xl">
    <motion.h1 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 mb-4"
    >
      Learn & Earn
    </motion.h1>
    <p className="text-xl text-slate-400">
      Watch videos and take quizzes to fill your wallet!
    </p>
  </div>
</div>


          {/* --- Section 1: Videos --- */}
          <div className="mb-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/50">
                <Play className="w-5 h-5 text-red-500 fill-current" />
              </div>
              <h2 className="text-2xl font-bold text-white">Watch & Learn</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VIDEOS.map((video, idx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="bg-slate-900/40 backdrop-blur-md border-slate-800 hover:border-red-500/50 transition-all duration-300 overflow-hidden group h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => handleVideoClick(video)}>
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Play className="w-6 h-6 text-white fill-white ml-1" />
                         </div>
                      </div>
                      <Badge className="absolute bottom-3 right-3 bg-black/80 text-white border-none">
                        {video.durationLabel}
                      </Badge>
                    </div>

                    <CardContent className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-lg text-white line-clamp-1 mb-2">{video.title}</h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
                        <div className="flex items-center gap-1.5 bg-yellow-500/10 px-3 py-1.5 rounded-lg border border-yellow-500/20">
                          <Coins className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-yellow-400 font-bold">+{video.reward}</span>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => handleVideoClick(video)}
                          className="bg-slate-800 hover:bg-slate-700 text-white font-bold"
                        >
                          Watch
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- Section 2: Quizzes --- */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
                <Brain className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-white">Quick Quizzes</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {QUIZZES.map((quiz, idx) => (
                 <motion.div
                   key={quiz.id}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 0.3 + (idx * 0.1) }}
                   whileHover={{ y: -5 }}
                 >
                    <Card className="bg-gradient-to-br from-slate-900 to-slate-900 border-slate-800 hover:border-blue-500/50 transition-all p-1 overflow-hidden h-full">
                       <div className="bg-slate-950/50 rounded-xl p-6 h-full flex flex-col relative overflow-hidden">
                          <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-20 blur-3xl ${quiz.color}`} />
                          
                          <div className="flex justify-between items-start mb-4 relative z-10">
                             <div className={`w-12 h-12 rounded-xl ${quiz.color} bg-opacity-20 flex items-center justify-center text-white border border-white/10`}>
                                <Trophy className="w-6 h-6" />
                             </div>
                             <Badge variant="outline" className="border-slate-700 text-slate-400">
                                {quiz.difficulty}
                             </Badge>
                          </div>

                          <h3 className="text-xl font-bold text-white mb-2 relative z-10">{quiz.title}</h3>
                          <div className="text-sm text-slate-500 mb-6">{quiz.questionsData.length} Questions</div>

                          <div className="mt-auto flex items-center justify-between relative z-10">
                             <div className="flex items-center gap-1.5">
                                <Coins className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                <span className="text-yellow-400 font-black text-lg">{quiz.reward}</span>
                             </div>
                             <Button 
                              onClick={() => handleStartQuiz(quiz)}
                              size="sm" 
                              className="rounded-full bg-white text-slate-900 hover:bg-slate-200 font-bold px-6"
                            >
                                Start <ArrowRight className="w-3 h-3 ml-2" />
                             </Button>
                          </div>
                       </div>
                    </Card>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Video Modal with Success Screen --- */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => {
        if(!open) {
           handleVideoClose();
        }
      }}>
        <DialogContent className="bg-slate-950 border-slate-800 text-white sm:max-w-4xl p-0 overflow-hidden">
          {!videoCompleted ? (
            <>
              <div className="relative aspect-video w-full bg-black">
                {selectedVideo && (
                  selectedVideo.videoUrl.includes('youtube.com/embed') ? (
                    // YouTube embed iframe
                    <iframe
                      src={selectedVideo.videoUrl}
                      title={selectedVideo.title}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    // Regular video element for non-YouTube videos
                    <video
                      src={selectedVideo.videoUrl}
                      title={selectedVideo.title}
                      className="absolute inset-0 w-full h-full"
                      controls
                      autoPlay
                      onEnded={handleVideoEnded}
                      controlsList="nodownload"
                    />
                  )
                )}
              </div>
              <div className="p-4 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">{selectedVideo?.title}</h3>
                  <Button variant="ghost" onClick={handleVideoClose} className="text-slate-400 hover:text-white">
                    Close
                  </Button>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                  <div 
                    className="bg-purple-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${watchProgress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-slate-400 mt-1 text-center">
                  {watchProgress}% watched
                </div>
              </div>
            </>
          ) : (
            <div className="p-10 text-center space-y-6 flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white mb-2">Video Completed!</h2>
                <p className="text-slate-400">You learned something new today.</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-xs">
                 <p className="text-xs text-slate-500 font-bold uppercase mb-1">REWARD</p>
                 <div className="flex items-center justify-center gap-2 text-4xl font-black text-yellow-400">
                    +{selectedVideo?.reward} <Coins className="w-8 h-8 fill-yellow-400" />
                 </div>
              </div>
              <Button 
                onClick={collectVideoReward} 
                className="w-full max-w-xs h-12 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-lg"
                disabled={videoRewardCollected[selectedVideo?.id || 0]} // Disable if reward already collected
              >
                {videoRewardCollected[selectedVideo?.id || 0] ? 'Reward Collected' : 'Collect Coins'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* --- Quiz Modal --- */}
      <Dialog open={!!activeQuiz} onOpenChange={(open) => !open && closeQuiz()}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white sm:max-w-lg p-0 overflow-hidden rounded-2xl">
          <DialogHeader className="p-6 bg-slate-800 border-b border-slate-700">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
               <Brain className="w-5 h-5 text-blue-400" />
               {activeQuiz?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="p-6">
            {!quizCompleted && activeQuiz && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400 uppercase font-bold">
                    <span>Question {currentQuestionIndex + 1} / {activeQuiz.questionsData.length}</span>
                    <span>Potential Reward: {Math.floor(currentReward)}</span>
                  </div>
                  <Progress value={((currentQuestionIndex) / activeQuiz.questionsData.length) * 100} className="h-2 bg-slate-700" />
                </div>

                <div className="py-4">
                  <h3 className="text-2xl font-bold text-center leading-snug">
                    {activeQuiz.questionsData[currentQuestionIndex].q}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3">
                   {activeQuiz.questionsData[currentQuestionIndex].options.map((option, idx) => (
                     <button
                       key={idx}
                       disabled={isLocked}
                       onClick={() => handleAnswer(idx === activeQuiz.questionsData[currentQuestionIndex].correct, idx)}
                       className={`p-4 rounded-xl border-2 transition-all text-left font-bold text-lg flex items-center gap-3 ${
                         userAnswers.length > currentQuestionIndex 
                           ? idx === activeQuiz.questionsData[currentQuestionIndex].correct
                             ? 'bg-green-500/20 border-green-500/50'
                             : idx === userAnswers[currentQuestionIndex]
                               ? 'bg-red-500/40 border-red-500/80 animate-shake'
                               : 'bg-slate-800 border-slate-700 opacity-50'
                           : 'bg-slate-800 hover:bg-purple-600/20 border-slate-700 hover:border-purple-500'
                       }`}
                     >
                       <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm">
                         {String.fromCharCode(65 + idx)}
                       </div>
                       {option}
                       {userAnswers.length > currentQuestionIndex && idx === userAnswers[currentQuestionIndex] && idx !== activeQuiz.questionsData[currentQuestionIndex].correct && (
                         <X className="w-5 h-5 text-red-500 ml-auto" />
                       )}
                       {userAnswers.length > currentQuestionIndex && idx === activeQuiz.questionsData[currentQuestionIndex].correct && (
                         <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                       )}
                     </button>
                   ))}
                </div>
              </div>
            )}

            {/* Success / Failure Screen */}
            {quizCompleted && activeQuiz && (
              <div className="text-center py-8 space-y-6">
                {correctAnswersCount > 0 ? (
                    <>
                        <div className="w-24 h-24 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center animate-pulse">
                        <Trophy className="w-12 h-12 text-yellow-400" />
                        </div>
                        <div>
                        <h2 className="text-3xl font-black text-white mb-2">Awesome Job!</h2>
                        <p className="text-slate-400">You answered {correctAnswersCount} out of {activeQuiz.questionsData.length} correctly.</p>
                        </div>
                        
                        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                        <div className="text-slate-400 text-sm font-bold uppercase mb-1">Reward Earned</div>
                        <div className="text-4xl font-black text-yellow-400 flex items-center justify-center gap-2">
                            +{Math.floor(currentReward)} <Coins className="w-8 h-8 fill-yellow-400" />
                        </div>
                        </div>

                        <Button onClick={collectQuizReward} className="w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 font-bold text-lg">
                        Collect {Math.floor(currentReward)} Coins
                        </Button>
                    </>
                ) : (
                    <>
                        <div className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-12 h-12 text-red-500" />
                        </div>
                        <div>
                        <h2 className="text-3xl font-black text-white mb-2">Oh no!</h2>
                        <p className="text-slate-400">You didn't get any answers right this time. No coins earned.</p>
                        </div>
                        
                        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                        <div className="text-slate-400 text-sm font-bold uppercase mb-1">Reward Earned</div>
                        <div className="text-4xl font-black text-slate-500 flex items-center justify-center gap-2">
                            0 <Coins className="w-8 h-8 fill-slate-600" />
                        </div>
                        </div>

                        <Button onClick={closeQuiz} className="w-full h-12 rounded-xl bg-slate-700 hover:bg-slate-600 font-bold text-lg">
                        Close
                        </Button>
                    </>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </PublicLayout>
  )
}