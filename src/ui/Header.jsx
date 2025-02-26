import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Search, UserCircle, Menu, Dot } from "lucide-react";
import { AiOutlineSetting } from "react-icons/ai";
import { HiOutlineViewGrid } from "react-icons/hi";
import { PiBell, PiSunDimDuotone, PiMoonDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/Features/themeSlice";
import {
  changeStatusUpdateProfileAsync,
  fetchRequestsAsync,
} from "../Redux/Features/dealersSlice";
import Loader from "./Loader";
import Snackbars from "./Snackbars";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
// import { useTheme } from "../Context/ThemeContext";

function Header({ isSideBarFull }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notificationDropDown, setNotificationDropDown] = useState(false);
  // const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const { requests, approvalDismissStatus } = useSelector(
    (state) => state.dealers
  );
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });

  useEffect(() => {
    if (approvalDismissStatus === "idle") {
      dispatch(fetchRequestsAsync());
    }
  }, [dispatch, approvalDismissStatus]);

  const themeOptions = [
    { icon: PiSunDimDuotone, label: "Light" },
    { icon: PiMoonDuotone, label: "Dark" },
  ];

  const handleThemeToggle = (themeMode) => {
    // console.log("Theme Mode =>", themeMode);
    // toggleTheme(themeMode.toLowerCase());
    // setShowThemeDropdown(false);
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(toggleTheme(newTheme));
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
  ];

  const DropdownPortal = ({ children }) => {
    return ReactDOM.createPortal(children, document.body);
  };

  const handleApproveRequest = async (id, status) => {
    try {
      const res = await dispatch(
        changeStatusUpdateProfileAsync({ id, status })
      ).unwrap();

      if (res.success) {
        setSnackbar({
          open: true,
          type: "success",
          text: res.message,
        });
      }
    } catch (error) {
      console.log("error", error);
      setSnackbar({
        open: true,
        type: "error",
        text:
          error?.message ||
          `Error ${status ? "approving" : "dismissing"} request`,
      });
    }
  };

  return (
    <>
      <div className="bg-transparent shadow-md backdrop-blur-md h-[10%] py-2 px-4 sm:px-10 flex justify-between items-center z-10 fixed w-full">
        <div className="flex h-10 w-[80%] sm:w-64 items-center ml-10 md:ml-0 gap-2">
          {location.pathname.split("/")[2] && (
            <IoMdArrowBack
              className="cursor-pointer hover:bg-gray-200 p-1 rounded-full mt-px"
              size={28}
              onClick={() => navigate(-1)}
            />
          )}
          <h4 className="uppercase text-lg font-[600]">
            {location.pathname.split("/")[1]}
          </h4>
        </div>

        {/* Desktop Menu */}
        <div
          className={`hidden sm:flex items-center gap-3 transform duration-100 ease-in ${
            isSideBarFull ? "pr-64" : "pr-9"
          }`}
        >
          <div className="relative theme-dropdown">
            {showThemeDropdown && (
              <DropdownPortal>
                <div
                  className="fixed bg-white dark:bg-darkComponet rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                  style={{
                    top: `${
                      document
                        .querySelector(".theme-dropdown")
                        .getBoundingClientRect().bottom + window.scrollY
                    }px`,
                    left: `${
                      document
                        .querySelector(".theme-dropdown")
                        .getBoundingClientRect().left + window.scrollX
                    }px`,
                    width: "12rem",
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

          <div className="relative">
            <button
              className="p-2.5 h-10 hover:bg-gray-700/20 rounded-lg"
              onClick={() => setNotificationDropDown(!notificationDropDown)}
            >
              <PiBell
                size={23}
                className="dark:text-gray-300 text-neutral-800 transform duration-150 ease-in-out"
              />
              {requests?.length > 0 && (
                <Dot
                  className="absolute -top-1 right-0 text-red-600"
                  size={32}
                />
              )}
            </button>
            {notificationDropDown &&
              (approvalDismissStatus === "loading" ? (
                <div className="flex items-center justify-center absolute right-0 bg-gray-100 w-80 p-2 rounded-md shadow-lg">
                  <Loader />
                </div>
              ) : requests && requests.length > 0 ? (
                requests?.map((req) => (
                  <div className="absolute right-0 bg-gray-100 w-80 p-2 rounded-md shadow-lg">
                    <div className="border-2 border-blue p-3 rounded-md bg-white">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src={req.profileUrl || "avatar-1.jpg"}
                            className="w-10 h-10 rounded-full object-contain"
                          />
                          <div className="flex flex-col">
                            <small className="text-base">{req.fullName}</small>
                            <small className="text-[10px] text-gray-600">
                              Request For Update Profile
                            </small>
                          </div>
                        </div>
                        <small className="text-xs pt-1">
                          {req.reqSentDateTime}
                        </small>
                      </div>
                      <div className="flex items-center w-full gap-2">
                        <button
                          className="w-full bg-blue text-white rounded-md font-[600] border border-blue p-1.5 text-sm"
                          onClick={() => handleApproveRequest(req.id, true)}
                        >
                          {approvalDismissStatus === "loading" ? (
                            <Loader />
                          ) : (
                            "Approve"
                          )}
                        </button>
                        <button
                          className="w-full bg-white text-blue rounded-md font-[600] border border-blue p-1.5 text-sm"
                          onClick={() => handleApproveRequest(req.id, false)}
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center  absolute right-0 bg-gray-100 w-80 p-2 rounded-md shadow-lg">
                  <h1 className="font-[600] my-4">No Notifications</h1>
                </div>
              ))}
          </div>

          <button
            className="p-2.5 hover:bg-gray-700/20 rounded-lg"
            // onClick={(e) => {
            //   e.stopPropagation();
            //   setShowThemeDropdown(!showThemeDropdown);
            // }}
          >
            {theme === "light" ? (
              <PiSunDimDuotone
                size={23}
                className="dark:text-gray-300 text-neutral-800 animate-pulse hover:w-6 hover:h-6 transform duration-150 ease-in-out"
                onClick={() => handleThemeToggle("Light")}
              />
            ) : (
              <PiMoonDuotone
                size={23}
                className="dark:text-gray-300 text-neutral-800 hover:w-6 hover:h-6 transform duration-150 ease-in-out"
                onClick={() => handleThemeToggle("Dark")}
              />
            )}
          </button>

          {/* {headerIcons.map((iconData, index) => (
            <button
              key={index}
              className="p-2.5 h-10 hover:bg-gray-700/20 rounded-lg"
            >
              <iconData.icon size={23} className={iconData.className} />
            </button>
          ))}

          <button
            className="p-2.5 hover:bg-gray-700/20 rounded-lg"
            onClick={() => navigate("/profile")}
          >
            <img
              src="avatar-1.jpg"
              alt="user-image"
              className="rounded-full w-8 h-8"
            />
          </button> */}
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="sm:hidden absolute top-full right-0 mt-2 w-48 bg-white dark:bg-darkComponet rounded-md shadow-lg z-10 mobile-menu">
            <div className="py-2">
              {headerIcons.map((iconData, index) => (
                <button
                  key={index}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                >
                  <iconData.icon
                    size={20}
                    className={iconData.className + " mr-3"}
                  />
                  <span>{iconData.icon.name}</span>
                </button>
              ))}
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              >
                {theme === "light" ? (
                  <PiSunDimDuotone size={20} className="mr-3" />
                ) : (
                  <PiMoonDuotone size={20} className="mr-3" />
                )}
                <span>Theme</span>
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                onClick={() => navigate("/profile")}
              >
                <UserCircle size={20} className="mr-3" />
                <span>Profile</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <Snackbars
        open={snackbar.open}
        type={snackbar.type}
        text={snackbar.text}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
}

export default Header;
