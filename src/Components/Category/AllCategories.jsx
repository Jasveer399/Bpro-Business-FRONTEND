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

const AllCategories = () => {
  const dispatch = useDispatch();
  const { categories, status, error, deleteStatus } = useSelector(
    (state) => state.categories
  );
  const [selectedCategory, setSelectedCategory] = useState();
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategoriesAsync());
    }
  }, [status, dispatch]);

  const deleteHandler = async (id) => {
    try {
      const res = await dispatch(deleteCategoryAsync(id)).unwrap();
      console.log("Category deleted successfully", res);
      if (res) {
        setSnackbar({
          open: true,
          type: "success",
          text: "Category Deleted Successfully",
        });
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
      setSnackbar({
        open: true,
        type: "error",
        text: "Error Deleting Category !!",
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
        <table className="w-full h-full">
          <thead>
            <tr className="text-base text-white uppercase bg-blue border">
              <th className="py-5 px-3">Title</th>
              <th className="py-5 px-3">Icon</th>
              {/* <th className="py-5 px-3">Image</th> */}
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
            ) : categories && categories?.length > 0 ? (
              categories.map((category) => (
                <tr
                  key={category.id}
                  className="border border-[rgba(0, 0, 0, 0.06)] text-[#565656] dark:text-lightPrimary"
                >
                  <td className="py-3 px-3 text-center">{category.title}</td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex justify-center">
                      <img
                        src={category.iconImgUrl}
                        className="w-28 h-14 rounded-md"
                      />
                    </div>
                  </td>
                  {/* <td className="py-3 px-3 text-center">
                    <div className="flex justify-center">
                      <img
                        src={category.categoryImgUrl}
                        className="w-28 h-14 rounded-md"
                      />
                    </div>
                  </td> */}
                  <td className="py-3">
                    <div className="flex justify-center space-x-4">
                      <Dialog
                        trigger={
                          <button
                            className="flex justify-center items-center gap-1 font-semibold text-white bg-[#49B27A] py-2 px-3 text-sm rounded-md"
                            onClick={() => setSelectedCategory(category)}
                          >
                            <PencilIcon size={14} />
                            <h1>Modify</h1>
                          </button>
                        }
                        width="w-[35%]"
                        height="h-[61%]"
                      >
                        <EditCategoryForm category={selectedCategory} />
                      </Dialog>
                      <button
                        className="flex justify-center items-center gap-1 font-semibold text-white bg-[#FE043C] py-2 px-3 text-sm rounded-md"
                        onClick={() => {
                          setIsDeleteDialogOpen(true);
                          setCategoryId(category.id);
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
          deleteHandler(categoryId);
        }}
        title="Confirm Action"
        message={`Are you sure you want to delete this category.`}
        isLoading={deleteStatus === "loading"}
      />
    </div>
  );
};

export default AllCategories;
