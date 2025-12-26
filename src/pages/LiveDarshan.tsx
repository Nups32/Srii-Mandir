import { useEffect, useState } from "react";
import { message, Spin, Modal } from "antd";
import { getMediaByType } from "@/utils/API";
import { getYouTubeEmbedUrl } from "@/utils/Helper";

const LiveDarshan = () => {
  const [loading, setLoading] = useState(false);
  const [darshan, setDarshan] = useState<any[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<any>(null);

  const fetchLiveDarshan = async () => {
    setLoading(true);
    try {
      const response: any = await getMediaByType("live-temple-darshan");
      if (response?.data?.status) {
        setDarshan(response.data.data || []);
      } else {
        message.error("Failed to fetch live darshan");
      }
    } catch (error) {
      message.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveDarshan();
  }, []);

  const openPreview = (item: any) => {
    setActiveVideo(item);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setActiveVideo(null); // stop video
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Live Temple Darshan
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Watch live and recorded temple darshan and experience divine
            blessings anytime, anywhere.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {darshan.length > 0 ? (
              darshan.map((item) => (
                <div
                  key={item?._id}
                  onClick={() => openPreview(item)}
                  className="cursor-pointer bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
                >
                  <div className="relative aspect-video">
                    <iframe
                      src={getYouTubeEmbedUrl(item?.url)}
                      title={item?.title}
                      frameBorder="0"
                      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                      className="absolute inset-0 w-full h-full pointer-events-none"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {item?.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Tap to watch in full screen
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                Live darshan will be available soon.
              </p>
            )}
          </div>
        )}

        {/* Video Modal */}
        <Modal
          open={previewOpen}
          onCancel={closePreview}
          footer={null}
          centered
          width="80%"
          destroyOnClose
        >
          {activeVideo && (
            <div className="relative w-full aspect-video">
              <iframe
                src={`${getYouTubeEmbedUrl(activeVideo?.url)}?autoplay=1`}
                title={activeVideo?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-lg"
              />
            </div>
          )}
        </Modal>

      </div>
    </section>
  );
};

export default LiveDarshan;