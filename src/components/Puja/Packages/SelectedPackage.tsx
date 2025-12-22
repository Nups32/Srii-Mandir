import { useCart } from "@/components/Puja/Packages/PackageContext";

export default function SelectedPackage() {
  const { selectedPackage, cart, updateQty } = useCart();
  const items = Object.values(cart);

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 space-y-4">
      <h3 className="text-lg font-semibold">Selected Package</h3>

      {selectedPackage && (
        <div className="border border-gray-300 rounded-lg p-4 bg-orange-50">
          <p className="font-semibold">{selectedPackage.title}</p>
          <p className="text-orange-600 font-bold">₹{selectedPackage.price}</p>
        </div>
      )}

      {/* <h4 className="font-medium pt-2">Additional Offerings</h4> */}

      {items.length === 0
        ? ""
        : // <p className="text-sm text-gray-500">No offerings selected</p>
          items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border border-gray-300 rounded-lg p-4"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ₹{item.price} × {item.qty}
                </p>
              </div>

              <div className="flex items-center bg-white border rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="w-7 h-7 flex items-center justify-center text-lg font-medium text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition disabled:opacity-40 cursor-pointer"
                >
                  -
                </button>

                <span className="w-10 text-center text-sm font-semibold text-gray-900">
                  {item.qty}
                </span>

                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="w-7 h-7 flex items-center justify-center text-lg font-medium text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          ))}
    </div>
  );
}
