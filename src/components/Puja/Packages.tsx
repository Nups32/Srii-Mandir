import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { data } from "../../../details";

export default function Packages() {
  return (
    <section id="packages" className=" py-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8!">Puja Packages</h2>

        {/* Packages Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left!">
          {data.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Package Header */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2!">
                  {pkg.title}
                </h3>
                <p className="text-gray-500 mb-4">{pkg.person}</p>
                <p className="text-2xl font-bold text-orange-600 mb-6!">
                  ₹{pkg.price}
                </p>
              </div>

              {/* Services List */}
              <ul className="text-gray-600 mb-6! space-y-3">
                {pkg.services.map((service, index) => (
                  <li key={index} className="flex items-start! justify-start! gap-3">
                    <CheckIcon className="w-5 h-5 text-orange-600 shrink-0 mt-1" />
                    <p className="leading-relaxed w-full text-left">{service}</p>
                  </li>
                ))}
              </ul>

              {/* Participate Button */}
              <button className="mt-auto bg-orange-600 text-white! font-semibold px-6 py-3 rounded-xl w-full flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors duration-300 cursor-pointer">
                Book Now
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
