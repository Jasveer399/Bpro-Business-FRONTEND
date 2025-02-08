import React, { useEffect, useState } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { getSessionId } from "../../Utils/getSessionId";

function Cashfree() {
  const [cashfree, setCashfree] = useState(null);

  useEffect(() => {
    const initializeSDK = async () => {
      const instance = await load({ mode: "sandbox" });
      setCashfree(instance);
    };

    initializeSDK();
  }, []); // Run only once on component mount

  const handlePayment = async () => {
    try {
      const { sessionId, orderId } = await getSessionId();

      if (!cashfree) {
        console.error("Cashfree SDK not loaded yet");
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

          try {
            const res = await axios.post(
              "http://localhost:3000/api/v1/payment/verify",
              { orderId }
            );

            if (res.data.success) {
              alert("Payment successful!");
            } else {
              alert("Payment failed or pending.");
            }
          } catch (error) {
            console.log("Payment Verification Error", error);
          }
        })
        .catch((err) => {
          console.log("Payment Error", err);
        });
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="inline-flex flex-col justify-center items-center w-screen h-screen">
      <h2 className="text-xl mb-5 font-light">Cashfree Payment Integration</h2>

      <button
        onClick={handlePayment}
        className="bg-blue text-white py-2 px-5 rounded-full shadow-md hover:bg-black transition duration-300 ease-in-out hover:shadow-xl"
      >
        Pay Now
      </button>

      {/* Modal Container for Cashfree */}
      <div id="cashfree-modal"></div>
    </div>
  );
}

export default Cashfree;
