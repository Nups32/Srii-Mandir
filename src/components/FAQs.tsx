export default function FAQs({ type = "puja" }) {
  const pujaFaqs = [
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

  const chadhavaFaqs = [
    {
      question: "How will the Chadhava be done?",
      answer:
        "Through the Srii Mandir Chadhava Service website, your offering will be devoutly presented by our experienced Purohits. You will receive a video of the ritual within 24-48 hours.",
    },
    {
      question: "What is Mahaseva?",
      answer:
        "Mahaseva is a highly virtuous donation described in the Vedas and Puranas. It involves selfless offerings like food, clothing, and grains, bringing spiritual merit and liberation from karmic bonds.",
    },
    {
      question: "How can I check the status of my service?",
      answer:
        "After booking, you will receive updates via WhatsApp. You can also check your service details in the 'Chadhava Bookings' section of the Srii Mandir website",
    },
    {
      question: "Who should I contact if there is an issue with my service?",
      answer:
        "If you face any issues with your service, you can contact the Srii Mandir customer support team, who are always ready to assist you.",
    },
  ];

  const nakshtraFaqs = [
    {
      question: "What is a Nakshatra Finder?",
      answer:
        "A Nakshatra Finder is an online tool that tells you your birth star based on your birth details using Vedic astrology principles.",
    },
    {
      question: "How can I use a Nakshatra Calculator?",
      answer:
        "Simply enter your date, time, and place of birth into the Nakshatra Calculator to get your Janma Nakshatra and moon sign.",
    },
    {
      question: "Can I find my Nakshatra by date of birth only?",
      answer:
        "Yes, we allow Nakshatra finding using just the date of birth, but including the exact time and place ensures better accuracy.",
    },
    {
      question: "What is a birth star finder?",
      answer:
        "A birth star finder is another name for a Nakshatra calculator, it shows your birth star from your astrological data.",
    },
    {
      question: "Are Nakshatra and Rashi the same?",
      answer:
        "No, Rashi is the moon's zodiac sign; Nakshatra is the lunar mansion. Both are vital and different.",
    },
    {
      question: "How to know Nakshatra from my horoscope?",
      answer:
        "Your horoscope or birth chart will list your Nakshatra in the section showing the Moon's location at your birth.",
    },
    {
      question: "What is the connection between Rashi and Nakshatra by birth?",
      answer:
        "Both Rashi and Nakshatra are calculated using the moon's position at birth. Rashi shows the sign, while Nakshatra shows the star.",
    },
    {
      question: "What does Janma Nakshatra mean?",
      answer:
        "Janma Nakshatra means the Nakshatra the moon occupied at the moment you were born. It reveals deep insights into your life path",
    },
    {
      question: "Where can I find a reliable Janma Nakshatra calculator?",
      answer:
        "You can use our free and accurate Nakshatra Finder Calculator on this page to instantly know your Janma Nakshatra and Rashi.",
    },
  ];

  // Show FAQs based on type
  let faqsToShow;
  if (type === "chadhava") {
    faqsToShow = chadhavaFaqs;
  } else if (type === "nakshtra") {
    faqsToShow = nakshtraFaqs;
  } else {
    faqsToShow = pujaFaqs;
  }

  return (
    <section id="faqs" className="px-4 pt-5">
      <div className="my-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8!">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqsToShow.map((faq, index) => (
            <details
              key={index}
              className="bg-gray-50 rounded-lg p-4 cursor-pointer"
            >
              <summary className="font-semibold text-gray-800 flex justify-between">
                {faq.question}
              </summary>
              <p className="text-gray-600 text-sm mt-4! leading-6">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
