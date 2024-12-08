import React from "react";

function FooterInput({ width, placeholder,label }) {
  return (
    <div className={`relative ${width}`}>
      <h1 className="text-base mb-px text-[#2E3192] font-bold">{label}</h1>
      <input
        type="text"
        placeholder={placeholder}
        className="border border-[#ADADAD] rounded-md bg-white p-2  w-full"
      />
    </div>
  );
}

export default FooterInput;
