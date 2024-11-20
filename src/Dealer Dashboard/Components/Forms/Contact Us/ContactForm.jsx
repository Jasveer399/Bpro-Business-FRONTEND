import React from "react";
import AuthInput from "../../ui/AuthInput";
import { useForm } from "react-hook-form";
import TextareaInput from "../../../../ui/TextareaInput";
import contactPageImage1 from "../../../../../public/contactPageImage1.jpg";
import contactPageImage2 from "../../../../../public/contactPageImage2.jpg";
import contactPageImage3 from "../../../../../public/contactPageImage3.jpg";
import contactPageImage4 from "../../../../../public/contactPageImage4.jpg";

function ContactForm() {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-8 max-w-5xl mx-auto mt-10 mb-20">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Get in Touch
          </h2>
          <div className="space-y-6">
            <AuthInput
              label="Full Name"
              type="text"
              {...register("fullName", {
                required: "Full Name is required",
              })}
              error={errors.fullName?.message}
              width="w-full"
            />
            <AuthInput
              label="Email Address"
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              error={errors.email?.message}
              width="w-full"
            />
            <AuthInput
              label="Phone Number"
              type="number"
              {...register("phoneNo", {
                required: "Phone No. is required",
              })}
              error={errors.phoneNo?.message}
              width="w-full"
            />
            <TextareaInput
              label="Type Your Message"
              width="w-full"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Content must be at least 50 characters",
                },
              })}
              error={errors.message?.message}
              rows={3}
            />
            <div className="flex">
              <button
                type="submit"
                className="bg-[#EB6752] rounded-md text-white py-2 px-6 hover:bg-[#191A1F] transform duration-300 ease-in-out font-semibold shadow-md"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="h-[300px] lg:h-auto rounded-lg overflow-hidden">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.109565392158!2d78.15257361508696!3d29.934717431907937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390927b78e0d9a1d%3A0x3e6c2b5072e8b80e!2sBpro%20India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 bg-white shadow-lg rounded-lg p-6 mx-auto mt-8">
        {[
          { image: contactPageImage1, link: "https://thestyledesign.com/" },
          { image: contactPageImage2, link: "https://chattertots.co.in/" },
          { image: contactPageImage3, link: "https://bproindia.com/contact/#" },
          { image: contactPageImage4, link: "https://bproindia.com/contact/#" },
        ].map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="filter grayscale hover:grayscale-0 transition-all duration-300"
          >
            <img
              src={item.image}
              alt={`Contact Page ${index + 1}`}
              className="w-32 sm:w-40 lg:w-64 h-auto object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default ContactForm;
