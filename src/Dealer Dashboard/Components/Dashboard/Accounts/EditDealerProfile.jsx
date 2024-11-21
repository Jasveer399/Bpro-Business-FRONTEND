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
    <>
      <div>
        <div>
          <img src="auth-img.png" className="w-52 h-52 rounded-full" />
        </div>
        <div>
          <form>
            <div className="flex items-center gap-4">
              <FormInput
                label="First Name"
                type="text"
                {...register("firstName", {
                  required: "First Name is required",
                })}
                error={errors.firstName?.message}
                width="w-96"
              />
              <FormInput
                label="Last Name"
                type="text"
                {...register("lastName", {
                  required: "Last Name is required",
                })}
                error={errors.lastName?.message}
                width="w-96"
              />
            </div>
            <div className="flex items-center gap-4">
              <FormInput
                label="NickName"
                type="text"
                {...register("nickname", {
                  required: "Nick Name is required",
                })}
                error={errors.nickname?.message}
                width="w-96"
              />
              <Controller
                name="Display to Public as"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field, fieldState: { error } }) => (
                  <SelectInput
                    label="Select One Option"
                    options={allOptions}
                    onChange={(option) => {
                      field.onChange(option.value);
                    }}
                    error={error?.message}
                    width="w-96"
                    value={field.value}
                  />
                )}
              />
            </div>
            <div className="flex items-center gap-4">
              <FormInput
                label="Phone Number"
                type="number"
                {...register("phoneNo", {
                  required: "Phone Number is required",
                })}
                error={errors.phoneNo?.message}
                width="w-96"
              />
              <FormInput
                label="Whatsapp Number"
                type="number"
                {...register("whatsappNo", {
                  required: "Whatsapp Number is required",
                })}
                error={errors.whatsappNo?.message}
                width="w-96"
              />
            </div>
            <div className="flex items-center gap-4">
              <TextareaInput
                label="Biography here..."
                width="w-96"
                {...register("biography", {
                  required: "Biography is required",
                  minLength: {
                    value: 10,
                    message: "Content must be at least 50 characters",
                  },
                })}
                error={errors.biography?.message}
                rows={6}
              />
              <TextareaInput
                label="Public Address here..."
                width="w-96"
                {...register("publicAddress", {
                  required: "pPublic Address is required",
                  minLength: {
                    value: 10,
                    message: "Content must be at least 50 characters",
                  },
                })}
                error={errors.publicAddress?.message}
                rows={6}
              />
            </div>
            <div className="flex items-center gap-4">
              <FormInput
                label="Facebook Link"
                type="text"
                {...register("facebook")}
                error={errors.facebook?.message}
                width="w-96"
              />
              <FormInput
                label="Twitter Link"
                type="text"
                {...register("twitter")}
                error={errors.twitter?.message}
                width="w-96"
              />
            </div>
            <div className="flex items-center gap-4">
              <FormInput
                label="Instagram Link"
                type="text"
                {...register("instagram")}
                error={errors.instagram?.message}
                width="w-96"
              />
              <FormInput
                label="Youtube Link"
                type="text"
                {...register("youtube")}
                error={errors.youtube?.message}
                width="w-96"
              />
            </div>
              <button
                type="submit"
                className="bg-[#EB6752] rounded-md text-white py-2 px-6 hover:bg-[#191A1F] transform duration-300 ease-in-out font-semibold shadow-md"
              >
                Update Profile
              </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditDealerProfile;
