import { DownloadFreeMedia, DownloadPremiumMedia } from "@/utils/API";
import { message } from "antd";
import { Download, Lock, Music } from "lucide-react";
import { useState } from "react";

type AudioCardProps = {
  title: string;
  audio: string;
  _id: string;
  premium?: boolean;
  // free?: boolean;
  isPaidUser: boolean;
  // contentType: "song" | "vedicMantra" | "katha";
};

export default function AudioCard({
  title,
  audio,
  premium = false,
  _id,
  // free = false,
  isPaidUser,
}: AudioCardProps) {

  // const canDownload = free || (!isVedicMantra && premium) || (premium && isPaidUser);
  const canDownload = (!premium) || (premium && isPaidUser);
  const [_loading, setLoading] = useState<any>(false);


  const downloadMedia = async () => {
    setLoading(true);
    try {
      const response = premium ? await DownloadPremiumMedia(_id) : await DownloadFreeMedia(_id);
      const blob = new Blob([response.data], { type: "audio/mpeg" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.mp3`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Download failed");
    } finally {
      setLoading(false);
    }
  };

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
        controlsList={"nodownload"}
        onContextMenu={(e) => e.preventDefault()}
        // preload="none"
        className="w-full mb-4"
      >
        {audio && <source src={`${import.meta.env.VITE_APP_Image_URL}/media/${audio}`} type="audio/mpeg" />}
      </audio>

      <div className="flex justify-between items-center">
        {canDownload ? (
          <button onClick={downloadMedia} className="flex items-center gap-2 text-sm font-medium text-white! bg-orange-500 px-4 py-2 my-4! rounded-lg hover:bg-orange-600 transition cursor-pointer">
            <Download className="w-4 h-4" />
            Download
          </button>
        ) : <button
          disabled
          className="flex items-center gap-2 text-sm font-medium text-gray-400 bg-gray-100 px-4 py-2 rounded-lg cursor-not-allowed"
        >
          <Lock className="w-4 h-4" />
          Premium Only
        </button>}

        {!isPaidUser && !canDownload && (
          <span className="text-sm text-orange-600 font-medium cursor-pointer">
            Upgrade to download
          </span>
        )}
      </div>
    </div >
  );
}
