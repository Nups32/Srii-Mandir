import bg from "../assets/bg.png";

import saradaDevi from "../assets/Sri_Ma_Sarada_Devi.jpg";
import anandamayiMa from "../assets/AnandamayiMa.jpg";
import ramakrishna from "../assets/SriRamakrishna.jpg";
import nityananda from "../assets/SwamiNityanand.png";

/*TYPES*/

interface ShaktiSectionProps {
  image: string;
  name: string;
  quote: string;
  legacy: string[];
  teachings: string[];
  mantraPractice: string;
  tantra: string;
  yoga: string;
  rituals: string[];
}

/*MAIN COMPONENT*/

const ShaktiSanyas = () => {
  return (
    <section className="relative py-20 px-4">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img src={bg} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-white/80" />
      </div>

      <div className="max-w-7xl mx-auto space-y-36">

        <ShaktiSection
          image={saradaDevi}
          name="Holy Mother Sarada Devi"
          quote={`"I am the mother of the wicked, as I am the mother of the virtuous.
Never fear. Whenever you are in distress, just say to yourself 'I have a mother.'"`}
          legacy={[
            "Sarada Devi, affectionately known as the Holy Mother, was the spiritual consort of Sri Ramakrishna and is regarded as one of the foremost spiritual figures of modern India.",
            "She embodied divine motherhood through simplicity, humility, and boundless compassion.",
            "Her life emphasized purity, patience, and universal acceptance beyond caste or gender."
          ]}
          teachings={[
            "Purity and patience in spiritual life",
            "Compassion toward all beings",
            "Surrender to the Divine Mother",
            "Spiritual equality"
          ]}
          mantraPractice="Silent repetition of the Divine Mother’s name with emphasis on inner purity."
          tantra="Shakta discipline expressed through devotion and restraint rather than ritual complexity."
          yoga="Bhakti Yoga — lived devotion through service and unconditional love."
          rituals={[
            "Simple daily worship",
            "Fasting and holy observances",
            "Initiation and guidance of disciples",
          ]}
        />

        <ShaktiSection
          image={anandamayiMa}
          name="Anandamayi Ma"
          quote="“Whatever path you follow, let it lead you to truth.”"
          legacy={[
            "Anandamayi Ma lived in uninterrupted divine awareness.",
            "Her presence alone guided seekers without formal instruction.",
            "She embodied spontaneous realization of Vedantic truth."
          ]}
          teachings={[
            "Constant remembrance of God",
            "Inner purity",
            "Unity of all paths",
            "Living awareness"
          ]}
          mantraPractice="Effortless inner remembrance arising naturally without structured repetition."
          tantra="Spontaneous awakening of Shakti without formal tantric practice."
          yoga="Jnana Yoga blended with natural Raja Yoga."
          rituals={[
            "Silence (mauna)",
            "Deep meditation",
            "Continuous God-awareness",
          ]}
        />

        <ShaktiSection
          image={ramakrishna}
          name="Sri Ramakrishna Paramahamsa"
          quote="“As many faiths, so many paths.”"
          legacy={[
            "Sri Ramakrishna practiced intense Kali sadhana.",
            "He realized the unity of all religions through direct experience.",
            "He emphasized realization over dogma."
          ]}
          teachings={[
            "Harmony of religions",
            "Devotion to the Divine Mother",
            "Direct realization",
            "Renunciation"
          ]}
          mantraPractice="Intense mantra repetition leading to repeated samadhi states."
          tantra="Formal Kali Tantra practiced under guidance."
          yoga="Bhakti Yoga supported by Raja Yoga samadhi."
          rituals={[
            "Midnight Kali worship",
            "Cremation-ground disciplines",
            "Multi-faith spiritual practices",
          ]}
        />

        <ShaktiSection
          image={nityananda}
          name="Swami Nityananda of Ganeshpuri"
          quote="“Silence itself is teaching.”"
          legacy={[
            "Swami Nityananda lived immersed in silence and tapasya.",
            "He awakened seekers through presence rather than words.",
            "His life radiated discipline and inner mastery."
          ]}
          teachings={[
            "Inner Shakti awakening",
            "Silence as transmission",
            "Self-discipline",
            "Surrender"
          ]}
          mantraPractice="Internal repetition practiced silently."
          tantra="Kundalini-centered discipline."
          yoga="Raja Yoga and Kundalini Yoga."
          rituals={[
            "Extended tapasya",
            "Fire rituals (homa)",
            "Silent transmission",
          ]}
        />

      </div>
    </section>
  );
};

/*SECTION*/

const ShaktiSection: React.FC<ShaktiSectionProps> = ({
  image,
  name,
  quote,
  legacy,
  teachings,
  mantraPractice,
  tantra,
  yoga,
  rituals,
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* Image */}
      <div className="flex flex-col items-center gap-5">
        <img
          src={image}
          alt={name}
          className="rounded-2xl shadow-md max-w-sm w-full object-cover"
        />
        <p className="text-sm md:text-base italic text-gray-600 text-center max-w-sm">
          {quote}
        </p>
      </div>

      {/* Content */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{name}</h1>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Life & Spiritual Legacy
        </h2>

        {legacy.map((para, index) => (
          <p key={index} className="text-gray-700 leading-relaxed mb-4 text-justify">
            {para}
          </p>
        ))}

        {/* Teachings */}
        <div className="mt-6 bg-orange-50 rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 mb-3">
            Core Spiritual Teachings
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {teachings.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Practices */}
        <div className="mt-8 space-y-4">
          <PracticeCard title="Mantra Practice" text={mantraPractice} />
          <PracticeCard title="Tantric Discipline" text={tantra} />
          <PracticeCard title="Yogic Path" text={yoga} />

          <div className="bg-white rounded-xl shadow-sm p-4 border">
            <h4 className="font-semibold text-gray-800 mb-2">
              Ancient Ritual Practices
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {rituals.map((ritual, index) => (
                <li key={index}>{ritual}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

/*SMALL CARD*/

const PracticeCard = ({ title, text }: { title: string; text: string }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 border">
    <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
    <p className="text-gray-700 text-sm md:text-base">{text}</p>
  </div>
);

export default ShaktiSanyas;
