import React from "react";
import FormHeading from "../../../ui/FormHeading";
import FormInput from "../../../ui/FormInput";
import { useForm } from "react-hook-form";
import TextareaInput from "../../../ui/TextareaInput";


function AddBlogsForm({ closeDialog }) {
    const {
      formState: { errors },
      handleSubmit,
      register,
      watch
    } = useForm({
      defaultValues: {
          status: 'active'
        }
    });
  
    // const watchStatus = watch('status');
  
    const addBannerHandler = (data) => {
      console.log("addBannerHandler: ", data);
    };
    return (
      <>
        <FormHeading title="Add Blogs" closeDialog={closeDialog} />
        <div>
          <form onSubmit={handleSubmit(addBannerHandler)} className="px-16 mt-4 space-y-4">
            <FormInput
              label="Enter Blog Name"
              type="text"
              {...register("blogname", {
                required: "Blog Name is required",
              })}
              error={errors.title?.message}
              width="w-full"
            />
            <FormInput
              label="Upload Image"
              type="file"
              {...register("blogImage", {
                required: "Banner Image is required",
              })}
              error={errors.bannerImgUrl?.message}
              width="w-full"
            />
            <TextareaInput
              label="Blog Content"
              type="text"
              {...register("blogContent", {
                required: "Content is required",
              })}
              error={errors.externalUrl?.message}
              width="w-full"
            />
            <div className="flex justify-center mt-4">
            <button className="bg-blue px-3 rounded-md font-semibold dark:text-white py-1">Submit</button>
            </div>
          </form>
        </div>
      </>
    );
  }

export default AddBlogsForm
