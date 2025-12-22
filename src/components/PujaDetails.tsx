/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  MapPin,
  Calendar,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ReviewsRatings from "./Reviews";
import slide1 from "../assets/Home/1.jpg";
import { pujaData } from "../../details";
import FAQs from "./FAQs";
import AboutPuja from "./Puja/AboutPuja";
import Benefits from "./Puja/Benefits";
import Process from "./Puja/Process";
import Temple from "./Puja/Temple";
import Packages from "./Puja/Packages";
import UserReviews from "./UserReview";
import { useParams } from "react-router-dom";
import { getPoojaBySlug } from "@/utils/API";
import { message } from "antd";

const PujaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState("about-puja");
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [slide1, slide1, slide1, slide1];
  const [, setLoading] = useState(true);
  const [pooja, setPooja] = useState<any>();


  const fetchProduct = async () => {
    setLoading(true);
    try {
      if (slug) {
        const response = await getPoojaBySlug(slug || "");
        if (response.data.status) {
          setPooja(response.data.data);
        }
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const tabs = [
    { name: "About Puja", id: "about-puja" },
    { name: "Benefits", id: "benefits" },
    { name: "Process", id: "process" },
    { name: "Temple Details", id: "temple" },
    { name: "Packages", id: "packages" },
    { name: "Reviews", id: "reviews" },
    { name: "FAQs", id: "faqs" },
  ];

  // const ScrollTabs = ({ tabs }: Props) => {
  //   const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         console.log("entry.target.id:", entry.target.id);
  //         if (entry.isIntersecting) {
  //           setActiveTab(entry.target.id);
  //         }
  //       });
  //     },
  //     {
  //       root: null,
  //       rootMargin: "-50% 0px -50% 0px",
  //       threshold: 0,
  //     }
  //   );

  //   tabs.forEach((tab) => {
  //     const el = document.getElementById(tab.id);
  //     if (el) observer.observe(el);
  //   });

  //   return () => observer.disconnect();
  // }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        root: null,
        // rootMargin: "-50% 0px -50% 0px", // center of screen
        rootMargin: "-20% 0px -90% 0px", // center of screen
        threshold: 0,
      }
    );

    tabs.forEach((tab) => {
      const el = document.getElementById(tab.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tabs]);



  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           setActiveTab(entry.target.id);
  //         }
  //       });
  //     },
  //     {
  //       root: null,
  //       rootMargin: "-30% 0px -60% 0px",
  //       threshold: 0,
  //     }
  //   );

  //   tabs.forEach((tab) => {
  //     const el = document.getElementById(tab.id);
  //     if (el) observer.observe(el);
  //   });

  //   return () => observer.disconnect();
  // }, []);


  // const handleClick = (tabId: string) => {
  //   setActiveTab(tabId);
  //   document.getElementById(tabId)?.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //   });
  // };
  const handleClick = (tabId: string) => {
    setActiveTab(tabId);

    const element = document.getElementById(tabId);
    if (!element) return;

    const offset = 100; // 👈 adjust this value (px)
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
  };


  // }

  // const heroSlides = [
  //   {
  //     id: 1,

  //     title:
  //       "Laxmi Puja Bagalamukhi Puja and 1,25,000 Aghori Shabar Mantra Jap",
  //     subtitle: "Experience divine blessings with our special rituals",
  //   },
  // ];

  // const promises = [
  //   {
  //     icon: <Shield className="w-6 h-6" />,
  //     title: "Pandit Verified",
  //     text: "Puja done by qualified and experienced pandits",
  //   },
  //   {
  //     icon: <CreditCard className="w-6 h-6" />,
  //     title: "100% Secure",
  //     text: "Payment methods are completely safe and secured",
  //   },
  //   {
  //     icon: <Award className="w-6 h-6" />,
  //     title: "Puja live location",
  //     text: "You get live updates of the puja location",
  //   },
  //   {
  //     icon: <Phone className="w-6 h-6" />,
  //     title: "24×7 Helpline",
  //     text: "We provide customer support 24/7 for any assistance",
  //   },
  //   {
  //     icon: <Users className="w-6 h-6" />,
  //     title: "Puja Done At Best",
  //     text: "Puja performed at renowned temples by expert pandits",
  //   },
  //   {
  //     icon: <Check className="w-6 h-6" />,
  //     title: "Puja bina Antaral",
  //     text: "Continuous puja without any interruption or breaks",
  //   },
  // ];

  // const packages = [
  //   {
  //     title: "Bagalamukhi Puja",
  //     image:
  //       "https://images.unsplash.com/photo-1582662715783-6c8ea0b29b97?w=300&h=200&fit=crop",
  //     price: "₹5,100",
  //     items: [
  //       "Shree Yantra or prasad at your home",
  //       "Photo or Video will be shared",
  //       "Sankalp Patra & Gayatri will be sent",
  //       "Temple will have Diya lit in your name for 3 months",
  //       "Online Darshan will be available",
  //       "Blessings from deity will be received",
  //       "Puja will be done with proper rituals",
  //       "Mantras will be chanted by experienced pandits",
  //     ],
  //   },
  //   {
  //     title: "Kanwar Puja - Pitru Dosh Nivaran Puja",
  //     image:
  //       "https://images.unsplash.com/photo-1585314062604-1a357de8b000?w=300&h=200&fit=crop",
  //     price: "₹8,500",
  //     items: [
  //       "Relief from ancestral curses",
  //       "Peace for departed souls",
  //       "Kanwar yatra blessings",
  //       "Sacred Ganga jal offering",
  //       "Pind daan ritual included",
  //       "Brahmin bhoj arrangement",
  //       "Photo and video documentation",
  //     ],
  //   },
  //   {
  //     title: "Ganpti Puja - Riddhi Siddhi Ganapti Puja",
  //     image:
  //       "https://images.unsplash.com/photo-1548777710-08b9d14d2f7b?w=300&h=200&fit=crop",
  //     price: "₹6,200",
  //     items: [
  //       "Obstacles removal guaranteed",
  //       "Success in new ventures",
  //       "Wealth and prosperity",
  //       "Modak prasad at home",
  //       "21 days continuous puja",
  //       "Ganesh mantra jaap",
  //       "Special abhishek ritual",
  //     ],
  //   },
  //   {
  //     title: "Guru Puja - Brihaspativar Vrat Puja",
  //     image:
  //       "https://images.unsplash.com/photo-1605481396213-c0ea248d4eed?w=300&h=200&fit=crop",
  //     price: "₹4,800",
  //     items: [
  //       "Jupiter planet remedies",
  //       "Education success blessings",
  //       "Career growth benefits",
  //       "Thursday special puja",
  //       "Yellow offerings included",
  //       "Guru mantra chanting",
  //       "Wisdom and knowledge gain",
  //     ],
  //   },
  // ];

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      {/* <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="text-sm text-gray-600">
          Home / Puja / <span className="text-gray-900">1,25,000 Aghori Shabar Mantra Puja</span>
        </div>
      </div> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pb-16">
        <div className="">
          <div className="max-w-7xl mx-auto px-4 mt-20 mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-105">
              {/* left image slider part */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-full">
                <img
                  src={images[currentIndex]}
                  alt={`Slide ${currentIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-500"
                />

                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                >
                  {/* ‹ */}
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                >
                  {/* › */}
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="absolute bottom-4 right-4 flex gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2 w-2 rounded-full ${i === currentIndex ? "bg-white" : "bg-white/40"
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT : Sticky Info Card */}
              {/* <div className="relative ">
                <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-6 shadow-lg"> */}
              {/* <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-3">
                    100 Kg Lal Mirch Agni Ahuti Maha Yagya Bagalamukhi -
                    Pratyangira Kavach Anushthan
                  </h2> */}

              {/* <p className="text-gray-600 text-sm mb-4">
                    Blessings from Maa Bagalamukhi for victory over enemies and
                    successful outcomes in legal cases. lore
                  </p> */}

              {/* Location & Date */}
              {/* <div className="space-y-3 text-sm mb-5">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                      <span>
                        Siddhapeeth Maa Bagalamukhi Mandir, Haridwar,
                        Uttarakhand
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-5 h-5 text-orange-500 mt-0.5" />
                      <span>19 December, Friday (Amavasya)</span>
                    </div>
                  </div> */}

              {/* Countdown */}
              {/* <div className="bg-orange-50 rounded-lg p-4 mb-5">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Puja booking will close in
                    </p>
                    <div className="flex gap-3 text-center">
                      {[
                        { label: "Day", value: "1" },
                        { label: "Hours", value: "4" },
                        { label: "Mins", value: "48" },
                        { label: "Secs", value: "24" },
                      ].map((t) => (
                        <div key={t.label}>
                          <p className="text-lg font-bold text-orange-600">
                            {t.value}
                          </p>
                          <p className="text-xs text-gray-500">{t.label}</p>
                        </div>
                      ))}
                    </div>
                  </div> */}

              {/* Rating */}
              {/* <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      4.9 (7k+ ratings)
                    </span>
                  </div> */}

              {/* CTA */}
              {/* <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition">
                    Select puja package →
                  </button> */}
              {/* </div>
              </div> */}

              <div className="relative h-full">
                {pujaData.map((puja: any, index: any) => (
                  <div
                    key={index}
                    className="h-full bg-white border border-gray-200 rounded-2xl p-6 shadow-lg flex flex-col"
                  >
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {puja.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4">{puja.name}</p>

                    {/* puja reason */}
                    <p className="text-gray-600 text-sm mb-4">{puja.to}</p>

                    {/* Location & Date */}
                    <div className="space-y-3 text-sm mb-5">
                      <div className="flex gap-2">
                        <MapPin className="w-5 h-5 text-orange-500 " />
                        <span>{puja.place}</span>
                      </div>

                      <div className="flex items-start gap-2">
                        <Calendar className="w-5 h-5 text-orange-500 mt-0.5" />
                        <span>
                          {new Date(puja.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      {/* <div className="flex gap-2">
                        <Clock className="w-5 h-5 text-orange-500 mt-0.5" />
                        <span>{puja.time}</span>
                      </div> */}
                    </div>

                    {/* Countdown (Static for now) */}
                    <div className="bg-orange-50 rounded-lg p-4 mb-5">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Puja booking will close in
                      </p>
                      <div className="flex gap-3 text-center">
                        {[
                          { label: "Day", value: "1" },
                          { label: "Hours", value: "4" },
                          { label: "Mins", value: "48" },
                          { label: "Secs", value: "24" },
                        ].map((t) => (
                          <div key={t.label}>
                            <p className="text-lg font-bold text-orange-600">
                              {t.value}
                            </p>
                            <p className="text-xs text-gray-500">{t.label}</p>
                          </div>
                        ))}
                      </div>
                      {/* <div className="flex gap-2">
                        <Clock className="w-5 h-5 text-orange-500 mt-0.5" />
                        <span>{puja.time}</span>
                      </div> */}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-6!">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {puja.rating} ({puja.reviews})
                      </span>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => {
                        const el = document.getElementById("packages");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white! font-semibold py-4 rounded-xl cursor-pointer"
                    >
                      Select puja package →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          {/* <nav className="sticky border-b border-gray-200 ">
            <div className="flex justify-center items-center gap-15 mt-6 ">
              {tabs.map((tab, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => setActiveTab("about-puja")}
                    className={`pb-3 border-b-2 transition-colors ${
                      activeTab === "about-puja"
                        ? "border-orange-500 text-orange-500 font-semibold"
                        : "border-transparent text-gray-600"
                    }`}
                  >
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </nav> */}

          {/* Tab Content */}
          {/* <div className="sticky top-16 z-40 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-center gap-10 px-4 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      document.getElementById(tab.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className={`pb-4 pt-4 border-b-2 text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-orange-500 text-orange-500 font-semibold"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>
          </div> */}
          <div className="sticky top-20 z-40 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-center gap-10 px-4 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleClick(tab.id)}
                    className={`py-4 border-b-2 text-md transition-colors cursor-pointer ${activeTab === tab.id
                      ? "border-orange-500 text-orange-500! font-semibold"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                      }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <AboutPuja about={pooja?.about} />
          <Benefits benifits={pooja?.benefitText} />
          <Process />
          <Temple temple={pooja?.templeDetails} />
          <Packages poojaId={pooja?._id} />

          {/* {activeTab === "benefits" && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Puja Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-orange-500" />
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* Tab Content - Promises */}
          {/* {activeTab === "promises" && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Puja Promises
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {promises.map((promise, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500">
                        {promise.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {promise.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{promise.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* Sandhyavandh Section */}
          {/* <div className="mb-8 bg-orange-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Sandhyavandh Kiya Bagalamukhi Navratri Anushthan Utsavadhoot
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1609682680591-c991d6e7ccf7?w=500&h=300&fit=crop"
                  alt="Sandhyavandh"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="text-gray-700 text-sm leading-relaxed">
                <p className="mb-3">
                  The Sandhyavandh Kiya Bagalamukhi Navratri Anushthan is a
                  special ritual performed during Navratri, dedicated to Goddess
                  Bagalamukhi. This powerful ceremony combines the daily
                  Sandhyavandh (twilight prayers) with intense devotion to the
                  goddess.
                </p>
                <p>
                  The Anushthan involves continuous chanting of Bagalamukhi
                  mantras, elaborate pujas, and offerings made during the
                  auspicious nine days of Navratri. Devotees believe this
                  practice brings divine protection, removes obstacles, and
                  grants victory over adversaries.
                </p>
              </div>
            </div>
          </div> */}

          {/* Select Puja Packages */}
          {/* <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Select puja package
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-40">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-800 mb-2">
                      {pkg.title}
                    </h4>
                    <p className="text-2xl font-bold text-orange-500 mb-4">
                      {pkg.price}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {pkg.items.slice(0, 4).map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-gray-600 text-sm"
                        >
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors">
                      READ MORE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Reviews & Ratings */}
          <ReviewsRatings />
          <UserReviews />

          {/* FAQs */}
          <FAQs type="puja" />
        </div>
      </main>
    </main>
  );
};

export default PujaDetail;
