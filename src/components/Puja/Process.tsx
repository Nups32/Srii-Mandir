import { pujaData } from "../../../details";

export default function Process() {
  const puja = pujaData[0];

  return (
    <section id="process">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Puja Process</h2>

        {/* Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {puja.process.map((item) => (
            <div
              key={item.step}
              className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition "
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-6 ">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold text-lg">
                  {item.step}
                </div>
              </div>

              {/* Content */}
              <h4 className="mt-6 text-lg font-semibold text-gray-900">
                {item.title}
              </h4>

              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
