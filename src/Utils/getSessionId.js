import axios from "axios";

export async function getSessionId() {
  try {
    const data = {
      id: sessionStorage.getItem("dealerId"),
      amt: sessionStorage.getItem("planPrice"),
    };
    const res = await axios.post(
      `http://localhost:3000/api/v1/payment/create-order`,
      data
    );

    console.log("res", res);
    return {
      sessionId: res.data.data.payment_session_id,
      orderId: res.data.data.order_id,
    };
  } catch (error) {
    console.log("error", error);
  }
}
