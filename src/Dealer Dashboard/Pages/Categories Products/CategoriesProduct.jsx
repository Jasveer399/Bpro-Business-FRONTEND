import React, { useEffect } from "react";
import Navbar from "../../Components/Home/Navbar";
import Header from "../../Components/Home/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecificCategoryAsync } from "../../../Redux/Features/categoriesSlice";
import PopularSearches from "../../Components/Home/PopularSearches";
import LocationCarousel from "../../Components/Home/LocationCard";
import Loader from "../../../ui/Loader";

function CategoriesProduct() {
  const { id, title } = useParams();
  const dispatch = useDispatch();

  const { specificCategory, specificCategoryStatus } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (specificCategoryStatus === "idle") {
      dispatch(fetchSpecificCategoryAsync(id));
    }
  }, [dispatch, specificCategoryStatus]);

  console.log("specificCategory: ", specificCategory);

  return (
    <div className="font-montserrat">
      <Navbar />
      <div className="bg-[#f7f7f7]">
        <div className="mx-3 ">
          <Header />
        </div>
        <img
          src="/header-banner.jpg"
          alt="productLisiting"
          className="w-full h-72 object-cover relative"
        />
        <h1 className="flex flex-col md:text-6xl text-4xl font-semibold text-white absolute top-56 md:left-20 left-5 gap-4">
          Category
          <span className="text-xl">
            {title.toUpperCase()} | {specificCategory?.products?.length || 0}{" "}
            Products
          </span>
        </h1>
      </div>
      <h1 className="text-4xl font-[600] my-5 mx-12">
        <span className="capitalize">{title}</span> Products
      </h1>
      {specificCategoryStatus === "loading" ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : specificCategory?.products &&
        specificCategory?.products.length > 0 ? (
        specificCategory?.products?.map((product) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 m-2 md:m-4 gap-3 md:gap-5 px-8">
            <PopularSearches
              key={product.id}
              product={product}
              // onBookmarkToggle={handleBookmarkToggle}
            />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center text-lg font-[600]">No Products Found</div>
      )}

      <div className="my-6 md:my-10 mx-8">
        <h1 className="font-montserrat font-extrabold text-xl md:text-2xl mx-3 md:mx-5 mb-3">
          We are available in...
        </h1>
        <div className="flex overflow-x-auto space-x-4 mx-2 md:mx-3">
          <LocationCarousel />
        </div>
      </div>
    </div>
  );
}

export default CategoriesProduct;
