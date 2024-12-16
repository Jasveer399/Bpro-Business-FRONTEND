import React, { useEffect, useState } from "react";
import FormHeading from "../../../ui/FormHeading";
import FormInput from "../../../ui/FormInput";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../ui/Loader";
import Snackbars from "../../../ui/Snackbars";
import { updatePlanAsync } from "../../../Redux/Features/PlansSlice";

function EditPlan({ closeDialog, plan }) {
  const dispatch = useDispatch();
  const { plansStatus } = useSelector((state) => state.plans);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm();

  useEffect(() => {
    if (plan) {
      setValue("planName", plan.planName);
      setValue("planPrice", plan.planPrice);
      setValue("maximumlocationlimit", plan.maximumlocationlimit);
    }
  }, [plan]);

  const editPlanHandler = async (data) => {
    console.log("data: ", data);
    try {
      const response = await dispatch(
        updatePlanAsync({ id: plan.id, data })
      ).unwrap();
      if (response.success) {
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
            "Error adding banner",
        });
      }
    } catch (error) {
      console.error("Failed to updating category:", error);
    }
  };

  return (
    <>
      <FormHeading title="Edit Plan" closeDialog={closeDialog} />
      <div>
        <form
          onSubmit={handleSubmit(editPlanHandler)}
          className="px-16 mt-4 space-y-4"
        >
          <FormInput
            label="Enter Plan Title"
            type="text"
            {...register("planName", {
              required: "Plan Title is required",
            })}
            error={errors.planName?.message}
            width="w-full"
          />
          <FormInput
            label="Enter Plan Price"
            type="number"
            {...register("planPrice", {
              required: "Plan Price is required",
            })}
            error={errors.planPrice?.message}
            width="w-full"
          />
          <FormInput
            label="Enter Location Limit"
            type="number"
            {...register("maximumlocationlimit", {
              required: "Location Limit is required",
            })}
            error={errors.maximumlocationlimit?.message}
            width="w-full"
          />
          <div className="flex justify-center mt-4">
            <button className="bg-blue px-3 rounded-md font-semibold mb-4 text-white py-1">
              {plansStatus === "loading" ? <Loader /> : "Save"}
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

export default EditPlan;
