import type { PujaBooking } from "./PujaBooking";

type Props = {
  booking: PujaBooking;
  onClose: () => void;
};

export default function ReviewModal({ booking, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Feedback for {booking.pujaName}
        </h2>

        <textarea
          rows={4}
          placeholder="Write your experience..."
          className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
