import React from "react";
import LocationSelector from "./LocationSelector";
import SearchBar from "./SearchBar";
import { MdOutlineHelpOutline } from "react-icons/md";

function Header() {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 font-montserrat">
        <div className="flex items-center gap-2">
          <div>
            <img src="/BproBusiness.png" className="w-64" />
          </div>
          <LocationSelector width="w-48" />
          <div>
            <SearchBar width={"w-80"} />
          </div>
        </div>
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 cursor-pointer">
                <MdOutlineHelpOutline size={20} className="text-primary" />
                <h1 className="font-semibold text-primary">Help?</h1>
            </div>
            <button className="bg-[#FFB200] py-2 px-4 rounded-lg font-semibold">
                Sell Product?
            </button>
        </div>
      </div>
    </>
  );
}

export default Header;
