import React from "react";
import FooterInput from "../../../ui/FooterInput";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  const footerBoxes = [
    {
      img: "/footerIcon1.png",
      title1: "Trusted",
      title2: "Platform",
    },
    {
      img: "/footerIcon2.png",
      title1: "Safe &",
      title2: "Secure",
    },
    {
      img: "/footerIcon3.png",
      title1: "Quick",
      title2: "Assistance",
    },
  ];

  return (
    <div className="bg-[#F9F9F9] text-black w-full py-10 font-montserrat">
      {/* Footer Container */}
      <div className=" md:mx-10 lg:mx-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex md:flex-row gap-8 w-full">
          {/* Left Column */}
          <div className="md:w-[35%]">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl">We Connect</h3>
              <p className="font-bold text-4xl mb-4">Buyers & Sellers</p>
              <p className="text-[#6A6A6A] text-xs leading-relaxed">
                We offer a platform where you can establish your business with
                just one click and connect with the whole world to meet the
                specific needs of every person.
              </p>
            </div>

            <div className="flex justify-center flex-wrap gap-8 mt-2">
              {footerBoxes.map((box, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 rounded-md shadow-md w-28"
                >
                  <img src={box.img} className="w-10 mb-2" />
                  <h1 className="font-semibold text-xs">{box.title1}</h1>
                  <h1 className="font-semibold text-xs">{box.title2}</h1>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center mt-5">
              <h1 className="text-[#2E3192] font-bold md:text-3xl lg:text-4xl">
                +91 1234567890
              </h1>
            </div>
          </div>
          {/* Right Column */}
          <div className="flex flex-col space-y-6 md:w-[65%]">
            <div className="w-full">
              <h3 className="text-2xl md:text-4xl my-2">Tell Us What You Need</h3>
              <p className="text-[#6A6A6A] text-xs leading-relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At
                sint tenetur voluptas quasi voluptatum aspernatur eum magni
                reiciendis culpa cupiditate
              </p>
              <div className="flex flex-col md:flex md:flex-col lg:flex lg:flex-row justify-center items-center gap-3 mt-4">
                <FooterInput
                  label="Full Name"
                  width="w-full"
                  placeholder="Enter Your Name..."
                  className="bg-gray-800 text-white"
                />
                <FooterInput
                  label="Contact Number"
                  width="w-full"
                  placeholder="Enter Your Contact Number..."
                  className="bg-gray-800 text-white"
                />
              </div>
              <div className="flex flex-col md:flex md:flex-col lg:flex lg:flex-row justify-center items-center gap-3 mt-5">
                <FooterInput
                  label="Business Name"
                  width="w-full"
                  placeholder="Enter Your Business Name..."
                  className="bg-gray-800 text-white"
                />
                <FooterInput
                  label="Business Location"
                  width="w-full"
                  placeholder="Enter Your Business Name..."
                  className="bg-gray-800 text-white"
                />
              </div>
              <div className="flex w-full">
                <button className="bg-secondary font-bold w-full text-white rounded-md py-3 mt-5">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-400 flex flex-col md:flex md:flex-row lg:flex justify-between items-center pt-5 mt-10">
          <div className="text-sm text-gray-400">
            <p>© Copyright 2023. All rights reserved.</p>
          </div>
          <div className="flex gap-5 mt-3 md:m-0">
            <a
              href="https://www.facebook.com/bproindia"
              target="_blank"
              className="hover:bg-[#EB6752] p-1 rounded-md cursor-pointer transform duration-100 ease-in-out"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://www.youtube.com/@bproindia"
              target="_blank"
              className="hover:bg-[#EB6752] p-1 rounded-md cursor-pointer transform duration-100 ease-in-out"
            >
              <FaYoutube size={20} />
            </a>
            <a
              href="https://www.instagram.com/bproindia/"
              target="_blank"
              className="hover:bg-[#EB6752] p-1 rounded-md cursor-pointer transform duration-100 ease-in-out"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
