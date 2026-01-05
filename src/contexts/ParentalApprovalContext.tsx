import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { useDeviceSecurity } from '@/contexts/DeviceSecurityContext';

interface ParentalApprovalContextType {
  isParentVerified: boolean;
  setIsParentVerified: (verified: boolean) => void;
  requestParentalApproval: (action: string, callback: () => void) => void;
  approveAction: (pin?: string) => void;
  rejectAction: () => void;
  showApprovalModal: boolean;
  setShowApprovalModal: (show: boolean) => void;
  pendingAction: { action: string; callback: () => void } | null;
}

const ParentalApprovalContext = createContext<ParentalApprovalContextType | undefined>(undefined);

export const ParentalApprovalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isParentVerified, setIsParentVerified] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ action: string; callback: () => void } | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  
  const { checkBehavior } = useDeviceSecurity();

  const requestParentalApproval = (action: string, callback: () => void) => {
    // Check behavior patterns to detect suspicious activity
    const isBehaviorNormal = checkBehavior(action);
    
    if (!isBehaviorNormal) {
      toast.error("Suspicious activity detected. Action denied.");
      return;
    }
    
    setPendingAction({ action, callback });
    setShowApprovalModal(true);
    // In a real app, this would send a notification to the parent
    toast(`Parental approval requested for: ${action}`);
  };

  const approveAction = (pin?: string) => {
    // In a real app, you would validate the PIN against a stored value
    // For now, we'll just check if a PIN is provided (in a real app, validate against stored PIN)
    if (pendingAction) {
      if (pin && pin.length === 4) { // Basic validation for demo
        // Log the approval for legal compliance
        logParentalApproval(pendingAction.action);
        
        pendingAction.callback();
        setPendingAction(null);
        setShowApprovalModal(false);
        toast.success("Action approved!");
      } else {
        toast.error("Please enter a valid 4-digit PIN");
      }
    }
  };
  
  const logParentalApproval = (action: string) => {
    // Store parent approval records: IP, device, timestamp for each action
    const approvalRecord = {
      action,
      timestamp: new Date().toISOString(),
      ip: "", // In a real app, this would be retrieved from the server
      deviceInfo: navigator.userAgent,
      deviceId: "", // Would be retrieved from device security context
    };
    
    // Store in localStorage for demo purposes (in a real app, send to server)
    const logs = JSON.parse(localStorage.getItem('parental_approval_logs') || '[]');
    logs.push(approvalRecord);
    localStorage.setItem('parental_approval_logs', JSON.stringify(logs));
    
    console.log('Parental approval logged:', approvalRecord);
  };

  const rejectAction = () => {
    setPendingAction(null);
  };

  return (
    <ParentalApprovalContext.Provider
      value={{
        isParentVerified,
        setIsParentVerified,
        requestParentalApproval,
        approveAction,
        rejectAction,
        showApprovalModal,
        setShowApprovalModal,
        pendingAction,
      }}
    >
      {children}
    </ParentalApprovalContext.Provider>
  );
};

export const useParentalApproval = () => {
  const context = useContext(ParentalApprovalContext);
  if (!context) {
    throw new Error('useParentalApproval must be used within a ParentalApprovalProvider');
  }
  return context;
};