import React from "react";
import LocationSelector from "./LocationSelector";
import SearchBar from "./SearchBar";
import { MdOutlineHelpOutline } from "react-icons/md";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 font-montserrat space-y-4 md:space-y-0">
        <div className="flex flex-col w-full md:flex-row md:w-auto items-center gap-4 md:gap-2">
          <div className="w-full md:w-auto flex justify-center">
            <img
              src="/BproBusiness.png"
              className="w-48 md:w-64"
              alt="BproBusiness Logo"
            />
          </div>
          <div className="w-full md:w-auto">
            <LocationSelector width="w-full md:w-48" />
          </div>
          <div className="w-full md:w-auto">
            <SearchBar width={"w-full md:w-80"} />
          </div>
        </div>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 cursor-pointer">
            <MdOutlineHelpOutline size={20} className="text-primary" />
            <h1 className="font-semibold text-primary">Help?</h1>
          </div>
          <Link to="/product-listing" className="bg-secondary py-2 px-4 rounded-lg font-semibold">
            Sell Product?
          </Link>
        </div>

        {/* Mobile buttons */}
        <div className="flex md:hidden w-full justify-between items-center">
          <div className="flex items-center gap-1 cursor-pointer">
            <MdOutlineHelpOutline size={20} className="text-primary" />
            <h1 className="font-semibold text-primary">Help?</h1>
          </div>
          <Link to="/product-listing" className="bg-secondary py-2 px-4 rounded-lg font-semibold text-sm">
            Sell Product?
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
