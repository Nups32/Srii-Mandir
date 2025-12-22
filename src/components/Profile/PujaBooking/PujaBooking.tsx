import { useState } from "react";
import ReviewModal from "./ReviewModal";
import EmptyState from "./EmptyState";
import PujaTable from "./PujaTable";

export type PujaBooking = {
  id: number;
  pujaName: string;
  packageName: string;
  price: number;
};

export default function PujaHistory() {
  const [bookings] = useState<PujaBooking[]>([]); // empty = no booking
  const [selectedBooking, setSelectedBooking] = useState<PujaBooking | null>(null);

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border p-6">

        <h1 className="text-xl font-semibold text-gray-900 mb-6">
          Puja History
        </h1>

        {bookings.length === 0 ? (
          <EmptyState />
        ) : (
          <PujaTable
            bookings={bookings}
            onReview={setSelectedBooking}
          />
        )}

        {selectedBooking && (
          <ReviewModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}
      </div>
    </section>
  );
}
