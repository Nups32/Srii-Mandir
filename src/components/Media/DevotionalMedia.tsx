/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getMediaByType } from "@/utils/API";
import AudioCard from "@/components/Media/AudioCard";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { getYouTubeEmbedUrl } from "@/utils/Helper";
import { useSelector } from "react-redux";
import type { IRootState } from "@/store";

export default function DevotionalSongs() {
  const authData = useSelector((state: IRootState) => state.userConfig);
  // const [songs, setSongs] = useState<any[]>([]);

  // useEffect(() => {
  //   getMediaLatest()
  //     .then((res) => {
  //       const data = res.data.data.find((m: any) => m.type === "song");
  //       setSongs(data?.items || []);
  //     })
  //     .catch(() => message.error("Failed to load songs"));
  // }, []);

  const [media, setMedia] = useState<any[]>([]);
  const [_loading, setLoading] = useState<any>();
  const { type } = useParams<{ type: string }>();

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const response = await getMediaByType(type || "");
      if (response.data.status) {
        setMedia(response.data.data);
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <section className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-10">
          {type === "song"
            ? "All Devotional Songs"
            : type === "vedicMantra"
            ? "All Vedic Sutra Mantras"
            : "Kathas"}
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* {media.map((song) => (
            <AudioCard
              key={song._id}
              title={song.name}
              audio={`${import.meta.env.VITE_APP_Image_URL}/media/${song.file}`}
              free
              premium={false}
              isPaidUser={false}
            />
          ))} */}
          {media.map((song) => (
            <div key={song?._id}>
              {song?.media == "audio" ? (
                // <AudioCard
                //   key={song?._id}
                //   title={song?.name}
                //   audio={`${import.meta.env.VITE_APP_Image_URL}/media/${song?.file
                //     }`}
                //   free
                //   premium={false}
                //   isPaidUser={false}
                // />
                <AudioCard
                  title={song.name}
                  // audio={`${import.meta.env.VITE_APP_Image_URL}/media/${song.file}`}
                  audio={song.file}
                  _id={song._id}
                  // free
                  premium={song?.isPaid}
                  isPaidUser={authData?.isPaid}
                  // contentType="song"
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
      </div>
    </section>
  );
}
