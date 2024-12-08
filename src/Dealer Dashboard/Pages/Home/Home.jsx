import React, { useEffect } from "react";
import Navbar from "../../Components/Home/Navbar";
import Header from "../../Components/Home/Header";
import PopularSearches from "../../Components/Home/PopularSearches";
import Footer from "../../Components/Home/Footer";
import Advertisement from "../../Components/Home/Advertisement";
import LatestArticles from "../../Components/Home/LatestArticles";
import ShopsCategory from "../../Components/Home/ShopsCategory";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannerCategoryAsync } from "../../../Redux/Features/bannersCategorySlice";
import { fetchProductsAsync } from "../../../Redux/Features/productSlice";
import LocationCarousel from "../../Components/Home/LocationCard";

function Home() {
  const dispatch = useDispatch();
  const { bannersCategory, status, error } = useSelector(
    (state) => state.bannersCategory
  );

  // Fetch products from the listings
  const { data: products, status: productStatus } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBannerCategoryAsync());
    }

    if (productStatus === "idle") {
      dispatch(fetchProductsAsync({ page: 1, limit: 8 }));
    }
  }, [status, productStatus, dispatch]);

  const articleData = [
    {
      time: "10 hours ago",
      title: "Commented on Video posted by black demon.",
    },
    {
      time: "10 hours ago",
      title: "Commented on Video posted by black demon.",
    },
    {
      time: "10 hours ago",
      title: "Commented on Video posted by black demon.",
    },
    {
      time: "10 hours ago",
      title: "Commented on Video posted by black demon.",
    },
  ];

  const handleLoadMore = () => {
    const nextPage = products.currentPage + 1;
    if (nextPage <= products.totalPages) {
      dispatch(
        fetchProductsAsync({
          page: nextPage,
          limit: 8,
        })
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-2 md:mx-5">
        <Header />
        {/* Main content section */}
        <div className="flex flex-col md:flex-row mt-5 md:mt-10 md:mx-5 gap-5">
          {/* Left side content */}
          <div className="w-full md:w-3/4">
            {/* Advertisement section */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full">
              <Advertisement
                className="w-full md:w-[54%] h-auto"
                isLeft={true}
                isButtonShow={true}
                banners={bannersCategory[0]?.Banners}
              />
              <div className="flex gap-3 md:gap-5 w-full md:w-[41%]">
                <Advertisement
                  className="w-1/2 md:w-1/2 rounded-md"
                  isLeft={false}
                  banners={bannersCategory[1]?.Banners}
                />
                <Advertisement
                  className="w-1/2 md:w-1/2 rounded-md"
                  isLeft={false}
                  banners={bannersCategory[2]?.Banners}
                />
              </div>
            </div>
            <ShopsCategory />
          </div>

          {/* Right side content */}
          <div className="w-full md:w-1/4">
            <LatestArticles articles={articleData} />
            <Advertisement
              className="w-full md:w-[100%] h-auto"
              isLeft={true}
              isButtonShow={true}
              banners={bannersCategory[4]?.Banners}
            />
          </div>
        </div>

        {/* Popular Searches section */}
        <div className="my-6 md:my-10">
          <h1 className="font-montserrat font-extrabold text-xl md:text-2xl mx-3 md:mx-5">
            Popular Searches
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 m-2 md:m-4 gap-3 md:gap-5">
            {products?.data?.map((product) => (
              <PopularSearches key={product.id} product={product} />
            ))}
          </div>
          {products?.data?.length >= 8 && (
            <div className="flex items-center justify-center">
              <button
                onClick={handleLoadMore}
                className="border border-[#E7E7E7] py-1 px-8 rounded-md font-semibold hover:bg-gray-50 transition-colors"
              >
                Load More...
              </button>
            </div>
          )}
        </div>

        {/* Banner section */}
        <div className="w-full">
          <img
            src="/banner.png"
            className="w-full object-cover"
            alt="Main Banner"
          />
        </div>

        {/* Location section */}
        <div className="my-6 md:my-10">
          <h1 className="font-montserrat font-extrabold text-xl md:text-2xl mx-3 md:mx-5 mb-3">
            We are available in...
          </h1>
          <div className="flex overflow-x-auto space-x-4 mx-2 md:mx-3">
            <LocationCarousel />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;

{
  /* <div className="my-6 md:my-10">
  <h1 className="font-montserrat font-extrabold text-xl md:text-2xl mx-3 md:mx-5">
    Popular Searches
  </h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 m-2 md:m-4 gap-3 md:gap-5">
    {products?.data?.map((product) => (
      <PopularSearches key={product.id} product={product} />
    ))}
  </div>
  {products?.data?.length >= 8 && (
    <div className="flex items-center justify-center">
      <button
        onClick={handleLoadMore}
        className="border border-[#E7E7E7] py-1 px-8 rounded-md font-semibold hover:bg-gray-50 transition-colors"
      >
        Load More...
      </button>
    </div>
  )}
</div>; */
}
