/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { chadhavaData } from "../../details";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OfferingModal from "./OfferingModal";
import FAQs from "./FAQs";
import { useNavigate } from "react-router-dom";

type Offer = {
  id: string;
  name: string;
  price: number;
};

type CartItem = Offer & { qty: number };
// type Cart = Record<string, CartItem>;

export default function ChadhavaOffering() {
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [current, setCurrent] = useState(0);
  const images = chadhavaData.images;
  const [, setIsModalOpen] = useState(false);
  const [selectedOffering, setSelectedOffering] = useState(null);
  const naviagte = useNavigate();

  const addOffer = (item: any) => {
  setCart((prev) => {
    const existing = prev[item.id];

    return {
      ...prev,
      [item.id]: {
        id: item.id,
        name: item.name,  
        price: item.price,
        qty: existing ? existing.qty + 1 : 1,
      },
    };
  });
};

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const item = prev[id];
      if (!item) return prev;

      const newQty = item.qty + delta;

      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }

      return {
        ...prev,
        [id]: { ...item, qty: newQty },
      };
    });
  };

  // for bottom bar
  const totalCount = Object.values(cart).reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const totalAmount = Object.values(cart).reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  useEffect(() => {
    console.log("CART:", cart);
  }, [cart]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openModal = (item: any) => {
    setSelectedOffering(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOffering(null);
  };

  // const handleAddOffering = () => {
  //   // TODO: add to cart / checkout logic
  //   console.log("Added:", selectedOffering);
  //   closeModal();
  // };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      {/* top section */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* left image slider */}
        <div className="relative rounded-xl overflow-hidden shadow">
          <img
            src={images[current]}
            alt="Chadhava"
            className="w-full h-65 object-cover"
          />

          {/* Slider Controls */}
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

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i === current ? "bg-orange-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* right content */}
        <div className="flex flex-col justify-start">
          {/* name */}
          <h1 className="text-2xl font-semibold text-gray-900 leading-snug">
            {chadhavaData.name}
          </h1>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            {chadhavaData.about}
          </p>

          {/* Details / Bullet Points */}
          <div className="mt-4 space-y-2">
            {chadhavaData.details.map((item, index) => (
              <div key={index} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                <div className="text-sm text-gray-700">
                  <p className="font-medium">{item.question}</p>{" "}
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-gray-700">
            Till now{" "}
            <span className="font-semibold text-orange-600">
              1,50,000+ devotees
            </span>{" "}
            have participated in this Chadhava.
          </p>

          {/* Date */}
          {/* <p className="mt-3 text-sm text-gray-500">{chadhavaData.time}</p> */}
        </div>
      </div>

      {/* offering section */}
      <div className="mt-10">
        <h2 className="text-3xl font-semibold mb-4">Choose an offering</h2>

        <div className="space-y-4">
          {chadhavaData.offering.map((item) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className={`flex justify-between gap-4 p-4 cursor-pointer
                ${
                  item.isSpecialCombo
                    ? "bg-pink-50 border border-pink-200 rounded-lg"
                    : item.isPrasadForHome
                    ? "bg-orange-50 border border-orange-200 rounded-lg"
                    : "border-b border-gray-200"
                }
              `}
            >
              {/* left part */}
              <div className="flex-1">
                {item.isSpecialCombo && (
                  <span className="text-xs font-semibold text-pink-600 bg-pink-100 px-2 py-0.5 rounded">
                    Special Combo Chadhava
                  </span>
                )}

                {item.isPrasadForHome && (
                  <span className="ml-2 text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
                    Prasad for home
                  </span>
                )}

                <h3 className="my-3! text-sm font-semibold text-gray-900">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-600">{item.description}</p>

                <p className="text-green-600 font-semibold mt-2">
                  ₹{item.price}
                </p>
              </div>

              {/* add btn with image */}
              <div className="flex flex-col justify-center items-center gap-2">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                ) : (
                  ""
                )}
                {cart[item.id] ? (
                  <div
                    className="flex items-center gap-2 bg-green-600 text-white rounded-md px-2 py-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button onClick={() => updateQty(item.id, -1)}>−</button>
                    <span>{cart[item.id].qty}</span>
                    <button onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addOffer(item);
                    }}
                    className="text-xs border border-green-600 text-green-700 px-3 py-1 rounded hover:bg-green-50"
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
          onClick={() => naviagte("/chadhava-cart", { state: { cart } })}
          className="fixed bottom-3 max-w-6xl left-0 right-0 mx-auto rounded-2xl bg-green-700 hover:bg-green-800 text-white px-6 py-4 flex justify-between items-center z-50 cursor-pointer"
        >
          <span className="font-medium">
            {totalCount} Offerings · ₹{totalAmount}
          </span>

          <button className="font-semibold">Next →</button>
        </div>
      )}

      {/* offering modal */}
      {/* {isModalOpen && (
        <OfferingModal
          offering={selectedOffering}
          onCancel={closeModal}
          onAdd={handleAddOffering}
        />
      )} */}

      {selectedOffering && (
        <OfferingModal
          offering={selectedOffering}
          onCancel={closeModal}
          onAdd={(item: Offer) => {
            addOffer(item);
            closeModal();
          }}
        />
      )}

      <FAQs type="chadhava" />
    </section>
  );
}
