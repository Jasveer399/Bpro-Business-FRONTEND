import React from "react";
import { LiaSaveSolid } from "react-icons/lia";

const SaveContactButton = () => {
  return (
    <div>
      <button className="text-white rounded items-center mt-8 hidden md:flex lg:flex">
        <LiaSaveSolid className="bg-black h-10 w-10 p-2 rounded-l" />
        <h4 className="bg-[#E83435] h-10 rounded-r px-2 flex items-center justify-center">
          Save Contact
        </h4>
      </button>
    </div>
  );
};

export default SaveContactButton;
