import React from "react";
import { IoIosArrowDown } from "react-icons/io";

function YourListing() {
  const listinga = [
    {
      id: 1,
      img: "auth-img.png",
      title: "Listing 1",
      rate: "$4900 Fixed",
      expiry: "8 months left",
      status: "Active",
      listingId: "L1",
    },
    {
      id: 2,
      img: "auth-img.png",
      title: "Listing 2",
      rate: "On Call",
      expiry: "8 months left",
      status: "Active",
      listingId: "L2",
    },
    {
      id: 3,
      img: "auth-img.png",
      title: "Listing 3",
      rate: "On Call",
      expiry: "8 months left",
      status: "Active",
      listingId: "L3",
    },
  ];
  return (
    <>
      <div className="bg-white rounded-md shadow-lg mx-4 mt-2 dark:bg-darkgrey overflow-hidden overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="w-full h-full">
            <thead>
              <tr className="text-base uppercase bg-[#f6f8fa] border">
                <th className="py-5 px-3">Title</th>
                <th className="py-5 px-3">Expiry</th>
                <th className="py-5 px-3">Status</th>
                <th className="py-5 px-3">Listing ID</th>
                <th className="py-5 px-3">Setting</th>
              </tr>
            </thead>
            <tbody>
              {listinga?.map((listing) => (
                <tr
                  key={listing.id}
                  className="border border-[rgba(0, 0, 0, 0.06)] text-[#565656] dark:text-lightPrimary"
                >
                  <td className="py-3 flex justify-center  gap-2">
                    <div>
                      <img
                        src={listing.img}
                        alt={listing.title}
                        className="w-16 h-16 rounded-md"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {listing.title}
                      </p>
                      <p className="text-[#ef5d50] font-semibold text-lg">
                        {listing.rate}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 text-center">{listing.expiry}</td>
                  <td className="py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold dark:text-black ${
                        listing.status === "Active"
                          ? "bg-green-200"
                          : "bg-red-200"
                      }`}
                    >
                      {listing.status}
                    </span>
                  </td>
                  <td className="py-3 text-center">{listing.listingId}</td>
                  <td className="py-3">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="flex justify-center items-center gap-1 text-[#0967d2] bg-[#eaeff5] py-1 px-4 text-sm rounded-md"
                        // onClick={() => deleteHandler(banner.id)}
                      >
                        <h1>Configure</h1>
                        <IoIosArrowDown size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default YourListing;
