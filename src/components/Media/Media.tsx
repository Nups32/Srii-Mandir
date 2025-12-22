/* eslint-disable @typescript-eslint/no-explicit-any */
import SectionTitle from "./MediaSectionTitle";
import AudioCard from "./AudioCard";
import LiveKathaCard from "./LiveKathaCard";
// import music from "../../assets/media/music.mp3"
import { getMediaLatest } from "@/utils/API";
import { message } from "antd";
import { useEffect, useState } from "react";
import { getYouTubeEmbedUrl } from "@/utils/Helper";

export default function Library({ isPaidUser }: any) {
  console.log("isPaidUser", isPaidUser);
  // const devotionalSongs = [
  //   {
  //     title: "Shree Ganesh Aarti",
  //     audio: music,
  //   },
  //   {
  //     title: "Hanuman Chalisa",
  //     audio: music,
  //   },
  // ];

  // const vedicMantras = [
  //   {
  //     title: "Gayatri Mantra",
  //     audio: music,
  //   },
  //   {
  //     title: "Maha Mrityunjaya Mantra",
  //     audio: music,
  //   },
  // ];

  // const liveKathas = [
  //   // {
  //   //   title: "Shreemad Bhagwat Katha - Morning Session",
  //   //   type: "audio",
  //   //   // source: "/live/katha-audio.mp3",
  //   //   source: "https://www.youtube.com/embed/live/katha-audio.mp3",
  //   //   isLive: true,
  //   // },
  //   // {
  //   //   title: "Ram Katha - Evening Pravachan",
  //   //   type: "video",
  //   //   // source: "WOCDGuGrbqY",
  //   //   source: "https://www.youtube.com/embed/WOCDGuGrbqY",
  //   //   isLive: false,
  //   //   // schedule: "Today · 6:00 PM IST",
  //   // },
  //   {
  //     title: "Shrimad Bhagvat Katha",
  //     type: "youtube",
  //     // source: "8-J-eEgeprM", // video ID
  //     source: "https://www.youtube.com/embed/8-J-eEgeprM", // video ID
  //     isLive: false,
  //   },
  //   {
  //     title: "Ram Katha",
  //     type: "youtube",
  //     // source: "WOCDGuGrbqY", // video ID
  //     source: "https://www.youtube.com/embed/WOCDGuGrbqY", // video ID
  //     isLive: true,
  //   },
  // ];

  const [songs, setSongs] = useState<any[]>([]);
  const [mantras, setMantras] = useState<any[]>([]);
  const [kathas, setKathas] = useState<any[]>([]);

  console.log("soungs", songs);
  console.log("mantras", mantras);
  console.log("kathas", kathas);

  const fetchMedia = async () => {
    // setLoading(true);
    try {
      const response = await getMediaLatest();
      if (response.data.status) {
        // console.log("response.data.data", response.data.data);
        response.data.data.map((media: any) => {
          media.type == "katha"
            ? setKathas(media.items)
            : media.type == "song"
            ? setSongs(media.items)
            : setMantras(media.items);
        });
        // setSlides(response.data.data);
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const allSongs = [...songs, ...songs];
  const allMantras = [...mantras, mantras];
  const allKathas = [...kathas, ...kathas];

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
        {/* <SectionTitle title="Devotional Songs" badge="Free Access" /> */}
        <SectionTitle
          title="Devotional Songs"
          badge="Free Access"
          viewAllPath="/media/song"
          showViewAll={songs.length > 1}
        />

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* {devotionalSongs.map((song, index) => ( */}
          {/* {songs?.map((song) => ( */}
          {allSongs.slice(0, 2).map((song) => (
            <div key={song?._id}>
              {song?.media == "audio" ? (
                <AudioCard
                  key={song?._id}
                  title={song?.name}
                  audio={`${import.meta.env.VITE_APP_Image_URL}/media/${
                    song?.file
                  }`}
                  free
                  premium={song?.isPaid || false}
                  isPaidUser={false}
                />
              ) : (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4!">
                  <iframe
                    key={song?._id}
                    src={getYouTubeEmbedUrl(song?.url)}
                    title={song?.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Premium Vedic Mantras */}
        {/* <SectionTitle title="Vedic Sutra Mantras" badge="Premium Content" /> */}
        <SectionTitle
          title="Vedic Sutra Mantras"
          badge="Premium Content"
          viewAllPath="/media/vedicMantra"
          showViewAll={mantras.length > 1}
        />

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* {vedicMantras.map((mantra, index) => (
            <AudioCard
              key={index}
              title={mantra.title}
              audio={mantra.audio}
              premium
              isPaidUser={isPaidUser}
              free={false}
            />
          ))} */}
          {/* {mantras?.map((mantra) => ( */}
          {allMantras.slice(0, 2).map((mantra) => (
            <div key={mantra?._id}>
              {mantra?.media == "audio" ? (
                <AudioCard
                  key={mantra?._id}
                  title={mantra?.name}
                  audio={`${import.meta.env.VITE_APP_Image_URL}/media/${
                    mantra?.file
                  }`}
                  premium={mantra?.isPaid}
                  isPaidUser={false}
                />
              ) : (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4!">
                  <iframe
                    key={mantra?._id}
                    src={getYouTubeEmbedUrl(mantra?.url)}
                    title={mantra?.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Live Katha Section */}
        {/* <SectionTitle title="Live Katha & Pravachan" badge="Live / Upcoming" /> */}
        <SectionTitle
          title="Live Katha & Pravachan"
          badge="Live / Upcoming"
          viewAllPath="/media/katha"
          showViewAll={kathas.length > 1}
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* {liveKathas.map((katha, index) => ( */}
          {/* {kathas.map((katha, index) => ( */}
          {allKathas.slice(0, 2).map((katha, i) => (
            <LiveKathaCard key={i} katha={katha} />
          ))}
        </div>
      </div>
    </section>
  );
}
