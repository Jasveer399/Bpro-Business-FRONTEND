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
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <ListingCard
            colorCode={"bg-[#0083c9]"}
            count={"6"}
            name={"Total Listings"}
          />
          <ListingCard
            colorCode={"bg-[#2fb82f]"}
            count={"6"}
            name={"Active Listings"}
          />
          <ListingCard
            colorCode={"bg-[#f04d4e]"}
            count={"6"}
            name={"Expired Listings"}
          />
        </div>
        <div>
          <h1 className="font-bold text-2xl pl-5">Your Listings</h1>
          <YourListing status={status} error={error} products={products} />
        </div>
      </div>
    </>
  );
}

export default Listing;
