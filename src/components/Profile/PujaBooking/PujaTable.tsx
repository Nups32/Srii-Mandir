import type { PujaBooking } from "./PujaBooking";

export default function PujaTable({
  bookings,
  onReview,
}: {
  bookings: PujaBooking[];
  onReview: (b: PujaBooking) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              #
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Puja Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Selected Package
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b, index) => (
            <tr
              key={b.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 text-sm text-gray-600">
                {index + 1}
              </td>

              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {b.pujaName}
              </td>

              <td className="px-4 py-3 text-sm text-gray-700">
                {b.packageName} – <span className="font-semibold">₹{b.price}</span>
              </td>

              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onReview(b)}
                  className="text-green-600 font-medium hover:underline"
                >
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
