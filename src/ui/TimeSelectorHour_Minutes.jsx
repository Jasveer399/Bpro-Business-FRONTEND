import React from 'react';
import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const TimeSelectorHour_Minutes = ({ value, onChange, error }) => {
    const [isHourOpen, setIsHourOpen] = useState(false);
    const [isMinuteOpen, setIsMinuteOpen] = useState(false);
    const [selectedHour, setSelectedHour] = useState('00');
    const [selectedMinute, setSelectedMinute] = useState('00');

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    useEffect(() => {
        if (value) {
            const [hour, minute] = value.split(':');
            setSelectedHour(hour);
            setSelectedMinute(minute);
        }
    }, [value]);

    const handleHourSelect = (hour) => {
        setSelectedHour(hour);
        setIsHourOpen(false);
        onChange(`${hour}:${selectedMinute}`);
    };

    const handleMinuteSelect = (minute) => {
        setSelectedMinute(minute);
        setIsMinuteOpen(false);
        onChange(`${selectedHour}:${minute}`);
    };

    return (
        <div className="w-full">
            <div className="flex gap-2">
                {/* Hour Selector */}
                <div className="relative w-1/2">
                    <label className="text-[15px] text-gray-600 mb-1">
                        Hour :
                    </label>
                    <button
                        type="button"
                        className="w-full px-3 py-3 text-left border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black bg-white"
                        onClick={() => setIsHourOpen(!isHourOpen)}
                    >
                        <div className="flex items-center justify-between">
                            <span>{selectedHour}</span>
                            {isHourOpen ? (
                                <ChevronUp className="w-4 h-4" />
                            ) : (
                                <ChevronDown className="w-4 h-4" />
                            )}
                        </div>
                    </button>

                    {isHourOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                            {hours.map((hour) => (
                                <button
                                    key={hour}
                                    type="button"
                                    className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:outline-none"
                                    onClick={() => handleHourSelect(hour)}
                                >
                                    {hour}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <span className="flex items-center mt-5">:</span>

                {/* Minute Selector */}
                <div className="relative w-1/2">
                    <label className="text-[15px] text-gray-600 mb-1">
                        Minutes :
                    </label>
                    <button
                        type="button"
                        className="w-full px-3 py-3 text-left border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black bg-white"
                        onClick={() => setIsMinuteOpen(!isMinuteOpen)}
                    >
                        <div className="flex items-center justify-between">
                            <span>{selectedMinute}</span>
                            {isMinuteOpen ? (
                                <ChevronUp className="w-4 h-4" />
                            ) : (
                                <ChevronDown className="w-4 h-4" />
                            )}
                        </div>
                    </button>

                    {isMinuteOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                            {minutes.map((minute) => (
                                <button
                                    key={minute}
                                    type="button"
                                    className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:outline-none"
                                    onClick={() => handleMinuteSelect(minute)}
                                >
                                    {minute}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default TimeSelectorHour_Minutes;