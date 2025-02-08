import axios from "axios";

export async function getSessionId() {
  try {
    const res = await axios.get(
      "http://localhost:3000/api/v1/payment/create-order"
    );

    console.log("res", res);
    return { sessionId: res.data.data.payment_session_id, orderId: res.data.data.order_id };
  } catch (error) {
    console.log("error", error);
  }
}
