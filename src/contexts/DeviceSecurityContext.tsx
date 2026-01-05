import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface DeviceSecurityContextType {
  isDeviceVerified: boolean;
  verifyDevice: (deviceId: string) => boolean;
  getDeviceId: () => string;
  checkBehavior: (action: string) => boolean;
}

const DeviceSecurityContext = createContext<DeviceSecurityContextType | undefined>(undefined);

export const DeviceSecurityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDeviceVerified, setIsDeviceVerified] = useState(false);

  // Generate a unique device ID (in a real app, this would be more sophisticated)
  const generateDeviceId = (): string => {
    // In a real app, you might use a combination of browser fingerprinting techniques
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const hardwareConcurrency = navigator.hardwareConcurrency || 'unknown';
    const screenInfo = `${screen.width}x${screen.height}`;
    
    // Create a simple hash (not cryptographically secure, just for demo)
    const combined = `${userAgent}-${platform}-${hardwareConcurrency}-${screenInfo}`;
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    return `device_${Math.abs(hash).toString(36)}`;
  };

  const getDeviceId = (): string => {
    let deviceId = localStorage.getItem('coinykids_device_id');
    if (!deviceId) {
      deviceId = generateDeviceId();
      localStorage.setItem('coinykids_device_id', deviceId);
    }
    return deviceId;
  };

  const verifyDevice = (providedDeviceId: string): boolean => {
    const storedDeviceId = getDeviceId();
    const isValid = storedDeviceId === providedDeviceId;
    setIsDeviceVerified(isValid);
    return isValid;
  };

  const checkBehavior = (action: string): boolean => {
    // In a real app, this would implement behavioral analysis
    // For now, we'll just return true for demo purposes
    console.log(`Behavior check for action: ${action}`);
    return true;
  };

  // On mount, check if the current device is verified
  useEffect(() => {
    const storedDeviceId = localStorage.getItem('coinykids_device_id');
    if (storedDeviceId) {
      setIsDeviceVerified(true);
    }
  }, []);

  return (
    <DeviceSecurityContext.Provider
      value={{
        isDeviceVerified,
        verifyDevice,
        getDeviceId,
        checkBehavior,
      }}
    >
      {children}
    </DeviceSecurityContext.Provider>
  );
};

export const useDeviceSecurity = () => {
  const context = useContext(DeviceSecurityContext);
  if (!context) {
    throw new Error('useDeviceSecurity must be used within a DeviceSecurityProvider');
  }
  return context;
};