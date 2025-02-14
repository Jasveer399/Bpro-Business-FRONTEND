import React, { useEffect } from "react";
import ShopsCategoryCard from "./ShopsCategoryCard";
import { useSelector } from "react-redux";
import { fetchCategoriesAsync } from "../../../Redux/Features/categoriesSlice";
import { useDispatch } from "react-redux";

function ShopsCategory() {
  const { categories, status } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategoriesAsync());
    }
  }, [status, dispatch]);

  return (
    <div className="mt-8 mr-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 text-center">
        {categories.map((category) => (
          <ShopsCategoryCard
            key={category.id}
            id={category.id}
            imageUrl={category.iconImgUrl}
            title={category.title}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopsCategory;
