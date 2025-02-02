import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Home/Navbar";
import Header from "../../Components/Home/Header";
import Footer from "../../Components/Home/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchDealersAsync,
  fetchSpecificDealerAsync,
  setDealer,
} from "../../../Redux/Features/dealersSlice";
import PopularSearches from "../../Components/Home/PopularSearches";
import { Mail, PhoneCall, Check, MapPin, MessageSquare } from "lucide-react";

function DealerProfilePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { specificDealer, specificDealerStatus } = useSelector(
    (state) => state.dealers
  );

  useEffect(() => {
    if (specificDealerStatus === "idle") {
      dispatch(fetchSpecificDealerAsync(id));
    }
  }, [fetchStatus, dispatch]);

  return (
    <>
      <Navbar />
      <div className="mx-3">
        <Header />
      </div>
      <div>
        <img
          src="/header-banner.jpg"
          alt="productLisiting"
          className="w-full h-72 object-cover relative"
        />
        <h1 className="flex flex-col md:text-6xl text-4xl font-semibold text-white absolute top-56 md:left-20 left-5 gap-4">
          Dealer Profile{" "}
          <span className="text-xl">Home | Dealer: {dealer?.fullName} </span>
        </h1>

        {/* Dealer Profile Section */}
        <div className="bg-gray-300 w-full h-full">
          <div className="max-w-7xl mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-center items-center mb-10">
              <div className="w-full md:w-1/3 flex justify-center items-center md:justify-start border-[1px] border-gray-200 p-2 rounded-lg">
                <img
                  src={dealer?.profileUrl || "/dummy-profile.png"}
                  alt="Vishwakarma Elevator"
                  className="w-full rounded-lg"
                />
              </div>

              <div className="md:ml-6 w-full mt-4 md:mt-0">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-sm text-sm font-semibold inline-block border-[1px] border-green-400">
                  ● Offline
                </span>
                <h2 className="text-2xl font-semibold mt-2 flex items-center">
                  Vishwakarma Elevator
                  <span className="bg-green-500 flex justify-center items-center gap-1 text-white text-sm px-2 py-1 rounded-sm ml-2">
                    <Check size={12} /> verified
                  </span>
                </h2>
                <p className="text-gray-500">Member since September 15, 2024</p>

                <div className="mt-4 space-y-2">
                  <p className="flex items-center space-x-2 text-gray-700">
                    <PhoneCall
                      size={28}
                      style={{
                        border: "1px solid gray",
                        padding: "4px",
                        borderRadius: "10%",
                      }}
                    />
                    <span>+918630720504</span>
                  </p>
                  <p className="flex items-center space-x-2 text-gray-700">
                    <MessageSquare
                      size={28}
                      style={{
                        border: "1px solid gray",
                        padding: "4px",
                        borderRadius: "10%",
                      }}
                    />
                    <span>+918630720504</span>
                  </p>
                  <p className="flex items-center space-x-2 text-gray-700">
                    <Mail
                      size={28}
                      style={{
                        border: "1px solid gray",
                        padding: "4px",
                        borderRadius: "10%",
                      }}
                    />
                    <span>vishwakarmaelevator@gmail.com</span>
                  </p>
                  <p className="flex items-center space-x-2 text-gray-700">
                    <MapPin
                      size={28}
                      style={{
                        border: "1px solid gray",
                        padding: "4px",
                        borderRadius: "10%",
                      }}
                    />
                    <span>
                      20, near eidgah, badheri rajputan, haridwar, u.k. 247667
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 w-full md:w-1/3">
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-md w-full md:w-auto text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white">
                  <PhoneCall size={18} />
                  <span>Call Now</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-md w-full md:w-auto text-green-600 border-green-600 hover:bg-green-600 hover:text-white">
                  <MessageSquare size={18} />
                  <span>Whatsapp</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-md w-full md:w-auto text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                  <Mail size={18} />
                  <span>Send Email</span>
                </button>
              </div>
            </div>

            <div className="listingContainer">
              <h1 className="text-3xl font-semibold">
                Listings By - {dealer?.fullName}
              </h1>

              {/* Add Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dealer?.products?.map((product) => (
                  <PopularSearches
                    key={product.id}
                    product={product}
                    onBookmarkToggle={() => {}}
                  />
                ))}

                {/* Show message if no listings */}
                {(!dealer?.products || dealer.products.length === 0) && (
                  <p className="text-xl col-span-full text-center py-4">
                    No listings available for this dealer
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default DealerProfilePage;
