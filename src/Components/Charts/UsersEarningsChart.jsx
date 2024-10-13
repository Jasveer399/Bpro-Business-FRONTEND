import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MoreVertical } from "lucide-react";
import Divider from "../../ui/Divider";

const data = [
  { name: "Jan", value: 50 },
  { name: "Feb", value: 200 },
  { name: "Mar", value: 100 },
  { name: "Apr", value: 220 },
  { name: "May", value: 150 },
  { name: "Jun", value: 250 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-2 rounded shadow-lg">
        <p>{`${label} : $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};


const UsersEarningsChart = () => {
  return (
    <div className="dark:bg-darkgrey bg-white  rounded-2xl p-8 text-colorText2 dark:text-colorText shadow-lg dark:shadow-black border border-gray-200 dark:border-gray-600 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Users From United States</h2>
        <MoreVertical className="text-gray-400 cursor-pointer" />
      </div>
      <Divider className="mb-4" />
      <div className="flex items-center mb-6">
        <div>
          <p className="text-colorText2 dark:text-colorText text-sm">Total Earnings</p>
          <p className="text-colorText2 dark:text-colorText text-2xl font-bold">$249.95</p>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
