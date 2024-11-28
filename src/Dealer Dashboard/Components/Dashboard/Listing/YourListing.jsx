import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync } from "../../../../Redux/Features/productSlice";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";


function YourListing() {
  const { status, error, products } = useSelector((state) => state.products);
  const [isConfigure, setIsConfigure] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsAsync());
    }
  }, [dispatch, status]);

  return (
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
            {products.data?.map((listing, index) => {
              const timeLeft = calculateTimeLeft(listing.expiryDate);
              const expiryColorClass = getExpiryColor(timeLeft.daysLeft);

              return (
                <tr
                  key={listing.id}
                  className="border border-[rgba(0, 0, 0, 0.06)] text-[#565656] dark:text-lightPrimary"
                >
                  <td className="py-3 flex justify-center gap-2">
                    <div>
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-16 h-16 rounded-md"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {listing.title}
                      </p>
                      <p className="text-[#ef5d50] font-semibold text-lg flex items-center">
                        <FaRupeeSign size={15}/>{`${listing.insertPrice}`}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${expiryColorClass}`}>
                      {timeLeft.text}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold dark:text-black ${listing.status === "active" ? "bg-green-200" : "bg-red-200"
                        }`}
                    >
                      {listing.status}
                    </span>
                  </td>
                  <td className="py-3 text-center">L{index + 1}</td>
                  <td className="py-3">
                    <div className="flex justify-center space-x-2 relative">
                      <button className="flex justify-center items-center gap-1 text-[#0967d2] bg-[#eaeff5] py-1 px-4 text-sm rounded-md" onClick={() => setIsConfigure(!isConfigure)}>
                        <h1>Configure</h1>
                        {isConfigure ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                      </button>
                      {isConfigure && <ConfigureDialog />}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const calculateTimeLeft = (expiryDate) => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diff = expiry - now;

  // If already expired
  if (diff < 0) {
    return {
      text: "Expired",
      daysLeft: -1,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  let text;
  if (years > 0) {
    text = `${years} year${years > 1 ? 's' : ''} left`;
  } else if (months > 0) {
    text = `${months} month${months > 1 ? 's' : ''} left`;
  } else if (days > 0) {
    text = `${days} day${days > 1 ? 's' : ''} left`;
  } else {
    text = `${hours} hour${hours > 1 ? 's' : ''} left`;
  }

  return {
    text,
    daysLeft: days,
  };
};

const getExpiryColor = (daysLeft) => {
  if (daysLeft < 0) return "bg-red-100 text-red-700"; // Expired
  if (daysLeft < 7) return "bg-red-50 text-red-600"; // Less than 7 days
  if (daysLeft < 30) return "bg-yellow-50 text-yellow-600"; // Less than 30 days
  return "bg-green-50 text-green-600"; // More than 30 days
};


const ConfigureDialog = () => {
  return (
    <div className="bg-white rounded-lg p-4 z-[999] absolute top-0 left-0 ">
      <h2 className="text-lg font-semibold mb-2">Configure</h2>
      <p className="text-gray-600 mb-4">Configure your listing here.</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setIsConfigure(false)}>
        Close
      </button>
    </div>
  );
}
export default YourListing;