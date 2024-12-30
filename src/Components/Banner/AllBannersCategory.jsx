import React, { useEffect, useState } from "react";
import { PencilIcon, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannerCategoryAsync } from "../../Redux/Features/bannersCategorySlice";

const AllBannersCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bannersCategory, status, error } = useSelector(
    (state) => state.bannersCategory
  );
  console.log("bannersCategory: ", bannersCategory);
  console.log("error: ", error);
  const [selectedBanner, setSelectedBanner] = useState();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBannerCategoryAsync());
    }
  }, [status, dispatch]);

  return (
    <div className="bg-white rounded-xl shadow-lg mx-3 dark:bg-darkgrey overflow-hidden h-[33rem] overflow-y-auto">
      <div className="overflow-x-auto">
        <table className="w-full h-full">
          <thead>
            <tr className="text-base text-white uppercase bg-blue border">
              <th className="py-5 px-3">Banners Category</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {bannersCategory?.map((banner) => (
              <tr
                key={banner.id}
                className="border border-[rgba(0, 0, 0, 0.06)] text-[#565656] dark:text-lightPrimary"
              >
                <td className="py-3 text-center">{banner.category}</td>
                <td className="py-3">
                  <div className="flex justify-center space-x-2">
                    <button
                      className="flex justify-center items-center gap-1 font-semibold text-white bg-[#49B27A] py-2 px-3 text-sm rounded-md"
                      onClick={() => navigate(`${banner.id}`)}
                    >
                      <PencilIcon size={14} />
                      <h1>Modify</h1>
                    </button>
                    {/* <button
                      className="flex justify-center items-center gap-1 font-semibold text-white bg-[#FE043C] py-2 px-3 text-sm rounded-md"
                      onClick={() => deleteHandler(banner.id)}
                    >
                      <Trash2 size={14} />
                      <h1>Delete</h1>
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBannersCategory;
