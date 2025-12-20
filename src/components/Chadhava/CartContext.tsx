import { createContext, useContext, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  qty: number;
};

type CartContextType = {
  cart: Record<string, CartItem>;
  addOrUpdateItem: (item: CartItem, delta?: number) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<string, CartItem>>({});

  const addOrUpdateItem = (item: CartItem, delta = 1) => {
    setCart((prev) => {
      const existing = prev[item.id];
      if (existing) {
        const qty = existing.qty + delta;
        if (qty <= 0) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [item.id]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [item.id]: { ...existing, qty } };
      }
      if (delta > 0) {
        return { ...prev, [item.id]: { ...item, qty: delta } };
      }
      return prev;
    });
  };

  const removeItem = (id: string) => {
    setCart((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addOrUpdateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
