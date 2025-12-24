import { useEffect, useState } from "react";
import ReviewModal from "./ReviewModal";
import EmptyState from "./EmptyState";
import PujaTable from "./PujaTable";
import { getBookedPuja } from "@/utils/API";
import {message } from "antd";

export type PujaBooking = {
  id: number;
  pujaName: string;
  createdAt: string;
  packageName: string;
  price: number;
};

export default function PujaHistory() {
  const [booking, setBooking] = useState<PujaBooking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<PujaBooking | null>(
    null
  );

  // const [bookings] = useState<PujaBooking[]>([
  //   {
  //     id: 1,
  //     pujaName: "Ganesh Puja",
  //     packageName: "Silver Package",
  //     price: 1100,
  //   },
  //   {
  //     id: 2,
  //     pujaName: "Satyanarayan Puja",
  //     packageName: "Gold Package",
  //     price: 2100,
  //   },
  //   {
  //     id: 3,
  //     pujaName: "Maha Shivratri Puja",
  //     packageName: "Platinum Package",
  //     price: 5100,
  //   },
  // ]);

  // const dummyViewData = {
  //   members: ["Ramesh Sharma", "Sita Sharma"],
  //   gotra: "Kashyap",
  //   whatsapp: "9876543210",
  //   callingNumber: "9876543210",
  //   address: {
  //     house: "12A",
  //     road: "MG Road",
  //     landmark: "Near Temple",
  //     city: "Pune",
  //     state: "Maharashtra",
  //     pincode: "411001",
  //   },
  // };

  const fetchBookedPooja = async () => {
    try {
      const response: any = await getBookedPuja();
      console.log("res from fetchBookedPooja", response);
      if (response?.data?.status) {
        setBooking(response.data.data);
      } else {
        message.error("failed to fetch poojas");
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    }
  };

  console.log("booking", booking);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBookedPooja();
  }, []);


  return (
    <section className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">
          Puja History
        </h1>

        {booking.length === 0 ? (
          <EmptyState />
        ) : (
          // <PujaTable bookings={bookings} onReview={setSelectedBooking}/>
          <PujaTable
            onReview={setSelectedBooking}
          />
        )}

        {selectedBooking && (
          <ReviewModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}

        {/* {viewData && (
          <ConfirmDetailsModal
            open={true}
            data={viewData}
            onClose={() => setViewData(null)}
          />
        )} */}
        
      </div>
    </section>
  );
}
