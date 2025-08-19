import React from "react";
import Navbar from "../../Components/Home/Navbar";
import Header from "../../Components/Home/Header";

const PrivacyPolicy = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-[#f7f7f7]">
        <div className="mx-3 ">
          <Header />
        </div>
        <img
          src="header-banner.jpg"
          alt="productLisiting"
          className="w-full h-72 object-cover relative"
        />
        <h1 className="flex flex-col md:text-6xl text-4xl font-semibold text-white absolute top-56 md:left-20 left-5 gap-4">
          Privacy Policy
          <span className="text-xl">Home | Privacy Policy</span>
        </h1>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
