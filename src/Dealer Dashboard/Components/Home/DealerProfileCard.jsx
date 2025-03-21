import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchDealersAsync } from "../../../Redux/Features/dealersSlice";
import { useNavigate } from "react-router-dom";

function DealerProfileCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dealers, fetchStatus } = useSelector((state) => state.dealers);

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchDealersAsync());
    }
  }, [fetchStatus, dispatch]);

  console.log("dealers", dealers);
  return (
    <div className="w-full">
      {dealers && dealers.length > 0 ? (
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
          {dealers?.map((dealer) => (
            <SwiperSlide
              key={dealer.id}
              onClick={() => navigate(`/dealerProfile/${dealer.id}`)}
            >
              <div className="flex flex-col  items-center h-60 p-3 border cursor-pointer">
                <img
                  src={dealer.profileUrl || "/dummy-profile.png"}
                  className="w-32 h-32 object-cover rounded-full mb-2"
                />
                <h1 className="font-[600] text-lg">{dealer.fullName}</h1>
                <h1 className="text-sm text-gray-600">
                  {dealer?.Category?.title}
                </h1>
                <h1 className="text-sm">
                  {dealer.state}, {dealer.country}
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="w-full flex items-center justify-center">
          <h1 className="text-2xl font-semibold">No Dealers Found</h1>
        </div>
      )}
    </div>
  );
}

export default DealerProfileCard;
