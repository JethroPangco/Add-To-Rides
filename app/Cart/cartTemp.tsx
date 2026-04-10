import React, { createContext, useContext } from "react";
import { auth, db } from "../../src/config/firebaseConfig";
import { ref, set, remove, get } from "firebase/database";

export type CartItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: any;
  quantity: number;
};

type CartContextType = {
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: any) => {

  const addToCart = async (item: CartItem) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const itemRef = ref(db, `cart/${userId}/${item.id}`);

    const snapshot = await get(itemRef);

    if (snapshot.exists()) {
      const existing = snapshot.val();
      await set(itemRef, {
        ...existing,
        quantity: existing.quantity + 1,
      });
    } else {
      await set(itemRef, {
        ...item,
        quantity: 1,
      });
    }
  };

  const removeFromCart = async (id: string) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    await remove(ref(db, `cart/${userId}/${id}`));
  };

  const updateQuantity = async (id: string, quantity: number) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    await set(ref(db, `cart/${userId}/${id}/quantity`), Math.max(1, quantity));
  };

  return (
    <CartContext.Provider
      value={{ addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};