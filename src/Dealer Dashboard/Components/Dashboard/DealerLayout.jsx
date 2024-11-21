import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Home/Navbar";
import Header from "../Home/Header";
import { BsFillXDiamondFill } from "react-icons/bs";
import { MdOutlineBookmarks, MdOutlineManageAccounts } from "react-icons/md";
import { PiDiamondsFour } from "react-icons/pi";
import { TbMessages } from "react-icons/tb";
import { IoAddCircleOutline } from "react-icons/io5";

function DealerLayout() {
  const navItems = [
    { name: "Listing", icon: PiDiamondsFour, link: "/my-dashboard/listing" },
    {
      name: "Accounts",
      icon: MdOutlineManageAccounts,
      link: "/my-dashboard/accounts",
    },
    { name: "Messages", icon: TbMessages, link: "/my-dashboard/messages" },
    {
      name: "Add New Listing",
      icon: IoAddCircleOutline,
      link: "/product-listing",
    },
    {
      name: "Bookmarks",
      icon: MdOutlineBookmarks,
      link: "/my-dashboard/bookmarks",
    },
    // { name: "WP Admin", icon: UserCircle, link: "/my-dashboard/wp-admin" },
  ];
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <Header />
      <div className="flex">
        <div className="w-[22%]">
          <div className="flex items-center gap-2 justify-center mb-6">
            <div>
              <img src="auth-img.png" className="w-12 h-12 rounded-full" />
            </div>
            <div>
              <p className="text-[#777]">bproindia</p>
              <h4 className="font-semibold">Bpro@India</h4>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col justify-center">
              {navItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 my-2 p-2 hover:bg-black hover:text-white rounded-md w-44">
                  <div>
                    <item.icon size={20} className="text-primary hover:text-white" />
                  </div>
                  <div>
                    <a href={item.link} className="text-primary font-semibold hover:text-white">
                      {item.name}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DealerLayout;
