import React, { useState } from "react";
import VisitingCardInput from "./VisitingCardInput";
import Snackbars from "../../../../ui/Snackbars";
import axios from "axios";
import { sendMail } from "../../../../Utils/server";
import Loader from "../../../../ui/Loader";

const VisitingCardForm = ({ id }) => {
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      id,
      ...formData,
    };
    try {
      const res = await axios.post(sendMail, data);

      if (res.data.status) {
        setSnackbar({
          open: true,
          type: "success",
          text: res.data.message,
        });
        setFormData({
          name: "",
          email: "",
          mobileNo: "",
          message: "",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        type: "error",
        text:
          error?.response?.data.message ||
          error?.message ||
          "Error Sending Inquiry",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="ml-5">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row w-full items-center lg:gap-5">
            <VisitingCardInput
              type="text"
              value={formData.name}
              setValue={setFormData}
              placeholder="Full Name"
            />
            <VisitingCardInput
              type="email"
              value={formData.email}
              setValue={setFormData}
              placeholder="Your Email"
            />
            <VisitingCardInput
              type="tel"
              value={formData.mobileNo}
              setValue={setFormData}
              placeholder="Contact Number"
            />
          </div>
          <textarea
            className="w-full placeholder:font-normal placeholder:text-sm bg-transparent resize-none mt-5 p-2 rounded-md focus:outline-none border border-gray-300 h-40 text-primary"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          ></textarea>
          <button
            type="submit"
            className="text-white w-full lg:w-60 mx-auto rounded-md py-2.5 mt-3 text-lg bg-[#E83435]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              "Send Inquiry"
            )}
          </button>
        </form>
      </div>
      <Snackbars
        open={snackbar.open}
        type={snackbar.type}
        text={snackbar.text}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
};

export default VisitingCardForm;
