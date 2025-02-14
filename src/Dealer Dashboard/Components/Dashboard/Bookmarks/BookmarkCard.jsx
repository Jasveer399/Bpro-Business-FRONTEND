import { MailOpen } from "lucide-react";
import React from "react";
import { FaStar, FaWhatsapp } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { VscVerifiedFilled } from "react-icons/vsc";

function BookmarkCard({ product }) {
  console.log("product: ", product);

  return (
    <div className="border border-[#E7E7E7] rounded-md font-montserrat p-2">
      <div>
        <img
          src={product.images?.[0] || "/placeholder-image.png"}
          alt={product.title}
          className="rounded-t-md w-full h-48 object-cover"
        />
      </div>

      {/* Category and Verified Badge */}
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-1">
          <img src="/cardIcon.png" alt="Category Icon" className="w-5" />
          <p className="text-[#6A6A6A] mt-1 text-sm">
            {product.categories.map((category) => category.title + ", ")}
          </p>
        </div>
        <div className="flex items-center text-[#00BCE7]">
          <VscVerifiedFilled size={20} />
          <p className="font-semibold text-sm">Verified</p>
        </div>
      </div>

      {/* Product Title */}
      <div>
        <h1 className="font-semibold text-lg">{product.title}</h1>
      </div>

      {/* Location */}
      <div className="flex items-center my-1">
        <IoLocationSharp className="text-secondary" size={16} />
        <p className="text-[#6A6A6A] text-xs truncate">
          {product.Dealer.city + ", " + product.Dealer.state ||
            "Location Not Specified"}
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 my-2">
        <div className="flex items-center gap-1 bg-secondary py-[2px] px-2 rounded-md">
          <p className="font-semibold text-sm mt-px">
            {product.averageRatings || 0}
          </p>
          <FaStar className="text-white" size={14} />
        </div>
        <p className="text-[#6A6A6A] text-sm">
          {product._count.Reviews || 0} Ratings
        </p>
      </div>

      {/* Call to Actions */}
      <div className="flex items-center gap-2">
        <a href={`tel:+91${product?.Dealer?.mobileNo}`} className="bg-[#29AF3E] px-3 py-1 rounded-md text-white font-semibold border border-[#29AF3E]">
          Call Now
        </a>
        {product.Dealer.whatsappNo && (
          <a href={`https://wa.me/+91${product?.Dealer?.whatsappNo}`} className="border border-[#C3C3C3] rounded-md p-px">
            <FaWhatsapp className="text-[#29AF3E] text-3xl" />
          </a>
        )}
        <a href={`mailto:${product?.Dealer?.email}`} className="bg-primary p-1 rounded-md border border-primary text-white">
          <MailOpen />
        </a>
      </div>

      {/* Remove Bookmark */}
      <button className="mt-2 text-sm text-red-500 underline">
        Remove from Bookmarks
      </button>
    </div>
  );
}

export default BookmarkCard;
