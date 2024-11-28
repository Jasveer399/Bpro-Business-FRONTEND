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
        <div className="">
          <div className="mx-3">
          <Header />
          </div>
          <img src="header-banner.jpg" alt="productLisiting" className='w-full h-72 object-cover relative' />
      <h1 className='flex flex-col md:text-6xl text-4xl font-semibold text-white absolute top-56 md:left-20 left-5 gap-4'>Contact Us <span className='text-xl'>Home | Contact Us</span></h1>

          {/* Get In Touch Section */}
          <div className="flex flex-col items-center text-center mt-24 px-4">
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
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
