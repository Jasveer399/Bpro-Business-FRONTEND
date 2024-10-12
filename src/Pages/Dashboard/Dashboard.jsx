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
    <div className="w-full h-[90%] dark:bg-darkPrimary px-10 pt-10 overflow-y-auto custom-scrollbar">
      <div className="flex justify-evenly gap-5">
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
      <div className="py-10">
        <UsersEarningsChart />
      </div>

      <div className="flex gap-5 mb-10">
        <UsersRating
          overallRating={overallRating}
          ratingCounts={ratingCounts}
        />
        <RecentUsers />
      </div>
    </div>
  );
}

export default Dashboard;
