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
import { getHeroSectionByType, getMediaByType, getPooja } from "@/utils/API";
import { message, Modal } from "antd";
import { getYouTubeEmbedUrl } from "@/utils/Helper";

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
  const [templeDarshan, setTempleDarshan] = useState<any[]>([]);
  const [wallpaper, setWallpaper] = useState<any[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [type, setType] = useState("");
  const [activeData, setActiveData] = useState<any>(null);

  const openPreview = (item: any, type: string) => {
    // setActiveVideo(item);
    setActiveData(item);
    setPreviewOpen(true);
    setType(type);
  };

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

  const fetchLiveTempleDarshn = async () => {
    setLoading(true);
    try {
      const response: any = await getMediaByType("live-temple-darshan");
      if (response?.data?.status) {
        const poojas = response?.data?.data || [];
        setTempleDarshan(poojas.slice(0, 2));
      } else {
        message.error("failed to fetch poojas");
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWallpaper = async () => {
    setLoading(true);
    try {
      const response: any = await getHeroSectionByType("wallpaper");
      if (response?.data?.status) {
        const poojas = response?.data?.data || [];
        setWallpaper(poojas.slice(0, 2));
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
    fetchLiveTempleDarshn();
    fetchWallpaper();
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
            <span>आनंद की यात्रा</span><span>•</span><span>Anand Ki Yatra</span><span>•</span>
            <span>आनंद की यात्रा</span><span>•</span><span>Anand Ki Yatra</span><span>•</span>
            <span>आनंद की यात्रा</span><span>•</span><span>Anand Ki Yatra</span>
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

        {/* Daily Spiritual Guidance */}
        <section className="bg-gradient-to-b from-orange-50 via-white to-purple-50 py-20">
          <div className="max-w-[1500px] mx-auto px-4">

            {/* Section Header */}
            <div className="text-center mb-14">
              <h2 className="text-4xl font-extrabold text-gray-900">
                Daily Spiritual Guidance
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
                Stay spiritually connected every day through sacred live temple darshan
                and divine wallpapers that fill your life with peace, devotion, and
                positive energy.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* <div className="flex gap-5"> */}

              {/* Live Temple Darshan */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-orange-700 flex items-center gap-2">
                    🔴 Live Temple Darshan
                  </h3>
                  <a
                    href="/live-darshan"
                    className="text-sm font-medium text-orange-600 hover:underline"
                  >
                    View All →
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
                  {templeDarshan.length > 0 ? (
                    templeDarshan.map((item) => (
                      // darshan.length > 0 ? (
                      // darshan.map((item: any) => (
                      <div
                        key={item?._id}
                        onClick={() => openPreview(item, 'darshan')}
                        className="cursor-pointer bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
                      >
                        <div className="relative aspect-video">
                          <iframe
                            src={getYouTubeEmbedUrl(item?.url)}
                            title={item?.title}
                            frameBorder="0"
                            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                            className="absolute inset-0 w-full h-full pointer-events-none"
                          />
                        </div>

                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {item?.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Tap to watch in full screen
                          </p>
                        </div>
                      </div>
                      // ))
                      // ) : (
                      //   <p className="text-center text-gray-500 col-span-full">
                      //     Live darshan will be available soon.
                      //   </p>
                      // )
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Live darshan will be available soon.
                    </p>
                  )}
                </div>
              </div>

              {/* Divine Wallpapers */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-purple-700 flex items-center gap-2">
                    🌸 Divine Wallpapers
                  </h3>
                  <a
                    href="/wallpapers"
                    className="text-sm font-medium text-purple-600 hover:underline"
                  >
                    View All →
                  </a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-5">
                  {wallpaper.length > 0 ? (
                    wallpaper.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => openPreview(index, 'wallpaper')}
                        className="group rounded-xl overflow-hidden shadow hover:shadow-xl transition bg-white"
                      >
                        <div className="relative w-full h-[200px]">
                          <img
                            src={`${import.meta.env.VITE_APP_Image_URL}/hero-section/${item?.image}`}
                            alt={item?.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
                        </div>

                        <div className="p-3 text-center">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {item?.title}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Wallpapers will be available soon.
                    </p>
                  )}
                </div>
              </div>

            </div>
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
      {/* Video Modal */}
      <Modal
        open={previewOpen}
        onCancel={() => { setPreviewOpen(false); setActiveData(null); }}
        footer={null}
        centered
        width="80%"
        destroyOnClose
      >
        {type === "darshan" ?
          activeData && (
            <div className="relative w-full aspect-video">
              <iframe
                src={`${getYouTubeEmbedUrl(activeData?.url)}?autoplay=1`}
                title={activeData?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-lg"
              />
            </div>
          )
          : (
            <div key={"index"} className="flex justify-center">
              <img
                src={`${import.meta.env.VITE_APP_Image_URL}/hero-section/${wallpaper?.[activeData]?.image}`}
                className="max-h-[80vh] object-contain mx-auto rounded-lg"
              />
            </div>
          )
        }
      </Modal>
    </>
  );
};

export default Index;