import React from "react";

function FooterInput({ width, placeholder }) {
  return (
    <div className={`relative ${width}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="border border-[#ADADAD] rounded-md bg-white p-2 w-full"
      />
    </div>
  );
}

export default FooterInput;
