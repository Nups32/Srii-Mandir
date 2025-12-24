import shaktiSanyasi from "../assets/Sri_Ma_Sarada_Devi.jpg";
import bg from "../assets/bg.png";

const ShaktiSanyas = () => {
  return (
    <section className="relative  py-20 px-4">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img src={bg} alt="Background" className="w-full h-full object-cover" />
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/70" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">
            Holy Mother Sarada Devi
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A revered Shakti Sanyasini, spiritual guide, and universal mother
            whose life exemplified purity, compassion, and selfless devotion.
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <div className="flex justify-center items-center flex-col gap-6">
            <img
              src={shaktiSanyasi}
              alt="Holy Mother Sarada Devi"
              className="rounded-2xl shadow-lg w-100 object-cover"
            />
            <p className="max-w-sm text-sm md:text-md leading-relaxed text-justify hyphens-auto">
              "I am the mother of the wicked, as I am the mother of the
              virtuous. Never fear. Whenever you are in distress, just say to
              yourself 'I have a mother.'"
            </p>
          </div>

          {/* Biography */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Life & Spiritual Legacy
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4 text-justify hyphens-auto">
              Sarada Devi, affectionately known as the Holy Mother, was the
              spiritual consort of Sri Ramakrishna and is regarded as one of the
              foremost spiritual figures of modern India. Revered as a Shakti
              Sanyasini, she embodied divine motherhood and spiritual strength
              through simplicity, humility, and boundless compassion.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4 text-justify hyphens-auto">
              Born in rural Bengal, she lived a life of quiet austerity and
              unwavering devotion. Despite her simple outward life, her
              spiritual presence deeply influenced countless seekers. She guided
              disciples not through formal sermons, but through gentle counsel,
              personal example, and unconditional love.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6 text-justify hyphens-auto">
              Holy Mother emphasized purity of heart, patience, self-discipline,
              and surrender to the Divine. She accepted people from all walks of
              life, transcending distinctions of caste, gender, and social
              status, and is revered as the universal mother by devotees.
            </p>

            {/* Key Teachings */}
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                Core Spiritual Teachings
              </h3>
              <ul className="space-y-2 text-sm md:text-base text-gray-700 list-disc list-inside">
                <li>Purity, patience, and perseverance in spiritual life</li>
                <li>Selfless service and compassion toward all beings</li>
                <li>Faith in the Divine Mother and surrender of ego</li>
                <li>Spiritual equality of all human beings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShaktiSanyas;
