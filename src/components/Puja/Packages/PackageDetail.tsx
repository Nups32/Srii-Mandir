// import { useMemo, useState } from "react";
// import SelectedPackage from "./PackageDetail";
// import AddOnList from "./AddOnList";
// import BottomBar from "./BottomBar";
// import { packages } from "../../../../details";
// import { Offer } from "./types";

// export default function ChadhavaCart() {
//   const [cart, setCart] = useState<Cart>({});

//   const addItem = (offer: Offer) => {
//     setCart(prev => ({
//       ...prev,
//       [offer.id]: { ...offer, qty: 1 },
//     }));
//   };

//   const updateQty = (id: string, delta: number) => {
//     setCart(prev => {
//       const item = prev[id];
//       if (!item) return prev;

//       const newQty = item.qty + delta;

//       if (newQty <= 0) {
//         const clone = { ...prev };
//         delete clone[id];
//         return clone;
//       }

//       return {
//         ...prev,
//         [id]: { ...item, qty: newQty },
//       };
//     });
//   };

//   const totalAmount = useMemo(() => {
//     const itemsTotal = Object.values(cart).reduce(
//       (sum, item) => sum + item.price * item.qty,
//       0
//     );
//     return PACKAGE.price + itemsTotal;
//   }, [cart]);

//   return (
//     <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 p-6">
//       {/* LEFT */}
//       <SelectedPackage
//         packageInfo={PACKAGE}
//         cart={cart}
//         updateQty={updateQty}
//       />

//       {/* RIGHT */}
//       <AddOnList
//         offers={chadhavaData.offering}
//         cart={cart}
//         onAdd={addItem}
//       />

//       {/* BOTTOM */}
//       <BottomBar
//         visible={Object.keys(cart).length > 0}
//         total={totalAmount}
//         packageName={PACKAGE.name}
//       />
//     </div>
//   );
// }
