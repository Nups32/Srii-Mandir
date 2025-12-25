import React, { useState } from 'react';

export default function InstantSolutions() {
  const handleNavigation = (path: string) => {
    console.log(`Navigate to: ${path}`);
    // In your actual app, use: navigate(path)
  };
  const [scrollY, setScrollY] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Hero Banner */}
      <header className="relative bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 text-white overflow-hidden shadow-2xl">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://i.postimg.cc/k5K4DnwL/instant-solutions-banner.jpg"
            alt="Instant Solutions for Your Life Problems"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 via-orange-800/80 to-amber-900/90"></div>
        </div>

        {/* Rotating Om Symbol */}
        <div 
          className="absolute inset-0 opacity-5 text-9xl flex items-center justify-center pointer-events-none"
          style={{ transform: `rotate(${scrollY * 0.1}deg)` }}
        >
          🕉️
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-6 animate-fade-in">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/30">
                <span className="text-2xl">✨</span>
                <span className="text-sm md:text-base font-semibold tracking-wide">DIVINE GUIDANCE AWAITS</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl animate-fade-in">
              Instant Solutions for Your Life Problems
            </h1>
            
            <p className="text-lg md:text-2xl mb-4 opacity-95 font-light max-w-3xl mx-auto animate-fade-in">
              Get Your Personalized Vedic Report via Email!
            </p>
            
            <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto mb-8 animate-fade-in">
              Receive quick, authentic spiritual guidance and remedies to overcome life's challenges with faith, clarity, and divine support.
            </p>

            {/* CTA Button */}
            <button className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-2xl transform transition hover:scale-105 cursor-pointer animate-pulse">
              Get Free Consultation
            </button>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <div className="h-px w-24 bg-white/40"></div>
              <span className="text-3xl">🙏</span>
              <div className="h-px w-24 bg-white/40"></div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 48h1440V0s-240 48-720 48S0 0 0 0v48z" fill="#FAF7F2"/>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <section className="bg-[#FAF7F2] py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* SECTION HEADER */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-semibold px-6 py-2 rounded-full">
                IMMEDIATE SPIRITUAL SUPPORT
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Instant Spiritual Solutions
            </h2>
            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              Receive quick, authentic spiritual guidance and remedies to overcome
              life's challenges with faith, clarity, and divine support.
            </p>
          </div>

          {/* SOLUTION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* CARD 1 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full group hover:-translate-y-2">
              <div className="flex-1">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-orange-200 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-orange-600 text-3xl">🕉</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Quick Spiritual Remedies
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Simple and effective remedies for daily life problems such as
                  career stress, financial worries, health concerns, and mental
                  peace - designed for immediate practice.
                </p>

                <div className="bg-orange-50 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-orange-600">✓</span> Areas We Cover:
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500">•</span> Career & job obstacles
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500">•</span> Financial stability
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500">•</span> Health & mental peace
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500">•</span> Family harmony
                    </li>
                  </ul>
                </div>
              </div>

              <button className="mt-auto w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white cursor-pointer py-4 font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Get Remedy Now →
              </button>
            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full group hover:-translate-y-2">
              <div className="flex-1">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-indigo-600 text-3xl">🔯</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Horoscope-Based Guidance
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Personalized spiritual solutions based on your horoscope,
                  planetary positions, and ongoing doshas for accurate and timely
                  guidance.
                </p>

                <div className="bg-indigo-50 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-indigo-600">✓</span> Vedic Services:
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-indigo-500">•</span> Rashi & Nakshatra remedies
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-indigo-500">•</span> Graha Dasha guidance
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-indigo-500">•</span> Shani, Rahu, Ketu solutions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-indigo-500">•</span> Auspicious timings
                    </li>
                  </ul>
                </div>
              </div>

              <button 
                onClick={() => handleNavigation("/vedic-science")} 
                className="mt-auto w-full rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white cursor-pointer py-4 font-bold hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Check Horoscope →
              </button>
            </div>

            {/* CARD 3 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full group hover:-translate-y-2">
              <div className="flex-1">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-200 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-green-600 text-3xl">🙏</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Issue-Based Recommendations
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Select your concern and receive focused recommendations including
                  mantras, poojas, vrats, and simple devotional practices.
                </p>

                <div className="bg-green-50 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-green-600">✓</span> Sacred Practices:
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">•</span> Mantras & chanting methods
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">•</span> Pooja & vrat suggestions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">•</span> Donation & lamp remedies
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">•</span> Spiritual discipline guidance
                    </li>
                  </ul>
                </div>
              </div>

              <button className="mt-auto w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white cursor-pointer py-4 font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Find My Solution →
              </button>
            </div>

          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-4xl mb-2">🕉️</div>
              <div className="text-2xl font-bold text-orange-600">1000+</div>
              <div className="text-sm text-gray-600">Devotees Helped</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-amber-600">4.9/5</div>
              <div className="text-sm text-gray-600">Satisfaction Rating</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-4xl mb-2">🔮</div>
              <div className="text-2xl font-bold text-indigo-600">15+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-4xl mb-2">📿</div>
              <div className="text-2xl font-bold text-green-600">24/7</div>
              <div className="text-sm text-gray-600">Divine Support</div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-8 md:p-12 mt-16">
            <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Why Devotees Trust Us
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-4xl">📜</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Authentic Vedic Knowledge</h4>
                <p className="text-gray-600">Based on ancient scriptures and traditional wisdom passed down through generations</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-4xl">⚡</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Quick Results</h4>
                <p className="text-gray-600">Simple, practical remedies that show positive changes within days</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-4xl">💝</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Personalized Approach</h4>
                <p className="text-gray-600">Every solution is customized to your unique situation and birth chart</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Connect with divine wisdom today and receive your personalized spiritual guidance
          </p>
          <button className="bg-white text-orange-600! font-bold py-4 px-12 rounded-full text-lg shadow-2xl hover:shadow-3xl transform transition hover:scale-105 cursor-pointer">
            Start Your Journey Now
          </button>
        </div>
      </section>

      <style>{`
        
      `}</style>
    </div>
  );
}