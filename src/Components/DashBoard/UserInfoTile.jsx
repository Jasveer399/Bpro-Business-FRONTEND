import React from "react";
import { Check, X } from "lucide-react";

const UserInfoTile = ({
  imageSrc,
  name,
  role,
  date,
  onAccept,
  onReject,
  className = "",
}) => {
  return (
    <div
      className={`p-3 mb-2 last:mb-0 hover:bg-blue/5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${className}`}
    >
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <img
          src={imageSrc}
          alt={`${name}'s avatar`}
          className="rounded-full w-10 h-10 object-cover"
        />
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold text-colorText2 dark:text-colorText">
            {name}
          </h1>
          <span className="text-xs text-colorText2 dark:text-colorText opacity-70">
            {role}
          </span>
        </div>
      </div>
      <div className="text-colorText2 dark:text-colorText text-xs sm:text-sm w-full sm:w-auto text-left sm:text-right mt-2 sm:mt-0">
        {date}
      </div>
      <div className="flex gap-2 w-full sm:w-auto justify-start sm:justify-end mt-2 sm:mt-0">
        <button
          onClick={onReject}
          className="bg-red-100 dark:bg-[#422732] hover:bg-[#f44236] dark:hover:bg-[#f44236] text-[#f44236] hover:text-white rounded-xl p-1.5 cursor-pointer transition-colors duration-200"
          aria-label="Reject"
        >
          <X size={20} />
        </button>
        <button
          onClick={onAccept}
          className="bg-green-100 hover:bg-[#1de9b6] dark:bg-[#198754]/30 dark:hover:bg-[#198754] text-[#1de9b6] hover:text-white rounded-xl p-1.5 cursor-pointer transition-colors duration-200"
          aria-label="Accept"
        >
          <Check size={20} />
        </button>
      </div>
    </div>
  );
};

export default UserInfoTile;