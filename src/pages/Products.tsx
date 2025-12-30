import { ProductSection } from "../components/Products/ProductSection";
import { useEffect, useState } from "react";
import { getLatestProducts } from "@/utils/API";
import { message } from "antd";

export default function Products() {
  const [pujaProducts, setPujaProducts] = useState<any>([]);
  const [yantraProducts, setYantraProducts] = useState<any>([]);
  const [rudrakshaProducts, setRudrakshaProducts] = useState<any>([]);
  const [idolProducts, setIdolProducts] = useState<any>([]);
  const [bookProducts, setBookProducts] = useState<any>([]);
  const [spiritualKitProducts, setSpiritualKitProducts] = useState<any>([]);

  // Reviews Data
  const reviews = [
    {
      id: 1,
      name: "Ankit Sharma",
      rating: 5,
      comment: "The Rudraksha beads and spiritual kits are authentic and beautifully crafted. You can truly feel the spiritual energy and purity in the products. Packaging and quality exceeded my expectations.",
    },
    {
      id: 2,
      name: "Sandeep Mehra",
      rating: 5,
      comment: "Ordered a Brass Idol and a few Yantras. The finishing is very professional and they were delivered with great care. It’s hard to find such genuine devotional items online these days.",
    },
    {
      id: 3,
      name: "Priya V.",
      rating: 4,
      comment: "Very happy with the Puja collection. The incense and kits are of high quality. The team is very helpful in explaining the significance of each item.",
    }
  ];

  const category = [
    { key: 'puja', name: "Puja", subtilt: "Essential Puja Items for Daily Rituals & Festivals", data: pujaProducts },
    { key: 'yantra', name: "Yantra", subtilt: "Sacred Yantras for Prosperity, Protection & Spiritual Growth", data: yantraProducts },
    { key: 'rudraksha', name: "Rudraksha", subtilt: "Authentic Rudraksha Beads for Peace, Power & Positivity", data: rudrakshaProducts },
    { key: 'idol', name: "Idol", subtilt: "Handcrafted Idols for Home & Temple Worship", data: idolProducts },
    { key: 'book', name: "Book", subtilt: "Spiritual & Religious Books for Knowledge and Guidance", data: bookProducts },
    { key: 'spiritual-kit', name: "Spiritual Kit", subtilt: "Complete Spiritual Kits for Puja, Healing & Well-Being", data: spiritualKitProducts },
  ];

  const fetchProducts = async () => {
    try {
      const response = await getLatestProducts();
      if (response.data.status) {
        response.data.data.map((product?: any) => {
          product?.category == "puja" ? setPujaProducts(product?.items) : 
          product?.category == "yantra" ? setYantraProducts(product?.items) : 
          product?.category == "rudraksha" ? setRudrakshaProducts(product?.items) : 
          product?.category == "idol" ? setIdolProducts(product?.items) : 
          product?.category == "book" ? setBookProducts(product?.items) : 
          product?.category == "spiritual-kit" ? setSpiritualKitProducts(product?.items) : null;
        });
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="bg-[#FAF7F2] min-h-screen">
      <div className="mx-auto px-6 py-14 space-y-20">

        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900">
            Sacred Devotional Collections
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Discover spiritually energized products crafted for worship,
            meditation, and divine connection.
          </p>
        </div>

        {category?.map((cat, index) => (
          cat?.data?.length > 0 && (
            <ProductSection
              key={index}
              title={`${cat.name} Collection`}
              subtitle={cat.subtilt}
              products={cat.data}
              link={`/products/category/${cat.key}`}
            />
          )
        ))}

        {/* UPDATED REVIEWS SECTION */}
        <div className="pt-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900">
              Reviews & Ratings
            </h3>
            <p className="text-gray-600 mt-2">
              What devotees say about our sacred products
            </p>
          </div>

          <div className="space-y-10 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            {reviews.map((review) => (
              <div key={review.id} className="flex gap-5 items-start">
                {/* User Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                    <svg className="w-7 h-7 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 border-b border-gray-50 pb-8 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900 text-[17px] leading-none">
                      {review.name}
                    </h4>
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                      Verified
                    </span>
                  </div>

                  {/* Star Rating */}
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? "text-orange-500 text-lg" : "text-gray-300 text-lg"}>
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-700 text-[15px] leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}