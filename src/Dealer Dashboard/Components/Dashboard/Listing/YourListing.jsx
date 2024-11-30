import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAsync, fetchProductsAsync } from "../../../../Redux/Features/productSlice";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { BiBarChart } from "react-icons/bi";
import { FiTrendingUp } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { HiOutlineLockClosed, HiOutlineChartSquareBar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../../../ui/ConfirmationDialog";
import Snackbars from "../../../../ui/Snackbars";

function YourListing() {
  const { status, error, products } = useSelector((state) => state.products);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsAsync());
    }
  }, [dispatch, status]);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

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
            {products?.map((listing, index) => {
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
                        src={listing.images && listing.images.length > 0 ? listing.images[0] : '/box.png'}
                        alt={listing.title}
                        className="w-16 h-16 rounded-md"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{listing.title}</p>
                      <p className="text-[#ef5d50] font-semibold text-lg flex items-center">
                        <FaRupeeSign size={15} />
                        {`${listing.insertPrice}`}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${expiryColorClass}`}
                    >
                      {timeLeft.text}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold dark:text-black ${listing.status === "active"
                        ? "bg-green-200"
                        : "bg-red-200"
                        }`}
                    >
                      {listing.status}
                    </span>
                  </td>
                  <td className="py-3 text-center">L{index + 1}</td>
                  <td className="py-3">
                    <div className="flex justify-center space-x-2 relative">
                      <button
                        className="flex justify-center items-center gap-1 text-[#0967d2] bg-[#eaeff5] py-1 px-4 text-sm rounded-md"
                        onClick={() => toggleDropdown(listing.id)}
                      >
                        <h1>Configure</h1>
                        {activeDropdown === listing.id ? (
                          <MdKeyboardArrowUp />
                        ) : (
                          <MdKeyboardArrowDown />
                        )}
                      </button>
                      {activeDropdown === listing.id && (
                        <ConfigureDialog status={status} setActiveDropdown={setActiveDropdown} product={listing} />
                      )}
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

  if (diff < 0) {
    return { text: "Expired", daysLeft: -1 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  let text;
  if (years > 0) text = `${years} year${years > 1 ? "s" : ""} left`;
  else if (months > 0) text = `${months} month${months > 1 ? "s" : ""} left`;
  else if (days > 0) text = `${days} day${days > 1 ? "s" : ""} left`;
  else text = `${hours} hour${hours > 1 ? "s" : ""} left`;

  return { text, daysLeft: days };
};

const getExpiryColor = (daysLeft) => {
  if (daysLeft < 0) return "bg-red-100 text-red-700";
  if (daysLeft < 7) return "bg-red-50 text-red-600";
  if (daysLeft < 30) return "bg-yellow-50 text-yellow-600";
  return "bg-green-50 text-green-600";
};

const ConfigureDialog = ({ status, product }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleProductDelete = async (productId) => {
    const response = await dispatch(deleteProductAsync(productId));
    if (deleteProductAsync.fulfilled.match(response)) {
      console.log("Product Delete Response ==============>", response);
      console.log("Product Deleted Successfully", deleteProductAsync.fulfilled.match(response));
      setSnackbar({
        open: true,
        type: "success",
        text: response.payload.message,
      });
      setTimeout(() => {
        setIsDeleteDialogOpen(false);
      }, 500);
    } else {
      setSnackbar({
        open: true,
        type: "error",
        text: response.error.message,
      });
      throw new Error(response.error.message);
    }
  }
  const options = [
    { label: "Edit Listing", icon: <AiOutlineEdit />, onClick: () => navigate(`/my-dashboard/edit-product-detail/${product.id}`) },
    { label: "Upgrade", icon: <BiBarChart /> },
    { label: "BumpUp To Top", icon: <FiTrendingUp /> },
    { label: "Performance", icon: <HiOutlineChartSquareBar /> },
    { label: "Preview", icon: <AiOutlineEye />, onClick: () => navigate(`/my-dashboard/product-detail/${product.id}`) },
    { label: "Publish/Private", icon: <HiOutlineLockClosed /> },
    { label: "Note To Admin", icon: <RiAdminLine /> },
    {
      label: "Delete", icon: <AiOutlineDelete />, onClick: () => {
        console.log("Delete clicked");
        setIsDeleteDialogOpen(true);
        // setActiveDropdown(false);
        setIdToDelete(product.id)
      }
    },
  ];

  return (
    <>
      <div className="bg-white text-black rounded-lg z-10 p-px absolute top-8 left-3 w-40 shadow-lg">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-2 text-sm py-1 cursor-pointer hover:bg-gray-200 rounded-md"
            onClick={option.onClick}
          >
            {option.icon}
            <span>{option.label}</span>
          </div>
        ))}</div>

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => handleProductDelete(idToDelete)}
        title="Confirm Action"
        message="Are you sure you want to delete this Product."
        isLoading={status === "loading"}
      />
      <Snackbars
        open={snackbar.open}
        type={snackbar.type}
        text={snackbar.text}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
};

export default YourListing;
