import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  image: string[];
  price: string;
  description: string;
};

export default function ProductDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const product: Product | undefined = state?.product;
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="mb-4">Product not available</p>
        <button
          onClick={() => navigate("/products")}
          className="text-orange-600 underline"
        >
          Go back to products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* LEFT: IMAGE GALLERY */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="bg-white rounded-xl overflow-hidden ">
            <img
              src={product.image[activeImage]}
              alt={product.name}
              className="w-full h-105 object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-3">
            {product.image.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`border rounded-lg overflow-hidden p-1 bg-white transition
                  ${
                    activeImage === index
                      ? "border-orange-500 ring-2 ring-orange-400"
                      : "border-gray-200 hover:border-gray-400"
                  }
                `}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-16 w-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: PRODUCT DETAILS */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <p className="text-2xl font-semibold text-orange-600">
            {product.price}
          </p>

          <div className="flex gap-4 pt-4">
            {/* <button className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition">
              Add to Cart
            </button> */}
            <button className="flex-1 bg-black text-white! py-3 rounded-lg font-semibold hover:bg-gray-900 transition cursor-pointer">
              Buy Now
            </button>
          </div>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
