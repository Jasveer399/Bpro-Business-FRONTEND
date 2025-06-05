import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { LiaSaveSolid } from "react-icons/lia";
import { IoCall, IoMail } from "react-icons/io5";
import { MdDirections } from "react-icons/md";
import { LuTimerReset } from "react-icons/lu";
import PopularSearches from "../../Components/Home/PopularSearches";
import TemplateForm from "../../Components/Forms/template/TemplateForm";
import SaveContactButton from "../../Components/Template/SaveContactButton";
import Testimonial from "../../Components/Template/Testimonial";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Template = () => {
  const socialLinks = [
    {
      href: "https://www.facebook.com/bproindia",
      icon: <FaFacebookF size={20} />,
    },
    {
      href: "https://www.youtube.com/@bproindia",
      icon: <FaYoutube size={20} />,
    },
    {
      href: "https://www.instagram.com/bproindia/",
      icon: <FaInstagram size={20} />,
    },
  ];

  const personalInfo = [
    {
      label: "+91 1234567890",
      icon: IoCall,
    },
    {
      label: "info@mail.com",
      icon: IoMail,
    },
    {
      label: "Mohali",
      icon: MdDirections,
    },
    {
      label: "00:00 AM - 00:00 PM",
      icon: LuTimerReset,
    },
  ];

  const dummyProducts = [
    {
      id: "12345",
      bookmark: false,
      title: "Sample Product",
      images: ["/placeholder-image.png"],
      categories: [{ title: "Category 1" }],
      Dealer: {
        city: "Sample City",
        state: "Sample State",
        mobileNo: "1234567890",
        whatsappNo: "1234567890",
        email: "WVlXH@example.com",
      },
      averageRatings: "4.5",
      Reviews: [],
      _count: { Reviews: 10 },
    },
    {
      id: "67890",
      bookmark: false,
      title: "Another Product",
      images: ["/placeholder-image.png"],
      categories: [{ title: "Category 2" }],
      Dealer: {
        city: "Another City",
        state: "Another State",
        mobileNo: "0987654321",
        whatsappNo: "0987654321",
        email: "B0mJc@example.com",
      },
      averageRatings: "3.8",
      Reviews: [],
      _count: { Reviews: 5 },
    },
    {
      id: "67890",
      bookmark: false,
      title: "Another Product",
      images: ["/placeholder-image.png"],
      categories: [{ title: "Category 2" }],
      Dealer: {
        city: "Another City",
        state: "Another State",
        mobileNo: "0987654321",
        whatsappNo: "0987654321",
        email: "B0mJc@example.com",
      },
      averageRatings: "3.8",
      Reviews: [],
      _count: { Reviews: 5 },
    },
    {
      id: "67890",
      bookmark: false,
      title: "Another Product",
      images: ["/placeholder-image.png"],
      categories: [{ title: "Category 2" }],
      Dealer: {
        city: "Another City",
        state: "Another State",
        mobileNo: "0987654321",
        whatsappNo: "0987654321",
        email: "B0mJc@example.com",
      },
      averageRatings: "3.8",
      Reviews: [],
      _count: { Reviews: 5 },
    },
    {
      id: "67890",
      bookmark: false,
      title: "Another Product",
      images: ["/placeholder-image.png"],
      categories: [{ title: "Category 2" }],
      Dealer: {
        city: "Another City",
        state: "Another State",
        mobileNo: "0987654321",
        whatsappNo: "0987654321",
        email: "B0mJc@example.com",
      },
      averageRatings: "3.8",
      Reviews: [],
      _count: { Reviews: 5 },
    },
    {
      id: "67890",
      bookmark: false,
      title: "Another Product",
      images: ["/placeholder-image.png"],
      categories: [{ title: "Category 2" }],
      Dealer: {
        city: "Another City",
        state: "Another State",
        mobileNo: "0987654321",
        whatsappNo: "0987654321",
        email: "B0mJc@example.com",
      },
      averageRatings: "3.8",
      Reviews: [],
      _count: { Reviews: 5 },
    },
  ];

  const dummyGallery = [
    {
      image: "aboutUsPic.png",
    },
    {
      image: "/aboutUsPic.png",
    },
    {
      image: "/aboutUsPic.png",
    },
    {
      image: "aboutUsPic.png",
    },
    {
      image: "/aboutUsPic.png",
    },
    {
      image: "/aboutUsPic.png",
    },
    {
      image: "aboutUsPic.png",
    },
    {
      image: "aboutUsPic.png",
    },
  ];

  const dummyTestimonials = [
    {
      image: "aboutUsPic.png",
      name: "John Doe",
      designation: "CEO, Company",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image: "aboutUsPic.png",
      name: "Jane Smith",
      designation: "CTO, Company",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      image: "aboutUsPic.png",
      name: "John Doe",
      designation: "CEO, Company",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image: "aboutUsPic.png",
      name: "Jane Smith",
      designation: "CTO, Company",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
        <img
          src="aboutUsPic.png"
          alt="cover"
          className="h-[35vh] lg:h-[75vh] object-cover w-full"
        />
        <div className="flex flex-col lg:flex-row items-center lg:gap-10 absolute -bottom-[80%] lg:-bottom-[28%] lg:left-[3.5%] left-[22%]">
          <img
            src="avatar-2.jpg"
            alt="avatar"
            className="rounded-full object-contain w-44 h-44 lg:w-60 lg:h-60 border-[8px] lg:border-[12px] border-white"
          />
          <div className="space-y-1 lg:mt-8">
            <h1 className="font-[700] text-center lg:text-left text-3xl lg:text-4xl">
              Welding Agency
            </h1>
            <h3 className="font-[500] text-center lg:text-left text-2xl lg:text-3xl text-[#717171]">
              Photography
            </h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-[90%] mx-auto mt-52 mb-20">
        <div className="w-full lg:w-[55%]">
          <h1 className="font-[700] text-2xl mb-3">About Company</h1>
          <p className="text-[#6A6A6A] text-lg text-justify">
            Rattan Hammers is the state of Art and Latest Innovation in Indian
            Forging Industries. Beside Drop Forged Hammers Rattan Also
            manufactures heavy-duty machinery like Bar Cropping Machines, Hot
            Forging Presses, Roll Forging Reducer Machine, Power Presses, Shot
            Blasting Machines & Knuckle Joint Press, etc. in Ludhiana for the
            last 50 years.
          </p>
          <SaveContactButton />
        </div>
        <div className="lg:w-[10%]"></div>
        <div className="lg:w-1 bg-[#D9D9D9]"></div>
        <div className="lg:w-[4%]"></div>
        <div className="w-full mt-5 lg:mt-0 lg:w-[30%] space-y-5">
          {personalInfo.map((info, index) => (
            <div key={index} className="flex items-center gap-3">
              <info.icon className="bg-[#E83435] text-white w-12 h-12 p-2.5 shadow-md rounded-full" />
              <h2 className="text-xl text-[#4D4D4D]">{info.label}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[90%] mx-auto mb-20">
        <h1 className="text-3xl font-[700] ml-5">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 m-2 md:m-4 gap-3 md:gap-5">
          {dummyProducts.map((product) => (
            <PopularSearches
              key={product.id}
              product={product}
              // onBookmarkToggle={handleBookmarkToggle}
            />
          ))}
        </div>
        <div className="flex items-center justify-center mt-6">
          <button className="bg-[#E83435] text-white text-xl px-16 py-2 flex hover:underline">
            View More...
          </button>
        </div>
      </div>
      <div className="w-[90%] mx-auto mb-20">
        <h1 className="text-3xl font-[700] ml-5">Our Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 m-2 md:m-4 gap-3 md:gap-5">
          {dummyGallery.map((gal) => (
            <div>
              <img
                src={gal.image}
                alt="gallery"
                className="w-full h-60 object-cover rounded-md"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-6">
          <button className="bg-[#E83435] text-white text-xl px-16 py-2 flex hover:underline">
            Load More...
          </button>
        </div>
      </div>
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
          {dummyTestimonials.map((testimonial, index) => (
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
        <TemplateForm />
      </div>
      <div>
        <p className="text-sm lg:text-lg font-semibold text-center mb-8 w-[90%] mx-auto">
          Copyright 2025 | All Rights Reserved by Cooking Agency & Developed by
          BPro Business
        </p>
      </div>
    </div>
  );
};

export default Template;
