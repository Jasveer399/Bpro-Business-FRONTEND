import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const LocationSelector = ({width}) => {
  const [selectedLocation, setSelectedLocation] = useState('');

  return (
    <div className={`relative ${width}`}>
      <div className="flex items-center border border-[#ADADAD] rounded-md bg-white p-2">
        <MapPin className="text-primary mr-2" size={20} />
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full bg-transparent border-none focus:outline-none text-gray-700"
        >
          <option value="" disabled>Select location</option>
          <option value="chandigarh">Chandigarh</option>
          <option value="punjab">Punjab</option>
        </select>
      </div>
    </div>
  );
};

export default LocationSelector;