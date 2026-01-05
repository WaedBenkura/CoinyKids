import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function AdminLogin() {
  const navigate = useNavigate()

  const handleLogin = () => {
    toast.success("Login successful")
    navigate("/admin")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Admin Dashboard </h1>
          <p className="text-muted-foreground">Login for authorized staff</p>
        </div>
        
        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access the platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input id="email" type="email" placeholder="admin@zawya.ps" className="pl-10 text-left" />
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" className="px-0 text-xs text-muted-foreground">Forgot password?</Button>
              </div>
              <div className="relative">
                <Input id="password" type="password" className="pl-10 text-left" />
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full text-lg h-12" onClick={handleLogin}>Login</Button>
          </CardFooter>
        </Card>
        
        <div className="mt-8 text-center">
          <Button variant="link" onClick={() => navigate("/")} className="text-sm text-muted-foreground">
            Return 
          </Button>
        </div>
      </div>
    </div>
  )
}
