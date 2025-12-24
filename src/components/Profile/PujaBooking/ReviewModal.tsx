import { useState } from "react";
import type { BookPuja } from "@/admin/pages/BookPuja/Index";
import { message } from "antd";
import { PujaReviewByUser } from "@/utils/API";

type Props = {
  booking: BookPuja;
  onClose: () => void;
};

export default function ReviewModal({ booking, onClose }: Props) {
  const [rating, setRating] = useState<number>(0);
  const [hovered, setHovered] = useState<number>(0);
  const [comment, setComment] = useState("");

  // const handleSubmit = () => {
  //   if (rating === 0) {
  //     alert("Please select a rating");
  //     return;
  //   }

  //   // TODO: Call submit review API here
  //   console.log({
  //     pujaId: booking.pujaId._id,
  //     rating,
  //     comment,
  //   });



  //   onClose();
  // };

  const handleSubmit = async () => {
    if (!comment.trim()) {
      message.error("Please enter a review comment");
      return;
    }

    if (rating < 1 || rating > 5) {
      message.error("Please select a valid rating (1-5 stars)");
      return;
    }
    // setLoading(true);
    try {
      const res = await PujaReviewByUser({
        pujaId: booking.pujaId._id,
        rating,
        comment
      });
      if (res.data.status) {
        message.success("Puja review created successfully");
        onClose();
      } else {
        message.error(res.data.message || "Server Error");
      }
    } catch (error: any) {
      console.error("Error creating puja review:", error);
      message.error(error.response?.data?.message || "Failed to create review. Please try again.");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Feedback for {booking.pujaId.name}
        </h2>

        {/* feedback */}
        <textarea
          rows={6}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your experience..."
          className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* rating stars */}
        <div className="mb-4 flex justify-center items-center flex-col">
          <p className="text-xl font-medium text-gray-700 mt-7!">Rate us</p>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className="focus:outline-none"
              >
                <svg
                  className={`w-7 h-7 ${(hovered || rating) >= star
                    ? "fill-yellow-400"
                    : "fill-gray-300"
                    }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.449a1 1 0 00-.364 1.118l1.287 3.951c.3.92-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.951a1 1 0 00-.364-1.118L2.05 9.377c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.951-.69l1.287-3.95z" />
                </svg>
              </button>
            ))}
          </div>

          {rating > 0 && (
            <p className="text-xs text-gray-500 mt-4!">
              You selected {rating} star{rating > 1 && "s"}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-green-600 text-white! hover:bg-green-700 cursor-pointer"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
