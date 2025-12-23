export default function SelectedPackageSummary({ packageData, cartData }: any) {
  const cartItems = Object.values(cartData || []);

  return (
    <>
      {/* Package Summary */}
      <div className="bg-white border rounded-xl p-5 sticky top-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-900">
              {packageData?.title}
            </h3>
            <p className="text-sm text-gray-500">{packageData?.person}</p>
          </div>

          <p className="font-semibold text-lg">₹ {packageData?.price}</p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="bg-white border rounded-xl p-5 mt-4 space-y-3">
        {cartItems.map((item: any, i) => (
          <div key={i} className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500">Qty: {item.qty}</p>
            </div>

            <p className="font-semibold text-lg inline-flex">
              <span>₹</span> {item.price}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
