import React, { useState, useRef, useEffect } from "react";
import { RiEdit2Fill } from "react-icons/ri";

const OTPInput = ({ length = 4, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const [resendTimer, setResendTimer] = useState(54); // 54 seconds timer
  const timerRef = useRef(null);

  useEffect(() => {
    // Start the timer
    timerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const handleChange = (element, index) => {
    const value = element.value;

    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Call onComplete when all digits are filled
    if (newOtp.every((digit) => digit !== "")) {
      onComplete?.(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Focus previous input when backspace is pressed on empty input
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((digit, index) => {
      if (index < length) {
        newOtp[index] = digit;
        inputRefs.current[index].value = digit;
      }
    });
    setOtp(newOtp);

    // Focus last input or next empty input
    const focusIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[focusIndex].focus();
  };

  return (
    <>
      <h1 className="flex items-center justify-center text-base font-semibold text-black gap-1 mt-3">
        OTP Sent on +91 8888888888{" "}
        <RiEdit2Fill className="text-secondary text-lg cursor-pointer" />
      </h1>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4 mt-4">
          {otp.map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={otp[index]}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-14 h-14 text-center text-secondary text-xl border-2 border-gray-300 rounded-lg focus:border-secondary focus:outline-none"
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-2">
          {resendTimer > 0 ? (
            <p className="text-primary font-bold text-sm">
              Didn't Receive the OTP? Retry in{" "}
              {String(Math.floor(resendTimer / 60)).padStart(2, "0")}:
              {String(resendTimer % 60).padStart(2, "0")}
            </p>
          ) : (
            <button
              className={`text-orange-400 font-medium ${
                resendTimer > 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={resendTimer > 0}
              onClick={() => {
                // Handle resend logic here
                setResendTimer(54);
              }}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
      <div className="w-[80%] mx-auto mt-4">
        <button className="bg-secondary w-full py-3 font-semibold rounded-md shadow-lg">
          Continue
        </button>
      </div>
    </>
  );
};

export default OTPInput;
