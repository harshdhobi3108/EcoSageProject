"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart items from localStorage (only the array)
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("ecosage-cart");
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        if (parsed && Array.isArray(parsed.items)) {
          // If the stored data has an items array, set that
          setCartItems(parsed.items);
        } else if (Array.isArray(parsed)) {
          // If the stored data is already an array, set directly
          setCartItems(parsed);
        } else {
          // Fallback to empty array
          setCartItems([]);
        }
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      setCartItems([]);
    }
  }, []);

  // Save cartItems array to localStorage wrapped inside an object
  useEffect(() => {
    const cartToStore = {
      items: cartItems,
      // you can add total, itemCount here if you want
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      itemCount: cartItems.length,
      totalQuantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    };
    localStorage.setItem("ecosage-cart", JSON.stringify(cartToStore));

    // Trigger global update event (if needed)
    window.dispatchEvent(new Event("cart-updated"));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
