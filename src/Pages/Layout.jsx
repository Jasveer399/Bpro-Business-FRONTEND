import React, { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu, UserCircle, X } from "lucide-react";
import { PiMoonDuotone, PiSunDimDuotone } from "react-icons/pi";
import { TfiDashboard } from "react-icons/tfi";
import Header from "../ui/Header";
import { useTheme } from "../Context/ThemeContext";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { ImBlogger } from "react-icons/im";
import { useSelector } from "react-redux";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavPosition, setActiveNavPosition] = useState(0);
  const navRefs = useRef([]);
  const [isSideBarFull, setIsSideBarFull] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const selectedTheme = useSelector((state) => state.theme.theme)

  const navItems = [
    { name: "Dashboard", icon: TfiDashboard, link: "/dashboard" },
    { name: "Dealers", icon: BsFillPersonVcardFill, link: "/dealers" },
    { name: "Workers", icon: UserCircle, link: "/workers" },
    { name: "Blogs", icon: ImBlogger, link: "/blogs" },
    { name: "Banner", icon: UserCircle, link: "/banners" },
    { name: "Category", icon: UserCircle, link: "/categories" },
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
    setIsMobileMenuOpen(false);
  };
  const handleThemeToggle = (themeMode) => {
    toggleTheme(themeMode.toLowerCase());
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/admin-login");
  };

  return (
    <div className="w-screen h-screen flex relative">
      {/* Mobile menu toggle button */}
      <button
        className={`md:hidden fixed top-4 left-2 z-50 text-colorText2 dark:text-colorText ${isMobileMenuOpen ? "hidden" : "block"
          }`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? "" : <Menu size={25} />}
      </button>

      <div
        className={`shadow-md ${isMobileMenuOpen ? "w-[50%]" : isSideBarFull ? "w-[22.3%]" : "w-[4%]"
          } bg-white dark:bg-darkSideBar flex flex-col transform duration-300 ease-in-out
        md:relative md:translate-x-0
        fixed left-0 top-0 h-full z-40 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-[200%]"
          }`}
      >
        {/* Logo Section */}
        <div className="py-5 px-4 flex items-center gap-2">
          {isSideBarFull && (
            <>
              <span className="font-semibold text-neutral-800 dark:text-slate-50">
                Bpro Business
              </span>
            </>
          )}
          <Menu
            onClick={() => setIsSideBarFull(!isSideBarFull)}
            size={25}
            className="ml-auto dark:text-lightPrimary cursor-pointer md:block hidden"
          />
          {isMobileMenuOpen && (
            <X
              size={25}
              className="text-colorText2 dark:text-colorText cursor-pointer absolute top-2 right-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          )}
        </div>
        {/* Navigation Section */}
        <div className="flex flex-col flex-1 px-2.5">
          <div className="mb-4 flex flex-col justify-between h-full">
            <nav className="space-y-2 mt-5">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (navRefs.current[index] = el)}
                  onClick={() => handleNavClick(item.link, index)}
                  className={`flex items-center text-sm font-semibold rounded-lg cursor-pointer ${location.pathname.startsWith(item.link)
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
            <LogOut size={30} className="animate-pulse p-1 text-colorText2 dark:text-colorText hover:border hover:border-blue hover:bg-blue/30 rounded-md cursor-pointer" onClick={handleLogout}/>
          </div>
        </div>
        <div className="w-full px-5 flex flex-col items-start mb-5 gap-5">
          <div className="flex gap-5">
            <button
              className="md:hidden flex px-1 w-full bg-[#e5f6fe] dark:bg-[#1a3344] text-[#04a9f5] border border-[#0499f5] rounded-lg"
              onClick={() => handleThemeToggle("light")}
            >
              <PiSunDimDuotone size={23} className="dark:text-gray-300 text-neutral-800 animate-pulse hover:w-6 hover:h-6 transform duration-150 ease-in-out" />
              Light
            </button>
            <button
              className="md:hidden flex px-1 w-full bg-[#e5f6fe] dark:bg-[#1a3344] text-[#04a9f5] border border-[#0499f5] rounded-lg"
              onClick={() => handleThemeToggle("dark")}
            >
              <PiMoonDuotone size={23} className="dark:text-gray-300 text-neutral-800 hover:w-6 hover:h-6 transform duration-150 ease-in-out" />
              Dark
            </button>
          </div>
        </div>
      </div>

      <div className="bg-lightPrimary w-full h-full custom-scrollbar">
        <Header isSideBarFull={isSideBarFull} />
        <Outlet />
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default Layout;
