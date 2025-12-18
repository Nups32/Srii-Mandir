import { Link } from "react-router-dom";

const ShaktiSanyas = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1588081741555-3a95f2c1bba0"
          alt="Guru"
          className="rounded-2xl shadow-md"
        />
        <div>
          <h2 className="text-2xl font-semibold">Shakti Sanyas</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Portfolio of Siddha Sanyasi with 50+ years of experience in Vedic
            Sadhna, guiding devotees on the righteous path.
          </p>

          <Link
            to="/shakti-sanyans"
            className="inline-block mt-6 text-orange-600 font-medium"
          >
            Know More →
          </Link>
        </div>
      </section>
    </>
  );
};

export default ShaktiSanyas;
