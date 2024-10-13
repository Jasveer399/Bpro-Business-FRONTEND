import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Search, UserCircle, Menu } from "lucide-react";
import { AiOutlineSetting } from "react-icons/ai";
import { HiOutlineViewGrid } from "react-icons/hi";
import { PiBell, PiSunDimDuotone, PiMoonDuotone } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { useTheme } from "../Context/ThemeContext";

function Header() {
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  const themeOptions = [
    { icon: PiSunDimDuotone, label: "Light" },
    { icon: PiMoonDuotone, label: "Dark" },
  ];

  const handleThemeToggle = (themeMode) => {
    console.log("Theme Mode =>", themeMode);
    toggleTheme(themeMode.toLowerCase());
    setShowThemeDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showThemeDropdown && !event.target.closest(".theme-dropdown")) {
        setShowThemeDropdown(false);
      }
      if (showMobileMenu && !event.target.closest(".mobile-menu")) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showThemeDropdown, showMobileMenu]);

  const headerIcons = [
    {
      icon: AiOutlineSetting,
      className: "dark:text-gray-300 animate-spin text-neutral-800",
    },
    {
      icon: PiBell,
      className: "dark:text-gray-300 text-neutral-800 hover:w-6 hover:h-6 transform duration-150 ease-in-out",
    },
  ];

  const DropdownPortal = ({ children }) => {
    return ReactDOM.createPortal(children, document.body);
  };
  
  return (
    <div className="dark:bg-darkPrimary backdrop-blur-md h-[10%] py-2 px-4 sm:px-10 flex justify-between items-center relative">
      <div className="flex h-10 w-[80%] sm:w-64 items-center bg-[#f8f9fa] border border-gray-300 dark:border-darkComponet dark:bg-darkComponet rounded-lg px-4 ml-10 md:ml-0">
        <Search className="w-6 h-6 text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-gray-300 w-full"
        />
      </div>
      

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-3">
        <div className="relative theme-dropdown">
          <button
            className="p-2.5 hover:bg-gray-700/20 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              setShowThemeDropdown(!showThemeDropdown);
            }}
          >
            {theme === "light" ? (
              <PiSunDimDuotone size={23} className="dark:text-gray-300 text-neutral-800 animate-pulse hover:w-6 hover:h-6 transform duration-150 ease-in-out" />
            ) : (
              <PiMoonDuotone size={23} className="dark:text-gray-300 text-neutral-800 hover:w-6 hover:h-6 transform duration-150 ease-in-out" />
            )}
          </button>

          {showThemeDropdown && (
            <DropdownPortal>
              <div 
                className="fixed bg-white dark:bg-darkComponet rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                style={{
                  top: `${document.querySelector('.theme-dropdown').getBoundingClientRect().bottom + window.scrollY}px`,
                  left: `${document.querySelector('.theme-dropdown').getBoundingClientRect().left + window.scrollX}px`,
                  width: '12rem',
                }}
              >
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {themeOptions.map((option, index) => (
                    <button
                      key={index}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                      role="menuitem"
                      onClick={() => handleThemeToggle(option.label)}
                    >
                      <option.icon className="mr-3" size={20} />
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </DropdownPortal>
          )}
        </div>

        {headerIcons.map((iconData, index) => (
          <button key={index} className="p-2.5 h-10 hover:bg-gray-700/20 rounded-lg">
            <iconData.icon size={23} className={iconData.className} />
          </button>
        ))}

        <button
          className="p-2.5 hover:bg-gray-700/20 rounded-lg"
          onClick={() => navigate("/profile")}
        >
           <img src="avatar-1.jpg" alt="user-image" className="rounded-full w-8 h-8" />
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="sm:hidden absolute top-full right-0 mt-2 w-48 bg-white dark:bg-darkComponet rounded-md shadow-lg z-10 mobile-menu">
          <div className="py-2">
            {headerIcons.map((iconData, index) => (
              <button key={index} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50">
                <iconData.icon size={20} className={iconData.className + " mr-3"} />
                <span>{iconData.icon.name}</span>
              </button>
            ))}
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50" onClick={() => setShowThemeDropdown(!showThemeDropdown)}>
              {theme === "light" ? <PiSunDimDuotone size={20} className="mr-3" /> : <PiMoonDuotone size={20} className="mr-3" />}
              <span>Theme</span>
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50" onClick={() => navigate("/profile")}>
              <UserCircle size={20} className="mr-3" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;