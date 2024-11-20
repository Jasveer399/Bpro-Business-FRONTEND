import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import FormInput from "../../../ui/FormInput";
import SelectInput from "../../../ui/SelectInput";
import { useDispatch, useSelector } from "react-redux";
import TextareaInput from "../../../ui/TextareaInput";
import { fetchCategoriesAsync } from "../../../Redux/Features/categoriesSlice";

function SellProductForm() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
  } = useForm();
  const { categories, status } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategoriesAsync());
    }
  }, [status, dispatch]);

  const allCategories = categories.map((category) => ({
    value: category.id,
    label: category.title,
  }));

  const sellProductHandler = async (data) => {
    console.log("sellProductHandler: ", data);
  };
  return (
    <>
      <div className="border border-[#e8ebf3] bg-white m-5">
        <div className="border-b border-[#e8ebf3]">
          <h1 className="text-xl font-bold p-3 text-center">Add Post</h1>
        </div>
        <div className="px-16 py-5 mb-2">
          <form
            onSubmit={handleSubmit(sellProductHandler)}
            className="space-y-4"
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
            <div>
              <h1 className="text-sm ml-2 mb-px text-gray-600">Category</h1>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field, fieldState: { error } }) => (
                  <SelectInput
                    label="Select Category"
                    options={allCategories}
                    onChange={(option) => {
                      field.onChange(option.value);
                      // handlePartyChange(option);
                    }}
                    error={error?.message}
                    width="w-full"
                    value={field.value}
                  />
                )}
              />
            </div>
            <div>
              <h1 className="text-sm ml-2 mb-px text-gray-600">Type of Ad</h1>
              <div className="flex items-center gap-4 ml-3 mt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="sell"
                    id="ad"
                    {...register("ad", {
                      required: "Type of Ad is required",
                    })}
                    error={errors.ad?.message}
                    width="w-full"
                  />
                  <h2>I Want to Sell</h2>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="buy"
                    id="ad"
                    {...register("ad", {
                      required: "Type of Ad is required",
                    })}
                    error={errors.ad?.message}
                    width="w-full"
                  />
                  <h2>I Want to Buy</h2>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-sm ml-2 mb-px text-gray-600">
                Type of Condition
              </h1>
              <div className="flex items-center gap-4 ml-3 mt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="new"
                    id="condition"
                    name="new"
                    {...register("condition", {
                      required: "Type of Ad is required",
                    })}
                    error={errors.condition?.message}
                    width="w-full"
                  />
                  <label name="new">New</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="used"
                    id="condition"
                    name="used"
                    {...register("condition", {
                      required: "Type of Ad is required",
                    })}
                    error={errors.condition?.message}
                    width="w-full"
                  />
                  <label name="used">Used</label>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-sm ml-2 mb-px text-gray-600">Description</h1>
              <TextareaInput
                label="Text here..."
                width="w-full"
                {...register("desc", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Content must be at least 50 characters",
                  },
                })}
                error={errors.desc?.message}
                rows={6}
              />
            </div>
            <div className="flex gap-3">
              <label htmlFor="img" className="w-full">
                <input
                  id="img"
                  className={`w-full px-3 py-3 bg-white rounded-md focus:outline-none transition-shadow duration-200 ease-in-out
        text-gray-600 placeholder-gray-400 text-base border border-gray-400`}
                  type="file"
                  {...register("img")}
                  // error={errors.img?.message}
                />
              </label>
              <div
                className="w-40 bg-secondary rounded-md font-semibold flex justify-center items-center cursor-pointer"
                onClick={() => document.getElementById("img").click()}
              >
                Choose File
              </div>
            </div>
            <div className="flex w-full items-center gap-5">
              <div className="w-[50%]">
                <FormInput
                  label="Name"
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  error={errors.name?.message}
                  width="w-full"
                />
              </div>
              <div className="w-[50%]">
                <FormInput
                  label="Email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  error={errors.email?.message}
                  width="w-full"
                />
              </div>
            </div>
            <div className="flex w-full items-center gap-5 pb-2">
              <div className="w-[50%]">
                <FormInput
                  label="Phone Number"
                  type="number"
                  {...register("phoneNo", {
                    required: "Phone No. is required",
                  })}
                  error={errors.phoneNo?.message}
                  width="w-full"
                />
              </div>
              <div className="w-[50%]">
                <FormInput
                  label="Address"
                  type="text"
                  {...register("address", {
                    required: "Address is required",
                  })}
                  error={errors.address?.message}
                  width="w-full"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-secondary rounded-md shadow-md font-semibold px-3 py-2"
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SellProductForm;
