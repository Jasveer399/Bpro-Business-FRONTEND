import React, { useEffect } from "react";
import Navbar from "../../Components/Home/Navbar";
import Header from "../../Components/Home/Header";
import Footer from "../../Components/Home/Footer";
import { GoCheck, GoX } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlansAsync } from "../../../Redux/Features/PlansSlice";
import { calculateDiscount, getDealerAccessToken } from "../../../Utils/Helper";
import { useNavigate } from "react-router-dom";
import Loader from "../../../ui/Loader";

function PricingPlan() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { plans, plansStatus } = useSelector((state) => state.plans);

  useEffect(() => {
    if (plansStatus === "idle") {
      dispatch(fetchPlansAsync());
    }
  }, [dispatch, plansStatus]);

  const token = getDealerAccessToken();

  console.log("plans: ", plans);

  return (
    <>
      <Navbar />
      <Header />
      {/* First Pricing Cards */}
      {/* Second Pricing Cards */}
      <div className="text-5xl text-center text-[#504e70] font-thin my-5">
        Plan Pricing
      </div>
      {plansStatus === "loading" ? (
        <div className="flex items-center justify-center py-10">
          <Loader />
        </div>
      ) : plans && plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className=" relative rounded-md p-0 flex flex-col items-center text-center mx-auto w-72 shadow-lg"
              style={{
                border: "1px solid #e8ebf3",
                borderTop:
                  plan.planName === "Premium"
                    ? "4px solid #00e682"
                    : "1px solid #e8ebf3",
              }}
            >
              {/* planName Box */}
              <div
                className={`${
                  plan.planName === "Premium" ? "bg-[#e0f7fa]" : "bg-[#f9faff]"
                } uppercase p-1 w-64 mt-3 left-0 text-center text-lg font-medium text-[#605e7e]`}
              >
                {plan.planName}
              </div>

              <div className="text-sm mt-3 flex items-center justify-center gap-2">
                <span className="line-through text-slate-400">
                  Rs.{plan.planPrice}
                </span>
                <span className="bg-slate-300 px-2 py-1 rounded-full font-[500]">
                  SAVE {plan.planDiscount}%
                </span>
              </div>

              {/* planPrice */}
              <h2 className="text-5xl font-normal text-[#605e7e] mb-3 p-2">
                Rs.
                {calculateDiscount(
                  plan.planPrice,
                  plan.planDiscount
                ).discountedPrice.toFixed(2)}
              </h2>

              <h2 className="text-xl font-[600] text-[#605e7e] mt-2">
                {plan.planDuration}
              </h2>

              <h2 className="text-5xl text-[#605e7e] mb-3 p-2 mt-2 flex flex-col">
                <span className="text-lg font-[500]">Features</span>
                <span className="text-base">
                  <p>{plan.locationCount} Locations</p>
                  {plan.planFeatures?.map((feature, i) => (
                    <p key={i}>{feature}</p>
                  ))}
                </span>
              </h2>
              {/* Features */}
              {/* <ul className="text-gray-600 space-y-2 mb-7">
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
                </ul> */}

              {/* Button */}
              <button
                className={`${
                  plan.planName === "Premium" ? "bg-[#00e682]" : "bg-[#ff2b88]"
                } text-white mb-3 rounded-sm py-2 px-20 hover:bg-[#5a54f8] transition border-[#ff2b88]`}
                style={{
                  boxShadow: "0 -1px 0px rgba(50, 50, 50, 0.2) inset",
                }}
                onClick={() => {
                  sessionStorage.setItem("planName", plan.planName);
                  sessionStorage.setItem("planDuration", plan.planDuration);
                  sessionStorage.setItem("planPrice", plan.planPrice);
                  sessionStorage.setItem("planDiscount", plan.planDiscount);
                  sessionStorage.setItem("planId", plan.id);
                  sessionStorage.setItem("locationCount", plan.locationCount);
                  navigate(`${token ? "/product-listing" : "/register"}`);
                }}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-2xl text-center text-[#504e70] font-thin my-5">
          No Plan Found
        </div>
      )}
      <Footer />
    </>
  );
}

export default PricingPlan;
