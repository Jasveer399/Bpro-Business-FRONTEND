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
import ChipsInput from "../../../../Components/Forms/Blogs/ChipsInput";
import { useDispatch, useSelector } from "react-redux";
import {
  editProductAsync,
  fetchProductsAsync,
  setProduct,
} from "../../../../Redux/Features/productSlice";
import Snackbars from "../../../../ui/Snackbars";
import Loader from "../../../../ui/Loader";
import {
  PaymentOptions,
  priceOptions,
  StatusOpstions,
} from "../../../../Utils/options";
import { FaPercentage, FaRupeeSign } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategoriesAsync } from "../../../../Redux/Features/categoriesSlice";

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
    },
  });

  const id = useParams().id;
  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.products);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [imageContainers, setImageContainers] = useState([
    { id: 0, file: null },
  ]);
  const [tags, setTags] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const navigate = useNavigate();
  const [deletedImages, setDeletedImages] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const {
    status: categoryStatus,
    error: categoryError,
    categories,
  } = useSelector((state) => state.categories);

  const isSubmitting = status === "loading";

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchCategoriesAsync());
    }
    if (categoryStatus === "succeeded") {
      setCategoriesOptions(
        categories.map((category) => ({
          label: category.title,
          value: category.id,
        }))
      );
    }
  }, [dispatch, categoryStatus, categories]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsAsync());
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(setProduct(id));
  }, [status, dispatch, id]);

  useEffect(() => {
    if (product) {
      // Set form values

      console.log("Product Data =>", product);
      setValue("title", product.title);
      setValue("status", product.status);
      setValue("summary", product.summary);
      setValue("insertprice", product.insertPrice);
      setValue("discount", product.discount);
      setValue("priceOption", product.priceOption);
      setTags(product.tags || []);

      // Set categories
      if (product.categories) {
        const selectedCats = product.categories.map((cat) => ({
          label: cat,
          value: cat,
        }));
        setSelectedCategories(selectedCats);
      }

      // Set description
      setDescription(product.description || "");

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

  const editProductHandler = async (formData) => {
    try {
      const formDataToSend = new FormData();

      // Add basic form fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("status", formData.status);

      // Add tags
      tags.forEach((tag, index) => {
        formDataToSend.append(`tags[${index}]`, tag);
      });

      // Add selected categories
      selectedCategories.forEach((category, index) => {
        formDataToSend.append(`categories[${index}]`, category.value);
      });

      // Add pricing details
      formDataToSend.append("insertprice", formData.insertprice);
      formDataToSend.append("discount", formData.discount);
      formDataToSend.append("priceOption", formData.priceOption);

      // Add payment methods
      PaymentOptions.forEach((option) => {
        if (formData[option.value]) {
          formDataToSend.append(
            "paymentMethods",
            JSON.stringify(paymentMethods)
          );
        }
      });

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
        setTimeout(() => navigate(-1), 500);
      } else {
        setSnackbar({
          open: true,
          type: "error",
          text: response.error.message,
        });
        throw new Error(response.error.message);
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
      <h1 className="flex flex-col text-3xl sm:text-4xl md:text-6xl font-semibold text-white absolute top-80 sm:top-56 left-4 sm:left-5 md:left-20 gap-2 sm:gap-4">
        Edit Product Listing{" "}
        <span className="text-base sm:text-xl">
          Home | Edit Product Listing
        </span>
      </h1>
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-52 sm:mt-20 pb-10">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8">
          Edit listing
        </h1>
        <form
          className="flex flex-col gap-10"
          onSubmit={handleSubmit(editProductHandler)}
        >
          <div className="w-full border border-gray-400 dark:border-gray-600 pb-4 sm:pb-6 mt-5 text-neutral-700 flex justify-center items-center flex-col gap-8">
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
                rules={{ required: "Status is required" }}
                render={({ field, fieldState: { error } }) => (
                  <SelectInput
                    label="Select Status"
                    options={StatusOpstions}
                    onChange={(option) => field.onChange(option.value)}
                    error={error?.message}
                    width="w-full"
                    value={field.value}
                  />
                )}
              />
            </div>
            <div className="w-[90%] flex flex-col gap-2">
              <h1>Categories</h1>
              <MultiSelect
                options={categoriesOptions}
                value={selectedCategories}
                onChange={setSelectedCategories}
                labelledBy="Categories"
                className="w-full h-15"
              />
            </div>
          </div>

          <div className="w-full border border-gray-400 dark:border-gray-600 pb-4 sm:pb-6 mt-5 text-neutral-700 flex justify-center items-center flex-col gap-8">
            <h1 className="text-xl font-bold border-b border-gray-200 dark:border-gray-600 py-4 px-8 w-full">
              Extra Details
            </h1>
            <div className="w-[90%] flex flex-col md:flex-row gap-5 items-centers relative mt-10">
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
                    required: "Insert Price is required",
                  })}
                  error={errors.insertprice?.message}
                  width="w-[90%]"
                  className="border-l-0 rounded-r rounded-l-none"
                />
              </div>
              <div className="w-full flex">
                <FaPercentage
                  size={50}
                  className="border-2 border-y p-3.5 border-gray-400 rounded-l-md mt-[1.46rem] text-gray-500"
                />
                <FormInput
                  label="Discount"
                  type="tel"
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    let value = parseInt(e.target.value);
                    if (value > 100) {
                      e.target.value = "100";
                    }
                    if (value < 0) {
                      e.target.value = "0";
                    }
                  }}
                  {...register("discount")}
                  error={errors.discount?.message}
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
                      onChange={(option) => field.onChange(option.value)}
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
                initialContent={description}
                onContentChange={(newDescription) =>
                  setDescription(newDescription)
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
