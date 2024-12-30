import React from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";

function NameLocationInput() {
  return (
    <>
      <div>
        <div className="relative flex items-center border border-gray-300 mt-4 p-2 rounded-md text-secondary w-[80%] mx-auto font-semibold">
          <input
            type="text"
            placeholder="Enter Your Name"
            className="pl-2 w-[90%] placeholder:font-normal placeholder:text-sm bg-transparent hide-number-spinners border-none focus:border-none focus:outline-none"
          />
          <FaRegUser className="absolute right-0 text-[2.6rem] px-3" />
        </div>
        <div className="relative flex items-center border border-gray-300 mt-4 p-2 rounded-md text-secondary w-[80%] mx-auto font-semibold">
          <input
            type="text"
            placeholder="Enter Your Location"
            className="pl-2 w-[90%] placeholder:font-normal placeholder:text-sm bg-transparent hide-number-spinners border-none focus:border-none focus:outline-none"
          />
          <MdOutlineLocationOn className="absolute right-0 text-[2.9rem] px-3" />
        </div>
        <div className="w-[80%] mx-auto mt-4">
          <button className="bg-secondary w-full py-3 font-semibold rounded-md shadow-lg">
            Let's Enjoy
          </button>
        </div>
      </div>
    </>
  );
}

export default NameLocationInput;
