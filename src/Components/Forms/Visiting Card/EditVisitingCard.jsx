import React, { useEffect, useState } from "react";
import FormHeading from "../../../ui/FormHeading";
import FormInput from "../../../ui/FormInput";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../ui/Loader";
import Snackbars from "../../../ui/Snackbars";
import { updateVisitingCardPrice } from "../../../Redux/Features/visitingCardSlice";

function EditVisitingCard({ closeDialog, data }) {
  const dispatch = useDispatch();
  const { updateStatus } = useSelector((state) => state.visitingCards);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm();

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("price", data.price);
    }
  }, [data]);

  const editHandler = async (passData) => {
    try {
      const response = await dispatch(
        updateVisitingCardPrice({ id: data.id, passData })
      ).unwrap();
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
            "Error adding category",
        });
      }
    } catch (error) {
      console.error("Failed to updating category:", error);
      setSnackbar({
        open: true,
        type: "error",
        text: error?.message || "Error updating category",
      });
    }
  };

  return (
    <>
      <FormHeading title="Edit Visiting Card" closeDialog={closeDialog} />
      <div>
        <form
          onSubmit={handleSubmit(editHandler)}
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
              {updateStatus === "loading" ? <Loader /> : "Save"}
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

export default EditVisitingCard;
