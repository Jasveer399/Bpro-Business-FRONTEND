import React from "react";
import { formatIndianCurrency } from "../../Utils/Helper";

const SaleCard = ({
  title,
  amount,
  persent,
  image,
  progresBarPersent,
  progresBarTitle,
  className,
  imageClassName,
}) => {
  return (
    <div
      className={`w-full bg-white dark:bg-darkgrey shadow-lg dark:shadow-black border border-gray-200 dark:border-gray-600 rounded-2xl p-4 sm:p-6 ${className} relative`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold text-neutral-700 dark:text-lightPrimary text-lg sm:text-xl">
          {title}
        </h1>
        <img
          src={image}
          alt="saleImage"
          className={`absolute ${imageClassName}`}
        />
      </div>
      <div className="w-full flex gap-2 justify-start items-center mb-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-neutral-800 dark:text-lightPrimary font-semibold">
          Rs. {formatIndianCurrency(amount)}
        </h1>
        {/* <p className="bg-green-100/60 dark:bg-green-900/50 text-xs sm:text-sm px-2 py-1 rounded-lg text-[#44edc3] dark:text-green-600 font-semibold">
          {persent}
        </p> */}
      </div>
      <div>
        <p className="text-gray-500 text-xs sm:text-sm font-semibold mb-2">
          You made {formatIndianCurrency(amount)} this {title.split("ly")[0]}
        </p>
        {/* <div className="w-full h-2 rounded-lg bg-gray-600/20">
          <div
            className={`bg-blue h-full rounded-lg`}
            style={{ width: progresBarPersent }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default SaleCard;
