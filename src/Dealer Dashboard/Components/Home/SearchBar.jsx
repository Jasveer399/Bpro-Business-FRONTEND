import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ width }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${width}`}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="w-full py-[7px] px-4 pr-10 rounded-md border border-[#ADADAD] focus:outline-none focus:ring focus:ring-primary focus:border-transparent"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 focus:outline-none"
      >
        <Search size={20} className='text-primary' />
      </button>
    </form>
  );
};

export default SearchBar;