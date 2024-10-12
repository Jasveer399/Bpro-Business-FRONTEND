import React from "react";

const YearSaleCard = ({
  title,
  amount,
  persent,
  image,
  progresBarPersent,
  progresBarTitle,
}) => {
  return (
    <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-brand-color-3 rounded-2xl px-3 py-8 relative shadow-lg dark:shadow-black">
      <div className="flex justify-between items-center">
        <h1 className="p-2 font-semibold text-neutral-700 dark:text-lightPrimary text-[20Px]">
          {title}
        </h1>
        <img src={image} alt="dailySaleImage" className="absolute top-0 right-1" />
      </div>
      <div className="w-full flex gap-2 justify-start items-center px-4">
        <h1 className="text-lg sm:text-xl md:text-2xl text-neutral-800 dark:text-lightPrimary font-semibold">
        ${amount}
        </h1>
      </div>
      <div className="px-4 mt-4">
        <p className="text-lightPrimary text-xs sm:text-sm font-semibold">
          {progresBarTitle}
        </p>
        <div className="w-full h-2 rounded-lg bg-gray-600/20 mt-2">
          <div
            className={`bg-lightPrimary w-[70%] h-full rounded-lg`}
          />
        </div>
      </div>
    </div>
  );
};

export default YearSaleCard;
