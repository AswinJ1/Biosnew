import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/autoplay"; // Add this import

// Add Autoplay to the imports
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import { RxArrowTopRight } from "react-icons/rx";
import { CarouselData } from "@/components/data/CarouselData";

const ActiveSlider = () => {
  return (
    <div className="flex items-center justify-center flex-col h-[900px] bg-transparent">
        <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium text-cyber-green bg-cyber-green/10 rounded-full">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-cyber-green animate-pulse"></span>
            <span className="typing-animation blink text-lg">Recent Highlights </span>
          </div>
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        // Add autoplay configuration
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[FreeMode, Pagination, Autoplay]} // Add Autoplay to modules
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {CarouselData.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.backgroundImage})` }}
              />
              <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
              <div className="relative flex flex-col gap-3">
                <item.icon className="text-green-600 group-hover:text-green-800 w-[32px] h-[32px]" />
                <h1 className="text-xl lg:text-2xl">{item.title} </h1>
                <p className="lg:text-[18px]">{item.content} </p>
              </div>
              <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-green-800 group-hover:rotate-45 duration-100" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ActiveSlider;