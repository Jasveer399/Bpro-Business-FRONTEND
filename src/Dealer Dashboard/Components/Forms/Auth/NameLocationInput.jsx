import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { useDispatch } from "react-redux";
// Assuming you'll have an action to update customer info
import { updateCustomerInfoAsync } from "../../../../Redux/Features/customerSlice";
import Loader from "../../../../ui/Loader";

function NameLocationInput({
  onSubmit,
  mobileNo,
  customerStatus,
  closeDialog,
}) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      // Handle validation - name is required
      return;
    }

    try {
      // Dispatch action to update customer info
      const resultActionawait = dispatch(
        updateCustomerInfoAsync({ name, location, mobileNo })
      );
      if (updateCustomerInfoAsync.fulfilled.match(resultActionawait)) {
        closeDialog();
      }

      // Call the onSubmit prop to notify parent component
      if (onSubmit) {
        onSubmit({ name, location });
      }
    } catch (error) {
      console.error("Error updating customer info:", error);
    }
  };

  return (
    <div className="mt-6">
      <h4 className="text-center text-black mb-2">Complete Your Profile</h4>
      <div className="relative flex items-center border border-gray-300 mt-4 p-2 rounded-md text-secondary w-[80%] mx-auto font-semibold">
        <input
          type="text"
          placeholder="Enter Your Name"
          className="pl-2 w-[90%] placeholder:font-normal placeholder:text-sm bg-transparent hide-number-spinners border-none focus:border-none focus:outline-none"
          value={name}
          onChange={handleNameChange}
          required
        />
        <FaRegUser className="absolute right-0 text-[2.6rem] px-3" />
      </div>
      <div className="relative flex items-center border border-gray-300 mt-4 p-2 rounded-md text-secondary w-[80%] mx-auto font-semibold">
        <input
          type="text"
          placeholder="Enter Your Location"
          className="pl-2 w-[90%] placeholder:font-normal placeholder:text-sm bg-transparent hide-number-spinners border-none focus:border-none focus:outline-none"
          value={location}
          onChange={handleLocationChange}
        />
        <MdOutlineLocationOn className="absolute right-0 text-[2.9rem] px-3" />
      </div>
      <div className="w-[80%] mx-auto mt-4">
        <button
          className="bg-secondary w-full py-3 font-semibold rounded-md shadow-lg flex items-center justify-center"
          onClick={handleSubmit}
        >
          {customerStatus === "loading" ? <Loader /> : "Let's Enjoy"}
        </button>
      </div>
    </div>
  );
}

export default NameLocationInput;
