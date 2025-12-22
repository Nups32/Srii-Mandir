import { useState } from "react";
import ReviewModal from "./ReviewModal";
import EmptyState from "./EmptyState";
import PujaTable from "./PujaTable";
import ConfirmDetailsModal from "./ViewModal";

export type PujaBooking = {
  id: number;
  pujaName: string;
  packageName: string;
  price: number;
};

export default function PujaHistory() {
  const [viewData, setViewData] = useState<any | null>(null);

  const [selectedBooking, setSelectedBooking] = useState<PujaBooking | null>(
    null
  );
  const [bookings] = useState<PujaBooking[]>([
    {
      id: 1,
      pujaName: "Ganesh Puja",
      packageName: "Silver Package",
      price: 1100,
    },
    {
      id: 2,
      pujaName: "Satyanarayan Puja",
      packageName: "Gold Package",
      price: 2100,
    },
    {
      id: 3,
      pujaName: "Maha Shivratri Puja",
      packageName: "Platinum Package",
      price: 5100,
    },
  ]);

  const dummyViewData = {
    members: ["Ramesh Sharma", "Sita Sharma"],
    gotra: "Kashyap",
    whatsapp: "9876543210",
    callingNumber: "9876543210",
    address: {
      house: "12A",
      road: "MG Road",
      landmark: "Near Temple",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
    },
  };

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">
          Puja History
        </h1>

        {bookings.length === 0 ? (
          <EmptyState />
        ) : (
          // <PujaTable bookings={bookings} onReview={setSelectedBooking}/>
          <PujaTable
            bookings={bookings}
            onReview={setSelectedBooking}
            onView={() => setViewData(dummyViewData)}
          />
        )}

        {selectedBooking && (
          <ReviewModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}

        {viewData && (
          <ConfirmDetailsModal
            open={true}
            data={viewData}
            onClose={() => setViewData(null)}
          />
        )}
      </div>
    </section>
  );
}
