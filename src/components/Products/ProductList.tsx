import { getAllProductByCategory } from "@/utils/API";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Product = {
  _id: number;
  name: string;
  images: string[];
  price: string;
  description: string;
};


export function ProductList() {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(100);
  const [products, setProducts] = useState<Product[]>([]);
  const [_loading, setLoading] = useState<any>();
  const { category } = useParams<{ category: string }>();

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await getAllProductByCategory(category || "");
      if (response.data.status) {
        setProducts(response.data.data);
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [category]);


  useEffect(() => {
    const updateStep = () => {
      if (window.innerWidth < 640) {
        setStep(100); // mobile: 1 card
      } else if (window.innerWidth < 768) {
        setStep(50); // tablet: 2 cards
      }
    };

    updateStep();
    window.addEventListener("resize", updateStep);
    return () => window.removeEventListener("resize", updateStep);
  }, []);

  const maxIndex = step === 100 ? products.length - 1 : Math.ceil(products.length - 2);


  return (
    <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-14">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl md:text-3xl font-bold text-gray-900">
            {category}
          </h3>
        </div>
        {/* <p className="text-lg text-gray-600 max-w-3xl">{subtitle}</p> */}
      </div>

      <div className="relative md:hidden">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${index * step}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product?._id}
                className="shrink-0 w-full sm:w-1/2 px-2"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 disabled:opacity-40"
        >
          ‹
        </button>

        <button
          onClick={() => setIndex((i) => Math.min(i + 1, maxIndex))}
          disabled={index === maxIndex}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 disabled:opacity-40"
        >
          ›
        </button>
      </div>

      <div className="hidden md:grid grid-cols-3 gap-8 lg:gap-10">
        {products.map((product) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
    </section>
  );
}

// Product Card
function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden bg-gray-100">
        <img
          // src={product?.image?.[0]}
          src={`${import.meta.env.VITE_APP_Image_URL}/product/${product?.images?.[0]}`}
          alt={product?.name}
          className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold text-gray-900">
          {product?.name}
        </h3>

        {/* <p className="text-sm text-gray-600 line-clamp-2">
          {product?.description}
        </p> */}

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <span className="text-2xl font-bold text-orange-600">
            {product?.price}
          </span>

          <span
            onClick={() =>
              navigate("/products/detail", {
                state: { product },
              })
            }
            className="text-sm font-semibold text-orange-600 hover:text-orange-700 cursor-pointer"
          >
            View Details
          </span>
        </div>
      </div>
    </div>
  );
}