// LocationCard.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Import Autoplay module
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Example Swiper modules (optional, add as needed)
import { Navigation, Pagination } from "swiper/modules";

function LocationCard({ image, name }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-44 h-40">
        <img
          src={image}
          alt={name}
          className="rounded-md w-full h-full object-cover"
        />
      </div>
      <h1 className="font-semibold mt-1">{name}</h1>
    </div>
  );
}

const cities = [
  { name: "Mumbai", image: "/mumbai.png" },
  { name: "Bangalore", image: "/bangalore.png" },
  { name: "Chandigarh", image: "/chandigarh.png" },
  { name: "Delhi", image: "/delhi.png" },
  { name: "Kolkata", image: "/kolkata.png" },
  { name: "Jaipur", image: "/jaipur.png" },
  { name: "Delhi", image: "/delhi.png" },
  { name: "Gurugram", image: "/gurugram.png" },
  { name: "panchkula", image: "/panchkula.png" },
];

export default function LocationCarousel() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Add Autoplay module here
        spaceBetween={20}
        slidesPerView={6}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 1000, // Delay between slides in milliseconds (3 seconds)
          disableOnInteraction: false, // Auto-resume autoplay after user interaction
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1 }, // For very small screens
          768: { slidesPerView: 3 }, // Tablets
          1024: { slidesPerView: 4 }, // Medium screens
          1280: { slidesPerView: 6 }, // Large screens
        }}
      >
        {cities.map((city) => (
          <SwiperSlide key={city.name}>
            <LocationCard image={city.image} name={city.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
