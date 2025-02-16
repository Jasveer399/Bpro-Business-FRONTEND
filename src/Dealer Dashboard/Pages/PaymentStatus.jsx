import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../Utils/server";

function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  const [status, setStatus] = useState("Checking payment status...");

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const res = await axios.post(
          `${server}/api/v1/payment/verify`,
          { orderId, id: sessionStorage.getItem("dealerId") }
        );
        console.log("res", res);
        if (res.data.success) {
          setStatus("✅ Payment Successful! Redirecting...");
          setTimeout(() => {
            navigate("/editprofile");
          }, 1000);
        } else {
          setStatus("❌ Payment Failed or Pending.");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setStatus("❌ Payment Failed or Pending.");
      } finally {
        sessionStorage.removeItem("planName");
        sessionStorage.removeItem("planDuration");
        sessionStorage.removeItem("planPrice");
        sessionStorage.removeItem("planId");
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
      {status === "❌ Payment Failed or Pending." && (
        <h1
          onClick={() => navigate("/register", { replace: true })}
          className="text-blue hover:underline cursor-pointer"
        >
          Go Back
        </h1>
      )}
    </div>
  );
}

export default PaymentStatus;
