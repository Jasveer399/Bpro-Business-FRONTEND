import React from "react";
import AllBannersCategory from "../../Components/Banner/AllBannersCategory";

function BannersCategory() {
  return (
    <div className="h-full dark:bg-darkPrimary font-montserrat">
      <div className="p-5">
        <div className="flex justify-between items-center mb-4 px-4 mt-20">
          <h2 className="text-xl font-semibold dark:text-colorText">
            Banners Area
          </h2>
        </div>
        <AllBannersCategory />
      </div>
    </div>
  );
}

export default BannersCategory;
