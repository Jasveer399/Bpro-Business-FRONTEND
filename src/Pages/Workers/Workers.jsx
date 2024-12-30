import React, { useState } from "react";
import AllWorkers from "../../Components/Workers/AllWorkers";
import Dialog from "../../ui/Dialog";
import AddWorkerForm from "../../Components/Forms/Worker/AddWorkerForm";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Workers() {
  const { workers } = useSelector((state) => state.workers);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());

  const years = Array.from(
    { length: 5 },
    (_, i) => (new Date().getFullYear() - i).toString()
  );

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="w-full h-full dark:bg-darkPrimary px-4 sm:px-6 lg:px-8 xl:px-10 py-6 lg:py-8 custom-scrollbar font-montserrat">
      <div className="">
        <div className="flex justify-between items-center mb-4 px-4 mt-14">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-semibold dark:text-colorText">
              Workers Area
            </h2>
            <div className="flex items-center gap-3">
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <InputLabel>Year</InputLabel>
                <Select
                  value={selectedYear}
                  label="Year"
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {years.map(year => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Month</InputLabel>
                <Select
                  value={selectedMonth}
                  label="Month"
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  {months.map((month, index) => (
                    <MenuItem key={index} value={index.toString()}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3">
            <Dialog
              trigger={
                <button className="bg-blue px-3 rounded-md font-semibold text-white py-2 text-sm">
                  Add Worker
                </button>
              }
              width="w-[30%]"
              height="h-[40%]"
            >
              <AddWorkerForm />
            </Dialog>
            <h2 className="font-semibold">TOTAL: {workers?.length || 0}</h2>
          </div>
        </div>
        <AllWorkers selectedYear={selectedYear} selectedMonth={selectedMonth} />
      </div>
    </div>
  );
}

export default Workers;