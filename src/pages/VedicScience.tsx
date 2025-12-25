import { ArrowRight } from "lucide-react";
import nakshtra from "../assets/nakshtra.jpg";
import { useNavigate } from "react-router-dom";

export default function VedicScience() {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-4xl mb-14">
          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
            Free Astrology Calculators
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Vedic astrology is an ancient science rooted in the wisdom of the
            Vedas. By analyzing planetary positions at the time of birth, it
            offers deep insights into one's life path. Our free astrology
            calculators help you explore your Nakshatra, Rashi, and astrological
            profile with accuracy and authenticity.
          </p>
        </div>

        {/* Tools / Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Nakshatra Finder */}
          <div className="group border border-gray-200 rounded-2xl p-10 flex justify-between items-center transition-all hover:shadow-lg hover:border-purple-200">
            <div>
              <h3 className="text-2xl font-semibold text-purple-700 mb-3">
                Horoscope / Janam Kundli
              </h3>

              <p className="text-gray-600 mb-8 max-w-xs">
                Generate your personalized Horoscope (Janam Kundli) and explore how planetary
                positions influence your life, destiny, and future path.
              </p>


              <button
                onClick={() => navigate("/nakshtra-finder")}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600 text-white! transition-transform group-hover:translate-x-1 cursor-pointer"
              >
                <ArrowRight size={20} />
              </button>
            </div>

            <img
              src={nakshtra}
              alt="Nakshatra Finder"
              className="w-50 h-50 object-fit"
            />
          </div>

          {/* janma rashi finder */}
          <div className="group border border-gray-200 rounded-2xl p-10 flex justify-between items-center transition-all hover:shadow-lg hover:border-purple-200">
            <div>
              <h3 className="text-2xl font-semibold text-purple-700 mb-3">
                Janam Rashi Finder 
              </h3>

              <p className="text-gray-600 mb-8 max-w-xs">
                Generate your personalized Horoscope (Janam Kundli) and explore how planetary
                positions influence your life, destiny, and future path.
              </p>


              <button
                onClick={() => navigate("/janam-rashi-finder")}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600 text-white! transition-transform group-hover:translate-x-1 cursor-pointer"
              >
                <ArrowRight size={20} />
              </button>
            </div>

            <img
              src={nakshtra}
              alt="Nakshatra Finder"
              className="w-50 h-50 object-fit"
            />
          </div>

          {/* Future card placeholder */}
          <div className="border border-dashed border-gray-200 rounded-2xl p-10 flex items-center justify-center text-gray-400 text-sm">
            More Vedic calculators coming soon
          </div>
        </div>

        {/* Trust / Value Points */}
        <div className="grid md:grid-cols-3 gap-10 m-20!">
          <div className="text-center p-4 border border-gray-200 rounded-2xl shadow">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Rooted in Vedic Wisdom
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Built on time-tested Vedic astrology principles followed by
              learned astrologers for generations.
            </p>
          </div>

          <div className="text-center p-4 border border-gray-200 rounded-2xl shadow">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Accurate & Instant
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Powered by precise astronomical calculations to deliver instant
              and reliable results.
            </p>
          </div>

          <div className="text-center p-4 border border-gray-200 rounded-2xl shadow">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Free & Accessible
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Access essential astrology tools without registration or cost.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
