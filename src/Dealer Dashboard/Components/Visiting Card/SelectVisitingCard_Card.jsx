import React, { useEffect, useState } from "react";
import { getSessionId } from "../../../Utils/getSessionId";
import { load } from "@cashfreepayments/cashfree-js";
import { useNavigate } from "react-router-dom";

const SelectVisitingCard_Card = ({
  name,
  price,
  setSnackbar,
  dealerId,
  isPaymentDoneForVisitingCard,
}) => {
  const navigate = useNavigate();
  const [cashfree, setCashfree] = useState(null);

  useEffect(() => {
    const initializeSDK = async () => {
      const instance = await load({ mode: "sandbox" });
      setCashfree(instance);
    };

    initializeSDK();
  }, []); // Run only once on component mount
  console.log("first", isPaymentDoneForVisitingCard);
  const handlePayment = async () => {
    if (isPaymentDoneForVisitingCard) {
      navigate("/create-visiting-card");
      return;
    }
    try {
      const { sessionId, orderId } = await getSessionId(false, dealerId, price);

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
  return (
    <div className="rounded-lg shadow-md px-4 py-6 flex flex-col items-center justify-center border border-gray-200">
      <img src="/template.png" className="w-48 h-48 object-cover" />
      <h1 className="text-lg font-bold mt-4">{name}</h1>
      <p className="text-base text-green-700 font-semibold">Rs. {price}</p>
      <button
        onClick={handlePayment}
        className="bg-primary font-bold shadow-md text-white px-4 py-2 rounded-full mt-2 w-[90%]"
      >
        Select
      </button>
    </div>
  );
};

export default SelectVisitingCard_Card;
