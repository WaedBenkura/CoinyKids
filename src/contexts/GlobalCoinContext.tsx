import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';

interface GlobalCoinState {
  balance: number;
}

interface GlobalCoinAction {
  type: 'UPDATE_BALANCE' | 'LOAD_BALANCE';
  payload: number;
}

interface GlobalCoinContextType {
  balance: number;
  updateBalance: (amount: number) => void;
}

const initialState: GlobalCoinState = {
  balance: 0 // سيتم تحديثه من localStorage
};

const GlobalCoinContext = createContext<GlobalCoinContextType | undefined>(undefined);

const coinReducer = (state: GlobalCoinState, action: GlobalCoinAction): GlobalCoinState => {
  switch (action.type) {
    case 'UPDATE_BALANCE':
      // eslint-disable-next-line no-case-declarations
      const newBalance = Math.max(0, state.balance + action.payload);
      localStorage.setItem('userBalance', newBalance.toString());
      return { ...state, balance: newBalance };
    case 'LOAD_BALANCE':
      return { ...state, balance: action.payload };
    default:
      return state;
  }
};

export const GlobalCoinProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(coinReducer, initialState);

  useEffect(() => {
    // Load balance from localStorage on initial load
    const saved = localStorage.getItem('userBalance');
    if (saved) {
      dispatch({ type: 'LOAD_BALANCE', payload: parseInt(saved, 10) });
    } else {
      // رصيد مبدئي للتجربة
      dispatch({ type: 'LOAD_BALANCE', payload: 150 });
    }
  }, []);

  const updateBalance = (amount: number) => {
    dispatch({ type: 'UPDATE_BALANCE', payload: amount });
  };

  return (
    <GlobalCoinContext.Provider value={{ balance: state.balance, updateBalance }}>
      {children}
    </GlobalCoinContext.Provider>
  );
};

export const useGlobalCoin = () => {
  const context = useContext(GlobalCoinContext);
  if (!context) {
    throw new Error('useGlobalCoin must be used within a GlobalCoinProvider');
  }
  return context;
};