import React from "react";
import Navbar from "../../Components/Home/Navbar";
import Header from "../../Components/Home/Header";
import Footer from "../../Components/Home/Footer";
import { GoCheck, GoX } from "react-icons/go";
import { getDealerAccessToken } from "../../../Utils/Helper";
import { useNavigate } from "react-router-dom";

function PricingPlan() {
  const navigate = useNavigate();
  const firstPricingPlans = [
    {
      duration: "For One Year",
      package: "Basic Package",
      listing: "for 5 listings in the package",
      firstPrice: "71.09",
      secondPrice: "35.54",
      premimumFeatures: ["Sticky", "Featured"],
      features: [
        "Up to 2 categories",
        "1 location",
        "Up to 5 images",
        "No videos",
      ],
    },
    {
      duration: "For One Year",
      package: "Standard Package",
      listing: "for 15 listings in the package",
      firstPrice: "118.49",
      secondPrice: "59.24",
      premimumFeatures: ["Sticky", "Featured"],
      features: [
        "Up to 3 categories",
        "Up to 2 location",
        "Up to 15 images",
        "1 video",
      ],
    },
    {
      duration: "For One Year",
      package: "Premium Package",
      listing: "for 30 listings in the package",
      firstPrice: "236.99",
      secondPrice: "118.49",
      premimumFeatures: ["Sticky", "Featured"],
      features: [
        "Up to 5 categories",
        "Up to 4 location",
        "Up to 30 images",
        "5 videos",
      ],
    },
    {
      package: "Ultimate Package",
      listing: "for 100 listings in the package",
      firstPrice: "379.20",
      secondPrice: "189.59",
      premimumFeatures: ["Sticky", "Featured"],
      features: [
        "Up to 100 categories",
        "Up to 100 location",
        "Up to 100 images",
        "Up to 15 videos",
      ],
    },
  ];

  const otherPricingPlans = [
    {
      price: "0",
      title: "Free",
      features: ["4 Ads", "30 days", "Private Messages", "Urgent Ads"],
    },
    {
      price: "65",
      title: "Premium",
      features: ["50 Ads", "60 days", "Private Messages", "Urgent Ads"],
    },
    {
      price: "100",
      title: "Enterprise",
      features: ["100 Ads", "180 days", "Private Messages", "Urgent Ads"],
    },
    {
      price: "150",
      title: "Unlimited",
      features: ["Unlimited Ads", "365 days", "Private Messages", "Urgent Ads"],
    },
  ];

  const token = getDealerAccessToken()

  return (
    <>
      <Navbar />
      <Header />
      {/* First Pricing Cards */}
      <div className="bg-gray-100 flex items-center mb-5 justify-center p-4 font-maven">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {firstPricingPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white relative rounded-md p-5 flex flex-col items-center text-center mx-auto w-72"
            >
              {/* Duration */}
              <div className="mt-3 left-0 text-center text-sm font-medium text-[#605e7e]">
                {plan.duration}
              </div>

              {/* Package */}
              <div className="left-0 text-center text-xl font-semibold text-black">
                {plan.package}
              </div>

              {/* Listing */}
              <div className="w-32 left-0 text-center text-sm font-medium text-[#605e7e]">
                {plan.listing}
              </div>

              {/* First Price */}
              <h2 className="text-2xl font-bold border-b-8 border-[#777492] text-black mb-3 p-2 mt-2">
                ${plan.firstPrice}
              </h2>

              {/* Second Price */}
              <h2 className="text-2xl font-bold border-b-8 border-[#777492] text-black mb-3 p-2 mt-2">
                ${plan.secondPrice}
              </h2>

              {/* Premium Features */}
              <ul className="text-left space-y-2 mb-2">
                {plan.premimumFeatures.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-center space-x-2 font-medium text-md ${
                      index < 2 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {index < 2 ? <GoX /> : <GoCheck />}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Features */}
              <ul className="text-black font-medium capitalize text-left space-y-2 mb-7">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-sm">
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`${
                  plan.title === "" ? "bg-[#00e682]" : "bg-[#ff2b88]"
                } text-white mb-3 rounded-sm py-2 px-5 hover:bg-[#5a54f8] transition border-[#ff2b88]`}
                style={{ boxShadow: "0 -1px 0px rgba(50, 50, 50, 0.2) inset" }}
                onClick={() => navigate(`${token ? "/product-listing" : "/register" }`)}
              >
                Select This Plan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Second Pricing Cards */}
      <div className="text-5xl text-center text-[#504e70] font-thin">
        Another Pricing
      </div>
      <div className="bg-white flex items-center justify-center mb-5 p-4 font-maven">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherPricingPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white relative rounded-md p-0 flex flex-col items-center text-center mx-auto w-72"
              style={{
                border: "1px solid #e8ebf3",
                borderTop:
                  plan.title === "Premium"
                    ? "4px solid #00e682"
                    : "1px solid #e8ebf3",
              }}
            >
              {/* Title Box */}
              <div
                className={`${
                  plan.title === "Premium" ? "bg-[#e0f7fa]" : "bg-[#f9faff]"
                } uppercase p-1 w-64 mt-3 left-0 text-center text-lg font-medium text-[#605e7e]`}
              >
                {plan.title}
              </div>

              {/* Price */}
              <h2 className="text-5xl font-normal text-[#605e7e] mb-3 p-2 mt-2">
                ${plan.price}
              </h2>

              {/* Features */}
              <ul className="text-gray-600 space-y-2 mb-7">
                {plan.features.map((feature, i) => {
                  const [firstWord, ...remainingWords] = feature.split(" ");
                  return (
                    <li key={i} className="text-sm">
                      <span className="text-[#605e7e] font-semibold">
                        {firstWord}
                      </span>{" "}
                      <span>{remainingWords.join(" ")}</span>
                    </li>
                  );
                })}
              </ul>

              {/* Button */}
              <button
                className={`${
                  plan.title === "Premium" ? "bg-[#00e682]" : "bg-[#ff2b88]"
                } text-white mb-3 rounded-sm py-2 px-20 hover:bg-[#5a54f8] transition border-[#ff2b88]`}
                style={{ boxShadow: "0 -1px 0px rgba(50, 50, 50, 0.2) inset" }}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PricingPlan;
