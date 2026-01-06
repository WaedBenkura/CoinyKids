"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Added missing Tabs import
import { Particles } from "@/components/ui/particles";
import { useParentalApproval } from "@/contexts/ParentalApprovalContext";
import { useDeviceSecurity } from "@/contexts/DeviceSecurityContext";
import { useUserAuth } from "@/contexts/UserAuthContext";
import { toast } from "sonner";
import { 
  User, 
  Coins, 
  Plus, 
  Package, 
  Upload,
  Wallet,
  ImageIcon,
  LogIn
} from "lucide-react";

// --- Floating Coin Component ---
const FloatingCoin = ({ delay, x, y, size = 60 }: { delay: number, x: string, y: string, size?: number }) => (
  <motion.div
    className="absolute z-0 pointer-events-none opacity-20 blur-[1px]"
    style={{ left: x, top: y }}
    animate={{ y: [-20, 20, -20], rotate: [-10, 10, -10] }}
    transition={{ duration: 6, repeat: Infinity, delay: delay, ease: "easeInOut" }}
  >
    <img 
      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png" 
      alt="Coin"
      style={{ width: size, height: size }}
    />
  </motion.div>
);

// --- Types ---
//type ProductStatus = "Approved" | "Pending";
type Category = "Toys" | "Handmade" | "Art" | "Game";

/*interface Product {
  id: number;
  title: string;
  price: number;
  category: Category;
  status: ProductStatus;
  image: string;
  type: "selling" | "purchased";
}*/

