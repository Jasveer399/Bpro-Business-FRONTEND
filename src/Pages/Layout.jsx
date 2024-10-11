import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, UserCircle } from "lucide-react";
import { PiProjectorScreenChart } from "react-icons/pi";
import { TfiDashboard } from "react-icons/tfi";
import Header from "../ui/Header";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavPosition, setActiveNavPosition] = useState(0);
  const navRefs = useRef([]);
  const [isSideBarFull, setIsSideBarFull] = useState(true);

  const navItems = [
    { name: "Dashboard", icon: TfiDashboard, link: "/dashboard" },
    { name: "Statistics", icon: PiProjectorScreenChart, link: "/statistics" },
    { name: "Users", icon: UserCircle, link: "/users" },
  ];

  useEffect(() => {
    const activeIndex = navItems.findIndex((item) =>
      location.pathname.startsWith(item.link)
    );
    if (activeIndex !== -1 && navRefs.current[activeIndex]) {
      const activeNav = navRefs.current[activeIndex];
      setActiveNavPosition(activeNav.offsetTop);
    }
  }, [location]);

  const handleNavClick = (link, index) => {
    navigate(link);
    if (navRefs.current[index]) {
      setActiveNavPosition(navRefs.current[index].offsetTop);
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div
        className={`${
          isSideBarFull ? "w-[22.3%]" : "w-[4%]"
        } bg-white dark:bg-darkSideBar flex flex-col transform duration-300 ease-in-out`}
      >
        {/* Logo Section */}
        <div className="py-5 px-4 flex items-center gap-2">
          {isSideBarFull && (
            <>
              <span className="font-semibold text-neutral-800 dark:text-slate-50">
                BProBusiness
              </span>
            </>
          )}
          <Menu
            onClick={() => setIsSideBarFull(!isSideBarFull)}
            size={25}
            className="ml-auto dark:text-lightPrimary cursor-pointer"
          />
        </div>
        {/* Navigation Section */}
        <div className="flex flex-col flex-1 px-2.5">
          <div className="mb-4">
            <nav className="space-y-2 mt-5">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (navRefs.current[index] = el)}
                  onClick={() => handleNavClick(item.link, index)}
                  className={`flex items-center text-sm font-semibold rounded-lg cursor-pointer ${
                    location.pathname.startsWith(item.link)
                      ? " bg-[#e5f6fe] dark:bg-[#1a3344] text-[#04a9f5] border border-[#0499f5]"
                      : "text-neutral-800 dark:text-darkTextGreyColor hover:bg-gray-100 dark:hover:bg-[#343c45]"
                  } ${isSideBarFull ? "px-3 py-2" : "px-2.5 py-2"}`}
                >
                  <item.icon
                    size={isSideBarFull ? 20 : 23}
                    className={`${isSideBarFull ? "mr-5" : ""}`}
                  />
                  {isSideBarFull && <span className="mb-1">{item.name}</span>}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="bg-lightPrimary w-full h-full">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
