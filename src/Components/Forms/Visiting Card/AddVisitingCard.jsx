import React, { useState } from "react";
import FormHeading from "../../../ui/FormHeading";
import FormInput from "../../../ui/FormInput";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../ui/Loader";
import Snackbars from "../../../ui/Snackbars";
import { createVisitingCardPrice } from "../../../Redux/Features/visitingCardSlice";

function AddVisitingCard({ closeDialog }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.visitingCards);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const addVisitingCardHandler = async (data) => {
    try {
      const response = await dispatch(createVisitingCardPrice(data)).unwrap();
      if (response.status) {
        setSnackbar({
          open: true,
          type: "success",
          text: response.message,
        });
        setTimeout(() => {
          closeDialog();
        }, 500);
      } else {
        setSnackbar({
          open: true,
          type: "error",
          text:
            response?.payload ||
            response?.error?.message ||
            "Error adding pricing",
        });
      }
    } catch (error) {
      console.error("Failed to add pricing:", error);
      setSnackbar({
        open: true,
        type: "error",
        text: error?.message || "Error adding pricing",
      });
    }
  };

  return (
    <>
      <FormHeading title="Add Visiting Card" closeDialog={closeDialog} />
      <div>
        <form
          onSubmit={handleSubmit(addVisitingCardHandler)}
          className="px-16 mt-4 space-y-4"
        >
          <FormInput
            label="Enter Name"
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
            error={errors.name?.message}
            width="w-full"
          />
          <FormInput
            label="Enter Price"
            type="number"
            {...register("price", {
              required: "Price is required",
            })}
            error={errors.price?.message}
            width="w-full"
          />
          <div className="flex justify-center mt-4">
            <button className="bg-blue px-3 rounded-md font-semibold mb-4 text-white py-1">
              {status === "loading" ? <Loader /> : "Submit"}
            </button>
          </div>
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
}

export default AddVisitingCard;
