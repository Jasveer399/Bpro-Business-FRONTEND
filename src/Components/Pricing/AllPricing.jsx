import React, { useEffect, useState } from "react";
import { PencilIcon, Trash2 } from "lucide-react";
import { deleteCategoryAsync } from "../../Redux/Features/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "../../ui/Dialog";
import EditCategoryForm from "../Forms/Category/EditCategoryForm";
import Snackbars from "../../ui/Snackbars";
import {
  deletePlanAsync,
  fetchPlansAsync,
} from "../../Redux/Features/PlansSlice";
import EditPlan from "../Forms/Pricing/EditPlan";
import Loader from "../../ui/Loader";
import ConfirmationDialog from "../../ui/ConfirmationDialog";

const AllPricing = () => {
  const dispatch = useDispatch();
  const { plans, plansStatus, error } = useSelector((state) => state.plans);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [planId, setPlanId] = useState(null);

  useEffect(() => {
    if (plansStatus === "idle") {
      dispatch(fetchPlansAsync());
    }
  }, [plansStatus, dispatch]);

  const deleteHandler = async (id) => {
    try {
      const res = await dispatch(deletePlanAsync(id)).unwrap();
      console.log("Plan deleted successfully", res);
      if (res) {
        setSnackbar({
          open: true,
          type: "success",
          text: "Plan Deleted Successfully",
        });
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
      setSnackbar({
        open: true,
        type: "error",
        text: "Error Deleting Plan !!",
      });
    } finally {
      setTimeout(() => {
        setIsDeleteDialogOpen(false);
      }, 500);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg mx-3 dark:bg-darkgrey overflow-hidden h-[33rem] overflow-y-auto">
      <div className="overflow-x-auto">
        <table className="w-full h-full table-fixed">
          <thead>
            <tr className="text-base text-white uppercase bg-blue border">
              <th className="py-5 px-3">Plan Title</th>
              <th className="py-5 px-3">Plan Price</th>
              <th className="py-5 px-3">Plan Discount</th>
              <th className="py-5 px-3">Plan Duration</th>
              <th className="py-5 px-3">Features</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {plansStatus === "loading" ? (
              <tr>
                <td colSpan={5}>
                  <div className="flex items-center justify-center my-5">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : plans && plans.length > 0 ? (
              plans.map((plan) => (
                <tr
                  key={plan.id}
                  className="border border-[rgba(0, 0, 0, 0.06)] text-[#565656] dark:text-lightPrimary"
                >
                  <td className="py-3 px-3 text-center">{plan.planName}</td>
                  <td className="py-3 px-3 text-center">₹ {plan.planPrice}</td>
                  <td className="py-3 px-3 text-center">
                    {plan.planDiscount}%
                  </td>
                  <td className="py-3 px-3 text-center">{plan.planDuration}</td>
                  <td className="py-3 px-3 text-center">
                    <div>
                      <div>{plan.locationCount} Locations</div>
                    </div>
                    {plan.planFeatures.map((feature) => (
                      <div>{feature}</div>
                    ))}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex justify-center space-x-2">
                      <Dialog
                        trigger={
                          <button
                            className="flex justify-center items-center gap-1 font-semibold text-white bg-[#49B27A] py-2 px-3 text-sm rounded-md"
                            onClick={() => setSelectedPlan(plan)}
                          >
                            <PencilIcon size={14} />
                            <h1>Modify</h1>
                          </button>
                        }
                        width="w-[35%]"
                        height="h-[70%]"
                      >
                        <EditPlan plan={selectedPlan} />
                      </Dialog>
                      <button
                        className="flex justify-center items-center gap-1 font-semibold text-white bg-[#FE043C] py-2 px-3 text-sm rounded-md"
                        onClick={() => {
                          setIsDeleteDialogOpen(true);
                          setPlanId(plan.id);
                        }}
                      >
                        <Trash2 size={14} />
                        <h1>Delete</h1>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-5 font-[600]">
                  No Plans Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
          deleteHandler(planId);
        }}
        title="Confirm Action"
        message={`Are you sure you want to delete this plan.`}
        isLoading={plansStatus === "loading"}
      />
    </div>
  );
};

export default AllPricing;
