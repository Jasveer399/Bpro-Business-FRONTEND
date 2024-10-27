import React from "react";
import FormHeading from "../../../ui/FormHeading";
import FormInput from "../../../ui/FormInput";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryAsync } from "../../../Redux/Features/categoriesSlice";
import Loader from "../../../ui/Loader";

function AddCategoryForm({ closeDialog }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.categories)
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();


  const addCategoryHandler = async (data) => {
    console.log("addCategory: ", data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("iconImgUrl", data.iconImgUrl[0]);
    formData.append("categoryImgUrl", data.categoryImgUrl[0]);

    try {
      await dispatch(addCategoryAsync(formData)).unwrap();
      console.log("Category added successfully");
      closeDialog();
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };
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
          <FormInput
            label="Upload Icon"
            type="file"
            {...register("iconImgUrl", {
              required: "Icon is required",
            })}
            error={errors.iconImgUrl?.message}
            width="w-full"
          />
          <FormInput
            label="Upload Image"
            type="file"
            {...register("categoryImgUrl", {
              required: "Category Image is required",
            })}
            error={errors.categoryImgUrl?.message}
            width="w-full"
          />
          <div className="flex justify-center mt-4">
            <button className="bg-blue px-3 rounded-md font-semibold dark:text-white py-1">
              {status === 'loading' ? <Loader /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddCategoryForm;
