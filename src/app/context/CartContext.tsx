'use client';
import React, { createContext, useContext, useState } from 'react';

type CartItem = {
  name: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  addToCart: (name: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);

  const addToCart = (product: string) => {
    const existing = items.find(item => item.name === product);
    if (existing) {
      const updated = items.map(item =>
        item.name === product ? { ...item, quantity: item.quantity + 1 } : item
      );
      setItems(updated);
    } else {
      setItems([...items, { name: product, quantity: 1 }]);
    }
    setItemCount(prev => prev + 1);
  };

  return (
    <CartContext.Provider value={{ items, itemCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
};
