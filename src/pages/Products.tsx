import { ProductSection } from "./ProductSection";
import { japMalas, brassIdols, rudraksha } from "../../details";

export default function Products() {
  return (
    <section className="bg-[#FAF7F2] min-h-screen">
      <div className=" mx-auto px-6 py-14 space-y-20">

        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900">
            Sacred Devotional Collections
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Discover spiritually energized products crafted for worship,
            meditation, and divine connection.
          </p>
        </div>

        {/* JAP MALA */}
        <ProductSection
          title="Jap Mala Collection"
          subtitle="For Meditation, Mantra Jaap & Spiritual Discipline"
          products={japMalas}
          link="/jap-mala"
        />

        {/* BRASS IDOLS */}
        <ProductSection
          title="Brass God Idols"
          subtitle="Handcrafted Idols for Home & Temple Worship"
          products={brassIdols}
          link="/brass-idols"
        />

        {/* RUDRAKSHA */}
        <ProductSection
          title="Rudraksha Collection"
          subtitle="Authentic & Spiritually Energized Rudraksha Beads"
          products={rudraksha}
          link="/rudraksha"
        />
      </div>
    </section>
  );
}
