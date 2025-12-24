import { Button, Col, Form, Input, message, Row, Select } from "antd";
import nakshtraBanner from "../assets/nakshtra-banner.jpg";
import FAQs from "./FAQs";
import LocationSearch from "./LocationPicker";
import { generateReport } from "@/utils/API";
import { useState } from "react";

export default function NakshatraFinder() {
  // const nakshatraContent = [
  //   {
  //     title: "What is a Nakshatra?",
  //     content:
  //       "A Nakshatra Finder is a helpful tool that allows you to discover your birth star (Nakshatra) using your date, time, and place of birth. It accurately calculates the position of the Moon at the exact moment you were born and matches it to one of the 27 Nakshatras in Vedic astrology. This tool is also commonly known by other names such as Nakshatra Calculator, Birth Star Finder, or Janma Nakshatra Calculator. While the backend relies on complex astronomical and astrological formulas, the interface is user-friendly; simply enter your birth details, and you'll instantly get your Nakshatra along with related insights.",
  //   },
  //   {
  //     title: "Find Nakshatra by Date of Birth / Birth Star Finder",
  //     content:
  //       "One of the most common and reliable ways to determine your Nakshatra (birth star) is by using your date of birth. This method is simple, quick, and widely accessible due to the availability of online birth star finder tools. These tools use precise astronomical calculations to identify the position of the Moon at the exact moment of your birth and match it with one of the 27 Nakshatras in Vedic astrology. To use such a calculator, you'll need three key details: your Date of Birth (in dd/mm/yyyy format), your Exact Time of Birth (as accurate as possible), and your Place of Birth, including city and country. With this information, you can instantly discover your Janma Nakshatra and gain deeper insights into your personality, behavior, and life path.",
  //   },
  //   {
  //     title: "How to Know Nakshatra and Rashi by Birth?",
  //     content:
  //       "Both Nakshatra and Rashi are calculated based on the Moon's exact position at the time of your birth. Your Rashi (Moon Sign) refers to the zodiac sign the Moon was located in when you were born, while your Nakshatra indicates the specific lunar mansion or constellation that the Moon was passing through at that moment. Together, they form a crucial part of your Vedic birth chart and deeply influence your personality and life path. Knowing your Rashi and Nakshatra offers insights into your emotional nature, helps identify your lucky days and gemstones, guides traditional Hindu naming ceremonies (Namkaran), and plays an essential role in assessing marriage compatibility through Kundli Milan.",
  //   },
  //   {
  //     title: "Benefits of Using a Nakshatra Calculator",
  //     content:
  //       "Using a Nakshatra calculator provides both practical and spiritual benefits by offering accurate information about your birth star. This knowledge plays a vital role in various aspects of life. It helps in Kundli matching for marriage compatibility, supports personal growth by enhancing self-awareness, and is commonly used for choosing auspicious dates (Muhurats) for important events like weddings, pujas, or new ventures. Additionally, understanding your Nakshatra can guide you in making better decisions related to your career, relationships, and spiritual journey, aligning your actions with cosmic influences.",
  //   },
  // ];

  const horoscopeContent = [
    {
      title: "What is a Horoscope?",
      content:
        "A Horoscope is a detailed astrological chart that represents the positions of the Sun, Moon, and planets at the exact time and place of your birth. It is commonly known as Janam Kundli or Birth Chart in Vedic astrology. A Horoscope helps you understand your personality traits, strengths, challenges, and life patterns by interpreting planetary influences. Using accurate birth details such as date, time, and place of birth, a horoscope provides deep insights into various aspects of life including career, relationships, health, finances, and spiritual growth.",
    },
    {
      title: "Create Horoscope by Date of Birth / Birth Chart Generator",
      content:
        "One of the most accurate ways to generate a Horoscope is by using your date of birth along with your exact time and place of birth. A Horoscope calculator uses precise astronomical calculations to determine planetary positions at the moment you were born and maps them into the twelve zodiac signs and astrological houses. To generate your Janam Kundli, you need to enter your Date of Birth (dd/mm/yyyy), Exact Time of Birth, and Place of Birth. With this information, you can instantly receive a detailed horoscope that reveals key insights about your life journey.",
    },
    {
      title: "How to Know Horoscope, Rashi, and Planetary Positions?",
      content:
        "Your Horoscope, Rashi (Moon Sign), and planetary placements are all determined by the exact position of the Moon and other planets at the time of your birth. The Rashi represents the zodiac sign occupied by the Moon, while planetary positions across different houses influence specific areas of your life. Together, these elements form the foundation of your Vedic birth chart and play a vital role in predicting life events, understanding emotional tendencies, and assessing compatibility. Horoscope analysis is also essential for Kundli Milan, gemstone recommendations, and selecting auspicious Muhurats.",
    },
    {
      title: "Benefits of Using a Horoscope Calculator",
      content:
        "Using a Horoscope calculator offers valuable insights into your life by providing an accurate and personalized birth chart. It helps you understand your strengths and challenges, make informed decisions regarding career and relationships, and plan important events at auspicious times. A detailed horoscope is widely used for marriage compatibility checks, career guidance, health analysis, and spiritual growth. By understanding your horoscope, you can align your actions with planetary influences and move forward with greater clarity and confidence.",
    },
  ];

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // 1️⃣ Validate form & get values
      const values = await form.validateFields();

      // 2️⃣ Prepare payload (only required fields)
      const formData = {
        name: values.name,
        gender: values.gender,
        day: Number(values.day),
        month: Number(values.month),
        year: Number(values.year),
        hour: Number(values.hour),
        min: Number(values.min),
        lat: Number(values.lat),
        lon: Number(values.lon),
        place: values.place,
        language: values.language,
        // tzone: Number(values.tzone),
        chart_style: values.chart_style
      };

      // 3️⃣ Call backend API
      const res = await generateReport(formData);

      // 4️⃣ Handle response
      if (res?.data?.success) {
        message.success(
          "Your horoscope report is being generated and is sent to your email"
        );

        // Optional
        // form.resetFields();
      } else {
        message.error(
          res?.data?.message || "Failed to generate horoscope report"
        );
      }
    } catch (error: any) {
      console.error("Submit Error:", error);

      if (error?.errorFields) {
        message.warning("Please fill all required fields correctly.");
      } else {
        message.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


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
                {/* Nakshatra Finder */}
                Generate Horoscope Report
              </h1>
              <p className="text-gray-200 text-lg max-w-xl">
                Discover your Janma Nakshatra and understand its spiritual and
                astrological significance.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto px-4 py-8!">
            {/* Calculator Form */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-10 mb-20">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                Enter Your Details
              </h2>

              {/* <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
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


                  
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-green-600 text-white! font-medium hover:bg-green-700 transition cursor-pointer"
                >
                  Find Nakshatra
                </button>
              </form> */}

              <Form form={form} onFinish={handleSubmit} layout="vertical">
                {/* NAME */}
                <Col xs={24}>
                  <Row className="bg-white mb-4">
                    <Col md={4}><label className="font-bold">Name *</label></Col>
                    <Col md={12}>
                      <Form.Item name="name" rules={[{ required: true }]}>
                        <Input size="large" placeholder="Rahul Sharma" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                {/* GENDER */}
                <Col xs={24}>
                  <Row className="bg-white mb-4">
                    <Col md={4}><label className="font-bold">Gender *</label></Col>
                    <Col md={12}>
                      <Form.Item name="gender" rules={[{ required: true }]}>
                        <Select size="large" placeholder="Select gender">
                          <Select.Option value="male">Male</Select.Option>
                          <Select.Option value="female">Female</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                {/* DOB */}
                <Col xs={24}>
                  <Row className="bg-white mb-4">
                    <Col md={4}><label className="font-bold">Date of Birth *</label></Col>
                    <Col md={4}>
                      <Form.Item name="day" rules={[{ required: true }]}>
                        <Input type="number" size="large" placeholder="Day" />
                      </Form.Item>
                    </Col>
                    <Col md={4}>
                      <Form.Item name="month" rules={[{ required: true }]}>
                        <Input type="number" size="large" placeholder="Month" />
                      </Form.Item>
                    </Col>
                    <Col md={4}>
                      <Form.Item name="year" rules={[{ required: true }]}>
                        <Input type="number" size="large" placeholder="Year" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                {/* TIME */}
                <Col xs={24}>
                  <Row className="bg-white mb-4">
                    <Col md={4}><label className="font-bold">Birth Time *</label></Col>
                    <Col md={4}>
                      <Form.Item name="hour" rules={[{ required: true }]}>
                        <Input type="number" size="large" placeholder="Hour" />
                      </Form.Item>
                    </Col>
                    <Col md={4}>
                      <Form.Item name="min" rules={[{ required: true }]}>
                        <Input type="number" size="large" placeholder="Minute" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                {/* LOCATION */}
                <Col xs={24}>
                  <Row className="bg-white mb-4">
                    <Col md={4}><label className="font-bold">Birth Location *</label></Col>
                    {/* <Col md={6}>
                      <Form.Item name="lat" rules={[{ required: true }]}>
                        <Input size="large" placeholder="Latitude" />
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item name="lon" rules={[{ required: true }]}>
                        <Input size="large" placeholder="Longitude" />
                      </Form.Item>
                    </Col> */}
                    <Col md={12}>
                      <Form.Item name="place" rules={[{ required: true }]}>
                        <LocationSearch form={form} />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Row className="bg-white mb-4">
                        <Col md={4}><label className="font-bold">Latitude *</label></Col>
                        <Col md={6}>
                          <Form.Item name="lat" rules={[{ required: true }]}>
                            <Input readOnly size="large" />
                          </Form.Item>
                        </Col>

                        <Col md={4}><label className="font-bold">Longitude *</label></Col>
                        <Col md={6}>
                          <Form.Item name="lon" rules={[{ required: true }]}>
                            <Input readOnly size="large" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                {/* PLACE */}
                <Col xs={24}>
                  <Row className="bg-white mb-4">
                    <Col md={4}><label className="font-bold">Place *</label></Col>
                    <Col md={12}>
                      <Form.Item name="place" rules={[{ required: true }]}>
                        <Input size="large" placeholder="Mumbai, Maharashtra, India" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                {/* LANGUAGE */}
                <Col xs={24}>
                  <Row className="bg-white mb-4">
                    <Col md={4}><label className="font-bold">Language *</label></Col>
                    <Col md={12}>
                      <Form.Item name="language" rules={[{ required: true }]}>
                        <Select size="large">
                          <Select.Option value="en">English</Select.Option>
                          <Select.Option value="hi">Hindi</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                {/* TIMEZONE */}
                {/* <Col xs={24}>
                  <Row className="bg-white mb-4">
                    <Col md={4}><label className="font-bold">Timezone *</label></Col>
                    <Col md={12}>
                      <Form.Item name="tzone" rules={[{ required: true }]}>
                        <Input size="large" placeholder="5.5" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col> */}

                {/* CHART STYLE */}
                <Col xs={24}>
                  <Row className="bg-white mb-4">
                    <Col md={4}><label className="font-bold">Chart Style *</label></Col>
                    <Col md={12}>
                      <Form.Item name="chart_style" rules={[{ required: true }]}>
                        <Select size="large">
                          <Select.Option value="NORTH_INDIAN">North Indian</Select.Option>
                          <Select.Option value="SOUTH_INDIAN">South Indian</Select.Option>
                          <Select.Option value="EAST_INDIAN">East Indian</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                <Button
                  type="primary"
                  size="large"
                  disabled={loading}
                  loading={loading}
                  onClick={handleSubmit}
                >
                  Generate Horoscope PDF
                </Button>


              </Form>

            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900">
                Horoscope / Janam Kundli
              </h2>
              <p className="text-gray-600 leading-relaxed text-justify hyphens-auto">
                In Vedic astrology, your Horoscope (Janam Kundli or Birth Chart) plays a
                crucial role in understanding your personality, life patterns, and future
                possibilities. Using our Horoscope Calculator, you can generate a detailed
                birth chart based on your date, time, and place of birth, offering deep
                insights into planetary influences on your career, relationships, health,
                and spiritual journey.
              </p>
            </div>


            {/* Description */}
            {/* <div className="mb-10">
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
            </div> */}

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
              {horoscopeContent.map((item, index) => (
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
