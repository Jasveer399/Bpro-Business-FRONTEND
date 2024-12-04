import React, { useState } from "react";
import { FaUserCircle, FaTrashAlt, FaRegEdit } from "react-icons/fa";
import Loader from "../../../../ui/Loader";

const ProfileImage = ({ imageUrl, onImageUpload, onImageRemove, status }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    onImageUpload(file);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    onImageRemove();
  };

  return (
    <div className="flex items-center">
      <div className="relative mr-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            className="w-32 h-32 md:w-64 md:h-64 rounded-full border-2 shadow-lg object-cover"
          />
        ) : (
          <div className="w-32 h-32 md:w-64 md:h-64 rounded-full bg-gray-200 flex items-center justify-center">
            <FaUserCircle size={48} className="text-gray-400" />
          </div>
        )}
        <label
          htmlFor="profile-image"
          className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer"
        >
          <input
            id="profile-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          {status === "loading" ? (
            <Loader />
          ) : (
            <div className="rounded-full border border-gray-600">
              <FaRegEdit size={28} className="text-gray-600 p-1" />
            </div>
          )}
        </label>
      </div>
      {imageUrl && (
        <button
          onClick={handleImageRemove}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
        >
          <FaTrashAlt size={18} />
        </button>
      )}
    </div>
  );
};

export default ProfileImage;
