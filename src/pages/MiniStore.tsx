"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, ShoppingCart, Filter, Plus, Trash2, Coins, Sparkles, User, ShoppingBag } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { useGlobalCoin } from "@/contexts/GlobalCoinContext";
import { useParentalApproval } from "@/contexts/ParentalApprovalContext";
import { useDeviceSecurity } from "@/contexts/DeviceSecurityContext";
import { useUserAuth } from "@/contexts/UserAuthContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

// --- Dummy Data (Real Images) ---
const CATEGORIES = ["All", "Toys", "Clothes", "Handmade", "Art", "Books"];

const PRODUCTS = [
  {
    id: 1,
    title: "Space Explorer Lego",
    price: 150,
    creator: "Official Store",
    category: "Toys",
    image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "Hand-painted T-Shirt",
    price: 45,
    creator: "Sarah (11y)",
    category: "Clothes",
    //image: "https://images.unsplash.com/photo-1571234334344-3d0e88d4766f?w=500&auto=format&fit=crop&q=60",
    image: "https://images.unsplash.com/photo-1580853504312-082da790e82f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByaW50ZWQlMjBraWRzJTIwdHNoaXJ0fGVufDB8fDB8fHww",
  },
  {
    id: 3,
    title: "Dinosaur Plushie",
    price: 30,
    creator: "Tom (8y)",
    category: "Toys",
    image: "https://images.unsplash.com/photo-1765188987635-a867f4b6693d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fERpbm9zYXVyJTIwUGx1c2hpZXxlbnwwfHwwfHx8MA%3D%3D",
  },
    {
    id: 4,
    title: "Robot Kit",
    price: 200,
    creator: "Official Store",
    category: "Toys",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    title: "Abstract Space Art",
    price: 60,
    creator: "Leo (10y)",
    category: "Art",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    title: "Comic Book: Hero",
    price: 25,
    creator: "Mike (12y)",
    category: "Books",
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=500&auto=format&fit=crop&q=60",
  },
    {
    id: 7,
    title: "Galaxy Bracelet",
    price: 20,
    creator: "Emma (13y)",
    category: "Handmade",
    //image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&auto=format&fit=crop&q=60",
    image :"https://images.unsplash.com/photo-1766560359154-c28794703384?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8R2FsYXh5JTIwQnJhY2VsZXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 8,
    title: "Cool Cap",
    price: 35,
    creator: "Jenny (9y)",
    category: "Clothes",
    image: "https://images.unsplash.com/photo-1560774358-d727658f457c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FwfGVufDB8fDB8fHww",
  },
];

// --- Floating Background Element ---
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
);

