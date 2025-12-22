import { Lock, Music } from "lucide-react";

type AudioCardProps = {
  title: string;
  audio: string;
  premium?: boolean;
  free?: boolean;
  isPaidUser: boolean;
  contentType: "song" | "vedicMantra" | "katha";
};

export default function AudioCard({
  title,
  audio,
  premium = false,
  free = false,
  isPaidUser,
  contentType,
}: AudioCardProps) {
  const isVedicMantra = contentType === "vedicMantra";

  const canDownload =
    free || (!isVedicMantra && premium) || (premium && isPaidUser);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <Music className="w-6 h-6 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>

      {/* Playback allowed */}
      {/* <audio
        controls
        controlsList={
          !canDownload ? "nodownload" : undefined
        }
        className="w-full mb-4"
      >
        <source src={audio} type="audio/mpeg" />
      </audio> */}

      <audio
        controls
        controlsList={!isPaidUser ? "nodownload" : undefined}
        onContextMenu={isPaidUser ? (e) => e.preventDefault() : undefined}
        className="w-full mb-4"
      >
        <source src={audio} type="audio/mpeg" />
      </audio>

      <div className="flex justify-between items-center">
        {!canDownload ? (
          <button
            disabled
            className="flex items-center gap-2 text-sm font-medium text-gray-400 bg-gray-100 px-4 py-2 rounded-lg cursor-not-allowed"
          >
            <Lock className="w-4 h-4" />
            Premium Only
          </button>
        ) : null}

        {!isPaidUser && isVedicMantra && (
          <span className="text-sm text-orange-600 font-medium cursor-pointer">
            Upgrade to download
          </span>
        )}
      </div>
    </div>
  );
}
