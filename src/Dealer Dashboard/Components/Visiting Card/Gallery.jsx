import React, { useState } from "react";

const Gallery = ({ galleryImages }) => {
  const [visibleImages, setVisibleImages] = useState(8);
  const IMAGES_PER_LOAD = 4;
  const INITIAL_IMAGES = 8;

  const totalImages = galleryImages?.length || 0;
  const hasMoreImages = visibleImages < totalImages;
  const canShowLess = visibleImages > INITIAL_IMAGES;

  const handleLoadMore = () => {
    setVisibleImages((prev) => Math.min(prev + IMAGES_PER_LOAD, totalImages));
  };

  const handleLoadLess = () => {
    setVisibleImages((prev) =>
      Math.max(prev - IMAGES_PER_LOAD, INITIAL_IMAGES)
    );
  };
  return (
    <div className="w-[90%] mx-auto mb-20">
      <h1 className="text-3xl font-[700] ml-5">Our Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 m-2 md:m-4 gap-3 md:gap-5">
        {galleryImages?.slice(0, visibleImages).map((gal, index) => (
          <div key={index}>
            <img
              src={gal}
              alt="gallery"
              className="w-full h-60 object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Show buttons only if there are more than 8 images */}
      {totalImages > INITIAL_IMAGES && (
        <div className="flex items-center justify-center mt-6 gap-4">
          {hasMoreImages && (
            <button
              onClick={handleLoadMore}
              className="bg-[#E83435] text-white text-xl px-16 py-2 flex hover:underline"
            >
              Load More...
            </button>
          )}

          {canShowLess && (
            <button
              onClick={handleLoadLess}
              className="bg-gray-600 text-white text-xl px-16 py-2 flex hover:underline"
            >
              Load Less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;
