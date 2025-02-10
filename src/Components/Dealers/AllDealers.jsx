import React, { useEffect, useState } from "react";
import { PencilIcon, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDealerAsync,
  fetchDealersAsync,
} from "../../Redux/Features/dealersSlice";
import Loader from "../../ui/Loader";
import Snackbars from "../../ui/Snackbars";
import ConfirmationDialog from "../../ui/ConfirmationDialog";
import { calculateRemainingDays } from "../../Utils/Helper";

const AllDealers = () => {
  const dispatch = useDispatch();
  const { dealers, fetchStatus, error, status } = useSelector((state) => state.dealers);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const [dealer, setDealer] = useState();

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchDealersAsync());
    }
  }, [fetchStatus, dispatch]);

  const deleteHandler = async (id) => {
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
    } catch (error) {
      console.error("Failed to suspend dealer:", error);
      setSnackbar({
        open: true,
        type: "error",
        text: "Error dealer suspending",
      });
    } finally {
      setTimeout(() => {
        setIsDeleteDialogOpen(false)
      }, 500)
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-transparent pb-5 px-5 font-montserrat">
        <h1 className="text-xl font-bold">Dealers</h1>
        <h2 className="font-semibold">TOTAL: {dealers?.length || 0}</h2>
      </div>
      <div className="bg-white rounded-xl shadow-lg mx-3 dark:bg-darkgrey overflow-hidden font-montserrat h-[33rem] overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="w-full h-full">
            <thead>
              <tr className="text-base text-white uppercase bg-blue border">
                <th className="py-5 px-3">Dealer Name</th>
                <th className="py-5 px-3">Business Name</th>
                <th className="py-5 px-3">Agent Id</th>
                <th className="py-5 px-3">Location</th>
                <th className="py-5 px-3">Plan</th>
                <th className="py-5 px-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {fetchStatus === "loading" ? (
                <tr>
                  <td colSpan={6}>
                    <div className="flex items-center justify-center my-5">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : dealers && dealers.length > 0 ? (
                dealers.map((dealer) => (
                  <tr
                    key={dealer.id}
                    className="border border-[rgba(0, 0, 0, 0.06)] text-[#565656] dark:text-lightPrimary"
                  >
                    <td className="py-5 text-center">{dealer.fullName}</td>
                    <td className="py-5 text-center">{dealer.businessName}</td>
                    <td className="py-5 text-center">
                      {dealer?.Worker?.workerId}
                    </td>
                    <td className="py-5 text-center">
                      {dealer.city}, {dealer.state}
                    </td>
                    <td className="py-5 text-center">
                      <span
                        className={`px-2 py-1 rounded-full font-semibold text-[#49B27A]`}
                      >
                          {calculateRemainingDays(dealer.created_at  , dealer.Plan.planDuration)}
                      </span>
                    </td>
                    <td className="py-5 flex justify-center gap-4">
                      <Link
                        to={`/dealers/view-profile/${dealer.id}`}
                        className="bg-[#49B27A] text-white text-sm py-2 px-3 rounded-md font-semibold cursor-pointer"
                      >
                        VIEW PROFILE
                      </Link>
                      {dealer.verified ? (
                        dealer.isSuspend ? (
                          <div className="bg-[#FE043C] text-white text-sm py-2 px-3 rounded-md font-semibold cursor-pointer">
                            SUSPENDED
                          </div>
                        ) : (
                          <div
                            className="bg-[#FE043C] text-white text-sm py-2 px-3 rounded-md font-semibold cursor-pointer"
                            onClick={() => {
                              setIsDeleteDialogOpen(true);
                              setDealer(dealer.id);
                            }}
                          >
                            SUSPEND
                          </div>
                        )
                      ) : (
                        <div className="bg-secondary text-white text-sm py-2 px-3 rounded-md font-semibold cursor-pointer">
                          PENDING
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-5 font-[600]">
                    No Dealers Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Snackbars
        open={snackbar.open}
        type={snackbar.type}
        text={snackbar.text}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          deleteHandler(dealer);
        }}
        title="Confirm Action"
        message={`Are you sure you want to suspend this Dealer.`}
        isLoading={status === "loading"}
      />
    </>
  );
};

export default AllDealers;
