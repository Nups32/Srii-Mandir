import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Calendar,
  ChevronRight,
  Star,
  Shield,
  CreditCard,
  Users,
  Phone,
  Award,
  Check,
} from "lucide-react";
import ReviewsRatings from "./Reviews";

// interface PujaCard {
//   id: number;
//   badge: string;
//   badgeColor: string;
//   image: string;
//   title: string;
//   description: string;
//   price: string;
//   temple: string;
//   duration: string;
//   date: string;
//   location: string;
// }

const PujaDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState("benefits");

  const tabs = [
    { name: "About", link: "/about-puja" },
    { name: "Benefits", link: "/benefits" },
    { name: "Process", link: "/process" },
    { name: "Temple Details", link: "/temple-details" },
    { name: "Temple Details", link: "/temple-details" },
    { name: "Packages", link: "/packages" },
    { name: "Reviews", link: "/#reviews" },
    { name: "FAQs", link: "/#faqs" },
  ];

  const heroSlides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1604608672516-f1b9b1cf62f5?w=1200&h=400&fit=crop",
      badge: "GET 25% OFF",
      title:
        "Laxmi Puja Bagalamukhi Puja and 1,25,000 Aghori Shabar Mantra Jap",
      subtitle: "Experience divine blessings with our special rituals",
    },
  ];

  const benefits = [
    "Shree Bagalamukhi is revered for her ability to provide protection and remove negative energies.",
    "She is also associated with victory in legal matters and court cases.",
    "Devotees often turn to her for help in overcoming enemies and gaining power.",
    "Her blessings are believed to bring financial stability and prosperity to those who worship her.",
    "The practice of Laxmi Puja and Bagalamukhi Puja, combined with the recitation of the powerful Aghori Shabar Mantra, is believed to bring immense spiritual and material benefits.",
    "Protection from Evil: Bagalamukhi Puja is known for its protective qualities. It helps shield devotees from negative influences, black magic, and evil spirits.",
  ];

  const promises = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Pandit Verified",
      text: "Puja done by qualified and experienced pandits",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "100% Secure",
      text: "Payment methods are completely safe and secured",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Puja live location",
      text: "You get live updates of the puja location",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "24×7 Helpline",
      text: "We provide customer support 24/7 for any assistance",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Puja Done At Best",
      text: "Puja performed at renowned temples by expert pandits",
    },
    {
      icon: <Check className="w-6 h-6" />,
      title: "Puja bina Antaral",
      text: "Continuous puja without any interruption or breaks",
    },
  ];

  const packages = [
    {
      title: "Bagalamukhi Puja",
      image:
        "https://images.unsplash.com/photo-1582662715783-6c8ea0b29b97?w=300&h=200&fit=crop",
      price: "₹5,100",
      items: [
        "Shree Yantra or prasad at your home",
        "Photo or Video will be shared",
        "Sankalp Patra & Gayatri will be sent",
        "Temple will have Diya lit in your name for 3 months",
        "Online Darshan will be available",
        "Blessings from deity will be received",
        "Puja will be done with proper rituals",
        "Mantras will be chanted by experienced pandits",
      ],
    },
    {
      title: "Kanwar Puja - Pitru Dosh Nivaran Puja",
      image:
        "https://images.unsplash.com/photo-1585314062604-1a357de8b000?w=300&h=200&fit=crop",
      price: "₹8,500",
      items: [
        "Relief from ancestral curses",
        "Peace for departed souls",
        "Kanwar yatra blessings",
        "Sacred Ganga jal offering",
        "Pind daan ritual included",
        "Brahmin bhoj arrangement",
        "Photo and video documentation",
      ],
    },
    {
      title: "Ganpti Puja - Riddhi Siddhi Ganapti Puja",
      image:
        "https://images.unsplash.com/photo-1548777710-08b9d14d2f7b?w=300&h=200&fit=crop",
      price: "₹6,200",
      items: [
        "Obstacles removal guaranteed",
        "Success in new ventures",
        "Wealth and prosperity",
        "Modak prasad at home",
        "21 days continuous puja",
        "Ganesh mantra jaap",
        "Special abhishek ritual",
      ],
    },
    {
      title: "Guru Puja - Brihaspativar Vrat Puja",
      image:
        "https://images.unsplash.com/photo-1605481396213-c0ea248d4eed?w=300&h=200&fit=crop",
      price: "₹4,800",
      items: [
        "Jupiter planet remedies",
        "Education success blessings",
        "Career growth benefits",
        "Thursday special puja",
        "Yellow offerings included",
        "Guru mantra chanting",
        "Wisdom and knowledge gain",
      ],
    },
  ];

  const faqs = [
    {
      question: "What is puja, and why is it important?",
      answer:
        "Puja is a Hindu ritual of worship that involves offering prayers, flowers, and other items to deities. It's important for spiritual growth and divine blessings.",
    },
    {
      question: "How can I book a puja?",
      answer:
        "You can book a puja through our website by selecting the desired puja, choosing a date, and completing the payment process.",
    },
    {
      question: "What all information will I need?",
      answer:
        "You'll need your name, gotra (family lineage), birth details, and specific wishes or intentions for the puja.",
    },
    {
      question:
        "Is there a time limit for the puja? How much time it will take?",
      answer:
        "Puja duration varies depending on the type. Typically, it ranges from 1 to 3 hours.",
    },
    {
      question: "What will I receive as a puja video?",
      answer:
        "You'll receive a complete video recording of your puja along with photos and a digital copy of the sankalp patra.",
    },
    {
      question: "What will I do if my puja gets Cancelled/Rescheduled?",
      answer:
        "We'll notify you immediately and offer a full refund or help you reschedule to another convenient date.",
    },
    {
      question: "Do you provide refunds if I cancel?",
      answer:
        "Yes, we provide refunds according to our cancellation policy. Cancellations made 48 hours before the puja date are eligible for full refund.",
    },
  ];

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
          {/* Left Column - Main Content */}
          <div className="">
            {/* Hero Image */}
            <div className="relative my-6 rounded-xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-2">
              <div className="">
                <img
                  src={heroSlides[0].image}
                  alt={heroSlides[0].title}
                  className="w-full h-80 object-cover"
                />
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded">
                  {heroSlides[0].badge}
                </span>
              </div>

              <div>
                <div className="sticky top-24 bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    108 Kg Lal Mirch Aarti Ahurti (Chilli Offering) Puja and
                    Maha Bhairava Tantric Puja
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Experience powerful tantric rituals for ultimate protection
                    and prosperity
                  </p>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">
                      (150+ reviews)
                    </span>
                  </div>

                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-700">
                        Shree Kal Bhairav Temple, Ujjain, Madhya Pradesh
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-700">Duration: 3-4 hours</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-700">
                        Next Available: 20th December 2025
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg transition-colors">
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>

            {/* Title and Description */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                End 2025 With Bagalamukhi Pratayangira Ultimate Protection on
                Last Amavasya 🔱🪔
              </h1>
              <p className="text-gray-600 leading-relaxed mb-4">
                Bagalamukhi Puja is a powerful Hindu ritual dedicated to Goddess
                Bagalamukhi, one of the ten Mahavidyas (great wisdom goddesses)
                in Hindu tantric tradition. This puja is performed to seek the
                blessings of the goddess for protection, victory over enemies,
                and success in legal matters.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Laxmi Puja and Bagalamukhi Puja are two significant Hindu
                rituals, each with its unique purpose and benefits. Laxmi Puja
                is dedicated to Goddess Laxmi, the deity of wealth and
                prosperity, and is typically performed during Diwali and other
                auspicious occasions to invoke her blessings for financial
                stability and abundance.
              </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6 sticky">
              <div className="flex gap-8">
                {tabs.map((tab, i) => {
                  return (
                    <button key={i}
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

                {/* <button
                  onClick={() => setActiveTab("benefits")}
                  className={`pb-3 border-b-2 transition-colors ${
                    activeTab === "benefits"
                      ? "border-orange-500 text-orange-500 font-semibold"
                      : "border-transparent text-gray-600"
                  }`}
                >
                  About Puja
                </button>
                <button
                  onClick={() => setActiveTab("promises")}
                  className={`pb-3 border-b-2 transition-colors ${
                    activeTab === "promises"
                      ? "border-orange-500 text-orange-500 font-semibold"
                      : "border-transparent text-gray-600"
                  }`}
                >
                  Benefits
                </button> */}
              </div>
            </div>

            {/* Tab Content - Benefits */}
            {activeTab === "benefits" && (
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
            )}

            {/* Tab Content - Promises */}
            {activeTab === "promises" && (
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
            )}

            {/* Sandhyavandh Section */}
            <div className="mb-8 bg-orange-50 rounded-xl p-6">
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
                    special ritual performed during Navratri, dedicated to
                    Goddess Bagalamukhi. This powerful ceremony combines the
                    daily Sandhyavandh (twilight prayers) with intense devotion
                    to the goddess.
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
            </div>

            {/* Select Puja Packages */}
            <div className="mb-8">
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
            </div>

            {/* Reviews & Ratings */}
            <ReviewsRatings />

            {/* FAQs */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Frequently asked Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 cursor-pointer group"
                  >
                    <summary className="font-semibold text-gray-800 flex items-center justify-between">
                      {faq.question}
                      <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="text-gray-600 text-sm mt-3">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          {/* <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                108 Kg Lal Mirch Aarti Ahurti (Chilli Offering) Puja and Maha Bhairava Tantric Puja
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Experience powerful tantric rituals for ultimate protection and prosperity
              </p>
              
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-orange-500">₹22,000</span>
                <span className="text-gray-500 line-through">₹25,000</span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(150+ reviews)</span>
              </div>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-700">Shree Kal Bhairav Temple, Ujjain, Madhya Pradesh</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-700">Duration: 3-4 hours</span>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-700">Next Available: 20th December 2025</span>
                </div>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition-colors mb-3">
                ADD YOUR SANKALP
              </button>
              
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg transition-colors">
                BOOK NOW
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">What's Included:</h4>
                <ul className="space-y-2">
                  {[
                    "Live puja video streaming",
                    "Recorded puja video",
                    "Prasad delivered to home",
                    "Digital sankalp patra",
                    "Photo gallery",
                    "Puja certificate"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </main>
  );
};

export default PujaDetail;
