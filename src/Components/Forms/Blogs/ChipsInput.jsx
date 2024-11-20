import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';

const ChipsInput = ({ value = [], onChange, label = "Input Chips", maxChips = 15, error }) => {
  const [chips, setChips] = useState(value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab' || e.key === ',') {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !chips.includes(value) && chips.length < maxChips) {
        const newChips = [...chips, value];
        setChips(newChips);
        onChange(newChips);
        e.target.value = '';
      }
    }
  };

  const removeChip = (indexToRemove) => {
    const newChips = chips.filter((_, index) => index !== indexToRemove);
    setChips(newChips);
    onChange(newChips);
  };

  return (
    <div className="w-72">
      <h1 className="text-sm ml-2 mb-px text-gray-600">{label}</h1>
      <div className="w-full px-3 py-[7px] bg-white rounded-xl shadow-[0_6px_15px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] min-h-[42px] flex flex-wrap gap-2">
        {chips.map((chip, index) => (
          <span key={index} className="inline-flex items-center px-2 py-1 rounded-lg text-sm bg-blue-100 text-white bg-darkPrimary">
            {chip}
            <button
              onClick={() => removeChip(index)}
              className="ml-1 hover:text-blue-600"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          className="flex-1 min-w-20 outline-none bg-transparent text-gray-600"
          onKeyDown={handleKeyDown}
          disabled={chips.length >= maxChips}
          placeholder={chips.length >= maxChips ? "Max tags reached" : "Press Enter to add"}
        />
      </div>
      {error && <p className="mt-1 ml-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
export default ChipsInput;