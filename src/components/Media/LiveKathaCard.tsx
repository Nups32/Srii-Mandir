import { Radio, Video, Clock } from "lucide-react";
import AudioCard from "./AudioCard";
import { getYouTubeEmbedUrl } from "@/utils/Helper";

export default function LiveKathaCard({ katha }: any) {
  // const { title, type, source, isLive = true, schedule } = katha;
  const { title, type, isLive = true, schedule } = katha;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
      {/* Header */}
      <div className="flex items-center justify-between mb-4!">
        <div className="flex items-center gap-3 mb-4!">
          {type === "audio" && <Radio className="w-6 h-6 text-orange-500" />}
          {(type === "video" || type === "youtube") && (
            <Video className="w-6 h-6 text-orange-500" />
          )}

          <h3 className="text-lg font-semibold text-gray-900 mt-2!">{title}</h3>
        </div>

        {isLive && (
          <span className="text-xs font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full animate-pulse">
            LIVE
          </span>
        )}
      </div>
      {katha?.media == "audio" ?
        <AudioCard
          key={katha?._id}
          title={katha?.name}
          audio={`${import.meta.env.VITE_APP_Image_URL}/media/${katha?.file}`}
          free
          premium={false}
          isPaidUser={false}
        />
        : <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4!">
          <iframe
            src={getYouTubeEmbedUrl(katha?.url)}
            title={katha?.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>}

      {/* Player */}
      {/* {type === "audio" && (
        <audio controls className="w-full mb-4!">
          <source src={source} type="audio/mpeg" />
        </audio>
      )}

      {type === "video" && (
        <video controls className="w-full rounded-lg mb-4!">
          <source src={source} type="video/mp4" />
        </video>
      )} */}

      {/* {type === "youtube" && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4!">
          <iframe
            // src={`https://www.youtube.com/embed/${source}?rel=0&modestbranding=1`}
            src={`${source}?rel=0&modestbranding=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      )} */}

      {/* Schedule */}
      {!isLive && schedule && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-7!">
          <Clock className="w-4 h-4" />
          <span>{schedule}</span>
        </div>
      )}
    </div>
  );
}
