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

function DealerProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { dealer, status, fetchStatus } = useSelector((state) => state.dealers);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const [action, setAction] = useState("");

  useEffect(() => {
    if (fetchStatus === "idle") {
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

  const suspendDealer = async () => {
    try {
      const response = await dispatch(deleteDealerAsync(id)).unwrap();
      if (response === id) {
        setSnackbar({
          open: true,
          type: "success",
          text: "Dealer Suspended Successfully",
        });
      } else {
        setSnackbar({
          open: true,
          type: "error",
          text:
            response?.payload ||
            response?.error?.message ||
            "Error dealer suspending",
        });
      }
      setTimeout(() => {
        setIsDeleteDialogOpen(false);
      }, 500);
    } catch (error) {
      setSnackbar({
        open: true,
        type: "error",
        text: "Error dealer suspending",
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
            dealer.isSuspend ? (
              <button className="bg-[#FE043C] text-white text-sm py-2 px-3 rounded-md font-semibold cursor-pointer">
                Suspended
              </button>
            ) : (
              <button
                className="bg-[#FE043C] text-white text-sm py-2 px-3 rounded-md font-semibold cursor-pointer"
                onClick={() => {
                  setIsDeleteDialogOpen(true);
                  setAction("suspend");
                }}
              >
                Suspend
              </button>
            )
          ) : (
            <>
              <button
                className="bg-[#49B27A] text-white text-sm py-2 px-3 rounded-md font-semibold cursor-pointer"
                onClick={() => {
                  setIsDeleteDialogOpen(true);
                  setAction("approve");
                }}
              >
                Approve
              </button>
              <button
                className="bg-[#FE043C] text-white text-sm py-2 px-3 rounded-md font-semibold cursor-pointer"
                onClick={() => {
                  setIsDeleteDialogOpen(true);
                  setAction("reject");
                }}
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>
      <div className="w-full flex font-montserrat mb-8">
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
                {dealer?.website || "N/A"}
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
                {dealer?.vatNo || "N/A"}
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
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                Plan Name
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                {dealer?.Plan?.planName}
              </td>
            </tr>
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                Plan Duration
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                {dealer?.Plan?.planDuration}
              </td>
            </tr>
            <tr>
              <th className="py-[6px] px-3 border border-gray-400 text-left w-52">
                Plan Price
              </th>
              <td className="py-[6px] px-3 border border-gray-400 text-left w-56">
                {dealer?.Plan?.planPrice}
              </td>
            </tr>
          </table>
        </div>
        <div className="w-[50%]">
          {/* Aadhar Card Section */}
          <h1 className="text-xl font-semibold">Adhaar Card</h1>
          <div className="flex gap-4 mt-2">
            <div className="w-60 h-40 overflow-hidden rounded-lg border border-gray-200">
              <img
                src={dealer?.adhaarFrontUrl}
                alt="Adhaar Card Front"
                className="w-full h-full object-contain bg-gray-50"
              />
            </div>
            <div className="w-60 h-40 overflow-hidden rounded-lg border border-gray-200">
              <img
                src={dealer?.adhaarBackUrl}
                alt="Adhaar Card Back"
                className="w-full h-full object-contain bg-gray-50"
              />
            </div>
          </div>

          {/* PAN Card Section */}
          {dealer?.panFrontUrl ||
            (dealer?.panBackUrl && (
              <>
                <h1 className="text-xl font-semibold mt-5">PAN Card</h1>
                <div className="flex gap-4 mt-2">
                  <div className="w-60 h-40 overflow-hidden rounded-lg border border-gray-200">
                    <img
                      src={dealer?.panFrontUrl}
                      alt="PAN Card Front"
                      className="w-full h-full object-contain bg-gray-50"
                    />
                  </div>
                  <div className="w-60 h-40 overflow-hidden rounded-lg border border-gray-200">
                    <img
                      src={dealer?.panBackUrl}
                      alt="PAN Card Back"
                      className="w-full h-full object-contain bg-gray-50"
                    />
                  </div>
                </div>
              </>
            ))}

          {/* Business Documents Section */}
          {dealer?.docUrl?.length > 0 && (
            <>
              <h1 className="text-xl font-semibold mt-5">Business Documents</h1>
              <div className="grid grid-cols-2 gap-4 mt-2 mb-5">
                {dealer?.docUrl?.map((doc, index) => (
                  <div
                    key={index}
                    className="w-60 h-40 overflow-hidden rounded-lg border border-gray-200"
                  >
                    {doc?.toLowerCase().endsWith(".pdf") ? (
                      <a
                        href={doc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full h-full bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="text-center">
                          <svg
                            className="w-12 h-12 mx-auto text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span className="text-sm text-blue-600">
                            View PDF
                          </span>
                        </div>
                      </a>
                    ) : (
                      <img
                        src={doc}
                        alt={`Business Document ${index + 1}`}
                        className="w-full h-full object-contain bg-gray-50"
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          if (action === "approve") {
            approveDealer();
          } else if (action === "suspend") {
            suspendDealer();
          }
        }}
        title="Confirm Action"
        message={`Are you sure you want to ${action} this Dealer.`}
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
