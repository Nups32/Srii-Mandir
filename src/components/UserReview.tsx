import { Star } from "lucide-react";
import { reviews } from "../../details";

export default function UserReviews() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-gray-900">User Reviews</h2>
      <p className="mt-2 text-gray-600">
        Reviews from our devotees who booked Puja with us
      </p>

      {/* Reviews */}
      <div className="mt-8 space-y-10">
        {reviews.map((review, index) => (
          <div key={index}>
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full border border-orange-400 overflow-hidden">
                <img
                  src={review.profile}
                  alt={review.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">{review.date}</p>

                {/* Stars */}
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="#F97316" stroke="#F97316" />
                  ))}
                </div>

                {/* Comment */}
                <p className="mt-3 text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </div>

            {/* Divider */}
            {index !== reviews.length - 1 && (
              <div className="mt-8 border-b border-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
