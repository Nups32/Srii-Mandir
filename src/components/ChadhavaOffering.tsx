/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
// import { chadhavaData } from "../../details";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OfferingModal from "./OfferingModal";
import FAQs from "./FAQs";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../components/Chadhava/CartContext";
import { getChadhavaBySlug } from "@/utils/API";
import { message } from "antd";

export default function ChadhavaOffering() {
  const { cart, addOrUpdateItem } = useCart();
  const [current, setCurrent] = useState(0);
  // const images = chadhava?.images;
  const [, setIsModalOpen] = useState(false);
  const [selectedOffering, setSelectedOffering] = useState<any>(null);
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [, setLoading] = useState(true);
  const [chadhava, setChadhava] = useState<any>([]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      if (slug) {
        const response = await getChadhavaBySlug(slug || "");
        if (response.data.status) {
          setChadhava(response.data.data);
        }
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const prevSlide = () =>
    setCurrent((prev) =>
      prev === 0 ? chadhava?.images?.length - 1 : prev - 1
    );
  const nextSlide = () =>
    setCurrent((prev) =>
      prev === chadhava?.images?.length - 1 ? 0 : prev + 1
    );

  const openModal = (item: any) => {
    setSelectedOffering(item);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedOffering(null);
    setIsModalOpen(false);
  };

  // console.log("cahjdahva", chadhava);

  const totalCount = Object.values(cart).reduce(
    (sum, item) => sum + item?.qty,
    0
  );
  const totalAmount = Object.values(cart).reduce(
    (sum, item) => sum + item?.qty * item?.price,
    0
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="relative rounded-xl overflow-hidden shadow">
          <img
            // src={chadhava?.images?.[current]} alt="Chadhava"
            src={`${import.meta.env.VITE_APP_Image_URL}/chadhava/${
              chadhava?.images?.[current]
            }`}
            className="w-full h-65 object-cover"
          />
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 p-1 rounded-full"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 p-1 rounded-full"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {chadhava?.images?.map((_: any, i: any) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i === current ? "bg-orange-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-start">
          <h1 className="text-2xl font-semibold text-gray-900">
            {chadhava?.name}
          </h1>
          <p
            className="text-sm text-gray-600 mt-3"
            dangerouslySetInnerHTML={{ __html: chadhava?.about }}
          ></p>
          <div className="mt-4 space-y-2">
            {chadhava?.details?.map((item: any, index: any) => (
              <div key={index} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                <div className="text-sm text-gray-700">
                  <p className="font-medium">{item?.question}</p>
                  <p className="text-gray-600">{item?.answer}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-700">
            Till now{" "}
            <span className="font-semibold text-orange-600">
              1,50,000+ devotees
            </span>{" "}
            have participated.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-semibold mb-4">Choose an offering</h2>
        <div className="space-y-4">
          {chadhava?.offering?.map((item: any) => (
            <div
              key={item?._id}
              onClick={() => openModal(item)}
              className={`flex justify-between gap-4 p-4 cursor-pointer ${
                item?.isSpecialCombo
                  ? "bg-pink-50 border border-pink-200 rounded-lg"
                  : item?.isPrasadForHome
                  ? "bg-orange-50 border border-orange-200 rounded-lg"
                  : "border-b border-gray-200"
              }`}
            >
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900">
                  {item?.name}
                </h3>
                <p className="text-sm text-gray-600">{item?.description}</p>
                <p className="text-green-600 font-semibold mt-2">
                  ₹{item?.price}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                {item?.image && (
                  <img
                    src={`${import.meta.env.VITE_APP_Image_URL}/chadhava/${
                      item?.image
                    }`}
                    alt={item?.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                )}
                {cart[item?._id] ? (
                  <div
                    className="flex items-center gap-2 bg-green-600 text-white rounded-md px-2 py-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() =>
                        addOrUpdateItem(
                          {
                            ...item,
                            qty: 0,
                          },
                          -1
                        )
                      }
                    >
                      -
                    </button>
                    <span>{cart[item?._id].qty}</span>
                    <button
                      onClick={() =>
                        addOrUpdateItem(
                          {
                            ...item,
                            qty: 0,
                          },
                          1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addOrUpdateItem({
                        ...item,
                        qty: 0,
                      });
                    }}
                    className="text-xs border border-green-600 text-green-700 px-3 py-1 rounded hover:bg-green-50 cursor-pointer"
                  >
                    + Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalCount > 0 && (
        <div
          onClick={() =>
            navigate("/chadhava-cart", {
              state: { chadhavaId: chadhava?._id, slug: chadhava?.slug },
            })
          }
          className="fixed bottom-3 max-w-6xl left-0 right-0 mx-auto rounded-2xl bg-green-700 hover:bg-green-800 text-white px-6 py-4 flex justify-between items-center z-50 cursor-pointer"
        >
          <span className="font-medium">
            {totalCount} Offerings · ₹{totalAmount}
          </span>
          <button className="font-semibold cursor-pointer">Next →</button>
        </div>
      )}

      {selectedOffering && (
        <OfferingModal
          offering={selectedOffering}
          onCancel={closeModal}
          onAdd={(item: any) => {
            addOrUpdateItem({ ...item });
            closeModal();
          }}
        />
      )}

      <FAQs type="chadhava" />
    </section>
  );
}
