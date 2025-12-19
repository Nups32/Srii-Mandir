import { pujaData } from "../../../details";

export default function Temple() {
  const puja = pujaData[0];
  const { name, image, description } = puja.templeDetails;

  return (
    <section id="temple" className="bg-gray-50 rounded-2xl py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        {/* <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Temple Details
        </h2> */}

        <h3 className="text-2xl font-semibold text-gray-900 mb-4!">{name}</h3>
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Temple Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Temple Info */}
          <div>
            <p className="text-gray-600 leading-relaxed">{description}</p>

            {/* Optional Location */}
            {/* {puja.location && (
              <p className="mt-4 text-sm text-gray-500">
                {puja.location}
              </p>
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
}
