import type { CartItem } from "./CartContext";

type Props = {
  cart: Record<string, CartItem>;
  updateQty: (id: string, delta: number) => void;
};

export default function ReviewBooking({ cart, updateQty }: Props) {
  const totalAmount = Object.values(cart).reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <>
      <div className="bg-white border rounded-xl p-5 space-y-4">
        <h2 className="text-lg font-semibold">Review Booking</h2>
        {Object.keys(cart).length === 0 && <p className="text-sm text-gray-500">Cart is empty</p>}
        {Object.entries(cart).map(([id, item]) => (
          <div key={id} className="flex justify-between items-center border rounded-lg p-4">
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
      </div>

      <div className="border rounded-lg p-4 mt-4">
        <h3 className="font-semibold border-b pb-3">Bill details</h3>
        <p className="my-2! font-bold flex justify-between">
          Total Amount <span className="font-semibold">₹{totalAmount}</span>
        </p>
      </div>
    </>
  );
}
