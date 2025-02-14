import React from "react";
import BookmarkCard from "../../Components/Dashboard/Bookmarks/BookmarkCard";
import { useSelector } from "react-redux";

function Bookmark() {
  const bookmarkedItems = useSelector((state) => state.bookmarks.items);

  console.log("bookmarkedItems: ", bookmarkedItems);

  return (
    <div className="my-6 md:my-10">
      {bookmarkedItems.length > 0 ? (
        <>
          <h1 className="font-montserrat font-extrabold text-xl md:text-2xl mx-3 md:mx-5">
            Bookmarked Items
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 m-2 md:m-4 gap-3 md:gap-5">
            {bookmarkedItems.map((item) => (
              <BookmarkCard key={item.id} product={item.Product} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-xl">No bookmarked items yet</p>
        </div>
      )}
    </div>
  );
}

export default Bookmark;
