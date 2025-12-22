export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <img
        src="/empty-puja.svg"
        alt="No Puja"
        className="h-28 mb-6 opacity-80"
      />

      <h2 className="text-lg font-semibold text-gray-900">
        No Puja has been booked yet
      </h2>

      <p className="text-gray-500 mt-2 max-w-md">
        Book your Puja online at popular temples of India. Panditji will take
        sankalp with your name and gotra during the Puja.
      </p>

      <button className="mt-6 px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition">
        Book Puja Now
      </button>
    </div>
  );
}
