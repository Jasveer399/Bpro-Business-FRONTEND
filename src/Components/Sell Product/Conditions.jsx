import React from "react";
import { FaCheck } from "react-icons/fa";

function Conditions() {
  const termsAndCond = [
    "Money Not Refundable.",
    "You can renew your Premium ad after experted.",
    "Premium ads are active for depend on package.",
  ];

  const benifitsOfPremiumAd = [
    "Premium Ads Active",
    "Premium ads are displayed on top",
    "Premium ads will be Show in Google results",
    "Premium Ads Active",
    "Premium ads are displayed on top",
    "Premium ads will be Show in Google results",
    "Premium Ads Active",
    "Premium ads are displayed on top",
    "Premium ads will be Show in Google results",
  ];

  const safetyTips = [
    "Meet Seller at public place",
    "Check item before you buy",
    "Pay only after collecting item"
  ]
  return (
    <>
      <div>
        <div className="border border-[#e8ebf3] bg-white m-5">
          <div className="border-b border-[#e8ebf3]">
            <h1 className="font-semibold text-xl p-3">Terms And Conditions</h1>
          </div>
          <div className="p-5 space-y-1">
            {termsAndCond.map((tAndC) => (
              <div className="flex items-center gap-3">
                <FaCheck className="text-green-500" />
                <h2>{tAndC}</h2>
              </div>
            ))}
            <h2 className="ml-7 cursor-pointer hover:text-blue pt-2">View More...</h2>
          </div>
        </div>

        <div className="border border-[#e8ebf3] bg-white m-5">
          <div className="border-b border-[#e8ebf3]">
            <h1 className="font-semibold text-xl p-3">Benefits Of Premium Ad</h1>
          </div>
          <div className="p-5 space-y-1">
            {benifitsOfPremiumAd.map((ad) => (
              <div className="flex items-center gap-3">
                <FaCheck className="text-green-500" />
                <h2>{ad}</h2>
              </div>
            ))}
            <h2 className="ml-7 cursor-pointer hover:text-blue pt-2">View More...</h2>
          </div>
        </div>

        <div className="border border-[#e8ebf3] bg-white m-5">
          <div className="border-b border-[#e8ebf3]">
            <h1 className="font-semibold text-xl p-3">Safety Tips For Buyers</h1>
          </div>
          <div className="p-5 space-y-1">
            {safetyTips.map((tips) => (
              <div className="flex items-center gap-2">
                <FaCheck className="text-green-500" />
                <h2>{tips}</h2>
              </div>
            ))}
            <h2 className="ml-7 cursor-pointer hover:text-blue pt-2">View More...</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Conditions;
