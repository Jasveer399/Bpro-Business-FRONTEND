import React from "react";
import Dialog from "../../ui/Dialog";
import AllCategories from "../../Components/Category/AllCategories";
import AddCategoryForm from "../../Components/Forms/Category/AddCategoryForm";

function Category() {
  return (
    <div className="h-full dark:bg-darkPrimary font-montserrat">
      <div className="p-5">
        <div className="flex justify-between items-center mb-4 px-4 mt-20">
          <h2 className="text-xl font-semibold dark:text-colorText">
            All Categories
          </h2>
          <Dialog
            trigger={
              <button className="bg-blue px-3 rounded-md font-semibold text-white py-2 text-sm">
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
