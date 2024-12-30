import React from "react";
import { TbPhone } from "react-icons/tb";

function MobileNoInput() {
  return (
    <>
      <>
        <div className="relative flex items-center border border-gray-300 mt-5 p-2 rounded-md text-secondary w-[80%] mx-auto font-semibold">
          <p className="pr-2 border-r border-gray-300">+91</p>
          <input
            type="number"
            placeholder="Enter Mobile Number*"
            className="pl-2 placeholder:font-normal placeholder:text-sm bg-transparent hide-number-spinners border-none focus:border-none focus:outline-none"
          />
          <TbPhone className="absolute right-0 text-4xl px-2" />
        </div>
        <div className="w-[80%] mx-auto mt-3 flex justify-between items-center">
          <div className="flex items-center text-black gap-1">
            <input type="checkbox" />
            <small className="text-xs">I Agree to Terms and Conditions</small>
          </div>
          <p className="text-secondary font-semibold text-xs">
            T&C's Privacy Policy
          </p>
        </div>
        <div className="w-[80%] mx-auto mt-8">
          <button className="bg-secondary w-full py-3 font-semibold rounded-md shadow-lg">
            Login Wit OTP
          </button>
        </div>
      </>
    </>
  );
}

export default MobileNoInput;
