import React, { useEffect } from "react";
import { PencilIcon, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDealersAsync } from "../../Redux/Features/dealersSlice";

const AllDealers = () => {
  const dispatch = useDispatch();
  const { dealers, status, error } = useSelector((state) => state.dealers);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDealersAsync());
    }
  }, [status, dispatch]);

  //   const deleteHandler = async (id) => {
  //     try {
  //       await dispatch(deleteBannerAsync(id)).unwrap();
  //       console.log("Banner deleted successfully");
  //       closeDialog();
  //     } catch (error) {
  //       console.error("Failed to delete banner:", error);
  //     }
  //   }

  return (
    <>
      <div className="flex justify-between items-center bg-transparent pb-5 px-5 font-montserrat">
        <h1 className="text-xl font-bold">DEALERS</h1>
        <h2 className="font-semibold">TOTAL: {dealers?.length || 0}</h2>
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
                <th className="py-5 px-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {dealers?.map((dealer) => (
                <tr
                  key={dealer.id}
                  className="border border-[rgba(0, 0, 0, 0.06)] text-[#565656] dark:text-lightPrimary"
                >
                  <td className="py-5 text-center">{dealer.fullName}</td>
                  <td className="py-5 text-center">{dealer.businessName}</td>
                  <td className="py-5 text-center">{dealer.agentId}</td>
                  <td className="py-5 text-center">{dealer.businessAddress}</td>
                  <td className="py-5 text-center">
                    <span
                      className={`px-2 py-1 rounded-full font-semibold text-[#49B27A]`}
                    >
                      200 Days Left
                    </span>
                  </td>
                  <td className="py-5 flex justify-center gap-4">
                    <div className="bg-[#49B27A] text-white text-sm py-2 px-3 rounded-md font-semibold cursor-pointer">
                      VIEW PROFILE
                    </div>
                    <div className="bg-[#FE043C] text-white text-sm py-2 px-3 rounded-md font-semibold cursor-pointer">
                      SUSPEND
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllDealers;
