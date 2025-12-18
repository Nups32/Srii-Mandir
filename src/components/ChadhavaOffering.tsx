import { useState } from "react";
import { chadhavaData } from "../../details";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ChadhavaOffering() {
  const [current, setCurrent] = useState(0);
  const images = chadhavaData.images;

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      {/* top section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* left image slider */}
        <div className="relative rounded-xl overflow-hidden shadow">
          <img
            src={images[current]}
            alt="Chadhava"
            className="w-full h-[260px] object-cover"
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
        {/* RIGHT CONTENT */}
        <div className="flex flex-col justify-start">
          {/* Title */}
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

          {/* Trust / Participation Text (SriMandir-style) */}
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
          {chadhavaData.offering.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between gap-4 p-4
                ${
                  item.isSpecialCombo
                    ? "bg-pink-50 border border-pink-200 rounded-lg"
                    : item.isPrasadForHome
                    ? "bg-orange-50 border border-orange-200 rounded-lg"
                    : "border-b border-gray-200"
                }
              `}
            >
              {/* left */}
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

                <h3 className="mt-2 text-sm font-semibold text-gray-900">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-600 mt-1">{item.description}</p>

                <p className="text-green-600 font-semibold mt-2">
                  ₹{item.price}
                </p>
              </div>

              {/* right */}
              <div className="flex flex-col justify-center items-center gap-2">
                {/* <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain rounded"
                /> */}

                <button className="text-xs border border-green-600 text-green-700 px-3 py-1 rounded hover:bg-green-50">
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
