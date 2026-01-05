import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { LayoutDashboard, MessageSquare, Users, Settings, LogOut, ChevronRight, Menu } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="flex h-screen overflow-hidden bg-muted/20">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? "w-64" : "w-0"} transition-all duration-300 ease-in-out border-r bg-background overflow-hidden flex flex-col`}>
        <div className="h-16 flex items-center px-6 border-b">
          <span className="text-xl font-bold">CoinyKids Admin</span>
        </div>
        <ScrollArea className="flex-1 px-4 py-4">
          <nav className="space-y-2">
            <Button 
              variant={location.pathname === "/admin" ? "secondary" : "ghost"} 
              className="w-full justify-start gap-2 text-left"
              onClick={() => navigate("/admin")}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Collapsible defaultOpen={location.pathname.startsWith("/admin/transactions")}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2 text-left">
                  <MessageSquare className="h-4 w-4" />
                  Transactions
                  <ChevronRight className={`h-4 w-4 ml-auto transition-transform duration-200 ${location.pathname.startsWith("/admin/transactions") ? "-rotate-90" : ""}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pr-6 space-y-1">
                <Button 
                  variant={location.pathname === "/admin/transactions" ? "secondary" : "ghost"} 
                  size="sm" 
                  className="w-full justify-start text-left"
                  onClick={() => navigate("/admin/transactions")}
                >
                  All Transactions
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-left">Pending</Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-left">Completed</Button>
              </CollapsibleContent>
            </Collapsible>
            <Button variant="ghost" className="w-full justify-start gap-2 text-left">
              <Users className="h-4 w-4" />
              Kids
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 text-left">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </nav>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:text-destructive text-left" onClick={() => navigate("/")}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b bg-background flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/admin">CoinyKids Admin</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">System Admin</p>
                  <p className="text-xs leading-none text-muted-foreground">admin@coinykids.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Account</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
