import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Navbar from "../Home/Navbar";
import Header from "../Home/Header";
import { MdOutlineBookmarks, MdOutlineManageAccounts } from "react-icons/md";
import { PiDiamondsFour } from "react-icons/pi";
import { TbMessages } from "react-icons/tb";
import { IoAddCircleOutline } from "react-icons/io5";
import { LogOut } from "lucide-react";
import { removeDealerAccessToken } from "../../../Utils/Helper";

function DealerLayout() {
  const navigate = useNavigate();
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
  ];

  const logout = () => {
    removeDealerAccessToken();
    navigate("/login", { replace: true });
  };

  return (
    <div className="h-screen w-full relative">
      <Navbar />
      <Header />
      <div className="flex w-full">
        {/* Sidebar */}
        <div className="w-[22%] h-full">
          {/* Profile Section */}
          <div className="flex items-center gap-2 justify-center my-6">
            <div>
              <img
                src="auth-img.png"
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div>
              <p className="text-[#777]">bproindia</p>
              <h4 className="font-semibold">Bpro@India</h4>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col items-center">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                className={({ isActive }) =>
                  `flex items-center gap-2 my-2 p-2 w-44 rounded-md ${
                    isActive
                      ? "bg-black text-white"
                      : "text-primary hover:bg-black hover:text-white"
                  }`
                }
              >
                <item.icon
                  size={20}
                  className={({ isActive }) =>
                    isActive ? "text-white" : "text-primary"
                  }
                />
                <span className="font-semibold">{item.name}</span>
              </NavLink>
            ))}
          </div>
          <button
            className="absolute w-44 bottom-10 left-16 flex gap-2 items-center text-primary hover:bg-neutral-200 px-2 py-1 rounded-md"
            onClick={logout}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Content Area */}
        <div className="w-full h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DealerLayout;
