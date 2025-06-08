import React, { useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

const MultiSelector = ({
  title = "Our Services",
  label = "Select Business Type",
  maxSelections = 6,
  options,
  register,
  setValue,
  watch,
  errors,
  name = "services",
  required = true,
  defaultValue = [],
}) => {
  const [selectedItems, setSelectedItems] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  // Watch form value
  const formValue = watch ? watch(name) : null;

  // Initialize form value with default on mount
  useEffect(() => {
    if (setValue && defaultValue.length > 0) {
      setValue(name, defaultValue);
      setSelectedItems(defaultValue);
    }
  }, []);

  // Helper function to find option by value
  const findOptionByValue = (value) => {
    return options.find((option) => option.value === value);
  };

  const handleSelect = (optionValue) => {
    let newSelectedItems;

    if (selectedItems.includes(optionValue)) {
      // Remove if already selected
      newSelectedItems = selectedItems.filter((item) => item !== optionValue);
    } else if (selectedItems.length < maxSelections) {
      // Add if under limit
      newSelectedItems = [...selectedItems, optionValue];
    } else {
      // Don't add if at limit
      return;
    }

    setSelectedItems(newSelectedItems);
    if (setValue) {
      setValue(name, newSelectedItems, { shouldValidate: true });
    }

    // Close dropdown if max selections reached
    if (newSelectedItems.length >= maxSelections) {
      setIsOpen(false);
    }
  };

  const removeItem = (itemToRemove) => {
    const newSelectedItems = selectedItems.filter(
      (item) => item !== itemToRemove
    );
    setSelectedItems(newSelectedItems);
    if (setValue) {
      setValue(name, newSelectedItems, { shouldValidate: true });
    }
  };

  // Filter available options (not already selected)
  const availableOptions = options.filter(
    (option) => !selectedItems.includes(option.value)
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".multi-selector-container")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="w-full bg-white multi-selector-container">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {/* Dropdown Container */}
        <div className="relative">
          <div
            className={`w-full min-h-[50px] px-4 py-3 border rounded-lg bg-white cursor-pointer flex items-center justify-between hover:border-gray-400 transition-colors ${
              errors && errors[name] ? "border-red-500" : "border-gray-300"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex flex-wrap gap-2 flex-1">
              {selectedItems.length === 0 ? (
                <span className="text-gray-500">Select services...</span>
              ) : (
                selectedItems.map((itemValue, index) => {
                  const option = findOptionByValue(itemValue);
                  return (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#2E3192] text-white rounded-md text-sm"
                    >
                      {option ? option.label : itemValue}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(itemValue);
                        }}
                        className="hover:bg-white hover:text-[#2E3192] rounded-full p-0.5 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  );
                })
              )}
            </div>
            <ChevronDown
              size={20}
              className={`text-gray-500 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {availableOptions.length === 0 ? (
                <div className="px-4 py-3 text-gray-500 text-sm">
                  {selectedItems.length >= maxSelections
                    ? `Maximum ${maxSelections} services selected`
                    : "No more options available"}
                </div>
              ) : (
                availableOptions.map((option, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0 transition-colors"
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Hidden input for form registration */}
        {register && (
          <input
            type="hidden"
            {...register(name, {
              required: required
                ? `Please select at least one ${label.toLowerCase()}`
                : false,
              validate: (value) => {
                if (required && (!Array.isArray(value) || value.length === 0)) {
                  return `Please select at least one ${label.toLowerCase()}`;
                }
                if (Array.isArray(value) && value.length > maxSelections) {
                  return `Maximum ${maxSelections} selections allowed`;
                }
                return true;
              },
            })}
          />
        )}

        {/* Error Message */}
        {errors && errors[name] && (
          <p className="text-sm text-red-600">{errors[name].message}</p>
        )}

        {/* Counter */}
        <p className="text-sm text-gray-600">
          You can select {maxSelections - selectedItems.length} more service
          {maxSelections - selectedItems.length !== 1 ? "s" : ""}
          {selectedItems.length > 0 && (
            <span className="ml-2 text-[#2E3192] font-medium">
              ({selectedItems.length}/{maxSelections} selected)
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default MultiSelector;
