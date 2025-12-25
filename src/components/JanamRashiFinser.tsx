import { Button, Col, Form, Input, message, Row } from "antd";
import janamRashiBanner from "../assets/janama-rashi.jpg";
import FAQs from "./FAQs";
import LocationSearch from "./LocationPicker";
import { generateReport } from "@/utils/API";
import { useState } from "react";

export default function JanamRashiFinder() {
  const janamRashiContent = [
    {
      title: "What is Janma Rashi?",
      content:
        "Janma Rashi is your Moon Sign at the time of your birth. It is determined by the position of the Moon in one of the 12 zodiac signs in the Vedic astrology system. Unlike your Sun sign (popular in Western astrology), which changes monthly, your Moon sign changes every 2.25 days. That's why your exact date, time, and place of birth are needed to find your Janma Rashi accurately.",
    },
    {
      title: "Why is Janma Rashi Important?",
      content:
        "In Hindu astrology (Jyotish Shastra), Janma Rashi plays a very important role. It is used for creating your Kundali (birth chart), which is the foundation of Vedic astrology. Based on your Janma Rashi, your Nakshatra is identified, and the first letter of your name is often chosen using the Naam Rashi method. It is also essential for matching Kundalis during marriage (Guna Milan), which helps in checking compatibility between two individuals. Additionally, Janma Rashi is used for making your daily, weekly, and yearly horoscope predictions. It also helps in determining your Dasha periods, planetary transits, and the right astrological remedies to follow.",
    },
    {
      title: "How to use Janma Rashi Calculator?",
      content:
        "To find your Janma Rashi using the calculator, follow these simple steps. First, enter your Date of Birth accurately. Next, enter your Time of Birth, as even a small difference can affect the result. Then, enter your Place of Birth, which helps in calculating the exact planetary positions. After filling in all the details, click on the 'Calculate' button. The result will show your Janma Rashi, Nakshatra, and the Lord of your Rashi instantly.",
    },
    {
      title: "Benefits of Using Janma Rashi Calculator",
      content:
        "By using the Janma Rashi Calculator, you can know your accurate Moon Sign (Janma Rashi), which is the foundation of Vedic astrology. It also helps you find your Nakshatra (birth star) instantly and identify your Rashi Lord (Rashi Swami), which is important for astrological remedies. This information is especially useful for Kundali matching and checking marriage compatibility. It also plays a key role in Naamkaran Sanskar (naming ceremony) as per Vedic traditions. With these details, you can receive personalized horoscope predictions and discover your favorable days, colors, and lucky numbers based on your Rashi. Moreover, it is essential for selecting auspicious muhurats for important events like pujas, travel, or starting new work. Finally, it forms the basis for advanced Vedic calculations such as Dasha periods, planetary transits, and other astrological forecasts.",
    },
  ];

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Validate form & get values
      const values = await form.validateFields();
      const hour = Math.min(Math.max(Number(values.hour) || 0, 0), 23);
      const min = Math.min(Math.max(Number(values.min) || 0, 0), 59);

      // Prepare payload (only required fields)
      const formData = {
        day: Number(values.day),
        month: Number(values.month),
        year: Number(values.year),
        // hour: Number(values.hour),
        // min: Number(values.min),
        time: `${String(hour).padStart(2, "0")}:${String(min).padStart(
          2,
          "0"
        )}`,

        lat: Number(values.lat),
        lon: Number(values.lon),
        place: values.place,
      };

      console.log("formdata ", formData);

      //  Call backend API
      const res = await generateReport(formData);
      console.log("res of janamrashi", res);

      // Handle response
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
              src={janamRashiBanner}
              alt="Nakshatra Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" />

            {/* Banner Content */}
            <div className="relative max-w-5xl mx-auto px-4 h-full flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-white mb-2">
                {/* Nakshatra Finder */}
                Janma Rashi Calculator
              </h1>
              {/* <p className="text-gray-200 text-lg max-w-xl">
                Discover your Janma Nakshatra and understand its spiritual and
                astrological significance.
              </p> */}
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto px-4 py-8!">
            {/* Calculator Form */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-10 mb-20">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                Enter Your Details
              </h2>

              <Form form={form} onFinish={handleSubmit} layout="vertical">
                {/* DOB */}
                <Col xs={24}>
                  <Row className="bg-white mb-4">
                    <Col md={4}>
                      <label className="font-bold">Date of Birth *</label>
                    </Col>
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
                    <Col md={4}>
                      <label className="font-bold">Birth Time *</label>
                    </Col>
                    <Col md={4}>
                      <Form.Item name="hour" rules={[{ required: true }]}>
                        <Input type="number" size="large" placeholder="Hour" />
                      </Form.Item>
                    </Col>
                    <Col md={4}>
                      <Form.Item name="min" rules={[{ required: true }]}>
                        <Input
                          type="number"
                          size="large"
                          placeholder="Minute"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                {/* LOCATION */}
                <Col xs={24}>
                  <Row className="bg-white mb-4">
                    <Col md={4}>
                      <label className="font-bold">Birth Location *</label>
                    </Col>

                    <Col md={12}>
                      <Form.Item name="place" rules={[{ required: true }]}>
                        <LocationSearch form={form} />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Row className="bg-white mb-4">
                        <Col md={4}>
                          <label className="font-bold">Latitude *</label>
                        </Col>
                        <Col md={6}>
                          <Form.Item name="lat" rules={[{ required: true }]}>
                            <Input readOnly size="large" />
                          </Form.Item>
                        </Col>

                        <Col md={4}>
                          <label className="font-bold">Longitude *</label>
                        </Col>
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
                    <Col md={4}>
                      <label className="font-bold">Place *</label>
                    </Col>
                    <Col md={12}>
                      <Form.Item name="place" rules={[{ required: true }]}>
                        <Input
                          size="large"
                          placeholder="Mumbai, Maharashtra, India"
                        />
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
                  Find Janam Rashi
                </Button>
              </Form>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900">
                Horoscope / Janam Kundli
              </h2>
              <p className="text-gray-600 leading-relaxed text-justify hyphens-auto">
                In Vedic astrology, your Horoscope (Janam Kundli or Birth Chart)
                plays a crucial role in understanding your personality, life
                patterns, and future possibilities. Using our Horoscope
                Calculator, you can generate a detailed birth chart based on
                your date, time, and place of birth, offering deep insights into
                planetary influences on your career, relationships, health, and
                spiritual journey.
              </p>
            </div>

            <div className="space-y-10">
              {janamRashiContent.map((item, index) => (
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
          </div>
        </div>

        {/* FAQs */}
        <div>
          <FAQs type="janamRashi" />
        </div>
      </div>
    </section>
  );
}
