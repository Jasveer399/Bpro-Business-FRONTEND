import React from "react";
import Navbar from "../../Components/Home/Navbar";
import Header from "../../Components/Home/Header";
import Advertisement from "../../Components/Home/Advertisement";
import PopularSearches from "../../Components/Home/PopularSearches";
import LocationCard from "../../Components/Home/LocationCard";
import Footer from "../../Components/Home/Footer";

function Home() {
  return (
    <>
      <div>
        <Navbar />
        <Header />
        <Advertisement />
        <div className="my-10">
          <h1 className="font-montserrat font-extrabold text-2xl mx-5">
            Popular Searches
          </h1>
          <div className="grid grid-cols-4 m-4 gap-5">
            <PopularSearches />
            <PopularSearches />
            <PopularSearches />
            <PopularSearches />
          </div>
          <div className="flex items-center justify-center">
            <h1 className="border border-[#E7E7E7] inline-flex py-1 px-8 cursor-pointer rounded-md font-semibold">
              Load More...
            </h1>
          </div>
        </div>
        <div>
          <img src="/banner.png" className="w-full" />
        </div>
        <div className="my-10">
          <h1 className="font-montserrat font-extrabold text-2xl mx-5 mb-3">
            We are available in...
          </h1>
          <div className="grid grid-cols-8 mx-3">
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
