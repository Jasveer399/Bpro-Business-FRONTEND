import React from "react";
import SaleCard from "../../Components/DashBoard/SaleCard";
import YearSaleCard from "../../Components/DashBoard/YearSaleCard";
import UsersEarningsChart from "../../Components/Charts/UsersEarningsChart";
import UsersRating from "../../Components/DashBoard/UsersRating";
import RecentUsers from "../../Components/DashBoard/RecentUsers";

function Dashboard() {
  const ratingCounts = [384, 145, 24, 10, 1];
  const overallRating = 4.7;

  return (
    <div className="w-full h-[90vh] dark:bg-darkPrimary px-4 sm:px-6 lg:px-8 xl:px-10 py-6 lg:py-8 overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <SaleCard
          title="Daily Sales"
          image="dailySaleImage.svg"
          imageClassName="top-0 right-3"
          amount="249.95"
          persent="30%"
          progresBarTitle="You made an extra 35,000 this day"
          progresBarPersent="70%"
        />
        <SaleCard
          title="Monthly Sales"
          image="monthSaleImage.svg"
          imageClassName="top-0 right-0"
          amount="249.95"
          persent="30%"
          progresBarTitle="You made an extra 35,000 this day"
          progresBarPersent="40%"
        />
        <YearSaleCard
          title="Yearly Sales"
          image="YearSaleImage.svg"
          amount="249.95"
          persent="30%"
          progresBarTitle="You made an extra 35,000 this day"
          progresBarPersent={70}
        />
      </div>
      
      <div className="mb-6 lg:mb-8">
        <UsersEarningsChart />
      </div>

      <div className="flex gap-5 flex-col md:flex-row">
        <div className="md:w-[70%] w-full">
          <UsersRating
            overallRating={overallRating}
            ratingCounts={ratingCounts}
          />
        </div>
        <div className="w-full">
          <RecentUsers />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;