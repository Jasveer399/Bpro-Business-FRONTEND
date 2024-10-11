import { CurrencyIcon } from 'lucide-react';
import React from 'react';

const SaleCard = () => {
  return (
    <div className="flex flex-col min-w-0 break-words bg-white border border-gray-200 rounded-xl shadow-lg">
      <div className="flex-auto p-6">
        <img
          src="/api/placeholder/400/320"
          alt="Background decoration"
          className="absolute top-0 right-0 w-auto h-auto"
        />
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 mr-3 rounded-lg bg-blue-500 text-white">
            <CurrencyIcon size={26} />
          </div>
          <div>
            <p className="mb-0 text-sm text-gray-500">Referrals</p>
            <div className="flex items-end">
              <h2 className="mb-0 text-2xl font-medium">$134.6K</h2>
              <span className="flex items-center ml-2 px-2 py-0.5 text-xs font-medium text-green-500 bg-green-100 rounded">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5L20 13L18.59 14.41L13 8.83V19H11V8.83L5.41 14.41L4 13L12 5Z" fill="currentColor"/>
                </svg>
                55%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleCard;