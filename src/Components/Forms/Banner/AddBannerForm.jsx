import React, { useState } from "react";
import FormHeading from "../../../ui/FormHeading";
import FormInput from "../../../ui/FormInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import { addBanner } from "../../../Utils/server";
import Loader from "../../../ui/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addBannerAsync } from "../../../Redux/Features/bannersSlice";
import { ImageUp, X } from "lucide-react";
import Snackbars from "../../../ui/Snackbars";

function AddBannerForm({ closeDialog, categoryId }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.banners);
  const [imageContainer, setImageContainer] = useState({ file: null });
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
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

  const addBannerHandler = async (data) => {
    console.log("addBannerHandler: ", data);
    const formData = new FormData();
    formData.append("title", data.title);
    if (imageContainer.file) {
      formData.append("bannerImgUrl", imageContainer.file);
    }
    formData.append("status", data.status);
    formData.append("externalUrl", data.externalUrl);
    formData.append("categoryId", categoryId);

    try {
      const response = await dispatch(addBannerAsync(formData)).unwrap();
      console.log("response", response);
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
          text: response?.payload || response?.error?.message || "Error adding banner",
        });
      }
    } catch (error) {
      console.error("Failed to add banner:", error);
      setSnackbar({
        open: true,
        type: "error",
        text: error.message,
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageContainer({ file });
  };

  const removeImage = () => {
    setImageContainer({ file: null });
  };
  return (
    <>
      <FormHeading title="Add Banner" closeDialog={closeDialog} />
      <div>
        <form
          onSubmit={handleSubmit(addBannerHandler)}
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
          {/* <FormInput
            label="Upload Image"
            type="file"
            {...register("bannerImgUrl", {
              required: "Banner Image is required",
            })}
            error={errors.bannerImgUrl?.message}
            width="w-full"
          /> */}
          <div className="w-80 mx-auto border-dotted border-2 border-blue rounded-xl flex flex-col justify-center items-center relative">
            {imageContainer.file ? (
              <>
                <img
                  src={URL.createObjectURL(imageContainer.file)}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  aria-label="Remove image"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <p className="text-center mt-4">Upload Banner Image</p>
                <ImageUp
                  size={50}
                  className="text-blue text-xl font-bold cursor-pointer mb-4"
                  onClick={() =>
                    document.getElementById("banner-image-upload").click()
                  }
                />
                <input
                  id="banner-image-upload"
                  type="file"
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </>
            )}
          </div>
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
            <button className="bg-blue px-3 rounded-md font-semibold text-white py-1 mb-4">
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

export default AddBannerForm;
