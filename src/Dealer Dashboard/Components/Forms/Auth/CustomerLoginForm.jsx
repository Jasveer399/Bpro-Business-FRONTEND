import React, { useState, useEffect } from "react";
import MobileNoInput from "./MobileNoInput";
import { useDispatch, useSelector } from "react-redux";
import {
  createCustomerAndGetOTPAsync,
  verifyOTPAsync,
} from "../../../../Redux/Features/customerSlice";
import Loader from "../../../../ui/Loader";
import Snackbars from "../../../../ui/Snackbars";
import OTPInput from "../../../../ui/OTPInput";
import NameLocationInput from "./NameLocationInput";
import { Link, useNavigate } from "react-router-dom";

function CustomerLoginForm({ closeDialog, setIsLogin }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const [otp, setOtp] = useState("");
  const [otpInputValue, setOtpInputValue] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    status: customerStatus,
    error,
    isOTPVerified,
    customerData,
  } = useSelector((state) => state.customer);

  useEffect(() => {
    if (isOTPVerified) {
      // Check if user already has completed profile
      if (customerData?.isUserFillAllDetails) {
        // User has already filled all details, show success message
        setShowLoginSuccess(true);
        setShowProfileForm(false);
      } else {
        // User needs to fill profile details
        setShowProfileForm(true);
        setShowLoginSuccess(false);
      }
    }
  }, [isOTPVerified, customerData]);

  // Handle OTP request (first step)
  const handleRequestOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setSnackbar({
        open: true,
        type: "error",
        text: "Please enter a valid phone number",
      });
      return;
    }

    if (!isAgree) {
      setSnackbar({
        open: true,
        type: "error",
        text: "Please agree to terms and conditions",
      });
      return;
    }
    try {
      const resultAction = await dispatch(
        createCustomerAndGetOTPAsync(phoneNumber)
      );
      if (createCustomerAndGetOTPAsync.fulfilled.match(resultAction)) {
        // Success case
        if (resultAction.payload?.data?.otp) {
          setOtp(resultAction.payload.data.otp); // Store server OTP for development
        }
        // Always show OTP input after successful OTP request, regardless of isUserFillAllDetails
        setShowOtpInput(true);
        setSnackbar({
          open: true,
          type: "success",
          text: "OTP sent successfully to your mobile number",
        });
      } else {
        // Error case
        setSnackbar({
          open: true,
          type: "error",
          text: resultAction.payload || "Failed to send OTP. Please try again.",
        });
      }
    } catch (err) {
      console.error("Error requesting OTP:", err);
      setSnackbar({
        open: true,
        type: "error",
        text: "An unexpected error occurred",
      });
    }
  };

  // Handle OTP verification (second step)
  const handleVerifyOTP = async () => {
    if (!otpInputValue || otpInputValue.length < 4) {
      setSnackbar({
        open: true,
        type: "error",
        text: "Please enter a valid OTP",
      });
      return;
    }
    try {
      const resultAction = await dispatch(
        verifyOTPAsync({ mobileNo: phoneNumber, otp: otpInputValue })
      );
      if (verifyOTPAsync.fulfilled.match(resultAction)) {
        // Success case
        setSnackbar({
          open: true,
          type: "success",
          text: "OTP verified successfully!",
        });

        // The isOTPVerified effect will handle the next step based on isUserFillAllDetails
      } else {
        setSnackbar({
          open: true,
          type: "error",
          text: resultAction.payload || "Invalid OTP. Please try again.",
        });
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setSnackbar({
        open: true,
        type: "error",
        text: "An unexpected error occurred during verification",
      });
    }
  };

  // Handle OTP completion from the OTPInput component
  const handleOtpComplete = (value) => {
    setOtpInputValue(value);
  };

  // Reset form to phone input state
  const handleChangeNumber = () => {
    setShowOtpInput(false);
    setShowProfileForm(false);
    setShowLoginSuccess(false);
    setOtp("");
    setOtpInputValue("");
  };

  // Handle profile form submission
  const handleProfileSubmit = (profileData) => {
    // Handle the completed profile - you could navigate or show a success message
    setSnackbar({
      open: true,
      type: "success",
      text: "Profile updated successfully!",
    });
    setShowLoginSuccess(true);
    setShowProfileForm(false);
    // Additional logic for after profile completion (redirect, etc.)
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        {/* Main Container */}
        <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8">
          {/* Logo Section */}
          <div className="w-full flex justify-center mb-4 sm:mb-6">
            <img
              src="/BproBusiness.png"
              className="w-32 sm:w-40 md:w-48 h-auto max-w-full"
              alt="BproBusiness Logo"
            />
          </div>

          {/* Header Section */}
          <div className="text-center mb-6">
            <h1 className="font-bold text-black text-xl sm:text-2xl mb-2">
              Welcome!
            </h1>
            <h4 className="text-black text-sm sm:text-base">
              Login and connect with our Dealers
            </h4>
          </div>

          {!showOtpInput ? (
            // STEP 1: Phone number input view
            <div className="flex-1 flex flex-col">
              <div className="mb-6 flex-1">
                <MobileNoInput
                  setPhoneNumber={setPhoneNumber}
                  phoneNumber={phoneNumber}
                />
              </div>

              {/* Terms and Conditions Section */}
              <div className="mb-6">
                <div className="flex items-start text-black gap-3">
                  <input
                    onChange={() => setIsAgree(!isAgree)}
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-4 h-4 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="terms"
                      className="text-sm leading-relaxed block"
                    >
                      I Agree to{" "}
                      <span className="text-secondary font-semibold">
                        T&C's
                      </span>{" "}
                      Terms and{" "}
                      <span className="text-secondary font-semibold">
                        Privacy Policy
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Buttons Section */}
              <div className="space-y-3 mt-auto">
                <button
                  onClick={handleRequestOTP}
                  className="bg-secondary w-full py-4 font-semibold rounded-lg shadow-lg flex justify-center items-center text-base disabled:opacity-70"
                  disabled={customerStatus === "loading"}
                >
                  {customerStatus === "loading" ? <Loader /> : "Send OTP"}
                </button>
                <button
                  onClick={() => {
                    navigate("/login");
                    closeDialog();
                  }}
                  className="bg-transparent text-gray-600 w-full py-4 font-semibold rounded-lg flex justify-center items-center border-2 border-gray-300 text-base hover:bg-gray-50 disabled:opacity-70"
                  disabled={customerStatus === "loading"}
                >
                  Login as Dealer
                </button>
              </div>
            </div>
          ) : showLoginSuccess ? (
            // Login success view
            <div className="flex-1 flex flex-col text-center">
              <div className="flex-1 flex flex-col justify-center">
                <div className="bg-green-100 text-green-800 p-6 rounded-lg mb-6">
                  <h2 className="text-xl font-bold mb-2">Login Successful!</h2>
                  <p className="text-base">
                    You are now connected with our dealers.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsLogin(true);
                  closeDialog();
                }}
                className="bg-secondary w-full py-4 font-semibold rounded-lg shadow-lg text-base"
              >
                Explore Now
              </button>
            </div>
          ) : showProfileForm ? (
            // STEP 3: Name and Location form
            <div className="flex-1">
              <NameLocationInput
                onSubmit={handleProfileSubmit}
                mobileNo={phoneNumber}
                customerStatus={customerStatus}
                closeDialog={closeDialog}
              />
            </div>
          ) : (
            // STEP 2: OTP input view
            <div className="flex-1 flex flex-col">
              <div className="flex-1">
                <p className="text-center mb-6 text-base text-gray-700">
                  Enter the OTP sent to{" "}
                  <span className="font-semibold text-black block mt-1">
                    {phoneNumber}
                  </span>
                </p>

                {/* OTP Input Container */}
                <div className="flex justify-center mb-6">
                  <OTPInput length={4} onComplete={handleOtpComplete} />
                </div>

                {/* Development OTP Display */}
                {otp && (
                  <p className="text-center mb-6 text-gray-600 text-sm bg-yellow-50 py-3 px-4 rounded-lg border">
                    Development mode - OTP:{" "}
                    <span className="font-mono font-bold text-lg">{otp}</span>
                  </p>
                )}

                {/* Change Number Link */}
                <div className="flex justify-center">
                  <button
                    onClick={handleChangeNumber}
                    className="text-secondary text-base underline hover:no-underline py-2"
                  >
                    Change Number
                  </button>
                </div>
              </div>

              {/* Verify Button */}
              <div className="mt-auto">
                <button
                  onClick={handleVerifyOTP}
                  className="bg-secondary w-full py-4 font-semibold rounded-lg shadow-lg flex justify-center items-center text-base disabled:opacity-70"
                  disabled={customerStatus === "loading" || !otpInputValue}
                >
                  {customerStatus === "loading" ? <Loader /> : "Verify OTP"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Snackbar */}
      <Snackbars
        open={snackbar.open}
        type={snackbar.type}
        text={snackbar.text}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
}

export default CustomerLoginForm;
