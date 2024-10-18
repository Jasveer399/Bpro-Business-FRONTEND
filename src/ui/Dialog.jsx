import React, { useState, useEffect, useRef } from "react";

const Dialog = ({ trigger, children, onClose, width, height='h-[94%]' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleTriggerClick = (e) => {
    if (trigger.props.onClick) {
      trigger.props.onClick(e);
    }
    openDialog();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains('dialog-backdrop')) {
        closeDialog();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children({ closeDialog });
    }
    
    if (React.isValidElement(children)) {
      return React.cloneElement(children, { closeDialog });
    }
    
    return children;
  };

  return (
    <>
      {React.cloneElement(trigger, { onClick: handleTriggerClick })}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute -top-2 inset-0 bg-black bg-opacity-50 backdrop-blur-sm dialog-backdrop" />
          <div
            ref={dialogRef}
            className={`bg-neutral-200 cursor-default ${height} no-scrollbar overflow-y-scroll rounded-[20px] shadow-2xl z-10 ${width}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* <div className="flex justify-center mb-4">
              <button
                onClick={closeDialog}
                className="absolute right-3 top-3 bg-red-200 text-white text-lg w-6 h-6 rounded-full shadow-md cursor-pointer"
              >
                ×
              </button>
            </div> */}
            <div className="relative">
              {renderChildren()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;