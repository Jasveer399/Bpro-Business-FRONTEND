import React, { useEffect } from "react";
import Navbar from "../../Components/Home/Navbar";
import Header from "../../Components/Home/Header";
import Footer from "../../Components/Home/Footer";
import { GoCheck, GoX } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlansAsync } from "../../../Redux/Features/PlansSlice";

function PricingPlan() {
  const dispatch = useDispatch();
  const { plans, plansStatus } = useSelector((state) => state.plans);

  useEffect(() => {
    if (plansStatus === "idle") {
      dispatch(fetchPlansAsync());
    }
  }, [dispatch, plansStatus])

  return (
    <>
      <Navbar />
      <Header />
      {/* First Pricing Cards */}
      {/* Second Pricing Cards */}
      <div className="text-5xl text-center text-[#504e70] font-thin my-5">
        Plan Pricing
      </div>
      <div className="bg-white flex items-center justify-center mb-5 p-4 font-maven">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white relative rounded-md p-0 flex flex-col items-center text-center mx-auto w-72"
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
                className={`${plan.planName === "Premium" ? "bg-[#e0f7fa]" : "bg-[#f9faff]"
                  } uppercase p-1 w-64 mt-3 left-0 text-center text-lg font-medium text-[#605e7e]`}
              >
                {plan.planName}
              </div>

              {/* planPrice */}
              <h2 className="text-5xl font-normal text-[#605e7e] mb-3 p-2 mt-2">
                ${plan.planPrice}
              </h2>

              <h2 className="text-5xl text-[#605e7e] mb-3 p-2 mt-2 flex flex-col">
                <span className="text-base">Available locations</span>
                <span className="text-base">{plan.maximumlocationlimit}</span>
                
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
                className={`${plan.planName === "Premium" ? "bg-[#00e682]" : "bg-[#ff2b88]"
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
