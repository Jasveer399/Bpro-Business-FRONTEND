import React, { useEffect } from "react";
import FormHeading from "../../../ui/FormHeading";
import FormInput from "../../../ui/FormInput";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../ui/Loader";
import { updateWorkerAsync } from "../../../Redux/Features/workersSlice";

function EditWorkerForm({ closeDialog, worker }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.workers);
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
    }
  }, [worker]);

  const editWorkerHandler = async (data) => {
    console.log("editWorker: ", data);

    try {
      await dispatch(updateWorkerAsync({ id: worker.id, data})).unwrap();
      console.log("Worker Updated successfully");
      closeDialog();
    } catch (error) {
      console.error("Failed to update worker:", error);
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
              {status === "loading" ? <Loader /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditWorkerForm;
