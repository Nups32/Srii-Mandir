import { useMemo, useState } from "react";
import OfferingItem from "./ItemOffering";
import BottomBar from "./BottomAmount";
import { packages } from "../../../../details";
import type { Cart, Offer } from "./types";
import SelectedPackage from "./SelectedPckage";

export default function PackageDetail() {
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

  const totalAmount = useMemo(() => {
    return Object.values(cart).reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }, [cart]);

  const items = Object.values(cart);

  const bottomLabel = useMemo(() => {
    if (items.length === 1) {
      return items[0].name;
    }
    if (items.length > 1) {
      return `${items.length} Offerings Selected`;
    }
    return "";
    // }, [cart]);
  }, [items]);

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 p-6">
      {/* LEFT – Selected Offerings */}
      <SelectedPackage cart={cart} updateQty={updateQty} />

      {/* RIGHT – Available Offerings */}
      <OfferingItem offers={packages.offering} cart={cart} onAdd={addItem} />

      {/* BOTTOM */}
      <BottomBar
        visible={items.length > 0}
        total={totalAmount}
        label={bottomLabel}
      />
    </div>
  );
}
