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
        <div className="mx-4 md:mx-8 lg:mx-16">
          <Header />
        </div>

        {/* ABOUT US SECTION */}
        <div className="flex flex-col-reverse md:flex-row items-center mt-10 px-4">
          <div className="md:w-1/2 text-center md:text-left md:pl-10">
            <h3 className="text-2xl font-medium text-[#157FEF] mb-2">
              WELCOME TO THE BUSINESS PRO INDIA
            </h3>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              You Can Buy, Sell Anything You Can Think Of.
            </h1>
            <p className="text-base md:text-lg mb-4 text-[#777777]">
              We understand the tough challenges that every person faces when it
              comes to simple living. That’s why we offer a platform where one
              can establish his/her business with just one click and come in
              contact with the whole world that in turn will meet the specific
              needs of every person. We work closely with our clients to develop
              strategies that help them increase their sales and attract more
              customers. We transform simple living into moderate with a few
              easy steps.
            </p>
            <p className="text-base md:text-lg mb-4 text-[#777777]">
              We do work on almost every aspect faced by retailer or wholesaler
              while dealing with customers and build up a trustable platform for
              both clients and customers focusing on maximum sales, profit, and
              growth of one’s business in the right direction.
            </p>
            <br />
            <p className="text-base md:text-lg font-semibold mb-6 text-[#777777]">
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
        <div className="mt-16 p-3 px-10 bg-[#e9ecef]">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold text-black mb-4">Our Vision</h1>
              <p className="text-base font-normal md:text-lg mb-4 text-[#777777]">
                We will aim to translate the client’s ideas to customers,
                combining aesthetics, comfort, and practicality.
              </p>
            </div>
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold text-black mb-4">
                Our Mission
              </h1>
              <p className="text-base font-normal md:text-lg text-[#777777]">
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
