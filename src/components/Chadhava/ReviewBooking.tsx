import { useLocation } from "react-router-dom";

type CartItem = {
  qty: number;
  name: string;
  price: number;
};

type Props = {
  updateQty: (id: string, delta: number) => void;
};

export default function ReviewBooking({ updateQty }: Props) {
  const location = useLocation();
  const cart: Record<string, CartItem> = location.state?.cart || {};
  console.log("carttt", cart);

  const totalAmount = Object.values(cart).reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  return (
    <div className="bg-white border rounded-xl p-5 space-y-4">
      <h2 className="text-lg font-semibold">Review Booking</h2>

      {Object.entries(cart).map(([id, item]) => (
        <div
          key={id}
          className="flex justify-between items-center border rounded-lg p-4"
        >
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">₹{item.price}</p>
          </div>

          <div className="flex items-center gap-3 bg-green-600 text-white rounded-md px-3 py-1">
            <button onClick={() => updateQty(id, -1)}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => updateQty(id, 1)}>+</button>
          </div>
        </div>
      ))}

      <div className="border rounded-lg p-4 mt-4">
        <h3 className="font-semibold">Bill details</h3>
        <p className="mt-2">
          Total Amount <span className="font-semibold">₹{totalAmount}</span>
        </p>
      </div>
    </div>
  );
}
