import React, { useState } from "react";
import FormHeading from "../../../ui/FormHeading";
import FormInput from "../../../ui/FormInput";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryAsync } from "../../../Redux/Features/categoriesSlice";
import Loader from "../../../ui/Loader";
import { ImageUp, X } from "lucide-react";
import Snackbars from "../../../ui/Snackbars";

function AddCategoryForm({ closeDialog }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.categories);
  const [iconImg, setIconImg] = useState({ file: null });
  // const [categoryImg, setCategoryImg] = useState({ file: null });
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const addCategoryHandler = async (data) => {
    console.log("addCategory: ", data);
    const formData = new FormData();
    formData.append("title", data.title);
    if (iconImg.file) {
      formData.append("iconImgUrl", iconImg.file);
    }
    // if (categoryImg.file) {
    //   formData.append("categoryImgUrl", categoryImg.file);
    // }

    try {
      const response = await dispatch(addCategoryAsync(formData)).unwrap();
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
      console.error("Failed to add category:", error);
    }
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    setIconImg({ file });
  };

  const removeIcon = () => {
    setIconImg({ file: null });
  };

  // const handleCategoryImgUpload = (e) => {
  //   const file = e.target.files[0];
  //   setCategoryImg({ file });
  // };

  // const removeCategoryImg = () => {
  //   setCategoryImg({ file: null });
  // };
  return (
    <>
      <FormHeading title="Add Category" closeDialog={closeDialog} />
      <div>
        <form
          onSubmit={handleSubmit(addCategoryHandler)}
          className="px-16 mt-4 space-y-4"
        >
          <FormInput
            label="Enter Category Title"
            type="text"
            {...register("title", {
              required: "Title is required",
            })}
            error={errors.title?.message}
            width="w-full"
          />
          <p className="text-center">Upload Icon</p>
          <div className="w-40 h-40 mx-auto border-dotted border-2 border-blue rounded-xl flex flex-col justify-center items-center relative">
            {iconImg.file ? (
              <>
                <img
                  src={URL.createObjectURL(iconImg.file)}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeIcon}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  aria-label="Remove image"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <ImageUp
                  size={50}
                  className="text-blue text-xl font-bold cursor-pointer"
                  onClick={() =>
                    document.getElementById("icon-upload").click()
                  }
                />
                <input
                  id="icon-upload"
                  type="file"
                  onChange={handleIconUpload}
                  className="hidden"
                  accept="image/*"
                />
              </>
            )}
          </div>

          {/* <p className=" mt-4">Upload Category Image</p>
          <div className="w-full h-52 mx-auto border-dotted border-2 border-blue rounded-xl flex flex-col justify-center items-center relative">
            {categoryImg.file ? (
              <>
                <img
                  src={URL.createObjectURL(categoryImg.file)}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeCategoryImg}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  aria-label="Remove image"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <ImageUp
                  size={50}
                  className="text-blue text-xl font-bold cursor-pointer mb-4"
                  onClick={() =>
                    document.getElementById("category-image-upload").click()
                  }
                />
                <input
                  id="category-image-upload"
                  type="file"
                  onChange={handleCategoryImgUpload}
                  className="hidden"
                  accept="image/*"
                />
              </>
            )}
          </div> */}
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

export default AddCategoryForm;
