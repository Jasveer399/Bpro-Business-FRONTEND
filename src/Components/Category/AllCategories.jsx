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
  const [selectedCategory, setSelectedCategory] = useState();

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
    <div className="bg-white rounded-xl shadow-lg mx-3 dark:bg-darkgrey overflow-hidden h-[34rem] overflow-y-auto">
      <div className="overflow-x-auto">
        <table className="w-full h-full">
          <thead>
            <tr className="text-base text-white uppercase bg-blue border">
              <th className="py-5 px-3">Title</th>
              <th className="py-5 px-3">Icon</th>
              <th className="py-5 px-3">Image</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody >
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
                      width="w-[30%]"
                      height="h-[55%]"
                    >
                      <EditCategoryForm category={selectedCategory} />
                    </Dialog>
                    <button
                      className="flex justify-center items-center gap-1 font-semibold text-white bg-[#FE043C] py-2 px-3 text-sm rounded-md"
                      onClick={() => deleteHandler(category.id)}
                    >
                      <Trash2 size={14} />
                      <h1>Delete</h1>
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
