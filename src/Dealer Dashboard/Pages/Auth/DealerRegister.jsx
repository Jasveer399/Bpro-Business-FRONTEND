import React from "react";
import AuthSection from "../../Components/Auth/AuthSection";
import CreateAccountForm from "../../Components/Forms/Auth/CreateAccountForm";

function DealerRegister() {
  return (
    <>
      <div className="h-screen w-full flex items-center justify-center">
        <div className="w-[5%]"></div>
        <div className="w-[45%] h-full flex flex-col items-center justify-center">
          <AuthSection />
        </div>
        <div className="w-[40%] ">
            <div className="h-full flex flex-col items-center justify-center border py-16 rounded-xl border-gray-300">

          <CreateAccountForm />
            </div>
        </div>
        <div className="w-[10%]"></div>
      </div>
    </>
  );
}

export default DealerRegister;
