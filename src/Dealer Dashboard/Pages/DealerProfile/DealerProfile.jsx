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
import { BsWhatsapp } from "react-icons/bs";
import Loader from "../../../ui/Loader";

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
  }, [specificDealerStatus, dispatch]);

  console.log("specificDealer", specificDealer);
  return (
    <>
      {specificDealerStatus === 'loading' && (
        <div className="fixed top-0 h-screen w-full bg-black/45 flex items-center justify-center z-10">
          <Loader className="text-white" />
        </div>
      )}
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
          <span className="text-xl">
            Home | Dealer: {specificDealer?.fullName}{" "}
          </span>
        </h1>

        {/* specificDealer Profile Section */}
        <div className="bg-gray-300 w-full h-full">
          <div className="max-w-7xl mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-center items-center mb-10">
              <div className="w-full md:w-1/3 flex justify-center items-center md:justify-start border-[1px] border-gray-200 p-2 rounded-lg">
                <img
                  src={specificDealer?.profileUrl || "/dummy-profile.png"}
                  alt="Vishwakarma Elevator"
                  className="w-full rounded-lg"
                />
              </div>

              <div className="md:ml-6 w-full mt-4 md:mt-0">
                <span className="bg-green-500 inline-flex items-center justify-center gap-1 text-white text-sm px-2 py-1 rounded-sm ml-2">
                  <Check size={12} /> Verified
                </span>
                <h2 className="text-2xl font-semibold mt-2 flex items-center">
                  {specificDealer?.fullName}
                </h2>
                <p className="text-gray-500">
                  Member since {specificDealer?.created_at?.split("T")[0]}
                </p>

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
                    <span>+91 {specificDealer?.mobileNo}</span>
                  </p>
                  {specificDealer?.whatsappNo && (
                    <p className="flex items-center space-x-2 text-gray-700">
                      <BsWhatsapp
                        size={28}
                        style={{
                          border: "1px solid gray",
                          padding: "4px",
                          borderRadius: "10%",
                        }}
                      />
                      <span>+91 {specificDealer?.whatsappNo}</span>
                    </p>
                  )}
                  <p className="flex items-center space-x-2 text-gray-700">
                    <Mail
                      size={28}
                      style={{
                        border: "1px solid gray",
                        padding: "4px",
                        borderRadius: "10%",
                      }}
                    />
                    <span>{specificDealer?.email}</span>
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
                      {specificDealer?.streetNo}, {specificDealer?.areaName},{" "}
                      {specificDealer?.city}, {specificDealer?.state},{" "}
                      {specificDealer?.pincode}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 w-full md:w-1/3">
                <a
                  href={`tel:+91${specificDealer?.mobileNo}`}
                  className="flex items-center space-x-2 px-4 py-2 border rounded-md w-full md:w-auto text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white"
                >
                  <PhoneCall size={18} />
                  <span>Call Now</span>
                </a>
                {specificDealer?.whatsappNo && (
                  <a
                    href={`https://wa.me/+91${specificDealer?.whatsappNo}`}
                    className="flex items-center space-x-2 px-4 py-2 border rounded-md w-full md:w-auto text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                  >
                    <MessageSquare size={18} />
                    <span>Whatsapp</span>
                  </a>
                )}
                <a
                  href={`mailto:${specificDealer?.email}`}
                  className="flex items-center space-x-2 px-4 py-2 border rounded-md w-full md:w-auto text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                >
                  <Mail size={18} />
                  <span>Send Email</span>
                </a>
              </div>
            </div>

            <div className="listingContainer">
              <h1 className="text-3xl font-semibold">
                Listings By - {specificDealer?.fullName}
              </h1>

              {/* Add Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specificDealer?.Product?.map((product) => (
                  <PopularSearches
                    key={product.id}
                    product={product}
                    onBookmarkToggle={() => {}}
                  />
                ))}

                {/* Show message if no listings */}
                {(!specificDealer?.Product ||
                  specificDealer?.Product.length === 0) && (
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
