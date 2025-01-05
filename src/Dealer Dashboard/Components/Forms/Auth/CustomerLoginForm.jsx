import React from "react";
import MobileNoInput from "./MobileNoInput";

function CustomerLoginForm() {
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
          Welcome !
        </h1>
        <h4 className="text-center text-black mt-1">
          Login and connect with our Dealers
        </h4>

        <MobileNoInput />

        {/* <OTPInput /> */}

        {/* <NameLocationInput /> */}
      </div>
    </>
  );
}

export default CustomerLoginForm;
