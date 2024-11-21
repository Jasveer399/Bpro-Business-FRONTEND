import React from "react";
import ListingCard from "../../Components/Dashboard/Listing/ListingCard";
import YourListing from "../../Components/Dashboard/Listing/YourListing";

function Listing() {
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
          <ListingCard
            colorCode={"bg-[#ff9700]"}
            count={"6"}
            name={"Pending Approval"}
          />
        </div>
        <div>
          <h1 className="font-bold text-2xl pl-5">Your Listings</h1>
          <YourListing />
        </div>
      </div>
    </>
  );
}

export default Listing;
