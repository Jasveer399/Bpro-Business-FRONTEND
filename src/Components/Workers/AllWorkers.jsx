import React, { useEffect, useState } from "react";
import { PencilIcon, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWorkerAsync,
  fetchWorkersAsync,
} from "../../Redux/Features/workersSlice";
import Dialog from "../../ui/Dialog";
import EditWorkerForm from "../Forms/Worker/EditWorkerForm";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import Snackbars from "../../ui/Snackbars";

const AllWorkers = ({ selectedYear, selectedMonth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { workers, status, error } = useSelector((state) => state.workers);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const [selectedWorker, setSelectedWorker] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWorkersAsync());
    }
  }, [status, dispatch]);

  const deleteHandler = async (id) => {
    try {
      const res = await dispatch(deleteWorkerAsync(id)).unwrap();
      console.log("Worker deleted successfully", res);
      if (res === id) {
        setSnackbar({
          open: true,
          type: "success",
          text: "Worker Deleted Successfully",
        });
      }
    } catch (error) {
      console.error("Failed to delete worker:", error);
    }
  };

  const getDealerCount = (worker, year, month) => {
    if (!worker.Dealer) return 0;

    return worker.Dealer.filter((dealer) => {
      const dealerDate = new Date(dealer.created_at);
      return (
        dealerDate.getFullYear().toString() === year &&
        dealerDate.getMonth().toString() === month
      );
    }).length;
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
              <th className="py-5 px-3">Adhaar No.</th>
              <th className="py-5 px-3">Created At</th>
              <th className="py-5 px-3">Dealers Count</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {status === "loading" ? (
              <tr>
                <td colSpan={7}>
                  <div className="flex items-center justify-center my-5">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : workers && workers?.length > 0 ? (
              workers?.map((worker) => (
                <tr
                  key={worker.id}
                  className="border border-[rgba(0, 0, 0, 0.06)] text-[#565656] dark:text-lightPrimary"
                >
                  <td className="py-5 text-center">{worker.name}</td>
                  <td className="py-5 text-center">{worker.workerId}</td>
                  <td className="py-5 text-center">{worker.mobileNo}</td>
                  <td className="py-5 text-center">{worker.adhaarNo}</td>
                  <td className="py-5 text-center">
                    {worker.created_at?.split("T")[0]}
                  </td>
                  <td className="py-5 flex items-center justify-center mt-1 gap-2">
                    {getDealerCount(worker, selectedYear, selectedMonth)}
                    <MdRemoveRedEye
                      className="cursor-pointer"
                      onClick={() => {
                        navigate(`/workers/dealers-details/${worker.id}`);
                      }}
                    />
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
                        width="w-[40%]"
                        height="h-[60%]"
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
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-5 font-[600]">
                  No Workers Available
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
    </div>
  );
};

export default AllWorkers;
