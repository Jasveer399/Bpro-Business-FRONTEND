import React, { useState } from 'react';

const SearchBlog = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", query);
    // Add search functionality here
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mb-5">
      {/* Input Field */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search"
        className="w-full px-4 py-2 outline-none text-gray-600"
      />
      
      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-blue text-white px-4 py-2 hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBlog;
