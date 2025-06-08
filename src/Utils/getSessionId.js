import axios from "axios";
import { server } from "./server";

export async function getSessionId(isRegistering = true, dealerId, price) {
  try {
    let data = {};
    if (isRegistering) {
      data = {
        id: sessionStorage.getItem("dealerId"),
        planId: sessionStorage.getItem("planId"),
        isRegistering: true,
      };
    } else {
      data = {
        id: dealerId,
        isRegistering: false,
        amount: price,
      };
    }

    const res = await axios.post(`${server}/api/v1/payment/create-order`, data);

    console.log("res", res);
    return {
      sessionId: res.data.data.payment_session_id,
      orderId: res.data.data.order_id,
    };
  } catch (error) {
    console.log("error", error);
  }
}
