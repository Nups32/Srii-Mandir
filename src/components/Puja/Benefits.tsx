import { pujaData } from "../../../details";
import pujaBenefitsLogo from "../../assets/Puja/pujaBenefits.jpg";

export default function Benefits() {
  const puja = pujaData[0];

  if (!puja || !puja.benefitText?.length) return null;

  return (
    <section
      id="benefits"
      className="scroll-mt-32 py-12 max-w-7xl mx-auto px-4"
    >
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Puja Benefits
      </h2>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {puja.benefitText.map((item, index) => (
          <div
            key={index}
            className="flex gap-4"
          >
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <img
                  src={pujaBenefitsLogo}
                  alt="Benefit Icon"
                  className="w-5 h-5"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                {item.description}
              </p>

              {/* <button className="text-sm text-orange-500 font-medium hover:underline">
                Read more
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
