import { ProductSection } from "../components/Products/ProductSection";
// import { japMalas, brassIdols, rudraksha } from "../../details";
import { useEffect, useState } from "react";
import { getLatestProducts } from "@/utils/API";
import { message } from "antd";

export default function Products() {

  const [pujaProducts, setPujaProducts] = useState<any>([]);
  const [yantraProducts, setYantraProducts] = useState<any>([]);
  const [rudrakshaProducts, setRudrakshaProducts] = useState<any>([]);
  const [idolProducts, setIdolProducts] = useState<any>([]);
  const [bookProducts, setBookProducts] = useState<any>([]);
  const [spiritualKitProducts, setSpiritualKitProducts] = useState<any>([]);
  // const [dhanBasraPotliProducts, setDhanBasraPotliProducts] = useState<any>([]);
  // const [loading, setLoading] = useState(false);

  // const category = ['puja', 'yantra', 'rudraksha', 'idol', 'book', 'spiritual-kit', 'dhan-basra-potli'];
  const category = [
    { key: 'puja', name: "Puja", subtilt: "Essential Puja Items for Daily Rituals & Festivals", data: pujaProducts },
    { key: 'yantra', name: "Yantra", subtilt: "Sacred Yantras for Prosperity, Protection & Spiritual Growth", data: yantraProducts },
    { key: 'rudraksha', name: "Rudraksha", subtilt: "Authentic Rudraksha Beads for Peace, Power & Positivity", data: rudrakshaProducts },
    { key: 'idol', name: "Idol", subtilt: "Handcrafted Idols for Home & Temple Worship", data: idolProducts },
    { key: 'book', name: "Book", subtilt: "Spiritual & Religious Books for Knowledge and Guidance", data: bookProducts },
    { key: 'spiritual-kit', name: "Spiritual Kit", subtilt: "Complete Spiritual Kits for Puja, Healing & Well-Being", data: spiritualKitProducts },
    // { key: 'dhan-basra-potli', name: "Dhan Basra Potli", subtilt: "Sacred Potli for Wealth, Abundance & Financial Stability", data: dhanBasraPotliProducts }
  ];



  const fetchProducts = async () => {
    // setLoading(true);
    try {
      const response = await getLatestProducts();
      if (response.data.status) {
        console.log("response.data.data", response.data.data);
        // setProducts(response.data.data);
        response.data.data.map((product?: any) => {
          product?.category == "puja" ? setPujaProducts(product?.items) : product?.category == "yantra" ? setYantraProducts(product?.items) : product?.category == "rudraksha" ? setRudrakshaProducts(product?.items) : product?.category == "idol" ? setIdolProducts(product?.items) : product?.category == "book" ? setBookProducts(product?.items) : product?.category == "spiritual-kit" ? setSpiritualKitProducts(product?.items) : null;
        });
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


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

        {category?.map((cat) => (
          cat?.data?.length > 0 && (
            <ProductSection
              title={`${cat.name} Collection`}
              subtitle="For Meditation, Mantra Jaap & Spiritual Discipline"
              products={cat.data}
              link={`/products/category/${cat.key}`}
            />)
        ))}

        {/* JAP MALA */}
        {/* <ProductSection
          title="Jap Mala Collection"
          subtitle="For Meditation, Mantra Jaap & Spiritual Discipline"
          products={japMalas}
          link="/products/jap-mala"
        /> */}

        {/* BRASS IDOLS */}
        {/* <ProductSection
          title="Brass God Idols"
          subtitle="Handcrafted Idols for Home & Temple Worship"
          products={brassIdols}
          link="/products/brass-idols"
        /> */}

        {/* RUDRAKSHA */}
        {/* <ProductSection
          title="Rudraksha Collection"
          subtitle="Authentic & Spiritually Energized Rudraksha Beads"
          products={rudraksha}
          link="/products/rudraksha"
        /> */}
      </div>
    </section>
  );
}
