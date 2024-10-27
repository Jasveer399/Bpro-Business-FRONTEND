import React from "react";
import FormHeading from "../../../ui/FormHeading";
import FormInput from "../../../ui/FormInput";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../ui/Loader";
import { addWorkerAsync } from "../../../Redux/Features/workersSlice";

function AddWorkerForm({ closeDialog }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.workers);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const addWorkerHandler = async (data) => {
    console.log("addWorker: ", data);
    const formData = new FormData();

    try {
      await dispatch(addWorkerAsync(data)).unwrap();
      console.log("Worker added successfully");
      closeDialog();
    } catch (error) {
      console.error("Failed to add worker:", error);
    }
  };
  return (
    <>
      <FormHeading title="Add Worker" closeDialog={closeDialog} />
      <div>
        <form
          onSubmit={handleSubmit(addWorkerHandler)}
          className="px-16 mt-4 space-y-4"
        >
          <FormInput
            label="Enter Worker Name"
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
            error={errors.name?.message}
            width="w-full"
          />
          <FormInput
            label="Enter Worker Mobile No."
            type="number"
            {...register("mobileNo", {
              required: "Mobile No. is required",
            })}
            error={errors.mobileNo?.message}
            width="w-full"
          />
          <div className="flex justify-center mt-4">
            <button className="bg-blue px-3 rounded-md font-semibold dark:text-white py-1">
              {status === "loading" ? <Loader /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddWorkerForm;
