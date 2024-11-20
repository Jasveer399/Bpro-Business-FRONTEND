import React from "react";

const TextareaInput = React.forwardRef(
  ({ label, width="w-[50%]", error, ...props }, ref) => (
    <div className={width}>
      <div className="relative">
        <textarea
          ref={ref}
          className={`w-full px-3 py-3 bg-white rounded-md focus:outline-none transition-shadow duration-200 ease-in-out
                      text-gray-600 placeholder-gray-400 text-base border border-gray-400`}
          placeholder={label}
          {...props}
        />
      </div>
      {error && <p className="mt-1 ml-1 text-xs text-red-500">{error}</p>}
    </div>
  )
);

export default TextareaInput;