import React from "react";
import Navbar from "../../Components/Home/Navbar";
import Header from "../../Components/Home/Header";
import { useNavigate } from "react-router-dom";

function Thankyou() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 15000);

  return (
    <>
      <Navbar />
      <div className="mx-3">
        <Header />
      </div>
      <div className="bg-[#2E3192] flex justify-center flex-col items-center w-full h-60">
        <h1 className=" md:text-3xl text-4xl flex flex-col items-center font-semibold text-white">
          <img src="thankyou.png" className="w-16 mb-2" />
          Thank You!
        </h1>
        <p className=" text-white">For join BPro</p>
      </div>
      <div className="mx-28 my-16 h-72">
        <h2 className="font-semibold text-xl">
          We are Reviewing you profile, your profile will be verify 1-2 business
          days{" "}
        </h2>
        <h2 className="font-semibold text-xl mt-6">
          If you have any more query contact to support team <br />{" "}
          <a href="tel:+9185625124512" className="text-secondary">
            +91 85625124512
          </a>
        </h2>
      </div>
      <img src="banner.png" className="w-full" />
    </>
  );
}

export default Thankyou;
