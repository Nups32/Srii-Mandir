import { Link } from "react-router-dom";

const poojas = [
  { title: "Ganesh Pooja", desc: "For success & new beginnings" },
  { title: "Maha Mrityunjaya", desc: "Health & long life" },
  { title: "Navgraha Shanti", desc: "Peace & prosperity" },
  { title: "Lakshmi Pooja", desc: "Wealth & abundance" },
];

const Index = () => {
  return (
    <div className="space-y-20">

      {/* HERO SECTION */}
      <section className="bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              Perform Sacred Poojas &  
              <span className="text-orange-600"> Receive Divine Blessings</span>
            </h1>
            <p className="mt-4 text-gray-600">
              Authentic Vedic rituals performed by experienced Sanyasis
              for peace, prosperity, and spiritual growth.
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                to="/pooja"
                className="bg-orange-500 text-white px-6 py-3 rounded-full text-sm hover:bg-orange-600"
              >
                Book Pooja
              </Link>
              <Link
                to="/vedic-science"
                className="border border-orange-500 text-orange-600 px-6 py-3 rounded-full text-sm hover:bg-orange-100"
              >
                Get Guidance
              </Link>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1603625953951-8f6b39d90b5f"
              alt="Mandir"
              className="rounded-xl shadow-md"
            />
          </div>
        </div>
      </section>

      {/* POPULAR POOJA */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Popular Poojas</h2>
          <Link to="/pooja" className="text-orange-600 text-sm">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {poojas.map((p) => (
            <div
              key={p.title}
              className="border rounded-xl p-5 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{p.desc}</p>
              <button className="mt-4 text-orange-600 text-sm font-medium">
                Book Now →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* INSTANT SOLUTIONS */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold">
            Instant Vedic Solutions
          </h2>
          <p className="text-gray-600 mt-2">
            Simple remedies for daily life problems
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {["Career", "Marriage", "Health", "Finance", "Education"].map(
              (item) => (
                <span
                  key={item}
                  className="px-6 py-3 bg-white rounded-full shadow-sm text-sm"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* GURU / MANDIR */}
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <img
          src="https://images.unsplash.com/photo-1588081741555-3a95f2c1bba0"
          alt="Guru"
          className="rounded-xl"
        />
        <div>
          <h2 className="text-2xl font-semibold">
            Shakti Sanyas
          </h2>
          <p className="mt-4 text-gray-600">
            Portfolio of Siddha Sanyasi with 50+ years of experience
            in Vedic Sadhna, guiding devotees on the righteous path.
          </p>
          <Link
            to="/mandir"
            className="inline-block mt-5 text-orange-600 font-medium"
          >
            Know More →
          </Link>
        </div>
      </section>

      {/* MEDIA */}
      <section className="bg-orange-50 py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold">
            Bhajans, Aarti & Live Katha
          </h2>
          <p className="text-gray-600 mt-2">
            Audio & Video devotional content
          </p>

          <Link
            to="/media"
            className="inline-block mt-6 bg-orange-500 text-white px-6 py-3 rounded-full text-sm"
          >
            Explore Media
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white p-10 text-center">
          <h2 className="text-2xl font-semibold">
            Get Your Personalized Vedic Report
          </h2>
          <p className="mt-2 text-orange-100">
            Share your details and receive guidance prepared by experts
          </p>
          <Link
            to="/vedic-science"
            className="inline-block mt-6 bg-white text-orange-600 px-6 py-3 rounded-full text-sm font-medium"
          >
            Start Now
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Index;