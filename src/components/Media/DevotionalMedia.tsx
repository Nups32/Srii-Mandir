/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getMediaLatest } from "@/utils/API";
import AudioCard from "@/components/Media/AudioCard";
import { message } from "antd";

export default function DevotionalSongs() {
  const [songs, setSongs] = useState<any[]>([]);

  useEffect(() => {
    getMediaLatest()
      .then((res) => {
        const data = res.data.data.find((m: any) => m.type === "song");
        setSongs(data?.items || []);
      })
      .catch(() => message.error("Failed to load songs"));
  }, []);

  return (
    <section className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-10">All Devotional Songs</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {songs.map((song) => (
            <AudioCard
              key={song._id}
              title={song.name}
              audio={`${import.meta.env.VITE_APP_Image_URL}/media/${song.file}`}
              free
              premium={false}
              isPaidUser={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
