import React, { useEffect, useState } from "react";
import AllWorkers from "../../Components/Workers/AllWorkers";
import Dialog from "../../ui/Dialog";
import AddWorkerForm from "../../Components/Forms/Worker/AddWorkerForm";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { server } from "../../Utils/server";
import axios from "axios";
import UserTable from "../../Components/Users/User.Table";

function Users() {
  const { workers } = useSelector((state) => state.workers);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth().toString()
  );

  const years = Array.from({ length: 5 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="w-full h-full dark:bg-darkPrimary px-4 sm:px-6 lg:px-8 xl:px-10 py-6 lg:py-8 custom-scrollbar font-montserrat">
      <div className="mt-20">
        <UserTable />
      </div>
    </div>
  );
}

export default Users;
