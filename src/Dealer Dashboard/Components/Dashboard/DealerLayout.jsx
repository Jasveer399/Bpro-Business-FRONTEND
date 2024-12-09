import React, { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Navbar from "../Home/Navbar";
import Header from "../Home/Header";
import { MdOutlineBookmarks, MdOutlineManageAccounts } from "react-icons/md";
import { PiDiamondsFour } from "react-icons/pi";
import { TbMessages } from "react-icons/tb";
import { IoAddCircleOutline } from "react-icons/io5";
import { LogOut } from "lucide-react";
import { removeDealerAccessToken } from "../../../Utils/Helper";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentDealerAsync } from "../../../Redux/Features/dealersSlice";

function DealerLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentDealer, status } = useSelector((state) => state.dealers);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCurrentDealerAsync());
    }
  }, [dispatch, status]);

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

  console.log("currentDealer", currentDealer);

  const logout = () => {
    removeDealerAccessToken();
    navigate("/login", { replace: true });
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <Header />
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex flex-col w-64 bg-white shadow-lg">
          <div className="flex flex-col items-center mt-6">
            <img
              src="auth-img.png"
              alt="Profile"
              className="w-12 h-12 rounded-full mb-2"
            />
            <p className="text-gray-500">bproindia</p>
            <h4 className="font-semibold">Bpro@India</h4>
          </div>
          <nav className="flex-1 mt-6 px-4">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                className={({ isActive }) =>
                  `flex items-center gap-2 my-2 p-2 w-52 rounded-md ${
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
          </nav>
          <button
            className="flex items-center justify-center px-4 py-3 mt-6 text-gray-600 hover:bg-gray-50"
            onClick={logout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed md:hidden bottom-0 left-0 right-0 bg-white shadow-lg z-50">
          <nav className="flex justify-around items-center h-16">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center ${
                    isActive ? "text-blue-600" : "text-gray-600"
                  }`
                }
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 pb-20 md:pb-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DealerLayout;
