import React from "react";
import UserInfoTile from "./UserInfoTile";
import Divider from "../../ui/divider";

const userInfoData = [
  {
    id: 1,
    imageSrc: "avatar-1.jpg",
    name: "David Cooper",
    role: "Web Developer",
    date: "11 May 12:30"
  },
  {
    id: 2,
    imageSrc: "avatar-2.jpg",
    name: "Sarah Lee",
    role: "UX Designer",
    date: "10 May 15:45"
  },
  {
    id: 3,
    imageSrc: "avatar-3.jpg",
    name: "Michael Johnson",
    role: "Project Manager",
    date: "9 May 09:15"
  },
  {
    id: 1,
    imageSrc: "avatar-4.jpg",
    name: "David Cooper",
    role: "Web Developer",
    date: "11 May 12:30"
  },
  {
    id: 2,
    imageSrc: "avatar-5.jpg",
    name: "Sarah Lee",
    role: "UX Designer",
    date: "10 May 15:45"
  },
  {
    id: 3,
    imageSrc: "avatar-6.jpg",
    name: "Michael Johnson",
    role: "Project Manager",
    date: "9 May 09:15"
  },
  // Add more user objects as needed
];

const RecentUsers = () => {
  const handleAccept = (userId) => {
    console.log(`Accepted user with ID: ${userId}`);
  };

  const handleReject = (userId) => {
    console.log(`Rejected user with ID: ${userId}`);
  };

  return (
    <div className="w-full bg-white dark:bg-darkgrey shadow-lg dark:shadow-black border border-gray-200 dark:border-gray-600 rounded-2xl p-4 sm:p-6 relative">
      <h2 className="text-lg sm:text-xl font-semibold text-neutral-700 dark:text-lightPrimary mb-4">
        Recent Users
      </h2>
      <Divider className="mb-4" />
      <div className="md:h-52 h-80 sm:max-h-80 overflow-y-auto">
        {userInfoData.map((user) => (
          <UserInfoTile
            key={user.id}
            imageSrc={user.imageSrc}
            name={user.name}
            role={user.role}
            date={user.date}
            onAccept={() => handleAccept(user.id)}
            onReject={() => handleReject(user.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentUsers;