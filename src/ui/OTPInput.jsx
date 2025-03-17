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
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4 mt-4">
          {otp.map((_, index) => (
            <div className="px-2 pt-1 pb-2 shadow-[0_3px_20px_-3px_rgba(0,0,0,0.4),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-3xl">
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(ref) => (inputRefs.current[index] = ref)}
                value={otp[index]}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-6 h-8 text-center text-primary text-xl border-b-2 border-primary mx-2 focus:outline-none"
              />
            </div>
          ))}
        </div>
        {/* 
                <div className="flex flex-col items-center gap-2">
                    {resendTimer > 0 ? (
                        <p className="text-primary font-bold text-sm">
                            Didn't Receive the OTP? Retry in{" "}
                            {String(Math.floor(resendTimer / 60)).padStart(2, "0")}:
                            {String(resendTimer % 60).padStart(2, "0")}
                        </p>
                    ) : (
                        <button
                            className={`text-orange-400 font-medium ${resendTimer > 0 ? "opacity-50 cursor-not-allowed" : ""
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
                </div> */}
      </div>
    </>
  );
};

export default OTPInput;
