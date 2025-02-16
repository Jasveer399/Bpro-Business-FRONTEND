import React from "react";
import { useNavigate } from "react-router-dom";

function ShopsCategoryCard({ imageUrl, title, id }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/category/${title.toLowerCase()}/${id}`)}
      className="flex flex-col gap-2 items-center cursor-pointer"
    >
      <img
        src={imageUrl}
        className="p-5 bg-[#ebeaff] rounded-lg w-20 h-20 object-contain"
        alt={title}
      />
      <h1 className="text-sm">{title}</h1>
    </div>
  );
}

export default ShopsCategoryCard;
