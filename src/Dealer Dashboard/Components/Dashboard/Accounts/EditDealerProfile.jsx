import React from "react";
import FormInput from "../../../../ui/FormInput";
import { Controller, useForm } from "react-hook-form";
import SelectInput from "../../../../ui/SelectInput";
import TextareaInput from "../../../../ui/TextareaInput";

function EditDealerProfile() {
  const {
    register,
    formState: { errors },
    control,
  } = useForm();

  const allOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section: Image and Account Settings */}
      <div className="w-full md:w-1/3 bg-white p-6 flex flex-col items-center">
        {/* Profile Image */}
        <img
          src="auth-img.png"
          alt="Profile"
          className="w-32 h-32 md:w-64 md:h-64 rounded-full shadow-lg object-cover mb-6"
        />

        {/* Change Password */}
        <div className="w-full mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Change Password
          </h2>
          <form>
            <FormInput
              label="Current Password"
              type="password"
              {...register("currentPassword", {
                required: "Current Password is required",
              })}
              error={errors.currentPassword?.message}
              width="w-full"
            />
            <FormInput
              label="New Password"
              type="password"
              {...register("newPassword", {
                required: "New Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              error={errors.newPassword?.message}
              width="w-full"
            />
            <button
              type="submit"
              className="bg-[#EB6752] w-full py-2 mt-4 rounded-md text-white font-semibold hover:bg-[#191A1F] transition-colors duration-300"
            >
              Change Password
            </button>
          </form>
        </div>

        {/* Close Your Account */}
        <div className="w-full">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Close Your Account
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Deleting your account will remove all your data permanently. This
            action cannot be undone.
          </p>
          <button
            type="button"
            className="bg-red-600 w-full py-2 rounded-md text-white font-semibold hover:bg-red-700 transition-colors duration-300"
          >
            Close Your Account
          </button>
        </div>
      </div>

      {/* Right Section: Form */}
      <div className="w-2/3 bg-white p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Profile</h1>
        <form>
          {/* Row 1: First Name & Last Name */}
          <div className="flex items-center gap-6 mb-6">
            <FormInput
              label="Full Name"
              type="text"
              {...register("fullName", {
                required: "Full Name is required",
              })}
              error={errors.fullName?.message}
              width="w-full"
            />
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

          {/* Row 2: Nickname & Dropdown */}
          <div className="flex items-center gap-6 mb-6">
            <FormInput
              label="Nickname (required)"
              type="text"
              {...register("nickname", {
                required: "Nick Name is required",
              })}
              error={errors.nickname?.message}
              width="w-full"
            />
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display to Public as
              </label>
              <Controller
                name="displayToPublic"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field, fieldState: { error } }) => (
                  <SelectInput
                    label="Select One Option"
                    options={allOptions}
                    onChange={(option) => field.onChange(option.value)}
                    error={error?.message}
                    width="w-full"
                    value={field.value}
                  />
                )}
              />
            </div>
          </div>

          {/* Row 3: Phone & WhatsApp */}
          <div className="flex items-center gap-6 mb-6">
            <FormInput
              label="Mobile Number"
              type="number"
              {...register("mobileNo", {
                required: "Mobile Number is required",
              })}
              error={errors.mobileNo?.message}
              width="w-full"
            />
            <FormInput
              label="WhatsApp Number"
              type="number"
              {...register("whatsappNo", {
                required: "WhatsApp Number is required",
              })}
              error={errors.whatsappNo?.message}
              width="w-full"
            />
          </div>

          {/* Row 4: Biography & Public Address */}
          <div className="flex items-center gap-6 mb-6">
            <TextareaInput
              label="Biography here..."
              {...register("bio", {
                required: "Biography is required",
                minLength: {
                  value: 10,
                  message: "Content must be at least 50 characters",
                },
              })}
              error={errors.bio?.message}
              rows={6}
              width="w-full"
            />
            <TextareaInput
              label="Public Address here..."
              {...register("address", {
                required: "Public Address is required",
                minLength: {
                  value: 10,
                  message: "Content must be at least 50 characters",
                },
              })}
              error={errors.address?.message}
              rows={6}
              width="w-full"
            />
          </div>

          {/* Row 5: Social Media Links */}
          <div className="flex items-center gap-6 mb-6">
            <FormInput
              label="Facebook Link"
              type="text"
              {...register("facebook")}
              error={errors.facebook?.message}
              width="w-full"
            />
            <FormInput
              label="Twitter Link"
              type="text"
              {...register("twitter")}
              error={errors.twitter?.message}
              width="w-full"
            />
          </div>

          <div className="flex items-center gap-6 mb-6">
            <FormInput
              label="Instagram Link"
              type="text"
              {...register("insta")}
              error={errors.instagram?.message}
              width="w-full"
            />
            <FormInput
              label="YouTube Link"
              type="text"
              {...register("youtube")}
              error={errors.youtube?.message}
              width="w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-[#EB6752] w-full py-3 rounded-md text-white font-semibold hover:bg-[#191A1F] transition-colors duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditDealerProfile;
