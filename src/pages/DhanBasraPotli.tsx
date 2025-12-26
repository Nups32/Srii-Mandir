import { getOneProductByType } from "@/utils/API";
import { message } from "antd";
import React, { useEffect, useState } from "react";

// const images = [
//     "/images/dhan-potli-1.jpg",
//     "/images/dhan-potli-2.jpg",
//     "/images/dhan-potli-3.jpg",
// ];

const HeroSection: React.FC = () => {
    const [activeImage, setActiveImage] = useState(0);

    const [product, setProduct] = useState<any>([]);
    const [_loading, setLoading] = useState<any>();

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await getOneProductByType("dhan-basra-potli");
            if (response.data.status) {
                setProduct(response.data.data);
            }
        } catch (error) {
            message.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <section className="bg-gradient-to-b from-yellow-100 to-yellow-50">
            <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
                {/* Image Section */}
                <div>
                    <div className="rounded-3xl overflow-hidden shadow-lg">
                        <img
                            // src={product?.images?.[activeImage]}
                            src={`${import.meta.env.VITE_APP_Image_URL}/product/${product?.images?.[activeImage]}`}
                            alt="Dhan Basra Potli"
                            className="w-full h-[420px] object-cover"
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-4 mt-4">
                        {product?.images?.map((img: any, index: any) => (
                            <button
                                key={index}
                                onClick={() => setActiveImage(index)}
                                className={`h-full w-full rounded-xl overflow-hidden border-2 ${activeImage === index
                                    ? "border-yellow-600"
                                    : "border-transparent"
                                    }`}
                            >
                                <img
                                    src={`${import.meta.env.VITE_APP_Image_URL}/product/${img}`}
                                    alt="thumbnail"
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Text Section */}
                <div>
                    <h1 className="text-4xl text-center md:text-5xl font-bold text-yellow-800 mb-6">
                        {product?.name}
                    </h1>
                    <p className="text-2xl font-semibold text-orange-600">
                        ₹{product?.price}
                    </p>

                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        {product?.about}
                        {/* A sacred spiritual potli prepared with devotion and ritual purity to
                        support prosperity, abundance, and financial harmony in life. */}
                    </p>

                    <button className="bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-700 transition">
                        Book Now
                    </button>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: product?.description }}>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;