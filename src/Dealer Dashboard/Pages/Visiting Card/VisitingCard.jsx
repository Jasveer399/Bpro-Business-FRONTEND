import React, { useEffect } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { LiaSaveSolid } from "react-icons/lia";
import { IoCall, IoMail } from "react-icons/io5";
import { MdDirections } from "react-icons/md";
import { LuTimerReset } from "react-icons/lu";
import PopularSearches from "../../Components/Home/PopularSearches";
import TemplateForm from "../../Components/Forms/Visiting Card/VisitingCardForm";
import SaveContactButton from "../../Components/Visiting Card/SaveContactButton";
import Testimonial from "../../Components/Visiting Card/Testimonial";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVisitingCardAsync,
  resetSelectedVisitingCardStatus,
} from "../../../Redux/Features/visitingCardSlice";
import { useNavigate, useParams } from "react-router-dom";
import Map from "../../Components/ui/Map";
import Gallery from "../../Components/Visiting Card/Gallery";

const VisitingCard = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const navigate = useNavigate();
  const { visitingCard, selectedVisitingCardStatus } = useSelector(
    (state) => state.visitingCards
  );

  useEffect(() => {
    if (selectedVisitingCardStatus === "idle" || visitingCard?.id !== id) {
      dispatch(fetchVisitingCardAsync(id));
    }
  }, [dispatch, selectedVisitingCardStatus, id]);

  const socialLinks = [
    {
      href: visitingCard?.Dealer?.facebook,
      icon: <FaFacebookF size={20} />,
      exist: visitingCard && visitingCard?.Dealer?.facebook ? true : false,
    },
    {
      href: visitingCard?.Dealer?.youtube,
      icon: <FaYoutube size={20} />,
      exist: visitingCard && visitingCard?.Dealer?.youtube ? true : false,
    },
    {
      href: visitingCard?.Dealer?.insta,
      icon: <FaInstagram size={20} />,
      exist: visitingCard && visitingCard?.Dealer?.insta ? true : false,
    },
  ];

  const personalInfo = [
    {
      label: "+91 " + visitingCard?.Dealer?.mobileNo,
      icon: IoCall,
    },
    {
      label: visitingCard?.Dealer?.email,
      icon: IoMail,
    },
    {
      label: `${visitingCard?.Dealer?.streetNo}, ${visitingCard?.Dealer?.areaName} ${visitingCard?.Dealer?.city}, ${visitingCard?.Dealer?.state}, ${visitingCard?.Dealer?.pincode}`,
      icon: MdDirections,
    },
    {
      label: `${visitingCard?.openingTime} - ${visitingCard?.closingTime}`,
      icon: LuTimerReset,
    },
  ];

  return (
    <div className="">
      <div className="bg-black py-1 text-white flex items-center justify-center gap-3 text-xl lg:text-2xl">
        <p>Follow us on</p>
        <div className="flex gap-3 md:m-0">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              className="rounded-md cursor-pointer transform duration-100 ease-in-out"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="relative">
        {visitingCard?.bannerImgUrl ? (
          <img
            src={visitingCard?.bannerImgUrl}
            alt="cover"
            className="h-[35vh] lg:h-[75vh] object-cover w-full"
          />
        ) : (
          <iframe
            width="100%"
            height="530"
            src={visitingCard?.bannerVideoUrl}
            title="Nasha - Amar Jalal Group &amp; Faridkot | Equals Sessions - Episode 4"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        )}

        <div className="flex flex-col lg:flex-row items-center lg:gap-10 absolute -bottom-[80%] lg:-bottom-[28%] lg:left-[3.5%] left-[22%]">
          <img
            src={visitingCard?.Dealer?.profileUrl}
            alt="avatar"
            className="rounded-full object-contain w-44 h-44 lg:w-60 lg:h-60 border-[8px] lg:border-[12px] border-white"
          />
          <div className="space-y-1 lg:mt-8">
            <h1 className="font-[700] text-center lg:text-left text-3xl lg:text-4xl">
              {visitingCard?.Dealer?.businessName}
            </h1>
            <h3 className="font-[500] text-center lg:text-left text-2xl lg:text-3xl text-[#717171]">
              {visitingCard?.Dealer?.Category?.title}
            </h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-[90%] mx-auto mt-52 mb-20">
        <div className="w-full lg:w-[55%]">
          <h1 className="font-[700] text-2xl mb-3">About Company</h1>
          <p className="text-[#6A6A6A] text-lg text-justify">
            {visitingCard?.intro}
          </p>
          <SaveContactButton />
        </div>
        <div className="lg:w-[10%]"></div>
        <div className="lg:w-1 bg-[#D9D9D9]"></div>
        <div className="lg:w-[4%]"></div>
        <div className="w-full mt-5 lg:mt-0 lg:w-[30%] space-y-5">
          {personalInfo.map((info, index) => (
            <div key={index} className="flex items-center gap-3">
              <div>
                <info.icon className="bg-[#E83435] text-white w-12 h-12 p-2.5 shadow-md rounded-full" />
              </div>
              <h2 className="text-xl text-[#4D4D4D]">{info.label}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[90%] mx-auto mb-20">
        <h1 className="text-3xl font-[700] ml-5">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 m-2 md:m-4 gap-3 md:gap-5">
          {visitingCard &&
            visitingCard?.Services?.map((product) => (
              <PopularSearches
                key={product.id}
                product={product}
                // onBookmarkToggle={handleBookmarkToggle}
              />
            ))}
        </div>
        <div className="flex items-center justify-center mt-6">
          <button
            onClick={() =>
              navigate(`/dealerProfile/${visitingCard?.Dealer?.id}`)
            }
            className="bg-[#E83435] text-white text-xl px-16 py-2 flex hover:underline"
          >
            View More...
          </button>
        </div>
      </div>
      <Gallery galleryImages={visitingCard?.galleryImages} />
      <div className="w-[90%] mx-auto mb-20">
        <h1 className="text-3xl font-[700] ml-5 mb-8">Our Testimonials</h1>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".testimonial-next",
            prevEl: ".testimonial-prev",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
          className="testimonial-swiper"
        >
          {visitingCard &&
            visitingCard?.testimonials?.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <Testimonial testimonial={testimonial} />
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button className="testimonial-prev bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button className="testimonial-next bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-[90%] mx-auto mb-20">
        <h1 className="text-2xl lg:text-3xl font-[700] ml-5 text-center lg:text-left">
          Inquiries
        </h1>
        <TemplateForm id={id} />
      </div>
      <Map
        streetNo={visitingCard?.Dealer?.streetNo}
        areaName={visitingCard?.Dealer?.areaName}
        city={visitingCard?.Dealer?.city}
        state={visitingCard?.Dealer?.state}
        country={visitingCard?.Dealer?.country}
        pincode={visitingCard?.Dealer?.pincode}
      />
      <div>
        <p className="text-sm lg:text-lg font-semibold text-center my-8 w-[90%] mx-auto">
          {visitingCard?.copyRight} & Developed by BPro Business
        </p>
      </div>
    </div>
  );
};

export default VisitingCard;
