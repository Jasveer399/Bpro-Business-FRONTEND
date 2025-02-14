import React, { useEffect, useState } from "react";
import { PencilIcon, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWorkersAsync,
  setWorker,
} from "../../Redux/Features/workersSlice";
import { FaDownload } from "react-icons/fa6";
import * as XLSX from "xlsx";
import Loader from "../../ui/Loader";
import Snackbars from "../../ui/Snackbars";
import { calculateRemainingDays } from "../../Utils/Helper";

const DealersDetails = () => {
  const dispatch = useDispatch();
  const { worker, status, error } = useSelector((state) => state.workers);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const { id } = useParams();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWorkersAsync());
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(setWorker(id));
  }, [status, dispatch, worker]);

  const downloadExcel = () => {
    if (!worker?.Dealer?.length) {
      setSnackbar({
        open: true,
        type: "error",
        text: "No Dealers Available",
      });
      return;
    }

    // Transform data for Excel
    const excelData = worker.Dealer.map((dealer) => ({
      "Dealer Name": dealer.fullName,
      "Area Name": dealer.areaName,
      "Business Name": dealer.businessName,
      "Business Type": dealer.businessType,
      City: dealer.city,
      State: dealer.state,
      Country: dealer.country,
      Email: dealer.email,
      "GST Number": dealer.gstNo,
      "Mobile Number": dealer.mobileNo,
      Pincode: dealer.pincode,
      "Street Number": dealer.streetNo,
      "VAT Number": dealer.vatNo,
      "Created At": new Date(dealer.created_at).toLocaleDateString(),
      "Agent ID": worker.workerId,
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dealers");

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Download file
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Dealers_${
      worker.workerId
    }_${new Date().toLocaleDateString()}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="px-8">
      <div className="flex justify-between items-center bg-transparent pb-3 px-5 font-montserrat mt-20 mx-3">
        <h1 className="text-xl font-bold">Workers Area - Dealers</h1>
        <div className="flex items-center gap-3">
          <FaDownload
            className="cursor-pointer hover:text-blue text-xl"
            onClick={downloadExcel}
            title="Download Dealers Data"
          />
          <h2 className="font-semibold">
            TOTAL: {worker?.Dealer?.length || 0}
          </h2>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg mx-3 dark:bg-darkgrey overflow-hidden font-montserrat h-[33rem] overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="w-full h-full">
            <thead>
              <tr className="text-base text-white uppercase bg-blue border">
                <th className="py-5 px-3">Dealer Name</th>
                <th className="py-5 px-3">Business Name</th>
                <th className="py-5 px-3">Agent Id</th>
                <th className="py-5 px-3">Location</th>
                <th className="py-5 px-3">Plan</th>
              </tr>
            </thead>
            <tbody>
              {status === "loading" ? (
                <tr>
                  <td colSpan={5}>
                    <div className="flex items-center justify-center my-5">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : worker && worker?.Dealer?.length > 0 ? (
                worker?.Dealer?.map((dealer) => (
                  <tr
                    key={dealer.id}
                    className="border border-[rgba(0, 0, 0, 0.06)] text-[#565656] dark:text-lightPrimary"
                  >
                    <td className="py-5 text-center">{dealer.fullName}</td>
                    <td className="py-5 text-center">{dealer.businessName}</td>
                    <td className="py-5 text-center">{worker.workerId}</td>
                    <td className="py-5 text-center">
                      {dealer.city}, {dealer.state}
                    </td>
                    <td className="py-5 text-center">
                      <span
                        className={`px-2 py-1 rounded-full font-semibold text-[#49B27A]`}
                      >
                        {calculateRemainingDays(dealer.created_at  , dealer.Plan.planDuration)} Days Left
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-5 font-[600]">
                    No Dealers Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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

export default DealersDetails;
