

// type Props = {
//   packageInfo: { name: string; price: number };
//   cart: Cart;
//   updateQty: (id: string, delta: number) => void;
// };

// export default function SelectedPackage({ packageInfo, cart, updateQty }: Props) {
//   return (
//     <div className="bg-white border rounded-xl p-4 space-y-4">
//       <div>
//         <h3 className="font-semibold">{packageInfo.name}</h3>
//         <p className="text-green-600 font-medium">₹ {packageInfo.price}</p>
//       </div>

//       {Object.values(cart).map(item => (
//         <div
//           key={item.id}
//           className="flex justify-between items-center border rounded-lg p-3"
//         >
//           <div>
//             <p className="font-medium">{item.name}</p>
//             <p className="text-sm text-gray-500">
//               ₹{item.price} × {item.qty}
//             </p>
//           </div>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => updateQty(item.id, -1)}
//               className="w-8 h-8 border rounded"
//             >
//               −
//             </button>
//             <span>{item.qty}</span>
//             <button
//               onClick={() => updateQty(item.id, 1)}
//               className="w-8 h-8 border rounded"
//             >
//               +
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
