export default function ChadhavaEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="h-14 w-14 flex items-center justify-center rounded-full border-2 border-red-400 text-red-500 mb-6">
        <span className="text-2xl font-bold">!</span>
      </div>

      <h2 className="text-lg font-semibold text-gray-900">
        No Offerings has been booked.
      </h2>

      <p className="text-gray-500 mt-2">
        You have not booked any offerings yet.
      </p>
    </div>
  );
}
