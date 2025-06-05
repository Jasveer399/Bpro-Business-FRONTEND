import React, { useState, useEffect, useRef } from "react";

const ProgrammaticDialog = ({
  isOpen,
  onClose,
  children,
  width = "w-[35%]",
  height = "h-[55%]",
  showCloseButton = false,
  closeOnBackdrop = true,
  rounded = "rounded-[20px]",
}) => {
  const dialogRef = useRef(null);

  const closeDialog = () => {
    if (onClose) onClose();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        closeOnBackdrop &&
        event.target.classList.contains("dialog-backdrop")
      ) {
        closeDialog();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent body scroll when dialog is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeOnBackdrop]);

  const renderChildren = () => {
    if (typeof children === "function") {
      return children({ closeDialog });
    }

    if (React.isValidElement(children)) {
      return React.cloneElement(children, { closeDialog });
    }

    return children;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm dialog-backdrop" />
      <div
        ref={dialogRef}
        className={`bg-white cursor-default ${height} no-scrollbar overflow-y-auto ${rounded} shadow-2xl z-10 ${width} relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={closeDialog}
            className="absolute right-3 top-3 bg-red-500 hover:bg-red-600 text-white text-lg w-8 h-8 rounded-full shadow-md cursor-pointer flex items-center justify-center z-20 transition-colors"
            aria-label="Close dialog"
          >
            ×
          </button>
        )}
        <div className="relative h-full">{renderChildren()}</div>
      </div>
    </div>
  );
};

export default ProgrammaticDialog;
