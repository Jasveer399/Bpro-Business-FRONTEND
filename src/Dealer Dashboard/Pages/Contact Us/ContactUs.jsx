import React from "react";
import Navbar from "../../Components/Home/Navbar";
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
        <div className="mx-2 md:mx-5">
          <Header />
          <div>
            <div className="flex items-center flex-col mt-10">
              <h2 className="uppercase font-semibold text-[#EB6752] text-xl mb-2">
                Get In Touch
              </h2>
              <h1 className="text-6xl font-bold">Got any questions?</h1>
              <h1 className="text-6xl font-bold">
                Don't hesitate to get in touch.
              </h1>
            </div>
            <div className="flex items-center justify-center gap-8 my-10">
              <ContactCard
                icon={<FiPhone className="text-5xl text-white" />}
                heading={"Phone Number"}
                info={"+91 1234567890"}
              />
              <ContactCard
                icon={<MdOutlineEmail className="text-5xl text-white" />}
                heading={"Email Address"}
                info={"info@bproindia.com"}
              />
              <ContactCard
                icon={<MdOutlineLocationOn className="text-5xl text-white" />}
                heading={"Office Address"}
                info={
                  "28, chawani market, opposite Durga Mata mandir, Bengali mode, kankhal, Haridwar-249408"
                }
              />
            </div>
            <div>
                <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
