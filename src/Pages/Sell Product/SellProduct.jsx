import React from "react";
import SellProductForm from "../../Components/Forms/Sell Product/SellProductForm";
import Conditions from "../../Components/Sell Product/Conditions";
import Navbar from "../../Dealer Dashboard/Components/Home/Navbar";

function SellProduct() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center w-full bg-[#f6f7fb] font-montserrat">
        <div className="w-[60%]">
          <SellProductForm />
        </div>
        <div>
          <Conditions />
        </div>
      </div>
    </>
  );
}

export default SellProduct;
