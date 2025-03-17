import React, { useState } from "react";
import { TbPhone } from "react-icons/tb";

function MobileNoInput({ setPhoneNumber, phoneNumber }) {
  // Handle input changes with React way
  const handlePhoneChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    const truncated = inputValue.slice(0, 10);
    setPhoneNumber(truncated);
  };

  return (
    <>
      <div className="relative flex items-center border border-gray-300 mt-5 p-2 rounded-md text-secondary w-[80%] mx-auto font-semibold">
        <p className="pr-2 border-r border-gray-300">+91</p>
        <input
          type="tel"
          placeholder="Enter Mobile Number*"
          pattern="[0-9]{10}"
          maxLength="10"
          minLength="10"
          title="Please enter exactly 10 digits"
          className="pl-2 placeholder:font-normal placeholder:text-sm bg-transparent hide-number-spinners border-none focus:border-none focus:outline-none"
          value={phoneNumber}
          onChange={handlePhoneChange}
          required
        />
        <TbPhone className="absolute right-0 text-4xl px-2" />
      </div>
    </>
  );
}

export default MobileNoInput;
