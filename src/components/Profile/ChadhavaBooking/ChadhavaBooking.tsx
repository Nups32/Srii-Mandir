import { useState } from "react";
import ChadhavaTable from "./ChadhavaTable";
import ChadhavaEmptyState from "./ChadhavaEmptyState";

export type ChadhavaBooking = {
  id: number;
  name: string;
  totalAmount: number;
};

export default function ChadhavaHistory() {
  // 🔁 Make this empty [] to see empty state
  const [bookings] = useState<ChadhavaBooking[]>([
    // {
    //   id: 1,
    //   name: "Modak Offering",
    //   totalAmount: 501,
    // },
    // {
    //   id: 2,
    //   name: "Abhishek Samagri",
    //   totalAmount: 1101,
    // },
  ]);

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">
          Your Bookings
        </h1>

        {bookings.length > 0 ? (
          <ChadhavaTable bookings={bookings} />
        ) : (
          <ChadhavaEmptyState />
        )}
      </div>
    </section>
  );
}
