export default function OfferingModal({ offering, onCancel, onAdd }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Image */}
        {offering.image && (
          <img
            src={offering.image}
            alt={offering.name}
            className="w-full h-32 object-cover"
          />
        )}

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {offering.name}
          </h3>

          <p className="text-green-600 font-semibold">₹{offering.price}</p>
          <p className="text-sm text-gray-600">{offering.description}</p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() => onAdd(offering)}
            className="flex-1 bg-green-600 text-white! py-2 rounded-md hover:bg-green-700 cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
