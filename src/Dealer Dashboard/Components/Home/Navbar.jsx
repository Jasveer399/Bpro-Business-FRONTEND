import React, { useState } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
  getCustomerAccessToken,
  getDealerAccessToken,
  removeCustomerAccessToken,
} from "../../../Utils/Helper";
import Dialog from "../../../ui/Dialog";
import CustomerLoginForm from "../Forms/Auth/CustomerLoginForm";
import { useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const dealerToken = getDealerAccessToken();
  const customerToken = getCustomerAccessToken();

  useEffect(() => {}, [isLogin]);

  return (
    <div className="bg-primary text-white font-montserrat">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between py-4 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <FaFacebookF size={20} className="cursor-pointer hover:opacity-80" />
          <GrInstagram size={20} className="cursor-pointer hover:opacity-80" />
          <FaLinkedinIn size={20} className="cursor-pointer hover:opacity-80" />
        </div>
        <div className="flex items-center gap-4 lg:gap-8">
          <Link to="/" className="hover:opacity-80">
            Home
          </Link>
          <Link to="/about-us" className="hover:opacity-80">
            About Us
          </Link>
          <Link to="/blogs" className="hover:opacity-80">
            Blogs
          </Link>
          <Link to="/contact-us" className="hover:opacity-80">
            Contact Us
          </Link>
          {dealerToken ? (
            <Link to="/my-dashboard/listing" className="hover:opacity-80">
              Dashboard
            </Link>
          ) : customerToken ? (
            <button
              onClick={() => {
                removeCustomerAccessToken();
                setIsLogin(false);
              }}
              className="hover:opacity-80"
            >
              Logout
            </button>
          ) : (
            <Dialog
              trigger={
                <button className="hover:opacity-80">Register/Login</button>
              }
              width="w-[95%] sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[35%] max-w-md"
              height="h-[95%] sm:h-[90%] md:h-[80%] lg:h-[70%] xl:h-[60%] max-h-[455px] sm:max-h-[500px] md:max-h-[650px]"
            >
              {({ closeDialog }) => (
                <CustomerLoginForm
                  closeDialog={closeDialog}
                  setIsLogin={setIsLogin}
                />
              )}
            </Dialog>
          )}
          <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
            <img src="/eng.png" alt="Language" className="w-5 h-5" />
            <span>ENG</span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <FaFacebookF size={20} className="cursor-pointer" />
            <GrInstagram size={20} className="cursor-pointer" />
            <FaLinkedinIn size={20} className="cursor-pointer" />
          </div>
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${isOpen ? "block" : "hidden"} px-4 pb-4`}>
          <div className="flex flex-col space-y-4">
            <Link to="/about-us" className="hover:opacity-80">
              About Us
            </Link>
            <Link to="/blogs" className="hover:opacity-80">
              Blogs
            </Link>
            <Link to="/contact-us" className="hover:opacity-80">
              Contact Us
            </Link>
            {dealerToken ? (
              <Link to="/my-dashboard/listing" className="hover:opacity-80">
                Dashboard
              </Link>
            ) : customerToken ? (
              <button
                onClick={() => {
                  removeCustomerAccessToken();
                  setIsLogin(false);
                }}
                className="hover:opacity-80 text-left"
              >
                Logout
              </button>
            ) : (
              <Dialog
                trigger={
                  <button className="hover:opacity-80 text-left">
                    Register/Login
                  </button>
                }
                width="w-[95%] sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[35%] max-w-md"
                height="h-[95%] sm:h-[90%] md:h-[80%] lg:h-[70%] xl:h-[60%] max-h-[455px] sm:max-h-[500px] md:max-h-[650px]"
              >
                {({ closeDialog }) => (
                  <CustomerLoginForm
                    closeDialog={closeDialog}
                    setIsLogin={setIsLogin}
                  />
                )}
              </Dialog>
            )}
            <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
              <img src="/eng.png" alt="Language" className="w-5 h-5" />
              <span>ENG</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
