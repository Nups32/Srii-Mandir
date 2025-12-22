import type { ChadhavaBooking } from "./ChadhavaBooking";

export default function ChadhavaTable({
  bookings,
}: {
  bookings: ChadhavaBooking[];
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
              Chadhava Name
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
              Total Amount
            </th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((item, index) => (
            <tr
              key={item.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 text-sm text-gray-600">
                {index + 1}
              </td>

              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {item.name}
              </td>

              <td className="px-4 py-3 text-sm font-semibold text-right text-gray-900">
                ₹{item.totalAmount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
