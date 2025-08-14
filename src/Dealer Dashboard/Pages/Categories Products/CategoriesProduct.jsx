import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Home/Navbar";
import Header from "../../Components/Home/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpecificCategoryAsync,
  resetSpecificCategory,
} from "../../../Redux/Features/categoriesSlice";
import PopularSearches from "../../Components/Home/PopularSearches";
import LocationCarousel from "../../Components/Home/LocationCard";
import Loader from "../../../ui/Loader";
import {
  addBookmarkAsync,
  deleteBookmarkAsync,
  fetchUserBookmarksAsync,
} from "../../../Redux/Features/bookmarkSlice";
import ProductSkeleton from "../../../ui/SkeletonLoading/ProductSkeleton";

function CategoriesProduct() {
  const { id, title } = useParams();
  const dispatch = useDispatch();

  const { specificCategory, specificCategoryStatus, currentCategoryId } =
    useSelector((state) => state.categories);

  console.log("specificCategory ==>", specificCategory);

  const [updatedProducts, setUpdatedProducts] = useState([]);

  const { items: bookmarkedItems, bookmarkStatus } = useSelector(
    (state) => state.bookmarks
  );

  // Product skeleton component using Tailwind

  useEffect(() => {
    // Reset and fetch new category data when category ID changes
    if (id && id !== currentCategoryId) {
      dispatch(resetSpecificCategory());
      dispatch(fetchSpecificCategoryAsync(id));
    }

    if (bookmarkStatus === "idle") {
      dispatch(fetchUserBookmarksAsync());
    }
  }, [dispatch, id, currentCategoryId, bookmarkStatus]);

  useEffect(() => {
    const updatedData = specificCategory?.products?.map((product) => ({
      ...product,
      bookmark: bookmarkedItems.some((item) => item.productId === product.id),
    }));
    setUpdatedProducts(updatedData);
  }, [specificCategory, bookmarkedItems]);

  const handleBookmarkToggle = (product) => {
    const isBookmarked = product.bookmark;

    const updatedProductList = updatedProducts.map((p) =>
      p.id === product.id ? { ...p, bookmark: !isBookmarked } : p
    );
    setUpdatedProducts(updatedProductList);

    const bookmarkedItem = bookmarkedItems.find(
      (item) => item.productId === product.id
    );

    if (isBookmarked && bookmarkedItem) {
      // Remove bookmark using the item's ID
      dispatch(deleteBookmarkAsync(bookmarkedItem.id));
    } else {
      // Add bookmark using the product ID
      dispatch(addBookmarkAsync(product.id));
    }
  };

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
            {title?.toUpperCase()} | {specificCategory?.products?.length || 0}{" "}
            Products
          </span>
        </h1>
      </div>
      <h1 className="text-4xl font-[600] my-5 mx-12">
        <span className="capitalize">{title}</span> Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 m-2 md:m-4 gap-3 md:gap-5 px-6">
        {specificCategoryStatus === "loading" ? (
          // Show skeleton loading for products
          Array.from({ length: 4 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : updatedProducts && updatedProducts.length > 0 ? (
          updatedProducts?.map((product) => (
            <PopularSearches
              key={product.id}
              product={product}
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))
        ) : (
          <div className="flex items-center justify-center text-lg font-[600] col-span-full">
            No Products Found
          </div>
        )}
      </div>

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
