import React, { useEffect } from "react";
import SaleCard from "../../Components/DashBoard/SaleCard";
import YearSaleCard from "../../Components/DashBoard/YearSaleCard";
import UsersEarningsChart from "../../Components/Charts/UsersEarningsChart";
import UsersRating from "../../Components/DashBoard/UsersRating";
import RecentUsers from "../../Components/DashBoard/RecentUsers";
import ShowDealerData from "../../Components/DashBoard/ShowDealerData";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStatsAsync } from "../../Redux/Features/dashboardSlice";
import { GrUserWorker } from "react-icons/gr";
import { FaUserTie } from "react-icons/fa";

function Dashboard() {
  // const ratingCounts = [384, 145, 24, 10, 1];
  // const overallRating = 4.7;
  const dispatch = useDispatch();
  const { dashboardStats, fetchStatus } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchDashboardStatsAsync());
    }
  }, [dispatch, fetchStatus]);

  console.log("dashboardStats", dashboardStats);

  const monthlyData = [
    { name: "NA", value: 0 },
    { name: "Jan", value: 0 },
    { name: "Feb", value: 0 },
    { name: "Mar", value: 0 },
    { name: "Apr", value: 0 },
    { name: "May", value: 0 },
    { name: "Jun", value: 0 },
    { name: "Jul", value: 0 },
    { name: "Aug", value: 0 },
    { name: "Sep", value: 0 },
    { name: "Oct", value: 0 },
    { name: "Nov", value: 0 },
    { name: "Dec", value: 0 },
  ];

  return (
    <div className="w-full h-full dark:bg-darkPrimary px-4 sm:px-6 lg:px-8 xl:px-10 py-6 lg:py-8 overflow-hidden custom-scrollbar">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 lg:mb-4 mt-14">
        <SaleCard
          title="Monthly Sales"
          image="dailySaleImage.svg"
          imageClassName="top-0 right-3"
          amount={dashboardStats?.sales?.currentMonthSales || 0}
          // persent="30%"
          // progresBarTitle="You made an extra 35,000 this day"
          // progresBarPersent="70%"
        />
        <SaleCard
          title="Yearly Sales"
          image="monthSaleImage.svg"
          imageClassName="top-0 right-0"
          amount={dashboardStats?.sales?.currentYearSales || 0}
          // persent="30%"
          // progresBarTitle="You made an extra 35,000 this day"
          // progresBarPersent="40%"
        />
        <YearSaleCard
          title="Overall Sales"
          image="YearSaleImage.svg"
          amount={dashboardStats?.sales?.overallSales || 0}
          // persent="30%"
          // progresBarTitle="You made an extra 35,000 this day"
          // progresBarPersent={70}
        />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/2  flex flex-col gap-5">
          <ShowDealerData
            title="Active Dealers"
            count={dashboardStats?.dealers?.activeDealerCount || 0}
            icon={
              <FaUserTie size={60} className="bg-[#1a77d2]/40 p-2.5 rounded-md" />
            }
          />
          <ShowDealerData
            title="Total Workers"
            count={dashboardStats?.dealers?.workersCount || 0}
            icon={
              <GrUserWorker
                size={60}
                className="bg-[#1a77d2]/40 p-2.5 rounded-md"
              />
            }
          />
        </div>
        <UsersEarningsChart
          monthlyData={
            dashboardStats?.sales?.monthlySalesBreakdown || monthlyData
          }
        />
      </div>

      {/* <div className="flex gap-5 flex-col md:flex-row">
        <div className="md:w-[70%] w-full">
          <UsersRating
            overallRating={overallRating}
            ratingCounts={ratingCounts}
          />
        </div>
        <div className="w-full">
          <RecentUsers />
        </div>
      </div> */}
    </div>
  );
}

export default Dashboard;
