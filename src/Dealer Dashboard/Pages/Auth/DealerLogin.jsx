import React from "react";
import AuthSection from "../../Components/Auth/AuthSection";
import LoginForm from "../../Components/Forms/Auth/LoginForm";
import Navbar from "../../Components/Home/Navbar";
import Header from "../../Components/Home/Header";
import LocationCarousel from "../../Components/Home/LocationCard";

function DealerLogin() {
  return (
    <>
        <Navbar />
      <div className="mx-2 md:mx-5">
        <Header />
      </div>
      <div>
        <LoginForm />
      </div>
      <div className="w-full mt-5">
        <img
          src="/banner.png"
          className="w-full object-cover"
          alt="Main Banner"
        />
      </div>
      <div className="my-6 md:my-10">
        <h1 className="font-montserrat font-extrabold text-xl md:text-2xl mx-3 md:mx-5 mb-3">
          We are available in...
        </h1>
        <div className="flex overflow-x-auto space-x-4 mx-2 md:mx-3">
          <LocationCarousel />
        </div>
      </div>
    </>
  );
}

export default DealerLogin;
