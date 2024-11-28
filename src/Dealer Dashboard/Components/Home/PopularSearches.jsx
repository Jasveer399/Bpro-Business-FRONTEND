import React from "react";
import { FaStar, FaBookmark, FaRegBookmark, FaWhatsapp } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { VscVerifiedFilled } from "react-icons/vsc";
import { MailOpen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookmark,
  removeBookmark,
} from "../../../Redux/Features/bookmarkSlice";

function PopularSearches({ product }) {
  const dispatch = useDispatch();
  const bookmarkedItems = useSelector((state) => state.bookmarks.items);

  // Check if current product is bookmarked
  const isBookmarked = bookmarkedItems.some((item) => item.id === product.id);

  // Log data for debugging
  // console.log("Product Data:", product);

  // Handle bookmark toggle
  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(product));
    } else {
      dispatch(addBookmark(product));
    }
  };

  return (
    <div className="relative border border-[#E7E7E7] rounded-md font-montserrat p-2">
      {/* Bookmark Icon */}
      <div
        className="absolute top-2 right-2 cursor-pointer z-20"
        onClick={handleBookmarkToggle}
      >
        {isBookmarked ? (
          <FaBookmark className="text-primary" size={20} />
        ) : (
          <FaRegBookmark className="text-gray-500" size={20} />
        )}
      </div>

      {/* Product Image */}
      <div>
        <img
          src={product.images?.[0] || "/placeholder-image.png"}
          alt={product.title}
          className="rounded-t-md w-full h-48 object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-1">
          <img src="/cardIcon.png" className="w-5" />
          <p className="text-[#6A6A6A] mt-1 text-sm">{product.categories}</p>
        </div>
        <div className="flex items-center text-[#00BCE7]">
          <VscVerifiedFilled size={20} />
          <p className="font-semibold text-sm">Verified</p>
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-lg">{product.title}</h1>
      </div>
      <div className="flex items-center my-1">
        <IoLocationSharp className="text-secondary" size={16} />
        <p className="text-[#6A6A6A] text-xs truncate">
          {product.addressLine1 || "Location Not Specified"}
        </p>
      </div>

      <div className="flex items-center gap-2 my-2">
        <div className="flex items-center gap-1 bg-secondary py-[2px] px-2 rounded-md">
          <p className="font-semibold text-sm mt-px">
            {product.rating || "4.0"}
          </p>
          <FaStar className="text-white" size={14} />
        </div>
        <p className="text-[#6A6A6A] text-sm">
          {product.ratingCount || "0"} Ratings
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button className="bg-[#29AF3E] px-3 py-1 rounded-md text-white font-semibold border border-[#29AF3E]">
          Call Now
        </button>
        <div className="border border-[#C3C3C3] rounded-md p-px">
          <FaWhatsapp className="text-[#29AF3E] text-3xl" />
        </div>
        <div className="bg-primary p-1 rounded-md border border-primary text-white">
          <MailOpen />
        </div>
      </div>
    </div>
  );
}

export default PopularSearches;
