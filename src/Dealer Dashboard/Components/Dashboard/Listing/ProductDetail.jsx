import React, { useEffect } from "react";
import Header from "../../Home/Header";
import Navbar from "../../Home/Navbar";
import { Bookmark, ClockIcon, EyeIcon } from "lucide-react";
import FormInput from "../../../../ui/FormInput";
import TextareaInput from "../../../../ui/TextareaInput";
import { useForm } from "react-hook-form";
import { FaCircleCheck, FaLocationDot } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import Ratings from "../../ui/Ratings";
import ReadOnlyRatings from "../../ui/ReadOnlyRatings";
import { AiOutlineTags } from "react-icons/ai";
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { IoIosMailOpen } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAsync } from "../../../../Redux/Features/categoriesSlice";
import Loader from "../../../../ui/Loader";
import {
  fetchProductsAsync,
  setProduct,
} from "../../../../Redux/Features/productSlice";
import { useParams } from "react-router-dom";
import { fetchCurrentDealerAsync } from "../../../../Redux/Features/dealersSlice";
import { current } from "@reduxjs/toolkit";

function ProductDetail() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();

  const { id } = useParams();
  const {
    product,
    status: productStatus,
    error,
  } = useSelector((state) => state.products);

  const { categories, status } = useSelector((state) => state.categories);

  const { currentDealer, status: currentDealerStatus } = useSelector(
    (state) => state.dealers
  );

  useEffect(() => {
    if (currentDealerStatus === "idle") {
      dispatch(fetchCurrentDealerAsync());
    }
  }, [dispatch]);

  useEffect(() => {
    if (currentDealer) {
      console.log("Current dealer: ", currentDealer);
    }
  }, [currentDealer]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsAsync());
    }
  }, []);

  useEffect(() => {
    dispatch(setProduct(id));
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategoriesAsync());
    }
  }, [status, dispatch]);

  const addReviewHandler = (data) => {
    console.log("data", data);
  };
  return (
    <>
      <Navbar />
      <Header />
      <div className="w-full h-full flex my-4 gap-5 font-montserrat">
        <div className="w-[7.5%]"></div>
        <div className="w-[60%] border border-gray-500 rounded-md bg-white p-6">
          <div className="flex gap-2 text-gray-500">
            <h1 className="flex items-center gap-1">
              <ClockIcon size={14} /> {product?.createdAt?.split("T")[0]} |{" "}
            </h1>
            <h1 className="flex items-center gap-1">
              <EyeIcon size={14} /> Views: 75 |{" "}
            </h1>
            <h1 className="flex items-center gap-1">
              <Bookmark size={14} /> Id: {product?.id?.slice(0, 5)}
            </h1>
          </div>
          <h1 className="text-3xl font-semibold mt-1">{product?.title}</h1>
          <div className=" my-6">
            <img src={product?.images[0]} className="rounded-lg" />
          </div>
          <div>
            <h2 className="font-bold text-2xl mb-3">Contact Information</h2>
            <div className="border p-6 rounded-lg border-gray-400">
              <table className="w-full">
                <tr className="text-lg border-b border-gray-400">
                  <th className="w-44 text-left pb-3">Price:</th>
                  <td className="pb-3">
                    {product?.priceOption === "oncall"
                      ? "On Call"
                      : product?.priceOption === "fixed"
                      ? `₹ ${product?.insertPrice.toFixed(2)} (Fixed)`
                      : `₹ ${product?.insertPrice.toFixed(2)} (Negotiable)`}
                  </td>
                </tr>
                <tr className="text-lg border-b border-gray-400">
                  <th className="w-44 text-left pt-5 pb-3">Categories:</th>
                  <td className="pt-5 pb-3">Cleaning</td>
                </tr>
                <tr className="text-lg border-b border-gray-400">
                  <th className="w-44 text-left pt-5 pb-3">Phone:</th>
                  <td className="pt-5 pb-3">{currentDealer?.mobileNo}</td>
                </tr>
                <tr className="text-lg border-b border-gray-400">
                  <th className="w-44 text-left pt-5 pb-3">Address:</th>
                  <td className="pt-5 pb-3">
                    {currentDealer?.streetNo}, {currentDealer?.areaName},{" "}
                    {currentDealer?.city}, {currentDealer?.state},{" "}
                    {currentDealer?.pincode}
                  </td>
                </tr>
                {product?.tags.length > 0 && (
                  <tr className="text-lg border-b border-gray-400">
                    <th className="w-44 text-left pt-5 pb-3">Listing Tags:</th>
                    <td className="pt-5 pb-3">
                      {product?.tags.map((tag) => tag + "  ")}
                    </td>
                  </tr>
                )}
                {currentDealer?.website && (
                  <tr className="text-lg border-b border-gray-400">
                    <th className="w-44 text-left pt-5 pb-3">Website:</th>
                    <td className="pt-5 pb-3">{currentDealer?.website}</td>
                  </tr>
                )}
                {currentDealer?.email && (
                  <tr className="text-lg border-b border-gray-400">
                    <th className="w-44 text-left pt-5 pb-3">Email:</th>
                    <td className="pt-5 pb-3">{currentDealer?.email}</td>
                  </tr>
                )}
              </table>
            </div>
          </div>
          <h2 className="font-bold text-2xl my-5">User Review</h2>
          <div className="border px-6 py-4 rounded-lg border-gray-400">
            <div className="flex items-center gap-4 mb-3">
              <img
                src="/dummy-profile.png"
                className="w-14 h-14 rounded-full"
              />
              <div>
                <h3 className="font-semibold">Name</h3>
                <small>January 25, 2023, 12:56 pm</small>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold mb-2 text-lg">
                Classiads - Classified Ads WordPress Theme
              </h2>
              <ReadOnlyRatings />
            </div>
            <p className="text-justify">
              ClassiAds includes 20+ category templates, making it great for
              those hoping to create specific classified sites. As an admin,
              simply approve seller applications, and they can manage their ads
              in a front-end panel. The default listing type is free, but you
              can elect to charge users to feature their ads in high-traffic
              site areas for increased engagement and visibility.
            </p>
          </div>
          <h2 className="font-bold text-2xl my-5">Post New Review</h2>
          <div className="flex items-center gap-3">
            <p className="font-semibold">
              Your Rating<span className="text-red-500">*</span>
            </p>
            <Ratings />
          </div>
          <form
            onSubmit={handleSubmit(addReviewHandler)}
            className="space-y-3 mt-3"
          >
            <FormInput
              label="Review Title"
              type="text"
              {...register("reviewTitle", {
                required: "Review Title is required",
              })}
              error={errors.reviewTitle?.message}
              width="w-full"
            />
            <div>
              <h1 className="text-[15px] ml-1 mb-px text-gray-600">Review</h1>
              <TextareaInput
                label="Review..."
                width="w-full"
                {...register("review", {
                  required: "Review is required",
                  minLength: {
                    value: 10,
                    message: "Content must be at least 50 characters",
                  },
                })}
                error={errors.review?.message}
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="bg-[#EB6752] rounded-md text-white py-2 px-6 hover:bg-[#191A1F] transform duration-300 ease-in-out font-semibold shadow-md"
            >
              Submit Review
            </button>
          </form>
          <h2 className="font-bold text-2xl my-5">Related Listings</h2>
          <div className="flex gap-4 relative border p-3 rounded-lg border-gray-400">
            <img src="/mumbai.png" className="rounded-lg w-80" />
            <div className="mt-2">
              <small>Service {">"} Cleaning</small>
              <h2 className="font-bold mb-3 text-lg flex items-center gap-2">
                <span>Toilet Cleaning Prod</span>
                <FaCircleCheck className="text-[#73CF42]" />
              </h2>
              <p className="flex items-center gap-1">
                <FaLocationDot size={12} />
                <span>Uttrakhand</span>
              </p>
              <div className="flex items-center gap-2">
                <p className="bg-[#73CF42] px-2 py-px rounded-md inline-block font-semibold mt-2">
                  4.0
                </p>
                <div className="mt-3">
                  <ReadOnlyRatings />
                </div>
              </div>
            </div>
            <div className="absolute top-3 right-3 cursor-pointer">
              <IoBookmarkOutline size={24} className="" />
            </div>
          </div>
        </div>
        <div className="w-[25%]">
          <div className="bg-white border border-gray-400 flex items-center gap-4 px-4 py-6 rounded-lg">
            <AiOutlineTags className="text-5xl" />
            <h1
              className={`${
                product?.priceOption === "oncall" ? "text-5xl" : "text-3xl"
              } font-bold text-[#EB6752]`}
            >
              {product?.priceOption === "oncall"
                ? "On Call"
                : product?.priceOption === "fixed"
                ? `₹ ${product?.insertPrice.toFixed(2)} (Fixed)`
                : `₹ ${product?.insertPrice.toFixed(2)} (Negotiable)`}
            </h1>
          </div>
          <div className="text-center bg-white border border-gray-400 mt-5 rounded-lg px-4 py-6 flex flex-col justify-center items-center">
            <img src="/mumbai.png" className="w-48 h-48 rounded-full" />
            <h1 className="text-xl mt-3 font-bold">
              {currentDealer?.username}
            </h1>
            <p className="text-gray-500 text-sm mb-3">
              Member since {currentDealer?.created_at?.split("T")[0]}
            </p>
            <p className="font-semibold underline cursor-pointer text-[#4C7BE3] mb-3">
              View All Ads
            </p>
            <div className="flex gap-5 my-3">
              {currentDealer?.facebook && (
                <a
                  href={currentDealer?.facebook}
                  target="_blank"
                  className="hover:bg-[#EB6752] p-3 rounded-md cursor-pointer transform duration-100 ease-in-out border border-gray-400 hover:border-[#EB6752]"
                >
                  <FaFacebookF size={20} />
                </a>
              )}
              {currentDealer?.youtube && (
                <a
                  href={currentDealer?.youtube}
                  target="_blank"
                  className="hover:bg-[#EB6752] p-3 rounded-md cursor-pointer transform duration-100 ease-in-out border border-gray-400 hover:border-[#EB6752]"
                >
                  <FaYoutube size={20} />
                </a>
              )}
              {currentDealer?.insta && (
                <a
                  href={currentDealer?.insta}
                  target="_blank"
                  className="hover:bg-[#EB6752] p-3 rounded-md cursor-pointer transform duration-100 ease-in-out border border-gray-400 hover:border-[#EB6752]"
                >
                  <FaInstagram size={20} />
                </a>
              )}
            </div>
            <div className="flex justify-center w-full gap-4 mb-4">
              <button className="w-[50%] border border-gray-400 text-gray-600 font-semibold py-2 rounded-md">
                Send Message
              </button>
              <button className="w-[50%] border border-gray-400 text-gray-600 font-semibold py-2 rounded-md">
                Send Offer
              </button>
            </div>
            {currentDealer?.mobileNo && (
              <div className="flex w-full bg-[#4C7BE3] text-white h-full rounded-lg shadow-md mb-4">
                <div className="w-[20%] bg-[#4171d9] flex items-center justify-center rounded-l-lg">
                  <FaPhoneAlt className="text-3xl " />
                </div>
                <a
                  className="w-[80%] py-2"
                  href={`tel:+91${currentDealer?.mobileNo}`}
                >
                  <small>Click To Show Number</small>
                  <h1 className="font-bold text-2xl">
                    +91 {currentDealer?.mobileNo}
                  </h1>
                </a>
              </div>
            )}
            {currentDealer?.whatsappNo && (
              <div className="flex w-full bg-[#73ce42] text-white h-full rounded-lg shadow-md mb-4">
                <div className="w-[20%] bg-[#64bf33] flex items-center justify-center rounded-l-lg">
                  <FaWhatsapp className="text-3xl " />
                </div>
                <a
                  className="w-[80%] py-2"
                  href={`https://wa.me/+91${currentDealer?.whatsappNo}`}
                >
                  <small>Click To Show Number</small>
                  <h1 className="font-bold text-2xl">
                    +91 {currentDealer?.whatsappNo}
                  </h1>
                </a>
              </div>
            )}
            <a
              className="flex w-full bg-[#ef5d50] text-white h-full rounded-lg shadow-md"
              href={`mailto:${currentDealer?.email}`}
            >
              <div className="w-[20%] bg-[#ce4538] flex items-center justify-center rounded-l-lg">
                <IoIosMailOpen className="text-3xl " />
              </div>
              <div className="w-[80%] py-5">
                <h1 className="font-bold text-2xl">Send Email</h1>
              </div>
            </a>
          </div>
          <div className="bg-white border border-gray-400 gap-4 px-4 py-6 rounded-lg mt-5">
            <h2 className="font-bold text-2xl">CATEGORIES</h2>
            <div>
              {status === "loading" ? (
                <div>
                  <Loader />
                </div>
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <div className="group flex items-center justify-between border-b-2 border-gray-400 py-3 hover:border-[#EB6752] cursor-pointer">
                    <div className="flex items-center gap-5">
                      <img src={category.iconImgUrl} className="w-10 h-10" />
                      <h1 className="text-lg font-bold">{category.title}</h1>
                    </div>
                    <h2 className="font-bold border border-gray-400 flex items-center px-3 rounded-lg py-1 text-gray-600 group-hover:bg-[#EB6752] group-hover:text-white group-hover:border-[#EB6752]">
                      0
                    </h2>
                  </div>
                ))
              ) : (
                <p>No categories found</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-[7.5%]"></div>
      </div>
    </>
  );
}

export default ProductDetail;
