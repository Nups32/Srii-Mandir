import { useEffect, useState } from "react";
import ChadhavaTable from "./ChadhavaTable";
import ChadhavaEmptyState from "./ChadhavaEmptyState";
import { message } from "antd";
import { getBookedChadhava } from "@/utils/API";

export type ChadhavaBooking = {
  id: number;
  name: string;
  totalAmount: number;
};

export default function ChadhavaHistory() {
  const [bookings, setBookings] = useState<ChadhavaBooking[]>([])
  // const [bookings] = useState<ChadhavaBooking[]>([
  //   {
  //     id: 1,
  //     name: "Modak Offering",
  //     totalAmount: 501,
  //   },
  //   {
  //     id: 2,
  //     name: "Abhishek Samagri",
  //     totalAmount: 1101,
  //   },
  // ]);
  const fetchBookedChadhava = async () => {
    try {
      const response: any = await getBookedChadhava();
      console.log("res from fetchBookedPooja", response);
      if (response?.data?.status) {
        setBookings(response.data.data);
      } else {
        message.error("failed to fetch poojas");
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    }
  };

  useEffect(() => {
    fetchBookedChadhava();
  }, []);

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
