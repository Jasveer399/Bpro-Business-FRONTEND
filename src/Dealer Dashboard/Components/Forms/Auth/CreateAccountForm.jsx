import React, { useEffect, useState } from "react";
import AuthInput from "../../ui/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import SelectInput from "../../../../ui/SelectInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkerIdAndNameAsync } from "../../../../Redux/Features/workersSlice";
import { addDealerAsync } from "../../../../Redux/Features/dealersSlice";
import Loader from "../../../../ui/Loader";
import Snackbars from "../../../../ui/Snackbars";
import { load } from "@cashfreepayments/cashfree-js";
import { getSessionId } from "../../../../Utils/getSessionId";

function CreateAccountForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const { status, workers } = useSelector((state) => state.workers);
  const { status: dealerStatus } = useSelector((state) => state.dealers);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cashfree, setCashfree] = useState(null);

  useEffect(() => {
    const initializeSDK = async () => {
      const instance = await load({ mode: "sandbox" });
      setCashfree(instance);
    };

    initializeSDK();
  }, []); // Run only once on component mount

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWorkerIdAndNameAsync());
    }
  }, [status, dispatch]);

  const registerDealer = async (data) => {
    if (
      !sessionStorage.getItem("planName") ||
      !sessionStorage.getItem("planDuration") ||
      !sessionStorage.getItem("planPrice")
    ) {
      setSnackbar({
        open: true,
        type: "error",
        text: "Please select a plan",
      });
      return;
    }
    const fullData = {
      ...data,
      planId: sessionStorage.getItem("planId"),
    }
    const response = await dispatch(addDealerAsync(fullData));

    console.log("response", response);

    if (response.payload.success) {
      setSnackbar({
        open: true,
        type: "success",
        text: "Redirecting to payment page...",
      });
      sessionStorage.setItem("email", getValues("email"));
      sessionStorage.setItem("mobileNo", getValues("mobileNo"));
      sessionStorage.setItem("dealerId", response.payload.data.id);
      handlePayment();
      // setTimeout(() => {
      //   navigate("/editProfile", {
      //     state: {
      //       data: {
      //         email: getValues("email"),
      //         mobileNo: getValues("mobileNo"),
      //       },
      //     },
      //   });
      // }, 500);
    } else {
      setSnackbar({
        open: true,
        type: "error",
        text:
          response.payload ||
          response.error.message ||
          "Error creating account",
      });
    }
  };

  const handlePayment = async () => {
    try {
      const { sessionId, orderId } = await getSessionId();

      if (!cashfree) {
        setSnackbar({
          open: true,
          type: "error",
          text: "Cashfree SDK not loaded yet",
        });
        return;
      }

      const checkOutOptions = {
        paymentSessionId: sessionId,
        container: document.getElementById("cashfree-modal"),
        redirectTarget: "_self", // Keep user on the same page
      };

      cashfree
        .checkout(checkOutOptions)
        .then(async (res) => {
          console.log("Payment Initialized", res);
        })
        .catch((err) => {
          console.log("Payment Error", err);
        });
    } catch (error) {
      console.error("Payment Error:", error);
      setSnackbar({
        open: true,
        type: "error",
        text: error?.response?.data?.message || "Payment Error",
      });
    }
  };

  console.log("workers", workers);

  return (
    <>
      {/* <div>
        <img src="BproBusiness.png" className="w-[100%]" />
      </div> */}
      <div className="bg-[#2E3192] flex justify-center items-center w-full h-60 font-montserrat">
        <h1 className=" md:text-6xl text-4xl text-white font-montserrat">
          Signup
        </h1>
      </div>
      <div className="max-w-lg mx-auto font-montserrat px-5">
        <div className="text-center">
          <h1 className="font-semibold text-4xl mt-6 mb-2">Create Account</h1>
          <p className="text-[#777] text-base mb-4">
            After creating account you will redirect to payment page
          </p>
        </div>
        <form onSubmit={handleSubmit(registerDealer)} className="space-y-6">
          <AuthInput
            label="Username"
            type="text"
            {...register("username", {
              required: "Username is required",
            })}
            error={errors.name?.message}
            // width="w-96"
          />
          <AuthInput
            label="Mobile Number"
            type="tel"
            {...register("mobileNo", {
              required: "Mobile Number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Mobile Number must be exactly 10 digits",
              },
              validate: (value) => {
                const cleanedValue = value.replace(/\D/g, "");
                return (
                  cleanedValue.length === 10 ||
                  "Mobile Number must be 10 digits"
                );
              },
            })}
            error={errors.mobileNo?.message}
            // width="w-96"
            maxLength={10}
            onChange={(e) => {
              // Only allow digits
              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
            }}
          />
          <AuthInput
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            error={errors.email?.message}
            // width="w-96"
          />
          <AuthInput
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            error={errors.password?.message}
            // width="w-96"
          />
          <Controller
            name="workerId"
            control={control}
            rules={{ required: "Select Worker" }}
            render={({ field, fieldState: { error } }) => (
              <SelectInput
                label="Select Worker"
                options={workers}
                onChange={(option) => {
                  field.onChange(option.value);
                  // handlePartyChange(option);
                }}
                error={error?.message}
                width="w-full"
                value={field.value}
              />
            )}
          />
          {sessionStorage.getItem("planName") ||
          sessionStorage.getItem("planDuration") ||
          sessionStorage.getItem("planPrice") ? (
            <div className="border border-gray-400 rounded-md p-3">
              <h1 className="text-center text-lg font-[700] underline mb-2">
                Plan Overview
              </h1>
              <div className="flex items-center justify-between">
                <h1 className="font-[600]">Plan Name</h1>
                <h1 className="font-[400]">
                  {sessionStorage.getItem("planName")}
                </h1>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="font-[600]">Plan Price</h1>
                <h1 className="font-[400]">
                  Rs. {sessionStorage.getItem("planPrice")}
                </h1>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="font-[600]">Duration</h1>
                <h1 className="font-[400]">
                  {sessionStorage.getItem("planDuration")}
                </h1>
              </div>
            </div>
          ) : (
            <div className="text-sm">
              <div>
                No Plan Selected.{" "}
                <Link
                  to={"/pricing-plan"}
                  className="font-semibold text-blue hover:underline"
                >
                  Select a plan{" "}
                </Link>
                first to complete registeration.
              </div>
            </div>
          )}
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="bg-secondary w-full flex items-center justify-center rounded-md text-white py-3 px-6 hover:bg-[#191A1F] transform duration-300 ease-in-out font-semibold shadow-md"
            >
              {dealerStatus === "loading" ? <Loader /> : "Signup"}
            </button>
          </div>
          <div className="flex justify-center text-[#2E3192] font-bold">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-secondary cursor-pointer underline"
              >
                Login
              </Link>{" "}
              Here...
            </p>
          </div>
        </form>
      </div>
      <Snackbars
        open={snackbar.open}
        type={snackbar.type}
        text={snackbar.text}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
}

export default CreateAccountForm;
