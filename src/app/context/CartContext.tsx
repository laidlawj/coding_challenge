'use client';
import React, { createContext, useContext, useState } from 'react';
import { Product } from '../components/ProductList';

// CartItemsMap: Key is productId (number), Value is quantity (number)
export interface ProductInfo extends Product {
  quantity: number;
}

export type CartItemsMap = Map<number, ProductInfo>

type CartContextType = {
  items: CartItemsMap;
  itemCount: number;
  addToCart: (product: Product) => void;
};


const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItemsMap>(new Map());
  const [itemCount, setItemCount] = useState<number>(0);

  const addToCart = (product: Product) => {
    console.log("got here at least")
    const updatedItems = new Map(items);
    const productId = product.id
    const currentQuantity = updatedItems.get(productId)?.quantity || 0;

    
    if (currentQuantity == 0) {
      const productInfo =  {...product, // Spreads all properties from productObject
  quantity: 1}
      // Item exists: increment quantity
      updatedItems.set(productId, productInfo);
    } else {
      // Item does not exist: add with quantity 1
      const productInfo =  {...product, // Spreads all properties from productObject
  quantity: currentQuantity + 1}
      updatedItems.set(productId, productInfo);
    }
    setItems(updatedItems)
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
