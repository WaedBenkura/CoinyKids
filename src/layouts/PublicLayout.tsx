import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Menu, ArrowRight, Coins, User } from "lucide-react"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Footer } from "@/layouts/Footer"
import { useUserAuth } from "@/contexts/UserAuthContext"
import { useGlobalCoin } from "@/contexts/GlobalCoinContext"

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const { currentUser, isAuthenticated, logout } = useUserAuth()
  const { balance } = useGlobalCoin()
  
  const path = location.pathname.replace(/\/+$/, "");
  
  const isDarkPage = path === "/home" || path === "" || path === "/store" || path === "/getcoins" || path === "/profile";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Home", path: "/home" },
    { label: "Mini Store", path: "/store" },
    { label: "Profile", path: "/profile" },
    { label: "Get Coins", path: "/getcoins" },
    { label: "About", path: "/home#about" },
  ]

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/home');
    setTimeout(() => {
      const aboutElement = document.getElementById('about');
      if (aboutElement) {
        aboutElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="flex min-h-screen flex-col w-full bg-transparent">

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-slate-950/80 backdrop-blur-md shadow-lg shadow-purple-900/5 border-b border-slate-800 py-3"
            : "bg-transparent py-6"
        )}
      >
        {/* 1. أضفنا relative هنا لكي يتم التموضع بالنسبة لهذا الحاوي */}
        <div className="container mx-auto px-6 flex items-center justify-between relative">

          {/* --- Logo Section --- */}
          <Link to="/home" className="flex items-center gap-2 group">
            {/* 3D Coin Image */}
            <div className="relative w-12 h-12 flex items-center justify-center">
                <img
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png"
                    alt="CoinyKids Logo"
                    className="w-full h-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                />
            </div>

            {/* Text (Unchanged) */}
            <div className="flex flex-col justify-center -space-y-1">
              <span className={cn(
                "font-black text-xl tracking-tight transition-colors duration-300 leading-none",
                isDarkPage || isScrolled ? "text-white" : "text-slate-900"
              )}>
                Coiny<span className="text-yellow-400">Kids</span>
              </span>
            </div>
          </Link>
          {/* ----------------------- */}

          {/* 
             2. التعديل الرئيسي هنا:
             تمت إضافة absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
             وهذا يجبر القائمة أن تكون في منتصف الشاشة تماماً.
          */}
          <NavigationMenu className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <NavigationMenuList className="gap-8">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  {item.label === 'About' ? (
                    <button
                      onClick={handleAboutClick}
                      className={cn(
                        "text-sm font-bold transition-colors duration-200",
                        isDarkPage || isScrolled
                          ? "text-slate-300 hover:text-white"
                          : "text-slate-600 hover:text-purple-600"
                      )}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={cn(
                        "text-sm font-bold transition-colors duration-200",
                        isDarkPage || isScrolled
                          ? "text-slate-300 hover:text-white"
                          : "text-slate-600 hover:text-purple-600"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-full backdrop-blur-md">
                <User className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 text-sm font-bold uppercase">{currentUser?.name || 'User'}</span>
                <div className="h-6 w-px bg-slate-700 mx-2"></div>
                <span className="text-slate-400 text-sm font-bold uppercase">Balance:</span>
                <span className="text-yellow-400 font-bold flex items-center gap-1">
                  <Coins className="w-4 h-4" /> {currentUser?.coins || 0}
                </span>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/auth")}
                  className={cn(
                    "hidden md:flex font-bold hover:bg-white/10",
                    isDarkPage || isScrolled ? "text-slate-300 hover:text-white" : "text-slate-600"
                  )}
                >
                  Log in
                </Button>
              </>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn("md:hidden", isDarkPage || isScrolled ? "text-white" : "text-slate-900")}>
                  <Menu className="h-7 w-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] border-l border-slate-800 bg-slate-950 p-6 text-white">
                 <div className="flex flex-col gap-2 mt-8">
                  {navItems.map((item) => (
                    item.label === 'About' ? (
                      <button
                        key={item.path}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('/home');
                          setTimeout(() => {
                            const aboutElement = document.getElementById('about');
                            if (aboutElement) {
                              aboutElement.scrollIntoView({ behavior: 'smooth' });
                            }
                          }, 100);
                          const sheetCloseButton = document.querySelector('[data-radix-popper-content-wrapper] button');
                          if (sheetCloseButton) {
                            (sheetCloseButton as HTMLElement).click();
                          }
                        }}
                        className="text-lg font-bold text-slate-300 py-3 hover:text-white border-b border-slate-800 last:border-0 text-left"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link key={item.path} to={item.path} className="text-lg font-bold text-slate-300 py-3 hover:text-white border-b border-slate-800 last:border-0">
                        {item.label}
                      </Link>
                    )
                  ))}
                 </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className={cn("flex-1 w-full", isDarkPage ? "pt-0" : "pt-24")}>
        {children}
      </main>

      <Footer />
    </div>
  )
}