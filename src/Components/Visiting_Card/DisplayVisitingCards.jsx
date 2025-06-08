import React, { useEffect, useState } from "react";
import { PencilIcon, Trash2 } from "lucide-react";
import {
  deleteCategoryAsync,
  fetchCategoriesAsync,
} from "../../Redux/Features/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "../../ui/Dialog";
import EditCategoryForm from "../Forms/Category/EditCategoryForm";
import Snackbars from "../../ui/Snackbars";
import Loader from "../../ui/Loader";
import ConfirmationDialog from "../../ui/ConfirmationDialog";
import {
  deleteVisitingCardPricingAsync,
  fetchVisitingCardsList,
} from "../../Redux/Features/visitingCardSlice";
import EditVisitingCard from "../Forms/Visiting Card/EditVisitingCard";

const DisplayVisitingCards = () => {
  const dispatch = useDispatch();
  const { visitingCardsList, status, deleteStatus } = useSelector(
    (state) => state.visitingCards
  );
  const [selected, setSelected] = useState();
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVisitingCardsList());
    }
  }, [status, dispatch]);

  console.log("visitingCardsList", visitingCardsList);

  const deleteHandler = async (id) => {
    try {
      const res = await dispatch(deleteVisitingCardPricingAsync(id)).unwrap();
      console.log("visiting card deleted successfully", res);
      if (res) {
        setSnackbar({
          open: true,
          type: "success",
          text: "Entry Deleted Successfully",
        });
      }
    } catch (error) {
      console.error("Failed to delete entry:", error);
      setSnackbar({
        open: true,
        type: "error",
        text: "Error Deleting Entry !!",
      });
    } finally {
      setTimeout(() => {
        setIsDeleteDialogOpen(false);
      }, 500);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg dark:bg-darkgrey overflow-hidden h-[33rem] overflow-y-auto">
      <div className="overflow-x-auto">
        <table className="w-full h-full table-fixed">
          <thead>
            <tr className="text-base text-white uppercase bg-blue border">
              <th className="py-5 px-3">Name</th>
              <th className="py-5 px-3">Price</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {status === "loading" ? (
              <tr>
                <td colSpan={3}>
                  <div className="flex items-center justify-center my-5">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : visitingCardsList && visitingCardsList?.length > 0 ? (
              visitingCardsList.map((vc) => (
                <tr
                  key={vc.id}
                  className="border border-[rgba(0, 0, 0, 0.06)] text-[#565656] dark:text-lightPrimary"
                >
                  <td className="py-3 px-3 text-center">{vc.name}</td>
                  <td className="py-3 px-3 text-center">
                    {vc.price ? `Rs. ${vc.price}` : "Free"}
                  </td>
                  <td className="py-3">
                    <div className="flex justify-center space-x-4">
                      <Dialog
                        trigger={
                          <button
                            className="flex justify-center items-center gap-1 font-semibold text-white bg-[#49B27A] py-2 px-3 text-sm rounded-md"
                            onClick={() => setSelected(vc)}
                          >
                            <PencilIcon size={14} />
                            <h1>Modify</h1>
                          </button>
                        }
                        width="w-[35%]"
                        height="h-[45%]"
                      >
                        <EditVisitingCard data={selected} />
                      </Dialog>
                      <button
                        className="flex justify-center items-center gap-1 font-semibold text-white bg-[#FE043C] py-2 px-3 text-sm rounded-md"
                        onClick={() => {
                          setIsDeleteDialogOpen(true);
                          setId(vc.id);
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
                <td colSpan={3} className="text-center py-5 font-[600]">
                  No Categories Available
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
          deleteHandler(id);
        }}
        title="Confirm Action"
        message={`Are you sure you want to delete this category.`}
        isLoading={deleteStatus === "loading"}
      />
    </div>
  );
};

export default DisplayVisitingCards;
