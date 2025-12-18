import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  id: number;
  name: string;
  //   image: string;
  rating: number;
  text: string;
  //   videoThumbnail?: string;
}

const ReviewsRatings = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const reviews: Review[] = [
    {
      id: 1,
      name: "Abhilasha Tyagi",
      //   image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
      text: "I must state upfront for all the charges, thank an all the grace of God, it gave instant rejuvenation of hopes and positivity in our life.",
      //   videoThumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Kamalpriti Chandra Bhatt",
      //   image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
      text: "I might not be the eager drivers of most of the chanting and celebrate respect in favour of god Almighty and yet I can bring changes and witness miracles in my life, wonderful.",
      //   videoThumbnail: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Apurwa Sati",
      //   image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      rating: 5,
      text: "Lord and their divine are own level and it is something that me would just in favour that shine from our lord from worship that we did would not ever believe in it.",
      //   videoThumbnail: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Ananya Dubey",
      //   image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop",
      rating: 5,
      text: "The service provided was exceptional and the puja was conducted with utmost devotion. Highly recommended for anyone seeking spiritual guidance.",
      //   videoThumbnail: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Ramchandra Bhatt",
      //   image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
      text: "I might not be the eager drivers of most of the chanting and celebrate respect in favour of god Almighty and yet I can bring changes and witness miracles in my life, wonderful.",
      //   videoThumbnail: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=400&h=300&fit=crop"
    },
  ];

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

  return (
    <>
      <section
        id="reviews"
        className="w-full bg-gray-50 rounded-2xl py-16 my-6 px-3"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Reviews & Ratings
            </h2>
            <p className="text-gray-600 text-lg">
              Read to what our believers devotees have to say about Dev Puja.
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {visibleReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
                >
                  {/* Video Thumbnail */}
                  {/* {review.videoThumbnail && (
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={review.videoThumbnail}
                      alt={`${review.name} testimonial`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                        <Play className="w-8 h-8 text-orange-500 hover:text-white ml-1" fill="currentColor" />
                      </button>
                    </div>
                  </div>
                )} */}

                  {/* Review Content */}
                  <div className="p-6">
                    <p className="text-gray-700 text-sm leading-relaxed mb-6">
                      "{review.text}"
                    </p>

                    {/* User Info */}
                    <div className="flex items-center">
                      {/* <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    /> */}
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
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={prevReview}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots Indicator */}
              {/* <div className="flex gap-2">
                {Array.from({ length: Math.ceil(reviews.length / 3) }).map(
                  (_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx * 3)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        Math.floor(currentIndex / 3) === idx
                          ? "bg-orange-500 w-8"
                          : "bg-gray-300"
                      }`}
                    />
                  )
                )}
              </div> */}

              <div className="flex gap-2">
                {Array.from({
                  length: Math.ceil(reviews.length / visibleCount),
                }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx * visibleCount)}
                    className={`h-2 rounded-full transition-all ${
                      Math.floor(currentIndex / visibleCount) === idx
                        ? "bg-orange-500 w-8"
                        : "bg-gray-300 w-2"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextReview}
                disabled={currentIndex + visibleCount >= reviews.length}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewsRatings;
