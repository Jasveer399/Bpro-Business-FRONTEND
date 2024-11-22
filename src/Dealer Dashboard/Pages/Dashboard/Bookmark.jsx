import React from "react";
import BookmarkCard from "../../Components/Dashboard/Bookmarks/BookmarkCard";


function Bookmark() {
  return (
    <div className="my-6 md:my-10">
      <h1 className="font-montserrat font-extrabold text-xl md:text-2xl mx-3 md:mx-5">
        Popular Searches
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 m-2 md:m-4 gap-3 md:gap-5">
        <BookmarkCard />
        <BookmarkCard />
        <BookmarkCard />
      </div>
      <div className="flex items-center justify-center">
        <button className="border border-[#E7E7E7] py-1 px-8 rounded-md font-semibold hover:bg-gray-50 transition-colors">
          Load More...
        </button>
      </div>
    </div>
  );
}

export default Bookmark;
