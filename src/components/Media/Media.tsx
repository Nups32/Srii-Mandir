import SectionTitle from "./MediaSectionTitle";
import AudioCard from "./AudioCard";
import LiveKathaCard from "./LiveKathaCard";
import music from "../../assets/media/music.mp3"

export default function DevotionalAudio({ isPaidUser }: any) {
  const devotionalSongs = [
    {
      title: "Shree Ganesh Aarti",
      audio: music,
    },
    {
      title: "Hanuman Chalisa",
      audio: music,
    },
  ];

  const vedicMantras = [
    {
      title: "Gayatri Mantra",
      audio: music,
    },
    {
      title: "Maha Mrityunjaya Mantra",
      audio: music,
    },
  ];

  const liveKathas = [
  // {
  //   title: "Shreemad Bhagwat Katha - Morning Session",
  //   type: "audio",
  //   // source: "/live/katha-audio.mp3",
  //   source: "https://www.youtube.com/embed/live/katha-audio.mp3",
  //   isLive: true,
  // },
  // {
  //   title: "Ram Katha - Evening Pravachan",
  //   type: "video",
  //   // source: "WOCDGuGrbqY",
  //   source: "https://www.youtube.com/embed/WOCDGuGrbqY",
  //   isLive: false,
  //   // schedule: "Today · 6:00 PM IST",
  // },
  {
    title: "Shrimad Bhagvat Katha",
    type: "youtube",
    // source: "8-J-eEgeprM", // video ID
    source: "https://www.youtube.com/embed/8-J-eEgeprM", // video ID
    isLive: false,
  },
  {
    title: "Ram Katha",
    type: "youtube",
    // source: "WOCDGuGrbqY", // video ID
    source: "https://www.youtube.com/embed/WOCDGuGrbqY", // video ID
    isLive: true,
  },
];


  return (
    <section className="min-h-screen bg-linear-to-b from-orange-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl  font-bold text-gray-900">
            Devotional Audio Library
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Listen to sacred devotional songs freely and access premium Vedic
            sutra mantras with our paid membership.
          </p>
        </div>

        {/* Free Devotional Songs */}
        <SectionTitle title="Devotional Songs" badge="Free Access" />

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {devotionalSongs.map((song, index) => (
            <AudioCard
              key={index}
              title={song.title}
              audio={song.audio}
              free
              premium={false}
              isPaidUser={false}
            />
          ))}
        </div>

        {/* Premium Vedic Mantras */}
        <SectionTitle title="Vedic Sutra Mantras" badge="Premium Content" />

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {vedicMantras.map((mantra, index) => (
            <AudioCard
              key={index}
              title={mantra.title}
              audio={mantra.audio}
              premium
              isPaidUser={isPaidUser}
              free={false}
            />
          ))}
        </div>

        {/* Live Katha Section */}
        <SectionTitle title="Live Katha & Pravachan" badge="Live / Upcoming" />

        <div className="grid md:grid-cols-2 gap-6">
          {liveKathas.map((katha, index) => (
            <LiveKathaCard key={index} katha={katha} />
          ))}
        </div>
      </div>
    </section>
  );
}
