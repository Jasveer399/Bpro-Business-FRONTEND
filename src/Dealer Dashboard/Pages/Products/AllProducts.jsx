import Navbar from "../../Components/Home/Navbar";
import Header from "../../Components/Home/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllProductsAsync } from "../../../Redux/Features/productSlice";
import {
  addBookmarkAsync,
  deleteBookmarkAsync,
  fetchUserBookmarksAsync,
} from "../../../Redux/Features/bookmarkSlice";
import LocationCarousel from "../../Components/Home/LocationCard";
import { Loader } from "lucide-react";
import PopularSearches from "../../Components/Home/PopularSearches";
import ShopsCategory from "../../Components/Home/ShopsCategory";

const AllProducts = () => {
  const dispatch = useDispatch();
  const [updatedProducts, setUpdatedProducts] = useState([]);

  // Fetch products from the listings
  const {
    allProducts,
    status: productStatus,
    allProductStatus,
  } = useSelector((state) => state.products);

  const { items: bookmarkedItems, bookmarkStatus } = useSelector(
    (state) => state.bookmarks
  );

  useEffect(() => {
    if (allProductStatus === "idle") {
      dispatch(fetchAllProductsAsync());
    }

    if (bookmarkStatus === "idle") {
      dispatch(fetchUserBookmarksAsync());
    }
  }, [allProductStatus, bookmarkStatus, dispatch]);

  useEffect(() => {
    const updatedData = allProducts?.map((product) => ({
      ...product,
      bookmark: bookmarkedItems.some((item) => item.productId === product.id),
    }));
    setUpdatedProducts(updatedData);
  }, [allProducts, bookmarkedItems]);

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
          All Products
        </h1>
      </div>

      <h1 className="text-4xl font-[600] my-5 mx-12">Categories</h1>
      <ShopsCategory />

      <h1 className="text-4xl font-[600] my-5 mx-12">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 m-2 md:m-4 gap-3 md:gap-5 px-6">
        {allProductStatus === "loading" ? (
          <div className="flex items-center justify-center my-4">
            <Loader />
          </div>
        ) : updatedProducts && updatedProducts.length > 0 ? (
          updatedProducts?.map((product) => (
            <PopularSearches
              key={product.id}
              product={product}
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))
        ) : (
          <div className="font-[600] text-lg flex justify-center items-center">
            No Products Available
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
};

export default AllProducts;
