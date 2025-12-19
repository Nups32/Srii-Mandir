import { Lock, Music } from "lucide-react";

export default function AudioCard({ title, audio, free, premium, isPaidUser }: any) {
  const canDownload = free || (premium && isPaidUser);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
      
      <div className="flex items-center gap-3 mb-4">
        <Music className="w-6 h-6 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-900 mt-2!">{title}</h3>
      </div>

      <audio controls className="w-full mb-4">
        <source src={audio} type="audio/mpeg" />
      </audio>

      <div className="flex justify-between items-center">
        {canDownload ? (
        //   <button className="flex items-center gap-2 text-sm font-medium text-white! bg-orange-500 px-4 py-2 my-4! rounded-lg hover:bg-orange-600 transition cursor-pointer">
        //     <Download className="w-4 h-4" />
        //     Download
        //   </button>
        ""
        ) : (
          <button className="flex items-center gap-2 text-sm font-medium text-gray-400 bg-gray-100 px-4 py-2 my-4! rounded-lg cursor-not-allowed">
            <Lock className="w-4 h-4" />
            Premium Only
          </button>
        )}

        {premium && !isPaidUser && (
          <span className="text-sm text-orange-600 font-medium cursor-pointer">
            Upgrade to download
          </span>
        )}
      </div>
    </div>
  );
}
