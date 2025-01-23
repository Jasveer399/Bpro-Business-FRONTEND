import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  approveDealerAsync,
  deleteDealerAsync,
  fetchDealersAsync,
  setDealer,
} from "../../Redux/Features/dealersSlice";
import Snackbars from "../../ui/Snackbars";
import ConfirmationDialog from "../../ui/ConfirmationDialog";
import { set } from "react-hook-form";

function DealerProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { dealer, status } = useSelector((state) => state.dealers);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDealersAsync());
    }
  }, []);

  useEffect(() => {
    dispatch(setDealer(id));
  }, [status, dispatch]);

  const approveDealer = async () => {
    const response = await dispatch(approveDealerAsync(id));
    console.log("response", response);
    if (approveDealerAsync.fulfilled.match(response)) {
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
    }
  };

  console.log("dealer", dealer);

  const deleteDealer = async () => {
    const response = await dispatch(deleteDealerAsync(id));
    if (deleteDealerAsync.fulfilled.match(response)) {
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
    }
  };
  return (
    <>
      <div className="flex justify-between items-center bg-transparent pt-24 pb-5 px-5 font-montserrat">
        <h1 className="text-xl font-bold">
          <span className="uppercase">Dealer - {dealer?.fullName} </span>
          <span className="text-base">
            {dealer?.verified ? "" : "(Pending Approval)"}
          </span>
        </h1>
        <div className="flex items-center gap-4">
          {dealer?.verified ? (
            <button
              className="bg-[#FE043C] text-white text-sm py-2 px-3 rounded-md font-semibold cursor-pointer"
            //   onClick={() => setIsDeleteDialogOpen(true)}
            >
              Suspend
            </button>
          ) : (
            <>
              <button
                className="bg-[#49B27A] text-white text-sm py-2 px-3 rounded-md font-semibold cursor-pointer"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Approve
              </button>
              <button className="bg-[#FE043C] text-white text-sm py-2 px-3 rounded-md font-semibold cursor-pointer">
                Reject
              </button>
            </>
          )}
        </div>
      </div>
      <div className="w-full flex font-montserrat">
        <div className="w-[50%] px-5">
          <table className="border border-collapse">
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                Name
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                {dealer?.fullName}
              </td>
            </tr>
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                Email
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                {dealer?.email}
              </td>
            </tr>
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                Contact
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                +91 {dealer?.mobileNo}
              </td>
            </tr>
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                Business Name
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                {dealer?.businessName}
              </td>
            </tr>
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                Website
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                {dealer?.website}
              </td>
            </tr>
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                Business Type
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                {dealer?.businessType}
              </td>
            </tr>
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                Category
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                {dealer?.Category?.title}
              </td>
            </tr>
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                GST No.
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                {dealer?.gstNo}
              </td>
            </tr>
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                VAT No.
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                {dealer?.vatNo}
              </td>
            </tr>
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                Street No.
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                {dealer?.streetNo}
              </td>
            </tr>
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                Area/Landmark
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                {dealer?.areaName}
              </td>
            </tr>
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                City.
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                {dealer?.city}
              </td>
            </tr>
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                State
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                {dealer?.state}
              </td>
            </tr>
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                Pincode
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                {dealer?.pincode}
              </td>
            </tr>
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                Country
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                {dealer?.country}
              </td>
            </tr>
          </table>
        </div>
        <div className="w-[50%]">
          <h1 className="text-xl font-semibold">Adhaar Card</h1>
          <div className="flex gap-4">
            <img
              src={dealer?.adhaarFrontUrl}
              alt="Adhaar Card Front"
              className="w-60"
            />
            <img
              src={dealer?.adhaarBackUrl}
              alt="Adhaar Card Back"
              className="w-60"
            />
          </div>

          <h1 className="text-xl font-semibold mt-5">PAN Card</h1>
          <div className="flex gap-4">
            <img
              src={dealer?.panFrontUrl}
              alt="Adhaar Card Front"
              className="w-60"
            />
            <img
              src={dealer?.panBackUrl}
              alt="Adhaar Card Back"
              className="w-60"
            />
          </div>
          <h1 className="text-xl font-semibold mt-5">MSME / Visiting Card</h1>
          <div className="grid grid-cols-2 gap-4">
            {dealer?.docUrl.map((doc, index) => (
              <img src={doc} alt="Doc" className="w-60" />
            ))}
          </div>
        </div>
      </div>
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => approveDealer()}
        title="Confirm Action"
        message="Are you sure you want to Verified this Dealer."
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

export default DealerProfile;
