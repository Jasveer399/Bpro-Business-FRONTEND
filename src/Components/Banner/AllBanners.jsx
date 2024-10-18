import React from 'react';
import { PencilIcon, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllBanners = () => {
  const transactions = [
    { id: 1, title: 'Project Alpha', image: 'https://nsglobalsystem.com/images/Admin_service_category.png', status: 'Active', url: 'https://example.com/alpha' },
    { id: 2, title: 'Task Beta', image: '/api/placeholder/40/40', status: 'Inactive', url: 'https://example.com/beta' },
    { id: 3, title: 'Initiative Gamma', image: '/api/placeholder/40/40', status: 'Active', url: 'https://example.com/gamma' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg dark:bg-darkgrey">
      <table className="w-full mt-2 table-fixed">
        <thead>
          <tr className="text-base dark:text-colorText uppercase">
            <th className="py-2">Title</th>
            <th className="py-2">Image</th>
            <th className="py-2">Status</th>
            <th className="py-2">External URL</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-t border-gray-300 dark:text-colorText">
              <td className="py-3 text-center">{transaction.title}</td>
              <td className="py-3 flex justify-center text-center">
                <img src={transaction.image} alt={transaction.title} className="w-28 h-14 rounded-md" />
              </td>
              <td className="py-3 text-center">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold dark:text-black ${
                  transaction.status === 'Active' ? 'bg-green-200' : 'bg-red-200'
                }`}>
                  {transaction.status}
                </span>
              </td>
              <td className="py-3 text-center">
                <Link to={transaction.url}  target="_blank" rel="noopener noreferrer">
                  <div className='text-blue'>{transaction.url}</div>
                </Link>
              </td>
              <td className="py-3">
                <div className="flex justify-center space-x-2">
                  <button className=""><PencilIcon size={18} /></button>
                  <button className=""><Trash2 size={18} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBanners;