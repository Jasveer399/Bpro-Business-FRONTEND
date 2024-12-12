import React, { useEffect } from "react";
import ListingCard from "../../Components/Dashboard/Listing/ListingCard";
import YourListing from "../../Components/Dashboard/Listing/YourListing";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsAsync,
  getProductsStatsAsync,
} from "../../../Redux/Features/productSlice";

function Listing() {
  const { status, error, products, productsStats, productsStatsStatus } =
    useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsAsync());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (productsStatsStatus === "idle") {
      dispatch(getProductsStatsAsync());
    }
  }, [dispatch, productsStatsStatus]);

  console.log("products", products);
  console.log("products stats", productsStats);
  return (
    <>
      <div className="space-y-6">
        {/* Listing Cards */}
        <div className="md:flex mr-4 sm:flex-col sm:flex md:flex-row gap-4">
          <div className="w-full">
            <ListingCard
              colorCode="bg-[#0083c9]"
              count={productsStats?.totalProducts || 0}
              name="Total Listings"
            />
          </div>
          <div className="w-full">
            <ListingCard
              colorCode="bg-[#2fb82f]"
              count={productsStats?.activeProducts || 0}
              name="Active Listings"
            />
          </div>
          <div className="w-full">
            <ListingCard
              colorCode="bg-[#f04d4e]"
              count={productsStats?.expiredProducts || 0}
              name="Expired Listings"
            />
          </div>
        </div>

        {/* Your Listings Section */}
        <div className="bg-white rounded-lg ml-4 pr-4 w-full">
          <h1 className="font-bold text-xl md:text-2xl mb-4 md:mb-6">
            Your Listings
          </h1>
          <YourListing status={status} error={error} products={products} />
        </div>
      </div>
    </>
  );
}

export default Listing;
