import { ArrowLeft, MoveLeft } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FormInput from "../../ui/FormInput";
import TextareaInput from "../../ui/TextareaInput";
import ImageUpload from "./ImageUpload";
import {
  createTestimonialAsync,
  selectCreateStatus,
  selectTestimonialsError,
  resetCreateStatus,
} from "../../Redux/Features/testimonialsSlice";
import { selectCurrentDealer } from "../../Redux/Features/dealersSlice";

function AddTestimonialsForm({ closeDialog }) {
  const dispatch = useDispatch();
  const createStatus = useSelector(selectCreateStatus);
  const error = useSelector(selectTestimonialsError);
  const currentDealer = useSelector(selectCurrentDealer);

  const [selectedImage, setSelectedImage] = useState(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
  } = useForm();

  const handleImageChange = (file) => {
    console.log("Image selected:", file);
    setSelectedImage(file);
  };

  const handleImageRemove = () => {
    console.log("Image removed");
    setSelectedImage(null);
  };

  const onSubmit = async (data, event) => {
    event?.preventDefault();

    // Create FormData for multipart/form-data request
    const formData = new FormData();
    formData.append("content", data.testimonialText);
    formData.append("name", data.clientName);
    formData.append("designation", data.designation);
    formData.append("dealerId", currentDealer.id);

    // Add image if selected
    if (selectedImage) {
      formData.append("clientPhoto", selectedImage);
    }
    try {
      // Dispatch the async thunk
      const result = await dispatch(createTestimonialAsync(formData)).unwrap();

      console.log("Testimonial created successfully:", result);

      // Reset form and close dialog on success
      reset();
      setSelectedImage(null);
      closeDialog();
    } catch (error) {
      console.error("Failed to create testimonial:", error);
      // Error is handled by Redux state, you can show it in UI
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    // Reset any pending status
    if (createStatus !== "idle") {
      dispatch(resetCreateStatus());
    }
    reset();
    setSelectedImage(null);
    closeDialog();
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center gap-4 mb-6 border-b py-4 px-6">
        <MoveLeft
          size={28}
          className="bg-white border cursor-pointer p-1 rounded-full"
          onClick={closeDialog}
        />
        <h1 className="font-semibold">Add New Testimonials</h1>
      </div>
      <div className="flex flex-col gap-4 px-6">
        <FormInput
          label="Client Name"
          type="text"
          {...register("clientName", {
            required: "Client name is required",
          })}
          error={errors.clientName?.message}
          width="w-full"
        />
        <FormInput
          label="Designation / Company Name"
          type="text"
          {...register("designation", {
            required: "Designation is required",
          })}
          error={errors.designation?.message}
          width="w-full"
        />
        <div>
          <h1 className="py-2 text-[15px] text-gray-600">Testimonials Text</h1>
          <TextareaInput
            label="Text here..."
            width="w-full"
            {...register("testimonialText", {
              required: "Testimonial text is required",
              minLength: {
                value: 10,
                message: "Content must be at least 10 characters",
              },
            })}
            error={errors.testimonialText?.message}
            rows={6}
          />
        </div>

        {/* Image Upload Section */}
        <div className="">
          <h1 className="py-2 text-[15px] text-gray-600">Client Photo</h1>
          <ImageUpload
            register={register}
            setValue={setValue}
            error={errors.clientImage?.message}
            fieldName="clientImage"
            onImageChange={handleImageChange}
            onImageRemove={handleImageRemove}
          />
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 py-4 border-t mt-4">
          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="px-6 py-2 font-[500] bg-secondary text-primary rounded-lg hover:bg-secondary transition-colors"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={closeDialog}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTestimonialsForm;
