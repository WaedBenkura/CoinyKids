import { Navigate, useLocation } from "react-router-dom";
import { useUserAuth } from "@/contexts/UserAuthContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectPath?: string;
}

export function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  redirectPath = "/auth" 
}: ProtectedRouteProps) {
  const { isAuthenticated } = useUserAuth();
  const location = useLocation();

  if (requireAuth && !isAuthenticated) {
    // Save the location they were trying to access
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If they're authenticated and trying to access auth page, redirect to home
  if (!requireAuth && isAuthenticated && location.pathname === "/auth") {
    return <Navigate to="/home" replace />;
  }

  return children;
}