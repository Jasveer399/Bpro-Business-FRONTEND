import React from "react";
import FooterInput from "../../../ui/FooterInput";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { RiShieldStarLine } from "react-icons/ri";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  const footerBoxes = [
    {
      icon: <RiShieldStarLine className="text-4xl text-white mb-3" />,
      title1: "Trusted",
      title2: "Platform",
    },
    {
      icon: <VscWorkspaceTrusted className="text-4xl text-white mb-3" />,
      title1: "Safe &",
      title2: "Secure",
    },
    {
      icon: <TfiHeadphoneAlt className="text-4xl text-white mb-3" />,
      title1: "Quick",
      title2: "Assistance",
    },
  ];

  return (
    <div className="bg-black text-white w-full py-10 font-montserrat">
      {/* Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column */}
          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-semibold mb-2">We Connect</h3>
            <p className="font-bold text-4xl mb-4">Buyers & Sellers</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              We offer a platform where you can establish your business with
              just one click and connect with the whole world to meet the
              specific needs of every person.
            </p>
          </div>

          {/* Middle Column */}
          <div className="flex justify-center lg:justify-around gap-4 flex-wrap">
            {footerBoxes.map((box, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-gray-800 p-4 rounded-md shadow-md w-32 sm:w-40"
              >
                {box.icon}
                <h1 className="font-semibold text-sm sm:text-base">
                  {box.title1}
                </h1>
                <h1 className="font-semibold text-sm sm:text-base">
                  {box.title2}
                </h1>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Tell Us What You Need
              </h3>
              <FooterInput
                width="w-full"
                placeholder="Enter Your Service Name..."
                className="bg-gray-800 text-white"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <FooterInput
                width="w-full"
                placeholder="Contact Number..."
                className="bg-gray-800 text-white"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-400 flex justify-between items-center pt-5 mt-10">
          <div className="text-sm text-gray-400">
            <p>© Copyright 2023. All rights reserved.</p>
          </div>
          <div className="flex gap-5">
            <a href="https://www.facebook.com/bproindia" target="_blank" className="hover:bg-[#EB6752] p-1 rounded-md cursor-pointer transform duration-100 ease-in-out">
              <FaFacebookF size={20} />
            </a>
            <a href="https://www.youtube.com/@bproindia" target="_blank" className="hover:bg-[#EB6752] p-1 rounded-md cursor-pointer transform duration-100 ease-in-out">
              <FaYoutube size={20} />
            </a>
            <a href="https://www.instagram.com/bproindia/" target="_blank" className="hover:bg-[#EB6752] p-1 rounded-md cursor-pointer transform duration-100 ease-in-out">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
