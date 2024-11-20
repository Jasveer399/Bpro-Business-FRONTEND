import React from "react";
import AuthInput from "../../ui/AuthInput";
import { useForm } from "react-hook-form";
import TextareaInput from "../../../../ui/TextareaInput";

function ContactForm() {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div className="space-y-6">
        <AuthInput
          label="Full Name"
          type="text"
          {...register("fullName", {
            required: "Full Name is required",
          })}
          error={errors.fullName?.message}
          width="w-96"
        />
        <AuthInput
          label="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
          error={errors.email?.message}
          width="w-96"
        />
        <AuthInput
          label="Phone No."
          type="number"
          {...register("phoneNo", {
            required: "Phone No. is required",
          })}
          error={errors.phoneNo?.message}
          width="w-96"
        />
        <TextareaInput
          label="Text here..."
          width="w-96"
          {...register("message", {
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Content must be at least 50 characters",
            },
          })}
          error={errors.message?.message}
          rows={3}
        />
        <div className="flex">
          <button
            type="submit"
            className="bg-[#EB6752] rounded-md text-white py-2 px-6 hover:bg-[#191A1F] transform duration-300 ease-in-out font-semibold shadow-md"
          >
            Send Message
          </button>
        </div>
      </div>
    </>
  );
}

export default ContactForm;
