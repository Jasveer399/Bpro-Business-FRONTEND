import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [status, setStatus] = useState("Checking payment status...");

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const res = await axios.post("http://localhost:3000/api/v1/payment/verify", { orderId });
        console.log("res", res);
        if (res.data.success) {
          setStatus("✅ Payment Successful!");
        } else {
          setStatus("❌ Payment Failed or Pending.");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setStatus("❌ Payment Failed or Pending.");
      }
    };

    if (orderId) {
      checkPaymentStatus();
    }
  }, [orderId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold mb-5">Payment Status</h2>
      <p className="text-lg">{status}</p>
    </div>
  );
}

export default PaymentStatus;
