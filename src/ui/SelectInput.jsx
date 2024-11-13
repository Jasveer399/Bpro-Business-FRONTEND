import React from "react";

const SelectInput = React.forwardRef(({ 
  label, 
  options, 
  error, 
  width = "w-[25%]", 
  onChange,
  readOnly = false,
  disabled = false,
  ...props 
}, ref) => (
  <div className={width}>
    <div className="relative">
      <select
        ref={ref}
        className={`w-full px-3 py-[7px] bg-white rounded-xl focus:outline-none transition-shadow duration-200 ease-in-out
                    ${disabled ? 'opacity-50 cursor-not-allowed' : readOnly ? 'cursor-default' : 'cursor-pointer'}
                    ${!disabled && !readOnly ? 'shadow-[0_6px_15px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]' : ''}
                    text-gray-600 placeholder-gray-400 text-base appearance-none
                    scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100
                    scrollbar-thumb-rounded-full border-none`}
        onChange={(e) => {
          if (onChange && !readOnly && !disabled) {
            const selectedOption = options.find(option => option.value === e.target.value);
            onChange(selectedOption);
          }
        }}
        disabled={disabled}
        {...(readOnly ? { 
          onClick: (e) => e.preventDefault(),
          onKeyDown: (e) => e.preventDefault()
        } : {})}
        {...props}
      >
        <option value="" disabled selected>{label}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    {error && <p className="mt-1 ml-1 text-xs text-red-500">{error}</p>}
  </div>
));

export default SelectInput;