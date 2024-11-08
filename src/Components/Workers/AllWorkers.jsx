import React, { useEffect, useState } from "react";
import { PencilIcon, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWorkerAsync,
  fetchWorkersAsync,
} from "../../Redux/Features/workersSlice";
import Dialog from "../../ui/Dialog";
import EditWorkerForm from "../Forms/Worker/EditWorkerForm";

const AllWorkers = () => {
  const dispatch = useDispatch();
  const { workers, status, error } = useSelector((state) => state.workers);
  const [selectedWorker, setSelectedWorker] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWorkersAsync());
    }
  }, [status, dispatch]);

  const deleteHandler = async (id) => {
    try {
      await dispatch(deleteWorkerAsync(id)).unwrap();
      console.log("Worker deleted successfully");
      closeDialog();
    } catch (error) {
      console.error("Failed to delete worker:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg mx-3 dark:bg-darkgrey overflow-hidden h-[33rem] overflow-y-auto">
      <div className="overflow-x-auto">
        <table className="w-full h-full">
          <thead>
            <tr className="text-base text-white uppercase bg-blue border">
              <th className="py-5 px-3">Worker Name</th>
              <th className="py-5 px-3">Worker ID</th>
              <th className="py-5 px-3">Mobile No.</th>
              <th className="py-5 px-3">Created At</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {workers?.map((worker) => (
              <tr
                key={worker.id}
                className="border border-[rgba(0, 0, 0, 0.06)] text-[#565656] dark:text-lightPrimary"
              >
                <td className="py-5 text-center">{worker.name}</td>
                <td className="py-5 text-center">{worker.workerId}</td>
                <td className="py-5 text-center">{worker.mobileNo}</td>
                <td className="py-5 text-center">
                  {worker.created_at?.split("T")[0]}
                </td>
                <td className="py-5">
                  <div className="flex justify-center gap-3">
                    <Dialog
                      trigger={
                        <button
                          className="flex justify-center items-center gap-1 font-semibold text-white bg-[#49B27A] py-2 px-3 text-sm rounded-md"
                          onClick={() => setSelectedWorker(worker)}
                        >
                          <PencilIcon size={14} />
                          <h1>Modify</h1>
                        </button>
                      }
                      width="w-[30%]"
                      height="h-[40%]"
                    >
                      <EditWorkerForm worker={selectedWorker} />
                    </Dialog>
                    <button
                      className="flex justify-center items-center gap-1 font-semibold text-white bg-[#FE043C] py-2 px-3 text-sm rounded-md"
                      onClick={() => deleteHandler(worker.id)}
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

export default AllWorkers;
