import React, { useEffect } from "react";
import ListingCard from "../../Components/Dashboard/Listing/ListingCard";
import YourListing from "../../Components/Dashboard/Listing/YourListing";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync } from "../../../Redux/Features/productSlice";

function Listing() {
  const { status, error, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsAsync());
    }
  }, [dispatch, status]);

  console.log("prodthcsy", products);
  return (
    <>
      <div className="p-4 space-y-6 max-w-screen-lg mx-auto">
        {/* Listing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="w-full">
            <ListingCard
              colorCode="bg-[#0083c9]"
              count="6"
              name="Total Listings"
            />
          </div>
          <div className="w-full">
            <ListingCard
              colorCode="bg-[#2fb82f]"
              count="6"
              name="Active Listings"
            />
          </div>
          <div className="w-full">
            <ListingCard
              colorCode="bg-[#f04d4e]"
              count="6"
              name="Expired Listings"
            />
          </div>
        </div>

        {/* Your Listings Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-full">
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
