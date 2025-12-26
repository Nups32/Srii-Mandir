import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getReviews, userFeedbackStore } from "@/utils/API";
import { message } from "antd";
import { useSelector } from "react-redux";
import type { IRootState } from "@/store";
// interface Review {
//   id: number;
//   name: string;
//   //   image: string;
//   rating: number;
//   text: string;
//   //   videoThumbnail?: string;
// }

const ReviewsRatings = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [reviews, setReviews] = useState<any>([]);
  const [, setLoading] = useState<any>([]);
  const authData = useSelector((state: IRootState) => state.userConfig);
  // const reviews: Review[] = [
  //   {
  //     id: 1,
  //     name: "Abhilasha Tyagi",
  //     //   image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  //     rating: 5,
  //     text: "I must state upfront for all the charges, thank an all the grace of God, it gave instant rejuvenation of hopes and positivity in our life.",
  //     //   videoThumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop"
  //   },
  //   {
  //     id: 2,
  //     name: "Kamalpriti Chandra Bhatt",
  //     //   image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  //     rating: 5,
  //     text: "I might not be the eager drivers of most of the chanting and celebrate respect in favour of god Almighty and yet I can bring changes and witness miracles in my life, wonderful.",
  //     //   videoThumbnail: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=400&h=300&fit=crop"
  //   },
  //   {
  //     id: 3,
  //     name: "Apurwa Sati",
  //     //   image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  //     rating: 5,
  //     text: "Lord and their divine are own level and it is something that me would just in favour that shine from our lord from worship that we did would not ever believe in it.",
  //     //   videoThumbnail: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop"
  //   },
  //   {
  //     id: 4,
  //     name: "Ananya Dubey",
  //     //   image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop",
  //     rating: 5,
  //     text: "The service provided was exceptional and the puja was conducted with utmost devotion. Highly recommended for anyone seeking spiritual guidance.",
  //     //   videoThumbnail: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop"
  //   },
  //   {
  //     id: 5,
  //     name: "Ramchandra Bhatt",
  //     //   image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  //     rating: 5,
  //     text: "I might not be the eager drivers of most of the chanting and celebrate respect in favour of god Almighty and yet I can bring changes and witness miracles in my life, wonderful.",
  //     //   videoThumbnail: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=400&h=300&fit=crop"
  //   },
  // ];

  const fetchPooja = async () => {
    setLoading(true);
    try {
      const response: any = await getReviews();
      if (response?.data?.status) {
        setReviews(response.data.data);
      } else {
        message.error("failed to fetch poojas");
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPooja();
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      let count = 3;
      if (window.innerWidth < 768) {
        count = 1;
      } else if (window.innerWidth < 1024) {
        count = 2;
      }

      setVisibleCount((prev) => {
        if (prev !== count) {
          setCurrentIndex(0);
        }
        return count;
      });
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);
  // const nextReview = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex + 3 >= reviews.length ? 0 : prevIndex + 1
  //   );
  // };

  const nextReview = () => {
    setCurrentIndex((prev) =>
      prev + visibleCount >= reviews.length ? 0 : prev + visibleCount
    );
  };
  // const prevReview = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? Math.max(0, reviews.length - 3) : prevIndex - 1
  //   );
  // };

  const prevReview = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(0, reviews.length - visibleCount)
        : prev - visibleCount
    );
  };
  // useEffect(() => {
  //   const updateVisibleCount = () => {
  //     if (window.innerWidth < 768) {
  //       setVisibleCount(1); // mobile
  //     } else if (window.innerWidth < 1024) {
  //       setVisibleCount(2); // tablet
  //     } else {
  //       setVisibleCount(3); // desktop
  //     }
  //   };

  //   updateVisibleCount();
  //   window.addEventListener("resize", updateVisibleCount);

  //   return () => window.removeEventListener("resize", updateVisibleCount);
  // }, []);

  // const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);

  // const visibleReviews = reviews.slice(
  //   currentIndex,
  //   currentIndex + visibleCount
  // );

  const visibleReviews = reviews.slice(
    Math.min(currentIndex, reviews.length - visibleCount),
    Math.min(currentIndex, reviews.length - visibleCount) + visibleCount
  );

  /* FEEDBACK FORM STATE  */
  const [feedback, setFeedback] = useState({
    name: "",
    mobile: "",
    rating: 0,
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleRating = (value: number) => {
    setFeedback({ ...feedback, rating: value });
  };

  const submitFeedback = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (!feedback.name || !feedback.mobile || !feedback.rating || !feedback.comment) {
        message.warning("Please fill all fields");
        return;
      }

      if (!/^[6-9]\d{9}$/.test(feedback.mobile)) {
        message.error("Enter a valid 10-digit mobile number");
        return;
      }
      const res = await userFeedbackStore({...feedback, userId: authData._id});
      if (res.data.status) {
        message.success("Thank you for your feedback 🙏");
      } else {
        message.error(res.data.message || "Server Error");
      }
    } catch (error: any) {
      console.error("Error creating puja review:", error);
      message.error(error.response?.data?.message || "Failed to create review. Please try again.");
    } finally {
      // setLoading(false);
      setFeedback({ name: "", mobile: "", rating: 0, comment: "" });
    }
  };

  return (
    <>

      <section
        id="reviews"
        className="w-full bg-gray-50 rounded-2xl py-16 my-6 px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Reviews & Ratings
            </h2>
            <p className="text-gray-600 text-lg">
              Read to what our believers devotees have to say about Srii Mandir.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {visibleReviews.map((review: any) => (
                <div
                  key={review._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
                >
                  <div className="p-6">
                    <p className="text-gray-700 text-sm leading-relaxed mb-6">
                      "{review.comment}"
                    </p>

                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {review.name}
                      </h4>
                      <div className="flex text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-4">
              <button onClick={prevReview} className="nav-btn">
                <ChevronLeft />
              </button>
              <button onClick={nextReview} className="nav-btn">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {authData.token && (
        <section className="max-w-3xl mx-auto my-16 px-6">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-center mb-6">
              Share Your Experience
            </h3>

            <form onSubmit={submitFeedback} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={feedback.name}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={feedback.mobile}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              {/* STAR RATING */}
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRating(star)}
                    className={`cursor-pointer text-2xl ${star <= feedback.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                      }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                name="comment"
                placeholder="Your Feedback"
                rows={4}
                value={feedback.comment}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </section>

      )}

    </>
  );
};

export default ReviewsRatings;
