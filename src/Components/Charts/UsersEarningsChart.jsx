import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Divider from "../../ui/Divider";
import { formatIndianCurrency } from "../../Utils/Helper";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    if (label === "NA") {
      return null;
    } else {
      return (
        <div className="bg-gray-800 text-white p-2 rounded shadow-lg">
          <p>{`${label} : Rs. ${formatIndianCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
  }
  return null;
};

const UsersEarningsChart = ({ monthlyData }) => {
  const month = new Date().toLocaleDateString("en-US", { month: "short" });

  return (
    <div className="dark:bg-darkgrey w-full bg-white  rounded-2xl p-8 text-colorText2 dark:text-colorText shadow-lg dark:shadow-black border border-gray-200 dark:border-gray-600 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Dealer Stats This Year</h2>
        {/* <MoreVertical className="text-gray-400 cursor-pointer" /> */}
      </div>
      <Divider className="mb-4" />
      <div className="flex items-center mb-6">
        <div>
          <p className="text-colorText2 dark:text-colorText text-sm">
            {month}'s Month Earnings
          </p>
          <p className="text-colorText2 dark:text-colorText text-2xl font-bold">
            Rs. {formatIndianCurrency(monthlyData.find((item) => item.name === month).value)}
          </p>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF" }}
            />
            <YAxis hide={true} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: "#3B82F6", stroke: "#3B82F6", strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                fill: "#3B82F6",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsersEarningsChart;