export default function MiniStore() {
  const navigate = useNavigate();
  const location = useLocation();
  const { requestParentalApproval } = useParentalApproval();
  const { checkBehavior } = useDeviceSecurity();
  const { isAuthenticated, currentUser, updateUserCoins, addPurchasedProduct } = useUserAuth();
  const { cart, addToCart: addToCartGlobal, removeFromCart: removeFromCartGlobal, getTotalPrice, clearCart } = useCart();
  const { updateBalance } = useGlobalCoin();
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- بداية الكود الجديد ---
  // 1. تحويل منتجات المستخدم لتناسب شكل بيانات المتجر
  const userSellingItems = currentUser?.purchasedProducts
    ?.filter((p: any) => p.type === "selling" && p.status === "Approved")
    .map((p: any) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      creator: currentUser.name, // اسم الطفل كبائع
      category: p.category,
      image: p.image,
    })) || [];

    const ALL_DISPLAY_PRODUCTS = [...PRODUCTS, ...userSellingItems];

  // Filter Logic
    const filteredProducts = ALL_DISPLAY_PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart Logic - using global cart context
  const addToCart = (product: typeof PRODUCTS[0]) => {
    addToCartGlobal(product);
    
    // تصميم مخصص (Custom Toast) يظهر ككبسولة دائرية مع صورة المنتج
    toast.custom((id) => (
      <div 
        className="flex items-center gap-3 bg-slate-900/95 backdrop-blur-xl border border-purple-500/50 p-2 pr-6 rounded-full shadow-[0_0_30px_-10px_rgba(168,85,247,0.6)] animate-in slide-in-from-bottom-5 fade-in duration-300"
        onClick={() => toast.dismiss(id)}
      >
         {/* صورة المنتج دائرية */}
         <div className="relative w-12 h-12 shrink-0">
           <img 
             src={product.image} 
             alt={product.title} 
             className="w-full h-full rounded-full object-cover border-2 border-purple-500"
           />
           {/* أيقونة صح صغيرة فوق الصورة */}
           <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 text-white rounded-full p-0.5 border-2 border-slate-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
           </div>
         </div>
         
         {/* النصوص */}
         <div className="flex flex-col">
           <span className="font-bold text-white text-sm">Added to cart! 🛒</span>
           <span className="text-xs text-slate-300 truncate max-w-[140px]">{product.title}</span>
         </div>
      </div>
    ), {
      duration: 2500,
      position: 'bottom-center', // يظهر في الأسفل والمنتصف بشكل أجمل
    });
  };

  const removeFromCart = (indexToRemove: number) => {
    removeFromCartGlobal(indexToRemove);
  };

  const totalPrice = getTotalPrice();

  return (
    <PublicLayout>
      <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden pb-20">
        
        {/* --- Background effects --- */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-gradient-to-b from-purple-500/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-purple-600/20 blur-[100px]" />
        <Particles className="absolute inset-0 z-0" quantity={80} ease={80} color="#a855f7" refresh />
        
        {/* --- Floating Coins Animation --- */}
        <FloatingCoin delay={0} x="10%" y="15%" size={80} />
        <FloatingCoin delay={2} x="85%" y="40%" size={100} />

        <div className="container mx-auto px-4 relative z-10 pt-32">
          
          {/* --- Header & Cart Trigger --- */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-cyan-400 mb-2"
              >
                Mini Store
              </motion.h1>
              <p className="text-slate-400 font-medium">Spend your hard-earned coins on cool stuff!</p>
            </div>

            <div className="flex items-center gap-4">

              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button className="relative h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-none shadow-lg shadow-purple-900/20">
                    <ShoppingCart className="w-5 h-5 text-white" />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-950">
                        {cart.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-slate-950 border-l border-slate-800 text-white w-full sm:max-w-md flex flex-col">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-bold text-white flex items-center gap-2">
                      <ShoppingCart className="w-6 h-6 text-purple-500" /> My Cart
                    </SheetTitle>
                  </SheetHeader>
                  
                  <ScrollArea className="flex-1 mt-6 pr-4">
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-40 text-slate-500">
                        <ShoppingBag className="w-12 h-12 mb-2 opacity-50" />
                        <p>Your cart is empty.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item, index) => (
                          <div key={index} className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                            <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                            <div className="flex-1">
                              <h4 className="font-bold text-sm text-slate-200">{item.title}</h4>
                              <span className="text-yellow-400 text-xs font-bold flex items-center gap-1">
                                {item.price} <Coins className="w-3 h-3" />
                              </span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                              onClick={() => removeFromCart(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>

                  <SheetFooter className="mt-auto pt-6 border-t border-slate-800">
                    <div className="w-full space-y-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span className="text-slate-300">Total</span>
                        <span className="text-yellow-400 flex items-center gap-1">{totalPrice} <Coins className="w-5 h-5" /></span>
                      </div>
                      <Button 
                        onClick={() => {
                          if (!isAuthenticated) {
                            // Redirect to auth page, preserving cart state
                            navigate('/auth', { state: { from: location.pathname } });
                            return;
                          }
                          
                          if (totalPrice > (currentUser?.coins || 0)) {
                            alert('Insufficient balance!');
                            return;
                          }
                          
                          // Check device security before requesting approval
                          const isBehaviorNormal = checkBehavior(`Purchase: ${cart.length} item(s) for ${totalPrice} coins`);
                          if (!isBehaviorNormal) {
                            toast.error("Suspicious activity detected. Action denied.");
                            return;
                          }
                          
                          // Request parental approval for the purchase
                          requestParentalApproval(`Purchase: ${cart.length} item(s) for ${totalPrice} coins`, () => {
                            // Callback executed after parental approval
                            // Update balance and navigate to success page
                            if (currentUser) {
                              const newCoins = currentUser.coins - totalPrice;
                              updateUserCoins(newCoins);
                              // Also update global balance for display purposes
                              updateBalance(-totalPrice);
                              // Add purchased products to user's profile
                              cart.forEach(item => {
                                addPurchasedProduct(item);
                              });
                            }
                            clearCart(); // Clear cart after successful purchase
                            navigate('/submission-success');
                          });
                        }}
                        className="w-full h-12 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-lg shadow-lg shadow-purple-900/40"
                        disabled={cart.length === 0 || totalPrice > (currentUser?.coins || 0)}
                      >
                        Checkout Now
                      </Button>
                    </div>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* --- Controls: Search & Tabs --- */}
          <div className="mb-10 space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <Input 
                placeholder="Search for toys, clothes, art..." 
                className="w-full h-14 pl-12 bg-slate-900/60 border-slate-800 text-white placeholder:text-slate-500 rounded-2xl focus-visible:ring-purple-500/50 shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border
                    ${activeCategory === cat 
                      ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20 scale-105" 
                      : "bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* --- Product Grid --- */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-[2rem] overflow-hidden hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-300 h-full flex flex-col">
                    
                    {/* Image Area */}
                    <div className="relative aspect-square overflow-hidden bg-slate-800/50">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Badge overlay */}
                      <div className="absolute top-3 left-3">
                         <Badge className="bg-slate-950/80 backdrop-blur-md text-slate-200 border-slate-700 hover:bg-slate-900">
                           {product.category}
                         </Badge>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="mb-2">
                        <h3 className="text-lg font-bold text-white truncate mb-1">{product.title}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <User className="w-3 h-3" />
                          <span>Made by <span className="text-purple-400">{product.creator}</span></span>
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-800/50">
                        <div className="text-xl font-black text-yellow-400 flex items-center gap-1">
                           <Coins className="w-5 h-5 fill-yellow-400/20" /> {product.price}
                        </div>
                        
                        <Button 
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="rounded-xl bg-slate-800 hover:bg-purple-600 text-white font-bold transition-all duration-300 group-hover:scale-105"
                        >
                          Add <Plus className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-slate-900/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No items found</h3>
              <p className="text-slate-400">Try changing the category or search term.</p>
            </div>
          )}

        </div>
      </div>
    </PublicLayout>
  );
}