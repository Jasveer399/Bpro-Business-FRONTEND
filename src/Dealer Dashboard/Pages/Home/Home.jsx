import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Home/Navbar";
import Header from "../../Components/Home/Header";
import PopularSearches from "../../Components/Home/PopularSearches";
import Footer from "../../Components/Home/Footer";
import Advertisement from "../../Components/Home/Advertisement";
import LatestArticles from "../../Components/Home/LatestArticles";
import ShopsCategory from "../../Components/Home/ShopsCategory";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannerCategoryAsync } from "../../../Redux/Features/bannersCategorySlice";
import {
  fetchAllProductsAsync,
  setLocation,
} from "../../../Redux/Features/productSlice";
import LocationCarousel from "../../Components/Home/LocationCard";
import {
  addBookmarkAsync,
  deleteBookmarkAsync,
  fetchUserBookmarksAsync,
} from "../../../Redux/Features/bookmarkSlice";
import DealerProfileCard from "../../Components/Home/DealerProfileCard";
import Loader from "../../../ui/Loader";
import { fetchFourLatestBlogsAsync } from "../../../Redux/Features/blogsSlice";
import { Link } from "react-router-dom";
import { stateOptions } from "../../../Utils/options";

function Home() {
  const dispatch = useDispatch();
  const { bannersCategory, status, error } = useSelector(
    (state) => state.bannersCategory
  );
  const { fourLatestBlogsStatus, fourLatestBlogs } = useSelector(
    (state) => state.blogs
  );
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const [locationDetected, setLocationDetected] = useState(false);

  // Fetch products from the listings
  const {
    allProducts,
    status: productStatus,
    allProductStatus,
    userLocation,
  } = useSelector((state) => state.products);
  const { items: bookmarkedItems, bookmarkStatus } = useSelector(
    (state) => state.bookmarks
  );

  console.log("allProducts", allProducts);

  // Function to get user's current location using Google Geocoding API
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User coordinates:", { latitude, longitude });

          try {
            const GOOGLE_MAPS_API_KEY =
              import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE";

            if (
              !GOOGLE_MAPS_API_KEY ||
              GOOGLE_MAPS_API_KEY === "YOUR_API_KEY_HERE"
            ) {
              console.warn(
                "Google Maps API key not found. Please set VITE_GOOGLE_MAPS_API_KEY in your environment variables."
              );
              dispatch(setLocation("assam"));
              setLocationDetected(true);
              return;
            }

            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
            );

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.status === "OK" && data.results.length > 0) {
              const result = data.results[0];
              let city = null;
              let state = null;
              let country = null;

              // Parse address components to get city, state, and country
              result.address_components.forEach((component) => {
                const types = component.types;
                if (types.includes("locality")) {
                  city = component.long_name;
                } else if (
                  types.includes("administrative_area_level_2") &&
                  !city
                ) {
                  city = component.long_name;
                } else if (types.includes("administrative_area_level_1")) {
                  state = component.long_name;
                } else if (types.includes("country")) {
                  country = component.long_name;
                }
              });

              // Map state to stateOptions value
              const stateMatch = stateOptions.find((option) => {
                return (
                  option.label.toLowerCase() === state?.toLowerCase() ||
                  option.value.toLowerCase() === state?.toLowerCase()
                );
              });
              const selectedLocation = stateMatch
                ? stateMatch.value
                : city?.toLowerCase() ||
                  state?.toLowerCase() ||
                  country?.toLowerCase() ||
                  "unknown";

              console.log("Detected location from Google:", {
                city,
                state,
                country,
                selectedLocation,
              });

              dispatch(setLocation(selectedLocation));
              setLocationDetected(true);
            } else {
              console.error(
                "Google Geocoding API error:",
                data.status,
                data.error_message
              );
              dispatch(setLocation(`${latitude},${longitude}`));
              setLocationDetected(true);
            }
          } catch (error) {
            console.error("Error getting location from Google API:", error);
            dispatch(setLocation(`${latitude},${longitude}`));
            setLocationDetected(true);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.log("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.log("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.log("The request to get user location timed out.");
              break;
            default:
              console.log("An unknown error occurred.");
              break;
          }
          dispatch(setLocation("assam"));
          setLocationDetected(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      dispatch(setLocation("assam"));
      setLocationDetected(true);
    }
  };

  // Get location when component mounts
  useEffect(() => {
    if (!locationDetected) {
      getCurrentLocation();
    }
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBannerCategoryAsync());
    }

    // Only fetch products after location is detected
    if (allProductStatus === "idle" && locationDetected && userLocation) {
      dispatch(fetchAllProductsAsync(userLocation));
    }

    if (bookmarkStatus === "idle") {
      dispatch(fetchUserBookmarksAsync());
    }

    if (fourLatestBlogsStatus === "idle") {
      dispatch(fetchFourLatestBlogsAsync());
    }
  }, [
    status,
    allProductStatus,
    bookmarkStatus,
    fourLatestBlogsStatus,
    dispatch,
    userLocation,
    locationDetected,
  ]);

  useEffect(() => {
    if (allProducts && bookmarkedItems) {
      const updatedData = allProducts.map((product) => {
        const isBookmarked = bookmarkedItems.some(
          (item) => item.productId === product.id
        );
        return {
          ...product,
          bookmark: isBookmarked,
        };
      });

      setUpdatedProducts(updatedData);
    }
  }, [allProducts, bookmarkedItems]);

  // In your handleBookmarkToggle function
  const handleBookmarkToggle = (product) => {
    const isBookmarked = product.bookmark;

    // Find the actual bookmark item
    const bookmarkedItem = bookmarkedItems.find(
      (item) => item.productId === product.id
    );

    // Optimistically update UI
    const updatedProductList = updatedProducts.map((p) =>
      p.id === product.id ? { ...p, bookmark: !isBookmarked } : p
    );
    setUpdatedProducts(updatedProductList);

    if (isBookmarked && bookmarkedItem) {
      dispatch(deleteBookmarkAsync(bookmarkedItem.id))
        .unwrap()
        .then((response) => {})
        .catch((error) => {
          // Revert UI change on error
          setUpdatedProducts(updatedProducts);
        });
    } else {
      dispatch(addBookmarkAsync(product.id))
        .unwrap()
        .then((response) => {})
        .catch((error) => {
          // Revert UI change on error
          setUpdatedProducts(updatedProducts);
        });
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
          <div className="w-full md:w-1/4 space-y-2">
            <LatestArticles
              status={fourLatestBlogsStatus}
              articles={fourLatestBlogs}
            />
            <Advertisement
              className="w-full md:w-[100%] h-auto"
              isLeft={true}
              isButtonShow={true}
              banners={bannersCategory[3]?.Banners}
            />
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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 m-2 md:m-4 gap-3 md:gap-5">
            {allProductStatus === "loading" || !locationDetected ? (
              <div className="flex items-center justify-center my-4">
                <Loader />
              </div>
            ) : updatedProducts && updatedProducts.length > 0 ? (
              updatedProducts
                .slice(0, 8)
                ?.map((product) => (
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
          {allProducts?.length >= 8 && (
            <div className="flex items-center justify-center">
              <Link
                to="/all-products"
                className="bg-secondary py-2 px-6 shadow-md rounded-md font-semibold  transition-colors"
              >
                Load More...
              </Link>
            </div>
          )}
        </div>

        {/* Banner section */}
        <div className="w-full rounded-sm">
          <Advertisement
            className="w-full h-60"
            isLeft={true}
            isButtonShow={true}
            banners={bannersCategory[5]?.Banners}
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

        <div className="my-6 md:my-10">
          <h1 className="font-montserrat font-extrabold text-xl md:text-2xl mx-3 md:mx-5 mb-3">
            Our Dealers
          </h1>
          <div className="flex overflow-x-auto space-x-4 mx-2 md:mx-3">
            <DealerProfileCard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
