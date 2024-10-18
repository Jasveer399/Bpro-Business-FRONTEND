import React from "react";
import Dialog from "../../ui/Dialog";
import AllCategories from "../../Components/Category/AllCategories";
import AddCategoryForm from "../../Components/Forms/Category/AddCategoryForm";

function Category() {
  return (
    <div className="h-[90vh] dark:bg-darkPrimary">
      <div className="p-5">
        <div className="flex justify-between items-center mb-4 px-4">
          <h2 className="text-xl font-semibold dark:text-colorText">
            All Categories
          </h2>
          <Dialog
            trigger={
              <button className="bg-blue px-3 rounded-md font-semibold dark:text-white py-1">
                Add Category
              </button>
            }
            width="w-[30%]"
            height="h-[55%]"
          >
            <AddCategoryForm />
          </Dialog>
        </div>
        <AllCategories />
      </div>
    </div>
  );
}

export default Category;
