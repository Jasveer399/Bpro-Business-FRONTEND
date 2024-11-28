import React from "react";
import Navbar from "../../Components/Home/Navbar";
import Footer from "../../Components/Home/Footer";
import Header from "../../Components/Home/Header";
import aboutUsPic from "../../../../public/aboutUsPic.png";

function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="bg-[#f7f7f7]">
        <div className="mx-3 ">
          <Header />
        </div>
        <img src="header-banner.jpg" alt="productLisiting" className='w-full h-72 object-cover relative' />
      <h1 className='flex flex-col md:text-6xl text-4xl font-semibold text-white absolute top-56 md:left-20 left-5 gap-4'>About Us<span className='text-xl'>Home | About Us</span></h1>

        {/* ABOUT US SECTION */}
        <div className="flex flex-col-reverse md:flex-row mt-24 px-4 font-montserrat">
          <div className="md:w-1/2 text-center md:text-left md:px-10">
            <h3 className="text-xl   font-medium text-[#157FEF] mb-2">
              WELCOME TO THE BUSINESS PRO INDIA
            </h3>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              You Can Buy, Sell Anything You Can Think Of.
            </h1>
            <p className="text-base md:text-lg mb-4 text-[#777777] text-justify">
              We understand the tough challenges that every person faces when it
              comes to simple living. That’s why we offer a platform where one
              can establish his/her business with just one click and come in
              contact with the whole world that in turn will meet the specific
              needs of every person. We work closely with our clients to develop
              strategies that help them increase their sales and attract more
              customers. We transform simple living into moderate with a few
              easy steps.
            </p>
            <p className="text-base md:text-lg mb-4 text-[#777777] text-justify">
              We do work on almost every aspect faced by retailer or wholesaler
              while dealing with customers and build up a trustable platform for
              both clients and customers focusing on maximum sales, profit, and
              growth of one’s business in the right direction.
            </p>
            <br />
            <p className="text-base md:text-lg font-semibold mb-6 text-[#777777] text-justify">
              A commercial relationship between two businesses that is focused
              on delighting end-customers and achieving common goals between two
              businesses.
            </p>
            <button className="text-black text-xl font-medium border-2 border-black py-3 px-8 rounded-md hover:bg-black hover:text-white transition-all duration-300">
              Get Started
            </button>
          </div>

          <div className="md:w-1/2 mb-6 md:mb-0">
            <img
              src={aboutUsPic}
              alt="About Us"
              className="w-full h-auto rounded-md shadow-lg"
            />
          </div>
        </div>

        {/* VISION AND MISSION */}
        <div className="mt-10 bg-[#F7F7F7] font-montserrat">
          <div className="flex flex-col md:flex-row justify-between gap-20">
            <div className="md:w-1/2 ml-20 bg-white py-6 rounded-lg px-10 mb-8">
              <h1 className="text-4xl font-bold text-black mb-4">Our Vision</h1>
              <p className="text-base font-normal md:text-base mb-4 text-[#777777] text-justify">
                We will aim to translate the client’s ideas to customers,
                combining aesthetics, comfort, and practicality.
              </p>
            </div>
            <div className="md:w-1/2 mr-20 bg-white py-6 rounded-lg px-10 mb-8">
              <h1 className="text-4xl font-bold text-black mb-4">
                Our Mission
              </h1>
              <p className="text-base font-normal md:text-base text-[#777777] text-justify">
                We aim to deliver customized and satisfied services that meet
                the specific needs of each client within budget and time
                decided, while also providing excellent customer service and
                support.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
