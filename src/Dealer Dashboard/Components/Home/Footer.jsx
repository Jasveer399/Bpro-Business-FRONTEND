import React from "react";
import FooterInput from "../../../ui/FooterInput";

function Footer() {
  const footerBoxes = [
    {
      icon: "/footerIcon3.png",
      title1: "Trusted",
      title2: "Platform",
    },
    {
      icon: "/footerIcon2.png",
      title1: "Safe &",
      title2: "Secure",
    },
    {
      icon: "/footerIcon1.png",
      title1: "Quick",
      title2: "Assistance",
    },
  ];

  return (
    <div className="flex flex-wrap gap-8 p-6 bg-gray-100 font-montserrat max-w-6xl mx-auto">
      {/* First Column */}
      <div className="flex-1 min-w-[250px] md:max-w-xs">
        <h3 className="text-2xl md:text-3xl font-semibold mb-2">We Connect</h3>
        <p className="font-bold text-3xl md:text-4xl mb-2">Buyers & Sellers</p>
        <p className="text-[#6A6A6A] my-3 text-sm md:text-base leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>

      {/* Footer Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 md:mt-10 w-full max-w-lg mx-auto">
        {footerBoxes.map((box, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white shadow-md p-4 rounded-md w-full"
          >
            <img
              src={box.icon}
              className="w-12 md:w-14 mb-2"
              alt={box.title1}
            />
            <h1 className="font-semibold text-sm md:text-base">{box.title1}</h1>
            <h1 className="font-semibold text-sm md:text-base">{box.title2}</h1>
          </div>
        ))}
      </div>

      {/* Second and Third Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
        {/* Second Column */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Tell Us What You Need</h3>
          <FooterInput
            width="w-full max-w-md lg:max-w-lg"
            placeholder="Enter Your Service Name..."
          />
        </div>

        {/* Third Column */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <FooterInput
            width="w-full max-w-md lg:max-w-lg"
            placeholder="Contact Number..."
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
