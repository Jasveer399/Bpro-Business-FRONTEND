import React, { useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { TbPhone } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";

function VisitingCardInput({ setValue, value, type, placeholder }) {
  const inputRef = useRef(null);
  // Handle input changes with React way
  const handleChange = (e) => {
    if (type === "tel") {
      const inputValue = inputRef.current.value.replace(/\D/g, "");
      const truncated = inputValue.slice(0, 10);
      setValue((prevData) => ({ ...prevData, mobileNo: truncated }));
    } else if (type === "email") {
      setValue((prevData) => ({ ...prevData, email: inputRef.current.value }));
    } else {
      setValue((prevData) => ({ ...prevData, name: inputRef.current.value }));
    }
  };

  return (
    <>
      <div className="relative flex items-center border border-gray-300 mt-5 p-2 rounded-md text-[#2E3192] w-full lg:w-[80%] mx-auto font-semibold">
        {type === "tel" ? (
          <TbPhone className="absolute right-0 text-4xl px-2" />
        ) : type === "email" ? (
          <MdOutlineMail className="absolute right-0 text-4xl px-2" />
        ) : (
          <FaRegUser className="absolute right-0 text-3xl px-2" />
        )}
        <input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          // pattern="[0-9]{10}"
          // maxLength="10"
          // minLength="10"
          className="pl-2 mr-8 w-full placeholder:font-normal placeholder:text-sm bg-transparent hide-number-spinners border-none focus:border-none focus:outline-none"
          value={value}
          onChange={handleChange}
          required
        />
      </div>
    </>
  );
}

export default VisitingCardInput;
