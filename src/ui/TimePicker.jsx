import React from 'react';
import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const TimePicker = ({ label, value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('12:00 AM');

  // Generate all times in 1-hour increments
  const generateTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      const hour = i % 12 || 12;
      const ampm = i < 12 ? 'AM' : 'PM';
      times.push(`${hour.toString().padStart(2, '0')}:00 ${ampm}`);
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  useEffect(() => {
    if (value) {
      setSelectedTime(value);
    }
  }, [value]);

  const handleSelect = (time) => {
    setSelectedTime(time);
    setIsOpen(false);
    onChange(time);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.time-picker-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative w-full time-picker-container">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <button
        type="button"
        className="w-full px-4 py-3.5 text-left bg-white border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">{selectedTime}</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </button>

      {isOpen && (
        <div 
          className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto"
          role="listbox"
        >
          {timeOptions.map((time) => (
            <button
              key={time}
              type="button"
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              onClick={() => handleSelect(time)}
              role="option"
              aria-selected={time === selectedTime}
            >
              {time}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default TimePicker;