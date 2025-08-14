const ProductSkeleton = () => (
  <div className="relative border bg-white border-[#E7E7E7] rounded-md font-montserrat p-2 animate-pulse">
    {/* Bookmark Icon Skeleton */}
    <div className="absolute top-3 right-3 w-5 h-5 bg-gray-300 rounded"></div>

    {/* Product Image Skeleton */}
    <div className="bg-gray-300 rounded-t-md w-full h-48"></div>

    {/* Product Details Skeleton */}
    <div className="flex items-center justify-between my-2">
      <div className="flex items-center gap-1">
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-16"></div>
      </div>
    </div>

    {/* Title Skeleton */}
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>

    {/* Location Skeleton */}
    <div className="flex items-center my-1">
      <div className="w-4 h-4 bg-gray-300 rounded mr-1"></div>
      <div className="h-3 bg-gray-300 rounded w-32"></div>
    </div>

    {/* Rating Skeleton */}
    <div className="flex items-center gap-2 my-2">
      <div className="flex items-center gap-1 bg-gray-300 py-[2px] px-2 rounded-md">
        <div className="h-4 bg-gray-400 rounded w-6"></div>
        <div className="w-3 h-3 bg-gray-400 rounded"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded w-16"></div>
    </div>

    {/* Action Buttons Skeleton */}
    <div className="flex items-center gap-2 mt-3">
      <div className="bg-gray-300 px-3 py-1 rounded-md h-8 w-20"></div>
      <div className="border border-gray-300 rounded-md w-9 h-9 bg-gray-300"></div>
      <div className="bg-gray-300 rounded-md w-9 h-9"></div>
    </div>
  </div>
);

export default ProductSkeleton;
