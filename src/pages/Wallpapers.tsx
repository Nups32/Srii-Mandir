import { useEffect, useState } from "react";
import { message, Spin, Modal, Carousel } from "antd";
import { getHeroSectionByType } from "@/utils/API";

const Wallpapers = () => {
  const [loading, setLoading] = useState(false);
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchWallpapers = async () => {
    setLoading(true);
    try {
      const response: any = await getHeroSectionByType("wallpaper");
      if (response?.data?.status) {
        setWallpapers(response.data.data || []);
      } else {
        message.error("Failed to fetch wallpapers");
      }
    } catch (error) {
      message.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallpapers();
  }, []);

  const openPreview = (index: number) => {
    setActiveIndex(index);
    setPreviewOpen(true);
  };

  return (
    <section className="min-h-screen bg-linear-to-b from-purple-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Divine Wallpapers
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Tap on a wallpaper to view in full screen and swipe through divine
            images filled with peace and devotion.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {wallpapers.length > 0 ? (
              wallpapers.map((item, index) => (
                <div
                  key={index}
                  onClick={() => openPreview(index)}
                  className="cursor-pointer group bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
                >
                  <img
                    src={`${import.meta.env.VITE_APP_Image_URL}/hero-section/${item?.image}`}
                    alt={item?.title}
                    className="w-full h-60 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="p-3 text-center">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {item?.title}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                Wallpapers will be available soon.
              </p>
            )}
          </div>
        )}

        {/* Preview Modal with Slider */}
        <Modal
          open={previewOpen}
          footer={null}
          onCancel={() => setPreviewOpen(false)}
          centered
          width="90%"
          className="wallpaper-preview-modal"
        >
          <Carousel
            initialSlide={activeIndex}
            dots
            arrows={true}
            infinite
          >
            {wallpapers.map((item, index) => (
              <div key={index} className="flex justify-center">
                <img
                  src={`${import.meta.env.VITE_APP_Image_URL}/hero-section/${item?.image}`}
                  alt={item?.title}
                  className="max-h-[80vh] object-contain mx-auto rounded-lg"
                />
              </div>
            ))}
          </Carousel>
        </Modal>

      </div>
    </section>
  );
};

export default Wallpapers;