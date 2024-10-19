import React from "react";

const FormInput = React.forwardRef(
  ({ label, width="w-[25%]", error, readOnly, ...props }, ref) => {
    return (
      <div className={width}>
        <div className="relative">
            <h1 className="text-sm ml-2 mb-px ">{label}</h1>
          <input
            ref={ref}
            readOnly={readOnly}
            className={`w-full px-3 py-[7px] bg-white rounded-xl focus:outline-none transition-shadow duration-200 ease-in-out
                      shadow-[0_6px_15px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]
                      text-gray-600 placeholder-gray-400 text-base border-none`}
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