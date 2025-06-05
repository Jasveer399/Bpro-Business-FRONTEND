import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const BusinessTime = ({ register, setValue, watch, errors }) => {
  const [selectedDays, setSelectedDays] = useState([]);

  // Watch form values
  const openingTime = watch("openingTime");
  const closingTime = watch("closingTime");
  const businessDays = watch("businessDays");

  const days = [
    { key: "M", label: "Monday", full: "Mon" },
    { key: "T", label: "Tuesday", full: "Tue" },
    { key: "W", label: "Wednesday", full: "Wed" },
    { key: "T2", label: "Thursday", full: "Thu" },
    { key: "F", label: "Friday", full: "Fri" },
    { key: "S", label: "Saturday", full: "Sat" },
    { key: "S2", label: "Sunday", full: "Sun" },
  ];

  // Initialize selectedDays from form data
  useEffect(() => {
    if (businessDays && Array.isArray(businessDays)) {
      setSelectedDays(businessDays);
    }
  }, [businessDays]);

  const toggleDay = (dayKey) => {
    const newSelectedDays = selectedDays.includes(dayKey)
      ? selectedDays.filter((day) => day !== dayKey)
      : [...selectedDays, dayKey];

    setSelectedDays(newSelectedDays);
    setValue("businessDays", newSelectedDays, { shouldValidate: true });
  };

  const selectAll = () => {
    const newSelectedDays =
      selectedDays.length === days.length ? [] : days.map((day) => day.key);

    setSelectedDays(newSelectedDays);
    setValue("businessDays", newSelectedDays, { shouldValidate: true });
  };

  return (
    <div className="w-full max-w-2xl bg-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Time</h2>

        {/* Time Selectors */}
        <div className="flex items-center gap-4 mb-6">
          {/* Opening Time */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#2E3192] mb-2">
              Opening Time
            </label>
            <div className="relative">
              <input
                type="time"
                {...register("openingTime", {
                  required: "Opening time is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E3192] focus:border-transparent pr-10 appearance-none"
                style={{
                  colorScheme: "light",
                }}
              />
            </div>
            {errors.openingTime && (
              <p className="text-sm text-red-600 mt-1">
                {errors.openingTime.message}
              </p>
            )}
          </div>

          {/* TO separator */}
          <div className="text-gray-600 font-medium mt-6">TO</div>

          {/* Closing Time */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#2E3192] mb-2">
              Closed Time
            </label>
            <div className="relative">
              <input
                type="time"
                {...register("closingTime", {
                  required: "Closing time is required",
                  validate: (value) => {
                    const opening = openingTime;
                    if (opening && value && opening >= value) {
                      return "Closing time must be after opening time";
                    }
                    return true;
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E3192] focus:border-transparent pr-10 appearance-none"
                style={{
                  colorScheme: "light",
                }}
              />
            </div>
            {errors.closingTime && (
              <p className="text-sm text-red-600 mt-1">
                {errors.closingTime.message}
              </p>
            )}
          </div>
        </div>

        {/* Days Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#2E3192] mb-2">
            Business Days
          </label>
          <div className="flex flex-wrap gap-2 mb-4">
            {days.map((day, index) => (
              <button
                key={day.key}
                type="button"
                onClick={() => toggleDay(day.key)}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white transition-all duration-200 ${
                  selectedDays.includes(day.key)
                    ? index < 5
                      ? "bg-[#2E3192] hover:bg-[#1e2082]"
                      : "bg-[#C4B5FD] hover:bg-[#A78BFA]"
                    : "bg-[#E5E7EB] text-gray-600 hover:bg-[#D1D5DB]"
                }`}
                title={day.label}
              >
                {day.key === "T2" ? "T" : day.key === "S2" ? "S" : day.key}
              </button>
            ))}
          </div>
          {errors.businessDays && (
            <p className="text-sm text-red-600 mb-2">
              {errors.businessDays.message}
            </p>
          )}
        </div>

        {/* Hidden input for form registration */}
        <input
          type="hidden"
          {...register("businessDays", {
            required: "Please select at least one business day",
            validate: (value) =>
              (Array.isArray(value) && value.length > 0) ||
              "Please select at least one business day",
          })}
        />

        {/* Select All Button */}
        <button
          type="button"
          onClick={selectAll}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
        >
          {selectedDays.length === days.length ? "Deselect All" : "Select All"}
        </button>
      </div>
    </div>
  );
};

export default BusinessTime;
