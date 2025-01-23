import React, { useEffect, useState } from "react";
import FormHeading from "../../../ui/FormHeading";
import FormInput from "../../../ui/FormInput";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../ui/Loader";
import { updateWorkerAsync } from "../../../Redux/Features/workersSlice";
import Snackbars from "../../../ui/Snackbars";

function EditWorkerForm({ closeDialog, worker }) {
  const dispatch = useDispatch();
  const { updateStatus } = useSelector((state) => state.workers);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm();
  
  useEffect(() => {
    if (worker) {
      setValue("name", worker.name);
      setValue("mobileNo", worker.mobileNo);
      setValue("adhaarNo", worker.adhaarNo);
    }
  }, [worker]);

  const editWorkerHandler = async (data) => {
    console.log("editWorker: ", data);

    try {
      const res = await dispatch(
        updateWorkerAsync({ id: worker.id, data })
      ).unwrap();
      console.log("Worker Updated successfully", res);
      if (res.success) {
        setSnackbar({
          open: true,
          type: "success",
          text: res.message,
        });
      }
      setTimeout(() => {
        closeDialog();
      }, 500);
    } catch (error) {
      console.error("Failed to update worker:", error);
      setSnackbar({
        open: true,
        type: "error",
        text: error?.message || "Error updating worker",
      });
    }
  };
  return (
    <>
      <FormHeading title="Edit Worker" closeDialog={closeDialog} />
      <div>
        <form
          onSubmit={handleSubmit(editWorkerHandler)}
          className="px-16 mt-4 space-y-4"
        >
          <FormInput
            label="Name"
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
            error={errors.name?.message}
            width="w-full"
          />
          <FormInput
            label="Mobile No."
            type="tel"
            {...register("mobileNo", {
              required: "Mobile Number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Mobile Number must be exactly 10 digits",
              },
              validate: (value) => {
                const cleanedValue = value.replace(/\D/g, "");
                return (
                  cleanedValue.length === 10 ||
                  "Mobile Number must be 10 digits"
                );
              },
            })}
            error={errors.mobileNo?.message}
            width="w-full"
            maxLength={10}
            onChange={(e) => {
              // Only allow digits
              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
            }}
          />
          <FormInput
            label="Adhaar No."
            type="number"
            {...register("adhaarNo", {
              required: "Adhaar Number is required",
              pattern: {
                value: /^\d{12}$/,
                message: "Adhaar Number must be exactly 12 digits",
              },
              validate: (value) => {
                const cleanedValue = value.replace(/\D/g, "");
                return (
                  cleanedValue.length === 12 ||
                  "Adhaar Number must be 12 digits"
                );
              },
            })}
            error={errors.adhaarNo?.message}
            width="w-full"
            maxLength={12}
            onChange={(e) => {
              // Only allow digits
              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 12);
            }}
          />
          <div className="flex justify-center mt-4 pb-4">
            <button className="bg-blue px-3 rounded-md font-semibold text-white py-1">
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

export default EditWorkerForm;
