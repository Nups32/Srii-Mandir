import nakshtraBanner from "../assets/nakshtra-banner.jpg";
import FAQs from "./FAQs";

export default function NakshatraFinder() {
  const nakshatraContent = [
    {
      title: "What is a Nakshatra?",
      content:
        "A Nakshatra Finder is a helpful tool that allows you to discover your birth star (Nakshatra) using your date, time, and place of birth. It accurately calculates the position of the Moon at the exact moment you were born and matches it to one of the 27 Nakshatras in Vedic astrology. This tool is also commonly known by other names such as Nakshatra Calculator, Birth Star Finder, or Janma Nakshatra Calculator. While the backend relies on complex astronomical and astrological formulas, the interface is user-friendly; simply enter your birth details, and you'll instantly get your Nakshatra along with related insights.",
    },
    {
      title: "Find Nakshatra by Date of Birth / Birth Star Finder",
      content:
        "One of the most common and reliable ways to determine your Nakshatra (birth star) is by using your date of birth. This method is simple, quick, and widely accessible due to the availability of online birth star finder tools. These tools use precise astronomical calculations to identify the position of the Moon at the exact moment of your birth and match it with one of the 27 Nakshatras in Vedic astrology. To use such a calculator, you'll need three key details: your Date of Birth (in dd/mm/yyyy format), your Exact Time of Birth (as accurate as possible), and your Place of Birth, including city and country. With this information, you can instantly discover your Janma Nakshatra and gain deeper insights into your personality, behavior, and life path.",
    },
    {
      title: "How to Know Nakshatra and Rashi by Birth?",
      content:
        "Both Nakshatra and Rashi are calculated based on the Moon's exact position at the time of your birth. Your Rashi (Moon Sign) refers to the zodiac sign the Moon was located in when you were born, while your Nakshatra indicates the specific lunar mansion or constellation that the Moon was passing through at that moment. Together, they form a crucial part of your Vedic birth chart and deeply influence your personality and life path. Knowing your Rashi and Nakshatra offers insights into your emotional nature, helps identify your lucky days and gemstones, guides traditional Hindu naming ceremonies (Namkaran), and plays an essential role in assessing marriage compatibility through Kundli Milan.",
    },
    {
      title: "Benefits of Using a Nakshatra Calculator",
      content:
        "Using a Nakshatra calculator provides both practical and spiritual benefits by offering accurate information about your birth star. This knowledge plays a vital role in various aspects of life. It helps in Kundli matching for marriage compatibility, supports personal growth by enhancing self-awareness, and is commonly used for choosing auspicious dates (Muhurats) for important events like weddings, pujas, or new ventures. Additionally, understanding your Nakshatra can guide you in making better decisions related to your career, relationships, and spiritual journey, aligning your actions with cosmic influences.",
    },
  ];

  return (
    <section className="flex justify-center items-center mt-8 px-2">
      <div className="">
        <div className="">
          {/* Hero Banner */}
          <div className="relative h-65 overflow-hidden rounded-2xl">
            <img
              src={nakshtraBanner}
              alt="Nakshatra Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" />

            {/* Banner Content */}
            <div className="relative max-w-5xl mx-auto px-4 h-full flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-white mb-2">
                Nakshatra Finder
              </h1>
              <p className="text-gray-200 text-lg max-w-xl">
                Find your Janma Nakshatra using accurate Vedic astrology
                calculations
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto px-4 py-8!">
            {/* Calculator Form */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-10 mb-20">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                Enter Your Birth Details
              </h2>

              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {" "}
                      Name{" "}
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="vedic-input"
                      required
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <select
                      name="gender"
                      className="vedic-input mt-6!"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Father's Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {" "}
                      Father's Name{" "}
                    </label>
                    <input
                      type="text"
                      name="fatherName"
                      placeholder="Father's Name"
                      className="vedic-input"
                      required
                    />
                  </div>

                  {/* Mother's Name */}
                  {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1"> Mother's Name </label>
                  <input
                    type="text"
                    name="motherName"
                    placeholder="Mother's Name"
                    className="vedic-input"
                    required
                  />
                </div> */}

                  {/* Partner's Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {" "}
                      Spouse's Name{" "}
                    </label>
                    <input
                      type="text"
                      name="partnerName"
                      placeholder="Spouse's Name (if applicable)"
                      className="vedic-input"
                    />
                  </div>

                  {/* Child's Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {" "}
                      Child's Name{" "}
                    </label>
                    <input
                      type="text"
                      name="babyName"
                      placeholder="Child's Name (if applicable)"
                      className="vedic-input"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {" "}
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email (optional)"
                      className="vedic-input"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {" "}
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number (optional)"
                      className="vedic-input"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {" "}
                      Date of Birth{" "}
                    </label>
                    <input
                      type="date"
                      name="dob"
                      className="vedic-input"
                      required
                    />
                  </div>

                  {/* Time of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {" "}
                      Time of Birth{" "}
                    </label>
                    <input
                      type="time"
                      name="tob"
                      className="vedic-input"
                      required
                    />
                  </div>

                  {/* Place of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {" "}
                      Place of Birth{" "}
                    </label>
                    <input
                      type="text"
                      name="place"
                      placeholder="Place of Birth (City, Country)"
                      className="vedic-input"
                      required
                    />
                  </div>

                  {/* Birth State / Country (optional) */}
                  {/* <div>
                  <input
                    type="text"
                    name="state"
                    placeholder="State / Country (optional)"
                    className="vedic-input"
                  />
                </div> */}

                  {/* Current City (optional) */}
                  {/* <div>
                  <input
                    type="text"
                    name="currentCity"
                    placeholder="Current City (optional)"
                    className="vedic-input"
                  />
                </div> */}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-green-600 text-white! font-medium hover:bg-green-700 transition cursor-pointer"
                >
                  Find Nakshatra
                </button>
              </form>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900">
                Nakshatra Finder
              </h2>
              <p className="text-gray-600 leading-relaxed text-justify hyphens-auto">
                In Vedic astrology, your Nakshatra (birth star) plays a vital
                role in shaping your personality, emotions, and life journey.
                Using our Nakshatra Finder Calculator, you can easily discover
                your Janma Nakshatra based on your date, time, and place of
                birth.
              </p>
            </div>

            {/* What is Nakshatra */}
            {/* <div className="mb-15">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What is a Nakshatra?
              </h3>
              <p className="text-gray-600 leading-relaxed text-justify hyphens-auto">
                A Nakshatra Finder is a helpful tool that allows you to discover
                your birth star (Nakshatra) using your date, time, and place of
                birth. It accurately calculates the position of the Moon at the
                exact moment you were born and matches it to one of the 27
                Nakshatras in Vedic astrology. This tool is also commonly known
                by other names such as Nakshatra Calculator, Birth Star Finder,
                or Janma Nakshatra Calculator. While the backend relies on
                complex astronomical and astrological formulas, the interface is
                user-friendly simply enter your birth details, and you'll
                instantly get your Nakshatra along with related insights.
              </p>
            </div>

            <div className="mb-15">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Find Nakshatra by Date of Birth / Birth Star Finder
              </h3>
              <p className="text-gray-600 leading-relaxed text-justify hyphens-auto">
                One of the most common and reliable ways to determine your
                Nakshatra (birth star) is by using your date of birth. This
                method is simple, quick, and widely accessible due to the
                availability of online birth star finder tools. These tools use
                precise astronomical calculations to identify the position of
                the Moon at the exact moment of your birth and match it with one
                of the 27 Nakshatras in Vedic astrology. To use such a
                calculator, you'll need three key details: your Date of Birth
                (in dd/mm/yyyy format), your Exact Time of Birth (as accurate as
                possible), and your Place of Birth, including city and country.
                With this information, you can instantly discover your Janma
                Nakshatra and gain deeper insights into your personality,
                behavior, and life path.
              </p>
            </div>
            <div className="mb-15">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How to Know Nakshatra and Rashi by Birth?
              </h3>
              <p className="text-gray-600 leading-relaxed text-justify hyphens-auto">
                Both Nakshatra and Rashi are calculated based on the Moon's
                exact position at the time of your birth. Your Rashi (Moon Sign)
                refers to the zodiac sign the Moon was located in when you were
                born, while your Nakshatra indicates the specific lunar mansion
                or constellation that the Moon was passing through at that
                moment. Together, they form a crucial part of your Vedic birth
                chart and deeply influence your personality and life path.
                Knowing your Rashi and Nakshatra offers insights into your
                emotional nature, helps identify your lucky days and gemstones,
                guides traditional Hindu naming ceremonies (Namkaran), and plays
                an essential role in assessing marriage compatibility through
                Kundli Milan.
              </p>
            </div>

            <div className="mb-20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Benefits of Using a Nakshatra Calculator
              </h3>
              <p className="text-gray-600 leading-relaxed text-justify hyphens-auto">
                Using a Nakshatra calculator provides both practical and
                spiritual benefits by offering accurate information about your
                birth star. This knowledge plays a vital role in various aspects
                of life. It helps in Kundli matching for marriage compatibility,
                supports personal growth by enhancing self-awareness, and is
                commonly used for choosing auspicious dates (Muhurats) for
                important events like weddings, pujas, or new ventures.
                Additionally, understanding your Nakshatra can guide you in
                making better decisions related to your career, relationships,
                and spiritual journey, aligning your actions with cosmic
                influences.
              </p>
            </div> */}

            <div className="space-y-10">
              {nakshatraContent.map((item, index) => (
                <div className="mb-15" key={index}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-justify hyphens-auto">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Today's Nakshatra */}
            {/* <div className="bg-white border border-gray-100 rounded-2xl p-10 mb-20">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">
              Today’s Nakshatra
            </h3>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                ["Nakshatra", "Jyeshtha"],
                ["Rashi (Moon Sign)", "Scorpio"],
                ["Nakshatra Pada", "Pada 3"],
                ["Zodiac Sign", "Scorpio"],
              ].map(([label, value], i) => (
                <div key={i}>
                  <p className="text-sm text-gray-500 mb-1">{label}</p>
                  <p className="font-semibold text-gray-900">{value}</p>
                </div>
              ))}
            </div>
            </div> */}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <FAQs type="nakshtra" />
        </div>
      </div>
    </section>
  );
}
