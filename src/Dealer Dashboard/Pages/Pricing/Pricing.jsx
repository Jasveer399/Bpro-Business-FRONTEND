import React from "react";
import Navbar from "../../Components/Home/Navbar";
import Header from "../../Components/Home/Header";
import Footer from "../../Components/Home/Footer";

function Pricing() {
  const pricingPlans = [
    {
      price: "0.00",
      title: "Free",
      features: [
        "Free Ad Posting",
        "0 Feature Ad",
        "100% Secure",
        "Custom Reviews",
        "24/7 support",
      ],
    },
    {
      price: "19",
      title: "Premium",
      features: [
        "Featured Ad Posting",
        "20 Feature Ad",
        "100% Secure",
        "Custom Reviews",
        "24/7 support",
      ],
    },
    {
      price: "67",
      title: "Silver",
      features: [
        "Featured Ad Posting",
        "30 Feature Ad",
        "100% Secure",
        "Custom Reviews",
        "24/7 support",
      ],
    },
    {
      price: "78",
      title: "Gold",
      features: [
        "Featured Ad Posting",
        "50 Feature Ad",
        "100% Secure",
        "Custom Reviews",
        "24/7 support",
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

  return (
    <>
      <Navbar />
      <Header />
      <div className="bg-gray-100 flex items-center mb-5 justify-center p-4 font-maven">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white relative rounded-sm shadow-md p-0 flex flex-col items-center text-center mx-auto w-72"
            >
              {/* Ribbon Title */}
              <div className="absolute top-4 -left-10 bg-[#6963ff] text-white font-semibold py-1 px-4 transform -rotate-45 shadow-lg w-28 text-sm text-center">
                {plan.title}
              </div>

              {/* Price */}
              <h2 className="text-4xl font-normal text-[#605e7e] p-2 mt-8">
                ${plan.price}
              </h2>
              <hr className="w-full border-gray-100 mb-4" />

              {/* Features */}
              <ul className="text-gray-600 space-y-2 mb-4">
                {plan.features.map((feature, i) => {
                  const [firstWord, ...remainingWords] = feature.split(" ");
                  return (
                    <li key={i} className="text-sm">
                      <span className="text-black font-medium">
                        {firstWord}
                      </span>{" "}
                      <span>{remainingWords.join(" ")}</span>
                    </li>
                  );
                })}
              </ul>
              <hr className="w-full border-gray-100 mb-4" />

              {/* Button */}
              <button
                className="bg-[#6963ff] text-white mb-3 rounded-sm py-2 px-4 hover:bg-[#5a54f8] transition"
                style={{ boxShadow: "0 -1px 0px rgba(50, 50, 50, 0.2) inset" }}
              >
                Purchase Now
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

export default Pricing;
