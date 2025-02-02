import React, { useEffect } from "react";
import AllBanners from "../../Components/Banner/AllBanners";
import Dialog from "../../ui/Dialog";
import AddBannerForm from "../../Components/Forms/Banner/AddBannerForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBannerCategoryAsync,
  setCurrentBannerCategory,
} from "../../Redux/Features/bannersCategorySlice";
import { useParams } from "react-router-dom";

function Banner() {
  const dispatch = useDispatch();
  const id = useParams().id;
  const { currentBannerCategory, status, deleteBannerStatus } = useSelector(
    (state) => state.bannersCategory
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBannerCategoryAsync());
    }
  });

  useEffect(() => {
    dispatch(setCurrentBannerCategory(id));
  }, [status, dispatch]);

  return (
    <div className="h-full dark:bg-darkPrimary font-montserrat">
      <div className="p-5">
        <div className="flex justify-between items-center mb-4 px-4 mt-16">
          <h2 className="text-xl font-semibold dark:text-colorText">
            Banner Area - {currentBannerCategory?.category}
          </h2>
          <div className="flex items-center gap-3">
            <Dialog
              trigger={
                <button className="bg-blue px-3 rounded-md font-semibold text-white py-2 text-sm">
                  Add Banner
                </button>
              }
              width="w-[30%]"
              height="h-[65%]"
            >
              <AddBannerForm categoryId={currentBannerCategory?.id} />
            </Dialog>
            <h2 className="font-semibold">
              TOTAL: {currentBannerCategory?.Banners?.length || 0}
            </h2>
          </div>
        </div>
        <AllBanners
          banners={currentBannerCategory?.Banners}
          categoryId={currentBannerCategory?.id}
          status={status}
          deleteBannerStatus={deleteBannerStatus}
        />
      </div>
    </div>
  );
}

export default Banner;
