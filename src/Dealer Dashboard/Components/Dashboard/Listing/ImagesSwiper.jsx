import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

function ImagesSwiper({images}) {
  const navigate = useNavigate()

  return (
    <div className="w-full border">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Add Autoplay module here
        // spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 1000, // Delay between slides in milliseconds (3 seconds)
          disableOnInteraction: false, // Auto-resume autoplay after user interaction
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1 }, // For very small screens
          768: { slidesPerView: 1 }, // Tablets
          1024: { slidesPerView: 1 }, // Medium screens
          1280: { slidesPerView: 1 }, // Large screens
        }}
      >
        {images?.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col  items-center p-3">
              <img
                src={img}
                className="w-full object-contain h-80 mb-2"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImagesSwiper;
