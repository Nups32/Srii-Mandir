import { pujaData } from "../../../details";

export default function AboutPuja() {
  const about = pujaData[0]?.about;

  if (!about) return null;

  return (
    <section
      id="about-puja"
      className="scroll-mt-32 py-10 max-w-7xl mx-auto px-4"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{about.title}</h2>

      <p className="text-gray-600 leading-relaxed">{about.description}</p>
    </section>
  );
}
