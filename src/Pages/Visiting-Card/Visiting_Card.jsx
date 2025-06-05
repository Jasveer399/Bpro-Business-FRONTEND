import React, { useState } from "react";
import Navbar from "../../Dealer Dashboard/Components/Home/Navbar";
import Header from "../../Dealer Dashboard/Components/Home/Header";
import MultipleImageUpload from "../../Components/Visiting_Card/MultipleImageUpload";
import TextareaInput from "../../ui/TextareaInput";
import { useForm } from "react-hook-form";
import BusinessTime from "../../Components/Visiting_Card/BusinessTime";
import { Image, Video } from "lucide-react";
import ImageInput from "../../ui/ImageInput";
import MultiSelector from "../../ui/MultiSelector";
import Testimonials from "../../Components/Visiting_Card/Testimonials";
import FormInput from "../../ui/FormInput";

function Visiting_Card() {
  const [bannerSection, setBannerSection] = useState("Image");
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    control,
    watch, // Added watch
  } = useForm({
    defaultValues: {
      openingTime: "",
      closingTime: "",
      businessDays: [],
      gallery: null,
    },
  });

  const changeBannerSection = (section) => {
    setBannerSection(section);
  };

  // Form submit handler
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Handle form submission here
  };

  return (
    <>
      <Navbar />
      <div className="mx-3">
        <Header />
      </div>
      <div className="flex flex-col items-center justify-center w-full bg-[#2E3192] h-36">
        <h1 className="text-3xl text-white font-bold">Visiting Card</h1>
        <p className="text-white mt-2">Create your own visiting card</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-36 mt-10 w-full font-montserrat"
      >
        {/* Banner Section AND QR Code Start */}
        <div className="flex w-full">
          <div className="flex flex-col w-full justify-between">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Banner Section
              </h2>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => changeBannerSection("Image")}
                  className={`${
                    bannerSection === "Image"
                      ? "bg-[#2E3192] text-white"
                      : "bg-[#ECEBFF] text-[#2E3192]"
                  } px-6 py-2 rounded-md font-medium`}
                >
                  <Image className="inline w-4 h-4 mr-2" />
                  Image
                </button>
                <button
                  type="button"
                  onClick={() => changeBannerSection("Video")}
                  className={`${
                    bannerSection === "Video"
                      ? "bg-[#2E3192] text-white"
                      : "bg-[#ECEBFF] text-[#2E3192]"
                  } px-6 py-2 rounded-md font-medium`}
                >
                  <Video className="inline w-4 h-4 mr-2" />
                  Video
                </button>
              </div>
            </div>
            <div className="w-[80%] pr-10">
              {bannerSection === "Image" ? (
                <ImageInput
                  register={register}
                  setValue={setValue}
                  name="bannerImage"
                  error={errors.image?.message}
                  label="Banner Image"
                />
              ) : (
                <FormInput
                  label="Banner Video URL"
                  type="text"
                  {...register("video_url", {
                    required: "Video URL is required",
                  })}
                  error={errors.video_url?.message}
                  width="w-full"
                />
              )}
            </div>
          </div>
          <div>
            <div className="bg-black h-48 w-48 mt-28" />
            <button
              type="button"
              className="bg-[#FFB200] text-center font-[500] text-primary px-2 py-1.5 w-48 rounded-[4px] mt-2"
            >
              Download QR
            </button>
          </div>
        </div>
        {/* Banner Section AND QR Code End */}

        <div className="mt-5">
          <h1 className="text-2xl font-bold text-gray-900 py-2">Intro</h1>
          <TextareaInput
            label="Text here..."
            width="w-full"
            {...register("desc", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Content must be at least 10 characters",
              },
            })}
            error={errors.desc?.message}
            rows={6}
          />
        </div>

        {/* Business Time Component */}
        <div className="my-8">
          <BusinessTime
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
          <div className="mt-8">
            <MultiSelector
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
              name="services"
              required={true}
              defaultValue={["Wedding Service"]}
            />
          </div>
        </div>

        <div className="my-8">
          <h1 className="text-2xl font-bold text-gray-900">Our Gallery</h1>
          <MultipleImageUpload
            register={register}
            setValue={setValue}
            watch={watch}
            error={errors.gallery?.message}
            name="galleryImages"
            label="Gallery Images"
            onImagesChange={(images) => {
              console.log("Gallery images updated:", images);
              // You can perform additional actions when images change
            }}
          />
        </div>

        <Testimonials />

        <div className="mb-16">
          <FormInput
            label="Add Copyright Text"
            type="text"
            {...register("copyright", {
              required: "Copyright text is required",
            })}
            error={errors.copyright?.message}
            width="w-full"
          />
        </div>

        <div className="flex gap-3 py-4 mt-4">
          <button
            type="submit"
            className="px-6 py-2 font-[500] bg-secondary text-primary rounded-lg hover:bg-secondary transition-colors"
          >
            Submit
          </button>
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default Visiting_Card;
