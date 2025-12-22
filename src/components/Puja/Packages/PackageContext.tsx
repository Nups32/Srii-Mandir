import { createContext, useContext, useState } from "react";
import type { Cart, Offer } from "./types";

export type SelectedPackageType = {
  _id: string;
  title: string;
  price: number;
  person?: string;
};

type PackageContextType = {
  selectedPackage: SelectedPackageType | null;
  setSelectedPackage: (pkg: SelectedPackageType) => void;

  cart: Cart;
  addItem: (offer: Offer) => void;
  updateQty: (id: string, delta: number) => void;
};

const PackageContext = createContext<PackageContextType | undefined>(undefined);

export function PackageProvider({ children }: { children: React.ReactNode }) {
  const [selectedPackage, setSelectedPackage] =
    useState<SelectedPackageType | null>(null);

  const [cart, setCart] = useState<Cart>({});

  const addItem = (offer: Offer) => {
    setCart((prev) => ({
      ...prev,
      [offer.id]: { ...offer, qty: 1 },
    }));
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const item = prev[id];
      if (!item) return prev;

      const qty = item.qty + delta;
      if (qty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }

      return {
        ...prev,
        [id]: { ...item, qty },
      };
    });
  };

  return (
    <PackageContext.Provider
      value={{
        selectedPackage,
        setSelectedPackage,
        cart,
        addItem,
        updateQty,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(PackageContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
