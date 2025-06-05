import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { stateOptions } from "../../../Utils/options";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../../../Redux/Features/productSlice";

const LocationSelector = ({ width }) => {
  const dispatch = useDispatch();
  const { userLocation } = useSelector((state) => state.products);
  const [selectedLocation, setSelectedLocation] = useState(userLocation || "");

  useEffect(() => {
    if (userLocation) {
      setSelectedLocation(userLocation);
    }
  }, [userLocation]);

  const handleLocationChange = (e) => {
    const location = e.target.value;
    dispatch(setLocation(location));
    setSelectedLocation(location);
  };

  return (
    <div className={`relative ${width}`}>
      <div className="flex items-center border border-[#ADADAD] rounded-md bg-white p-2">
        <MapPin className="text-primary mr-2" size={20} />
        <select
          value={selectedLocation}
          onChange={handleLocationChange}
          className="w-full bg-transparent border-none focus:outline-none text-gray-700"
        >
          <option value="" disabled>
            Select location
          </option>
          {stateOptions.map((state) => (
            <option key={state.value} value={state.value}>
              {state.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LocationSelector;
