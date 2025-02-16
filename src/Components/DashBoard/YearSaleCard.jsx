import React from "react";
import { formatIndianCurrency } from "../../Utils/Helper";

const YearSaleCard = ({
  title,
  amount,
  persent,
  image,
  progresBarPersent,
  progresBarTitle,
}) => {
  return (
    <div className="w-full bg-brand-color-3 rounded-2xl p-4 sm:p-6 relative shadow-lg dark:shadow-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold text-lightPrimary text-lg sm:text-xl">
          {title}
        </h1>
        <img src={image} alt="yearSaleImage" className="absolute top-0 right-1 sm:right-3" />
      </div>
      <div className="w-full flex gap-2 justify-start items-center mb-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-lightPrimary font-semibold">
          Rs. {formatIndianCurrency(amount)}
        </h1>
        {/* {persent && (
          <p className="bg-lightPrimary/20 text-xs sm:text-sm px-2 py-1 rounded-lg text-lightPrimary font-semibold">
            {persent}
          </p>
        )} */}
      </div>
      <div>
        <p className="text-lightPrimary text-xs sm:text-sm font-semibold">
          You made {formatIndianCurrency(amount)} this year
        </p>
        {/* <div className="w-full h-2 rounded-lg bg-gray-600/20">
          <div
            className="bg-lightPrimary h-full rounded-lg"
            style={{ width: `${progresBarPersent}%` }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default YearSaleCard;