export default function Profile() {
  const navigate = useNavigate();
  const { requestParentalApproval } = useParentalApproval();
  const { checkBehavior } = useDeviceSecurity();
  const { currentUser, isAuthenticated, logout, addSellingProduct } = useUserAuth();
  
  // If not authenticated, show login prompt
  if (!isAuthenticated || !currentUser) {
    return (
      <PublicLayout>
        <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden pb-40">
          
          {/* --- Background --- */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-gradient-to-b from-purple-500/10 via-transparent to-transparent blur-3xl" />
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-purple-600/20 blur-[100px]" />
          <Particles className="absolute inset-0 z-0" quantity={80} ease={80} color="#a855f7" refresh />
          
          <FloatingCoin delay={0} x="5%" y="20%" size={90} />
          <FloatingCoin delay={2} x="85%" y="15%" size={110} />

          <div className="container mx-auto px-8 relative z-10 pt-40 flex flex-col items-center justify-center min-h-[70vh]">
            <div className="text-center max-w-lg">
              <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-12 h-12 text-slate-500" />
              </div>
              <h1 className="text-3xl font-black text-white mb-4">No account found</h1>
              <p className="text-slate-400 mb-8">Please log in or create an account to access your profile</p>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold h-12 px-8 rounded-xl"
              >
                <LogIn className="w-5 h-5 mr-2" /> Log In or Sign Up
              </Button>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }
  
  // --- Determine avatar image based on gender ---
  const avatarImage = currentUser?.gender === 'girl' 
    ? "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Girl.png"
    : "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Boy.png";

  const displayName = currentUser?.name || "Young Saver";
  
  // State for Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  
  // State for Form
  const [newItem, setNewItem] = useState({ title: "", price: "", category: "" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use user's selling products and purchased products from context
  // Filter products based on type
  const sellingProducts = currentUser?.purchasedProducts?.filter((product: any) => product.type === "selling") || [];
  const purchasedProducts = currentUser?.purchasedProducts?.filter((product: any) => product.type === "purchased") || [];

  // --- Handlers ---
  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };

  const handlePreSubmit = () => {
    if (!newItem.title || !newItem.price || !newItem.category || !selectedImage) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }
    
    // Check device security before requesting approval
    const isBehaviorNormal = checkBehavior(`Sell item: ${newItem.title}`);
    if (!isBehaviorNormal) {
      toast.error("Suspicious activity detected. Action denied.");
      return;
    }
    
    // Request parental approval for selling the item
    // Request parental approval for selling the item
    requestParentalApproval(`Sell item: ${newItem.title}`, () => {
      // Callback executed after parental approval
      const newProduct = {
        id: Date.now(),
        title: newItem.title,
        price: parseInt(newItem.price),
        category: newItem.category as Category,
        // -------------------------------------------------------
        // -------------------------------------------------------
        status: "Approved",
        image: selectedImage || "",
        type: "selling" as const 
      };
      
      // Add the new product to the user's selling items using the context function
      addSellingProduct(newProduct);
      toast.success("Item listed in Mini Store successfully!");
    });
    
    setIsUploadOpen(false);
  };

  return (
    <PublicLayout>
      <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden pb-40"> {/* زيادة المسافة السفلية هنا */}

        {/* --- Background --- */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-gradient-to-b from-purple-500/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-purple-600/20 blur-[100px]" />
        <Particles className="absolute inset-0 z-0" quantity={80} ease={80} color="#a855f7" refresh />
        
        <FloatingCoin delay={0} x="5%" y="20%" size={90} />
        <FloatingCoin delay={2} x="85%" y="15%" size={110} />

        <div className="container mx-auto px-4 relative z-10 pt-60">
          
          {/* 1. Profile Header & Wallet */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-40">
            
            {/* User Info with Dynamic 3D Avatar */}
            <div className="lg:col-span-2 flex flex-col md:flex-row items-center gap-8 bg-slate-900/50 backdrop-blur-md p-8 rounded-[3rem] border border-slate-800 shadow-xl">
              
              <div className="relative group">
                  {/* Glowing background */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                  
                  {/* Avatar Container */}
                  <div className="relative w-40 h-40">
                    <div className="w-full h-full rounded-full bg-slate-800 border-4 border-slate-700 overflow-hidden shadow-2xl relative z-10 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
                        {/* Dynamic Avatar Image */}
                        <img 
                          src={avatarImage} 
                          alt="3D Avatar" 
                          className="w-32 h-32 object-contain drop-shadow-lg transform hover:scale-110 transition-transform duration-300" 
                        />
                    </div>
                    {/* Level Badge */}
                    <div className="absolute bottom-1 right-1 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-black px-3 py-1 rounded-full shadow-lg border-2 border-slate-900 rotate-[-5deg]">
                        Lv. 5
                    </div>
                  </div>
              </div>

              <div className="text-center md:text-left flex-1">
                  {/* Dynamic Name */}
                  <h1 className="text-4xl font-black text-white mb-2 tracking-tight">{displayName}</h1>
                  <p className="text-slate-400 font-medium mb-5 flex items-center justify-center md:justify-start gap-2 text-lg">
                    <User className="w-5 h-5 text-purple-400" /> Space Explorer • Age {currentUser?.age || "8"}
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-1.5 text-sm">🚀 Astronaut Rank</Badge>
                      <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-1.5 text-sm">🌟 Super Saver</Badge>
                  </div>
              </div>
              
{/* Logout Button */}
<div className="flex justify-end">
  <Button 
    onClick={logout}
    variant="destructive"
    className="bg-red-400 hover:bg-red-700 text-white font-bold rounded-xl h-12 px-6 shadow-lg shadow-red-900/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
  >
    <User className="w-5 h-5" />
    Logout
  </Button>
</div>

            </div>

            {/* Wallet Card (With Dynamic Name) */}
            <div className="relative group perspective-1000 cursor-pointer">
               <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500" />
               
               <motion.div 
                 whileHover={{ rotateY: 5, rotateX: 5, scale: 1.02 }}
                 className="relative h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-yellow-500/30 p-6 rounded-[2rem] flex flex-col justify-between overflow-hidden shadow-2xl"
               >
                  {/* The Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none z-20" />
                  
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10" />
                  
                  <div className="flex justify-between items-start z-10">
                     <div className="flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-yellow-500" />
                        <span className="text-xs font-bold text-yellow-500 tracking-widest uppercase">Coiny Wallet</span>
                     </div>
                     <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png" className="w-10 h-10 drop-shadow-lg" alt="Coin" />
                  </div>

                  <div className="my-4 z-10">
                     <span className="text-slate-400 text-xs font-bold uppercase block mb-1">Current Balance</span>
                     <div className="text-4xl font-black text-white tracking-tight flex items-center gap-2">
                        {currentUser?.coins || 0} <span className="text-lg text-yellow-500">CNY</span>
                     </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 z-10">
                     <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Card Holder</span>
                        {/* Dynamic Name in Card */}
                        <span className="text-sm font-bold text-slate-300 truncate max-w-[120px]">{displayName}</span>
                     </div>
                     <div className="text-right">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Exp</span>
                        <span className="text-sm font-bold text-slate-300">12/28</span>
                     </div>
                  </div>
               </motion.div>
            </div>
          </div>



          {/* Tabs for "Items I'm Selling" and "Items I Purchased" */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      <Package className="w-6 h-6 text-purple-500" /> My Collections
                  </h2>
                  <p className="text-slate-400 text-sm">Manage your items and shop.</p>
              </div>
              <Button 
                onClick={() => setIsUploadOpen(true)}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold h-12 px-6 rounded-xl flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add New Item
              </Button>
            </div>

            <Tabs defaultValue="selling" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-900/50 border border-slate-800 rounded-xl mb-8">
                <TabsTrigger value="selling" className="rounded-xl font-bold data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-400 transition-all">
                  Items I'm Selling
                </TabsTrigger>
                <TabsTrigger value="purchased" className="rounded-xl font-bold data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-400 transition-all">
                  Items I Purchased
                </TabsTrigger>
              </TabsList>

              <TabsContent value="selling">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence>
                    {sellingProducts.map((product: any) => (
                      <motion.div
                          key={product.id}
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          whileHover={{ y: -10, scale: 1.02 }} // Animation: Lift up and scale
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          layout
                      >
                          <Card className="relative bg-slate-900/40 backdrop-blur-md border border-slate-800 overflow-hidden group transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/20">
                              {/* Card Shine Effect on Hover */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10" />

                              <div className="p-5 flex gap-5 items-center">
                                  {/* Real Image with Border */}
                                  <div className="w-24 h-24 rounded-2xl bg-slate-800 overflow-hidden border-2 border-slate-700 shrink-0 group-hover:border-purple-500/30 transition-colors">
                                      <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                  </div>

                                  <div className="flex-1 flex flex-col justify-between h-24 py-1">
                                      <div>
                                          <h3 className="font-bold text-lg text-white line-clamp-1 group-hover:text-purple-400 transition-colors">{product.title}</h3>
                                          <p className="text-slate-500 text-xs font-bold uppercase mt-1">{product.category}</p>
                                      </div>

                                      <div className="flex items-center justify-between mt-auto">
                                          <div className="flex items-center gap-1.5 font-black text-yellow-400 text-xl bg-yellow-400/10 px-2 py-0.5 rounded-lg border border-yellow-400/20">
                                              {product.price} <Coins className="w-4 h-4 fill-current" />
                                          </div>
                                          {product.status === "Approved" ? (
                                              <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-[10px] px-2">
                                                  Active
                                              </Badge>
                                          ) : (
                                              <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-[10px] px-2">
                                                  Pending Approval
                                              </Badge>
                                          )}
                                      </div>
                                  </div>
                              </div>
                          </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Empty State */}
                  {sellingProducts.length === 0 && (
                      <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-800 rounded-[2rem] bg-slate-900/20">
                          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                              <Package className="w-10 h-10 text-slate-500" />
                          </div>
                          <p className="text-slate-300 font-bold text-lg">You are not selling any items yet.</p>
                          <p className="text-slate-500 text-sm">Start selling your old toys or artwork!</p>
                      </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="purchased">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence>
                    {purchasedProducts.map((product: any) => (
                      <motion.div
                          key={product.id}
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          whileHover={{ y: -10, scale: 1.02 }} // Animation: Lift up and scale
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          layout
                      >
                          <Card className="relative bg-slate-900/40 backdrop-blur-md border border-slate-800 overflow-hidden group transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/20">
                              {/* Card Shine Effect on Hover */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10" />

                              <div className="p-5 flex gap-5 items-center">
                                  {/* Real Image with Border */}
                                  <div className="w-24 h-24 rounded-2xl bg-slate-800 overflow-hidden border-2 border-slate-700 shrink-0 group-hover:border-purple-500/30 transition-colors">
                                      <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                  </div>

                                  <div className="flex-1 flex flex-col justify-between h-24 py-1">
                                      <div>
                                          <h3 className="font-bold text-lg text-white line-clamp-1 group-hover:text-purple-400 transition-colors">{product.title}</h3>
                                          <p className="text-slate-500 text-xs font-bold uppercase mt-1">{product.category}</p>
                                      </div>

                                      <div className="flex items-center justify-between mt-auto">
                                          <div className="flex items-center gap-1.5 font-black text-yellow-400 text-xl bg-yellow-400/10 px-2 py-0.5 rounded-lg border border-yellow-400/20">
                                              {product.price} <Coins className="w-4 h-4 fill-current" />
                                          </div>
                                          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px] px-2">
                                              Purchased
                                          </Badge>
                                      </div>
                                  </div>
                              </div>
                          </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Empty State */}
                  {purchasedProducts.length === 0 && (
                      <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-800 rounded-[2rem] bg-slate-900/20">
                          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                              <Package className="w-10 h-10 text-slate-500" />
                          </div>
                          <p className="text-slate-300 font-bold text-lg">You haven't bought any items yet.</p>
                          <p className="text-slate-500 text-sm">Start shopping to see your purchases here!</p>
                      </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* --- Upload Modal --- */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="bg-slate-950 border-slate-800 text-white sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                    <Upload className="w-6 h-6 text-purple-500" /> List Your Item
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                    Upload details. Parents must approve before listing.
                </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
                {/* Image Uploader */}
                <div 
                    onClick={handleImageClick}
                    className="border-2 border-dashed border-slate-700 rounded-2xl h-44 flex flex-col items-center justify-center bg-slate-900/50 hover:bg-slate-900 hover:border-purple-500 transition-all cursor-pointer overflow-hidden relative group"
                >
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    {selectedImage ? (
                        <>
                            <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                <span className="text-white font-bold text-sm bg-purple-600 px-4 py-2 rounded-full">Change Image</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform group-hover:bg-purple-500/20">
                                <ImageIcon className="w-7 h-7 text-slate-400 group-hover:text-purple-400" />
                            </div>
                            <p className="text-sm text-slate-300 font-bold">Click to upload photo</p>
                            <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG</p>
                        </>
                    )}
                </div>

                <div className="space-y-2">
                    <Label className="text-slate-300">Item Name</Label>
                    <Input 
                        placeholder="e.g., My Old Bicycle" 
                        className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-600 focus-visible:ring-purple-500"
                        value={newItem.title}
                        onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-slate-300">Category</Label>
                        <Select onValueChange={(val) => setNewItem({...newItem, category: val})}>
                            <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                <SelectItem value="Toys">🧸 Toys</SelectItem>
                                <SelectItem value="Game">🎮 Games</SelectItem>
                                <SelectItem value="Art">🎨 Art</SelectItem>
                                <SelectItem value="Handmade">🧶 Handmade</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-slate-300">Price (Coins)</Label>
                        <div className="relative">
                            <Input 
                                type="number" 
                                placeholder="0" 
                                className="bg-slate-900 border-slate-700 text-white pl-8 focus-visible:ring-purple-500"
                                value={newItem.price}
                                onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                            />
                            <Coins className="w-4 h-4 text-yellow-500 absolute left-2.5 top-2.5" />
                        </div>
                    </div>
                </div>
            </div>

            <DialogFooter>
                <Button variant="ghost" onClick={() => setIsUploadOpen(false)} className="text-slate-400 hover:text-white hover:bg-slate-900">Cancel</Button>
                <Button onClick={handlePreSubmit} className="bg-purple-600 hover:bg-purple-500 text-white font-bold">
                    Submit for Listing
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </PublicLayout>
  )
}