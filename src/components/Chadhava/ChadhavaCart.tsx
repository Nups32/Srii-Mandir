import { useState } from "react";
import ReviewBooking from "./ReviewBooking";
import BillDetails from "./BillDetails";
// import AdditionalOffers from "./AdditionalOffers";
import BottomBar from "./BottomBar";

// type Offer = {
//   id: string;
//   name: string;
//   price: number;
//   image?: string;
// };

type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  qty: number;
};

export default function ChadhavaCart() {
  const [cart, setCart] = useState<Record<string, CartItem>>({});

  // const addOffer = (offer: Offer) => {
  //   setCart((prev) => {
  //     const existing = prev[offer.id];

  //     return {
  //       ...prev,
  //       [offer.id]: {
  //         ...offer,
  //         qty: existing ? existing.qty + 1 : 1,
  //       },
  //     };
  //   });
  // };

  // function addOffer(id: string, item: CartItem) {
  //   setCart((prev) => ({
  //     ...prev,
  //     [id]: prev[id]
  //       ? { ...prev[id], qty: prev[id].qty + 1 }
  //       : { ...item, qty: 1 },
  //   }));
  // }

  function updateQty(id: string, delta: number) {
    setCart((prev) => {
      const item = prev[id];
      if (!item) return prev;
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [id]: _, ...rest } = prev; // remove item if qty <= 0
        return rest;
      }
      return { ...prev, [id]: { ...item, qty: newQty } };
    });
  }

  const totalCount = Object.values(cart).reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const totalAmount = Object.values(cart).reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  return (
    <section className="min-h-screen bg-gray-50 pb-24 px-4">
      <div className="max-w-3xl mx-auto space-y-6 pt-6">
        <ReviewBooking updateQty={updateQty} />
        <BillDetails cart={cart} totalAmount={totalAmount} />
        {/* <AdditionalOffers onAdd={(offer) => addOffer(offer.id, offer)} /> */}
      </div>

      {totalCount > 0 && <BottomBar count={totalCount} amount={totalAmount} />}
    </section>
  );
}
