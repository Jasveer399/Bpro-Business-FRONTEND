import React, { useEffect, useState } from "react";
import { PencilIcon, Trash2 } from "lucide-react";
import {
  deleteCategoryAsync,
  fetchCategoriesAsync,
} from "../../Redux/Features/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "../../ui/Dialog";
import EditCategoryForm from "../Forms/Category/EditCategoryForm";

const AllCategories = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );
  const [selectedCategory, setSelectedCategory] = useState()

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategoriesAsync());
    }
  }, [status, dispatch]);

  const deleteHandler = async (id) => {
    try {
      await dispatch(deleteCategoryAsync(id)).unwrap();
      console.log("Category deleted successfully");
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg mx-3 dark:bg-darkgrey overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-base text-white uppercase bg-[#565656] border">
              <th className="py-5 px-3">Title</th>
              <th className="py-5 px-3">Icon</th>
              <th className="py-5 px-3">Image</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
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
                <td className="py-3 px-3 text-center">
                  <div className="flex justify-center">
                    <img
                      src={category.categoryImgUrl}
                      className="w-28 h-14 rounded-md"
                    />
                  </div>
                </td>
                <td className="py-3 px-3">
                  <div className="flex justify-center space-x-2">
                    <button className="p-1">
                      <Dialog
                        trigger={<PencilIcon size={18} onClick={() => setSelectedCategory(category)} />}
                        width="w-[30%]"
                        height="h-[55%]"
                      >
                        <EditCategoryForm category={selectedCategory} />
                      </Dialog>
                    </button>
                    <button
                      className="p-1"
                      onClick={() => deleteHandler(category.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCategories;
