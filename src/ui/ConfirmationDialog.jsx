import React from "react";
import Loader from "./Loader";

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-2xl z-10 p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded-full" onClick={onClose}>{cancelText}</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-full" onClick={onConfirm}>{isLoading ? <Loader /> : confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;