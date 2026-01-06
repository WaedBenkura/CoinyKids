import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LandingPage from "@/pages/LandingPage"
import MiniStore from "@/pages/MiniStore"
import Profile from "@/pages/Profile"
import GetCoins from "@/pages/GetCoins" // Get Coins Page
import AuthPage from "@/pages/AuthPage"
import AdminDashboard from "@/pages/AdminDashboard" // New Admin Dashboard
import { Toaster } from "@/components/ui/sonner"
import { GlobalCoinProvider } from "@/contexts/GlobalCoinContext"
import { ParentalApprovalProvider, useParentalApproval } from "@/contexts/ParentalApprovalContext";
import { DeviceSecurityProvider } from "@/contexts/DeviceSecurityContext";
import { UserAuthProvider, useUserAuth } from "@/contexts/UserAuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ParentalApprovalModal } from "@/components/ui/ParentalApprovalModal";
import { ProtectedRoute } from "@/components/RouteProtector";

function App() {
  const AppContent = () => {
    const { 
      showApprovalModal, 
      setShowApprovalModal, 
      pendingAction, 
      approveAction, 
      rejectAction 
    } = useParentalApproval();
    
    //const { currentUser } = useUserAuth();

    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/store" element={<MiniStore />} />
            <Route 
              path="/getcoins" 
              element={
                <ProtectedRoute requireAuth={false} redirectPath="/auth">
                  <GetCoins />
                </ProtectedRoute>
              } 
            /> {/* Get Coins */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute requireAuth={true} redirectPath="/auth">
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<AdminDashboard />} /> {/* Admin Dashboard Route */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
          <Toaster />
        </Router>
        {pendingAction && (
          <ParentalApprovalModal 
            open={showApprovalModal}
            onOpenChange={setShowApprovalModal}
            action={pendingAction.action}
            onApprove={approveAction}
            onCancel={rejectAction}
          />
        )}
      </>
    );
  };
  
  return (
    <UserAuthProvider>
      <GlobalCoinProvider>
        <CartProvider>
          <DeviceSecurityProvider>
            <ParentalApprovalProvider>
              <AppContent />
            </ParentalApprovalProvider>
          </DeviceSecurityProvider>
        </CartProvider>
      </GlobalCoinProvider>
    </UserAuthProvider>
  )
}

export default App