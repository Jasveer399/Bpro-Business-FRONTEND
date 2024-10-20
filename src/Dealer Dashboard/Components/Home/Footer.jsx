import React from "react";
import FooterInput from "../../../ui/FooterInput";

function Footer() {
  return (
    <>
      <div className="grid grid-cols-3 mx-5 mb-6 font-montserrat">
        <div className="bg-[#F9F9F9] py-10 px-4 rounded-md">
          <h1 className="text-3xl">We Connect</h1>
          <h1 className="font-bold text-4xl">Buyers & Sellers</h1>
          <p className="text-[#6A6A6A] my-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
          <div className="flex gap-3 w-full mt-14">
            <div className="flex flex-col items-center justify-center bg-white shadow-md w-full py-5 rounded-md">
              <img src="/footerIcon3.png" className="w-14 mb-2" />
              <h1 className="font-semibold">Trusted</h1>
              <h1 className="font-semibold">Platform</h1>
            </div>
            <div className="flex flex-col items-center justify-center bg-white shadow-md w-full py-5 rounded-md">
              <img src="/footerIcon2.png" className="w-14 mb-2" />
              <h1 className="font-semibold">Safe &</h1>
              <h1 className="font-semibold">Secure</h1>
            </div>
            <div className="flex flex-col items-center justify-center bg-white shadow-md w-full py-5 rounded-md">
              <img src="/footerIcon1.png" className="w-14 mb-2" />
              <h1 className="font-semibold">Quick</h1>
              <h1 className="font-semibold">Assistance</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-5">
            <h1 className="font-bold text-4xl">Tell Us What You Need</h1>
            <FooterInput width="w-96"  placeholder="Enter Your Service Name..." />
        </div>
        <div className="flex flex-col items-center space-y-5">
            <h1 className="font-bold text-4xl text-white">I</h1>
            <FooterInput width="w-96"  placeholder="Contact Number..." />
        </div>
      </div>
    </>
  );
}

export default Footer;
