import React, { useState } from "react";
import { PencilIcon, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteBannerAsync } from "../../Redux/Features/bannersSlice";
import { useDispatch } from "react-redux";
import Dialog from "../../ui/Dialog";
import EditBannerForm from "../Forms/Banner/EditBannerForm";

const AllBanners = ({ banners, categoryId }) => {
  const dispatch = useDispatch();
  const [selectedBanner, setSelectedBanner] = useState();

  const deleteHandler = async (id) => {
    try {
      await dispatch(deleteBannerAsync(id)).unwrap();
      console.log("Banner deleted successfully");
    } catch (error) {
      console.error("Failed to delete banner:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg mx-3 dark:bg-darkgrey overflow-hidden h-[34rem] overflow-y-auto">
      <div className="overflow-x-auto">
        <table className="w-full h-full">
          <thead>
            <tr className="text-base text-white uppercase bg-blue border">
              <th className="py-5 px-3">Title</th>
              <th className="py-5 px-3">Image</th>
              <th className="py-5 px-3">Status</th>
              <th className="py-5 px-3">External URL</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {banners?.map((banner) => (
              <tr
                key={banner.id}
                className="border border-[rgba(0, 0, 0, 0.06)] text-[#565656] dark:text-lightPrimary"
              >
                <td className="py-3 text-center">{banner.title}</td>
                <td className="py-3 flex justify-center text-center">
                  <img
                    src={banner.bannerImgUrl}
                    alt={banner.title}
                    className="w-28 h-14 rounded-md"
                  />
                </td>
                <td className="py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold dark:text-black ${
                      banner.status === "Active" ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    {banner.status}
                  </span>
                </td>
                <td className="py-3 text-center">
                  <Link
                    to={banner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="text-blue">{banner.externalUrl}</div>
                  </Link>
                </td>
                <td className="py-3">
                  <div className="flex justify-center space-x-2">
                    <Dialog
                      trigger={
                        <button
                          className="flex justify-center items-center gap-1 font-semibold text-white bg-[#49B27A] py-2 px-3 text-sm rounded-md"
                          onClick={() => setSelectedBanner(banner)}
                        >
                          <PencilIcon size={14} />
                          <h1>Modify</h1>
                        </button>
                      }
                      width="w-[30%]"
                      height="h-[65%]"
                    >
                      <EditBannerForm banner={selectedBanner} />
                    </Dialog>
                    <button
                      className="flex justify-center items-center gap-1 font-semibold text-white bg-[#FE043C] py-2 px-3 text-sm rounded-md"
                      onClick={() => deleteHandler(banner.id)}
                    >
                      <Trash2 size={14} />
                      <h1>Delete</h1>
                    </button>
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

export default AllBanners;
