import React from "react";

const FormInput = React.forwardRef(
  ({ label, width="w-[25%]", error, readOnly,className, ...props }, ref) => {
    return (
      <div className={width}>
        <div className="relative">
            <h1 className="text-[15px] ml-1 mb-px text-gray-600">{label}</h1>
          <input
            ref={ref}
            readOnly={readOnly}
            className={`w-full px-3 py-3 bg-white rounded-md focus:outline-none transition-shadow duration-200 ease-in-out
                      text-gray-600 placeholder-gray-400 text-base border border-gray-400 ${className}`}
            placeholder={label}
            step="0.01"
            {...props}
          />
        </div>
        {error && <p className="mt-1 ml-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

export default FormInput;