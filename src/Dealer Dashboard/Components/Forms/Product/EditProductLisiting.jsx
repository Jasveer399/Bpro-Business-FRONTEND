import React, { useEffect, useState } from "react";
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
import {
  addProductAsync,
  editProductAsync,
  fetchProductsAsync,
  setProduct,
} from "../../../../Redux/Features/productSlice";
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
import { useNavigate, useParams } from "react-router-dom";

function EditProductLisiting() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      status: "active",
      time: "",
      dayStartTime: "",
      dayEndTime: "",
    },
  });
  const id = useParams().id;
  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.products);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const [description, setDescription] = useState("");
  const [imageContainers, setImageContainers] = useState([
    { id: 0, file: null },
  ]);
  const [tags, setTags] = useState([]);
  const [notification, setNotification] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const navigate = useNavigate();
  const [deletedImages, setDeletedImages] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const isSubmitting = status === "loading";

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsAsync());
    }
  });

  useEffect(() => {
    dispatch(setProduct(id));
  }, [status, dispatch]);

  useEffect(() => {
    if (product) {
      // Set form values
      setValue("title", product.title);
      setValue("status", product.status);
      setValue(
        "date",
        product.expiryDate
          ? new Date(product.expiryDate).toISOString().split("T")[0]
          : ""
      );
      if (product.expiryDate) {
        const expiryDate = new Date(product.expiryDate);
        const hours = expiryDate.getHours().toString().padStart(2, "0");
        const minutes = expiryDate.getMinutes().toString().padStart(2, "0");
        const formattedTime = `${hours}:${minutes}`;

        setValue("time", formattedTime);
      }
      setValue("summary", product.summary);
      setValue("insertprice", product.insertPrice);
      setValue("priceOption", product.priceOption);
      setValue("dayStartTime", product.dayStartTime);
      setValue("dayEndTime", product.dayEndTime);
      setValue("customTiming", product.customTiming);
      setTags(product.tags);
      // Set categories
      if (product.categories) {
        const selectedCats = product.categories.map((cat) => ({
          label: cat,
          value: cat,
        }));
        setSelectedCategories(selectedCats);
      }

      // Set selected day
      if (product.selectedDay) {
        setSelectedDay(product.selectedDay);
      }

      // Set description
      setDescription(product.description);

      // Set payment methods
      if (product && product.paymentMethods) {
        // Directly set the payment methods from the product
        setPaymentMethods(
          product.paymentMethods.map((method) => method.toLowerCase())
        );
      }
      // Set images
      if (product.images && product.images.length > 0) {
        const imageContainers = product.images.map((image, index) => ({
          id: index,
          file: null,
          existingImage: image,
        }));
        setImageContainers(imageContainers);
      }
    }
  }, [product, setValue]);

  const PaymentOptionsWithChecked = PaymentOptions.map((option) => ({
    ...option,
    isChecked: product?.paymentMethods?.some(
      (method) =>
        method.toLowerCase() === option.value.toLowerCase() ||
        method.toLowerCase() === option.name.toLowerCase()
    ),
  }));

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
      formDataToSend.append("paymentMethods", JSON.stringify(paymentMethods));

      // Add description and summary
      formDataToSend.append("description", description);
      formDataToSend.append("summary", formData.summary);

      // Add images
      imageContainers.forEach((container, index) => {
        if (container.file) {
          formDataToSend.append(`images`, container.file);
        } else if (container.existingImage) {
          formDataToSend.append(
            `existingImages[${index}]`,
            container.existingImage
          );
        }
      });
      if (deletedImages.length > 0) {
        deletedImages.forEach((image) => {
          formDataToSend.append(`deletedImages[]`, image);
        });
      }
      const response = await dispatch(
        editProductAsync({ productId: id, productData: formDataToSend })
      );
      if (editProductAsync.fulfilled.match(response)) {
        setSnackbar({
          open: true,
          type: "success",
          text: response.payload.message,
        });
        setTimeout(() => {
          navigate(-1);
        }, 500);
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

  const removeImage = (id, existingImage) => {
    setImageContainers((prev) => {
      const newContainers = prev.filter((container) => container.id !== id);
      return newContainers.length === 0
        ? [{ id: 0, file: null }]
        : newContainers;
    });
    if (existingImage) {
      setDeletedImages((prev) => [...prev, existingImage.split("uploads/")[1]]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-3">
        <Header />
      </div>
      <img
        src="/header-banner.jpg"
        alt="productLisiting"
        className="w-full h-72 object-cover relative"
      />
      <h1 className="flex flex-col md:text-6xl text-4xl font-semibold text-white absolute top-56 md:left-20 left-5 gap-4">
        Edit Product Lisiting{" "}
        <span className="text-xl">Home | Edit Product Lisiting</span>
      </h1>
      <div className="mx-52 mt-20">
        <h1 className="text-4xl font-bold text-center">Edit listing</h1>
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
            <div className="w-[90%] flex gap-5">
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
                value={
                  product?.expiryDate
                    ? `${new Date(product.expiryDate)
                        .getHours()
                        .toString()
                        .padStart(2, "0")}:${new Date(product.expiryDate)
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}`
                    : "00:00"
                }
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
              <div className="w-full flex gap-2">
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
              <div className="w-full flex gap-5 items-centers relative">
                <TimePicker
                  label=""
                  value={getValues("dayStartTime")}
                  onChange={(value) => setValue("dayStartTime", value)}
                  error={errors.time?.message}
                />
                <TimePicker
                  label=""
                  value={getValues("dayEndTime")}
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
            <div className="w-[90%] flex gap-5 items-centers relative mt-10">
              <h1 className="text-lg absolute -top-8">Price</h1>
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
              <div className="grid grid-cols-3 gap-5 w-full mt-5">
                {PaymentOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex gap-5 p-1 items-center border border-gray-400 w-full rounded-lg"
                  >
                    <Checkbox
                      checked={
                        paymentMethods.includes(option.value.toLowerCase()) ||
                        paymentMethods.includes(option.name.toLowerCase())
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPaymentMethods((prev) => [...prev, option.value]);
                        } else {
                          setPaymentMethods((prev) =>
                            prev.filter(
                              (method) =>
                                method !== option.value &&
                                method !== option.name
                            )
                          );
                        }
                      }}
                      color="primary"
                    />
                    <h1>{option.name}</h1>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[90%]">
              <TextAreaEditor
                onContentChange={(description) =>
                  setValue("description", description)
                }
              />
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
                    ) : container.existingImage ? (
                      <div className="relative h-full">
                        <img
                          src={container.existingImage}
                          alt="Existing"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeImage(container.id, container.existingImage)
                          }
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
          <button
            disabled={isSubmitting}
            className="w-32 bg-blue border-2 border-white shadow-2xl hover:shadow-inner px-6 py-3 text-lg font-bold rounded-lg text-white mb-10"
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

export default EditProductLisiting;
