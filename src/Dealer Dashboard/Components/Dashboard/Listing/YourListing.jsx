import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProductAsync } from "../../../../Redux/Features/productSlice";
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
import { createPortal } from "react-dom";
import Loader from "../../../../ui/Loader";

function YourListing({ status, products }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const dropdownRefs = useRef({});
  const dispatch = useDispatch()

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest(".configure-dropdown")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  const handleProductDelete = async (productId) => {
    const response = await dispatch(deleteProductAsync(productId));
    if (deleteProductAsync.fulfilled.match(response)) {
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
  };

  return (
    <>
      <div className="bg-white rounded-md shadow-lg mt-2 dark:bg-darkgrey overflow-hidden overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="w-full h-full">
            {/* Table header remains the same */}
            <thead>
              <tr className="text-base uppercase bg-[#f6f8fa] border">
                <th className="py-5 px-3">Image</th>
                <th className="py-5 px-3">Title</th>
                <th className="py-5 px-3">Price</th>
                <th className="py-5 px-3">Discount</th>
                <th className="py-5 px-3">Discount Price</th>
                <th className="py-5 px-3">Total Price</th>
                <th className="py-5 px-3">Status</th>
                <th className="py-5 px-3">Listing ID</th>
                <th className="py-5 px-3">Setting</th>
              </tr>
            </thead>
            <tbody>
              {status === "loading" ? (
                <tr>
                  <td colSpan={9}>
                    <div className="flex items-center justify-center my-5 py-10">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : products && products.length > 0 ? (
                products.map((listing, index) => (
                  <tr
                    key={listing.id}
                    className="border border-[rgba(0, 0, 0, 0.06)] text-[#565656] dark:text-lightPrimary"
                  >
                    <td className=" py-3">
                      <div className="flex items-center justify-center">
                        <img
                          src={listing?.images[0]}
                          alt={listing.title}
                          className="w-16 h-16 rounded-md object-contain"
                        />
                      </div>
                    </td>
                    <td className="py-3">
                      <div className=" flex justify-center">
                        <p className="font-semibold">
                          {listing.title.slice(0, 20) + "..."}
                        </p>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center justify-center">
                        <p className="text-green-800 font-semibold text-lg flex items-center">
                          <FaRupeeSign size={15} />
                          {`${
                            listing?.insertPriceAfterDiscount > 0
                              ? listing?.insertPriceAfterDiscount.toFixed(2)
                              : listing?.insertPrice.toFixed(2)
                          }`}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 text-center text-primary font-semibold">
                      {listing?.discount || 0}%
                    </td>
                    <td className="py-3 text-center text-primary font-semibold">
                      <div className="flex items-center justify-center">
                        <FaRupeeSign size={15} />
                        {`${
                          listing?.insertPriceAfterDiscount > 0
                            ? Number(
                                listing.insertPrice -
                                  listing?.insertPriceAfterDiscount
                              ).toFixed(2)
                            : 0
                        }`}
                        {/* </p> */}
                      </div>
                    </td>
                    <td className="py-3 text-center text-[#ef5d50] font-semibold">
                      <div className="flex items-center justify-center">
                        <FaRupeeSign size={15} />
                        {`${listing?.insertPrice.toFixed(2)}`}
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs capitalize font-semibold dark:text-black ${
                          listing.status === "active"
                            ? "bg-green-200"
                            : "bg-red-200"
                        }`}
                      >
                        {listing.status}
                      </span>
                    </td>
                    <td className="py-3 text-center uppercase">
                      {listing.id.slice(0, 5)}
                    </td>
                    <td className="py-3">
                      <div className="flex justify-center space-x-2 relative configure-dropdown">
                        <button
                          ref={(el) => (dropdownRefs.current[listing.id] = el)}
                          className="flex relative justify-center items-center gap-1 text-[#0967d2] bg-[#eaeff5] py-1 px-4 text-sm rounded-md"
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
                          <ConfigureDialog
                            status={status}
                            setActiveDropdown={setActiveDropdown}
                            product={listing}
                            buttonRef={dropdownRefs.current[listing.id]}
                            position={
                              products?.length - 1 === index
                                ? "bottom-10 left-4"
                                : "top-10 left-4"
                            }
                            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                            setIdToDelete={setIdToDelete}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9}>
                    <div className="flex items-center justify-center my-5">
                      <h1 className="text-2xl font-semibold">
                        No Listings Found
                      </h1>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
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
}

const ConfigureDialog = ({
  status,
  setActiveDropdown,
  product,
  buttonRef,
  position,
  setIsDeleteDialogOpen,
  setIdToDelete,
}) => {
  const navigate = useNavigate();

  const options = [
    {
      label: "Edit Listing",
      icon: <AiOutlineEdit />,
      onClick: () =>
        navigate(`/my-dashboard/edit-product-detail/${product.id}`),
    },
    // { label: "Upgrade", icon: <BiBarChart /> },
    // { label: "BumpUp To Top", icon: <FiTrendingUp /> },
    // { label: "Performance", icon: <HiOutlineChartSquareBar /> },
    {
      label: "Preview",
      icon: <AiOutlineEye />,
      onClick: () => navigate(`/my-dashboard/product-detail/${product.id}`),
    },
    // { label: "Publish/Private", icon: <HiOutlineLockClosed /> },
    // { label: "Note To Admin", icon: <RiAdminLine /> },
    {
      label: "Delete",
      icon: <AiOutlineDelete />,
      onClick: () => {
        setIsDeleteDialogOpen(true);
        setIdToDelete(product.id);
      },
    },
  ];

  return (
    <>
      <div
        className={`bg-white text-black rounded-lg z-50 p-px absolute ${position} shadow-[1px_1px_8px_4px_#00000024]`}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-2 text-sm py-1 cursor-pointer hover:bg-gray-200 rounded-md"
            onClick={() => {
              if (option.onClick) {
                option.onClick();
                setActiveDropdown(null);
              }
            }}
          >
            {option.icon}
            <span>{option.label}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default YourListing;
