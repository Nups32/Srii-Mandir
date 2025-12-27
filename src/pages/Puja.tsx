import React, { useEffect, useState } from "react";
import {
  MapPin,
  Clock,
  Calendar,
  ChevronRight,
  ChevronLeft,
  X,
  Search,
} from "lucide-react";

// import slide1 from "../assets/Puja/1/1.webp";
import slide2 from "../assets/Puja/1/2.webp";
import slide3 from "../assets/Puja/1/3.webp";
import slide4 from "../assets/Puja/1/4.webp";
// import hero1 from "../assets/Puja/hero/1.jpg";
// import hero2 from "../assets/Puja/hero/2.jpg";
// import hero3 from "../assets/Puja/hero/3.jpg";

import mandirImage from "../assets/mandir.jpg";

import { useNavigate } from "react-router-dom";
import ReviewsRatings from "@/components/Reviews";
import { message } from "antd";
import { getActivePurohits, getHeroSectionByType, getPooja } from "@/utils/API";
import type { SlideItem } from "@/components/HeroSlider";
// import { getPooja } from "@/utils/API";
// import { message } from "antd";

// interface PujaCard {
//   id: number;
//   badgeColor: string;
//   image: string;
//   title: string;
//   description: string;
//   temple: string;
//   duration: string;
//   date: string;
//   location: string;
// }

