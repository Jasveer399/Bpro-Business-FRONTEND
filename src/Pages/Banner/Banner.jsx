import React from "react";
import AllBanners from "../../Components/Banner/AllBanners";
import Dialog from "../../ui/Dialog";
import AddBannerForm from "../../Components/Forms/Banner/AddBannerForm";

function Banner() {
  return (
    <div className="h-full dark:bg-darkPrimary">
      <div className="p-5">
        <div className="flex justify-between items-center mb-4 px-4 mt-20">
          <h2 className="text-xl font-semibold dark:text-colorText">
            All Banners
          </h2>
          <Dialog
            trigger={
              <button className="bg-blue px-3 rounded-md font-semibold text-white py-1">
                Add Banner
              </button>
            }
            width="w-[30%]"
            height="h-[62%]"
          >
            <AddBannerForm />
          </Dialog>
        </div>
        <AllBanners />
      </div>
    </div>
  );
}

export default Banner;
