import React, { useEffect } from 'react';
import { PencilIcon, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDealersAsync } from '../../Redux/Features/dealersSlice';

const AllDealers = () => {
  const dispatch = useDispatch()
  const { dealers, status, error } = useSelector((state) => state.dealers)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDealersAsync())
    }
  }, [status, dispatch])

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
    <div className="bg-white rounded-xl shadow-lg mx-3 dark:bg-darkgrey overflow-hidden">
      <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-base text-white uppercase bg-[#565656] border">
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
            <tr key={dealer.id} className="border border-[rgba(0, 0, 0, 0.06)] text-[#565656] dark:text-lightPrimary">
              <td className="py-5 text-center">{dealer.fullName}</td>
              <td className="py-5 text-center">{dealer.businessName}</td>
              <td className="py-5 text-center">{dealer.agentId}</td>
              <td className="py-5 text-center">{dealer.businessAddress}</td>
              <td className="py-5 text-center">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold dark:text-black ${
                  dealer.status === 'Active' ? 'bg-green-200' : 'bg-red-200'
                }`}>
                  {dealer.status}
                </span>
              </td>
              <td className="py-5">
                <div className="flex justify-center text-[#29AF3E] font-semibold cursor-pointer">
                  {/* <button className=""><PencilIcon size={18} /></button>
                  <button className="" onClick={() => deleteHandler(dealer.id)}><Trash2 size={18} /></button> */}
                  VIEW
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

export default AllDealers;