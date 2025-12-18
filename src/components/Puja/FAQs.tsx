import { ChevronRight } from "lucide-react";

export default function FAQs() {
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
    <>
      <section id="faqs">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Frequently asked Questions
          </h2>
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
      </section>
    </>
  );
}
