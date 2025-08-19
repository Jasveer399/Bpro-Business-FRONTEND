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
      <div className="p-3">
        <div className="w-full md:w-auto flex justify-center">
          <img
            src="/BproBusiness.png"
            className="w-48 md:w-64"
            alt="BproBusiness Logo"
          />
        </div>
        <h1 className="text-center font-bold text-black text-2xl mt-2">
          Welcome!
        </h1>
        <h4 className="text-center text-black mt-1">
          Login and connect with our Dealers
        </h4>

        {!showOtpInput ? (
          // STEP 1: Phone number input view
          <>
            <MobileNoInput
              setPhoneNumber={setPhoneNumber}
              phoneNumber={phoneNumber}
            />
            <div className="w-[80%] mx-auto mt-3 flex justify-between items-center">
              <div className="flex items-center text-black gap-1">
                <input
                  onChange={() => setIsAgree(!isAgree)}
                  type="checkbox"
                  id="terms"
                />
                <small className="text-xs">
                  I Agree to Terms and Conditions
                </small>
              </div>
              <p className="text-secondary font-semibold text-xs">
                T&C's Privacy Policy
              </p>
            </div>
            <div className="w-[80%] mx-auto mt-8">
              <button
                onClick={handleRequestOTP}
                className="bg-secondary w-full py-3 font-semibold rounded-md shadow-lg flex justify-center items-center"
                disabled={customerStatus === "loading"}
              >
                {customerStatus === "loading" ? <Loader /> : "Send OTP"}
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                  closeDialog();
                }}
                className="bg-transparent text-gray-500 mt-4 w-full py-3 font-semibold rounded-md flex justify-center items-center border border-gray-300"
                disabled={customerStatus === "loading"}
              >
                Login as Dealer
              </button>
            </div>
          </>
        ) : showLoginSuccess ? (
          // Login success view (shown after OTP verification if isUserFillAllDetails=true
          // or after profile completion)
          <div className="w-[80%] mx-auto mt-4 text-center">
            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
              <h2 className="text-xl font-bold mb-2">Login Successful!</h2>
              <p>You are now connected with our dealers.</p>
            </div>
            <button
              onClick={() => {
                setIsLogin(true);
                closeDialog();
              }}
              className="bg-secondary w-full py-3 font-semibold rounded-md shadow-lg"
            >
              Explore Now
            </button>
          </div>
        ) : showProfileForm ? (
          // STEP 3: Name and Location form (shown if OTP verified and isUserFillAllDetails=false)
          <NameLocationInput
            onSubmit={handleProfileSubmit}
            mobileNo={phoneNumber}
            customerStatus={customerStatus}
            closeDialog={closeDialog}
          />
        ) : (
          // STEP 2: OTP input view (shown after phone number input regardless of isUserFillAllDetails)
          <>
            <div className="w-[80%] mx-auto mt-4">
              <p className="text-center mb-2">
                Enter the OTP sent to {phoneNumber}
              </p>
              <OTPInput length={4} onComplete={handleOtpComplete} />
              {otp && (
                <p className="text-center mt-2 text-gray-500 text-sm">
                  Development mode - OTP: {otp}
                </p>
              )}
              <div className="flex justify-center mt-3">
                <button
                  onClick={handleChangeNumber}
                  className="text-secondary text-sm underline"
                >
                  Change Number
                </button>
              </div>
            </div>
            <div className="w-[80%] mx-auto mt-8">
              <button
                onClick={handleVerifyOTP}
                className="bg-secondary w-full py-3 font-semibold rounded-md shadow-lg flex justify-center items-center"
                disabled={customerStatus === "loading" || !otpInputValue}
              >
                {customerStatus === "loading" ? <Loader /> : "Verify OTP"}
              </button>
            </div>
          </>
        )}
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

export default CustomerLoginForm;
