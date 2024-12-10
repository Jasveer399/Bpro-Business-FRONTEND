import React, { useState } from "react";
import Navbar from "../../Home/Navbar";
import Header from "../../Home/Header";
import { Controller, useForm } from "react-hook-form";
import FormInput from "../../../../ui/FormInput";
import SelectInput from "../../../../ui/SelectInput";
import { MultiSelect } from "react-multi-select-component";
import { Checkbox } from "@mui/material";
import { TextAreaEditor } from "../../../../ui/TextAreaEditor";
import TextareaInput from "../../../../ui/TextareaInput";
import { ImageUp, Plus, X } from "lucide-react";
import TimeSelectorHour_Minutes from "../../../../ui/TimeSelectorHour_Minutes";
import TimePicker from "../../../../ui/TimePicker";
import ChipsInput from "../../../../Components/Forms/Blogs/ChipsInput";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync } from "../../../../Redux/Features/productSlice";
import Snackbars from "../../../../ui/Snackbars";
import Loader from "../../../../ui/Loader";
import {
  CustomTiming,
  PaymentOptions,
  priceOptions,
  StatusOpstions,
  weekDays,
} from "../../../../Utils/options";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProductLisiting() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      status: "active",
      time: "",
      dayStartTime: "",
      dayEndTime: "",
    },
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const [description, setDescription] = useState("");
  const [imageContainers, setImageContainers] = useState([
    { id: 0, file: null },
  ]);
  const [tags, setTags] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.products);
  const isSubmitting = status === "loading";

  const options = [
    { label: "Hotel & Restaurant", value: "Hotel & Restaurant" },
    { label: "Grocery", value: "Grocery" },
    { label: "Lift & Elevators", value: "Lift & Elevators" },
  ];
  const addProductLisitingHandler = async (formData) => {
    try {
      const formDataToSend = new FormData();

      // Add basic form fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("time", formData.time);

      // Add tags
      tags.forEach((tag, index) => {
        formDataToSend.append(`tags[${index}]`, tag);
      });

      // Add selected categories
      selectedCategories.forEach((category, index) => {
        formDataToSend.append(`categories[${index}]`, category.value);
      });

      // Add timing details
      formDataToSend.append("selectedDay", selectedDay);
      formDataToSend.append("dayStartTime", formData.dayStartTime);
      formDataToSend.append("dayEndTime", formData.dayEndTime);
      formDataToSend.append("customTiming", formData.customTiming);

      // Add pricing details
      // formDataToSend.append("currencySymbol", formData.currencysymbol);
      formDataToSend.append("insertprice", formData.insertprice);
      formDataToSend.append("priceOption", formData.priceOption);

      // Add payment methods
      PaymentOptions.forEach((option) => {
        if (formData[option.value]) {
          formDataToSend.append(`paymentMethods[]`, option.value);
        }
      });

      // Add contact information
      // formDataToSend.append("phone", formData.phone);
      // formDataToSend.append("email", formData.email);
      // formDataToSend.append("url", formData.url);
      // formDataToSend.append("viewOurSite", formData.viewoursite);

      // Add description and summary
      formDataToSend.append("description", description);
      formDataToSend.append("summary", formData.summary);

      // Add images
      imageContainers.forEach((container, index) => {
        if (container.file) {
          formDataToSend.append(`images`, container.file);
        }
      });

      // Add address details
      // formDataToSend.append("country", formData.country);
      // formDataToSend.append("addressLine1", formData.addressline1);
      // formDataToSend.append("addressLine2", formData.addressline2);
      // formDataToSend.append("zipCode", formData.zipcode);
      // formDataToSend.append("additionalInfo", formData.additionalinfo);

      const response = await dispatch(addProductAsync(formDataToSend));
      if (addProductAsync.fulfilled.match(response)) {
        setSnackbar({
          open: true,
          type: "success",
          text: response.payload.message,
        });
        setTimeout(() => navigate(-1), 500);
      } else {
        setSnackbar({
          open: true,
          type: "error",
          text: response.error.message,
        });
        throw new Error(resultAction.error.message);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        type: "error",
        text: error.message,
      });
    }
  };

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      setImageContainers((prev) =>
        prev.map((container) =>
          container.id === id ? { ...container, file } : container
        )
      );
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

  return (
    <>
      <Navbar />
      <div className="mx-3">
        <Header />
      </div>
      <img
        src="header-banner.jpg"
        alt="productLisiting"
        className="w-full h-72 object-cover relative"
      />
      <h1 className="flex flex-col text-3xl sm:text-4xl md:text-6xl font-semibold text-white absolute top-80 sm:top-56 left-4 sm:left-5 md:left-20 gap-2 sm:gap-4">
        Product Lisiting{" "}
        <span className="text-base sm:text-xl">Home | Product Lisiting</span>
      </h1>
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-52 sm:mt-20 pb-10">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8">
          Create New listing
        </h1>
        <form
          className="flex flex-col gap-10"
          onSubmit={handleSubmit(addProductLisitingHandler)}
        >
          <div className="w-full border border-gray-400 dark:border-gray-600 pb-4 sm:pb-6 mt-5 text-neutral-700 flex justify-center items-center flex-col gap-8 ">
            <h1 className="text-xl font-bold border-b border-gray-200 dark:border-gray-600 py-4 px-8 w-full">
              General Details
            </h1>
            <FormInput
              label="Title"
              type="text"
              {...register("title", {
                required: "Title is required",
              })}
              error={errors.title?.message}
              width="w-[90%]"
            />
            <ChipsInput
              value={tags}
              onChange={setTags}
              label="Listing Tags"
              className="w-[90%]"
              maxChips={5}
              error={errors.tags?.message}
            />
            <div className="w-[90%]">
              <label htmlFor="status">Status</label>
              <Controller
                name="status"
                control={control}
                rules={{ required: "status is required" }}
                render={({ field, fieldState: { error } }) => (
                  <SelectInput
                    label="Select Status"
                    options={StatusOpstions}
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
            <h1 className="text-[17px] font-semibold dark:border-gray-600 px-16 w-full flex flex-col gap-4">
              Listing expiration date
              <span className="text-sm text-gray-400">
                Regular users can not change expiration date. This option is
                available only for admins.
                <br /> <br />
                Set new expiration date and time of the listing.
                <br />
                Be careful: If you'll set past date - listing will expire in
                some minutes.
              </span>
            </h1>
            <div className="w-[90%] flex flex-col md:flex-row gap-5">
              <FormInput
                label="Date"
                type="date"
                {...register("date", {
                  required: "Status is required",
                })}
                error={errors.data?.message}
                width="w-[50%]"
              />
              <TimeSelectorHour_Minutes
                onChange={(value) => setValue("time", value)}
                error={errors.time?.message}
              />
            </div>
            <div className="w-[90%] flex flex-col gap-2">
              <h1>Categories</h1>
              <MultiSelect
                options={options}
                value={selectedCategories}
                onChange={setSelectedCategories}
                labelledBy="Categories"
                className="w-full h-15"
              />
            </div>
          </div>
          <div className="w-full border border-gray-400 dark:border-gray-600 pb-4 sm:pb-6 mt-5 text-neutral-700 flex justify-center items-center flex-col gap-8 ">
            <h1 className="text-xl font-bold border-b border-gray-200 dark:border-gray-600 py-4 px-8 w-full">
              Extra Details
            </h1>
            <div className="flex flex-col gap-3 w-[90%]">
              <label className="text-lg">Timeings</label>
              <div className="w-full flex flex-col md:flex-row gap-2">
                {weekDays.map((day, index) => (
                  <div
                    key={index}
                    className={`text-lg border ${
                      selectedDay === Object.values(day)[0]
                        ? "bg-blue text-white"
                        : "border-gray-500"
                    } py-1 px-5 w-32 rounded-lg flex items-center justify-center`}
                    onClick={() => setSelectedDay(Object.values(day)[0])}
                  >
                    {Object.values(day)[0]}
                  </div>
                ))}
              </div>
              <div className="w-full flex flex-col md:flex-row gap-5 items-centers relative">
                <TimePicker
                  label=""
                  onChange={(value) => setValue("dayStartTime", value)}
                  error={errors.time?.message}
                />
                <TimePicker
                  label=""
                  onChange={(value) => setValue("dayEndTime", value)}
                  error={errors.time?.message}
                />
                <Controller
                  name="customTiming"
                  control={control}
                  rules={{ required: "Custom Timing is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <SelectInput
                      label="Custom Timing"
                      options={CustomTiming}
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
            </div>
            <div className="w-[90%] flex flex-col md:flex-row gap-5 items-centers relative mt-10">
              <h1 className="text-lg absolute -top-8">Price</h1>
              {/* <FormInput
                label="Currency Symbol"
                type="text"
                {...register("currencysymbol", {
                  required: "Currency Symbol is required",
                })}
                error={errors.title?.message}
                width="w-[90%]"
              /> */}
              <div className="w-full flex">
                <FaRupeeSign
                  size={50}
                  className="border-2 border-y p-4 border-gray-400 rounded-l-md mt-[1.46rem] text-gray-500"
                />
                <FormInput
                  label="Insert Price"
                  type="number"
                  {...register("insertprice", {
                    required: "Inser Price is required",
                  })}
                  error={errors.title?.message}
                  width="w-[90%]"
                  className="border-l-0 rounded-r rounded-l-none"
                />
              </div>
              <div className="mt-[1.45rem] w-full">
                <Controller
                  name="priceOption"
                  control={control}
                  rules={{ required: "Price Option is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <SelectInput
                      label="Price Option"
                      options={priceOptions}
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
            </div>
            <div className="w-[90%]">
              <label className="text-lg">Payment Options</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mt-5">
                {PaymentOptions.map((option, index) => (
                  <div className="flex gap-5 p-1 items-center border border-gray-400 w-full rounded-lg">
                    <Checkbox
                      label=""
                      type="checkbox"
                      {...register(`${option.value}`)}
                      error={errors.title?.message}
                      width="w-10"
                    />
                    <h1>{option.name}</h1>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[90%]">
              <TextAreaEditor onChange={setDescription} />
            </div>
            <TextareaInput
              label="Summary..."
              width="w-[90%]"
              {...register("summary", {
                required: "Summary is required",
                minLength: {
                  value: 10,
                  message: "Content must be at least 50 characters",
                },
              })}
              error={errors.summary?.message}
              rows={6}
            />
          </div>
          <div className="w-full border border-gray-400 dark:border-gray-600 pb-4 sm:pb-6 mt-5 text-neutral-700 flex justify-center items-center flex-col gap-8 ">
            <h1 className="text-xl font-bold border-b border-gray-200 dark:border-gray-600 py-4 px-8 w-full">
              Media
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[90%]">
              {imageContainers.map((container) => (
                <div key={container.id} className="relative group">
                  <div className="aspect-video rounded-xl shadow-[0_6px_15px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] overflow-hidden">
                    {container.file ? (
                      <div className="relative h-full">
                        <img
                          src={URL.createObjectURL(container.file)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
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
                            .getElementById(`image-upload-${container.id}`)
                            .click()
                        }
                        className="h-full flex flex-col items-center justify-center cursor-pointer bg-gray-50"
                      >
                        <ImageUp className="w-8 h-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Click to upload image
                        </p>
                        <input
                          id={`image-upload-${container.id}`}
                          type="file"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, container.id)}
                          accept="image/*"
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
          {/* <div className="w-full border border-gray-400 dark:border-gray-600 pb-4 sm:pb-6 mt-5 text-neutral-700 flex justify-center items-center flex-col gap-16">
            <h1 className="text-xl font-bold border-b border-gray-200 dark:border-gray-600 py-4 px-8 w-full">
              Address
            </h1>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Custom Timing is required" }}
              render={({ field, fieldState: { error } }) => (
                <SelectInput
                  label="Country"
                  options={stateOptions}
                  onChange={(option) => {
                    field.onChange(option.value);
                    // handlePartyChange(option);
                  }}
                  error={error?.message}
                  width="w-[90%]"
                  value={field.value}
                />
              )}
            />
            <FormInput
              label="Address line 1"
              type="text"
              {...register("addressline1", {
                required: "Address line 1 is required",
              })}
              error={errors.addressline1?.message}
              width="w-[90%]"
            />
            <FormInput
              label="Address line 2"
              type="text"
              {...register("addressline2")}
              error={errors.addressline2?.message}
              width="w-[90%]"
            />
            <FormInput
              label="Zip Code"
              type="text"
              {...register("zipcode", {
                required: "Zip Code is required",
              })}
              error={errors.zipcode?.message}
              width="w-[90%]"
            />
            <TextareaInput
              label="Additional info..."
              width="w-[90%]"
              {...register("additionalinfo", {
                minLength: {
                  value: 0,
                  message: "Content must be at least 20 characters",
                },
              })}
              error={errors.additionalinfo?.message}
              rows={6}
            />
          </div> */}
          <button
            disabled={isSubmitting}
            className="w-32 bg-blue border-2 border-white shadow-2xl hover:shadow-inner px-6 py-3 text-lg font-bold rounded-lg text-white mb-10 flex justify-center items-center"
          >
            {isSubmitting ? <Loader /> : "Submit"}
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

export default ProductLisiting;
