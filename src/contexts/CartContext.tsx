import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useUserAuth } from './UserAuthContext'; // Import UserAuthContext to get current user

interface CartItem {
  id: number;
  title: string;
  price: number;
  creator: string;
  category: string;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser } = useUserAuth(); // Get current user to create user-specific cart storage
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial load
  useEffect(() => {
    // Use user-specific key if user is logged in, otherwise use generic key for guest cart
    const cartKey = currentUser ? `coinykids_cart_${currentUser.id}` : 'coinykids_cart_guest';
    const savedCart = localStorage.getItem(cartKey);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        setCart([]);
      }
    }
  }, [currentUser]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    // Use user-specific key if user is logged in, otherwise use generic key for guest cart
    const cartKey = currentUser ? `coinykids_cart_${currentUser.id}` : 'coinykids_cart_guest';
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, currentUser]);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (indexToRemove: number) => {
    const newCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const cartCount = cart.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};