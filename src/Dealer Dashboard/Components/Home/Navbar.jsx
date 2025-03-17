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
import MobileNoForm from "../Forms/Auth/MobileNoInput";
import CustomerLoginForm from "../Forms/Auth/CustomerLoginForm";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const dealerToken = getDealerAccessToken();
  const customerToken = getCustomerAccessToken();

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
          <Link to="/home" className="hover:opacity-80">
            Home
          </Link>
          <Link to="/about-us" className="hover:opacity-80">
            About Us
          </Link>
          <Link to="/Allblogs" className="hover:opacity-80">
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
              onClick={removeCustomerAccessToken}
              className="hover:opacity-80"
            >
              Logout
            </button>
          ) : (
            <Dialog
              trigger={
                <button className="hover:opacity-80">Register/Login</button>
              }
              width="w-[35%]"
              height="h-[55%]"
            >
              {({ closeDialog }) => (
                <CustomerLoginForm closeDialog={closeDialog} />
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
            <Link href="/about" className="hover:opacity-80">
              About Us
            </Link>
            <Link to="/Allblogs" className="hover:opacity-80">
              Blogs
            </Link>
            <Link href="/contact" className="hover:opacity-80">
              Contact Us
            </Link>
            {dealerToken ? (
              <Link to="/my-dashboard/listing" className="hover:opacity-80">
                Dashboard
              </Link>
            ) : customerToken ? (
              <button className="hover:opacity-80">Logout</button>
            ) : (
              <Dialog
                trigger={
                  <button className="hover:opacity-80">Register/Login</button>
                }
                width="w-[35%]"
                height="h-[55%]"
              >
                <CustomerLoginForm />
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
