import React from "react";

function FooterInput({ width, placeholder,label }) {
  return (
    <div className={`relative ${width}`}>
      <h1 className="text-sm mb-px text-gray-600">{label}</h1>
      <input
        type="text"
        placeholder={placeholder}
        className="border border-[#ADADAD] rounded-md bg-white p-2 w-full"
      />
    </div>
  );
}

export default FooterInput;
