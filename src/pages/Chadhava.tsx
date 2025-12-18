import { ChevronLeft, ChevronRight, CircleCheck } from "lucide-react";
import chadhavaHome from "../assets/Chadhava/img_chadhava_web_banner.jpg";
import { chadhavaData } from "../../details";
import chadhava1 from "../assets/Chadhava/home.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Chadhava() {
  const [currentWorkSlide, setCurrentWorkSlide] = useState(0);
  const navigate = useNavigate();

  const features = [
    "Divine Blessings through Chadhava.",
    "Vedic Rituals Performed by Purohit ji.",
    "Offer Chadhava from Anywhere.",
    "Receive Chadhava Video in 2-3 days.",
  ];

  const chadhavaWorkSlides = [chadhava1, chadhava1, chadhava1];

  const chadhavaWork = [
    {
      step: 1,
      title: "Choose the event",
      desc: "Choose your Chadhava at your favourite temple",
    },
    {
      step: 2,
      title: "Your Name",
      desc: "After selecting the Chadhava, Fill in your name in the required field.",
    },
    {
      step: 3,
      title: "Chadhava Video",
      desc: "The video of your Chadhava completed with your name will be shared here.",
    },
  ];

  const nextWorkSlide = () => {
    setCurrentWorkSlide((prev) => (prev + 1) % chadhavaWorkSlides.length);
  };

  const prevWorkSlide = () => {
    setCurrentWorkSlide(
      (prev) =>
        (prev - 1 + chadhavaWorkSlides.length) % chadhavaWorkSlides.length
    );
  };

  return (
    <section className="bg-gradient-to-br from-[#FFF5EB] to-white py-16">
      <div className="max-w-7xl mx-auto px-4 lg:flex lg:items-center lg:gap-16">
        {/* Left Column */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-relaxed">
            Offer Chadhava as per Vedic rituals at sacred Hindu Pilgrimages and
            Temples in India through Dev Puja from anywhere in the world!
          </h1>

          {/* Feature List */}
          <ul className="space-y-4 mb-8">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700">
                <CircleCheck className="w-5 h-5 mt-1 text-orange-500 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="bg-green-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-800 transition-colors cursor-pointer">
              View Now
            </button>
            <button className="border border-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              How It works?
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
          <img
            src={chadhavaHome}
            alt="Chadhava Illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Upcoming Chadhava Offerings on Dev Puja.
        </h2>
        <p className="text-gray-700 font-semibold text-lg">
          Experience the divine with Dev Puja Chadhava Seva. Offer Chadhava at
          renowned temples across India, receiving blessings and a video
          recording of the ceremony performed by our Purohit ji on your behalf.
        </p>
      </div>

      {/* Puja Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chadhavaData.images.slice(0, 3).map((img, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
            >
              {/* Image Banner */}
              <div className="relative h-45">
                <img
                  src={img}
                  alt={chadhavaData.title}
                  className="w-full h-full object-cover"
                />

                {/* Ribbon Badge */}
                {/* <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md">
                      2025 Last Amavasya
                    </span> */}
              </div>

              {/* Card Content */}
              <div className="flex flex-col grow px-5 py-6">
                <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-3 line-clamp-3">
                  {chadhavaData.title}
                </h3>

                <p className="text-sm font-medium text-gray-900 mb-3">
                  {chadhavaData.time}
                </p>

                <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-5">
                  {chadhavaData.description}
                </p>

                <button onClick={() => navigate("/offering")} className="mt-auto w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2">
                  {chadhavaData.btnText}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* journey section */}
      <section className="max-w-7xl mx-auto px-4 pt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Start your Sacred Journey with Dev Puja Chadhava Service
        </h2>
        <p className="text-xl mb-8">
          Why make offerings through Dev Puja Chadhava Seva?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-purple-100 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold text-indigo-600">28657</h3>
            <p className="text-indigo-600 mt-2">Sindoor offerings</p>
          </div>
          <div className="bg-orange-100 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold text-orange-600">9467</h3>
            <p className="text-orange-600 mt-2">Hanuman Bhog offerings</p>
          </div>
          <div className="bg-blue-100 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold text-blue-600">5231</h3>
            <p className="text-blue-600 mt-2">Ramayan Path bookings</p>
          </div>
        </div>
      </section>

      {/* how chadhava works */}
      <section className="max-w-7xl mx-auto px-4 pt-8">
        <h2 className="text-4xl font-bold text-gray-900 my-10">
          How does Dev Puja Online Chadhava Works?
        </h2>
        <div className="border text-gray-300 w-full h-0 mb-10" />
          
        <div className="lg:flex lg:items-start lg:gap-12">
          {/* Left Steps */}
          <div className="lg:w-1/2 space-y-6">
            {chadhavaWork.map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* right image slider */}
          <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center relative">
            <img
              src={chadhavaWorkSlides[currentWorkSlide]}
              alt={`Puja Work ${currentWorkSlide + 1}`}
              className="w-full h-80 md:h-[400px] object-cover rounded-xl"
            />

            {/* Prev / Next Buttons */}
            <button
              onClick={prevWorkSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextWorkSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
