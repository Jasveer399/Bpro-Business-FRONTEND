import React from "react";
import { PencilIcon, Trash2 } from "lucide-react";

const AllCategories = () => {
  const transactions = [
    {
      id: 1,
      title: "Project Alpha 1",
      icon: "https://nsglobalsystem.com/images/Admin_service_category.png",
      image: "https://nsglobalsystem.com/images/Admin_service_category.png",
    },
    {
      id: 2,
      title: "Project Alpha 2",
      icon: "https://nsglobalsystem.com/images/Admin_service_category.png",
      image: "https://nsglobalsystem.com/images/Admin_service_category.png",
    },
    {
      id: 3,
      title: "Project Alpha 3",
      icon: "https://nsglobalsystem.com/images/Admin_service_category.png",
      image: "https://nsglobalsystem.com/images/Admin_service_category.png",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg dark:bg-darkgrey">
      <table className="w-full mt-2 table-fixed">
        <thead>
          <tr className="text-base dark:text-colorText uppercase">
            <th className="py-2">Title</th>
            <th className="py-2">Icon</th>
            <th className="py-2">Image</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-t border-gray-300 dark:text-colorText"
            >
              <td className="py-3 text-center">{transaction.title}</td>
              <td className="py-3 text-center">
                <div className="flex justify-center">
                  <img
                    src={transaction.icon}
                    alt={transaction.icon}
                    className="w-28 h-14 rounded-md"
                  />
                </div>
              </td>
              <td className="py-3 text-center">
                <div className="flex justify-center">
                  <img
                    src={transaction.image}
                    alt={transaction.image}
                    className="w-28 h-14 rounded-md"
                  />
                </div>
              </td>
              <td className="py-3">
                <div className="flex justify-center space-x-2">
                  <button className="">
                    <PencilIcon size={18} />
                  </button>
                  <button className="">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCategories;
