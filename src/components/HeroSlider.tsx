import { getHeroSectionByType } from "@/utils/API";
import { message } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface SlideItem {
  title: string;
  description: string;
  image: string;
  type: string;
  btnRedirect?: string;
  btnText?: string;
  orderIndex?: number;
}

interface HeroSliderProps {
  type: 'home' | 'about';
  // slides: SlideItem[];
  autoPlayInterval?: number;
}

const HeroSlider: React.FC<HeroSliderProps> = ({
  // slides,
  type,
  autoPlayInterval = 5000,
}) => {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<SlideItem[]>([]);
  // const [loading, setLoading] = useState(false);


  const fetchHeroSliders = async () => {
    // setLoading(true);
    try {
        const response = await getHeroSectionByType(type || "");
        if (response.data.status) {
          setSlides(response.data.data);
        }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroSliders();
  }, [type]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [slides.length, autoPlayInterval]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden group">
      {/* slides */}
      {slides?.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={`${import.meta.env.VITE_APP_Image_URL}/hero-section/${slide?.image}`}
            alt={`slide-${index}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* overlay text */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight">
            {slides[current]?.title}
          </h1>

          <p className="mt-4 max-w-2xl text-white/90">
            {slides[current]?.description}
          </p>
          <Link
            to={slides[current]?.btnRedirect || "/"}
            className="inline-block mt-6 bg-white text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition"
          >
            {slides[current]?.btnText}
          </Link>
        </div>
      </div>

      {/* left arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20
                   bg-black/40 hover:bg-black/60 text-white!
                   w-12 h-12 rounded-full flex items-center justify-center
                   opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* right arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20
                   bg-black/40 hover:bg-black/60 text-white!
                   w-12 h-12 rounded-full flex items-center justify-center
                   opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronRight className="w-4 h-4"/>
      </button>

      {/* dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? "bg-white scale-125" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
