import type { Cart, Offer } from "./types";

type Props = {
  offers: Offer[];
  cart: Cart;
  onAdd: (offer: Offer) => void;
};

export default function OfferingItem({ offers, cart, onAdd }: Props) {
  const cartIds = new Set(Object.keys(cart));

  const availableOffers = offers.filter(
    (item) => !cartIds.has(item._id)
  );

  if (availableOffers.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">
        Add more offering items
      </h3>

      <div className="space-y-4">
        {availableOffers.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 border rounded-lg p-4 hover:shadow-sm transition"
          >
            {/* IMAGE */}
            <img
              src={`${import.meta.env.VITE_APP_Image_URL}/pooja/${item.image}`}
              alt={item.name}
              className="w-20 h-20 rounded-lg object-cover"
            />

            {/* INFO */}
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                {item.name}
              </p>
              <p className="text-green-700 font-semibold mt-1">
                ₹ {item.price}
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={() => onAdd(item)}
              className="px-5 py-2 rounded-lg text-sm font-semibold
                         border border-green-600 text-green-700
                         hover:bg-green-50 transition cursor-pointer"
            >
              + Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
