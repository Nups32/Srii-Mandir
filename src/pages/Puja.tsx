import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Calendar,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import slide1 from "../assets/Puja/1/1.webp";
import { useNavigate } from "react-router-dom";

interface PujaCard {
  id: number;
  badgeColor: string;
  image: string;
  title: string;
  description: string;
  temple: string;
  duration: string;
  date: string;
  location: string;
}

const Puja: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const heroSlides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1604608672516-f1b9b1cf62f5?w=1200&h=400&fit=crop",
      badge: "GET 25% OFF",
      title: "Join Sade Sati and Mahadasha Shanti Maha Puja",
      subtitle: "Get the best package of Puja Ayojan on just 2025",
      buttonText: "BOOK NOW",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=1200&h=400&fit=crop",
      badge: "SPECIAL OFFER",
      title: "Maha Shivaratri Special Puja",
      subtitle: "Experience divine blessings with our special rituals",
      buttonText: "BOOK NOW",
    },
  ];

  const pujaCards: PujaCard[] = [
    {
      id: 1,
      badgeColor: "bg-orange-500",
      image: slide1,
      title:
        "108 Kg Lal Mirch Aarti Ahurti (Chilli Offering) and Pradnyavinay Rought Anushthan with 1,25,000 Mantra Jaap",
      description: "Seek blessings for prosperity and success",
      temple: "Shree Kal Avandeeshwar Ka Mandir by Lagar Puja Teldhara",
      duration: "10 December, Sunday, Purnima Endings",
      date: "Teldhara City, Lal Bagh Colony",
      location: "Aamjanav Marg, West 18",
    },
    {
      id: 2,
      badgeColor: "bg-orange-500",
      image: slide1,
      title:
        "Shani Sande Saati Pooja Shanti Mahayaga, Shani Til Tel Abhishek aur Mahadosha Shanti Mahayaga",
      description: "Get relief from Shani Dosha and obstacles",
      temple: "Shri Hanuman Mandir",
      duration: "15 December, Tuesday, Pooja Endings",
      date: "Ram Nagar, Batti Kuda",
      location: "Hanuman Marg, North 22",
    },
    {
      id: 3,
      badgeColor: "bg-orange-500",
      image: slide1,
      title: "Panch Tilak Pitru Doodha Nivaran Puja and Ganga Maha Aarti",
      description: "Perform ancestral rituals with sacred Ganga Aarti",
      temple: "Ganga Ghat Maha Dham Temple",
      duration: "20 December, Sunday, Navami Endings",
      date: "Varanasi Ghat, UP",
      location: "Dashashwamedh Ghat",
    },
    {
      id: 4,
      badgeColor: "bg-purple-600",
      image: slide1,
      title: "Shri Hanuman, Bhairav, Maha Kali Sampoornn Lakshaksha Anushthan",
      description: "Complete ritual for protection and prosperity",
      temple: "Mahakali Mandir Complex",
      duration: "12 December, Friday, Pooja Endings",
      date: "Kali Ghat, Kolkata",
      location: "South Kolkata, West Bengal",
    },
    {
      id: 5,
      badgeColor: "bg-purple-600",
      image: slide1,
      title:
        "21,000 Shani Mauli Mantra Jaap and 1008 Gorakh Mudhen Chadhava with Shanti Nivaran Puja",
      description: "Powerful Shani remedies for obstacles removal",
      temple: "Shri Shani Dham Mandir",
      duration: "18 December, Saturday, Pooja Endings",
      date: "Shani Shingnapur, Maharashtra",
      location: "Ahmednagar District",
    },
    {
      id: 6,
      badgeColor: "bg-purple-600",
      image: slide1,
      title:
        "Maa Bagalamukhi Tantra Yakta Anushthan and Shani Til Tel Abhishek",
      description: "Tantric ritual for victory over enemies",
      temple: "Baglamukhi Siddha Peeth",
      duration: "25 December, Saturday, Navami Endings",
      date: "Datia, Madhya Pradesh",
      location: "Pitambara Peeth",
    },
    {
      id: 7,
      badgeColor: "bg-red-600",
      image: slide1,
      title:
        "11,000 Mahalakshmi Mantra Jaap, Vaibhav Lakshmi Puja and Dhan Samridhi Karan",
      description: "Attract wealth and prosperity blessings",
      temple: "Mahalakshmi Temple",
      duration: "22 December, Thursday, Pooja Endings",
      date: "Mumbai, Maharashtra",
      location: "Breach Candy",
    },
    {
      id: 8,
      badgeColor: "bg-red-600",
      image: slide1,
      title: "Pitru Dosh Nivutti Puja and Kashi Ganga Aarti",
      description: "Ancestral peace and liberation ritual",
      temple: "Kashi Vishwanath Temple",
      duration: "28 December, Wednesday, Amavas",
      date: "Varanasi, Uttar Pradesh",
      location: "Kashi Ghat",
    },
    {
      id: 9,
      badgeColor: "bg-red-600",
      image: slide1,
      title:
        "Navdurga Vrata Puja and Kanchi Peeth 1,25,000 Baglamukhi Shabar Mantra Jap",
      description: "Divine mother's blessing for protection",
      temple: "Kamakshi Amman Temple",
      duration: "30 December, Friday, Navami",
      date: "Kanchipuram, Tamil Nadu",
      location: "Temple Street",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Perform Puja as per Vedic rituals at Famous Hindu Temples in India
        </h1>

        {/* Hero Slider */}
        <div className="relative mb-12 rounded-xl overflow-hidden shadow-lg">
          <div className="relative h-64 md:h-96">
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
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
            </div>
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
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === idx ? "bg-white w-8" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Upcoming Pujas Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 my-7">
            Upcoming Pujas
          </h2>
          <p className="text-gray-600 mb-8">
            Book your{" "}
            <span className="text-orange-500 font-semibold">Online</span> with
            your name and gotra, receive the puja video along with the
            Aashirvad/ Fal, and get blessings from the divine.
          </p>

          {/* Puja Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pujaCards.map((puja) => (
              <div
                key={puja.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Card Image */}
                <div className="relative h-62">
                  <img
                    src={puja.image}
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
                    {puja.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-4 h-35">
                    <div className="flex items-start gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">{puja.temple}</span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-600 text-sm">
                      <Clock className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{puja.duration}</span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-600 text-sm">
                      <Calendar className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{puja.date}</span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{puja.location}</span>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => navigate("/puja-detail")}
                    // onClick={() =>
                    //   window.open(`product/${puja.slug}`, "_blank")
                    // }
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    PARTICIPATE
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Puja;
