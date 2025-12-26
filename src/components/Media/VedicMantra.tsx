/* eslint-disable @typescript-eslint/no-explicit-any */
import AudioCard from "@/components/Media/AudioCard";
import { getMediaLatest } from "@/utils/API";
import { useEffect, useState } from "react";

export default function Mantras({ isPaidUser }: any) {
  const [mantras, setMantras] = useState<any[]>([]);

  useEffect(() => {
    getMediaLatest().then((res) => {
      const data = res.data.data.find((m: any) => m.type === "mantra");
      setMantras(data?.items || []);
    });
  }, []);

  return (
    <section className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-10">All Vedic Sutra Mantras</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {mantras.map((mantra) => (
            // <AudioCard
            //   key={mantra._id}
            //   title={mantra.name}
            //   audio={`${import.meta.env.VITE_APP_Image_URL}/media/${mantra.file}`}
            //   premium
            //   free={false}
            //   isPaidUser={isPaidUser}
            // />

            <AudioCard
              title={mantra.name}
              _id={mantra._id}
              audio={`${import.meta.env.VITE_APP_Image_URL}/media/${
                mantra.file
              }`}
              premium={mantra.isPaid}
              isPaidUser={isPaidUser}
              // contentType="vedicMantra"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
