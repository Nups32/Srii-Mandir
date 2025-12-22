import { ProductSection } from "./ProductSection";

type Product = {
  id: number;
  name: string;
  image: string;
  price: string;
  tag?: string;
};

const japMalas: Product[] = [
  {
    id: 1,
    name: "Tulsi Jap Mala (108 Beads)",
    image: "/images/jap/tulsi-mala.jpg",
    price: "₹899",
    tag: "Best for Daily Jaap",
  },
  {
    id: 2,
    name: "Sandalwood Jap Mala",
    image: "/images/jap/sandalwood-mala.jpg",
    price: "₹1,299",
  },
  {
    id: 3,
    name: "Rudraksha Jap Mala",
    image: "/images/jap/rudraksha-mala.jpg",
    price: "₹2,499",
    tag: "Certified",
  },
];

const brassIdols: Product[] = [
  {
    id: 1,
    name: "Brass Ganesh Idol",
    image: "/images/brass/ganesh.jpg",
    price: "₹3,999",
  },
  {
    id: 2,
    name: "Brass Lakshmi Idol",
    image: "/images/brass/lakshmi.jpg",
    price: "₹4,499",
  },
  {
    id: 3,
    name: "Brass Shiva Idol",
    image: "/images/brass/shiva.jpg",
    price: "₹5,999",
    tag: "Temple Quality",
  },
];

const rudraksha: Product[] = [
  {
    id: 1,
    name: "5 Mukhi Rudraksha",
    image: "/images/rudraksha/5-mukhi.jpg",
    price: "₹1,999",
  },
  {
    id: 2,
    name: "7 Mukhi Rudraksha",
    image: "/images/rudraksha/7-mukhi.jpg",
    price: "₹3,999",
    tag: "Nepali",
  },
  {
    id: 3,
    name: "Gauri Shankar Rudraksha",
    image: "/images/rudraksha/gauri-shankar.jpg",
    price: "₹6,999",
    tag: "Rare",
  },
];

export default function DevotionalProductsPage() {
  return (
    <section className="bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-14 space-y-20">

        {/* PAGE HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900">
            Sacred Devotional Collections
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Discover spiritually energized products crafted for worship,
            meditation, and divine connection.
          </p>
        </div>

        {/* JAP MALA SECTION */}
        <ProductSection
          title="Jap Mala Collection"
          subtitle="For Meditation, Mantra Jaap & Spiritual Discipline"
          products={japMalas}
          link="/jap-mala"
        />

        {/* BRASS IDOLS SECTION */}
        <ProductSection
          title="Brass God Idols"
          subtitle="Handcrafted Idols for Home & Temple Worship"
          products={brassIdols}
          link="/brass-idols"
        />

        {/* RUDRAKSHA SECTION */}
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
