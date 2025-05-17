import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Home/Navbar";
import Header from "../../Components/Home/Header";
import { Controller, useForm } from "react-hook-form";
import FormInput from "../../../ui/FormInput";
import { ImageUp, Plus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Snackbars from "../../../ui/Snackbars";
import Loader from "../../../ui/Loader";
import SelectInput from "../../../ui/SelectInput";
import { businessTypesOptions, stateOptions } from "../../../Utils/options";
import { updateDealerAsync } from "../../../Redux/Features/dealersSlice";
import { useNavigate } from "react-router-dom";
import { fetchCategoriesAsync } from "../../../Redux/Features/categoriesSlice";
import { MultiSelect } from "react-multi-select-component";

function EditProfile() {
  const navigate = useNavigate();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      status: "active",
      time: "",
      dayStartTime: "",
      dayEndTime: "",
      locations: [],
    },
  });
  const dispatch = useDispatch();
  const { status: dealerStatus, updateStatus } = useSelector(
    (state) => state.dealers
  );
  const { categories, status: categoryStatus } = useSelector(
    (state) => state.categories
  );

  const allCategories = categories?.map((cat) => {
    return { value: cat.id, label: cat.title };
  });

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchCategoriesAsync());
    }
  }, [dispatch, categoryStatus]);

  if (sessionStorage.getItem("email") && sessionStorage.getItem("mobileNo")) {
    setValue("email", sessionStorage.getItem("email"));
    setValue("mobileNo", sessionStorage.getItem("mobileNo"));
  }

  // Updated imageContainers for business documents
  const [imageContainers, setImageContainers] = useState([
    { id: "businessDocs", file: null },
  ]);

  // Validate file type including PDF
  const isValidFileType = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    return validTypes.includes(file.type);
  };

  // Initialize image containers specifically for Aadhaar card
  const [aadharImageContainers, setAadharImageContainers] = useState([
    { id: "front", file: null },
    { id: "back", file: null },
  ]);
  const [panImageContainers, setPanImageContainers] = useState([
    { id: "panfront", file: null },
    { id: "panback", file: null },
  ]);
  const [tags, setTags] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });

  const { status, error } = useSelector((state) => state.products);
  const isSubmitting = status === "loading";

  const editProfileHandler = async (formData) => {
    console.log("formData: ", formData);
    if (formData.locations.length > sessionStorage.getItem("locationCount")) {
      setSnackbar({
        open: true,
        type: "error",
        text:
          "You cannot add locations more than " +
          sessionStorage.getItem("locations"),
      });
      return;
    }
    try {
      const formDataToSend = new FormData();

      // Add Business Details
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("mobileNo", formData.mobileNo);
      formDataToSend.append("businessName", formData.businessName);
      formDataToSend.append("website", formData.website);

      formDataToSend.append("businessType", formData.businessType);

      // Add tax info
      formDataToSend.append("gstNo", formData.gstNo);
      formDataToSend.append("vatNo", formData.vatNo);

      // Business Address
      formDataToSend.append("streetNo", formData.streetNo);
      formDataToSend.append("areaName", formData.areaName);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("state", formData.state);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("pincode", formData.pincode);

      // console.log("imagesContainers", imageContainers);

      // Format and add locations
      if (formData.locations && Array.isArray(formData.locations)) {
        // Extract just the values from the location objects and create a simple array
        const locationValues = formData.locations.map(
          (location) => location.value
        );

        // Convert array to JSON string for FormData
        formDataToSend.append("locations", JSON.stringify(locationValues));
      }

      // Add images
      imageContainers.forEach((container, index) => {
        if (container.file) {
          formDataToSend.append(`docUrl`, container.file);
        }
      });

      // Add Aadhaar card images
      const adhaarFrontContainer = aadharImageContainers.find(
        (container) => container.id === "front"
      );
      const adhaarBackContainer = aadharImageContainers.find(
        (container) => container.id === "back"
      );

      if (!adhaarFrontContainer.file || !adhaarBackContainer.file) {
        console.log("working...");
        setSnackbar({
          open: true,
          type: "error",
          text: "Aadhaar Card images are required",
        });
        return;
      }

      const panFrontContainer = panImageContainers.find(
        (container) => container.id === "panfront"
      );
      const panBackContainer = panImageContainers.find(
        (container) => container.id === "panback"
      );

      if (adhaarFrontContainer?.file) {
        formDataToSend.append("adhaarFrontUrl", adhaarFrontContainer.file);
      }

      if (adhaarBackContainer?.file) {
        formDataToSend.append("adhaarBackUrl", adhaarBackContainer.file);
      }

      if (panFrontContainer?.file) {
        formDataToSend.append("panFrontUrl", panFrontContainer.file);
      }

      if (panBackContainer?.file) {
        formDataToSend.append("panBackUrl", panBackContainer.file);
      }

      formDataToSend.append("newUser", true);

      formDataToSend.append("categoryId", formData.categoryId);

      const response = await dispatch(updateDealerAsync(formDataToSend));
      if (updateDealerAsync.fulfilled.match(response)) {
        setSnackbar({
          open: true,
          type: "success",
          text: "Profile Updated Successfully !!",
        });
        sessionStorage.clear();
        // if (location?.state?.data?.email) {
        setTimeout(() => {
          navigate("/thankyou", { replace: true });
        }, 500);
        // }
        reset(); // Reset form
        setTags([]); // Reset tags
        setImageContainers([{ id: 0, file: null }]); // Reset images
        setAadharImageContainers([
          { id: "front", file: null },
          { id: "back", file: null },
        ]); // Reset images
        setPanImageContainers([
          { id: "panfront", file: null },
          { id: "panback", file: null },
        ]); // Reset images
      } else {
        setSnackbar({
          open: true,
          type: "error",
          text: response.error.message,
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        type: "error",
        text: error.message,
      });
    }
  };

  const handleAdharImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      setAadharImageContainers((prev) =>
        prev.map((container) =>
          container.id === id ? { ...container, file } : container
        )
      );
    }
  };

  const handlePanImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      setPanImageContainers((prev) =>
        prev.map((container) =>
          container.id === id ? { ...container, file } : container
        )
      );
    }
  };

  const handleBusinessDocUpload = (e, containerId) => {
    const file = e.target.files[0];
    // console.log("Uploading file:", file);

    if (file && isValidFileType(file)) {
      setImageContainers((prev) =>
        prev.map((container) =>
          container.id === containerId
            ? { ...container, file: file }
            : container
        )
      );
      // console.log("File uploaded successfully:", {
      //   id: containerId,
      //   type: file.type,
      //   name: file.name,
      // });
    } else {
      alert("Please upload a valid file (JPG, PNG, GIF, or PDF)");
    }
  };

  const addMoreImages = () => {
    if (imageContainers.length < 6) {
      setImageContainers((prev) => [...prev, { id: prev.length, file: null }]);
    }
  };

  const removeImage = (id) => {
    setImageContainers((prev) => {
      const newContainers = prev.filter((container) => container.id !== id);
      return newContainers.length === 0
        ? [{ id: 0, file: null }]
        : newContainers;
    });
  };

  // Add remove handlers for Aadhar and Pan
  const removeAadharImage = (id) => {
    setAadharImageContainers((prev) => {
      const updatedContainers = prev.map((container) =>
        container.id === id ? { ...container, file: null } : container
      );
      // console.log("Removed Aadhar image:", id);
      return updatedContainers;
    });
  };

  const removePanImage = (id) => {
    setPanImageContainers((prev) => {
      const updatedContainers = prev.map((container) =>
        container.id === id ? { ...container, file: null } : container
      );
      // console.log("Removed Pan image:", id);
      return updatedContainers;
    });
  };

  // Add PDF preview component
  const FilePreview = ({ file }) => {
    if (!file) return null;

    if (file.type === "application/pdf") {
      return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 rounded-lg p-4">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-600 truncate max-w-full">
            {file.name}
          </p>
        </div>
      );
    }

    return (
      <img
        src={URL.createObjectURL(file)}
        alt="Preview"
        className="w-full h-full object-cover"
      />
    );
  };

  return (
    <>
      <Navbar />
      <div className="mx-3">
        <Header />
      </div>
      <div className="bg-[#2E3192] flex justify-center items-center w-full h-60">
        <h1 className=" md:text-6xl text-4xl font-semibold text-white">
          Sign Up
        </h1>
      </div>

      <div className="mx-52 mt-10">
        <h1 className="text-4xl font-bold text-left">
          Fill Some Business Details
        </h1>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(editProfileHandler)}
        >
          <div className="w-full pb-4 sm:pb-6 mt-5 text-lg font-medium flex justify-center items-center flex-col gap-8 ">
            <div className="w-[100%] grid grid-cols-3 gap-4">
              <FormInput
                label={
                  <span className="text-[#2E3192]">
                    Your Name<span className="text-red-500">*</span>
                  </span>
                }
                className="border border-[#BFBCFF]"
                placeholder="Enter your name"
                type="text"
                {...register("fullName", {
                  required: "Name is required",
                })}
                error={errors.fullName?.message}
                width=""
              />
              <FormInput
                label={
                  <span className="text-[#2E3192]">
                    Your Email<span className="text-red-500">*</span>
                  </span>
                }
                placeholder="Enter your email"
                className="border border-[#BFBCFF]"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                error={errors.email?.message}
                width=""
              />
              <FormInput
                label={
                  <span className="text-[#2E3192]">
                    Your Phone<span className="text-red-500">*</span>
                  </span>
                }
                placeholder="Enter your phone"
                className="border border-[#BFBCFF]"
                type="text"
                {...register("mobileNo", {
                  required: "Phone is required",
                })}
                error={errors.mobileNo?.message}
                width=""
              />
              <FormInput
                label={
                  <span className="text-[#2E3192]">
                    Business Name<span className="text-red-500">*</span>
                  </span>
                }
                placeholder="Enter your business name"
                className="border border-[#BFBCFF]"
                type="text"
                {...register("businessName", {
                  required: "Business Name is required",
                })}
                error={errors.businessName?.message}
                width=""
              />
              <FormInput
                label={<span className="text-[#2E3192]">Website</span>}
                placeholder="Enter your website"
                className="border border-[#BFBCFF]"
                type="text"
                {...register("website")}
                width=""
              />
              <div>
                <span className="text-[#2E3192] text-sm">
                  Business Type<span className="text-red-500">*</span>
                </span>

                <Controller
                  name="businessType"
                  control={control}
                  rules={{ required: "Select One Business Type" }}
                  render={({ field, fieldState: { error } }) => (
                    <SelectInput
                      options={businessTypesOptions}
                      onChange={(option) => {
                        field.onChange(option.value);
                      }}
                      error={error?.message}
                      width="w-full"
                      value={field.value}
                    />
                  )}
                />
              </div>

              <div>
                <span className="text-[#2E3192] text-sm">
                  Category<span className="text-red-500">*</span>
                </span>

                <Controller
                  name="categoryId"
                  control={control}
                  rules={{ required: "Select One Category" }}
                  render={({ field, fieldState: { error } }) => (
                    <SelectInput
                      options={allCategories}
                      onChange={(option) => {
                        field.onChange(option.value);
                      }}
                      error={error?.message}
                      width="w-full"
                      value={field.value}
                    />
                  )}
                />
              </div>
              <div>
                <span className="text-[#2E3192] text-sm">
                  Select Locations<span className="text-red-500">*</span>
                </span>
                <Controller
                  name="locations"
                  control={control}
                  rules={{ required: "Select One Location" }}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <MultiSelect
                        options={stateOptions}
                        value={field.value || []}
                        onChange={field.onChange}
                        labelledBy="Select Location"
                        className="custom-multi-select"
                        hasSelectAll={false}
                      />
                      {error && (
                        <p className="mt-1 text-red-500 text-sm">
                          {error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          {/* TAX INFO */}
          <h1 className="text-4xl font-bold text-left">Tax Info</h1>
          <div className="w-full pb-4 sm:pb-6 mt-5 text-lg font-medium flex justify-center items-center flex-col gap-8 ">
            <div className="w-[100%] grid grid-cols-2 gap-4">
              <FormInput
                label={
                  <span className="text-[#2E3192]">
                    GST No.<span className="text-red-500">*</span>
                  </span>
                }
                className="border border-[#BFBCFF]"
                placeholder="Enter your GST No."
                type="text"
                {...register("gstNo", {
                  required: "GST is required",
                })}
                error={errors.gstNo?.message}
                width=""
              />
              <FormInput
                label={<span className="text-[#2E3192]">Vat No.</span>}
                placeholder="Enter your Vat No."
                className="border border-[#BFBCFF]"
                type="text"
                {...register("vatNo")}
                width=""
              />
            </div>
          </div>

          {/* BUSINESS ADDRESS */}
          <h1 className="text-4xl font-bold text-left">Business Address</h1>
          <div className="w-full pb-4 sm:pb-6 mt-5 text-lg font-medium flex justify-center items-center flex-col gap-8 ">
            <div className="w-[100%] grid grid-cols-2 gap-4">
              <FormInput
                label={
                  <span className="text-[#2E3192]">
                    Street No/ Office<span className="text-red-500">*</span>
                  </span>
                }
                className="border border-[#BFBCFF]"
                placeholder="Enter your Street No/ Office"
                type="text"
                {...register("streetNo", {
                  required: "Street No/ Office is required",
                })}
                error={errors.streetNo?.message}
                width=""
              />
              <FormInput
                label={
                  <span className="text-[#2E3192]">
                    Area Name/ Landmark<span className="text-red-500">*</span>
                  </span>
                }
                placeholder="Enter your Area Name/ Landmark"
                className="border border-[#BFBCFF]"
                type="text"
                {...register("areaName", {
                  required: "Area Name/ Landmark is required",
                })}
                error={errors.areaName?.message}
                width=""
              />
              <FormInput
                label={
                  <span className="text-[#2E3192]">
                    City<span className="text-red-500">*</span>
                  </span>
                }
                placeholder="Enter your city"
                className="border border-[#BFBCFF]"
                type="text"
                {...register("city", {
                  required: "city is required",
                })}
                error={errors.city?.message}
                width=""
              />
              <FormInput
                label={
                  <span className="text-[#2E3192]">
                    State<span className="text-red-500">*</span>
                  </span>
                }
                placeholder="Enter your state"
                className="border border-[#BFBCFF]"
                type="text"
                {...register("state", {
                  required: "state is required",
                })}
                error={errors.state?.message}
                width=""
              />
              <FormInput
                label={
                  <span className="text-[#2E3192]">
                    Country<span className="text-red-500">*</span>
                  </span>
                }
                placeholder="Enter your country"
                className="border border-[#BFBCFF]"
                type="text"
                {...register("country", {
                  required: "country is required",
                })}
                error={errors.country?.message}
                width=""
              />
              <FormInput
                label={
                  <span className="text-[#2E3192]">
                    Pin Code<span className="text-red-500">*</span>
                  </span>
                }
                placeholder="Enter your pincode"
                className="border border-[#BFBCFF]"
                type="tel"
                {...register("pincode", {
                  required: "pincode is required",
                })}
                error={errors.pincode?.message}
                width=""
              />
            </div>
          </div>

          {/*  Add Aadhaar card images */}
          <div className="w-full pb-4 sm:pb-6 mt-5 text-[#2E3192] flex justify-center items-center flex-col gap-8">
            <h1 className="text-xl font-bold w-full">
              Upload Aadhaar Card<span className="text-red-500">*</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-3 rounded-md gap-4 w-[90%] border border-gray-200">
              {aadharImageContainers.map((container) => (
                <div key={container.id} className="relative group">
                  <div className="aspect-video rounded-xl shadow-[0_6px_15px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] overflow-hidden">
                    {container.file ? (
                      <div className="relative h-full">
                        <img
                          src={URL.createObjectURL(container.file)}
                          alt={`Preview ${container.id}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          document
                            .getElementById(
                              `adhar-image-upload-${container.id}`
                            )
                            .click()
                        }
                        className="h-full flex flex-col items-center justify-center cursor-pointer bg-gray-50"
                      >
                        <ImageUp className="w-8 h-8 text-gray-400" />
                        <p className="mt-2 text-lg font-bold text-[#2E3192]">
                          {container.id === "front"
                            ? "Front Upload"
                            : "Back Upload"}
                        </p>
                        <input
                          id={`adhar-image-upload-${container.id}`}
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            handleAdharImageUpload(e, container.id)
                          }
                          accept="image/*"
                        />
                      </div>
                    )}
                  </div>
                  {container.file && (
                    <button
                      onClick={() => removeAadharImage(container.id)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/*  Add Pan card images */}
          <div className="w-full pb-4 sm:pb-6 mt-5 text-[#2E3192] flex justify-center items-center flex-col gap-8">
            <h1 className="text-xl font-bold w-full">Upload PAN Card</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-3 rounded-md gap-4 w-[90%] border border-gray-200">
              {panImageContainers.map((container) => (
                <div key={container.id} className="relative group">
                  <div className="aspect-video rounded-xl shadow-[0_6px_15px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] overflow-hidden">
                    {container.file ? (
                      <div className="relative h-full">
                        <img
                          src={URL.createObjectURL(container.file)}
                          alt={`Preview ${container.id}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          document
                            .getElementById(
                              `adhar-image-upload-${container.id}`
                            )
                            .click()
                        }
                        className="h-full flex flex-col items-center justify-center cursor-pointer bg-gray-50"
                      >
                        <ImageUp className="w-8 h-8 text-gray-400" />
                        <p className="mt-2 text-lg font-bold text-[#2E3192]">
                          {container.id === "panfront"
                            ? "Front Upload"
                            : "Back Upload"}
                        </p>
                        <input
                          id={`adhar-image-upload-${container.id}`}
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            handlePanImageUpload(e, container.id)
                          }
                          accept="image/*"
                        />
                      </div>
                    )}
                  </div>
                  {container.file && (
                    <button
                      onClick={() => removePanImage(container.id)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* BUSINESS DOCUMENTS */}
          <div className="w-full pb-4 sm:pb-6 mt-5 text-[#2E3192] flex justify-center items-center flex-col gap-8 ">
            <h1 className="text-xl font-bold w-full">
              Upload MSME / Business Documents
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-3 rounded-md gap-4 w-[90%] border border-gray-200">
              {imageContainers.map((container) => (
                <div key={container.id} className="relative group">
                  <div className="aspect-video rounded-xl shadow-[0_6px_15px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] overflow-hidden">
                    {container.file ? (
                      <div className="relative h-full">
                        <FilePreview file={container.file} />
                        <button
                          type="button"
                          onClick={() => removeImage(container.id)}
                          className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          document
                            .getElementById(
                              `business-doc-upload-${container.id}`
                            )
                            .click()
                        }
                        className="h-full flex flex-col items-center justify-center cursor-pointer bg-gray-50"
                      >
                        <ImageUp className="w-8 h-8 text-gray-400" />
                        <p className="mt-2 text-lg font-bold text-[#2E3192]">
                          Upload Document
                        </p>
                        <input
                          id={`business-doc-upload-${container.id}`}
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            handleBusinessDocUpload(e, container.id)
                          }
                          accept="image/*,.pdf"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {imageContainers.length < 6 && (
                <button
                  type="button"
                  onClick={addMoreImages}
                  className="aspect-video rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors flex items-center justify-center"
                >
                  <Plus className="w-8 h-8 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center w-[90%]">
            <input
              type="checkbox"
              className="form-checkbox border border-[#2E3192] h-5 w-5 text-blue-500"
            />
            <span className="ml-2 text-[#2E3192] font-bold text-lg">
              All info is correct?
            </span>
          </div>
          <button
            disabled={isSubmitting}
            className="w-72 bg-[#FFB200] border-2 flex items-center justify-center border-white shadow-2xl hover:shadow-inner px-6 py-3 text-lg font-semibold rounded-md text-white mb-10"
          >
            {updateStatus === "loading" ? <Loader /> : "Submit"}
          </button>
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

export default EditProfile;
