/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMediaLatest } from "@/utils/API";
import { useEffect, useState } from "react";
import LiveKathaCard from "./LiveKathaCard";

export default function Kathas() {
  const [kathas, setKathas] = useState<any[]>([]);

  useEffect(() => {
    getMediaLatest().then((res) => {
      const data = res.data.data.find((m: any) => m.type === "katha");
      setKathas(data?.items || []);
    });
  }, []);

  return (
    <section className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-10">All Kathas & Pravachans</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {kathas.map((katha) => (
            <LiveKathaCard key={katha._id} katha={katha} />
          ))}
        </div>
      </div>
    </section>
  );
}
