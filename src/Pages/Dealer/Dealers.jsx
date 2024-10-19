import React from "react";
import DealerCard from "../../Components/Dealers/DealerCard";
import AllDealers from "../../Components/Dealers/AllDealers";

function Dealers() {
  
  return (
    <div className="w-full h-[90vh] dark:bg-darkPrimary px-4 sm:px-6 lg:px-8 xl:px-10 py-6 lg:py-8 overflow-y-auto custom-scrollbar">
      <div className="mt-16">
        <AllDealers />
      </div>
    </div>
  );
}

export default Dealers;
