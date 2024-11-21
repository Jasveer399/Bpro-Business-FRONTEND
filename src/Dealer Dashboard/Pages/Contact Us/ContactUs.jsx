import React from "react";
import Navbar from "../../Components/Home/Navbar";
import Footer from "../../Components/Home/Footer";
import Header from "../../Components/Home/Header";
import ContactCard from "../../Components/Contact Us/ContactCard";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail, MdOutlineLocationOn } from "react-icons/md";
import ContactForm from "../../Components/Forms/Contact Us/ContactForm";

function ContactUs() {
  return (
    <>
      <Navbar />
      <div className="bg-[#f7f7f7]">
        <div className="mx-4 md:mx-8 lg:mx-16">
          <Header />

          {/* Get In Touch Section */}
          <div className="flex flex-col items-center text-center mt-10 px-4">
            <h2 className="uppercase font-semibold text-[#EB6752] text-lg md:text-xl mb-2">
              Get In Touch
            </h2>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Got any questions?
            </h1>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Don't hesitate to get in touch.
            </h1>
          </div>

          {/* Contact Cards Section */}
          <div className="flex flex-wrap justify-center items-center gap-6 my-10 px-4">
            <ContactCard
              icon={<FiPhone className="text-4xl md:text-5xl text-white" />}
              heading={"Phone Number"}
              info={"+91 1234567890"}
            />
            <ContactCard
              icon={
                <MdOutlineEmail className="text-4xl md:text-5xl text-white" />
              }
              heading={"Email Address"}
              info={"info@bproindia.com"}
            />
            <ContactCard
              icon={
                <MdOutlineLocationOn className="text-4xl md:text-5xl text-white" />
              }
              heading={"Office Address"}
              info={
                "28, chawani market, opposite Durga Mata mandir, Bengali mode, kankhal, Haridwar-249408"
              }
            />
          </div>

          {/* Contact Form Section */}
          <div className="px-4 md:px-8 lg:px-16">
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
