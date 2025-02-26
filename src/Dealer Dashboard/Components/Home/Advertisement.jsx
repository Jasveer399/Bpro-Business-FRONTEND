import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchBannersAsync } from "../../../Redux/Features/bannersSlice";
import { useDispatch } from "react-redux";

const Advertisement = ({ className, isButtonShow, isLeft, banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  // console.log("Banneers: ", banners)

  // const { banners, status } = useSelector((state) => state.banners);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(fetchBannersAsync());
  //   }
  // }, [status, dispatch]);

  // console.log(banners);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  const nextSlide = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners?.length);
  };

  const prevSlide = () => {
    setDirection("left");
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + banners?.length) % banners?.length
    );
  };

  return (
    <div
      className={`relative w-full md:w-2/3 h-80 overflow-hidden ${className}`}
    >
      <div className="relative h-80">
        {banners
          ?.filter((banner) => banner.status === "Active")
          ?.map((banner, index) => (
            <a
              href={banner.externalUrl}
              target="_blank"
              key={banner.id}
              className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
                index === currentIndex
                  ? "translate-x-0"
                  : direction === "right"
                  ? "-translate-x-full"
                  : "translate-x-full"
              }`}
              style={{
                transform: `translateX(${(index - currentIndex) * 100}%)`,
              }}
            >
              <img
                src={banner.bannerImgUrl}
                alt={banner.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </a>
          ))}
        <div
          className={`absolute bottom-4 transform -translate-x-1/2 flex space-x-2 ${
            isLeft ? "left-10" : "right-0"
          }`}
        >
          {banners?.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-secondary" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>
      {isButtonShow && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 border border-[#157ed2] p-2 rounded-full"
          >
            <ChevronLeft className="text-[#157ed2]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 border border-[#157ed2] p-2 rounded-full"
          >
            <ChevronRight className="text-[#157ed2]" />
          </button>
        </>
      )}
    </div>
  );
};

export default Advertisement;
