import React, { useEffect, useState } from "react";
import FormInput from "../../../../ui/FormInput";
import { Controller, useForm } from "react-hook-form";
import SelectInput from "../../../../ui/SelectInput";
import TextareaInput from "../../../../ui/TextareaInput";
import { useDispatch, useSelector } from "react-redux";
import {
  changePasswordAsync,
  fetchCurrentDealerAsync,
  sendRequestAsync,
  updateDealerAsync,
  updateProfileImgAsync,
} from "../../../../Redux/Features/dealersSlice";
import Snackbars from "../../../../ui/Snackbars";
import { businessTypesOptions } from "../../../../Utils/options";
import ProfileImage from "./ProfileImage";

function EditDealerProfile() {
  // const {
  //   editProfileForm.register,
  //   formState: { editProfileForm.formState.errors },
  //   control,
  //   setValue,
  //   handleSubmit,
  //   reset,
  //   getValues,
  // } = useForm();

  // Separate useForm hooks for edit profile and change password
  const editProfileForm = useForm();
  const changePasswordForm = useForm();

  const dispatch = useDispatch();
  const { currentDealer, status } = useSelector((state) => state.dealers);
  const [displayToPublicOptions, setDisplayToPublicOptions] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  console.log("currentDealer", currentDealer);

  const handleImageUpload = async (file) => {
    console.log("file", file);
    const formData = new FormData();
    formData.append("profileImgUrl", file);
    const response = await dispatch(updateProfileImgAsync(formData));
    console.log("response", response);
    if (updateProfileImgAsync.fulfilled.match(response)) {
      setSnackbar({
        open: true,
        type: "success",
        text: "Profile Image Updated Successfully",
      });
    } else {
      setSnackbar({
        open: true,
        type: "error",
        text: response.error.message,
      });
    }
    setProfileImageUrl(URL.createObjectURL(file));
  };

  const handleImageRemove = () => {
    // Remove the image from the server and reset the profileImageUrl state
    setProfileImageUrl(null);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCurrentDealerAsync());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (currentDealer) {
      console.log("Current dealer: ", currentDealer);
      editProfileForm.setValue("fullName", currentDealer.fullName);
      editProfileForm.setValue("email", currentDealer.email);
      editProfileForm.setValue("mobileNo", currentDealer.mobileNo);
      editProfileForm.setValue("whatsappNo", currentDealer.whatsappNo);
      editProfileForm.setValue("businessName", currentDealer.businessName);
      editProfileForm.setValue("businessType", currentDealer.businessType);
      editProfileForm.setValue("bio", currentDealer.bio);
      editProfileForm.setValue("streetNo", currentDealer.streetNo);
      editProfileForm.setValue("areaName", currentDealer.areaName);
      editProfileForm.setValue("city", currentDealer.city);
      editProfileForm.setValue("pincode", currentDealer.pincode);
      editProfileForm.setValue("state", currentDealer.state);
      editProfileForm.setValue("country", currentDealer.country);
      editProfileForm.setValue("gstNo", currentDealer.gstNo);
      editProfileForm.setValue("vatNo", currentDealer.vatNo);
      editProfileForm.setValue("website", currentDealer.website);
      editProfileForm.setValue("facebook", currentDealer.facebook);
      editProfileForm.setValue("insta", currentDealer.insta);
      editProfileForm.setValue("youtube", currentDealer.youtube);
      setProfileImageUrl(currentDealer.profileUrl);
    }
  }, [currentDealer]);

  const editProfileHandler = async (data) => {
    console.log("data: ", data);
    try {
      const response = await dispatch(updateDealerAsync(data)).unwrap();
      console.log("Profile Edited Successfully", response);
      if (response.success) {
        setSnackbar({
          open: true,
          type: "success",
          text: response.message,
        });
      }
    } catch (error) {
      console.error("Failed to edit profile:", error);
      setSnackbar({
        open: true,
        type: "error",
        text: error.message,
      });
    }
  };

  const changePasswordHandler = async (data) => {
    const currentPassword = changePasswordForm.getValues("currentPassword");
    const newPassword = changePasswordForm.getValues("newPassword");

    if (currentPassword === newPassword) {
      setSnackbar({
        open: true,
        type: "error",
        text: "New Password cannot be same as Current Password",
      });
      return;
    }

    try {
      const response = await dispatch(changePasswordAsync(data)).unwrap();
      console.log("response", response);
      if (response.success) {
        setSnackbar({
          open: true,
          type: "success",
          text: response.message,
        });
        setValue("currentPassword", "");
        setValue("newPassword", "");
      }
    } catch (error) {
      console.error("Failed to change password:", error);
      setSnackbar({
        open: true,
        type: "error",
        text: error.message,
      });
    }
  };

  const handleRequestSend = async () => {
    console.log("handleRequestSend");
    try {
      const res = await dispatch(sendRequestAsync()).unwrap();
      if (res.success) {
        setSnackbar({
          open: true,
          type: "success",
          text: res.message,
        });
      }
    } catch (error) {
      console.log("error", error);
      setSnackbar({
        open: true,
        type: "error",
        text: error?.message || "Error sending request",
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        {/* Left Section: Image and Account Settings */}
        <div className="w-full md:w-1/3 h-full bg-white p-6 flex flex-col items-center">
          <div>
            <ProfileImage
              imageUrl={profileImageUrl}
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
              status={status}
            />
          </div>

          <div className="w-full my-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              Change Password
            </h1>

            <form
              onSubmit={changePasswordForm.handleSubmit(changePasswordHandler)}
            >
              <FormInput
                label="Current Password"
                type="password"
                {...changePasswordForm.register("currentPassword", {
                  required: "Current Password is required",
                })}
                error={
                  changePasswordForm.formState.errors.currentPassword?.message
                }
                width="w-full"
              />
              <div className="mt-3">
                <FormInput
                  label="New Password"
                  type="password"
                  {...changePasswordForm.register("newPassword", {
                    required: "New Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  error={
                    changePasswordForm.formState.errors.newPassword?.message
                  }
                  width="w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-[#EB6752] w-full py-2 mt-4 rounded-md text-white font-semibold hover:bg-[#191A1F] transition-colors duration-300"
              >
                Change Password
              </button>
            </form>
          </div>

          {/* Close Your Account */}
          <div className="w-full mt-5">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              Close Your Account
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              Deleting your account will remove all your data permanently. This
              action cannot be undone.
            </p>
            <button
              type="button"
              className="bg-[#EB6752] w-full py-2 mt-4 rounded-md text-white font-semibold hover:bg-[#191A1F] transition-colors duration-300"
            >
              Close Your Account
            </button>
          </div>
        </div>

        {/* Right Section: Form */}
        <div className="md:w-2/3 w-full mt-32 md:mt-0 bg-white p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Edit Profile
          </h1>
          <form onSubmit={editProfileForm.handleSubmit(editProfileHandler)}>
            {/* Row 1: First Name & Last Name */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-3">
              <FormInput
                label="Full Name"
                type="text"
                {...editProfileForm.register("fullName", {
                  required: "Full Name is required",
                })}
                error={editProfileForm.formState.errors.fullName?.message}
                width="w-full"
                readOnly={!currentDealer?.isProfileUpdate}
              />
              <FormInput
                label="Email"
                type="email"
                {...editProfileForm.register("email", {
                  required: "Email is required",
                })}
                error={editProfileForm.formState.errors.email?.message}
                width="w-full"
                readOnly={!currentDealer?.isProfileUpdate}
              />
            </div>

            {/* Row 3: Phone & WhatsApp */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-3">
              <FormInput
                label="Mobile Number"
                type="number"
                {...editProfileForm.register("mobileNo", {
                  required: "Mobile Number is required",
                })}
                error={editProfileForm.formState.errors.mobileNo?.message}
                width="w-full"
                readOnly={true}
              />
              <FormInput
                label="WhatsApp Number"
                type="number"
                {...editProfileForm.register("whatsappNo", {
                  required: "WhatsApp Number is required",
                })}
                error={editProfileForm.formState.errors.whatsappNo?.message}
                width="w-full"
                readOnly={!currentDealer?.isProfileUpdate}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 mb-3">
              <FormInput
                label="Business Name"
                type="text"
                {...editProfileForm.register("businessName", {
                  required: "Business Name is required",
                })}
                error={editProfileForm.formState.errors.businessName?.message}
                width="w-full"
                readOnly={true}
              />
              <div className="w-full">
                <h1 className="text-[15px] ml-1 mb-px text-gray-600">
                  Business Type
                </h1>
                <Controller
                  name="businessType"
                  control={editProfileForm.control}
                  rules={{ required: "Category is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <SelectInput
                      label="Select One Option"
                      options={businessTypesOptions}
                      onChange={(option) => field.onChange(option.value)}
                      error={error?.message}
                      width="w-full"
                      value={field.value}
                      readOnly={true}
                    />
                  )}
                />
              </div>
            </div>

            {/* Row 4: Biography & Public Address */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-3 w-full">
              <div className="md:w-[50%] w-full">
                <h1 className="text-[15px] ml-1 mb-px text-gray-600">Bio</h1>
                <TextareaInput
                  label="Biography here..."
                  {...editProfileForm.register("bio", {
                    required: "Biography is required",
                    minLength: {
                      value: 10,
                      message: "Content must be at least 50 characters",
                    },
                  })}
                  error={editProfileForm.formState.errors.bio?.message}
                  rows={5}
                  width="w-full"
                  readOnly={!currentDealer?.isProfileUpdate}
                />
              </div>
              <div className="md:w-[50%] w-full">
                <FormInput
                  label="Street No / Office"
                  type="text"
                  {...editProfileForm.register("streetNo", {
                    required: "Street No. is required",
                  })}
                  error={editProfileForm.formState.errors.streetNo?.message}
                  width="w-full"
                  readOnly={!currentDealer?.isProfileUpdate}
                />
                <div className="w-full mt-3">
                  <FormInput
                    label="Area Name / Landmark"
                    type="text"
                    {...editProfileForm.register("areaName", {
                      required: "Area Name / Landmark is required",
                    })}
                    error={editProfileForm.formState.errors.areaName?.message}
                    width="w-full"
                    readOnly={!currentDealer?.isProfileUpdate}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 mb-3">
              <FormInput
                label="City"
                type="text"
                {...editProfileForm.register("city", {
                  required: "City is required",
                })}
                error={editProfileForm.formState.errors.city?.message}
                width="w-full"
                readOnly={!currentDealer?.isProfileUpdate}
              />
              <FormInput
                label="Pincode"
                type="number"
                {...editProfileForm.register("pincode", {
                  required: "Pincode is required",
                })}
                error={editProfileForm.formState.errors.pincode?.message}
                width="w-full"
                readOnly={!currentDealer?.isProfileUpdate}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 mb-3">
              <FormInput
                label="State"
                type="text"
                {...editProfileForm.register("state", {
                  required: "State is required",
                })}
                error={editProfileForm.formState.errors.state?.message}
                width="w-full"
                readOnly={!currentDealer?.isProfileUpdate}
              />
              <FormInput
                label="Country"
                type="text"
                {...editProfileForm.register("country", {
                  required: "Country is required",
                })}
                error={editProfileForm.formState.errors.country?.message}
                width="w-full"
                readOnly={!currentDealer?.isProfileUpdate}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 mb-3">
              <FormInput
                label="GST No."
                type="text"
                {...editProfileForm.register("gstNo", {
                  required: "GST No. is required",
                })}
                error={editProfileForm.formState.errors.gstNo?.message}
                width="w-full"
                readOnly={true}
              />
              <FormInput
                label="VAT No."
                type="text"
                {...editProfileForm.register("vatNo", {
                  required: "VAT No. is required",
                })}
                error={editProfileForm.formState.errors.vatNo?.message}
                width="w-full"
                readOnly={!currentDealer?.isProfileUpdate}
              />
            </div>

            {/* Row 5: Social Media Links */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-3">
              <FormInput
                label="Website (Optional)"
                type="text"
                {...editProfileForm.register("website")}
                error={editProfileForm.formState.errors.website?.message}
                width="w-full"
                readOnly={!currentDealer?.isProfileUpdate}
              />
              <FormInput
                label="Facebook (Optional)"
                type="text"
                {...editProfileForm.register("facebook")}
                error={editProfileForm.formState.errors.facebook?.message}
                width="w-full"
                readOnly={!currentDealer?.isProfileUpdate}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <FormInput
                label="Instagram (Optional)"
                type="text"
                {...editProfileForm.register("insta")}
                error={editProfileForm.formState.errors.instagram?.message}
                width="w-full"
                readOnly={!currentDealer?.isProfileUpdate}
              />
              <FormInput
                label="YouTube (Optional)"
                type="text"
                {...editProfileForm.register("youtube")}
                error={editProfileForm.formState.errors.youtube?.message}
                width="w-full"
                readOnly={!currentDealer?.isProfileUpdate}
              />
            </div>

            {currentDealer?.isReqSent ? (
              <button
                type="button"
                className="bg-[#EB6752] w-full py-3 mb-5 rounded-md text-white font-semibold hover:bg-[#191A1F] transition-colors duration-300 cursor-not-allowed"
                disabled={true}
              >
                Request Sent. Wait For Approval !!
              </button>
            ) : currentDealer?.isProfileUpdate ? (
              <button
                type="submit"
                className="bg-[#EB6752] w-full py-3 mb-5 rounded-md text-white font-semibold hover:bg-[#191A1F] transition-colors duration-300"
              >
                Update Profile
              </button>
            ) : (
              <div
                className="bg-[#EB6752] w-full py-3 mb-5 rounded-md text-white text-center font-semibold hover:bg-[#191A1F] transition-colors duration-300"
                onClick={handleRequestSend}
              >
                Request Profile Update
              </div>
            )}
          </form>
        </div>
      </div>
      <Snackbars
        open={snackbar.open}
        type={snackbar.type}
        text={snackbar.text}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
}

export default EditDealerProfile;
