import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: 'boy' | 'girl';
  coins: number;
  parentPin: string;
  purchasedProducts: any[];
}

interface UserAuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, age: number, gender: 'boy' | 'girl', parentPin: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserCoins: (newCoins: number) => void;
  addPurchasedProduct: (product: any) => void;
    addSellingProduct: (product: any) => void;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export const UserAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. الإصلاح الجذري: قراءة LocalStorage مباشرة عند تهيئة الحالة (Lazy Init)
  // هذا يمنع حذف البيانات عند عمل Refresh
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem('coinykids_user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to load user from storage", error);
      return null;
    }
  });

  // 2. تحديث LocalStorage (الجلسة الحالية + قاعدة البيانات) عند تغير المستخدم
  useEffect(() => {
    if (currentUser) {
      // حفظ الجلسة الحالية
      localStorage.setItem('coinykids_user', JSON.stringify(currentUser));
      // حفظ الرصيد العام
      localStorage.setItem('userBalance', currentUser.coins.toString());

      // --- أهم خطوة: تحديث بيانات المستخدم في "قاعدة البيانات" (coinykids_users) ---
      // لكي تظهر التحديثات في Admin Dashboard وعند تسجيل الدخول مرة أخرى
      try {
        const usersData = JSON.parse(localStorage.getItem('coinykids_users') || '{}');
        usersData[currentUser.email] = currentUser; // تحديث سجل هذا المستخدم
        localStorage.setItem('coinykids_users', JSON.stringify(usersData));
      } catch (e) {
        console.error("Error syncing with user database", e);
      }

    } else {
      // فقط إذا تم تسجيل الخروج صراحة
      localStorage.removeItem('coinykids_user');
    }
  }, [currentUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const usersData = JSON.parse(localStorage.getItem('coinykids_users') || '{}');
      const user = usersData[email];
      
      // ملاحظة: في التطبيق الحقيقي يجب عدم تخزين كلمة المرور كنص واضح
      if (user && user.password === password) {
        const userData: User = {
          id: user.id,
          email: user.email,
          name: user.name,
          age: user.age,
          gender: user.gender,
          coins: user.coins || 0,
          parentPin: user.parentPin,
          purchasedProducts: user.purchasedProducts || [],
        };
        
        setCurrentUser(userData);
        return true;
      }
    } catch (e) {
      console.error("Login error", e);
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string, age: number, gender: 'boy' | 'girl', parentPin: string): Promise<boolean> => {
    try {
      const usersData = JSON.parse(localStorage.getItem('coinykids_users') || '{}');
      
      if (usersData[email]) {
        return false; // المستخدم موجود بالفعل
      }
      
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        name,
        age,
        gender,
        password, 
        coins: 50, // بونص التسجيل
        parentPin,
        purchasedProducts: [],
      };
      
      // حفظ في قاعدة البيانات العامة
      usersData[email] = newUser;
      localStorage.setItem('coinykids_users', JSON.stringify(usersData));
      
      // تسجيل الدخول مباشرة
      setCurrentUser(newUser);
      
      return true;
    } catch (e) {
      console.error("Signup error", e);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    // عند الخروج، نحذف الجلسة الحالية فقط، ولا نحذف قاعدة البيانات
    localStorage.removeItem('coinykids_user');
    window.location.href = '/home'; // إعادة توجيه كاملة لضمان تنظيف الحالة
  };

  const updateUserCoins = (newCoins: number) => {
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, coins: newCoins } : null);
    }
  };

  const addPurchasedProduct = (product: any) => {
    if (currentUser) {
      setCurrentUser(prev => {
        if (!prev) return null;
        // Add the type field to identify this as a purchased product
        const purchasedProduct = {
          ...product,
          type: "purchased"
        };
        return {
          ...prev,
          purchasedProducts: [...prev.purchasedProducts, purchasedProduct]
        };
      });
    }
  };

  const addSellingProduct = (product: any) => {
    if (currentUser) {
      setCurrentUser(prev => {
        if (!prev) return null;
        // Add the type field to identify this as a selling product
        const sellingProduct = {
          ...product,
          type: "selling"
        };
        return {
          ...prev,
          purchasedProducts: [...prev.purchasedProducts, sellingProduct]
        };
      });
    }
  };

  const isAuthenticated = !!currentUser;

  return (
    <UserAuthContext.Provider
      value={{
        currentUser,
        login,
        signup,
        logout,
        isAuthenticated,
        updateUserCoins,
        addPurchasedProduct,
        addSellingProduct,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};