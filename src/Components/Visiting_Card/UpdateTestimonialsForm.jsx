import { ArrowLeft, MoveLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FormInput from "../../ui/FormInput";
import TextareaInput from "../../ui/TextareaInput";
import ImageUpload from "./ImageUpload";
import {
  updateTestimonialAsync,
  selectUpdateStatus,
  selectTestimonialsError,
  resetUpdateStatus,
  selectTestimonials,
} from "../../Redux/Features/testimonialsSlice";
import Loader from "../../ui/Loader";
import { selectCurrentDealer } from "../../Redux/Features/dealersSlice";

function UpdateTestimonialsForm({ testimonialId, closeDialog }) {
  const dispatch = useDispatch();
  const updateStatus = useSelector(selectUpdateStatus);
  const error = useSelector(selectTestimonialsError);
  const testimonials = useSelector(selectTestimonials);
  const currentDealer = useSelector(selectCurrentDealer);

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  // Find the testimonial to update
  const testimonial = testimonials.find((t) => t.id === testimonialId);

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      clientName: "",
      designation: "",
      testimonialText: "",
    },
  });

  // Populate form with existing data when testimonial is found
  useEffect(() => {
    if (testimonial) {
      setValue("clientName", testimonial.clientName || testimonial.name || "");
      setValue("designation", testimonial.designation || "");
      setValue(
        "testimonialText",
        testimonial.testimonialsText || testimonial.content || ""
      );

      // Set current image if exists
      if (testimonial.clientPhoto) {
        setCurrentImage(testimonial.clientPhoto);
      }
    }
  }, [testimonial, setValue]);

  const handleImageChange = (file) => {
    console.log("Image selected:", file);
    setSelectedImage(file);
    setCurrentImage(null); // Clear current image preview when new image is selected
  };

  const handleImageRemove = () => {
    console.log("Image removed");
    setSelectedImage(null);
    setCurrentImage(null);
  };

  const onSubmit = async (data, event) => {
    event?.preventDefault();

    // Create FormData for multipart/form-data request
    const formData = new FormData();
    formData.append("content", data.testimonialText);
    formData.append("name", data.clientName);
    formData.append("designation", data.designation);

    // Add image if selected (new image)
    if (selectedImage) {
      formData.append("clientPhoto", selectedImage);
    } else {
      formData.append("clientPhoto", currentImage);
    }

    //Print the form data for debugging
    console.log("Form Data being submitted:", Object.fromEntries(formData));

    try {
      // Dispatch the async thunk with testimonial ID
      const result = await dispatch(
        updateTestimonialAsync({
          id: testimonialId,
          formData: formData,
        })
      ).unwrap();

      console.log("Testimonial updated successfully:", result);

      // Reset form and close dialog on success
      reset();
      setSelectedImage(null);
      setCurrentImage(null);
      closeDialog();
    } catch (error) {
      console.error("Failed to update testimonial:", error);
      // Error is handled by Redux state, you can show it in UI
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    // Reset any pending status
    if (updateStatus !== "idle") {
      dispatch(resetUpdateStatus());
    }
    reset();
    setSelectedImage(null);
    setCurrentImage(null);
    closeDialog();
  };

  // Show loading or error if testimonial not found
  if (!testimonial) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Testimonial not found</p>
          <button
            onClick={() => closeDialog()}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="flex items-center gap-4 mb-6 border-b py-4 px-6">
        <MoveLeft
          size={28}
          className="bg-white border cursor-pointer p-1 rounded-full"
          onClick={() => closeDialog()}
        />
        <h1 className="font-semibold">Update Testimonial</h1>
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
        <div>
          <h1 className="py-2 text-[15px] text-gray-600">Client Photo</h1>

          {/* Show current image if exists and no new image selected */}
          {currentImage && !selectedImage ? (
            <div className="mb-4">
              <div className="relative inline-block">
                <img
                  src={currentImage}
                  alt="Current client photo"
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => setCurrentImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            </div>
          ) : (
            <ImageUpload
              register={register}
              setValue={setValue}
              error={errors.clientImage?.message}
              fieldName="clientImage"
              onImageChange={handleImageChange}
              onImageRemove={handleImageRemove}
            />
          )}
        </div>

        {/* Show error message if any */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {typeof error === "string"
              ? error
              : error.message || "An error occurred"}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex gap-3 py-4 border-t mt-4">
          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            disabled={updateStatus === "loading"}
            className="px-6 py-2 font-[500] bg-secondary text-primary rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {updateStatus === "loading" ? <Loader /> : "Update"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={updateStatus === "loading"}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateTestimonialsForm;
