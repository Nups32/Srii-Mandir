import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";

// import slide1 from "../assets/Home/1.jpg";
// import slide2 from "../assets/Home/2.jpg";
// import slide3 from "../assets/Home/3.jpg";
// import slide4 from "../assets/Home/4.jpg";

// import puja1 from "../assets/Home/1.jpg";
// import puja2 from "../assets/Home/1.jpg";
// import puja3 from "../assets/Home/1.jpg";
import ReviewsRatings from "@/components/Reviews";
import StatsGrid from "@/components/StatsGrid";
import { useEffect, useState } from "react";
import { getPooja } from "@/utils/API";
import { message } from "antd";

// const pujas = [
//   {
//     title: "Ganesh Puja",
//     desc: "For success & new beginnings",
//     image: puja1,
//     label: "Ganesh Special",
//     temple: "Shri Ganesh Mandir, Pune, Maharashtra",
//     date: "12 January, Friday, Magha Krishna",
//   },
//   {
//     title: "Maha Mrityunjaya",
//     desc: "Health & long life",
//     image: puja2,
//     label: "Maha Mrityunjaya Special",
//     temple: "Shri Mahadev Temple, Ujjain, Madhya Pradesh",
//     date: "20 December, Saturday, Pausha Krishna",
//   },
//   {
//     title: "Navgraha Shanti",
//     desc: "Peace & prosperity",
//     image: puja3,
//     label: "Navgraha Special",
//     temple: "Shri Navgrah Shani Temple, Ujjain, Madhya Pradesh",
//     date: "25 December, Monday, Pausha Krishna",
//   },
// ];

const Index = () => {
  // const images = [slide1, slide2, slide3, slide4];

  // const slides = [
  //   {
  //     image: slide1,
  //     title: "Special Puja with Srii Mandir",
  //     description:
  //       "Worship your deities at home and receive their divine blessings — only on Srii Mandir.",
  //     buttonText: "Explore Now",
  //     buttonLink: "/puja",
  //   },
  //   {
  //     image: slide2,
  //     title: "Srii Mandir",
  //     description:
  //       "Experience divine blessings from sacred temples of India — enjoy online darshan, horoscope, prasad, stories, mantras, and a lot more. Exclusively on Srii Mandir.",
  //     buttonText: "Explore",
  //     buttonLink: "/puja",
  //   },
  //   {
  //     image: slide3,
  //     title: "Srii Mandir Special Chadhava",
  //     description:
  //       "Now offer your prayers and sacred offerings to your beloved deities at renowned temples across India — from your home. Seek divine blessings on Srii Mandir.",
  //     buttonText: "Offer Chadhava",
  //     buttonLink: "/chadhava",
  //   },
  //   {
  //     image: slide4,
  //     title: "Srii Mandir Special Puja",
  //     description:
  //       "Invoke peace, prosperity, and happiness for your family through online pujas at India’s sacred temples — from the comfort of your home.",
  //     buttonText: "Book Puja",
  //     buttonLink: "/puja",
  //   },
  // ];

  const [, setLoading] = useState(false);
  const [poojas, setPoojas] = useState<any[]>([]);

  const fetchPooja = async () => {
    setLoading(true);
    try {
      const response: any = await getPooja();
      // console.log("res from fetchpooja", response)
      if (response?.data?.status) {
        // setPoojas(response.data.data);
        const poojas = response?.data?.data || [];
        setPoojas(poojas.slice(0, 3));
      } else {
        message.error("failed to fetch poojas");
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPooja();
  }, []);

  return (
    <>
      <main className="">
        {/* hero image slider */}
        <section className="relative">
          <HeroSlider type="home" />
        </section>

        {/* marquee section */}
        <div className="marquee-container">
          <div className="marquee-content">
            <span>आनंद की यात्रा</span>
            <span>•</span>
            <span>आनंद की यात्रा</span>
            <span>•</span>
            <span>आनंद की यात्रा</span>
            <span>•</span>
            <span>आनंद की यात्रा</span>
            {/* <span>•</span> */}
            {/* <span>Faith of 30 million+ devotees</span>
            <span>•</span>
            <span>100% Secure</span>
            <span>•</span>
            <span>India's Largest place for Hindu Devotees</span> */}
          </div>
        </div>

        {/* popular pujas */}
        <section className="max-w-7xl mx-auto px-4 mt-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl md:text-4xl text-purple-400 flex justify-center items-center font-semibold text-center sm:text-left">
              Special Pujas
            </h2>
            <Link
              to="/puja"
              className="text-orange-600 text-sm font-medium hover:underline"
            >
              View All -&gt;
            </Link>
          </div>

          <div>
            <p className="my-4 text-black/70 text-sm md:text-xl">
              Close 2025 with faith - get special year-end pujas performed in
              your name at India's powerful temples and begin 2026 with peace
              and protection.
            </p>
          </div>

          {/* Puja Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
            {/* {pujas.map((puja) => ( */}
            {poojas?.map((puja) => (
              <div key={puja?.title} className="bg-white flex flex-col justify-between rounded-2xl p-4 border border-gray-200 hover:shadow-sm transition" >
                {/* Image Banner */}
                <div>
                  <div className="relative">
                    <img src={`${import.meta.env.VITE_APP_Image_URL}/pooja/${puja?.images?.[0]}`} alt={puja?.title} className="w-full h-60 object-cover rounded-lg" />
                    {/* <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
                    {puja?.label}
                  </span> */}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-semibold text-lg mt-3">{puja?.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{puja?.to}</p>

                  {/* Temple & Date */}
                  <div className="mt-3 flex flex-col gap-1 text-gray-500 text-xs">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-orange-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zm0 7v13l-10-5V9l10 5 10-5v8l-10 5z" />
                      </svg>
                      <span>{puja?.place}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-orange-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7 10h5v5H7zM3 4h18v18H3V4zm2 2v14h14V6H5z" />
                      </svg>
                      <span>{puja?.date}</span>
                    </div>
                  </div>
                </div>

                {/* Participate Button */}
                <Link
                  to="/puja" className="w-50 inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
                >
                  PARTICIPATE →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* instant solutions */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold">Instant Vedic Solutions</h2>
            <p className="text-gray-600 mt-2">
              Simple remedies for daily life problems
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {["Career", "Marriage", "Health", "Finance", "Education"].map(
                (item) => (
                  <span
                    key={item}
                    className="px-6 py-3 bg-white rounded-full shadow-sm text-sm font-medium"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        {/* media */}
        <section className="bg-orange-50 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold">
              Bhajans, Aarti & Live Katha
            </h2>
            <p className="text-gray-600 mt-2">
              Audio & Video devotional content
            </p>

            <Link
              to="/media"
              className="inline-block mt-6 bg-orange-400 text-white px-8 py-3 rounded-full text-sm font-medium"
            >
              Explore Media
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 pb-24">
          <div className="bg-linear-to-r from-orange-400 to-orange-400 rounded-3xl text-white p-12 text-center">
            <h2 className="text-2xl font-semibold">
              Get Your Personalized Vedic Report
            </h2>
            <p className="mt-3 text-orange-100">
              Share your details and receive guidance prepared by experts
            </p>

            <Link
              to="/vedic-science"
              className="inline-block mt-8 bg-white text-orange-400 px-8 py-3 rounded-full text-sm font-semibold"
            >
              Start Now
            </Link>
          </div>
        </section>

        <ReviewsRatings />
        <StatsGrid />
      </main>
    </>
  );
};

export default Index;
