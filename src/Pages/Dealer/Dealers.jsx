import React from "react";
import DealerCard from "../../Components/Dealers/DealerCard";
import AllDealers from "../../Components/Dealers/AllDealers";

function Dealers() {
  
  return (
    <div className="w-full h-full dark:bg-darkPrimary px-4 sm:px-6 lg:px-8 xl:px-10 py-6 lg:py-8  custom-scrollbar">
      <div className="mt-14">
        <AllDealers />
      </div>
    </div>
  );
}

export default Dealers;
