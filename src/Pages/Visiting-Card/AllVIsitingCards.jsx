import React from "react";
import Dialog from "../../ui/Dialog";
import AllCategories from "../../Components/Category/AllCategories";
import AddVisitingCard from "../../Components/Forms/Visiting Card/AddVisitingCard";
import DisplayVisitingCards from "../../Components/Visiting_Card/DisplayVisitingCards";

function AllVIsitingCards() {
  return (
    <div className="h-full dark:bg-darkPrimary font-montserrat">
      <div className="p-5">
        <div className="flex justify-between items-center mb-2 px-4 mt-16">
          <h2 className="text-xl font-semibold dark:text-colorText">
            Visiting Cards
          </h2>
          <Dialog
            trigger={
              <button className="bg-blue px-3 rounded-md font-semibold text-white py-2 text-sm">
                Add Visiting Card
              </button>
            }
            width="w-[35%]"
            height="h-[45%]"
          >
            <AddVisitingCard />
          </Dialog>
        </div>
        <DisplayVisitingCards />
      </div>
    </div>
  );
}

export default AllVIsitingCards;
