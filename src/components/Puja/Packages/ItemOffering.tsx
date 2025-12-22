import type { Cart, Offer } from "./types";

type Props = {
  offers: Offer[];
  cart: Cart;
  onAdd: (offer: Offer) => void;
};

export default function OfferingItem({ offers, cart, onAdd }: Props) {
  const cartIds = new Set(Object.keys(cart));
  const availableOffers = offers.filter(o => !cartIds.has(o.id));

  return (
    <div>
      <h3 className="font-semibold mb-4">Add more offering items</h3>

      <div className="space-y-4">
        {availableOffers.map(item => (
          <div
            key={item.id}
            className="bg-white border rounded-xl p-4 flex gap-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded object-cover"
            />

            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-green-600 font-semibold">₹ {item.price}</p>
            </div>

            <button
              onClick={() => onAdd(item)}
              className="border border-green-600 text-green-700 px-4 py-1 rounded-md"
            >
              + Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
