import type { Cart } from "./types";

type Props = {
  cart: Cart;
  updateQty: (id: string, delta: number) => void;
};

export default function SelectedPackage({ cart, updateQty }: Props) {
  if (Object.keys(cart).length === 0) {
    return (
      <div className="bg-white border rounded-xl p-4">
        <p className="text-gray-500 text-sm">No offerings selected</p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl p-4 space-y-4">
      <h3 className="font-semibold">Selected Offerings</h3>

      {Object.values(cart).map(item => (
        <div
          key={item.id}
          className="flex justify-between items-center border rounded-lg p-3"
        >
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">
              ₹{item.price} × {item.qty}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQty(item.id, -1)}
              className="w-8 h-8 border rounded"
            >
              −
            </button>
            <span>{item.qty}</span>
            <button
              onClick={() => updateQty(item.id, 1)}
              className="w-8 h-8 border rounded"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
