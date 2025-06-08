import React, { useState } from "react";
import VisitingCardInput from "./VisitingCardInput";

const VisitingCardForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
  };
  return (
    <div className="ml-5">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row w-full items-center lg:gap-5">
          <VisitingCardInput
            type="text"
            value={formData.name}
            setValue={setFormData}
            placeholder="Full Name"
          />
          <VisitingCardInput
            type="email"
            value={formData.email}
            setValue={setFormData}
            placeholder="Your Email"
          />
          <VisitingCardInput
            type="tel"
            value={formData.mobileNo}
            setValue={setFormData}
            placeholder="Contact Number"
          />
        </div>
        <textarea
          className="w-full placeholder:font-normal placeholder:text-sm bg-transparent resize-none mt-5 p-2 rounded-md focus:outline-none border border-gray-300 h-40 text-primary"
          placeholder="Your Message"
          rows="4"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          required
        ></textarea>
        <button
          type="submit"
          className="text-white w-full lg:w-60 mx-auto rounded-md py-2.5 mt-3 text-lg bg-[#E83435]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VisitingCardForm;