const Puja: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentWorkSlide, setCurrentWorkSlide] = useState(0);
  const navigate = useNavigate();
  const [, setLoading] = useState(false);
  const [poojas, setPoojas] = useState<any[]>([]);
  const [purohits, setPurohits] = useState<any>([]);

  const [isDhamsModalOpen, setIsDhamsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // const heroSlides = [
  //   {
  //     id: 1,
  //     image:
  //       hero1,
  //     title: "Join Sade Sati and Mahadasha Shanti Maha Puja",
  //     buttonText: "BOOK NOW",
  //   },
  //   {
  //     id: 2,
  //     image:
  //       hero2,
  //     title: "Maha Shivaratri Special Puja",
  //     buttonText: "BOOK NOW",
  //   },
  //   {
  //     id: 2,
  //     image:
  //       hero3,
  //     title: "Maha Shivaratri Special Puja",
  //     buttonText: "BOOK NOW",
  //   },
  // ];

  // const pujaCards: PujaCard[] = [
  //   {
  //     id: 1,
  //     badgeColor: "bg-orange-500",
  //     image: slide1,
  //     title:
  //       "108 Kg Lal Mirch Aarti Ahurti (Chilli Offering) and Pradnyavinay Rought Anushthan with 1,25,000 Mantra Jaap",
  //     description: "Seek blessings for prosperity and success",
  //     temple: "Shree Kal Avandeeshwar Ka Mandir by Lagar Puja Teldhara",
  //     duration: "10 December, Sunday, Purnima Endings",
  //     date: "Teldhara City, Lal Bagh Colony",
  //     location: "Aamjanav Marg, West 18",
  //   },
  //   {
  //     id: 2,
  //     badgeColor: "bg-orange-500",
  //     image: slide1,
  //     title:
  //       "Shani Sande Saati Pooja Shanti Mahayaga, Shani Til Tel Abhishek aur Mahadosha Shanti Mahayaga",
  //     description: "Get relief from Shani Dosha and obstacles",
  //     temple: "Shri Hanuman Mandir",
  //     duration: "15 December, Tuesday, Pooja Endings",
  //     date: "Ram Nagar, Batti Kuda",
  //     location: "Hanuman Marg, North 22",
  //   },
  //   {
  //     id: 3,
  //     badgeColor: "bg-orange-500",
  //     image: slide1,
  //     title: "Panch Tilak Pitru Doodha Nivaran Puja and Ganga Maha Aarti",
  //     description: "Perform ancestral rituals with sacred Ganga Aarti",
  //     temple: "Ganga Ghat Maha Dham Temple",
  //     duration: "20 December, Sunday, Navami Endings",
  //     date: "Varanasi Ghat, UP",
  //     location: "Dashashwamedh Ghat",
  //   },
  //   {
  //     id: 4,
  //     badgeColor: "bg-purple-600",
  //     image: slide1,
  //     title: "Shri Hanuman, Bhairav, Maha Kali Sampoornn Lakshaksha Anushthan",
  //     description: "Complete ritual for protection and prosperity",
  //     temple: "Mahakali Mandir Complex",
  //     duration: "12 December, Friday, Pooja Endings",
  //     date: "Kali Ghat, Kolkata",
  //     location: "South Kolkata, West Bengal",
  //   },
  //   {
  //     id: 5,
  //     badgeColor: "bg-purple-600",
  //     image: slide1,
  //     title:
  //       "21,000 Shani Mauli Mantra Jaap and 1008 Gorakh Mudhen Chadhava with Shanti Nivaran Puja",
  //     description: "Powerful Shani remedies for obstacles removal",
  //     temple: "Shri Shani Dham Mandir",
  //     duration: "18 December, Saturday, Pooja Endings",
  //     date: "Shani Shingnapur, Maharashtra",
  //     location: "Ahmednagar District",
  //   },
  //   {
  //     id: 6,
  //     badgeColor: "bg-purple-600",
  //     image: slide1,
  //     title:
  //       "Maa Bagalamukhi Tantra Yakta Anushthan and Shani Til Tel Abhishek",
  //     description: "Tantric ritual for victory over enemies",
  //     temple: "Baglamukhi Siddha Peeth",
  //     duration: "25 December, Saturday, Navami Endings",
  //     date: "Datia, Madhya Pradesh",
  //     location: "Pitambara Peeth",
  //   },
  //   {
  //     id: 7,
  //     badgeColor: "bg-red-600",
  //     image: slide1,
  //     title:
  //       "11,000 Mahalakshmi Mantra Jaap, Vaibhav Lakshmi Puja and Dhan Samridhi Karan",
  //     description: "Attract wealth and prosperity blessings",
  //     temple: "Mahalakshmi Temple",
  //     duration: "22 December, Thursday, Pooja Endings",
  //     date: "Mumbai, Maharashtra",
  //     location: "Breach Candy",
  //   },
  //   {
  //     id: 8,
  //     badgeColor: "bg-red-600",
  //     image: slide1,
  //     title: "Pitru Dosh Nivutti Puja and Kashi Ganga Aarti",
  //     description: "Ancestral peace and liberation ritual",
  //     temple: "Kashi Vishwanath Temple",
  //     duration: "28 December, Wednesday, Amavas",
  //     date: "Varanasi, Uttar Pradesh",
  //     location: "Kashi Ghat",
  //   },
  //   {
  //     id: 9,
  //     badgeColor: "bg-red-600",
  //     image: slide1,
  //     title:
  //       "Navdurga Vrata Puja and Kanchi Peeth 1,25,000 Baglamukhi Shabar Mantra Jap",
  //     description: "Divine mother's blessing for protection",
  //     temple: "Kamakshi Amman Temple",
  //     duration: "30 December, Friday, Navami",
  //     date: "Kanchipuram, Tamil Nadu",
  //     location: "Temple Street",
  //   },
  // ];

  const pujaWorkSlides = [slide2, slide3, slide4];

  const pujaWork = [
    {
      step: 1,
      title: "Choose Your Puja",
      desc: "Select your Puja from the List",
    },
    {
      step: 2,
      title: "Your Information",
      desc: "After selecting the Puja, fill in the information of your Name and Gotra in the provided form.",
    },
    {
      step: 3,
      title: "Puja video",
      desc: "The video of your Puja completed with your name and Gotra will be shared on WhatsApp.",
    },
    {
      step: 4,
      title: "Aashirwad Box",
      desc: "Aashirwad Box will be sent to your registered address.",
    },
  ];

  // const purohits = [
  //   {
  //     name: "Acharya Ramjoo Dwivedi",
  //     place: "Prayagraj",
  //     exp: 15,
  //     image: slide1,
  //   },
  //   {
  //     name: "Pandit Ashish Bhatt",
  //     place: "Haridwar",
  //     exp: 5,
  //     image: slide1,
  //   },
  //   {
  //     name: "Pandit Hanshul Dutt",
  //     place: "Haridwar",
  //     exp: 5,
  //     image: slide1,
  //   },
  //   {
  //     name: "Pandit Ravi Dubey",
  //     place: "Ujjain",
  //     exp: 5,
  //     image: slide1,
  //   },
  //   {
  //     name: "Pandit Saurabh Gautam",
  //     place: "Varanasi",
  //     exp: 4,
  //     image: slide1,
  //   },
  // ];

  const [slides, setSlides] = useState<SlideItem[]>([]);

  const allMandirs = [
    { sr: 1, name: "Yog Maya Dham", place: "Vrindavan, Uttar Pradesh", purpose: "Property Relative Issue", image: mandirImage },
    { sr: 2, name: "Shri Garud Govind Temple", place: "Shri Vrindavan, Uttar Pradesh", purpose: "Desired Wish", image: mandirImage },
    { sr: 3, name: "Neem Karoli Baba Ashram", place: "Vrindavan, Uttar Pradesh", purpose: "Happiness", image: mandirImage },
    { sr: 4, name: "Sapt Sundari Dham", place: "Orchha, Madhya Pradesh", purpose: "Baby Conceive Problem", image: mandirImage },
    { sr: 5, name: "Tripura Sundari Dham", place: "Tripuri, Madhya Pradesh", purpose: "Tantra Vidya", image: mandirImage },
    { sr: 6, name: "Maharshi Vibhu Manokamna Dham", place: "Ballia, Uttar Pradesh", purpose: "Property Relative Issue / Happiness", image: mandirImage },
    { sr: 7, name: "Vindhyachal Dham", place: "Uttar Pradesh", purpose: "(Main pilgrimage for Child Birth / Putra Prapti)", image: mandirImage },
    { sr: 8, name: "Sankat Mochan Hanuman Dham", place: "Banaras (Varanasi), Uttar Pradesh", purpose: "Freedom From Debt", image: mandirImage },
    { sr: 9, name: "Maa Jwalamukhi Karj Mukti Dham", place: "Durg, Chhattisgarh", purpose: "(Debt / Loan relief)", image: mandirImage },
    { sr: 10, name: "Kamakhya Shakti Dham", place: "Guwahati, Assam", purpose: "(Grah Kalesh / Family disputes)", image: mandirImage },
    { sr: 11, name: "Sapt Sarovar Mukti Dham", place: "Muzaffarnagar, Uttar Pradesh", purpose: "(Mukti / Spiritual liberation)", image: mandirImage },
    { sr: 12, name: "Maa Jagdamba Pawan Dham", place: "Dibrugarh, Assam", purpose: "(Justice related)", image: mandirImage },
    { sr: 13, name: "Swayam Bhav Har Mahadev Dham", place: "Banaskantha, Rajasthan", purpose: "Problems In Relationships", image: mandirImage },
    { sr: 14, name: "Shree Sadhana Durga Peeth – 24 Parganas", place: "West Bengal", purpose: "(Manokamna Poorti – Wish fulfillment)", image: mandirImage },
    { sr: 15, name: "Jag Janani Sita Shruti Dham – Janakpur Dham", place: "Dhanusha District, Nepal", purpose: "Good marriage life", image: mandirImage },
    { sr: 16, name: "Shri Radha Rani Kirti Mandir", place: "Barsana, Uttar Pradesh", purpose: "(Marriage related issues)", image: mandirImage },
    { sr: 17, name: "Bhuteshwar Tantra Vidya Dham", place: "Rourkela, Odisha", purpose: "(Atma Shanti, Bhut-Pret, Mukti)", image: mandirImage },
    { sr: 18, name: "Shree Navlakha Yojana Dham", place: "Jharkhand", purpose: "(Talaq / Divorce related problems)", image: mandirImage },
    { sr: 19, name: "Bagalamukhi Temple", place: "Nalkheda, Madhya Pradesh", purpose: "(Justice, legal victory)", image: mandirImage },
    { sr: 20, name: "Beri Wala Siddh Peeth Mandir", place: "Noida, Uttar Pradesh", purpose: "(Child health issues)", image: mandirImage },
    { sr: 21, name: "Anusuya Devi Mandir", place: "Udaipur, Rajasthan", purpose: "(Personal problems)", image: mandirImage },
    { sr: 22, name: "Siddh Peeth Dhameshwari Devi", place: "Chittorgarh", purpose: "(Mental peace & solutions)", image: mandirImage },
    { sr: 23, name: "Shri Bhaktivedanta Gau Seva Dham", place: "Jharkhand", purpose: "(Mother, Father & family related work)", image: mandirImage },
    { sr: 24, name: "Jeevan Chhaya Shakti Peeth", place: "Bihar", purpose: "(Children speech problems)", image: mandirImage },
    { sr: 25, name: "Maya Shakti Sarovar Dham", place: "Buxar, Bihar", purpose: "(BP, Sugar, Thyroid, Cancer, Hair problems)", image: mandirImage },
    { sr: 26, name: "Ganpati Mandir", place: "Mahakaleshwar - Ujjain", purpose: "Vighna Nashak", image: mandirImage },
    { sr: 27, name: "Laxmi Mandir", place: "Vrindavan, Uttar Pradesh", purpose: "Dhan Prapti", image: mandirImage }
  ];

  const displayedMandirs = allMandirs.slice(0, 3);
  const filteredMandirs = allMandirs.filter(mandir =>
    mandir.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mandir.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mandir.place.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchHeroSliders = async () => {
    // setLoading(true);
    try {
      const response = await getHeroSectionByType("puja");
      if (response.data.status) {
        setSlides(response.data.data);
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      // setLoading(false);
    }
  };

  const fetchPooja = async () => {
    setLoading(true);
    try {
      const response: any = await getPooja();
      // console.log("res from fetchpooja", response)
      if (response?.data?.status) {
        setPoojas(response.data.data);
      } else {
        message.error("failed to fetch poojas");
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const fetchPurohit = async () => {
    setLoading(true);
    try {
      const response: any = await getActivePurohits();
      // console.log("res from fetchpooja", response)
      if (response?.data?.status) {
        setPurohits(response.data.data);
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
    fetchHeroSliders();
    fetchPooja();
    fetchPurohit();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides?.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides?.length) % slides?.length
    );
  };

  const nextWorkSlide = () => {
    setCurrentWorkSlide((prev) => (prev + 1) % pujaWorkSlides.length);
  };
  const prevWorkSlide = () => {
    setCurrentWorkSlide(
      (prev) => (prev - 1 + pujaWorkSlides.length) % pujaWorkSlides.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Perform Puja as per Vedic rituals at Famous Hindu Temples in India
        </h1>

        {/* Hero Slider */}
        <div className="relative mb-12 rounded-xl overflow-hidden shadow-lg">
          <div className="relative h-45 md:h-96">
            <img
              src={`${import.meta.env.VITE_APP_Image_URL}/hero-section/${slides?.[currentSlide]?.image}`}
              alt={slides?.[currentSlide]?.title}
              className="w-full h-full object-"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
              <div className="h-full flex flex-col justify-center px-8 md:px-16">
                <span className="inline-block w-fit bg-red-600 text-white text-xs font-bold px-3 py-1 rounded mb-4">
                  {heroSlides[currentSlide].badge}
                </span>
                <p className="text-white text-sm mb-2">
                  {heroSlides[currentSlide].subtitle}
                </p>
                <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 max-w-lg">
                  {heroSlides[currentSlide].title}
                </h2>
                <button className="w-fit bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                  {heroSlides[currentSlide].buttonText}
                </button>
              </div>
            </div> */}
          </div>

          {/* Slider Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides?.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? "bg-white w-8" : "bg-white/50"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* ADDED SECTION: Spiritual Dham / Shakti Peeth */}
        <section className="my-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
            List of Spiritual Dham / Shakti Peeth
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {displayedMandirs.map((mandir) => (
              <div key={mandir.sr} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
                <img src={mandir.image} alt={mandir.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{mandir.name}</h3>
                  <p className="text-gray-600 text-center"><strong>Place:</strong> {mandir.place}</p>
                  <p className="text-gray-600 text-center mt-3"><strong>Purpose:</strong> {mandir.purpose}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsDhamsModalOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-12 rounded-full text-lg shadow-lg transition"
            >
              View All
            </button>
          </div>
        </section>

        {/* Upcoming Pujas Section */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 my-7">
            Upcoming Pujas
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-8">
            Book puja{" "}
            <span className="text-orange-500 font-semibold">Online</span> with
            your name and gotra, receive the puja video along with the
            Aashirvad/ Fal, and get blessings from the divine.
          </p>

          {/* Puja Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {pujaCards.map((puja) => ( */}
            {poojas?.map((puja) => (
              <div
                key={puja._id}
                className="bg-white flex flex-col justify-between rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Card Image */}
                <div className="relative h-62">
                  <img
                    src={`${import.meta.env.VITE_APP_Image_URL}/pooja/${puja.images?.[0]}`}
                    alt={puja.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute bottom-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded">
                    Book Puja
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {puja.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {puja.to}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-4 h-35">
                    <div className="flex items-start gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                      <span className="line-clamp-2">{puja.place}</span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-600 text-sm">
                      <Clock className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                      <span>{puja.date}</span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-600 text-sm">
                      <Calendar className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                      <span>{puja.time}</span>
                    </div>
                    {/* <div className="flex items-start gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                      <span>{puja.location}</span>
                    </div> */}
                  </div>

                </div>
                {/* Button */}
                <div className="p-4">
                  <button
                    onClick={() => navigate(`/puja-detail/${puja.slug}`)}
                    // onClick={() =>
                    //   window.open(`product/${puja.slug}`, "_blank")
                    // }
                    className="w-full  bg-green-600 hover:bg-green-700 text-white! font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    PARTICIPATE
                    <ChevronRight className="w-4 h-4" />
                  </button>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews section */}
        {/* <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What devotees Say about Srii Mandir ?</h2> */}
        <ReviewsRatings />

        <div className="space-y-24">
          {/*Puja Stats Section */}
          <section className="max-w-7xl mx-auto px-4 pt-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
              Start your Sacred Journey with Srii Mandir Puja Service
            </h2>
            <p className="text-sm md:text-base text-gray-600 text-center">
              Why book Srii Mandir Online Puja?{" "}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-purple-100 rounded-xl p-6 text-center">
                <h3 className="text-2xl font-bold text-indigo-600">
                  10,00,000 +
                </h3>
                <p className="text-indigo-600 mt-2">Puja's Done</p>
              </div>
              <div className="bg-orange-100 rounded-xl p-6 text-center">
                <h3 className="text-2xl font-bold text-orange-600">
                  300,000 +
                </h3>
                <p className="text-orange-600 mt-2">Happy Devotees</p>
              </div>
              <div className="bg-pink-100 rounded-xl p-6 text-center">
                <h3 className="text-2xl font-bold text-pink-600">100 +</h3>
                <p className="text-pink-600 mt-2">Famous Temples in India</p>
              </div>
              <div className="bg-blue-100 rounded-xl p-6 text-center">
                <h3 className="text-2xl font-bold text-blue-600">1 Sankalp</h3>
                <p className="text-blue-600 mt-2">Spreading Sanatan Dharma</p>
              </div>
            </div>
          </section>

          {/* How Puja Works */}
          <section className="max-w-7xl mx-auto px-4 pt-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-10! text-center">
              How does Srii Mandir Online Puja Works?
            </h2>

            <div className="lg:flex lg:items-start lg:gap-12">
              {/* Left Steps */}
              <div className="lg:w-1/2 space-y-6">
                {pujaWork.map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Image Slider */}
              <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center relative">
                <img
                  src={pujaWorkSlides[currentWorkSlide]}
                  alt={`Puja Work ${currentWorkSlide + 1}`}
                  className="w-full h-80 md:h-100 object-cover rounded-xl"
                />

                {/* Prev / Next Buttons */}
                <button
                  onClick={prevWorkSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextWorkSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </section>

          {/* Purohit Team Section */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-10! text-center ">
              Meet the experienced community of Srii Mandir Purohit's
            </h2>
            <p className="text-sm md:text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12! leading-relaxed">
              Our commitment is to perform pujas with true devotion towards the
              Divine and in accordance with Vedic scriptures. We perform pujas
              at Shaktipeeths, Jyotirlingas and other sacred temples to ensure
              you and your family receive blessings of well-being and
              auspiciousness in your lives.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {purohits?.map((purohit: any, idx: any) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg overflow-hidden text-center p-4"
                >
                  <img
                    src={`${import.meta.env.VITE_APP_Image_URL}/purohit/${purohit?.image}`}
                    alt={purohit?.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {purohit?.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {/* {purohit?.place} • Exp: {purohit?.exp} years */}
                    {purohit?.location} {purohit?.experience && `• Exp: ${purohit?.experience}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Full-screen modal for All Mandirs (acts like a new page) */}
      {isDhamsModalOpen && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-amber-800">
                  All Spiritual Dhams & Shakti Peeths
                </h1>
                <button onClick={() => { setIsDhamsModalOpen(false); setSearchTerm(""); }} className="p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition">
                  <X className="w-8 h-8 text-amber-800" />
                </button>
              </div>

              <div className="relative max-w-md mx-auto mb-10">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, place or purpose..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-300"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMandirs.map((mandir) => (
                  <div key={mandir.sr} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 overflow-hidden">
                    <img src={mandir.image} alt={mandir.name} className="w-full h-64 object-cover" />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-amber-800 mb-3">{mandir.name}</h3>
                      <p className="text-amber-900 text-lg"><strong>Place:</strong> {mandir.place}</p>
                      <p className="text-amber-900 text-lg mt-3"><strong>Purpose:</strong> {mandir.purpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Puja;