import React from "react";
import AllWorkers from "../../Components/Workers/AllWorkers";
import Dialog from "../../ui/Dialog";
import AddWorkerForm from "../../Components/Forms/Worker/AddWorkerForm";

function Workers() {
  return (
    <div className="w-full h-full dark:bg-darkPrimary px-4 sm:px-6 lg:px-8 xl:px-10 py-6 lg:py-8 overflow-y-auto custom-scrollbar">
      <div className="mt-16">
        <div className="flex justify-between items-center mb-4 px-4 mt-20">
          <h2 className="text-xl font-semibold dark:text-colorText">
            All Workers
          </h2>
          <Dialog
            trigger={
              <button className="bg-blue px-3 rounded-md font-semibold text-white py-1">
                Add Worker
              </button>
            }
            width="w-[30%]"
            height="h-[40%]"
          >
            <AddWorkerForm />
          </Dialog>
        </div>
        <AllWorkers />
      </div>
    </div>
  );
}

export default Workers;
