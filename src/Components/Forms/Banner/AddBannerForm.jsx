import React from "react";
import FormHeading from "../../../ui/FormHeading";
import FormInput from "../../../ui/FormInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import { addBanner } from "../../../Utils/server";
import Loader from "../../../ui/Loader";

function AddBannerForm({ closeDialog }) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm({
    defaultValues: {
      status: "active",
    },
  });

  const watchStatus = watch("status");

  // const bannerMutation = useMutation({
  //   mutationFn: async (data) => {
  //     const res = await axios.post(addBanner, data, { withCredentials: true });

  //     return res.data;
  //   },
  //   onSuccess: (data) => {
  //     console.log("Banner Added", data);
  //   },
  //   onError: (error) => {
  //     console.log("Error adding banner", error);
  //   },
  // });

  // const addBannerHandler = (data) => {
  //   console.log("addBannerHandler: ", data);
  //   bannerMutation.mutate(data);
  // };
  return (
    <>
      <FormHeading title="Add Banner" closeDialog={closeDialog} />
      <div>
        <form
          // onSubmit={handleSubmit(addBannerHandler)}
          className="px-16 mt-4 space-y-4"
        >
          <FormInput
            label="Enter Title"
            type="text"
            {...register("title", {
              required: "Title is required",
            })}
            error={errors.title?.message}
            width="w-full"
          />
          <FormInput
            label="Upload Image"
            type="file"
            {...register("bannerImgUrl", {
              required: "Banner Image is required",
            })}
            error={errors.bannerImgUrl?.message}
            width="w-full"
          />
          <div className="flex items-center gap-4 px-2">
            <h1 className="font-semibold">Status: </h1>
            <label
              className={`flex items-center gap-2 px-2 py-1 rounded-full cursor-pointer ${
                watchStatus === "active"
                  ? "bg-green-200 text-green-800 border-2 border-green-400"
                  : "bg-green-200 text-green-800"
              }`}
            >
              <input
                type="radio"
                value="active"
                {...register("status")}
                className="hidden"
              />
              Active
            </label>
            <label
              className={`flex items-center gap-2 px-2 py-1 rounded-full cursor-pointer ${
                watchStatus === "inactive"
                  ? "bg-red-200 text-red-800 border-2 border-red-400"
                  : "bg-red-200 text-red-800"
              }`}
            >
              <input
                type="radio"
                value="inactive"
                {...register("status")}
                className="hidden"
              />
              Inactive
            </label>
          </div>
          <FormInput
            label="Enter External Url"
            type="text"
            {...register("externalUrl", {
              required: "External Url is required",
            })}
            error={errors.externalUrl?.message}
            width="w-full"
          />
          <div className="flex justify-center mt-4">
            <button className="bg-blue px-3 rounded-md font-semibold dark:text-white py-1">
              {/* {bannerMutation.isPending ? <Loader /> : "Submit"} */}
              {/* <Loader/> */}submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddBannerForm;
